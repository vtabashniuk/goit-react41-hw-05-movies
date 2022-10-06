import { AppBar } from 'components/AppBar/AppBar';
import { labels } from 'constants/labels';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header>
        <AppBar labels={labels} />
      </header>
      <Outlet />
    </>
  );
};
