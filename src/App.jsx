import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./assets/pages/Product";
import Homepage from "./assets/pages/Homepage";
import Pricing from "./assets/pages/Pricing";
import PageNotFound from "./assets/pages/PageNotFound";
import AppLayout from "./assets/pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
