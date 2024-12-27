import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-gray-300">
      <Container>
        <div className="w-full flex justify-center mb-6 relative  p-2 ">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-96 object-cover"
          />

          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="text-white px-4 py-2 rounded-md shadow-md"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="text-white px-4 py-2 rounded-md shadow-md"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold text-black">{post.title}</h1>
        </div>

        <div className="w-full text-base lg:prose-lg max-w-none text-[#1D0E0E] font-medium ">
          <p className="text-xl mb-4">Created by {post.owner}</p>
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
