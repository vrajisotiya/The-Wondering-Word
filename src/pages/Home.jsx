import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isUser = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-medium text-gray-500">Loading...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-medium text-red-500">{error}</p>
        </Container>
      </div>
    );
  }

  if (!isUser) {
    return (
      <div className="w-full py-8 mt-4 text-center ">
        <Container>
          <h1 className="text-2xl  font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl  font-bold hover:text-gray-500">
            No posts available.
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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
