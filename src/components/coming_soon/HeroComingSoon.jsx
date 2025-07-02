"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import SlideshowCard from "@components/video_upload/SlideshowCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Text, Input,Button,useToast,useBreakpointValue } from "@chakra-ui/react";
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

const HeroComingSoon = ({isToastVisible, setIsToastVisible}) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const location = useRouter();

    const iconSize = useBreakpointValue({ base: "15px", md: "24px" });
    const SwiperSize = useBreakpointValue({base:"60%", md:"90%", lg:"100%"})
    const cardScale = useBreakpointValue({base:"1", sm:"0.9", md:"0.8"})

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
          const tempEmail = email.toLowerCase();
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
                  metadata: { email: tempEmail, event: "emailUpload", purpose:"emailSendComingSoon"}
                 }),
              }
            );
    
            if (response.ok) {
              setIsToastVisible(true);
              toast({
                title: "Thanks for your Time!",
                description: "We will notify you soon when we launch.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
              setEmail(""); // Clear the input field on success
            } else {
              const errorData = await response.json();
              setIsToastVisible(true);
              toast({
                title: "Error",
                description: errorData.message || "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            }
          } catch (error) {
            setIsToastVisible(true);
            toast({
              title: "Network Error",
              description: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
              onCloseComplete: () => setIsToastVisible(false)
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          // Show an error toast
          setIsToastVisible(true);
          toast({
            title: "Error",
            description: "Please enter a valid email address.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
            onCloseComplete: () => setIsToastVisible(false)
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
    <>
      <Box
        width="100vw"
        minHeight="80vh"
        display="flex"
        padding="20px"
        flexDirection={{base:"column", md:"row"}}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
        >
            <Box
             display="flex"
             flexDirection={"column"}
             alignItems={{base:"center", md:"start"}}
             padding="20px"
             marginTop={{base:"-0.5rem", sm:""}}
             paddingBottom="0px"
             paddingRight={{base:"20px", md:"0px"}}
             paddingTop="0px"
             width={{ lg:"40vw", md: "40vw", base:"100vw" }}
            >
                <Text fontFamily={"montserrat"} fontSize={{xl:"2rem", lg:"1.5rem", base:"1.2rem"}} fontWeight={"600"}>-Coming Soon</Text>
                <Text lineHeight="1" fontFamily={"montserrat"} fontSize={{xl:"3rem", lg:"2rem", base:"1.8rem"}} fontWeight={"700"}>Get Notified</Text>
                <Text lineHeight={"1.2"} fontFamily={"montserrat"} fontSize={{xl:"3rem", lg:"2rem", base:"1.8rem"}} textAlign={{base:"center", md:"start"}} fontWeight={"700"}>When we Launch</Text>
                <Box position="relative" right={{base:"0rem", md:"0"}} spacing="1rem" marginTop="0.5rem"  marginX={{base:"1rem", sm:"0rem"}} marginBottom={"2rem"} display="flex" justifyContent={"center"} alignItems={{base:"center", lg:"start", xl:""}} gap={{base:"1rem", sm:""}} flexDirection={{base:"column", xl:"row"}}>
                <Input
                  placeholder="Enter your email here.."
                  height="2.8rem"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  bg="white"
                  border={"3px solid #cccac7"}
                  focusBorderColor="blue.400"
                  borderRadius="18px"
                  paddingRight={{base:"7rem", sm:"7rem"}}
                  isRequired
                />
                <Button
                  bg="black"
                  position="absolute"
                  right={{sm:"3px", base:"3px"}}
                  // bottom={{base:"", md:"-8%"}}
                  bottom={"3px"}
                  height="38.8px"
                  width="fit-content"
                  zIndex={"20"}
                  color="white"
                  paddingX={{base:"1rem"}}
                  borderRadius="15px"
                  _hover={{ bg: "black" }}
                  _active={{bg: "black"}}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  marginTop={{base:"0rem", md:"0rem"}}
                  marginBottom={{base:"0rem", md:"0rem"}}
                  // width="10rem"
                >
                  Notify me
                </Button>
              </Box>
            </Box>
            <Box
              bg="white"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={{base:"0.5rem", md:"0.5rem"}}
              boxShadow="0 4px 12px rgba(160, 65, 112, 0.7)"
              transform={{
                base: "rotate(90deg)",  
                xl: "rotate(0deg)",     
              }}
              marginBottom={{base:"0.5rem", md:"0rem"}}
              animation={{md:`${bounceAnimationX} 1s infinite ease-out`, base:`${bounceAnimationY} 1s infinite ease-out`}}
              opacity={{md:"0", '2xl':"1"}}
            >
              <Box
              transform={{
                base: "rotate(90deg)",
                md: "rotate(0deg)", 
              }}
              >
              <FaArrowRight size={iconSize} color="#eab2d9" />
              </Box>
            </Box>
            <Box
                width={{ lg:"60vw", md: "60vw", base:"100vw" }}
                justifyContent="center"
                display="flex"
                alignItems={"center"}
                flexDirection={"column"}
                marginLeft="0rem"
                boxSizing="border-box"
                // borderLeft={{md:"5px dotted #1f1f1f"}}
              >
                <Box display="flex" flexDirection={"column"} alignItems="center" width={{base:"70%", sm:"65%"}} marginBottom={{base:"0.5rem", sm:"0rem", md:"0rem"}} paddingX={{base:"0.5rem", sm:""}}>
                  <Text fontFamily={"montserrat"} fontSize={{lg:"1.8rem", sm:"1.3rem", base:"1rem"}} fontWeight={"600"} textAlign={"center"}>While you wait, <Text as="span" fontWeight="700">Get a <Text as="span" fontWeight="800" textDecoration="underline" textUnderlineOffset="2px" textDecorationThickness="2px" textDecorationColor="#8547e6">free</Text> personalised feedback right now!</Text></Text>
                </Box>
                <Box
                display="flex"
                marginY = {{base:"0", lg:"-2rem"}}
                width={{base:"100%", md:"80%"}}
                justifyContent="center"
                // marginRight={{ base: "0rem", md: "2rem", lg: "2rem", "2xl": "3rem" }}
                paddingX="0%"
                // paddingRight={{base: "3rem", md:"0rem"}}
                id="hello"
              >
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  className="select-none"
                  style={{ width: `${SwiperSize}`, scale:`${cardScale}` }}
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
              <Link href="/video-upload">
                    {/* <Button
                      // bgGradient="linear(to-br, #8EA3F4, #3C71FF)"
                      bg="black"
                      textColor="white"
                      size={{ base: "lg", md: "lg", lg: "lg" }}
                      alignSelf={{ base: "center", md: "center" }}
                      fontFamily="montserrat"
                      _hover={{
                        opacity: "70%",
                      }}
                      borderRadius="20px"
                      fontSize={{lg:"1.5rem"}}
                      padding={{lg:"1.8rem"}}
                      marginTop={{base:"1rem", sm:"0rem", md:"0rem", lg:"0rem"}}
                    >
                      Start Here
                  </Button> */}
              </Link>
              {/* <Upload /> */}
            </Box>
      </Box>
    </>
  );
};

export default HeroComingSoon;
