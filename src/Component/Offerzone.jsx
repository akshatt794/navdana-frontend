import Slider from "react-slick";
import {useEffect, useState} from 'react';
import { client } from "../api";      // or "../../api" based on folder depth
// import offer1 from "/Images/model1.png";
// import offer2 from "/Images/model3.png";

export default function OfferZone() {
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU2NDAzMTgxLCJleHAiOjE3NTY0MjQ3ODF9.3yeR9TFDDfLgba0AxYfgllTySEU7OqtZQ54q_oZ6Yj4"
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    (async () => {
      console.log(`${import.meta.env.VITE_API_URL}/banner`);
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/banner`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response);
        if (response.data) {
          setBanners(response.data.data);
        }
      }catch(err){
        console.log(err);
      } 
    }
    )()
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000, // transition speed (ms)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds per slide
    cssEase: "ease-in-out", // smoother effect
    pauseOnHover: false,
  };

  return (
    <div className="w-full h-[80vh] md:h-[90vh] overflow-hidden relative">
      <Slider {...settings}>
        {banners.map((banner)=>{
          return <div key={banner.id} className="w-full h-full">
            <img
              src={banner.image}
              alt="Offer 1"
              className="w-full h-full object-cover"
            />
          </div>
        })}
        {/* <div className="w-full h-full">
          <img
            // src={offer1}
            alt="Offer 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full">
          <img
            // src={offer2}
            alt="Offer 2"
            className="w-full h-full object-cover"
          />
        </div> */}
      </Slider>
    </div>

  );
}
