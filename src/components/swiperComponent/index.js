"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards,Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Box, Text, Avatar, Divider } from "@chakra-ui/react"
import { useRouter } from "next/router";
import VideoUpload from "@components/videoUpload";

// import Qt from '../../../public/assets/qt.png'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    name: "NAME",
    bgColor: "#FF5555",
  },
  {
    text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    name: "NAME",
    bgColor: "#FF55AA",
  },
  {
    text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    name: "NAME",
    bgColor: "#FF9955",
  },
];
const HireCard = ({
  title,
  description,
  imageSrc,
  backgroundColor,
  imageSize,
}) => {
  const router = useRouter();

  return (
    <>
    
    <Box
      background= {backgroundColor}
      display= "flex"
      flexDirection= 'column'
      justifyContent= "space-between"
      alignItems= "center"
      textAlign= 'center'
      color= '#fff'
      height= '100%'
      width="100%"
      p= '46px'
    >
      
      {/* Title */}
      <Text
        fontFamily= "Montserrat" fontSize= "40px" fontWeight= "600" mb= '24px'
      >
        {title}
      </Text>

      {/* Image/Icon */}
        <Image
          src={imageSrc}
          alt={title}
          width={imageSize}
          height={'100%'}
          objectFit="contain"
        />

      {/* Description */}
      <Text
        fontFamily= "Montserrat" fontSize= "24px" fontWeight= "500" mt= '24px'
      >
        {description}
      </Text>
    </Box></>
  );
};

const HiringCarousel = ({ maxWidth = 650 }) => {
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
      description:
        "Receive a dance report card.",
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
    <Text textAlign="center" fontFamily= 'Montserrat' fontSize= '3rem' fontWeight= '800' marginLeft='20px' marginTop="7rem">Take your first step now!</Text>
    <Divider
      bgColor= "#07037C"
      my= "8px"
      height= "5px"
      width= "300px"
      alignSelf= "center"
    />
    <Box display= 'flex' width= '100vw' flexWrap="wrap" justifyContent= 'space-evenly' alignItems= 'center' gap="3rem" p="4rem" paddingRight="0rem">
      <Box display="flex" width="100%" maxWidth="500px" justifyContent="center" marginRight="3rem">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="select-none"
          style={{ width:"100%", maxWidth:"500px" }}
          loop={true}
          autoplay={{ delay: 1200, pauseOnMouseEnter: true }}
        >
          {cards.map((card, index) => (
            <SwiperSlide
              key={index}
              style={{
                borderRadius: "32px",
              }}
            >
              <HireCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box width="100%" maxWidth="400px" justifyContent="center" display="flex">
        <VideoUpload />
      </Box>
    </Box>
    <Box
        width="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
    >
      <Text
        as="h4"
        textAlign="center"
        fontWeight="800"
        fontFamily= 'Montserrat' 
        fontSize='3rem' 
      >
        Testimonials
      </Text>
      <Divider
      bgColor= "#07037C"
      my= "1rem"
      height= "5px"
      width= "300px"
      alignSelf= "center"
      marginBottom="3rem"
    />
      <Box
        // modules={[Navigation, Pagination]}
        // navigation
        // pagination={{ clickable: true }}
        // spaceBetween={20}
        // slidesPerView={3}
        // breakpoints={{
        //   0: {
        //     slidesPerView: 1,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //   },
        // }}
        width="100vw"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        padding="3rem"
      >
        {testimonials.map((testimonial, index) => (
          <Box key={index}>
            <Box
                borderRadius= "md"
                boxShadow= "md"
                display= "flex"
                flexDirection= "column"
                alignItems="center"
                height= "auto"
                width='350px'
                position="relative"
                bgImage="linear-gradient(135deg, rgba(30, 64, 175, 1) 0%, rgba(58, 102, 242, 1) 50%, rgba(140, 166, 250, 1) 100%)"
                color="white"
            >
              {/* Testimonial Content */}


              <Box p={6} flexGrow={1} >

             {/* <img src='../../../public/assets/qt.png' style={{width:'30px'}} /> */}
             <Text fontSize='30px' margin='0px' padding='0px' fontStyle='italic'>"</Text>
                <Text
                  fontSize="md"
                  // color={text.secondary}
                  mb= {2} color='white' textAlign= 'center'
                >
                  {testimonial.text}
                </Text>
              </Box>
              <Avatar
                  width= "90px"
                  height= "90px"
                  name="Name"
                  bgColor="rgb(29 78 216 / var(--tw-bg-opacity, 1))"
                  // left='130px'
                  // top='240px'
                  // position='absolute'
                  zIndex={1}
                  mb={-10}
                  color="white"
                />
              {/* Footer Section */}
              <Box
                  bgColor="rgb(30 58 138 / var(--tw-bg-opacity, 1))"
                  color= "white"
                  textAlign= "center"
                  py= {3}
                  display= "flex"
                  flexDirection= "column"
                  alignItems= "center"
                  height='80px'
                  width="100%"
                  borderBottomRightRadius={"10px"}
                  borderBottomLeftRadius={"10px"}
              >
               
                <Text as="h6" fontWeight="bold" >
                  {testimonial.name}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    <Box>

    </Box>
    </>
  );
};

export default HiringCarousel;