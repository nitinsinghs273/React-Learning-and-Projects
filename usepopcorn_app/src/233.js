import { children, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  //Use of component composition
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <SearchResult movies={movies} />
      </NavBar>

      <Main>
        {/*Use of Element as props */}
        {/* <MovieBox element={<SearchedMovieList movies={movies} />} />
        <MovieBox
          element={
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}

        {/*Use of children as Component Composition */}
        <MovieBox>
          <SearchedMovieList movies={movies} />
        </MovieBox>
        <MovieBox>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </MovieBox>
      </Main>
    </>
  );
}

function SearchBar() {
  const [queries, setQueries] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search"
      value={queries}
      onChange={(e) => setQueries(e.target.value)}
    />
  );
}

//use of Component Composition
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchResult({ movies }) {
  return <p className="num-results">Found {movies.length} results</p>;
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function ToggleButton({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "-" : "+"}
    </button>
  );
}

function MovieBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function SearchedMovieList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <SearchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function SearchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img
        className="imger"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      ></img>
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  console.log(avgImdbRating);

  const avgUserRating = average(watched.map((movie) => movie.userRating));

  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies You Watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length}movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{avgRuntime}mins</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img
        className="imger"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      ></img>
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>✨</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime}min</span>
        </p>
      </div>
    </li>
  );
}
