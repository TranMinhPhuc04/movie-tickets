import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovie } from "./duck/reducer"; // Dựa vào cấu trúc mới
import Card from "./Card";

const MovieList = () => {
  const dispatch = useDispatch();
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state) => state.listMovieReducer);


  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh Sách Phim</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
