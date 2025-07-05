import { useRouter } from "next/router";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Flex,
  HStack,
  chakra,
  SlideFade,
} from "@chakra-ui/react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";
import CardsComponent from "../../components/video_upload/CardsComponent";

function HeroTemporary({ isSelectedTileEvent }) {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const words = ["Movement", "Community", "Revolution"];

  useEffect(() => {
    const exit = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const changeText = setTimeout(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsVisible(true);
    }, 2300);

    return () => {
      clearTimeout(exit);
      clearTimeout(changeText);
    };
  }, [textIndex]);
  
  // const handleEventsBannerClick = () => {
  //   router.push("/events/socials");
  // };
  
  return (
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
        xl: "2rem",
      }}
      justifyContent="flex-start"
      id="hello"
    >
      {/* Main content row - heading on left, cards on right (desktop only) */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: "2rem", lg: "4rem" }}
        mb={{ base: "2rem", md: "3rem" }}
      >
        {/* Left side - Heading */}
        <Box flex="1" minWidth="0" display="flex" flexDirection="column" alignItems={{ base: "center", lg: "flex-start" }}>
  <Heading
    color="black"
    textAlign={{ base: "center", lg: "center" }} // Changed to center for desktop
    fontFamily="montserrat"
    width="100%"
    fontSize={{
      base: "2rem",
      md: "2rem",
      lg: "3rem",
      xl: "3rem",
      "2xl": "4rem",
    }}
    lineHeight="1.2"
    mb={1}
    mt={-8}
  >
    The Latin Dance <br />{" "}
    <SlideFade
      transition={{
        enter: { duration: 0.1 },
      }}
      in={isVisible}
      offsetY="10px"
    >
      <Text
        fontSize={{
          base: "2.6rem",
          sm: "3rem",
          md: "3rem",
          lg: "4.5rem",
          xl: "4.5rem",
          "2xl": "6rem",
        }}
        fontWeight={{ base: "bold", sm: "bold" }}
        lineHeight="1.1"
        my={3}
        display="inline-block"
        letterSpacing="0.05em"
        mx="0.5rem"
        bgGradient="linear(to-r, #7928CA, #FF0080)"
        bgClip="text"
      >
        {words[textIndex]}
      </Text>
    </SlideFade>
    Begins Here{" "}
  </Heading>
  <Box
    height={{ base: "0.5rem", md: "0.5rem", lg: "0.75rem" }}
    width={{ base: "50%", xl: "25%" }}
    backgroundColor="brand.darkblue"
    alignSelf={{ base: "center", lg: "center" }} // Changed to center for desktop
    mt={2} // Add some margin top if needed
  />
</Box>
        
        {/* Right side - Cards Component (desktop only) */}
        <Box 
  flex="1" 
  minWidth="0" 
  display={{ base: "none", lg: "block" }} // Hidden on mobile, visible on lg+
  onClick={() => window.location.href = '/video-upload'}
  cursor="pointer"
>
  <CardsComponent />
</Box>

      </Flex>

      {/* Scrolling text */}
      <Box
  overflow="hidden"
  whiteSpace="nowrap"
  width="100%"
  position="relative"
  marginTop={{ base: "-1.6rem", md: "0rem", lg: "-1.3rem", xl: "-1.5rem" }}
  marginBottom={{ base: "1.2rem", md: "1.5rem" }}
