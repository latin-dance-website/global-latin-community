import React from "react";
import { Box, Text, Button } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SurveyBox = () => {
    return (
        <Box
            flex="1"
            display= "flex"
            flexDirection= {{ xs: "column", sm: "row" }} // Stacks vertically on small screens
            justifyContent= "space-between"
            gap= "1rem" // Adds spacing between the boxes
            py= "3"
            bgColor= "#fff"
            width= 'auto'
               // maxWidth: '1280px',
        >
            {/* Left Swiper Section */}
            <Box
                flex= "1 1 50%" // Takes 50% of the width
                bgColor= "#F63C80" // Updated Left Section Color
                p="1rem 1.5rem"
                borderRadius= {"1rem"}
                color= "white"
                position= "relative"
                width="auto"
            >
                <Text fontSize={"1.5rem"} fontWeight= "bold" fontFamily={"Montserrat"} >
                    Key Findings From The Survey
                </Text>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    style={{ width: "100%", height: "70px", maxWidth: '540px' }}
                >
                    <SwiperSlide>
                        <Text
                            fontSize={"1.5rem"}
                            textAlign= "center"
                            fontWeight= "bold"
                            fontFamily={"Montserrat"}
                        >
                            "80% ppl feel shy"
                        </Text>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Text
                            fontSize={"1.5rem"}
                            textAlign= "center"
                            fontWeight= "bold"
                            fontFamily={"Montserrat"}
                        >
                            "70% prefer online events"
                        </Text>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Text
                            fontSize={"1.5rem"}
                            textAlign= "center"
                            fontWeight= "bold"
                            fontFamily= 'Montserrat'
                        >
                            "60% enjoy group activities"
                        </Text>
                    </SwiperSlide>
                </Swiper>
            </Box>

            {/* Right Static Section */}
            <Box
                flex= "1 1 50%"
                bgColor= "#FF4649" // Updated Right Section Color
                p= {"1rem"}
                borderRadius= {"1rem"}
                color= "white"
            >
                <Text
                    fontSize= "1rem" mb= "1" color= "#FDD"
                    fontFamily= 'Montserrat' 
                >
                    Help Us To Know You Better
                </Text>
                <Text
                    fontSize={"1.2rem"}
                    fontWeight= "bold" mb= "2" color= "#FFF"
                    fontFamily= 'Montserrat'
                >
                    Share your journey now!
                </Text>
                <Button
                    bg="#fff"
                    color="#FF4649"
                    fontWeight="bold"
                    fontFamily= 'Montserrat'
                    _hover={{ bg: "#FDD" }}
                >
                    Fill Now
                </Button>
            </Box>
        </Box>
    );
};

export default SurveyBox;