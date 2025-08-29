import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

// Left arrow button
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white text-black shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-800 hover:text-white z-20"
      onClick={onClick}
    >
      <ArrowLeft className="w-6 h-6" />
    </div>
  );
}

// Right arrow button
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white text-black shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-800 hover:text-white z-20"
      onClick={onClick}
    >
      <ArrowRight className="w-6 h-6" />
    </div>
  );
}

// Card Component
function VideoCard({ item }) {
  return (
    <div className="px-2">
      {/* Card wrapper with fixed size */}
      <div className="relative bg-gray-100 rounded-lg h-[420px] w-[270px] shadow-md hover:shadow-lg transition overflow-hidden">
        
        {/* Eye icon with views counter */}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 z-10">
          <Eye className="w-4 h-4" />
          <span>{item.views}K</span>
        </div>

        {/* Main video (autoplays muted, fills card evenly) */}
        <video
          src={item.video}
          className="w-full h-full object-cover"
          //autoPlay
          muted
          loop
          playsInline
        />

        {/* Bottom overlay with gradient, text & thumbnail */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
          <div className="flex items-center justify-between">
            
            {/* Dress name */}
            <p className="text-sm font-semibold text-white leading-tight pr-2">
              {item.name}
            </p>

            {/* Small thumbnail video (also autoplay muted) */}
            <video
              src={item.video}
              className="w-12 h-12 object-cover rounded-md border-2 border-white shadow-md"
             // autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function ExploreAndBuy() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1.2 } },
    ],
  };

  const items = [
    { name: "White Blue Hand Block Printed Anarkali Set", views: 11, video: "/video/edting_v.mov" },
    { name: "Blue Hand Block Printed Coord Set", views: 18, video: "/video/edting_v.mov" },
    { name: "Yellow Geometrical Hand Block Printed Coord Set", views: 11, video: "/video/edting_v.mov" },
    { name: "Fresh Pink Co-ord Set", views: 14, video: "/video/edting_v.mov" },
    { name: "Classic Charm Off-white Chanderi Set", views: 19, video: "/video/edting_v.mov" },
    { name: "Blue Charm Hand Block Printed Kurta Set", views: 12, video: "/video/edting_v.mov" },
  ];

  return (
    <section className="py-12 bg-white px-8 relative">
      <h2 className="text-3xl font-medium text-center mb-8">EXPLORE AND BUY</h2>
      <div className="relative">
        <Slider {...settings}>
          {items.map((item, index) => (
            <VideoCard key={index} item={item} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
