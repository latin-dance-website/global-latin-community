import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  GridItem,
  Image,
  Grid,
  useToast,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import image_1 from "../../assets/image_1.png";
// import image_2 from "../../assets/image_2.png";
// import image_3 from "../../assets/image_3.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useState } from "react";

const Bento = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.example.com/newsletter/subscribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (response.ok) {
          toast({
            title: "Subscription Successful!",
            description: "You have been added to our newsletter.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          setEmail(""); // Clear the input field on success
        } else {
          const errorData = await response.json();
          toast({
            title: "Error",
            description: errorData.message || "Something went wrong.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Show an error toast
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <VStack
      marginTop={{ base: "6rem", md: "2rem" }}
      px={{ base: "1rem", md: "4rem", lg: "4rem", xl: "1rem" }}
      width={{ xl: "70%", "2xl": "60%" }}
      bg="white"
      mx="auto"
      marginBottom={"5rem"}
      gap={{ base: "1rem", md: "2rem" }}
    >
      <VStack
        spacing={{
          base: "0.75rem",
          md: "0.75rem",
          lg: "0.75rem",
          xl: "0.75rem",
          "2xl": "1rem",
        }}
        textAlign="center"
        mb="1rem"
      >
        <Heading
          as="h1"
          fontSize={{
            base: "2rem",
            md: "2.2rem",
            lg: "2.5rem",
            xl: "3rem",
            "2xl": "3rem",
          }}
          fontFamily={"montserrat"}
        >
          Share Your Dance Journey With Us!
        </Heading>
        <Box
          height="0.2rem"
          width="20rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
        />
        <Text
          fontSize={{ md: "1rem", lg: "1.15rem" }}
          color="gray.500"
          fontFamily={"montserratAlt"}
          marginTop="1rem"
        >
          500+ International Dancers Surveyed | 300+ Interviewed | Now its your
          time...
        </Text>
      </VStack>

      {/* Content Section */}
      <VStack spacing="2rem">
        <Stack
          alignItems="center"
          width="100%"
          height="fit-content"
          spacing={{ base: "1rem", md: "2rem", lg: "3rem" }}
          justifyContent={"space-between"}
          direction={{ base: "column", md: "row" }}
          // alignItems="stretch"
        >
          <VStack
            width={{ base: "100%", md: "60%" }}
            height="100%"
            bg="#F63C80"
            borderRadius="1rem"
            gap="1rem"
            padding={{ base: "1rem", md: "1.4rem", lg: "1.5rem" }}
            color="white"
          >
            <Heading
              as="h3"
              fontFamily="montserrat"
              fontSize={{ md: "1rem", lg: "1.25rem" }}
              mb="4"
              textAlign="left"
              width="100%"
              marginBottom={{ md: "1.5rem", lg: "1.8rem", xl: "0.6rem" }}
            >
              Key Findings From The Survey
            </Heading>
            <Swiper
              style={{
                width: "100%",
                marginBottom: "1.2rem",
              }}
              navigation
              autoplay={{
                delay: 2000,
              }}
              modules={[Navigation, Autoplay]}
              slidesPerView="auto"
              sx={{
                ".swiper-button-next, .swiper-button-prev": {
                  color: "blue.500", // Chakra UI color
                },
                ".swiper-button-next:hover, .swiper-button-prev:hover": {
                  color: "red.500",
                },
              }}
            >
              <SwiperSlide
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Text
                    // fontWeight="bold"
                    fontStyle="italic"
                    color="white"
                    fontSize={{ md: "0.9rem", lg: "1.2rem", xl: "1.5rem" }}
                    fontFamily="montserratAlt"
                  >
                    &quot;80% of the users are beginners.&quot;
                  </Text>
                </Box>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    color="white"
                    fontSize={{ md: "0.9rem", lg: "1.2rem", xl: "1.5rem" }}
                    fontFamily="montserratAlt"
                  >
                    &quot;80% of the users are beginners.&quot;
                  </Text>
                </Box>
              </SwiperSlide>
            </Swiper>
          </VStack>
          <VStack
            width={{ base: "100%", md: "50%", lg: "40%" }}
            bgGradient="linear(to-br, #FF4649 , #F63C80)"
            borderRadius="1rem"
            padding={{ base: "1rem", md: "1.4rem", lg: "1.5rem" }}
            color="white"
            alignItems="flex-start"
          >
            <Text
              fontSize={{ md: "0.8rem", lg: "0.9rem" }}
              fontFamily={"montserrat"}
            >
              Help Us To Know You Better
            </Text>
            <Text
              fontSize={{ md: "1rem", lg: "1.2rem" }}
              fontWeight="bold"
              fontFamily={"montserrat"}
            >
              Share your journey below!
            </Text>
            <Button
              bg="white"
              color="red.400"
              _hover={{ opacity: "80%" }}
              fontFamily={"montserrat"}
              marginTop={{ md: "0.5rem", lg: "0.8rem", xl: "1rem" }}
            >
              Fill Now
            </Button>
          </VStack>
        </Stack>

        {/* Community Section */}
        <Box
          bg="purple.200"
          borderRadius="1rem"
          px={{ base: "1.4rem", md: "1.4rem", lg: "2rem" }}
          py={{ base: "1.4rem", md: "1.4rem", lg: "1rem" }}
          color="black"
          position="relative"
        >
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            spacing="6"
            align="center"
          >
            {/* Text Content */}
            <VStack align="start" flex="1" spacing="4">
              <Heading
                as="h2"
                fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.875rem" }}
                size="lg"
                fontFamily="montserrat"
              >
                Join Our Global Community & Stay Updated
              </Heading>
              <Text fontSize="md" fontFamily="montserrat">
                Connect with Latin dancers around the globe who share their
                knowledge, collaborate, and help each other grow.
              </Text>
              <HStack spacing="1rem">
                <Input
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  bg="white"
                  focusBorderColor="blue.400"
                />
                <Button
                  bg="brand.purple"
                  color="white"
                  _hover={{ opacity: "70%" }}
                  onClick={handleSubmit}
                  padding="1.2rem"
                  isLoading={isLoading}
                  // width="10rem"
                >
                  Join Now
                </Button>
              </HStack>
            </VStack>

            {/* Images */}
            <Box
              bg="purple.200"
              p={{ md: "0", lg: "6" }}
              borderRadius="1rem"
              width={{ base: "100%", md: "40%" }}
            >
              <Grid
                templateColumns="repeat(2, 1fr)" // Two columns
                gap={4} // Spacing between items
                alignItems="center"
              >
                {/* First Image */}
                <GridItem
                  colSpan={{ base: 2, md: 2, lg: 1 }}
                  justifyContent={"center"}
                  display="flex"
                >
                  <Image
                    src={"/assets/images/image_1.png"} // Replace with your image URL
                    alt="Dance group"
                  />
                </GridItem>

                {/* Second Image */}
                <GridItem
                  rowSpan={2}
                  justifyContent="center"
                  display={{ base: "none", lg: "flex" }}
                >
                  <Image
                    src={"/assets/images/image_2.png"} // Replace with your image URL
                    alt="Dancer by the dock"
                    width={"80%"}
                  />
                </GridItem>

                {/* Third Image */}
                <GridItem
                  justifyContent="center"
                  display={{ base: "none", lg: "flex" }}
                >
                  <Image
                    src={"/assets/images/image_3.png"}
                    alt="Dancer duo"
                    width="80%"
                  />
                </GridItem>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </VStack>
    </VStack>
  );
};

export default Bento;
