"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Box, Text, Avatar, Divider, Stack, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Upload from "@components/video_upload/Upload";
import SlideshowCard from "@components/video_upload/SlideshowCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = ({ maxWidth = 650 }) => {
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
      description: "Receive a dance report card.",
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
    <>
      <Heading
        as="h1"
        fontSize={{
          base: "1.5rem",
          md: "3rem",
          lg: "4rem",
          xl: "3rem",
          "2xl": "3rem",
        }}
        fontFamily={"montserrat"}
        textAlign="center"
        marginTop={{ base: "2rem", md: "4rem" }}
      >
        Take Your First Step Here!
      </Heading>
      <Box
        height="0.2rem"
        width={{ base: "12rem", md: "20rem" }}
        borderRadius={"1rem"}
        backgroundColor={"brand.purple"}
        alignSelf="center"
        marginY="1rem"
      />
      <Stack
        direction={{
          base: "column",
          xl: "row",
        }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        marginTop={{ base: "1rem", md: "2rem", xl: "0rem" }}
        p={{ base: "1rem", md: "2rem", lg: "2rem", xl: "3rem", "2xl": "4rem" }}
        gap={{ base: "2rem", md: "4rem", xl: "0rem" }}
      >
        <Box
          display="flex"
          width={{ base: "80%", md: "70%", lg: "70%", xl: "50%" }}
          justifyContent="center"
          marginRight={{ base: "0rem", md: "2rem", lg: "2rem", "2xl": "3rem" }}
          paddingX="5%"
          id="hello"
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            className="select-none"
            style={{ width: "100%" }}
            loop={true}
            autoplay={{ delay: 1200, pauseOnMouseEnter: true }}
          >
            {cards.map((card, index) => (
              <SwiperSlide
                key={index}
                style={{
                  borderRadius: "2rem",
                }}
              >
                <SlideshowCard {...card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          width={{ md: "80%", lg: "70%", xl: "50%" }}
          justifyContent="center"
          display="flex"
        >
          <Upload />
        </Box>
      </Stack>
    </>
  );
};

export default Hero;
