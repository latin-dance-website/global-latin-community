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
      py={{ base: "1.2rem", sm: "2rem", md: "2.2rem" }}
      px={{ base: "1.2rem", sm: "2.5rem", md: "3rem" }}
    >
      {/* Title */}
      <Text
        fontFamily="Montserrat"
        fontSize={{
          base: "1rem",
          sm: "1.2rem",
          md: "1.4rem",
          lg: "1.6rem",
        }}
        fontWeight="600"
        mb={{ base: "0.8rem", sm: "1rem", md: "1.2rem" }}
        lineHeight="1.3"
        noOfLines={2}
      >
        {title}
      </Text>

      {/* Image/Icon */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={{ base: "50%", sm: "40%", md: "60%", lg: "100%" }}
        maxHeight="160px"
        mb={{ base: "1rem", md: "1.2rem" }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width="100%"
          height="auto"
          objectFit="contain"
          maxH={{ base: "100px", sm: "120px", md: "150px" }}
        />
      </Box>

      {/* Description */}
      <Text
        fontFamily="Montserrat"
        fontSize={{
          base: "0.75rem",
          sm: "0.9rem",
          md: "1rem",
          lg: "1.1rem",
        }}
        fontWeight="500"
        lineHeight="1.4"
        noOfLines={2}
        px="0.2rem"
      >
        {description}
      </Text>
    </Box>
  );
};

export default SlideshowCard;
