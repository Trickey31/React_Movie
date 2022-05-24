import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import MovieLoading from "./components/pages/MovieLoading";

const HomePage = lazy(() => import("./components/pages/HomePage"));
const MoviePage = lazy(() => import("./components/pages/MoviePage"));
const MovieDetailPage = lazy(() =>
  import("./components/pages/MovieDetailPage")
);

function App() {
  return (
    <Fragment>
      <Suspense fallback={<MovieLoading></MovieLoading>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:moviesID"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
