import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-4 bg-white rounded-lg p-6 shadow-md"
        >
            <Input
                label="Title"
                placeholder="Enter your post title"
                className="border rounded-md p-3 text-lg focus:ring-2 focus:ring-blue-400"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug"
                placeholder="Post slug"
                className="border rounded-md p-3 text-lg focus:ring-2 focus:ring-blue-400"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />
            <Input
                label="Featured Image"
                type="file"
                className="border rounded-md p-2"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg shadow-sm"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="border rounded-md p-3 text-lg focus:ring-2 focus:ring-blue-400"
                {...register("status", { required: true })}
            />

            {/* Submit Button with Effect */}
            <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-3 rounded-lg text-lg transition-all duration-300 transform hover:bg-blue-600 hover:scale-105 active:scale-95"
            >
                {post ? "Update Post" : "Submit Post"}
            </button>
        </form>
    );
}
