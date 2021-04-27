import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Page title="Not found">
      <div className="text-center">
        <h2>Whooops, we cannot find that content</h2>
        <p className="lead text-muted">
          You can always visit the <Link to={"/"}>homepage</Link> to get fresh start.
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
