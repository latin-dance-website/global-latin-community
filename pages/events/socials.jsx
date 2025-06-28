import React, { useState, useEffect, useRef } from "react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import CustomCalendar from "./CustomCalendar"; // Import the custom calendar
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Image,
  Grid,
  Input,
  InputGroup,
  IconButton,
  InputLeftElement,
  useColorModeValue,
  Select,
  Flex,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  VStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  ModalHeader,
  Stack,
  chakra,
  Popover,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default function EventsHomePage({ cities }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [dateRange, setDateRange] = useState(null); // [dayjs, dayjs]
  const {
    isOpen: isCalendarOpen,
    onOpen: onCalendarOpen,
    onClose: onCalendarClose,
  } = useDisclosure();

  // Keyframes for animations
  const blink = keyframes`
    0% { box-shadow: 0 0 0px rgb(156, 60, 246); }
    50% { box-shadow: 0 0 10px rgb(156, 60, 246); }
    100% { box-shadow: 0 0 0px rgb(156, 60, 246); }
  `;
  const flashBackgroundDark = keyframes`
    0%, 100% {
      background-color: white;
      color: black;
    }
    50% {
      background-color: #9c3cf6;
      color: white;
    }
  `;

  const handleCityChange = (selectedValue) => {
    setSelectedCity(selectedValue);
    setDateRange(null); // Reset the selected dates
    if (selectedValue) {
      // Open calendar after city selection
      setTimeout(() => {
        onCalendarOpen();
      }, 500);
    }
  };

  const handleGetEvents = () => {
    if (!selectedCity) {
      alert("Please select a city first!");
      return;
    }

    const queryParams = {
      city: selectedCity,
    };

    if (dateRange && dateRange[0] && dateRange[1]) {
      queryParams.startDate = dateRange[0].format("YYYY-MM-DD");
      queryParams.endDate = dateRange[1].format("YYYY-MM-DD");
      router.push({
        pathname: "/events/display",
        query: queryParams,
      });
    } else {
      if (
        window.confirm(
          "No travel dates selected. Would you like to see all upcoming events for " +
            selectedCity +
            "?"
        )
      ) {
        router.push({
          pathname: "/events/display",
          query: queryParams,
        });
      }
    }
  };

  const handleCreateEvent = () => {
    // Replace with your actual event creation form URL
    router.push("/events/socials");
    // Or open external link:
    // window.open("https://your-event-form-link.com", "_blank");
  };

  return (
    <Box
      minH="100vh"
      maxW="100vw"
      position="relative"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      overflowX="hidden"
      p={0}
      m={0}
    >
      <Box w="100%" maxW="1200px" px={0} py={0} m={-1}>
        <Navbar />
      </Box>

      <Box mt={{ base: 4, md: 6 }} mb={-2} mt={2} textAlign="center">
  <Heading
    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
    fontWeight="extrabold"
    bgGradient="linear(to-r, #FF416C, #FF4B2B)"
    bgClip="text"
    lineHeight="1.3"
  >
    Today's Social Nights
  </Heading>
       
</Box>


      <LayerBlur2 />
      <Caraousel />

      {/* Main Content Container - Desktop: Side by side, Mobile: Stacked */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="center"
        align={{ base: "center", lg: "flex-start" }}
        gap={{ base: 6, lg: 8 }}
        width="100%"
        maxWidth="1400px"
        px={{ base: 4, lg: 6 }}
        mt={{ base: "-8px", md: "20px" }}
      >
        {/* Main Control Box - Find Events */}
        <Box
          width={{ base: "fit-content", lg: "650px" }}
          maxWidth={{ base: "95%", lg: "650px" }}
          minWidth="320px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="16px"
          bg="white"
          boxShadow="xl"
          border="2px solid #9c3cf6"
          py={{ base: 6, md: 8 }}
          px={{ base: 6, md: 8 }}
          position="relative"
          _hover={{
            "&::before": {
              opacity: 1,
            },
            borderColor: "#8a2be2",
          }}
          _focusWithin={{
            "&::before": {
              opacity: 1,
              boxShadow: "0 0 10px 2px rgba(156, 60, 246, 0.6)",
            },
          }}
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              borderRadius: "18px",
              border: "2px solid transparent",
              background:
                "linear-gradient(90deg, #9c3cf6, #ff6b35, #9c3cf6) border-box",
              backgroundSize: "200% 100%",
              animation: "borderGradient 3s linear infinite",
              opacity: 0,
              transition: "opacity 0.3s ease, box-shadow 0.3s ease",
              zIndex: -1,
            },
            "@keyframes borderGradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "100%": { backgroundPosition: "200% 50%" },
            },
          }}
        >
          {/* Inner content */}
          <VStack
            spacing={0.5}
            mb={4}
            textAlign="center"
            position="relative"
            zIndex={1}
          >
            <Box mt={-4}>
              <Heading
  fontSize={{ base: "xl", md: "2xl" }}
  fontWeight="extrabold"
  color="#000001"
  lineHeight="1.3"
  mb={1}
  isTruncated
  whiteSpace="nowrap"
  overflow="hidden"
  textOverflow="ellipsis"