>

        <Box
          display="inline-flex"
          animation="scrollTicker 12s linear infinite"
        >
          {[...Array(2)].map((_, i) => (
            <Text
              key={i}
              fontSize={{
                base: "1rem",
                md: "1.3rem",
                xl: "1.3rem",
                "2xl": "1.5rem",
              }}
              fontFamily="montserrat"
              fontWeight="medium"
              display="inline-block"
              marginRight="5rem"
              letterSpacing="0.05em"
            >
              Get{" "}
              <Text as="span" fontWeight="700">
                Free
              </Text>{" "}
              Personalised{" "}
              <Text as="span" fontWeight="700">
                Feedback
              </Text>
              ,{" "}
              <Text as="span" fontWeight="700">
                Insights
              </Text>{" "}
              and{" "}
              <Text as="span" fontWeight="700">
                Roadmap
              </Text>{" "}
              of your dancing journey!
            </Text>
          ))}
        </Box>

        <style jsx global>{`
          @keyframes scrollTicker {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </Box>

      {/* CTA Button */}
      <Link href="/video-upload">
  <Button
  display={{ base: "flex", lg: "none" }} // ✅ Hidden on lg and above
  bgGradient="linear(to-br, #1a237e, #0d1b4c, #1a237e)"
  textColor="white"
  size={{ base: "xl", md: "lg" }}
  alignSelf="center"
  fontFamily="montserrat"
  fontWeight="bold"
  px="2.5rem"
  py="1.25rem"
  border="2px solid rgba(255, 255, 255, 0.3)"
  borderRadius="xl"
  marginTop={{ base: "-0.8rem", md: "0.5rem" }}
  marginBottom={{ base: "2.6rem", md: "1.5rem" }}
  _hover={{ borderColor: "white" }} // ❌ Removed scale
  _active={{}}                     // ❌ Removed scale
>
  Start Here
</Button>

</Link>

      
      {/* Events Banner */}
      <Box
        width="100%"
        maxWidth={{ base: "100%", md: "90%", lg: "800px", xl: "750px" }}
        mb={{ base: "2rem", md: "3rem" }}
        mt={{ base: "-1rem", md: "0rem" }}
        cursor="pointer"
        // onClick={handleEventsBannerClick}
        _hover={{ transform: "translateY(-2px)" }}
        transition="all 0.3s ease"
      >
        <Box
          bgGradient="linear(135deg, brand.purple 0%, brand.pink 100%)"
          borderRadius="xl"
          p={{ base: "1.5rem", md: "2rem" }}
          position="relative"
          overflow="hidden"
          boxShadow="lg"
          height={{ base: "auto", md: "300px", lg: "250px", xl: "270px" }} // Reduced height for desktop
        >
          {/* Background decoration */}
          <Box
            position="absolute"
            top="-50%"
            right="-10%"
            width="200px"
            height="200px"
            borderRadius="full"
            bg="whiteAlpha.200"
            opacity="0.3"
          />
          <Box
            position="absolute"
            bottom="-30%"
            left="-5%"
            width="150px"
            height="150px"
            borderRadius="full"
            bg="whiteAlpha.100"
            opacity="0.4"
          />

          <Flex
            direction="column"
            justifyContent="space-between"
            height="100%"
            position="relative"
            zIndex="1"
          >
            <VStack
              alignItems="center" 
              spacing="0.5rem"
              flex="1"
            >
              <HStack spacing="0.5rem">
                <FiCalendar size="20px" color="white" />
                <Heading
  as="h3"
  fontSize={{ base: "1.15rem", sm: "1.2rem", md: "1.5rem", lg: "1.8rem" }}
  color="white"
  fontFamily="montserrat"
  fontWeight="bold"
  textAlign="center"
  whiteSpace="nowrap"
  overflow="hidden"
  textOverflow="ellipsis"
>
  Our New Feature Release
</Heading>


              </HStack>

              <Text
  color="white"
  fontSize={{ base: "0.85rem", sm: "1rem", md: "1.1rem" }}
  fontFamily="montserrat"
  fontWeight="bold"
  lineHeight="1.5"
  textAlign="center"
  mt="0.3rem"
  mb="-0.6rem"
  whiteSpace="nowrap"
  overflow="hidden"
  textOverflow="ellipsis"
>
  Discover verified Global Social Nights
</Text>

            </VStack>

            <VStack spacing="1rem" width="100%" mt="1.5rem">
              <HStack
                spacing="1.5rem"
                justifyContent="center"
                width="100%"
              >
                {["Hanoi", "Bangkok", "Bangalore"].map((city) => (
                  <HStack key={city} spacing="0.1rem">
                    <FiMapPin size="18px" color="white" />
                    <Text
                      color="white"
                      fontSize={{ base: "0.9rem", md: "1.15rem" }}
                      fontFamily="montserrat"
                      fontWeight="bold"
                    >
                      {city}
                    </Text>
                  </HStack>
                ))}
              </HStack>

              <Link href="/events/socials">
  <Button
    bg="whiteAlpha.200"
    color="white"
    border="2px solid"
    borderColor="whiteAlpha.300"
    size={{ base: "lg", md: "xl" }}
    fontSize={{ base: "1rem", md: "1.3rem", lg: "1.4rem" }}
    fontFamily="montserrat"
    fontWeight="bold"
    letterSpacing="0.05em"
    borderRadius="xl"
    px={{ base: "2rem", md: "3rem" }}
    py={{ base: "1.2rem", md: "1.6rem" }}
    mt="0"
    alignSelf="center"
    w="auto"
    maxW="100%"
    transform="perspective(500px)"
    _hover={{
  transform: "scale(1.02)", // Optional mild zoom
  boxShadow: "0 6px 18px rgba(255, 255, 255, 0.2)", // Soft white glow
  bg: "whiteAlpha.200",
  color: "white",
  borderColor: "whiteAlpha.300",
}}

    // _active={{
    //   transform: "perspective(500px)",
    //   boxShadow: "none",
    //   bg: "whiteAlpha.200",       // 👈 maintain background
    //   color: "white",             // 👈 maintain text color
    //   borderColor: "whiteAlpha.300", // 👈 maintain border
    // }}
    // transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  >
  <Text
  as="span"
  display="inline-block"
>
  Explore Events
</Text>


  </Button>
</Link>

            </VStack>
          </Flex>
        </Box>
      </Box>
      
      {/* Upcoming updates text */}
      <VStack
  spacing="0.3rem"
  mb={{ base: "1rem", md: "1.5rem" }}
  alignItems="center"
  mt={{ base: "-1.8rem", md: "-2rem" }}
>
  <Text
    fontFamily="montserrat"
    fontWeight="semibold"
    fontSize={{ base: "0.85rem", sm: "1rem", md: "1.2rem" }} // Smaller on tiny devices
    color="gray.600"
    textAlign="center"
    whiteSpace="nowrap" // Force single line
    px="0.5rem" // Prevents edge touching
    overflow="hidden" // Safety measure
    textOverflow="ellipsis" // Adds "..." if text is cut off
    animation="flashyPulse 1.6s ease-in-out infinite"
    textShadow="0 0 6px rgba(128, 128, 128, 0.4)"
    letterSpacing="0.01em"
  >
    Upcoming Updates:{" "}
    <chakra.span fontWeight="bold" color="brand.pink">
      100+ Cities
    </chakra.span>{" "}
    by this August
  </Text>
</VStack> 

      {/* Background blobs */}
      <chakra.svg
        position="absolute"
        top={{ base: "-5rem", md: "-10rem" }}
        right={{ base: "-5rem", md: "-10rem" }}
        width="60%"
        viewBox="0 0 857 1099"
        zIndex={"-1"}
        color="brand.purple"
        borderRadius="full"
        blendMode="multiply"
        filter="auto"
        blur={{ base: "6rem", md: "8rem" }}
        opacity="50%"
        xmlns="http://www.w3.org/2000/svg"
        className="blob1"
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
        color="brand.pink"
        borderRadius="full"
        blendMode="multiply"
        filter="auto"
        blur={{ base: "8rem", md: "10rem" }}
        opacity={{ base: "100%", md: "50%" }}
        xmlns="http://www.w3.org/2000/svg"
        className="blob2"
      >
        <path
          d="M783.283 308.121C854.01 399.673 1059.93 391.654 1044.97 522.473C1029.95 653.822 853.349 757.368 721.455 848.913C599.727 933.402 467.958 1008.63 338.184 1013.04C207.129 1017.5 100.329 962.231 40.218 872.077C-17.4367 785.608 -4.43895 665.858 26.9035 546.189C60.0253 419.726 105.532 287.297 219.503 187.546C343.192 79.29 514.754 -22.8796 645.219 5.02284C770.192 31.7506 713.543 217.847 783.283 308.121Z"
          fill="currentColor"
        />
      </chakra.svg>
    </VStack>
  );
}

export default HeroTemporary;