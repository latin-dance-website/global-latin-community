import React, { useEffect, useRef, useState } from "react";
import NavbarCompact from "@components/NavbarCompact";
import { useRouter } from "next/router";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
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
  Input, // Add this import
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
  // PhoneInput,
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
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import { DatePicker } from "antd";
import dayjs from "dayjs";

dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default function EventsPage({ eventsByCity, cities }) {
  const blink = keyframes`
    0% { box-shadow: 0 0 0px rgb(156, 60, 246); }
    50% { box-shadow: 0 0 10px rgb(156, 60, 246); }
    100% { box-shadow: 0 0 0px rgb(156, 60, 246); }
  `;
  
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [showEvents, setShowEvents] = useState(false);
  const { RangePicker } = DatePicker;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
const [showPopup, setShowPopup] = useState(false);
const [toEmail, setToEmail] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [instagramId, setInstagramId] = useState("");
const [isSending, setIsSending] = useState(false);
const handleSend = async () => {
  setIsSending(true);
  try {
    // Your email sending logic here
    console.log({ toEmail, phoneNumber, instagramId });
    // After successful send:
    setShowPopup(false);
  } catch (error) {
    console.error("Error sending details:", error);
  } finally {
    setIsSending(false);
  }
};
  // Auto-scroll functionality
  useEffect(() => {
    if (!showEvents || !isAutoScrolling) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = isMobile ? 300 : 350;
        const gap = isMobile ? 24 : 20;
        container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [showEvents, isAutoScrolling, isMobile]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const handleExploreNow = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social");
  };

  const handleShowEvents = () => {
    if (!selectedCity) return;
    setShowEvents(true);
  };

  const dayNameToNumber = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const getDatesForDayInRange = (dayName, startDate, endDate) => {
    const dayNumber = dayNameToNumber[dayName.toLowerCase()];
    if (dayNumber === undefined) return [];

    let currentDate = dayjs(startDate).startOf("day");
    const lastDate = dayjs(endDate).startOf("day");
    const dates = [];

    currentDate = currentDate.day(dayNumber);
    if (currentDate.isBefore(startDate)) {
      currentDate = currentDate.add(1, "week");
    }

    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate)) {
      if (currentDate.isBetween(startDate, lastDate, null, "[]")) {
        dates.push(currentDate);
      }
      currentDate = currentDate.add(1, "week");
    }

    return dates;
  };

  const formatEventDates = (events, startDate, endDate) => {
    if (!startDate || !endDate) return [];

    return events.flatMap((event) => {
      const eventDay = event.day?.toLowerCase();
      if (!eventDay || !dayNameToNumber[eventDay]) return [];

      const eventDates = getDatesForDayInRange(event.day, startDate, endDate);

      return eventDates.map((eventDate) => ({
        ...event,
        date: eventDate.toDate(),
        formattedDate: eventDate.format("ddd, DD MMM"),
        shortDate: eventDate.format("DD MMM"),
        day: eventDate.format("ddd"),
      }));
    });
  };

  const getFilteredEvents = () => {
    if (!selectedCity || !eventsByCity[selectedCity]) return [];

    let events = [...eventsByCity[selectedCity]];

    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      const today = dayjs();
      return events
        .map((event) => {
          const eventDay = event.day?.toLowerCase();
          if (!eventDay || !dayNameToNumber[eventDay]) return null;

          const dayNumber = dayNameToNumber[eventDay];
          let nextDate = today.day(dayNumber);
          if (nextDate.isBefore(today)) {
            nextDate = nextDate.add(1, "week");
          }

          return {
            ...event,
            date: nextDate.toDate(),
            formattedDate: nextDate.format("ddd, DD MMM"),
            shortDate: nextDate.format("DD MMM"),
            day: nextDate.format("ddd"),
          };
        })
        .filter(Boolean);
    }

    const startDate = dayjs(dateRange[0]);
    const endDate = dayjs(dateRange[1]);

    return formatEventDates(events, startDate, endDate);
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
      <Box w="100%" maxW="1200px" px={0} py={0} m={0}>
        <NavbarCompact />
      </Box>

      <Box mt={{ base: 4, md: 6 }} mb={-2} textAlign="center">
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
        mt={{ base: 2, md: 6 }}
        mb={8}
      >
        {/* Header Text */}
        <VStack spacing={1.5} mb={6} textAlign="center">
          <Box mt={-2}>  
    <Heading
      fontSize={{ base: "2xl", md: "2xl" }}
      fontWeight="bold"
      color="#000001"
    >
      Where's The Party?
    </Heading>
  </Box>
          <Heading
            as="h3"
            fontSize={{ base: "md", md: "lg" }}
            color="#a23cf6"
            fontWeight="semibold"
          >
            Just Pick a City!
          </Heading>
          <Box textAlign="center" lineHeight="1.6">
            <Text
              fontWeight="medium"
              fontSize={{ base: "sm", md: "md" }}
              color="#333"
            >
              Discover the verified
            </Text>
            <Text
              fontWeight="medium"
              fontSize={{ base: "sm", md: "md" }}
              color="#333"
            >
              Global Latin Dance Events
            </Text>
            <Text
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
              color="#333"
            >
              <Text as="span" color="#ff6b35">Salsa</Text>
              {", "}
              <Text as="span" color="#9c3cf6">Bachata</Text>
              {", "}
              <Text as="span" color="#10b981">Kizomba</Text>
              {" & "}
              <Text as="span" color="#f59e0b">Zouk</Text>
              {" Nights"}
            </Text>
          </Box>
        </VStack>

        {/* Controls Container */}
        <VStack spacing={4} width="100%" align="center">
          {/* City Selector */}
          <Box width={{ base: "75%", md: "100%" }} maxWidth={{ base: "200px", md: "300px" }}>
            <Select
  value={selectedCity}
  onChange={(e) => {
    setSelectedCity(e.target.value);
    setShowEvents(false);
  }}
  placeholder="Select a city"
  border="2px solid #9c3cf6"
  borderRadius={{ base: "10px", md: "12px" }}
  bg="white"
  color="#9c3cf6"
  fontWeight="600"
  fontSize={{ base: "13px", md: "16px" }}
  height={{ base: "44px", md: "48px" }}
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
      // Add this for the blinking animation on options
      animation: `${blink} 1.5s ease-in-out infinite`,
      animationDelay: 'calc(var(--option-index) * 0.1s)'
    }
  }}
