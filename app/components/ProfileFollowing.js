import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDots from "./LoadingDots";

function ProfileFollowing() {
  const { username } = useParams();
  const [isLoanding, setIsLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source(); //trzeba sprzątać po sobie

    async function fetchFollowing() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, {
          cancelToken: ourRequest.token
        });

        setFollowing(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
      }
    }

    fetchFollowing();

    return () => {
      ourRequest.cancel();
    };
  }, [username]);

  if (isLoanding) return <LoadingDots />;

  return (
    <div className="list-group">
      {following.map((singleFollowing, index) => {
        return (
          <Link key={index} to={`/profile/${singleFollowing.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={singleFollowing.avatar} /> <strong>{singleFollowing.username}</strong>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollowing;
