import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        appwriteService.getPost(slug)
            .then((data) => {
                if (data) {
                    setPost(data);
                } else {
                    setError("Post not found");
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
                setError("Failed to load post.");
            })
            .finally(() => setLoading(false));
    }, [slug, navigate]);

    const deletePost = () => {
        if (!post) return;
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="py-8 text-center">
                <p className="text-xl font-semibold text-gray-700">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    )}
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content || "")}</div>
            </Container>
        </div>
    ) : (
        <div className="py-8 text-center">
            <p className="text-xl font-semibold text-red-500">Post not found.</p>
        </div>
    );
}
