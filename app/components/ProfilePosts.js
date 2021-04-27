import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import { getDate } from "../functions/getDate";
import LoadingDots from "./LoadingDots";
import Post from "./Post";

function ProfilePosts() {
  const { username } = useParams();
  const [isLoanding, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source(); //trzeba sprzątać po sobie

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token
        });

        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
      }
    }

    fetchPosts();

    return () => {
      ourRequest.cancel();
    };
  }, [username]);

  if (isLoanding) return <LoadingDots />;

  return (
    <div className="list-group">
      {posts.map((post) => {
        return <Post key={`${post.id}`} post={post} author={post.author.username} />;
      })}
    </div>
  );
}

export default ProfilePosts;
