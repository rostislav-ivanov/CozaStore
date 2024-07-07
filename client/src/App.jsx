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
import AboutTeam from "./components/AboutTeam";
import AboutUs from "./components/AboutUs";
import AboutMission from "./components/AboutMission";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/products" element={<ProductList categ="" />} />
        <Route path="/products/women" element={<ProductList categ="women" />} />
        <Route path="/products/men" element={<ProductList categ="man" />} />
        <Route path="/products/bag" element={<ProductList categ="bag" />} />
        <Route path="/products/shoes" element={<ProductList categ="shoes" />} />
        <Route
          path="/products/watches"
          element={<ProductList categ="watches" />}
        />
        <Route path="/about" element={<About />}>
          <Route path="team" element={<AboutTeam />} />
          <Route path="us" element={<AboutUs />} />
          <Route path="mission" element={<AboutMission />} />
        </Route>
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
