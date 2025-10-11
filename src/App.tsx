import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import ProductList from "./Products/ProductList";
import OrderList from "./Orders/OrderList";

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
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
