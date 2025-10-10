import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ProductList from "./Products/ProductList";
import OrderList from "./Orders/OrderList";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/categories" element={<CategoryList />} /> */}
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
