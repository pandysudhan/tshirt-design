import NavBar from "./components/NavBar";
import BrowseDesignPage from "./pages/browse_design_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DesignProductPage from "./pages/design_product";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<BrowseDesignPage />} />
        <Route path="/design" element={<DesignProductPage />} />
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
