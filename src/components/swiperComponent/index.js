"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards,Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import { useRouter } from "next/router";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";
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
      sx={{
        background: backgroundColor,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: 'center',
        color: '#fff',
        height: '100%',
        maxHeight: '498px',
        p: '46px'
      }}
    >
      
      {/* Title */}
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: "40px", fontWeight: "600", mb: '24px' }}
      >
        {title}
      </Typography>

      {/* Image/Icon */}
        <Image
          src={imageSrc}
          alt={title}
          width={imageSize}
          height={'100%'}
          objectFit="contain"
        />

      {/* Description */}
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: "24px", fontWeight: "500", mt: '24px' }}
      >
        {description}
      </Typography>
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
    <><Typography sx={{fontFamily: 'Montserrat', fontSize: '40px', fontWeight: '600',marginLeft:'20px'}}>Take your first step now!</Typography>
    <Box sx={{ px: '220px', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', py: '24px', }}>
      <Box sx={{ ml: '80px'}}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="select-none"
          style={{ maxWidth: `${maxWidth}px`, }}
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
      <Box sx={{ mr: '80px'}}>
        <VideoUpload />
      </Box>
    </Box>
    <hr style={{border:'1px solid gray',width:'100%',marginLeft:'100px'}}></hr>
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        py: 5,
      
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        
        gutterBottom
        sx={{ mb: 4 ,fontFamily: 'Montserrat',fontSize:'40px',marginBottom:'50px'}}
      >
        Testimonials
      </Typography>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "420px",
                width:'350px',
                border:'2px solid black'
              }}
            >
              {/* Testimonial Content */}


              <CardContent sx={{ p: 3, flexGrow: 1 }}>

             {/* <img src='../../../public/assets/qt.png' style={{width:'30px'}} /> */}
             <Typography sx={{fontSize:'30px',margin:'0px',padding:'0px',fontStyle:'italic'}}>"</Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2,color:'black', textAlign: 'center', }}
                >
                  {testimonial.text}
                </Typography>
              </CardContent>
              <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    
                    left:'130px',
                    top:'240px',
                    position:'absolute',
                    border:'4px solid white',
                    zIndex:1,
                    mb: 2,

                  }}
                />
              {/* Footer Section */}
              <Box
                sx={{
                  backgroundColor: testimonial.bgColor,
                  color: "white",
                  textAlign: "center",
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height:'80px'
                }}
              >
               
                <Typography variant="h6" fontWeight="bold" sx={{marginTop:'50px'}}>
                  {testimonial.name}
                </Typography>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
    <Box>

    </Box>
    </>
  );
};

export default HiringCarousel;