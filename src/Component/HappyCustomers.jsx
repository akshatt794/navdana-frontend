import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample customer reviews
const reviews = [
  {
    id: 1,
    name: "mes_suse",
    rating: 5,
    comment: "Amazing service! Highly recommend.",
    image: "/Images/colorfull.jpg"
  },
  {
    id: 2,
    name: "lovely",
    rating: 4,
    comment: "Very satisfied with the product quality.",
    image: "/Images/sky-blue.jpg"
  },
  {
    id: 3,
    name: "pihu",
    rating: 5,
    comment: "Great experience, fast delivery.",
    image: "/Images/Black.jpg"
  },
  {
    id: 4,
    name: "priya",
    rating: 4,
    comment: "Product exceeded my expectations.",
    image: "/Images/Yellow.jpg"
  },
  {
    id: 5,
    name: "payal",
    rating: 5,
    comment: "Fantastic support team!",
    image: "https://via.placeholder.com/300x200"
  }
];

// Custom Left Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full cursor-pointer hover:bg-gray-100"
    >
      <ArrowLeft size={30} />
    </div>
  );
}

// Custom Right Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full cursor-pointer hover:bg-gray-100"
    >
      <ArrowRight size={30} />
    </div>
  );
}

export default function HappyCustomers() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="max-w-9xl mx-auto px-5 py-8 relative">
      <h2 className="text-center text-2xl font-bold mb-6">Happy Customers</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="px-[28px]">
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center text-center h-[440px]">
              
              {/* Bigger Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-[280px] object-cover rounded-xl mb-4"
              />

              {/* Stars */}
              <div className="flex mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
                ))}
              </div>

              {/* Name */}
              <p className="font-semibold text-base">{review.name}</p>

              {/* Comment */}
              <p className="text-gray-600 text-sm mt-2 px-2 line-clamp-3">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
