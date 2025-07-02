"use client";

import "swiper/css";
import "swiper/css/effect-cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SlideshowCard from "@components/video_upload/SlideshowCard";

import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Box,
  Text,
  Input,
  Button,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const bounceAnimationX = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(10px); }
  50% { transform: translateX(0px); }
  75% { transform: translateX(0px); }
  100% { transform: translateX(0); }
`;

const bounceAnimationY = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(0px); }
  50% { transform: translateY(0px); }
  75% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const HeroComingSoon = ({ isToastVisible, setIsToastVisible }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);
  const toast = useToast();
  const router = useRouter();

  const iconSize = useBreakpointValue({ base: "15px", md: "24px" });
  const SwiperSize = useBreakpointValue({ base: "60%", md: "90%", lg: "100%" });
  const cardScale = useBreakpointValue({ base: "1", sm: "0.9", md: "0.8" });

  useEffect(() => {
    if (!router.isReady) return;

    const getInitialSlideIndex = (path) => {
      switch (path) {
        case "/tutorial-courses":
          return 2;
        case "/music-culture":
          return 3;
        case "/global-community":
          return 4;
        case "/events":
          return 0;
        case "/ecommerce":
          return 0;
        case "/brand":
          return 1;
        default:
          return 0;
      }
    };

    setInitialSlideIndex(getInitialSlideIndex(router.pathname));
  }, [router.isReady, router.pathname]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      showToast("Error", "Please enter a valid email address.", "error");
      return;
    }

    const tempEmail = email.toLowerCase();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            metadata: {
              email: tempEmail,
              event: "emailUpload",
              purpose: "emailSendComingSoon",
            },
          }),
        }
      );

      if (response.ok) {
        showToast(
          "Thanks for your Time!",
          "We will notify you soon when we launch.",
          "success"
        );
        setEmail("");
      } else {
        const errorData = await response.json();
        showToast("Error", errorData.message || "Something went wrong.", "error");
      }
    } catch (error) {
      showToast("Network Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (title, description, status) => {
    setIsToastVisible(true);
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
      onCloseComplete: () => setIsToastVisible(false),
    });
  };

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
    <Box
      width="100vw"
      minHeight="80vh"
      display="flex"
      padding="20px"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
    >
      {/* Left Section */}
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={{ base: "center", md: "start" }}
        padding="20px"
        width={{ lg: "40vw", md: "40vw", base: "100vw" }}
      >
        <Text fontFamily="montserrat" fontSize={{ xl: "2rem", base: "1.2rem" }} fontWeight="600">
          -Coming Soon
        </Text>
        <Text fontFamily="montserrat" fontSize={{ xl: "3rem", base: "1.8rem" }} fontWeight="700">
          Get Notified
        </Text>
        <Text
          fontFamily="montserrat"
          fontSize={{ xl: "3rem", base: "1.8rem" }}
          textAlign={{ base: "center", md: "start" }}
          fontWeight="700"
        >
          When we Launch
        </Text>
        <Box
          position="relative"
          marginTop="0.5rem"
          marginBottom="2rem"
          display="flex"
          flexDirection={{ base: "column", xl: "row" }}
          alignItems="center"
          gap="1rem"
        >
          <Input
            placeholder="Enter your email here.."
            height="2.8rem"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            bg="white"
            border="3px solid #cccac7"
            focusBorderColor="blue.400"
            borderRadius="18px"
            paddingRight="7rem"
            isRequired
          />
          <Button
            bg="black"
            position="absolute"
            right="3px"
            bottom="3px"
            height="38.8px"
            zIndex="20"
            color="white"
            paddingX="1rem"
            borderRadius="15px"
            _hover={{ bg: "black" }}
            _active={{ bg: "black" }}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Notify me
          </Button>
        </Box>
      </Box>

      {/* Center Arrow */}
      <Box
        bg="white"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="0.5rem"
        boxShadow="0 4px 12px rgba(160, 65, 112, 0.7)"
        transform={{ base: "rotate(90deg)", xl: "rotate(0deg)" }}
        animation={{
          base: `${bounceAnimationY} 1s infinite ease-out`,
          md: `${bounceAnimationX} 1s infinite ease-out`,
        }}
        opacity={{ md: "0", '2xl': "1" }}
      >
        <Box transform={{ base: "rotate(90deg)", md: "rotate(0deg)" }}>
          <FaArrowRight size={iconSize} color="#eab2d9" />
        </Box>
      </Box>

      {/* Right Section with Swiper and CTA */}
      <Box
        width={{ lg: "60vw", md: "60vw", base: "100vw" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          fontFamily="montserrat"
          fontSize={{ lg: "1.8rem", base: "1rem" }}
          fontWeight="600"
          textAlign="center"
          mb="0.5rem"
        >
          While you wait,{" "}
          <Text as="span" fontWeight="700">
            Get a{" "}
            <Text
              as="span"
              fontWeight="800"
              textDecoration="underline"
              textDecorationColor="#8547e6"
            >
              free
            </Text>{" "}
            personalised feedback right now!
          </Text>
        </Text>

        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="select-none"
          style={{ width: SwiperSize, scale: cardScale }}
          loop={true}
          autoplay={{ delay: 1200, pauseOnMouseEnter: true }}
          initialSlide={initialSlideIndex}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} style={{ borderRadius: "2rem" }}>
              <SlideshowCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link href="/video-upload">
          <Button
            bg="black"
            textColor="white"
            size={{ base: "lg", md: "lg" }}
            fontFamily="montserrat"
            _hover={{ opacity: "70%" }}
            borderRadius="20px"
            fontSize={{ lg: "1.5rem" }}
            padding={{ lg: "1.8rem" }}
            marginTop="1.5rem"
          >
            Start Here
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HeroComingSoon;
