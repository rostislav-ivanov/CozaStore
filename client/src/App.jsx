import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/Details/Details";
import NotFound from "./components/NotFound";
import AboutTeam from "./components/AboutTeam";
import AboutUs from "./components/AboutUs";
import AboutMission from "./components/AboutMission";
import Home from "./components/Home";
import { BagProvider } from "./context/bagContext";

function App() {
  return (
    <BagProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />}>
          <Route path="team" element={<AboutTeam />} />
          <Route path="us" element={<AboutUs />} />
          <Route path="mission" element={<AboutMission />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/products/:id/:userId" element={<Details />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </BagProvider>
  );
}

export default App;
