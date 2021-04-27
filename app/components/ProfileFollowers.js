import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDots from "./LoadingDots";

function ProfileFollowers() {
  const { username } = useParams();
  const [isLoanding, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source(); //trzeba sprzątać po sobie

    async function fetchFollowers() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, {
          cancelToken: ourRequest.token
        });

        setFollowers(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
      }
    }

    fetchFollowers();

    return () => {
      ourRequest.cancel();
    };
  }, [username]);

  if (isLoanding) return <LoadingDots />;

  return (
    <div className="list-group">
      {followers.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> <strong>{follower.username}</strong>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollowers;