>
  Find Latin Events in your City
</Heading>

            </Box>

            <Heading
              as="h3"
              fontSize={{ base: "xl", md: "2xl" }}
              color="#a23cf6"
              fontWeight="bold"
              mb={1}
              lineHeight="1.1"
            >
              Just Pick a City{" "}
              <Box
                as="span"
                display="inline-block"
                sx={{
                  animation: "bounce 1s infinite ease-in-out",
                  "@keyframes bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-4px)" },
                  },
                }}
              >
                ↓
              </Box>
            </Heading>

            <Box textAlign="center" maxW="100%">
              <VStack spacing={1}>
                <Text
  fontWeight="medium"
  fontSize={{ base: "xs", md: "sm" }}
  color="#555"
  whiteSpace="nowrap"
  mt={-0.5}
  fontStyle="italic"
>
  Discover verified Global Latin Dance Events
</Text>


                <Text
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md" }}
                  color="#333"
                  lineHeight="1.2"
                  mt={-1}
                  mb={1}
                >
                  <Text as="span">Salsa</Text>
                  {", "}
                  <Text as="span">Bachata</Text>
                  {", "}
                  <Text as="span">Kizomba</Text>
                  {" & "}
                  <Text as="span">Zouk</Text>
                  {" Nights"}
                </Text>
              </VStack>
            </Box>
          </VStack>

          {/* Controls Container */}
          <VStack spacing={3} width="100%" align="center" mt={-2}>
            {/* City Selector */}
            <Box
              width={{ base: "89%", md: "100%" }}
              maxWidth={{ base: "300px", md: "420px" }}
              borderRadius={{ base: "10px", md: "12px" }}
              animation={
                !selectedCity
                  ? `${flashBackgroundDark} 1.3s ease-in-out infinite`
                  : "none"
              }
            >
              <Select
                value={selectedCity}
                onChange={(e) => {
                  handleCityChange(e.target.value);
                }}
                placeholder="Select  City"
                border="2px solid #9c3cf6"
                borderRadius={{ base: "10px", md: "12px" }}
                bg="transparent"
                color="black"
                fontWeight="600"
                fontSize={{ base: "16px", md: "18px" }}
                height={{ base: "46px", md: "50px" }}
                width="100%"
                _focus={{
                  borderColor: "#9c3cf6",
                  boxShadow: "0 0 0 1px #9c3cf6",
                }}
                _hover={{
                  borderColor: "#8a2be2",
                }}
                animation={
                  selectedCity ? "none" : `${blink} 1.5s ease-in-out infinite`
                }
                sx={{
                  "& option": {
                    color: "#9c3cf6",
                    backgroundColor: "white",
                    fontWeight: "600",
                    _hover: {
                      backgroundColor: "#f8f4ff",
                    },
                    _selected: {
                      backgroundColor: "#9c3cf6",
                      color: "white",
                    },
                    animation: `${blink} 1.5s ease-in-out infinite`,
                    animationDelay: "calc(var(--option-index) * 0.1s)",
                  },
                }}
              >
                {cities.map((city, index) => (
                  <option
                    key={city}
                    value={city}
                    style={{ "--option-index": index }}
                  >
                    {city.trim()}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Custom Date Range Selector */}
            <Box
              width={{ base: "90%", md: "100%" }}
              maxWidth={{ base: "300px", md: "350px" }}
              borderRadius={{ base: "10px", md: "12px" }}
              overflow="hidden"
              bg="white"
              position="relative"
              border="2px solid #9c3cf6"
              animation={
                selectedCity && !dateRange
                  ? `${blink} 1.5s ease-in-out infinite`
                  : "none"
              }
              cursor="pointer"
              onClick={onCalendarOpen}
              _hover={{
                borderColor: "#8a2be2",
              }}
            >
              <Flex align="center" height={{ base: "44px", md: "48px" }}>
                {/* Set Travel Dates Label */}
                <Box
                  bg="linear-gradient(135deg, #9c3cf6, #7c3aed)"
                  color="white"
                  px={{ base: 2, md: 3 }}
                  py={0}
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minWidth={{ base: "90px", md: "120px" }}
                  fontWeight="600"
                  fontSize={{ base: "14px", md: "16px" }}
                  borderRight="1px solid #6b21a8"
                  ml="0"
                >
                  Set Travel Dates
                </Box>

                {/* Date Display with Start ⇌ End format */}
                <Flex
                  flex="1"
                  height="100%"
                  align="center"
                  justify="space-between"
                  px={2}
                  color={dateRange ? "#333" : "#999"}
                  fontWeight="500"
                  fontSize={{ base: "14px", md: "16px" }}
                >
                  {dateRange && dateRange[0] && dateRange[1] ? (
                    <>
                      {/* Start Date - Centered in left section */}
                      <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {dateRange[0].format("DD MMM")}
                      </Box>

                      {/* Arrow - Centered */}
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        px={2}
                        color="#9c3cf6"
                        fontWeight="bold"
                      >
                        ⇌
                      </Box>

                      {/* End Date - Centered in right section */}
                      <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {dateRange[1].format("DD MMM")}
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* Start - Centered in left section */}
                      <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Start
                      </Box>

                      {/* Arrow - Centered */}
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        px={2}
                        color="#9c3cf6"
                        fontWeight="bold"
                      >
                        ⇌
                      </Box>

                      {/* End - Centered in right section */}
                      <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        End
                      </Box>
                    </>
                  )}
                </Flex>
              </Flex>
            </Box>

            {/* Get Events Button */}
            <Box
              width={{ base: "85%", md: "100%" }}
              maxWidth={{ base: "300px", md: "380px" }}
              mb={-3}
            >
              <Button
                onClick={handleGetEvents}
                bg="#ff6b35"
                color="white"
                borderRadius={{ base: "12px", md: "14px" }}
                fontWeight="700"
                fontSize={{ base: "16px", md: "20px" }}
                height={{ base: "52px", md: "58px" }}
                width={{ base: "110%", md: "105%" }}
                px={8}
                py={3}
                mx={{ base: "-5%", md: "-2.5%" }}
                position="relative"
                boxShadow="0 0 15px rgba(255, 107, 53, 0.6)"
                _hover={{
                  bg: "#ff5722",
                  transform: "translateY(-2px) scale(1.02)",
                  boxShadow: "0 0 20px rgba(255, 107, 53, 0.8)",
                }}
                _active={{
                  bg: "#e64a19",
                  transform: "translateY(0px) scale(1.0)",
                }}
                transition="all 0.3s ease-in-out"
                sx={{
                  animation: "glowPulse 1.5s infinite ease-in-out",
                  "@keyframes glowPulse": {
                    "0%": {
                      boxShadow: "0 0 0px rgba(255, 107, 53, 0.6)",
                    },
                    "50%": {
                      boxShadow:
                        "0 0 12px rgba(255, 107, 53, 0.9), 0 0 24px rgba(255, 107, 53, 0.6)",
                    },
                    "100%": {
                      boxShadow: "0 0 0px rgba(255, 107, 53, 0.6)",
                    },
                  },
                }}
              >
                Get Personalised Event Details
              </Button>
            </Box>
          </VStack>
        </Box>

        {/* Create Your Own Event Box */}
        <Box
          width={{ base: "fit-content", lg: "450px" }}
          maxWidth={{ base: "95%", lg: "450px" }}
          minWidth="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="16px"
          bg="white"
          boxShadow="xl"
          border="2px solid #ff6b35"
          py={{ base: 6, md: 8 }}
          px={{ base: 6, md: 8 }}
          position="relative"
          _hover={{
            "&::before": {
              opacity: 1,
            },
            borderColor: "#ff5722",
          }}
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              borderRadius: "18px",
              border: "2px solid transparent",
              background:
                "linear-gradient(90deg, #ff6b35, #9c3cf6, #ff6b35) border-box",
              backgroundSize: "200% 100%",
              animation: "borderGradient 3s linear infinite",
              opacity: 0,
              transition: "opacity 0.3s ease",
              zIndex: -1,
            },
            "@keyframes borderGradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "100%": { backgroundPosition: "200% 50%" },
            },
          }}
        >
          <VStack spacing={4} textAlign="center" position="relative" zIndex={1}>
            {/* Icon/Emoji */}
            {/* <Box
              fontSize={{ base: "3xl", md: "4xl" }}
              mb={2}
              sx={{
                animation: "float 2s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-8px)" },
                },
              }}
            >
              🎉
            </Box> */}

            {/* Heading */}
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="extrabold"
              color="#000001"
              lineHeight="1.1"
              mb={-2}
              mt={-3}
            >
              Create Your Own Event
            </Heading>

            {/* Description */}
            <VStack spacing={2}>
              <Text
  fontWeight="medium"
  fontSize={{ base: "sm", md: "md" }}
  color="#555"
  textAlign="center"
  lineHeight="1.4"
  fontStyle="italic"
