import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";

const LayerBlur = () => {
    return (
        <>
            {/* First Blur Layer */}
            <Box
                sx={{
                    position: "absolute", // Positioned relative to the screen
                    top: "-63px", // Y position
                    left: "50vw", // X position
                    width: "857px", // Exact width
                    height: "1099px", // Exact height
                    zIndex: -1, // Send to background
                    overflow: "hidden",
                    filter: "blur(10px)", // Increased blur for smooth blending
                    opacity: 1, // Reduced opacity for miscibility
                }}
            >
                <Image
                    src="/assets/blurLayer.png" // Path to your first blur layer
                    alt="First Blur Layer"
                    layout="fill"
                    objectFit="cover" // Ensure proper scaling
                    priority
                />
            </Box>

            {/* Second Blur Layer */}
            <Box
                sx={{
                    position: "absolute", // Positioned relative to the screen
                    top: "368px", // Adjusted for vertical alignment
                    left: "50%", // Center horizontally
                    transform: "translate(-50%, 0) rotate(45.8deg)", // Center and rotate
                    width: "840.81px", // Exact width
                    height: "1039.18px", // Exact height
                    zIndex: -1, // Send to background
                    overflow: "hidden",
                    filter: "blur(55px)", // Higher blur for miscibility
                    opacity: 0.7, // Reduced opacity for smooth blending
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        background: "radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(246,60,128,0.5) 100%)", // Subtle gradient for smoother edges
                    }}
                >
                    <Image
                        src="/assets/blur2.png" // Path to your second blur layer
                        alt="Second Blur Layer"
                        layout="fill"
                        objectFit="cover" // Ensure proper scaling
                        priority
                    />
                </Box>
            </Box>
        </>
    );
};

export default LayerBlur;
