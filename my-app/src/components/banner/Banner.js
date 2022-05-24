import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner page-container h-[600px] mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item: { poster_path, title, id } }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full h-full rounded-xl relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-xl"></div>
      <img
        src={tmdbAPI.movieImage(poster_path)}
        alt=""
        className="w-full h-full rounded-xl object-cover"
      />
      <div className="absolute bottom-8 left-8 w-full text-white">
        <h2 className=" text-[40px] font-bold mb-5 capitalize">{title}</h2>
        <div className="flex items-center gap-x-3 mb-7">
          <span className="text-xs py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="text-xs py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="text-xs py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>
        <Button
          className="text-lg font-medium bg-primary px-18 py-3 rounded-lg flex items-center justify-center gap-x-2"
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default Banner;
