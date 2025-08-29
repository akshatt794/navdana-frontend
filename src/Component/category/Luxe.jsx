import React, { useState, useEffect } from 'react';

// Hardcoded product data for Luxe category
const allProducts = [
  {
    id: 1,
    name: 'Ivory Luxe Hand Block Printed Set',
    image: 'https://placehold.co/600x800/e9e7e5/000?text=Luxe+Product+1',
    price: 3499,
    size: 'M',
  },
  {
    id: 2,
    name: 'Gold Embroidered Luxe Kurta Set',
    image: 'https://placehold.co/600x800/e9e7e5/000?text=Luxe+Product+2',
    price: 3999,
    size: 'L',
  },
  {
    id: 3,
    name: 'Pastel Pink Luxe Suit Set',
    image: 'https://placehold.co/600x800/e9e7e5/000?text=Luxe+Product+3',
    price: 4299,
    size: 'S',
  },
  {
    id: 4,
    name: 'Royal Blue Luxe Anarkali',
    image: 'https://placehold.co/600x800/e9e7e5/000?text=Luxe+Product+4',
    price: 4599,
    size: 'XL',
  },
  {
    id: 5,
    name: 'Emerald Green Luxe Set',
    image: 'https://placehold.co/600x800/e9e7e5/000?text=Luxe+Product+5',
    price: 3799,
    size: 'M',
  },
];

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

