import { HomePage, MoviesPage, SingleMoviePage } from 'pages';
import { Routes, Route } from 'react-router-dom';
import routes from 'routes/routes';
import { Layout } from './Layout/Layout';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.movies} element={<MoviesPage />} />
          <Route path={routes.singleMovie} element={<SingleMoviePage />}>
            <Route path={routes.cast} element={<Cast />} />
            <Route path={routes.reviews} element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
