import { ShoppingBag, Pocket, X } from "lucide-react";
import { useState } from "react";
// import Gray from "/Images/Grey.jpg";
// import Black from "/Images/Black.jpg";
// import Blueflower from "/Images/blue-flower.jpg";
// import Blue from "/Images/Blue.jpg";
// import Maroon from "/Images/Maroon.jpg";
// import PinkBlue from "/Images/pink-blue.jpg";
// import Purple from "/Images/Purple.jpg";
// import voilet from "/Images/voilet.jpg";
// import Yellow from "/Images/Yellow.jpg";
// import Yellowcotton from "/Images/yellow-cotton.jpg";
// import YellowBlack from "/Images/yellow-black.jpg";
// import Whitered from "/Images/White-Red.jpg";

const products = [
//   { id: 1, name: "Floral Suit Set", image: Gray, priceBefore: 2499, priceAfter: 1999, discountPercent: 20 },
//   { id: 2, name: "Pastel Embroidered Set", image: Black, priceBefore: 2799, priceAfter: 2239, discountPercent: 20 },
//   { id: 3, name: "Indigo Cotton Suit", image: Blueflower, priceBefore: 2199, priceAfter: 1759, discountPercent: 20 },
//   { id: 4, name: "Block Print Kurta Set", image: Blue, priceBefore: 2999, priceAfter: 2399, discountPercent: 20 },
//   { id: 5, name: "Chikankari Suit", image: Maroon, priceBefore: 2699, priceAfter: 2159, discountPercent: 20 },
//   { id: 6, name: "Linen Festive Set", image: PinkBlue, priceBefore: 2599, priceAfter: 2079, discountPercent: 20 },
//   { id: 7, name: "Anarkali Dupatta Set", image: Purple, priceBefore: 3199, priceAfter: 2559, discountPercent: 20 },
//   { id: 8, name: "Boho Chic Suit", image: voilet, priceBefore: 2899, priceAfter: 2319, discountPercent: 20 },
//   { id: 9, name: "Geometric Kurta Set", image: Yellow, priceBefore: 2399, priceAfter: 1919, discountPercent: 20 },
//   { id: 10, name: "Elegant Ethnic Wear", image: Yellowcotton, priceBefore: 2699, priceAfter: 2159, discountPercent: 20 },
//   { id: 11, name: "Silk Blend Suit", image: YellowBlack, priceBefore: 2999, priceAfter: 2399, discountPercent: 20 },
//   { id: 12, name: "Tie & Dye Dupatta Set", image: Whitered, priceBefore: 2499, priceAfter: 1999, discountPercent: 20 },
];

export default function SuitSet() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedSize("XS");
  };

  return (
    <section className="px-4 py-12 bg-white">
      <h2 className="text-3xl font-medium text-center mb-8">SUIT SET</h2>

      {/* Product Grid */}
      <div className="max-w-9xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="relative h-110 w-full overflow-hidden rounded-lg shadow bg-gray-100 group-hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Discount Tag */}
              <div className="absolute bottom-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded font-semibold">
                Save {product.discountPercent}%
              </div>

              {/* Pocket Button */}
              <button className="absolute top-2 right-2 flex flex-col items-center justify-center bg-gray-600 text-white w-16 h-16 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-center">
                <Pocket className="w-6 h-6 mb-1" />
                <span className="text-[9px] font-semibold leading-tight">With</span>
                <span className="text-[9px] font-semibold leading-tight">Pocket</span>
              </button>

              {/* Quick View Button - Desktop Only */}
              <div
                className="absolute bottom-2 left-2 right-2 bg-gray-900 text-white text-center py-3 opacity-0 group-hover:opacity-100 transition rounded-[8px] cursor-pointer hidden sm:block"
                onClick={() => handleQuickView(product)}
              >
                Quick view
              </div>

              {/* Add to Bag Button - Mobile Only */}
              <div className="absolute bottom-2 right-2 sm:hidden">
                <button
                  className="flex items-center bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium hover:bg-gray-700 transition"
                  onClick={() => handleQuickView(product)}
                >
                  <ShoppingBag className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-2 flex flex-col items-start">
              <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
              <div className="text-sm font-semibold text-pink-600">
                ₹{product.priceAfter}{" "}
                <span className="text-gray-500 font-normal line-through text-xs ml-2">
                  ₹{product.priceBefore}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL Button */}
      <div className="w-full flex justify-center mt-12">
        <button className="relative overflow-hidden bg-[#F0E5C7] text-black px-10 py-4 rounded font-medium shadow transition duration-300 hover:text-white view-all-btn">
          <span className="relative z-10">VIEW ALL</span>
          <span className="absolute inset-0 bg-[#e2d3a9] wave-animation"></span>
        </button>
      </div>

      {/* Quick View Drawer */}
      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="w-full sm:w-[450px] bg-[#FFF9F2] h-full shadow-lg p-5 overflow-y-auto">
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-gray-600" onClick={closeQuickView}>
              <X size={24} />
            </button>

            {/* Product Image & Info */}
            <div className="flex space-x-4">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-32 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-gray-700 mt-1">Rs. {selectedProduct.priceAfter.toLocaleString()}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-5">
              <p className="font-medium mb-2">Size: {selectedSize}</p>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded px-3 py-2 text-sm ${
                      selectedSize === size ? "border-black bg-gray-100" : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5">
              <p className="font-medium mb-2">Quantity:</p>
              <div className="flex items-center space-x-3">
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button className="border px-3 py-1 rounded" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-[#E5D5B3] py-3 rounded font-medium text-gray-800">
                ADD TO CART
              </button>
              <button className="w-full border border-gray-800 py-3 rounded font-medium text-gray-800">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
