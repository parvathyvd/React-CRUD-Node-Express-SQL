import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Movie from "./Movie";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [listMovies, setListMovies] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/get").then((res) => {
      console.log(res.data);
      setListMovies(res.data);
    });
  }, [movieReview, newReview]);

  const submitHandler = () => {
    console.log(movieName, movieReview);
    axios
      .post("http://localhost:3001/insert", {
        movieName: movieName,
        movieReview: movieReview,
      })
      .then(() => {
        alert("success");
      });
    setListMovies([...listMovies, { movieName, movieReview }]);
  };

  const onDeleteHandler = (movie) => {
    axios.delete(`http://localhost:3001/delete/${movie.movieName}`);
    const deleteMovie = listMovies.filter((mov) => mov.id !== movie.id);
    setListMovies(deleteMovie);
  };

  const updateReview = (movie, review) => {
    console.log(movie, review);
    axios.put(`http://localhost:3001/update`, {
      movieName: movie.movieName,
      movieReview: review,
    });
    setNewReview("");
  };

  return (
    <div className="main__wrapper">
      <h1 className="main-heading">
        CRUD Application using Node, React and MySQL
      </h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          className="movieName"
          type="text"
          name="movieName"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <textarea
          rows="3"
          className="movieReview"
          type="text"
          name="movieReview"
          value={movieReview}
          onChange={(e) => setMovieReview(e.target.value)}
        />
        <button className="mt-3 btn-submit" onClick={submitHandler}>
          Submit
        </button>
      </div>

      {listMovies.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            onDelete={onDeleteHandler}
            onUpdate={updateReview}
            newReview={newReview}
            setNewReview={setNewReview}
            movieReview={movieReview}
            setMovieReview={setMovieReview}
          />
        );
      })}
    </div>
  );
}

export default App;
