// pages/events/index.js (or adjust path as needed)

import React, { useState, useEffect } from "react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Caraousel from "../.././components/carousel"; // Adjust path if necessary
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2"; // Adjust path if necessary
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
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
import { DatePicker } from "antd";
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
  const [showDateSelectionPopup, setShowDateSelectionPopup] = useState(false); // New state for date selection popup
  const { RangePicker } = DatePicker;

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

  // Handlers for the popup (these will be moved to the display page if applicable to email the *filtered* events)
  // For now, they are kept here as they were in your original code.
  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (filteredEvents) => {
    setIsSending(true);
    try {
      const response = await fetch('/api/send-events-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: filteredEvents, // This would need to be passed here or determined on the backend
          city: selectedCity,
          userDetails: {
            email: toEmail,
            phone: phoneNumber,
            instagram: instagramId,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event details sent successfully! Check your email.');
        setShowPopup(false);
        // Reset form
        setToEmail("");
        setPhoneNumber("");
        setInstagramId("");
      } else {
        alert(`Failed to send email: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending details:", error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Handle city selection with popup
  const handleCityChange = (selectedValue) => {
    setSelectedCity(selectedValue);
    if (selectedValue) {
      // Show popup to prompt date selection
      setShowDateSelectionPopup(true);
      // Auto-hide the popup after 4 seconds
      setTimeout(() => {
        setShowDateSelectionPopup(false);
      }, 4000);
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
        pathname: "/events/display", // Navigate to the new display page
        query: queryParams,
      });
      setShowPopup(true); // Show popup when dates are selected
    } else {
      if (window.confirm("No travel dates selected. Would you like to see all upcoming events for " + selectedCity + "?")) {
        router.push({
          pathname: "/events/display", // Navigate to the new display page
          query: queryParams,
        });
        setShowPopup(true); // Show popup after confirming
      }
    }
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

      <Box mt={{ base: 1, md: -1 }} mb={-3} textAlign="center">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="extrabold"
          color="#000100"
        >
          Today's Social Nights
        </Heading>
      </Box>

      <LayerBlur2 />
      <Caraousel />

      {/* Date Selection Popup */}
      {showDateSelectionPopup && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="2xl"
          zIndex={10000}
          border="3px solid #9c3cf6"
          minW={{ base: "300px", md: "400px" }}
          animation="slideInScale 0.3s ease-out"
          sx={{
            "@keyframes slideInScale": {
              "0%": {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.8)"
              },
              "100%": {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)"
              }
            }
          }}
        >
          <VStack spacing={4} textAlign="center">
            <Box fontSize="2xl">🎉</Box>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color="#9c3cf6"
            >
              Great choice! {selectedCity} has amazing events!
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="#333"
              fontWeight="medium"
            >
              Now select your travel dates below to get personalized recommendations
            </Text>
            <Box
              display="flex"
              alignItems="center"
              fontSize="2xl"
              animation="bounce 1s infinite ease-in-out"
              sx={{
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-8px)" }
                }
              }}
            >
              ↓
            </Box>
            <Button
              size="sm"
              variant="outline"
              colorScheme="purple"
              onClick={() => setShowDateSelectionPopup(false)}
            >
              Got it!
            </Button>
          </VStack>
        </Box>
      )}

      {/* Backdrop for popup */}
      {showDateSelectionPopup && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.3)"
          backdropFilter="blur(2px)"
          zIndex={9999}
          onClick={() => setShowDateSelectionPopup(false)}
        />
      )}

      {/* Main Control Box */}
      <Box
        width={{ base: "95%", md: "90%", lg: "80%" }}
        maxWidth="800px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="16px"
        bg="white"
        boxShadow="xl"
        border="2px solid #9c3cf6"
        py={{ base: 6, md: 8 }}
        px={{ base: 4, md: 6 }}
        mt={{ base: -4, md: 2 }}
        mb={8}
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
            top: "-4px",
            left: "-4px",
            right: "-4px",
            bottom: "-4px",
            borderRadius: "18px", // Slightly larger than main box
            border: "2px solid transparent",
            background: "linear-gradient(90deg, #9c3cf6, #ff6b35, #9c3cf6) border-box",
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
        {/* Inner content remains the same */}
        <VStack spacing={0.5} mb={4} textAlign="center" position="relative" zIndex={1}>
          <Box mt={-4}>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color="#000001"
              lineHeight="1.1"
              mb={1}
            >
              Where's The Party?
            </Heading>
          </Box>

          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl" }}
            color="#a23cf6"
            fontWeight="bold"
            mb={1}
            lineHeight="1.1"
          >
            Just Pick a City!
          </Heading>

          <Box textAlign="center" maxW="100%">
            <VStack spacing={1}>
              <Text
                fontWeight="medium"
                fontSize={{ base: "xs", md: "sm" }}
                color="#555"
                whiteSpace="nowrap"
                mt={-0.5}
              >
                Discover verified Global Latin Dance Events
              </Text>

              <Text
                fontWeight="bold"
                fontSize={{ base: "md", md: "lg" }}
                color="#333"
                lineHeight="1.2"
                mt={-1}
              >
                <Text as="span" color="#ff6b35" fontWeight="extrabold">Salsa</Text>
                {", "}
                <Text as="span" color="#9c3cf6" fontWeight="extrabold">Bachata</Text>
                {", "}
                <Text as="span" color="#10b981" fontWeight="extrabold">Kizomba</Text>
                {" & "}
                <Text as="span" color="#f59e0b" fontWeight="extrabold">Zouk</Text>
                {" Nights"}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="medium"
                color="#9c3cf6"
                textAlign="center"
                mt={-1}
                mb={3}
                px={2}
                sx={{
                  animation: "fadeInBounce 2s ease-in-out",
                  "@keyframes fadeInBounce": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(10px)"
                    },
                    "60%": {
                      opacity: 1,
                      transform: "translateY(-2px)"
                    },
                    "80%": {
                      transform: "translateY(1px)"
                    },
                    "100%": {
                      transform: "translateY(0)"
                    }
                  }
                }}
              >
                Find events in your city{" "}
                <Box
                  as="span"
                  display="inline-block"
                  sx={{
                    animation: "bounce 1s infinite ease-in-out",
                    "@keyframes bounce": {
                      "0%, 100%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-4px)" }
                    }
                  }}
                >
                  ↓
                </Box>
              </Text>
            </VStack>
          </Box>
        </VStack>

        {/* Controls Container */}
        <VStack spacing={3} width="100%" align="center" mt={-4}>
          {/* City Selector */}
          <Box
            width={{ base: "85%", md: "100%" }}
            maxWidth={{ base: "260px", md: "340px" }}
            borderRadius={{ base: "10px", md: "12px" }}
            animation={!selectedCity ? `${flashBackgroundDark} 1.3s ease-in-out infinite` : "none"}
          >
            <Select
              value={selectedCity}
              onChange={(e) => {
                handleCityChange(e.target.value); // Use the new handler
              }}
              placeholder="Select a City"
              border="2px solid #9c3cf6"
              borderRadius={{ base: "10px", md: "12px" }}
              bg="transparent"
              color="black"
              fontWeight="600"
              fontSize={{ base: "14px", md: "16px" }}
              height={{ base: "46px", md: "50px" }}
              width="100%"
              _focus={{
                borderColor: "#9c3cf6",
                boxShadow: "0 0 0 1px #9c3cf6",
              }}
              _hover={{
                borderColor: "#8a2be2",
              }}
              animation={selectedCity ? "none" : `${blink} 1.5s ease-in-out infinite`}
              sx={{
                '& option': {
                  color: '#9c3cf6',
                  backgroundColor: 'white',
                  fontWeight: '600',
                  _hover: {
                    backgroundColor: '#f8f4ff',
                  },
                  _selected: {
                    backgroundColor: '#9c3cf6',
                    color: 'white',
                  },
                  animation: `${blink} 1.5s ease-in-out infinite`,
                  animationDelay: 'calc(var(--option-index) * 0.1s)'
                }
              }}
            >
              {cities.map((city, index) => (
                <option
                  key={city}
                  value={city}
                  style={{ '--option-index': index }}
                >
                  {city.trim()}
                </option>
              ))}
            </Select>
          </Box>

          {/* Date Range Picker */}
          <Box
            width={{ base: "95%", md: "100%" }}
            maxWidth={{ base: "260px", md: "280px" }}
            borderRadius={{ base: "10px", md: "12px" }}
            overflow="hidden"
            bg="white"
            position="relative"
            border="2px solid #9c3cf6"
            animation={selectedCity && !dateRange ? `${blink} 1.5s ease-in-out infinite` : "none"}
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
                minWidth={{ base: "100px", md: "120px" }}
                fontWeight="600"
                fontSize={{ base: "11px", md: "14px" }}
                borderRight="1px solid #6b21a8"
              >
                Set Travel Dates
              </Box>

              {/* Improved Date Range Picker */}
              <Box flex="1" height="100%">
                <RangePicker
                  format="DD MMM"
                  value={dateRange}
                  onChange={setDateRange}
                  onCalendarChange={(dates) => {
                    if (dates && dates.length === 2) {
                      setDateRange(dates);
                    }
                  }}
                  placeholder={["Start Date", "End Date"]}
                  style={{
                    width: "100%",
                    border: "none",
                    height: "100%",
                    fontSize: { base: "11px", md: "12px" },
                    fontWeight: "600",
                    color: "#9c3cf6",
                    backgroundColor: "transparent",
                    paddingLeft: "8px",
                    cursor: "pointer"
                  }}
                  separator={
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      px={1}
                      fontSize={{ base: "14px", md: "16px" }}
                      color="#9c3cf6"
                      fontWeight="bold"
                    >
                      ⇌
                    </Box>
                  }
                  allowEmpty={[false, false]} // Both dates required
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf('day');
                  }}
                  autoFocus={true} // Automatically focus on first pick
                  open={undefined} // Let the component handle its own open state
                />
              </Box>
            </Flex>
          </Box>

          {/* Get Events Button */}
          <Box width={{ base: "85%", md: "100%" }} maxWidth={{ base: "260px", md: "300px" }} mb={-3}>
            <Button
              onClick={handleGetEvents}
              bg={selectedCity && dateRange ? "#9c3cf6" : "#ff6b35"}
              color="white"
              borderRadius={{ base: "10px", md: "12px" }}
              fontWeight="700"
              fontSize={{ base: "12px", md: "16px" }}
              height={{ base: "44px", md: "48px" }}
              width="100%"
              boxShadow={selectedCity && dateRange ? "md" : "0 0 15px rgba(255, 107, 53, 0.6)"}
              _hover={{
                bg: selectedCity && dateRange ? "#8a2be2" : "#ff5722",
                transform: "translateY(-2px)",
                boxShadow: selectedCity && dateRange ? "lg" : "0 0 20px rgba(255, 107, 53, 0.8)",
              }}
              _active={{
                bg: selectedCity && dateRange ? "#7b1fa2" : "#e64a19",
                transform: "translateY(0px)",
              }}
              transition="all 0.2s ease"
              animation={!selectedCity || (!dateRange || !dateRange[0] || !dateRange[1]) ? `${blink} 2s ease-in-out infinite` : "none"}
            >
              Get Personalised Event Details
            </Button>
            {/* Popup - This will likely be triggered on the display page now or based on a successful navigation */}
            {showPopup && (
              <Box
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                backgroundColor="rgba(0, 0, 0, 0.7)"
                backdropFilter="blur(5px)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={9999}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setShowPopup(false);
                  }
                }}
              >
                <Box
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="2xl"
                  w={{ base: "90%", sm: "400px" }}
                  maxW="95vw"
                >
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="bold"
                    color="pink.500"
                    textAlign="center"
                    mb={4}
                  >
                    Hey, Hope you have a great time in {selectedCity}.
                  </Text>

                  {/* Input fields */}
                  <Stack spacing={4}>
                    <Input
                      placeholder="Enter your email..."
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                      type="email"
                      borderRadius="full"
                      borderColor="gray.300"
                      px={4}
                    />

                    <PhoneInput
                      country={'in'}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      inputStyle={{
                        width: '100%',
                        borderRadius: '9999px',
                        border: '1px solid #E2E8F0',
                        paddingLeft: '48px',
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                    />

                    <Input
                      placeholder="Instagram username"
                      value={instagramId}
                      onChange={(e) => setInstagramId(e.target.value)}
                      borderRadius="full"
                      borderColor="gray.300"
                      px={4}
                    />
                  </Stack>

                  <Text fontSize="sm" textAlign="center" mt={4} color="gray.600">
                    Get verified schedule sent to you so you can just dance.
                    Leave everything else to us.
                  </Text>

                  <Flex justify="flex-end" mt={6}>
                    <Button
                      mr={3}
                      variant="outline"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="pink"
                      isLoading={isSending}
                      onClick={() => handleSend([])} // Pass an empty array or handle event data differently
                    >
                      Send Details
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
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

    const uniqueCities = new Set();
    events.forEach((event) => {
      const city = event.city?.trim(); // Use optional chaining for safety
      if (city) {
        uniqueCities.add(city);
      }
    });

    return {
      props: {
        cities: Array.from(uniqueCities).sort(),
      },
      revalidate: 60, // Revalidate every 60 seconds
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