import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SurveyBox = () => {
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stacks vertically on small screens
                justifyContent: "space-between",
                gap: 4, // Adds spacing between the boxes
                py: 3,
                bgcolor: "#fff",
                width: '100%',
               // maxWidth: '1280px',
            }}
        >
            {/* Left Swiper Section */}
            <Box
                sx={{
                    flex: "1 1 50%", // Takes 50% of the width
                    bgcolor: "#F63C80", // Updated Left Section Color
                    p: 3,
                    borderRadius: 2,
                    color: "white",
                    position: "relative",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Key Findings
                </Typography>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    style={{ width: "100%", height: "120px", maxWidth: '540px' }}
                >
                    <SwiperSlide>
                        <Typography
                            variant="h5"
                            sx={{
                                fontStyle: "italic",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            "80% ppl feel shy"
                        </Typography>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Typography
                            variant="h5"
                            sx={{
                                fontStyle: "italic",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            "70% prefer online events"
                        </Typography>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                textAlign: "center",
                                fontWeight: "bold",
                                fontFamily: 'Montserrat',
                            }}
                        >
                            "60% enjoy group activities"
                        </Typography>
                    </SwiperSlide>
                </Swiper>
            </Box>

            {/* Right Static Section */}
            <Box
                sx={{
                    flex: "1 1 50%",
                    bgcolor: "#FF4649", // Updated Right Section Color
                    p: 3,
                    borderRadius: 2,
                    color: "white",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ fontSize: "1rem", mb: 1, color: "#FDD" }}
                >
                    Help Us To Know You Better
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, color: "#FFF" }}
                >
                    Fill The Form Now!
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#fff",
                        color: "#FF4649",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#FDD" },
                    }}
                >
                    Fill Now
                </Button>
            </Box>
        </Box>
    );
};

export default SurveyBox;