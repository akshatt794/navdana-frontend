import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// Auth token persistence
import { setAuthToken } from "./api";
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

// Component imports
import Header from './Component/Navbar'
import OfferZone from './Component/Offerzone'
import Collection from './Component/Collection'
import ExploreAndBuy from './Component/ExploreAndBuy'
import Footer1 from './Component/Footer1.JSX'
import Detailsprod from './Component/detailsprod'
import HappyCustomers from './Component/HappyCustomers'
import Footer2 from './Component/Footer2'
import SuitSet from './Component/SuitSet'
import LuxeSet from './Component/LuxeSet'

// category pages
import Kurtas from './Component/category/Kurtas'
import SuitSetCategory from './Component/category/Suit'
import LuxeSetCategory from './Component/category/Luxe'

// Pages imports
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Login route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/dashboard' element={<Dashboard />} />

            {/* Kurtas category route */}
            <Route path="/category/kurtas" element={<Kurtas />} />
            <Route path="/category/suitset" element={<SuitSetCategory />} />
            <Route path="/category/luxeset" element={<LuxeSetCategory />} />

            {/* Home route (default page content) */}
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
  )
}

export default App
