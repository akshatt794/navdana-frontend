import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";
// import logo from "/Images/LOGO.PNG";
import { Link } from "react-router-dom";

// Nav links with their respective routes
const navLinks = [
  { name: "Kurtas", to: "/category/kurtas" },
  { name: "Co-ord Sets", to: "/category/co-ord-sets" },
  { name: "Bestsellers", to: "/bestsellers" },
  { name: "Suit Set", to: "/category/suit-set" },
  { name: "Tie Dye", to: "/category/tie-dye" },
  { name: "Luxe", to: "/category/luxe" },
  { name: "Tunics", to: "/category/tunics" },
  { name: "All Products", to: "/products" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      {/* Top strip */}
      <div
        style={{
          textAlign: "center",
          height: "50px",
          backgroundColor: "#000",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "20px",
            font: "mediumy"
          }}
        >
          COD Available | Express Shipping (PAN INDIA)
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-3 py-1 flex justify-between items-center text-black h-20">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-50 overflow-hidden w-50" /> */}
        </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex gap-6 font-medium">
          {navLinks.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className="transition text-black hover:text-gray-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Search
            className="w-6 h-6 cursor-pointer"
            color="#000"
            strokeWidth={2.5}
          />
          <div className="relative">
            <User
              className="w-6 h-6 cursor-pointer"
              color="#000"
              strokeWidth={2.5}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            />
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
          <ShoppingCart
            className="w-6 h-6 cursor-pointer"
            color="#000"
            strokeWidth={2.5}
          />
          {/* Hamburger Menu */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "#000" }}
          >
            <Menu className="w-6 h-6" color="#000" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          {navLinks.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className="block font-medium text-black hover:text-gray-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
