import React, { useContext } from "react";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function HeaderLoggedIn(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogOut() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "You are logged out." });
  }

  function openOverlay(e) {
    e.preventDefault();

    appDispatch({ type: "openSearch" });
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a data-for="search" data-tip="Search" onClick={openOverlay} className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" id="search" className="custom-tooltip" />
      <span onClick={() => appDispatch({ type: "toggleChat" })} data-for="chat" data-tip="Chat" className={"mr-2 header-chat-icon " + (appState.unreadChatMessages ? "text-danger" : "text-white")}>
        <i className="fas fa-comment"></i>
        {appState.unreadChatMessages ? <span className="chat-count-badge text-white">{appState.unreadChatMessages > 9 ? "9+" : appState.unreadChatMessages}</span> : ""}
      </span>
      <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />
      <Link data-for="profile" data-tip="My profile" to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
