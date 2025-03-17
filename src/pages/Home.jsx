import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/Config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        appwriteService
            .getPosts()
            .then((response) => {
                if (response?.documents?.length) {
                    setPosts(response.documents);
                } else {
                    setPosts([]); // Ensure posts is always an array
                }
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-red-500">{error}</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full  mt-4 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-gray-700">No posts available</h1>
                <p className="text-gray-500 mt-2">Login to see more content.</p>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-center gap-4">
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
