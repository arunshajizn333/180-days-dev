import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const routeError = useRouteError();
  const status = routeError?.status || routeError?.statusCode || 404;
  const message =
    status === 404
      ? "We couldn’t find the page you were looking for."
      : "Something went wrong while loading this page. Please try again.";

  return (
    <main className="page-content error-page">
      <section className="page-hero">
        <p className="page-eyebrow">Error {status}</p>
        <h1>Oops, that didn’t go as planned.</h1>
        <p>{message}</p>
        <Link className="page-button" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default Error;
