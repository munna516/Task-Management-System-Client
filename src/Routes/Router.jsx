import { createBrowserRouter, Link } from "react-router-dom";
import { RootLayout } from "../Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [{
        path: '/',
    }],
  },
]);
export default router;
