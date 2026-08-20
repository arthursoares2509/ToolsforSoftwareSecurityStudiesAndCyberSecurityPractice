//useful for XSS

import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function QueryParamsDemo() {
  let query = useQuery();
  return (
    <div>
      <h2>Return Home</h2>
      <a href={query.get("redirect")}>Click To go Home</a>
    </div>
  );
}

export default function Root() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}