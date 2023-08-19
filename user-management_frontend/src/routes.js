import { useRoutes } from 'react-router-dom';
import TopBar from './layouts/top-bar/TopBar';
import ManageUsersPage from './pages/ManageUsersPage';
import User from './sections/admin-section/store/User';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <TopBar />,
      children: [
        { path: '', element: <ManageUsersPage /> },
        { path: 'user', element: <User /> },
      ]
    },
  ]);

  return routes;
}
