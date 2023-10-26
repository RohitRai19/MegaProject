import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login, } from "./components/index.js";
import AllPost from "./components/pages/AllPost.jsx";
import AddPost from "./components/pages/AddPost.jsx";
import EditPost from "./components/pages/EditPost.jsx";
import Post from "./components/pages/Post.jsx";
import Home from './components/pages/Home.jsx'
import Signup from './components/pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/Signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-post",
        element: (
          <AuthLayout authentication>
          {""} 
           <AllPost />
           </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {""}
             <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {""} <EditPost />
          </AuthLayout>
        ),
      },
      { path: "post/:slug", element: <Post /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