>
  {cities.map((city, index) => (
    <option 
      key={city} 
      value={city}
      style={{
        '--option-index': index // This will be used for staggered animation
      }}
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
            border={{ base: "2px solid #9c3cf6", md: "none" }}
          >
            <Flex align="center" height={{ base: "44px", md: "48px" }}>
              {/* Set Travel Dates Label */}
              <Box
                bg="linear-gradient(135deg, #ff6b35, #f59e0b)"
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
                borderRight="1px solid #9c3cf6"
              >
                Set Travel Dates
              </Box>
              
              {/* Date Range Picker */}
              <Box flex="1" height="100%">
                <RangePicker
                  format="DD MMM"
                  value={dateRange}
                  onChange={(dates) => {
                    setDateRange(dates);
                    setShowEvents(false);
                  }}
                  placeholder={["Start Date", "End Date"]}
                  style={{
                    width: "100%",
                    border: "none",
                    height: isMobile ? "42px" : "46px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: "600",
                    color: "#9c3cf6",
                    backgroundColor: "transparent",
                    border: isMobile ? "none" : "1px solid #9c3cf6", // <-- added border for desktop
  borderRadius: "6px", // optional for a rounded border
  paddingLeft: "8px", 
                  }}
                  suffixIcon={null}
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
                  inputReadOnly={isMobile}
                  placement="bottomLeft"
                />
              </Box>
            </Flex>
          </Box>

          {/* Get Events Button */}
          <Box width={{ base: "85%", md: "100%" }} maxWidth={{ base: "260px", md: "300px" }}>
            <Button
              onClick={() => {
                if (!selectedCity) {
                  alert("Please select a city first!");
                  return;
                }
                if (!dateRange || !dateRange[0] || !dateRange[1]) {
                  if (window.confirm("No travel dates selected. Would you like to see all upcoming events for " + selectedCity + "?")) {
                    handleShowEvents();
                    setShowPopup(true); // Show popup after confirming
                  }
                  return;
                }
                handleShowEvents();
                setShowPopup(true); // Show popup when dates are selected
              }}
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
              animation={!selectedCity || !dateRange ? `${blink} 2s ease-in-out infinite` : "none"}
            >
              Get Personalised Event Details
            </Button>
            {/* Popup - Place this right after your button */}
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
          onClick={handleSend}
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

      {/* Events Display */}
      {showEvents && selectedCity && (
        <Box width="100%" mt={8} mb={12} px={{ base: 4, md: 6 }}>
          {/* Mobile: Horizontal scrolling */}
          <Box display={{ base: "block", md: "none" }}>
            <Box
              ref={scrollContainerRef}
              display="flex"
              overflowX="auto"
              gap={6}
              pb={4}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              css={{
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#9c3cf6',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#8a2be2',
                },
              }}
            >
              {getFilteredEvents().map((event, index) => (
                <Box
                  key={`${event.id}-${index}`}
                  minWidth="300px"
                  maxWidth="300px"
                  onClick={() => handleExploreNow(event)}
                  cursor="pointer"
                >
                  <Box
                    borderRadius="12px"
                    overflow="hidden"
                    bg="white"
                    height="320px"
                    border="1px solid #e2e8f0"
                    boxShadow="sm"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl",
                      borderColor: "#f63c80",
                    }}
                    transition="all 0.3s ease"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box
                      width="100%"
                      height="240px"
                      overflow="hidden"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bg="#f8f9fa"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Box
                      p="6px"
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                    >
                      <Text
                        fontSize="11px"
                        fontWeight="700"
                        noOfLines={1}
                        lineHeight="1.2"
                        color="gray.800"
                        width="100%"
                        textAlign="center"
                        mb="4px"
                        px={1}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {event.title}
                      </Text>

                      <Flex
                        align="center"
                        justify="flex-start"
                        width="100%"
                        mb="3px"
                        gap={2}
                      >
                        <Box color="#6366f1" fontSize="11px">
                          <FaCalendar />
                        </Box>
                        <Text
                          fontSize="11px"
                          color="gray.600"
                          fontWeight="600"
                        >
                          {event.formattedDate}
                        </Text>
                        <Box color="#6366f1" fontSize="11px">
                          <FaClock />
                        </Box>
                        <Text
                          fontSize="11px"
                          color="gray.600"
                          fontWeight="600"
                        >
                          {event.startTime} - {event.endTime}
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        justify="flex-start"
                        width="100%"
                      >
                        <Flex align="center" gap={2} width="100%">
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="11px"
                          >
                            <FaLocationDot />
                          </Box>
                          <Text
                            fontSize="11px"
                            color="gray.600"
                            fontWeight="600"
                            noOfLines={2}
                            lineHeight="1.3"
                            textAlign="left"
                            flex="1"
                            wordBreak="break-word"
                          >
                            {event.location}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Desktop: Horizontal scrolling grid */}
          <Box display={{ base: "none", md: "block" }}>
            <Box
              ref={scrollContainerRef}
              display="flex"
              overflowX="auto"
              gap={5}
              pb={4}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              css={{
                '&::-webkit-scrollbar': {
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#9c3cf6',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#8a2be2',
                },
              }}
            >
              {getFilteredEvents().map((event, index) => (
                <Box
                  key={`${event.id}-${index}`}
                  minWidth="350px"
                  maxWidth="350px"
                  onClick={() => handleExploreNow(event)}
                  cursor="pointer"
                >
                  <Box
                    borderRadius="12px"
                    overflow="hidden"
                    bg="white"
                    height="380px"
                    border="1px solid #e2e8f0"
                    boxShadow="sm"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl",
                      borderColor: "#f63c80",
                    }}
                    transition="all 0.3s ease"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box
                      width="100%"
                      height="280px"
                      overflow="hidden"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bg="#f8f9fa"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Box
                      p="8px"
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                    >
                      <Text
                        fontSize="13px"
                        fontWeight="700"
                        noOfLines={1}
                        lineHeight="1.2"
                        color="gray.800"
                        width="100%"
                        textAlign="center"
                        mb="6px"
                        px={1}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {event.title}
                      </Text>

                      <Flex
                        align="center"
                        justify="flex-start"
                        width="100%"
                        mb="4px"
                        gap={2}
                      >
                        <Box color="#6366f1" fontSize="13px">
                          <FaCalendar />
                        </Box>
                        <Text
                          fontSize="12px"
                          color="gray.600"
                          fontWeight="600"
                        >
                          {event.formattedDate}
                        </Text>
                        <Box color="#6366f1" fontSize="13px">
                          <FaClock />
                        </Box>
                        <Text
                          fontSize="12px"
                          color="gray.600"
                          fontWeight="600"
                        >
                          {event.startTime} - {event.endTime}
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        justify="flex-start"
                        width="100%"
                      >
                        <Flex align="center" gap={2} width="100%">
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="13px"
                          >
                            <FaLocationDot />
                          </Box>
                          <Text
                            fontSize="12px"
                            color="gray.600"
                            fontWeight="600"
                            noOfLines={2}
                            lineHeight="1.3"
                            textAlign="left"
                            flex="1"
                            wordBreak="break-word"
                          >
                            {event.location}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* No events message */}
          {getFilteredEvents().length === 0 && (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg">
                No events found for {selectedCity}
                {dateRange && dateRange[0] && dateRange[1] && (
                  <>
                    {" "}
                    between {dayjs(dateRange[0]).format("MMM D")} and{" "}
                    {dayjs(dateRange[1]).format("MMM D, YYYY")}
                  </>
                )}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events`);
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }
    const events = await res.json();

    const eventsByCity = {};
    const uniqueCities = new Set();

    events.forEach((event) => {
      const city = event.city.trim();
      if (!city) return;

      if (!eventsByCity[city]) {
        eventsByCity[city] = [];
        uniqueCities.add(city);
      }
      eventsByCity[city].push(event);
    });

    return {
      props: {
        eventsByCity,
        cities: Array.from(uniqueCities).sort(),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching events:", err);
    return {
      props: {
        eventsByCity: {},
        cities: [],
      },
      revalidate: 60,
    };
  }
}