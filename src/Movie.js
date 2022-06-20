import React, { useState } from "react";

const Movie = ({ movie, onDelete, onUpdate, newReview, setNewReview }) => {
  return (
    <div className="card">
      <h1>{movie.movieName}</h1>
      <p>{movie.movieReview}</p>
      <div className="button-flex">
        <button className="btn-card delete" onClick={() => onDelete(movie)}>
          Delete
        </button>
        <textarea
          rows="4"
          type="text"
          className="update"
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          className="btn-card update"
          onClick={() => onUpdate(movie, newReview)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Movie;
