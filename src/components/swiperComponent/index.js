"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards,Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Box, Text, Avatar } from "@chakra-ui/react"
import { useRouter } from "next/router";
import VideoUpload from "@components/videoUpload";

import Qt from '../../../public/assets/qt.png'

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
      backgroundColor: "linear-gradient(90deg, #FF512F 0%, #DD2476 100%)",
    },
    {
      title: "Expert Analysis",
      description: "Reviewed by a trusted Subject Matter Expert.",
      imageSrc: "/assets/Group14.png",
      imageSize: "206px",
      backgroundColor: "linear-gradient(90deg, #36D1DC 0%, #5B86E5 100%)",
    },
    {
      title: "Structured Feedback",
      description:
        "Receive a dance report card.",
      imageSrc: "/assets/Group16.png",
      imageSize: "150px",
      backgroundColor: "linear-gradient(90deg, #205072 0%, #329D9C 100%)",
    },
    {
      title: "Customised Road map",
      description: "Discover your tailored next steps.",
      imageSrc: "/assets/Group17.png",
      imageSize: "206px",
      backgroundColor: "linear-gradient(90deg, #AA076B 0%, #61045F 100%)",
    },
  ];

  return (
    <><Text textAlign="center" fontFamily= 'Montserrat' fontSize= '40px' fontWeight= '600' marginLeft='20px'>Take your first step now!</Text>
    <Box display= 'flex' width= '100vw' flexWrap="wrap" justifyContent= 'center' alignItems= 'center' gap="3rem" p="4rem" paddingRight="0rem">
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
    <hr style={{border:'1px solid gray', width:'100vw'}}></hr>
    <Box
        margin= "0 auto"
        py= "5"
        width="100vw"
    >
      <Text
        as="h4"
        textAlign="center"
        fontWeight="bold"
        fontFamily= 'Montserrat' 
        fontSize='40px' 
        marginBottom='50px'
      >
        Testimonials
      </Text>
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
                border='2px solid black'
                position="relative"
            >
              {/* Testimonial Content */}


              <Box p={6} flexGrow={1}>

             {/* <img src='../../../public/assets/qt.png' style={{width:'30px'}} /> */}
             <Text fontSize='30px' margin='0px' padding='0px' fontStyle='italic'>"</Text>
                <Text
                  fontSize="md"
                  // color={text.secondary}
                  mb= {2} color='black' textAlign= 'center'
                >
                  {testimonial.text}
                </Text>
              </Box>
              <Avatar
                  width= "90px"
                  height= "90px"
                  name="Name"
                  
                  // left='130px'
                  // top='240px'
                  // position='absolute'
                  border='4px solid white'
                  zIndex={1}
                  mb={2}
                />
              {/* Footer Section */}
              <Box
                  bgColor= {testimonial.bgColor}
                  color= "white"
                  textAlign= "center"
                  py= {3}
                  display= "flex"
                  flexDirection= "column"
                  alignItems= "center"
                  height='80px'
                  width="100%"
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