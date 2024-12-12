import React from "react";
import Banner from "./banner";
import MovieList from "./movieList";

const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="container mx-auto py-10">
        <MovieList />
      </div>
    </>
  );
};

export default HomePage;