>
  Host your own Latin dance event and connect with the community
</Text>


              {/* <Text
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}
                color="#ff6b35"
                textAlign="center"
                lineHeight="1.2"
              >
                Workshops • Social Nights • Festivals
              </Text> */}
            </VStack>

            {/* Create Event Button */}
            <Button
              onClick={handleCreateEvent}
              bg="linear-gradient(135deg, #ff6b35, #ff5722)"
              color="white"
              borderRadius={{ base: "12px", md: "14px" }}
              fontWeight="700"
              fontSize={{ base: "16px", md: "18px" }}
              height={{ base: "50px", md: "54px" }}
              width="100%"
              maxWidth="280px"
              px={6}
              py={3}
              position="relative"
              boxShadow="0 0 15px rgba(255, 107, 53, 0.4)"
              _hover={{
                bg: "linear-gradient(135deg, #ff5722, #e64a19)",
                transform: "translateY(-2px) scale(1.02)",
                boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)",
              }}
              _active={{
                transform: "translateY(0px) scale(1.0)",
              }}
              transition="all 0.3s ease-in-out"
              sx={{
                animation: "gentleGlow 2s infinite ease-in-out",
                "@keyframes gentleGlow": {
                  "0%": {
                    boxShadow: "0 0 5px rgba(255, 107, 53, 0.4)",
                  },
                  "50%": {
                    boxShadow: "0 0 15px rgba(255, 107, 53, 0.6)",
                  },
                  "100%": {
                    boxShadow: "0 0 5px rgba(255, 107, 53, 0.4)",
                  },
                },
              }}
            >
              Start Creating Event
            </Button>

            {/* Additional Info */}
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="#666"
              textAlign="center"
              mt={2}
            >
              Free to list • Reach thousands of dancers
            </Text>
          </VStack>
        </Box>
      </Flex>

      {/* Custom Calendar Modal */}
      <CustomCalendar
        dateRange={dateRange}
        setDateRange={setDateRange}
        isOpen={isCalendarOpen}
        onClose={onCalendarClose}
      />
    </Box>
  );
}

// Keep getStaticProps to fetch initial cities
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events`);
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }
    const events = await res.json();
    console.log("Fetched Events:", events);

    const uniqueCities = new Set();
    events.forEach((event) => {
      const city = event.city?.trim();
      if (city) {
        uniqueCities.add(city);
      }
    });

    return {
      props: {
        cities: Array.from(uniqueCities).sort(),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching cities:", err);
    return {
      props: {
        cities: [],
      },
      revalidate: 60,
    };
  }
}
