import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useLocalStorage } from "./useLoacalStorage";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "2df66fed";

export default function App() {
  const [queries, setQueries] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  // const [watched, setWatched] = useState([]);
  //custom Hooks
  const [watched, setWatched] = useLocalStorage([], "watched");
  //Use of component composition

  function handleSelected(id) {
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }

  function handleBack() {
    setSelectedID(null);
  }

  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController(); //this is DOm properites of the browser

      async function Fetch_Movies() {
        try {
          setIsLoading(true);
          setError(""); //reseting for every search
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${queries}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something is Wrong");
          const data = await res.json();

          if (data.Response === "False") {
            setError(data.Error);
          } else {
            setMovies(data.Search);
          }
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!queries.length) {
        setMovies([]);
        setError("");
        return;
      }
      handleBack();
      Fetch_Movies();
      //returning the Clean function
      return function () {
        controller.abort();
      };
    },
    [queries]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar queries={queries} setQueries={setQueries} />
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
          {isLoading && <Loading />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <SearchedMovieList
              movies={movies}
              onSelectedMovie={handleSelected}
            />
          )}
        </MovieBox>
        <MovieBox>
          {selectedID ? (
            <SelectedMovieDetails
              selectedID={selectedID}
              onSetBack={handleBack}
              onAddwatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
}

function Error({ message }) {
  return (
    <p className="error">
      <span>😱</span>
      {message}
    </p>
  );
}

function Loading() {
  return <p className="loader">Loading....</p>;
}

function SearchBar({ queries, setQueries }) {
  const inputEl = useRef(null);

  //using Custom Hooks
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQueries("");
  });

  return (
    <input
      className="search"
      type="text"
      id="search"
      placeholder="Search"
      value={queries}
      onChange={(e) => setQueries(e.target.value)}
      ref={inputEl}
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

function SearchedMovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <SearchedMovie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

function SearchedMovie({ movie, onSelectedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectedMovie(movie.imdbID)}>
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

function SelectedMovieDetails({
  selectedID,
  onSetBack,
  onAddwatched,
  watched,
}) {
  const [mountedMovie, setMountedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

  const {
    Title: title,
    Year: year,
    Actors: actors,
    Country: country,
    Director: director,
    Poster: poster,
    Runtime: runtime,
    Released: released,
    Plot: plot,
    Genre: genre,
    imdbRating,
  } = mountedMovie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      poster,
      year,
      released,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
    };
    onAddwatched(newWatchedMovie);
    onSetBack();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();

        setMountedMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  //global listener using custom hooks
  useKey("Escape", onSetBack);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button className="btn-back" onClick={onSetBack}>
            &larr;
          </button>
          <div className="details-flex">
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview ">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                ⭐{imdbRating} IMDb Rating &bull; {country}
              </p>
            </div>
          </div>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setMovieRate={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>you watched this movie and gave {watchedUserRating} ⭐</p>
              )}
            </div>
            <em>{plot}</em>
            <p>Starring: {actors}</p>
            <p>Director: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

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
          <span>{avgImdbRating.toPrecision(3)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toPrecision(3)}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{avgRuntime.toPrecision(3)}min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img
        className="imger"
        src={movie.poster}
        alt={`${movie.title} poster`}
      ></img>
      <h3>{movie.title}</h3>
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
