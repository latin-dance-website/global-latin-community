"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Upload from "@components/video_upload/Upload";
import SlideshowCard from "@components/video_upload/SlideshowCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Text, Input,Button,useToast } from "@chakra-ui/react";

const HeroComingSoon = ({ maxWidth = 650 }) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const location = useRouter();

    const getInitialSlideIndex = (path) => {
      switch(path){
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
    }

    const initialSlideIndex = getInitialSlideIndex(location.pathname);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleSubmit = async () => {
        if (validateEmail(email)) {
          setIsLoading(true);
          try {
            const response = await fetch(
              "https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  metadata: { email: email, event: "emailUpload"}
                 }),
              }
            );
    
            if (response.ok) {
              toast({
                title: "Subscription Successful!",
                description: "You have been added to our newsletter.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              });
              setEmail(""); // Clear the input field on success
            } else {
              const errorData = await response.json();
              toast({
                title: "Error",
                description: errorData.message || "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          } catch (error) {
            toast({
              title: "Network Error",
              description: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "bottom-right",
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          // Show an error toast
          toast({
            title: "Error",
            description: "Please enter a valid email address.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    initialSlide: initialSlideIndex,
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
      backgroundColor: "rgb(88 28 135 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Structured Feedback",
      description: "Receive a dance report card.",
      imageSrc: "/assets/Group16.png",
      imageSize: "150px",
      backgroundColor: "rgb(107 33 168 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Customised Road map",
      description: "Discover your tailored next steps.",
      imageSrc: "/assets/Group17.png",
      imageSize: "206px",
      backgroundColor: "rgb(126 34 206 / var(--tw-bg-opacity, 1))",
    },
  ];

  return (
    <>
      <Box
        width="100vw"
        minHeight="80vh"
        display="flex"
        padding="20px"
        flexDirection={{base:"column", md:"row"}}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        >
            <Box
             display="flex"
             flexDirection={"column"}
             alignItems={{base:"center", md:"center"}}
             padding="20px"
             paddingRight={{base:"20px", md:"0px"}}
             paddingTop="0px"
            >
                <Text fontFamily={"montserrat"} fontSize={{lg:"2rem", base:"1rem"}} fontWeight={"600"}>-coming soon</Text>
                <Text lineHeight="1" fontFamily={"montserrat"} fontSize={{lg:"3rem", base:"2rem"}} fontWeight={"700"}>Get Notified</Text>
                <Text lineHeight={"1.2"} fontFamily={"montserrat"} fontSize={{lg:"3rem", base:"2rem"}} textAlign={{base:"center", md:""}} fontWeight={"700"}>When we Launch</Text>
                <Box spacing="1rem" marginTop="0.5rem" marginBottom={"2rem"} display="flex" justifyContent={"center"} alignItems={{base:"center", sm:""}} gap={{base:"1rem", sm:""}} flexDirection={{base:"column", sm:"row"}}>
                <Input
                  placeholder="Enter your email here.."
                  height="3rem"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  bg="white"
                  border={"3px solid #cccac7"}
                  focusBorderColor="blue.400"
                  borderRadius="20px"
                />
                <Button
                  bg="black"
                  height="3rem"
                  width="fit-content"
                  zIndex={"20"}
                  color="white"
                  paddingX={"2rem"}
                  borderRadius="20px"
                  _hover={{ bg: "#1f1f1f" }}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  // width="10rem"
                >
                  Notify me
                </Button>
              </Box>
              <Box
                display="flex"
                width={{ base: "90vw", md: "50vw" }}
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
            </Box>
            <Box
                width={{ lg:"50vw", md: "40vw", base:"90vw" }}
                justifyContent="center"
                display="flex"
                boxSizing="border-box"
              >
              <Upload />
            </Box>
      </Box>
    </>
  );
};

export default HeroComingSoon;
