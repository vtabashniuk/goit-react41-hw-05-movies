import { HomePage, MoviesPage, SingleMoviePage } from 'pages';
import { Routes, Route } from 'react-router-dom';
import routes from 'routes/routes';
import { Layout } from './Layout/Layout';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.movies} element={<MoviesPage />}/>
          <Route path={routes.singleMovie} element={<SingleMoviePage />}/>
        </Route>
      </Routes>
    </>
  );
};
