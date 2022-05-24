import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../movie/MovieCard";

const MovieDetailPage = () => {
  const { moviesID } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(moviesID), fetcher);
  if (!data) return null;
  const { poster_path, backdrop_path, title, genres, overview } = data;
  return (
    <>
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70 rounded-xl"></div>
        <div
          className="w-full h-full bg-cover rounded-xl bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.movieImage(backdrop_path)})`,
          }}
        ></div>
        <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
          <img
            src={tmdbAPI.movieImage(poster_path)}
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          {title}
        </h1>
        {genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-5 mb-10">
            {genres.map((item) => (
              <span
                key={item.id}
                className="text-sm text-primary py-2 px-6 border border-primary rounded-md"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <div className="leading-relaxed max-w-[600px] mx-auto mb-32">
          {overview}
        </div>
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
    </>
  );
};

function MovieMeta({ type = "videos" }) {
  const { moviesID } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(moviesID, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <>
        <h2 className="text-2xl mb-10 bg-secondary rounded-lg inline-block px-6 py-3">
          Cast
        </h2>
        <div className="grid grid-cols-4 gap-5 mb-32">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.movieImage(item.profile_path)}
                alt=""
                className="w-full h-[300px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-center text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos") {
      return (
        <>
          <h2 className="text-2xl font-medium mb-10 px-6 py-3 inline-block bg-secondary rounded-lg">
            Trailer video
          </h2>
          <div className="flex flex-col gap-10">
            {results.slice(0, 1).map((item) => (
              <div key={item.id} className="w-full aspect-video mb-32">
                <iframe
                  width="864"
                  height="486"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="Youtube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-white; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div className="py-20">
          <h2 className="text-2xl font-medium mb-10 px-6 py-3 inline-block bg-secondary rounded-lg">
            Similar Movie
          </h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      );
    }
  }
}

// function MovieCredit({ item }) {
//   const { moviesID } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(moviesID, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;
//   return (
//     <>
//       <h2 className="text-2xl mb-10 bg-secondary rounded-lg inline-block px-6 py-3">
//         Cast
//       </h2>
//       <div className="grid grid-cols-4 gap-5 mb-32">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={tmdbAPI.movieImage(item.profile_path)}
//               alt=""
//               className="w-full h-[300px] object-cover rounded-lg mb-3"
//             />
//             <h3 className="text-center text-xl font-medium">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// function MovieTrailer() {
//   const { moviesID } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(moviesID, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <>
//       <h2 className="text-2xl font-medium mb-10 px-6 py-3 inline-block bg-secondary rounded-lg">
//         Trailer video
//       </h2>
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 1).map((item) => (
//           <div key={item.id} className="w-full aspect-video mb-32">
//             <iframe
//               width="864"
//               height="486"
//               src={`https://www.youtube.com/embed/${item.key}`}
//               title="Youtube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-white; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-full object-fill"
//             ></iframe>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// function MovieSimilar() {
//   const { moviesID } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(moviesID, "similar"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-20">
//       <h2 className="text-2xl font-medium mb-10 px-6 py-3 inline-block bg-secondary rounded-lg">
//         Similar Movie
//       </h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.map((item) => (
//             <SwiperSlide key={item.id}>
//               <MovieCard item={item}></MovieCard>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetailPage;
