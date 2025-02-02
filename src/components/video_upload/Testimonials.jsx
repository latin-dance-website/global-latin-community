import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiStarFill } from "react-icons/ri";

function Testimonials() {
  const testimonials = [
    {
      text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      name: "Ishaan Jalan",
      bgColor: "#F9FFB5",
      stars: "5.0",
    },
    {
      text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      name: "Amrith K",
      bgColor: "#B3F5BC",
      stars: "4.0",
    },
    {
      text: "It was a great class, specially for first timers. Learned a lot. Helpful teacher. Great studio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      name: "Sarthak Jain",
      bgColor: "#FF9955",
      stars: "5.0",
    },
  ];
  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={"80vh"}
      marginTop={{ base: "4rem", md: "4rem", lg: "0rem" }}
    >
      <Heading
        as="h1"
        fontSize={{
          base: "1.5rem",
          md: "2.2rem",
          lg: "2.5rem",
          xl: "3rem",
          "2xl": "3rem",
        }}
        fontFamily={"montserrat"}
        textAlign="center"
      >
        What Other Dancers Say?
      </Heading>
      <Box
        height="0.2rem"
        width={{ base: "12rem", md: "20rem" }}
        borderRadius={"1rem"}
        backgroundColor={"brand.purple"}
        alignSelf="center"
        marginY="1rem"
      />
      <HStack
        width="100%"
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="center"
        gap={{ md: "2rem", lg: "3rem", xl: "3rem", "2xl": "6rem" }}
        rowGap={"2rem"}
        padding={{ base: "2rem", md: "3rem" }}
      >
        {testimonials.map((testimonial, index) => (
          <VStack
            width={{
              base: "100%",
              md: "47%",
              lg: "40%",
              xl: "28%",
              "2xl": "25%",
            }}
            key={index}
            borderRadius="1rem"
            alignItems="center"
            justifyContent="center"
            position="relative"
            //   bgGradient="linear(to-br, #8EA3F4, #07037C,#07037C,#07037C,#07037C)"
            bgColor={"brand.pink"}
            bgGradient="linear(to-br, brand.purple,brand.pink,brand.pink,brand.pink,brand.pink)"
            shadow="lg"
            color="white"
            _hover={{
              transform: "translateY(-5px)",
              shadow: "lg",
              transition: "0.5s",
            }}
            padding="2rem"
            fontFamily="MontserratAlt"
            gap={{
              base: "1.2rem",
              md: "1.2rem",
              lg: "1.2rem",
              xl: "1.2rem",
              "2xl": "1.5rem",
            }}
          >
            <HStack width="100%" justifyContent="start">
              <Text
                fontSize={{ base: "1.5rem", md: "2.5rem" }}
                marginRight="1rem"
                fontWeight="700"
              >
                {testimonial.stars}
              </Text>
              {Array.from({ length: testimonial.stars }).map(() => (
                <Icon
                  as={RiStarFill}
                  w={{ base: "1rem", md: "1.2rem" }}
                  h={{ base: "1rem", md: "1.2rem" }}
                  color="gold"
                />
              ))}
            </HStack>
            <Box paddingBottom={{ xl: "0.5rem", "2xl": "1rem" }} flexGrow={1}>
              <Text
                fontSize={{ base: "0.8rem", md: "1rem" }}
                fontWeight="600"
                fontFamily="Montserrat"
                fontStyle="italic"
                mb={2}
                // color="brand.darkblue"
                textAlign="left"
              >
                {testimonial.text}
              </Text>
            </Box>
            <HStack justifyContent="start" width="100%" gap="1.5rem">
              <Avatar
                width={{ base: "3rem", md: "5rem" }}
                height={{ base: "3rem", md: "5rem" }}
                name="Name"
                bgColor="white"
                color="black"
              />
              <Text
                as="h6"
                fontWeight="bold"
                textAlign="left"
                fontSize={{ base: "0.9rem", md: "1rem" }}
              >
                {testimonial.name}
              </Text>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}

export default Testimonials;
