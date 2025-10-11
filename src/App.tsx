import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./layout/Layout"));
const ProductList = lazy(() => import("./Products/ProductList"));
const OrderList = lazy(() => import("./Orders/OrderList"));
const NotFoundPage = lazy(() => import("./components/NotFound"));

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "/",
        Component: ProductList,
      },
      {
        path: "/products",
        Component: ProductList,
      },
      {
        path: "/orders",
        Component: OrderList,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
