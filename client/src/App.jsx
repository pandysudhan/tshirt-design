import NavBar from "./components/NavBar";
import BrowseDesignPage from "./pages/browse_design_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DesignProductPage from "./pages/design_product";
import Login from "./pages/login_pages/login";
import SignUp from "./pages/login_pages/signup";
import OrderPage from "./pages/order_page";
import MyOrdersPage from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<BrowseDesignPage />} />
        <Route path="/design" element={<DesignProductPage />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/checkout" element={<OrderPage></OrderPage>} />
        <Route path="/my_orders" element={<MyOrdersPage></MyOrdersPage>} />
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
