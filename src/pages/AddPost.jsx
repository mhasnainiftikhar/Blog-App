import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <div className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
            <Container>
                <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
                        Create a New Post 📝
                    </h1>
                    <PostForm />
                </div>
            </Container>
        </div>
    );
}

export default AddPost;
