import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  chakra,
  Flex,
  Icon,
  // ScaleFade,
  ScaleFade,
  Stack,
  Fade,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiGlobe,
  FiMusic,
  FiPlay,
  FiShoppingCart,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import heroImage from "../../../public/assets/images/hero.png";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  const [visibleBlobs, setVisibleBlobs] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let timer;
    timer = setTimeout(
      () => setVisibleBlobs((visibility) => !visibility),
      4000
    );

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [visibleBlobs]);

  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#3C71FF" offset="100%" />
          <stop stopColor="#3C71FF" offset="100%" />
        </linearGradient>
      </svg>
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        alignItems="center"
        position="relative"
        bgColor={"transparent"}
        width="100%"
        minHeight={{ base: "70vh", md: "50vh", lg: "50vh", xl: "84vh" }}
        paddingX={{
          base: "3rem",
          md: "3rem",
          lg: "4rem",
          xl: "6rem",
          "2xl": "8rem",
        }}
        justifyContent={"space-between"}
        id="hello"
      >
        <VStack
          width={{ md: "50%", lg: "50%", xl: "40%" }}
          gap={{ base: "1rem", md: "1rem", lg: "2rem", xl: "2rem" }}
          background={"transparent"}
        >
          <Heading
            color="black"
            textAlign={{ base: "center", md: "left" }}
            fontFamily="montserrat"
            width="100%"
            fontSize={{
              base: "2rem",
              md: "2rem",
              lg: "3rem",
              xl: "3rem",
              "2xl": "4rem",
            }}
          >
            The Latin Dance <br />{" "}
            <Text
              fontSize={{
                base: "3rem",
                md: "3rem",
                lg: "4.5rem",
                xl: "4.5rem",
                "2xl": "6rem",
              }}
              color={"black"}
            >
              Revolution
            </Text>
            Begins Here{" "}
          </Heading>
          <Box
            height={{ base: "0.5rem", md: "0.5rem", lg: "0.75rem" }}
            width="50%"
            backgroundColor={"brand.darkblue"}
            alignSelf={{ base: "center", md: "start" }}
          />
          <Text
            fontSize={{
              base: "0.8rem",
              md: "0.8rem",
              xl: "1.3rem",
              "2xl": "1.5rem",
            }}
            textAlign={{ base: "center", md: "left" }}
            width="100%"
            fontFamily="montserrat"
          >
            Get a 360 degree view of your dance journey with personalised
            insights & tools
          </Text>
          <Link href="/video-upload">
            <Button
              bgGradient="linear(to-br, #8EA3F4, #3C71FF)"
              textColor="white"
              size={{ base: "lg", md: "lg", lg: "xl" }}
              alignSelf={{ base: "center", md: "start" }}
              fontFamily="montserrat"
              _hover={{
                opacity: "70%",
              }}
            >
              Start Here
            </Button>
          </Link>
        </VStack>
        <Flex
          justifyContent="center"
          width={{ base: "100%", md: "50%", lg: "50%", xl: "50%" }}
          background={"transparent"}
          paddingY={{ base: "3.5rem", sm: "0rem" }}
        >
          <chakra.svg
            position="absolute"
            top="-10rem"
            right="-10rem"
            width="60%"
            viewBox="0 0 857 1099"
            zIndex={"-1"}
            // color
            color="brand.purple"
            borderRadius="full"
            blendMode="multiply"
            filter="auto"
            blur="8rem"
            opacity="50%"
            xmlns="http://www.w3.org/2000/svg"
            className="blob1" // Add animation sptyling here
          >
            <path
              d="M448.073 111.864C565.986 110.817 686.361 -67.7775 783.357 28.4626C880.746 125.092 855.991 340.069 849.044 509.709C842.632 666.273 822.511 825.373 746.127 937.518C668.989 1050.77 558.309 1105.4 448.073 1098.4C342.341 1091.69 253.125 1004.17 175.279 901.26C93.0135 792.502 13.535 669.497 2.77642 509.709C-8.8994 336.298 13.8656 126.448 116.912 34.3824C215.62 -53.8076 331.806 112.897 448.073 111.864Z"
              fill="currentColor"
            />
          </chakra.svg>
          <chakra.svg
            position="absolute"
            top={{ md: "10rem", lg: "30rem" }}
            right={{ md: "5rem", lg: "10rem" }}
            width="50%"
            viewBox="0 0 1046 1014"
            zIndex={"-1"}
            // color
            color="brand.pink"
            borderRadius="full"
            blendMode="multiply"
            filter="auto"
            blur="10rem"
            opacity="50%"
            xmlns="http://www.w3.org/2000/svg"
            className="blob2" // Add animation styling here
          >
            <path
              d="M783.283 308.121C854.01 399.673 1059.93 391.654 1044.97 522.473C1029.95 653.822 853.349 757.368 721.455 848.913C599.727 933.402 467.958 1008.63 338.184 1013.04C207.129 1017.5 100.329 962.231 40.218 872.077C-17.4367 785.608 -4.43895 665.858 26.9035 546.189C60.0253 419.726 105.532 287.297 219.503 187.546C343.192 79.29 514.754 -22.8796 645.219 5.02284C770.192 31.7506 713.543 217.847 783.283 308.121Z"
              fill="currentColor"
            />
          </chakra.svg>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            position="relative"
          >
            <Box
              width={{ base: "80%", md: "70%", lg: "60%" }}
              display="flex"
              justifyContent="center"
              alignItems={"center"}
            >
              {/* <Fade in={isLoaded}> */}
              <Image
                src={heroImage}
                style={{
                  transition: "1s",
                }}
                onLoad={() => setIsLoaded(true)}
                priority
                placeholder="blur"
              />
              {/* </Fade> */}
            </Box>

            <ScaleFade
              in={visibleBlobs}
              transition={{
                exit: { delay: 2.4, duration: 0.1 },
                enter: { duration: 0.3 },
              }}
              style={{
                zIndex: -1,
                position: "absolute",
                top: "-2rem",
                left: "0rem",
              }}
            >
              <Icon
                filter="auto"
                blur="0.05  rem"
                as={FiMusic}
                w={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                h={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                style={{ stroke: "url(#blue-gradient)" }}
                opacity="50%"
                layer
              />
            </ScaleFade>
            <ScaleFade
              in={visibleBlobs}
              transition={{
                exit: { delay: 1.8, duration: 0.1 },
                enter: { delay: 0.6, duration: 0.3 },
              }}
              style={{
                zIndex: -1,
                position: "absolute",
                left: "-5rem",
              }}
            >
              <Icon
                filter="auto"
                blur="0.05  rem"
                as={FiActivity}
                w={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                h={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                style={{ stroke: "url(#blue-gradient)" }}
                opacity="50%"
                layer
              />
            </ScaleFade>
            <ScaleFade
              in={visibleBlobs}
              position="absolute"
              transition={{
                exit: { delay: 1.2, duration: 0.1 },
                enter: { delay: 1.2, duration: 0.3 },
              }}
              style={{
                zIndex: -1,
                position: "absolute",
                bottom: "-4rem",
                left: "0rem",
              }}
            >
              <Icon
                filter="auto"
                blur="0.05  rem"
                as={FiShoppingCart}
                w={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                h={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                style={{ stroke: "url(#blue-gradient)" }}
                opacity="50%"
                layer
              />
            </ScaleFade>
            <ScaleFade
              initialScale={0.9}
              in={visibleBlobs}
              transition={{
                exit: { delay: 0.6, duration: 0.1 },
                enter: { delay: 1.8, duration: 0.3 },
              }}
              style={{
                zIndex: -1,
                position: "absolute",
                bottom: "-5rem",
                right: "0rem",
              }}
            >
              <Icon
                filter="auto"
                blur="0.05  rem"
                as={FiPlay}
                w={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                h={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                style={{ stroke: "url(#blue-gradient)" }}
                opacity="50%"
                layer
              />
            </ScaleFade>

            <ScaleFade
              initialScale={0.9}
              in={visibleBlobs}
              transition={{
                exit: { duration: 0.1 },
                enter: { delay: 2.4, duration: 0.3 },
              }}
              style={{
                zIndex: -1,
                position: "absolute",
                right: "0rem",
                top: "-2rem",
              }}
            >
              <Icon
                filter="auto"
                blur="0.05  rem"
                as={FiGlobe}
                w={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                h={{ base: "9", md: "12", lg: "16", xl: "20", "2xl": "24" }}
                style={{ stroke: "url(#blue-gradient)" }}
                opacity="50%"
                layer
                bgClip="text"
                bgGradient="linear(to-br, #8EA3F4, #3C71FF)"
              />
            </ScaleFade>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

export default Hero;