export default function Luxe() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('XS');
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const [filterStates, setFilterStates] = useState({
    size: true,
    price: true,
  });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(5000);

  // Sort state
  const [sortBy, setSortBy] = useState('featured');

  // Hide/show body scroll and navbar when sidebar is open/closed
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      const navbars = document.querySelectorAll('nav, .navbar, #navbar, header');
      navbars.forEach(nav => {
        nav.dataset._originalDisplay = nav.style.display;
        nav.style.display = 'none';
      });
    } else {
      document.body.style.overflow = '';
      const navbars = document.querySelectorAll('nav, .navbar, #navbar, header');
      navbars.forEach(nav => {
        if (nav.dataset._originalDisplay !== undefined) {
          nav.style.display = nav.dataset._originalDisplay;
          delete nav.dataset._originalDisplay;
        } else {
          nav.style.display = '';
        }
      });
    }
    return () => {
      document.body.style.overflow = '';
      const navbars = document.querySelectorAll('nav, .navbar, #navbar, header');
      navbars.forEach(nav => {
        if (nav.dataset._originalDisplay !== undefined) {
          nav.style.display = nav.dataset._originalDisplay;
          delete nav.dataset._originalDisplay;
        } else {
          nav.style.display = '';
        }
      });
    };
  }, [isSidebarOpen]);

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const sizeMatches = selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const priceMatches = product.price <= selectedPrice;
    return sizeMatches && priceMatches;
  });

  // Sort products
  const sortedProducts = React.useMemo(() => {
    let products = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        break;
    }
    return products;
  }, [filteredProducts, sortBy]);

  // Sidebar open/close
  const handleOpenSidebar = (product) => {
    setSelectedProduct(product);
    setQuickViewQuantity(1);
    setQuickViewSize('XS');
    setIsSidebarOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedProduct(null);
  };

  // Filter toggles
  const handleFilterToggle = (filterName) => {
    setFilterStates(prevState => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  // Size filter
  const handleSizeFilter = (size) => {
    setSelectedSizes(prevSizes => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter(s => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  // Price filter
  const handlePriceChange = (event) => {
    setSelectedPrice(parseInt(event.target.value));
  };

  // Sort dropdown
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Quick View Sidebar
  const ProductQuickView = ({ isOpen, onClose, product }) => {
    if (!product) return null;
    return (
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[70vw] lg:w-96 bg-white shadow-xl z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        style={{ maxWidth: '100vw' }}
      >
        <div className="p-4 sm:p-6 relative h-full flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg font-bold mb-4 mt-2 sm:mt-0 text-center">CHOOSE OPTIONS</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mb-6">
            <img src={product.image} alt={product.name} className="w-32 h-40 object-cover rounded-md mx-auto sm:mx-0" />
            <div className="mt-3 sm:mt-0 text-center sm:text-left">
              <h3 className="font-medium text-sm">TARA C TARA</h3>
              <h4 className="text-base font-semibold">{product.name}</h4>
              <p className="text-gray-600 text-sm mt-1">Rs. {product.price.toLocaleString()}.00</p>
            </div>
          </div>
          {/* Size Selection */}
          <div className="mb-6">
            <p className="font-medium text-sm mb-2">
              Size: <span className="font-normal text-gray-600">{quickViewSize}</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setQuickViewSize(size)}
                  className={`px-3 py-2 rounded-lg text-xs border border-gray-200 transition-all duration-200 ease-in-out ${quickViewSize === size ? 'border-black bg-gray-100' : 'hover:bg-gray-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="mb-6">
            <p className="font-medium text-sm mb-2">Quantity:</p>
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <button
                onClick={() => setQuickViewQuantity(prevQty => Math.max(1, prevQty - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <input
                type="text"
                value={quickViewQuantity}
                readOnly
                className="w-12 text-center border-0 bg-transparent focus:ring-0 text-lg font-medium"
              />
              <button
                onClick={() => setQuickViewQuantity(prevQty => prevQty + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="space-y-4 mt-auto">
            <button className="w-full py-3 rounded-full bg-[#e9e7e5] text-gray-800 font-bold hover:bg-gray-200 transition-colors">
              ADD TO CART
            </button>
            <button className="w-full py-3 rounded-full border border-gray-800 text-gray-800 font-bold hover:bg-gray-800 hover:text-white transition-colors">
              BUY IT NOW
            </button>
          </div>
          <a href="#" className="block text-center mt-4 text-sm text-gray-600 hover:underline">View details</a>
        </div>
      </div>
    );
  };

  // Mobile filter drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="text-gray-800 font-sans min-h-screen bg-[#f7f3ed] relative">
      {/* Home / LuxeSet */}
      <div className="w-full">
        <p className="text-sm text-gray-500 text-start w-full px-4 pt-8 sm:px-8">Home / LuxeSet</p>
      </div>
      {/* Header */}
      <div className="container mx-auto w-full flex flex-col items-center mb-6">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl lg:text-4xl font-light mt-8">LUXE SET</h1>
        </div>
      </div>
      {/* Mobile filter button */}
      <div className="flex sm:hidden justify-end px-4 mb-2">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium shadow-sm"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 7a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 7a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
          </svg>
          Filters
        </button>
      </div>
      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row p-2 sm:p-6 lg:p-12 space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Filters Sidebar */}
        <aside className="hidden sm:block w-full lg:w-1/4 xl:w-1/5 bg-transparent p-4 sm:p-6 rounded-xl shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">FILTERS</h3>
          {/* Size Filter */}
          <div className={`py-4 border-b transition-all duration-300 ${filterStates.size ? 'active' : ''}`}>
            <div onClick={() => handleFilterToggle('size')} className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">Size</span>
              <svg className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${filterStates.size ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={`mt-4 grid grid-cols-3 gap-2 text-sm overflow-hidden transition-all duration-300 ease-in-out ${filterStates.size ? 'max-h-500' : 'max-h-0'}`}>
              {['XS', 'S', 'M', 'M/L', 'L', 'XL', 'XXL', 'XXL (62)', '3XL', '4XL', '5XL', '6XL', 'XL/XXS', 'XS / S / M'].map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeFilter(size)}
                  className={`size-btn px-4 py-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 ${selectedSizes.includes(size) ? 'border-black bg-gray-100' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Price Filter */}
          <div className={`py-4 transition-all duration-300 ${filterStates.price ? 'active' : ''}`}>
            <div onClick={() => handleFilterToggle('price')} className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">Price</span>
              <svg className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${filterStates.price ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${filterStates.price ? 'max-h-500' : 'max-h-0'}`}>
              <input
                type="range"
                min="2000"
                max="5000"
                value={selectedPrice}
                onChange={handlePriceChange}
                className="w-full accent-gray-800"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>Rs. 2,000</span>
                <span>Rs. 5,000</span>
              </div>
              <p className="text-sm mt-2">Selected Price: <span className="font-semibold">Rs. {selectedPrice.toLocaleString()}</span></p>
            </div>
          </div>
        </aside>
        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setMobileFilterOpen(false)}
            />
            <aside className="fixed top-0 left-0 w-11/12 max-w-xs h-full bg-white z-50 shadow-lg p-4 transition-transform duration-300 ease-in-out animate-slide-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">FILTERS</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Size Filter */}
              <div className={`py-4 border-b transition-all duration-300 ${filterStates.size ? 'active' : ''}`}>
                <div onClick={() => handleFilterToggle('size')} className="flex justify-between items-center cursor-pointer">
                  <span className="font-medium">Size</span>
                  <svg className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${filterStates.size ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`mt-4 grid grid-cols-3 gap-2 text-sm overflow-hidden transition-all duration-300 ease-in-out ${filterStates.size ? 'max-h-500' : 'max-h-0'}`}>
                  {['XS', 'S', 'M', 'M/L', 'L', 'XL', 'XXL', 'XXL (62)', '3XL', '4XL', '5XL', '6XL', 'XL/XXS', 'XS / S / M'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeFilter(size)}
                      className={`size-btn px-4 py-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 ${selectedSizes.includes(size) ? 'border-black bg-gray-100' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Filter */}
              <div className={`py-4 transition-all duration-300 ${filterStates.price ? 'active' : ''}`}>
                <div onClick={() => handleFilterToggle('price')} className="flex justify-between items-center cursor-pointer">
                  <span className="font-medium">Price</span>
                  <svg className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${filterStates.price ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${filterStates.price ? 'max-h-500' : 'max-h-0'}`}>
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    className="w-full accent-gray-800"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>Rs. 2,000</span>
                    <span>Rs. 5,000</span>
                  </div>
                  <p className="text-sm mt-2">Selected Price: <span className="font-semibold">Rs. {selectedPrice.toLocaleString()}</span></p>
                </div>
              </div>
            </aside>
          </>
        )}
        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort and product count row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 px-2 sm:px-0">
            <p className="text-gray-500 text-sm mb-2 sm:mb-0">
              <span className="font-semibold">{sortedProducts.length}</span> products
            </p>
            {/* Sort by dropdown */}
            <div className="flex items-center space-x-2 justify-end">
              <label htmlFor="sort-by" className="text-sm text-gray-700 font-medium">Sort by</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-full px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map(product => (
                <div key={product.id} className="group product-card bg-white rounded-lg shadow-sm relative">
                  <div className="relative">
                    <a href="#">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-auto object-cover rounded-t-lg"
                      />
                    </a>
                    {/* Quick view button */}
                    <button
                      onClick={() => handleOpenSidebar(product)}
                      className="
                        absolute left-1/2 bottom-2 sm:bottom-4 transform -translate-x-1/2
                        opacity-100 sm:opacity-0 group-hover:opacity-100
                        transition-all duration-300 ease-in-out
                        bg-white bg-opacity-90 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-md
                        text-xs sm:text-base
                      "
                    >
                      Quick view
                    </button>
                  </div>
                  <div className="p-2 sm:p-4 text-center">
                    <h3 className="text-xs sm:text-base font-medium">{product.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Rs. {product.price.toLocaleString()}.00</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No products match your filters.</p>
            )}
          </div>
        </div>
      </main>
      {/* Right "Choose Options" Sidebar */}
      <ProductQuickView isOpen={isSidebarOpen} onClose={handleCloseSidebar} product={selectedProduct} />
      {/* Sidebar Overlay */}
      <div
        onClick={handleCloseSidebar}
        className={`
          fixed inset-0 bg-black transition-opacity duration-300 z-40
          ${isSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      ></div>
    </div>
  );
}
