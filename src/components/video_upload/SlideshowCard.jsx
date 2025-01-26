import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const SlideshowCard = ({
  title,
  description,
  imageSrc,
  backgroundColor,
  imageSize,
}) => {
  return (
    <>
      <Box
        background={backgroundColor}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        color="#fff"
        height="100%"
        width="100%"
        py={{ base: "1.5rem", sm: "3rem" }}
        px={{ base: "1.5rem", sm: "6rem" }}
      >
        {/* Title */}
        <Text
          fontFamily="Montserrat"
          fontSize={{
            base: "1.2rem",
            md: "1.5rem",
            lg: "2rem",
            "2xl": "2.5rem",
          }}
          fontWeight="600"
          mb={{ sm: "1rem", md: "1.5rem" }}
        >
          {title}
        </Text>

        {/* Image/Icon */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "40%", md: "30%", lg: "100%" }}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={imageSize}
            height={"100%"}
            objectFit="contain"
          />
        </Box>

        {/* Description */}
        <Text
          fontFamily="Montserrat"
          fontSize={{ base: "0.75rem", md: "1.2rem", lg: "1.5rem" }}
          fontWeight="500"
          mt={{ base: "1rem", md: "1.5rem" }}
        >
          {description}
        </Text>
      </Box>
    </>
  );
};

export default SlideshowCard;
