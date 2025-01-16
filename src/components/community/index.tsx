import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CommunitySection = () => {
    return (
        <Box
            sx={{
                background: "linear-gradient(to right, #EDEDED 0%, rgba(133, 71, 230, 0.6) 100%)", // Updated gradient
                padding: { xs: "24px", sm: "40px" },
                borderRadius: "16px",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: "24px",
                width: "100%",
                position: "relative",
                maxWidth: '1280px'
            }}
        >
            {/* Text Content */}
            <Box sx={{ maxWidth: "50%" }}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: '32px',
                        color: "#000", // Black text
                        marginBottom: "16px",
                        fontFamily: 'Montserrat',
                    }}
                >
                    Become A Part Of Our Powerful Community
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "24px",
                        fontFamily: 'Montserrat',
                    }}
                >
                    Connect with professionals around the globe who share their knowledge, collaborate, and help each other grow.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#fff", // Black button
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                        textTransform: 'none'
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#000', fontFamily: 'Montserrat', }}>
                        Join Now
                    </Typography>
                </Button>
            </Box>

            {/* Image Section */}
            <Box
                sx={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="img"
                    src="https://via.placeholder.com/150" // Replace with actual image
                    alt="Dancers"
                    sx={{ width: "150px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
                />
                <Box
                    component="img"
                    src="https://via.placeholder.com/150"
                    alt="Dancers"
                    sx={{ width: "150px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
                />
                <Box
                    component="img"
                    src="https://via.placeholder.com/150"
                    alt="Dancers"
                    sx={{ width: "150px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
                />
            </Box>

            {/* Gold Star Decoration */}
            <Box
                sx={{
                    position: "absolute",
                    right: "-30px",
                    bottom: "-30px",
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, #E9B44C, #BF9000)",
                    borderRadius: "50%",
                    transform: "rotate(45deg)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
            />
        </Box>
    );
};

export default CommunitySection;