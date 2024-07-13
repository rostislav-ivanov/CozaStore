import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/backToTop/BackToTop";
import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/details/Details";
import NotFound from "./components/notFound/NotFound";
import AboutTeam from "./components/AboutTeam";
import AboutUs from "./components/AboutUs";
import AboutMission from "./components/AboutMission";
import Home from "./components/home/Home";
import { BagProvider } from "./context/bagContext";
import ProductLists from "./components/productsList/ProductsList";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <BagProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductLists />} />
        <Route path="/products/:category" element={<ProductLists />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
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
