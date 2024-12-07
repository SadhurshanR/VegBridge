import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { v7_relativeSplatPath } from 'react-router-dom/future';
import './index.css';
import App from './App';

const router = createBrowserRouter({
  future: { v7_relativeSplatPath },
  routes: [
    {
      path: '/',
      element: <App />,
      // add your other routes here
    },
    // Add other routes as needed
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
