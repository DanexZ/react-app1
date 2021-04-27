import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../functions/getDate";
import StateContext from "../StateContext";

function Post(props) {
  const post = props.post;
  const appState = useContext(StateContext);

  console.log(appState);

  return (
    <Link to={`/post/${post.id}`} onClick={props.onClick} className="list-group-item list-group-item-action">
      <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title} </strong>
      <span className="text-muted small">
        {appState.user.username != props.author ? `by ${post.author.username}` : ""} on {getDate(post.created_at, "polish", "/")}{" "}
      </span>
    </Link>
  );
}

export default Post;
