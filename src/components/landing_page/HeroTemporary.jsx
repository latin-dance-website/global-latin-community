import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  chakra,
  SlideFade,
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
import { useCallback, useEffect, useState } from "react";
import heroImage from "../../../public/assets/images/hero.jpg";
import Image from "next/image";
import Link from "next/link";

function HeroTemporary({isSelectedTileEvent}) {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const words = ["Movement", "Community", "Revolution"];

  useEffect(() => {
    const exit = setTimeout(() => {
      setIsVisible(false); // Trigger exit animation
    }, 2000);

    const changeText = setTimeout(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % words.length); // Update text
      setIsVisible(true); // Trigger re-enter animation
    }, 2300);

    return () => {
      clearTimeout(exit);
      clearTimeout(changeText);
    };
  }, [textIndex]);

  return (
    <>
      <VStack
        filter={isSelectedTileEvent ? "blur(100px)" : ""}
        alignItems="center"
        position="relative"
        width="100%"
        minHeight={{
          base: "62vh",
          sm: "70vh",
          md: "50vh",
          lg: "50vh",
          xl: "80vh",
          "2xl": "84vh",
        }}
        paddingX={{
          base: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "6rem",
          "2xl": "8rem",
        }}
        paddingY={{
          base: "4rem",
          xl: "4rem",
        }}
        justifyContent="space-around"
        id="hello"
      >
        <VStack
          alignItems="center"
          gap={{ base: "1rem", xl: "2rem" }}
          width="100%"
        >
          <Heading
            color="black"
            textAlign={{ base: "center" }}
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
            <SlideFade
              transition={{
                enter: { duration: 0.1 },
              }}
              onAnimationEnd={() => console.log("done")}
              in={isVisible}
              offsetY="20px"
            >
              <Text
                fontSize={{
                  base: "2.6rem",
                  sm:"3rem",
                  md: "3rem",
                  lg: "4.5rem",
                  xl: "4.5rem",
                  "2xl": "6rem",
                }}
                color={"black"}
                fontWeight={{base:"bold", sm:"bold"}}
              >
                {words[textIndex]}
              </Text>
            </SlideFade>
            Begins Here{" "}
          </Heading>
          <Box
            height={{ base: "0.5rem", md: "0.5rem", lg: "0.75rem" }}
            width={{ base: "50%", xl: "25%" }}
            backgroundColor={"brand.darkblue"}
            alignSelf={{ base: "center" }}
          />
        </VStack>
        <Text
          fontSize={{
            base: "1rem",
            md: "1.3rem",
            xl: "1.3rem",
            "2xl": "1.5rem",
          }}
          textAlign={{ base: "center" }}
          width="100%"
          fontFamily="montserrat"
          // marginTop={{ base: "2rem", md: "1rem" }}
        >
          Get <Text as="span" fontWeight="700">Free</Text> Personalised Feedback & Insights of your dancing journey!
        </Text>
        <Link href="/video-upload">
          <Button
            bgGradient="linear(to-br, #8EA3F4, #3C71FF)"
            textColor="white"
            size={{ base: "xl", md: "lg", lg: "xl" }}
            alignSelf={{ base: "center" }}
            fontFamily="montserrat"
            // blur={"2xl"}
            _hover={{
              opacity: "70%",
            }}
          >
            Start Here
          </Button>
        </Link>
        <chakra.svg
          position="absolute"
          top={{ base: "-5rem", md: "-10rem" }}
          right={{ base: "-5rem", md: "-10rem" }}
          width="60%"
          viewBox="0 0 857 1099"
          zIndex={"-1"}
          // color
          color="brand.purple"
          borderRadius="full"
          blendMode="multiply"
          filter="auto"
          blur={{ base: "6rem", md: "8rem" }}
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
          top={{ base: "15rem", md: "10rem", lg: "30rem" }}
          right={{ base: "5rem", md: "5rem", lg: "10rem" }}
          width="50%"
          viewBox="0 0 1046 1014"
          zIndex={"-1"}
          // color
          color="brand.pink"
          borderRadius="full"
          blendMode="multiply"
          filter="auto"
          blur={{ base: "8rem", md: "10rem" }}
          opacity={{ base: "100%", md: "50%" }}
          xmlns="http://www.w3.org/2000/svg"
          className="blob2" // Add animation styling here
        >
          <path
            d="M783.283 308.121C854.01 399.673 1059.93 391.654 1044.97 522.473C1029.95 653.822 853.349 757.368 721.455 848.913C599.727 933.402 467.958 1008.63 338.184 1013.04C207.129 1017.5 100.329 962.231 40.218 872.077C-17.4367 785.608 -4.43895 665.858 26.9035 546.189C60.0253 419.726 105.532 287.297 219.503 187.546C343.192 79.29 514.754 -22.8796 645.219 5.02284C770.192 31.7506 713.543 217.847 783.283 308.121Z"
            fill="currentColor"
          />
        </chakra.svg>
      </VStack>
    </>
  );
}

export default HeroTemporary;
