import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";
import Image from "next/image";

const blobAnimation = keyframes`
  0% {
    transform: translate(0) scale(2);
  }
  50% {
    transform: translate(30px, 30px) scale(2);
  }
  100% {
    transform: translate(0px, 0px) scale(2);
  }
`;

const blob2Animation = keyframes`
  0% {
    transform: translate(0) scale(0.5);
  }
  50% {
    transform: translate(0px, 0px) scale(1);
  }
  100% {
    transform: translate(0px, 0px) scale(0.5);
  }
`;

const LayerBlur = () => {
  return (
    <>
      {/* First Blur Layer */}
      <Box
        position="absolute" // Positioned relative to the screen
        top="0px" // Y position
        left="15vw" // X position
        width="100vw" // Exact width
        height="50vh" // Exact height
        zIndex="-1" // Send to background
        overflow="hidden"
        filter="blur(30px) brightness(1)"
        // Increased blur for smooth blending
        opacity="1" // Reduced opacity for miscibility
        animation={`${blobAnimation} 5s infinite`}
      >
        <Image
          src="/assets/blurLayer.png" // Path to your first blur layer
          alt="First Blur Layer"
          layout="fill"
          objectFit="cover" // Ensure proper scaling
          priority
        />
        <Image
          src="/assets/blurLayer.png" // Path to your first blur layer
          alt="First Blur Layer"
          layout="fill"
          objectFit="cover" // Ensure proper scaling
          priority
        />
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
        position="absolute" // Positioned relative to the screen
        top="368px" // Adjusted for vertical alignment
        left="50%" // Center horizontally
        transform="translate(-50%, 0) rotate(45.8deg)" // Center and rotate
        width="100vw" // Exact width
        height="50vh" // Exact height
        zIndex="-1" // Send to background
        overflow="hidden"
        filter="blur(55px)" // Higher blur for miscibility
        // animation={`${blob2Animation} 5s infinite`}
        opacity="0.7" // Reduced opacity for smooth blending
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          background="radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(246,60,128,0.5) 100%)" // Subtle gradient for smoother edges
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
