import React from "react";

const products = [
  {
    id: 1,
    image: "public/Images/White-Red.jpg",
    title: "Rani Pink Radiance Suit Set",
    priceAfter: 2999,
    priceBefore: 3999,
    discount: 25,
  },
  {
    id: 2,
    image: "/Images/White-Red.jpg",
    title: "Fuchsia Floral Suit Set",
    priceAfter: 3199,
    priceBefore: 4299,
    discount: 25,
  },
  {
    id: 3,
    image: "public/Images/White-Red.jpg",
    title: "Rani Pink Radiance Suit Set",
    priceAfter: 2999,
    priceBefore: 3999,
    discount: 25,
  },
  {
    id: 4,
    image: "/Images/White-Red.jpg",
    title: "Fuchsia Floral Suit Set",
    priceAfter: 3199,
    priceBefore: 4299,
    discount: 25,
  },
  {
    id: 5,
    image: "public/Images/White-Red.jpg",
    title: "Rani Pink Radiance Suit Set",
    priceAfter: 2999,
    priceBefore: 3999,
    discount: 25,
  },
  {
    id: 6,
    image: "/Images/White-Red.jpg",
    title: "Fuchsia Floral Suit Set",
    priceAfter: 3199,
    priceBefore: 4299,
    discount: 25,
  },
  {
    id: 7,
    image: "public/Images/White-Red.jpg",
    title: "Rani Pink Radiance Suit Set",
    priceAfter: 2999,
    priceBefore: 3999,
    discount: 25,
  },
  {
    id: 8,
    image: "/Images/White-Red.jpg",
    title: "Fuchsia Floral Suit Set",
    priceAfter: 3199,
    priceBefore: 4299,
    discount: 25,
  },
  // You can continue adding more unique products here...
];

const LuxeSet = () => {
  return (
    <div className="w-full px-4 py-1">
      {/* Heading */}
      <h2 className="text-3xl font-medium text-center mb-8">
        LUXE SET
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-cover"
              />

              {/* Discount Badge */}
              <div className="absolute bottom-3 left-3 bg-[#2C4A52] text-white text-sm px-3 py-1 rounded-sm group-hover:opacity-0 transition">
                SAVE {product.discount}%
              </div>

              {/* Hover Quick View */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#2C4A52] text-white text-center py-3 rounded-[2px] opacity-0 group-hover:opacity-100 transition">
                Quick view
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-3">
              <p className="text-gray-800">{product.title}</p>
              <div className="flex items-center gap-3">
                <span className="font-semibold">₹{product.priceAfter}</span>
                <span className="line-through text-gray-500">
                  ₹{product.priceBefore}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Added Button Section */}
      <div className="w-full flex justify-center mt-12">
        <button
          className="relative overflow-hidden bg-[#F0E5C7] text-black px-10 py-4 rounded font-medium shadow transition duration-300 hover:text-white"
          style={{ border: "none" }}
        >
          <span className="relative z-10">VIEW ALL</span>
          <span className="absolute inset-0 bg-[#e2d3a9] wave-animation"></span>
        </button>

        <style>{`
          .wave-animation {
            transform: translateY(100%);
            transition: transform 0.5s ease;
            z-index: 0;
          }
          button:hover .wave-animation {
            transform: translateY(0%);
          }
        `}</style>
      </div>
      {/* 🔹 End of Added Section */}
    </div>
  );
};

export default LuxeSet;
