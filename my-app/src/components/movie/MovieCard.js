import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({
  item: { title, poster_path, release_date, vote_average, id },
}) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-xl p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.movieImage(poster_path)}
        alt=""
        className="w-full h-[300px] object-cover rounded-xl mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between mb-6 text-xs opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button
          className="capitalize bg-primary text-lg font-medium px-6 py-3 rounded-xl mt-auto"
          onClick={() => navigate(`/movie/${id}`)}
          full
        >
          Watch now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return <div className="text-red-500">Something went wrong</div>;
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
