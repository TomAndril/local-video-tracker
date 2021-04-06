import { RouteProps } from 'react-router';

// COMPONENTS
import Main from '../pages/Main';
import Project from '../pages/Project';

// eslint-disable-next-line import/prefer-default-export
export const routes: RouteProps[] = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/project',
    component: Project,
  },
];
