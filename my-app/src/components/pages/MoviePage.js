import ReactPaginate from "react-paginate";
import MovieLoading from "./MovieLoading";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import useDebounce from "../../hooks/useDebounce";
import MovieCard from "../movie/MovieCard";

const itemsPerPage = 20;

const MoviePage = () => {
  // We start with an empty list of items.
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [pageIndex, setPageIndex] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieUrl("popular", pageIndex));
  const filterDebounce = useDebounce(filter);
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, pageIndex));
    } else {
      setUrl(tmdbAPI.getMovieUrl("popular", pageIndex));
    }
  }, [filterDebounce, pageIndex]);
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPageIndex(event.selected + 1);
  };
  return (
    <div className="p-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full outline-none bg-slate-800 text-white p-4 rounded-lg"
            placeholder="Search..."
            onChange={handleFilter}
          />
        </div>
        <button className="bg-primary text-white p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10 mb-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-x-[40px] mb-10">
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default MoviePage;
