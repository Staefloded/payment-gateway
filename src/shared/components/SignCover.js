import React from "react";
import SignImage from "../assets/signImage.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarouselItems from "./CarouselItems";

function SignCover({ carouselData }) {
  return (
    <div className="h-screen w-full relative overflow-y-scroll scrollbar-hide">
      <img className="h-full w-full object-cover" src={SignImage} alt="signimage" />

      <div className="w-[530px] xl:w-[95%] h-[283px] rounded-2xl bg-white absolute top-[60%] xl:top-[50%] left-[50%] right-[50%] translateCarousel">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
        >
          {carouselData.map((item, i) => (
            <CarouselItems key={i} item={item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default SignCover;
