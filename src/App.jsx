import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/Details";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<Details />} />
        {/* <Route path="/products/:id/:userId" element={<Details />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
