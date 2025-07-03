"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { Box, Heading, Stack } from "@chakra-ui/react";
import SlideshowCard from "./SlideshowCard";

const CardsComponent = () => {
  const cards = [
    {
      title: "Upload Your Dance",
      description: "Share a video link or file of your dance.",
      imageSrc: "/assets/Subtract.png",
      imageSize: "234px",
      backgroundColor: "rgb(147 51 234 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Expert Analysis",
      description: "Reviewed by a trusted Subject Matter Expert.",
      imageSrc: "/assets/Group14.png",
      imageSize: "206px",
      backgroundColor: "brand.pink",
    },
    {
      title: "Structured Feedback",
      description: "Receive a 'free' dance report card.",
      imageSrc: "/assets/Group16.png",
      imageSize: "150px",
      backgroundColor: "rgb(147 51 234 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Customised Road map",
      description: "Discover your tailored next steps.",
      imageSrc: "/assets/Group17.png",
      imageSize: "206px",
      backgroundColor: "brand.pink",
    },
  ];

  return (
    <Stack spacing={4} width="100%" maxWidth="500px" mx="auto">
      <Heading
        as="h3"
        fontSize={{ base: "1.5rem", md: "2rem" }}
        fontFamily="montserrat"
        textAlign="center"
        color="gray.700"
      >
        How It Works
      </Heading>
      <Box
        height="0.2rem"
        width="50%"
        backgroundColor="brand.purple"
        mx="auto"
        mb={4}
        borderRadius="1rem"
      />
     <Box
 width={{ base: "68%", sm: "70%", md: "80%", lg: "72%" }}
  height={{ base: "300px", sm: "320px", md: "400px", lg: "420px" }}
  mx="auto"
>

        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="select-none"
          style={{
            width: "100%",
            height: "100%",
            "--swiper-theme-color": "#fff", // Controls pagination color
          }}
          loop={true}
          autoplay={{
            delay: 1200,
            pauseOnMouseEnter: true,
          }}
          cardsEffect={{
            perSlideOffset: 10,
            slideShadows: false,
            rotate: false,
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide
              key={index}
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <SlideshowCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default CardsComponent;
