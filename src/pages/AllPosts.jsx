import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/Config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []); // Runs only once when the component mounts

    const fetchPosts = async () => {
        try {
            const response = await appwriteService.getPosts(); // Remove []
            if (response?.documents) {
                setPosts(response.documents);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    <p className="text-center text-xl font-semibold text-gray-600">Loading posts...</p>
                ) : posts.length > 0 ? (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl font-semibold text-gray-500">No posts available.</p>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
