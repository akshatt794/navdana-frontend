// import indigo from "/Images/indigo.png";
// import Gray from "/Images/Grey.jpg";
// import Black from "/Images/Black.jpg";
// import Blueflower from "/Images/blue-flower.jpg";
// import Blue from "/Images/Blue.jpg";
// import Maroon from "/Images/Maroon.jpg";
// import PinkBlue from "/Images/pink-blue.jpg";
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Collection() {
  // const collections = [
    // { name: "Fresh Arrival", image: indigo },
    // { name: "Kurtas", image: Gray },
    // { name: "Co-ord Sets", image: Black },
    // { name: "Bestsellers", image: Blue },
    // { name: "Suit Set", image: Blueflower },
    // { name: "Tie Dye", image: Blue },
    // { name: "Luxe", image: Maroon },
    // { name: "Tunics", image: PinkBlue },
  // ];

  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU2NDAzMTgxLCJleHAiOjE3NTY0MjQ3ODF9.3yeR9TFDDfLgba0AxYfgllTySEU7OqtZQ54q_oZ6Yj4"
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      console.log(`${import.meta.env.VITE_LOCAL_URL}/banner`);
      try{
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response);
        if (response.data) {
          setCollections(response.data.data);
        }
      }catch(err){
        console.log(err);
      } 
    }
    )()
  }, [])

  return (
    <section className="py-17 bg-white">
      <h2 className="text-3xl font-medium text-center mb-13">
        SHOP BY COLLECTION
      </h2>

      {/* Desktop grid */}
      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6 px-4"> 
        {/* // responsive: grid adapts to 2/3/4 cols by breakpoints */}
        {collections.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              {/* // responsive: circle size scales */}
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 text-gray-800 font-medium text-sm sm:text-base">
              {/* // responsive text size */}
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Circle + Center layout for mobile */}
      <div className="relative md:hidden w-full max-w-xs sm:max-w-md aspect-square mx-auto animate-spin-slow">
        {/* // responsive: replaced fixed 500x500 with max-w + aspect-square */}
        {/* Center Card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-gray-400 flex items-center justify-center overflow-hidden shadow-md">
            <img
              // src={collections[0].image}
              // alt={collections[0].name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="mt-2 text-gray-800 text-xs sm:text-sm font-semibold drop-shadow text-center">
            {/* {collections[0].name} */}
          </p>
        </div>

        {/* Orbiting Cards */}
        {collections.slice(1).map((item, index) => {
          const total = collections.length - 1;
          const angle = (index / total) * 2 * Math.PI;
          const radius = 40; // responsive: % based radius
          const center = 50; // percent based positioning
          const x = Math.cos(angle) * radius + center;
          const y = Math.sin(angle) * radius + center;

          return (
            <div
              key={index}
              className="absolute flex flex-col items-center text-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }} // responsive %
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-gray-800 text-[10px] sm:text-xs font-semibold drop-shadow text-center">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
