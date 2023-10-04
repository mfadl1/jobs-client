import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './pages/login';
import JobPage from './pages/job';
import JobDetailPage from './pages/job_detail';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <JobPage />
  },
  {
    path: "/login",
    element:
      <LoginPage />
  },
  {
    path: "/job-detail/:id",
    element:
      <JobDetailPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

