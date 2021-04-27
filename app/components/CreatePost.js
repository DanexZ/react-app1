import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import Page from "./Page";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        user_id: appState.user.id,
        token: appState.user.token
      });

      if (response.data.created_id) {
        console.log("Post successfully created");
        // Redirect to newly created post view
        appDispatch({ type: "flashMessage", value: "Congrats! Successfully created post." });
        props.history.push(`/post/${response.data.created_id}`);
      } else {
        console.log(`${response.data.errors}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost); //aby działało przekierowanie
