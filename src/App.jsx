// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Auth token persistence
import { setAuthToken } from "./api.js";
const token = localStorage.getItem("token");
if (token) setAuthToken(token);

// ----- Component imports (match exact case & .jsx) -----
import Header from "./Component/Navbar.jsx";
import OfferZone from "./Component/Offerzone.jsx";
import Collection from "./Component/Collection.jsx";
import ExploreAndBuy from "./Component/ExploreAndBuy.jsx";
import Footer1 from "./Component/Footer1.jsx";
import Detailsprod from "./Component/Detailsprod.jsx";
import HappyCustomers from "./Component/HappyCustomers.jsx";
import Footer2 from "./Component/Footer2.jsx";
import SuitSet from "./Component/SuitSet.jsx";
import LuxeSet from "./Component/LuxeSet.jsx";

// ----- Pages -----
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Auth/Admin */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Category routes — TEMP mapped to existing components so build succeeds.
                Replace these elements with your real category pages when you add them. */}
            <Route path="/category/kurtas" element={<Collection />} />
            <Route path="/category/suitset" element={<SuitSet />} />
            <Route path="/category/luxeset" element={<LuxeSet />} />

            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <OfferZone />
                  <Collection />
                  <ExploreAndBuy />
                  <SuitSet />
                  <LuxeSet />
                  <Footer1 />
                  <Detailsprod />
                  <HappyCustomers />
                </>
              }
            />
          </Routes>

          <Footer2 />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
