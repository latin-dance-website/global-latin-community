import React, { useEffect, useRef, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
  Center,
  Stack,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  FaCalendar,
  FaClock,
  FaLocationDot,
  FaDollarSign,
  FaMusic,
} from "react-icons/fa6";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

export default function EventsDisplayPage({ allEvents }) {
  const router = useRouter();
  const { city, startDate, endDate } = router.query;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const toast = useToast();

  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const theme = extendTheme({
    components: {
      Toast: {
        baseStyle: {
          container: {
            zIndex: 10000,
          },
        },
      },
    },
  });
  const dayNameToNumber = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const getDatesForDayInRange = (dayName, start, end) => {
    const dayNumber = dayNameToNumber[dayName.toLowerCase()];
    if (dayNumber === undefined) return [];

    let currentDate = dayjs(start).startOf("day");
    const lastDate = dayjs(end).startOf("day");
    const dates = [];
    currentDate = currentDate.day(dayNumber);
    if (currentDate.isBefore(start, "day")) {
      currentDate = currentDate.add(1, "week");
    }

    while (currentDate.isSameOrBefore(lastDate, "day")) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "week");
    }

    return dates;
  };

  const formatEventDates = (events, startDateObj, endDateObj) => {
    if (!startDateObj || !endDateObj) {
      const today = dayjs();
      return events
        .map((event) => {
          const eventDay = event.day?.toLowerCase();
          if (!eventDay || dayNameToNumber[eventDay] === undefined) return null;

          const dayNumber = dayNameToNumber[eventDay];
          let nextDate = today.day(dayNumber);
          if (nextDate.isBefore(today, "day")) {
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
    return events.flatMap((event) => {
      const eventDay = event.day?.toLowerCase();
      if (!eventDay || dayNameToNumber[eventDay] === undefined) return [];

      const eventDates = getDatesForDayInRange(
        event.day,
        startDateObj,
        endDateObj
      );

      return eventDates.map((eventDate) => ({
        ...event,
        date: eventDate.toDate(),
        formattedDate: eventDate.format("ddd, DD MMM"),
        shortDate: eventDate.format("DD MMM"),
        day: eventDate.format("ddd"),
      }));
    });
  };

  useEffect(() => {
    if (!city || !allEvents) {
      setFilteredEvents([]);
      return;
    }

    let eventsForSelectedCity = allEvents.filter(
      (e) => e.city.trim().toLowerCase() === city.trim().toLowerCase()
    );

    let startDateObj = null;
    let endDateObj = null;

    if (startDate && endDate) {
      startDateObj = dayjs(startDate);
      endDateObj = dayjs(endDate);
    }

    const processedEvents = formatEventDates(
      eventsForSelectedCity,
      startDateObj,
      endDateObj
    );
    processedEvents.sort(
      (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    setFilteredEvents(processedEvents);
    setShowPopup(true);
  }, [city, startDate, endDate, allEvents]);
 useEffect(() => {
  if (!filteredEvents.length || !isAutoScrolling || !isMobile) return;

  const container = scrollContainerRef.current;
  if (!container) return;

  const scrollInterval = setInterval(() => {
    const scrollPosition = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const cardHeight = 320; // Approximate height of your card with margin
    
    // If we're at or near the bottom
    if (scrollPosition >= scrollHeight - 10) { // 10px threshold
      // Scroll to show the full last card
      container.scrollTo({
        top: scrollHeight - container.clientHeight,
        behavior: "smooth"
      });
      // Then reset to top after a delay
      setTimeout(() => {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
    } else {
      // Normal scrolling behavior
      container.scrollBy({ top: cardHeight, behavior: "smooth" });
    }
  }, 5000); // Adjust timing as needed

  return () => clearInterval(scrollInterval);
}, [filteredEvents, isAutoScrolling, isMobile]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const handleExploreNow = (event) => {
  const normalizedCity = event.city.trim().toLowerCase();
  router.push(`/events/${normalizedCity}/${event.id}`);
};

  const validateFields = () => {
    const missingFields = [];

    if (!toEmail || !toEmail.trim()) {
      missingFields.push("Email ID");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      missingFields.push("Mobile Number");
    }

    if (!instagramId || !instagramId.trim()) {
      missingFields.push("Instagram ID");
    }

    if (missingFields.length > 0) {
      const fieldText =
        missingFields.length === 1
          ? missingFields[0]
          : missingFields.length === 2
          ? missingFields.join(" and ")
          : missingFields.slice(0, -1).join(", ") +
            " and " +
            missingFields.slice(-1);

      toast({
        title: "Missing Required Fields",
        description: `Please enter ${fieldText}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    return true;
  };

  const handleSend = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSending(true);
    try {
      const emailResponse = await fetch("/api/send-events-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events: filteredEvents,
          city: city,
          userDetails: {
            email: toEmail.trim(),
            phone: phoneNumber.trim(),
            instagram: instagramId.trim(),
            startDate: startDate,
            endDate: endDate,
          },
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(`Failed to send email: ${emailResult.message}`);
      }
      const storeResponse = await fetch("/api/store-user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: toEmail.trim(),
          phone: phoneNumber.trim(),
          instagram: instagramId.trim(),
        }),
      });

      const storeResult = await storeResponse.json();

      if (!storeResponse.ok) {
        throw new Error(`Failed to store user details: ${storeResult.message}`);
      }

      toast({
        title: "Success!",
        description: "Event details sent successfully! Check your email.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setShowPopup(false);
      setToEmail("");
      setPhoneNumber("");
      setInstagramId("");
    } catch (error) {
      console.error("Detailed error:", {
        message: error.message,
        response: await error.response?.json(),
        stack: error.stack,
      });

      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!city) {
    return (
      <Center minH="100vh">
        <Text fontSize="xl">
          Please select a city from the{" "}
          <Button variant="link" onClick={() => router.push("/events")}>
            events page
          </Button>
          .
        </Text>
      </Center>
    );
  }

  return (
    <ChakraProvider theme={theme}>
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
        bg="linear-gradient(to bottom right, #f7f0fa, #e0f2f7)"
      >
        {/* Navbar and header section remains unchanged */}
        <Box w="100%" maxW="1200px" px={0} py={0} m={-1}>
          <Navbar />
        </Box>

        <Box
  w="100%"
  h="3px"
  bg="linear-gradient(90deg, transparent, #a0aec0, transparent)"
  mt={{ base: "4px", md: "6px" }}
  mb={0}
/>

{/* Modified heading container with transparent background */}
<Box 
  mt={{ base: "-2px", md: "6px" }}
  mb={{ base: 4, md: 8 }}
  textAlign="center"
  position={{ base: "sticky", md: "static" }}
  top={{ base: "0", md: "auto" }}
  zIndex={1}
  py={{ base: 2, md: 0 }}
  px={{ base: 4, md: 0 }}
  bg="transparent" 
>
  <Box 
    display="inline-block" 
    bg="transparent"
    px={{ base: 4, md: 0 }}
    py={{ base: 2, md: 0 }}
  >
    <Heading
      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
      fontWeight="extrabold"
      color="#dc2626"
      textShadow="0 1px 2px rgba(0,0,0,0.1)" 
    >
      Social Nights in {city}
    </Heading>
    {startDate && endDate && (
      <Text 
        fontSize="lg" 
        color="#4a5568" 
        mt={1} 
        mb={-2}
        textShadow="0 1px 1px rgba(0,0,0,0.1)" 
      >
        From {dayjs(startDate).format("MMM D")} to{" "}
        {dayjs(endDate).format("MMM D, YYYY")}
      </Text>
    )}
  </Box>
</Box>
{/* Events Display */}
<Box width="100%" mt={-2} mb={4} px={{ base: 4, md: 6 }}>
  {/* Mobile: Vertical scrolling grid */}
  <Box display={{ base: "block", md: "none" }}>
    <Box
      ref={scrollContainerRef}
      height="85vh" // Slightly less than full height
      overflowY="auto"
      position="relative"
      pt="10px"
      px="4px"
      sx={{
        scrollSnapType: "y mandatory",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {filteredEvents.map((event, index) => (
        <Box
          key={`${event.id}-${index}`}
          width="100%"
          maxWidth="320px"
          mx="auto"
          height="auto" // Auto height to accommodate content
          scrollSnapAlign="start"
          onClick={() => handleExploreNow(event)}
          cursor="pointer"
          mb={6} // Margin between cards
          sx={{
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Box
            borderRadius="16px"
            overflow="hidden"
            bg="white" // Changed to white background
            height="100%"
            border="2px solid transparent"
            boxShadow="0 6px 16px rgba(0, 0, 0, 0.1)" // Lighter shadow
            _hover={{
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: "0 12px 24px rgba(246, 60, 128, 0.35)",
              borderColor: "#f63c80",
            }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            display="flex"
            flexDirection="column"
            position="relative"
          >
            {/* Image Section with Overlay Icons */}
            <Box
              width="100%"
              height="200px" // Fixed height for image
              overflow="hidden"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              bg="#000"
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              
              {/* Stars and Love Icon Overlay */}
              <Box
                position="absolute"
                top="12px"
                right="12px"
                display="flex"
                alignItems="center"
                gap={1}
                zIndex={2}
              >
                {/* Stars */}
                <Box display="flex" alignItems="center">
                  {[...Array(5)].map((_, i) => (
                    <Box
                      key={i}
                      color="#FFD700"
                      fontSize="14px"
                      sx={{
                        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                      }}
                    >
                      ★
                    </Box>
                  ))}
                </Box>
                
                {/* Love Icon */}
                <Box
                  color="#ff4757"
                  fontSize="18px"
                  sx={{
                    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  _hover={{
                    transform: "scale(1.2)",
                  }}
                >
                  ♥
                </Box>
              </Box>
            </Box>

            {/* Content Section */}
            <Box
              p="16px"
              flex="1"
              display="flex"
              flexDirection="column"
              gap={3}
              bg="white" // Changed to white background
            >
              {/* Title - Centered */}
              <Text
                fontSize="18px"
                fontWeight="700"
                lineHeight="1.3"
                color="black" // Changed to black
                width="100%"
                textAlign="center"
                sx={{
                  fontFamily: "inherit",
                }}
                mt={-2.5}
              >
                {event.title}
              </Text>

              {/* Buy Tickets Button */}
              {/* Buy Tickets Button */}
<Box
  as="button"
  bgGradient="linear(135deg, #805AD5 0%, #D53F8C 100%)" // Purple to Pink gradient
  color="white"
  fontSize="14px"
  fontWeight="600"
  px={4}
  py={2}
  borderRadius="8px"
  border="none"
  cursor="pointer"
  textAlign="center"
  width="100%"
  mt={-1.5}
  sx={{
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  }}
  _hover={{
    bgGradient: "linear(135deg, #6B46C1 0%, #B83280 100%)", // Darker gradient on hover
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(214, 54, 140, 0.3)", // Optional: Adds glow effect
  }}
  _active={{
    transform: "translateY(0)",
  }}
>
  BOOK TICKETS
</Box>

              {/* Event Details - New Layout */}
              <Box display="flex" flexDirection="column" gap={3}>
                {/* First Line: Date, Time, Fees in one row */}
                <Flex justify="space-between" align="center" width="100%">
                  {/* Date */}
                  <Flex align="center" gap={2}>
                    <Box color="#805AD5" fontSize="14px">  {/* Chakra purple.400 */}
  <FaCalendar />
</Box>
                    <Text
                      fontSize="13px"
                      color="black" // Changed to black
                      fontWeight="600"
                      sx={{ fontFamily: "inherit" }}
                    >
                      {event.formattedDate}
                    </Text>
                  </Flex>

                  {/* Time */}
                  <Flex align="center" gap={2}>
                    <Box color="#805AD5" fontSize="14px">
                      <FaClock />
                    </Box>
                    <Text
                      fontSize="13px"
                      color="black" // Changed to black
                      fontWeight="600"
                      sx={{ fontFamily: "inherit" }}
                    >
                      {event.startTime}-{event.endTime}hrs
                    </Text>
                  </Flex>

                  {/* Fees */}
                  <Flex align="center" gap={2}>
                    <Box color="#805AD5" fontSize="14px">
                      {event.currencySymbols || "₫"}
                    </Box>
                    <Text
                      fontSize="13px"
                      color="black" // Changed to black
                      fontWeight="600"
                      sx={{ fontFamily: "inherit" }}
                    >
                      {event.fees || "Free"}
                    </Text>
                  </Flex>
                </Flex>

                {/* Vertical Aligned Section */}
                <Flex direction="column" gap={3} pl={1}>
  {/* Music Ratio */}
  {/* <Flex align="center" gap={2} ml={-1}>
    <Box color="#805AD5" fontSize="14px">
      <FaMusic />
    </Box>
    <Text
      fontSize="13px"
      color="black"
      fontWeight="600"
      sx={{ fontFamily: "inherit" }}
    >
      {event.musicRatio || "Mixed"}
    </Text>
  </Flex> */}

  {/* Location */}
  <Flex align="flex-start" gap={2} ml={-1} mb={-2}>
    <Box color="#805AD5" fontSize="14px" pt="1px">
      <FaLocationDot />
    </Box>
    <Text
      fontSize="13px"
      color="black"
      fontWeight="600"
      lineHeight="1.4"
      sx={{ fontFamily: "inherit" }}
    >
      {event.location}
    </Text>
  </Flex>
</Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
</Box>

        {/* Desktop: 3 cards per row */}
<Box display={{ base: "none", md: "block" }}>
  <Box
    display="grid"
    gridTemplateColumns="repeat(3, 1fr)"
    gap={6}
    pb={4}
    maxWidth="1200px"
    mx="auto"
  >
    {filteredEvents.map((event, index) => (
      <Box
        key={`${event.id}-${index}`}
        width="100%"
        onClick={() => handleExploreNow(event)}
        cursor="pointer"
      >
        <Box
          borderRadius="20px"
          overflow="hidden"
          bg="linear-gradient(145deg, #ffffff, #f0f2f5)"
          height="auto"
          minHeight="420px"
          border="2px solid transparent"
          boxShadow="0 8px 24px rgba(0, 0, 0, 0.15)"
          _hover={{
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 16px 32px rgba(246, 60, 128, 0.4)",
            borderColor: "#f63c80",
            _before: {
              opacity: 1,
            },
          }}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          display="flex"
          flexDirection="column"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "20px",
            padding: "2px",
            background:
              "linear-gradient(135deg, #f63c80, #6366f1, #f63c80)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            opacity: 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <Box
            width="100%"
            height="280px"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#f8f9fa"
            position="relative"
          >
            <img
              src={event.image}
              alt={event.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                transform: "scale(1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Box>

          <Box
            p="16px"
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            gap={4}
          >
            {/* Title */}
            <Box textAlign="center">
              <Text
                fontSize="20px"
                fontWeight="800"
                noOfLines={1}
                lineHeight="1.2"
                color="#000000"
                width="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                mt={-2}
              >
                {event.title}
              </Text>
              {/* BOOK TICKETS button */}
              <Button
  mt={2}
  size="md"
  bgGradient="linear(135deg, #805AD5 0%, #D53F8C 100%)"
  color="white"
  fontSize="14px"
  fontWeight="600"
  px={4}
  py={2}
  borderRadius="8px"
  width="100%"
  textAlign="center"
  fontFamily="inherit"
  transition="all 0.3s ease"
  _hover={{
    bgGradient: "linear(135deg, #6B46C1 0%, #B83280 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(214, 54, 140, 0.3)",
  }}
  _active={{
    transform: "translateY(0)",
  }}
  onClick={(e) => {
    e.stopPropagation();
    // Add your booking logic here
  }}
>
  BOOK TICKETS
</Button>
            </Box>

            {/* Date, Time, and Price */}
            <Flex
              align="center"
              justify="space-between"
              width="100%"
              gap={2}
              wrap="wrap"
            >
              <Flex
                align="center"
                gap={2}
                flex="0 0 auto"
                justify="flex-start"
              >
                <Box color="#805AD5" fontSize="15px" flexShrink={0}>
                  <FaCalendar />
                </Box>
                <Text
                  fontSize="14px"
                  color="#000000"
                  fontWeight="600"
                >
                  {event.formattedDate}
                </Text>
              </Flex>

              <Flex
                align="center"
                gap={2}
                flex="0 0 auto"
                justify="center"
              >
                <Box color="#805AD5" fontSize="15px" flexShrink={0}>
                  <FaClock />
                </Box>
                <Text
                  fontSize="14px"
                  color="#000000"
                  fontWeight="600"
                  noOfLines={1}
                >
                  {event.startTime}-{event.endTime}hrs
                </Text>
              </Flex>

              <Flex
                align="center"
                gap={1}
                flex="0 0 auto"
                justify="flex-end"
              >
                <Text
                  fontSize="14px"
                  color="#000000"
                  fontWeight="600"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Box as="span" color="#805AD5">
                    {event.currencySymbols || "₫"}
                  </Box>
                  {event.fees || "Free"}
                </Text>
              </Flex>
            </Flex>

            {/* Music Ratio */}
            {/* <Flex
              align="center"
              justify="flex-start"
              width="100%"
              gap={2}
            >
              <Box color="#805AD5" fontSize="15px">
                <FaMusic />
              </Box>
              <Text fontSize="14px" color="#000000" fontWeight="600">
                {event.musicRatio || "Mixed"}
              </Text>
            </Flex> */}

            {/* Location */}
            <Flex
              align="center"
              justify="flex-start"
              width="100%"
              gap={2}
            >
              <Box flexShrink={0} color="#805AD5" fontSize="15px">
                <FaLocationDot />
              </Box>
              <Text
                fontSize="14px"
                color="#000000"
                fontWeight="600"
                noOfLines={1}
                lineHeight="1.3"
                textAlign="left"
                wordBreak="break-word"
              >
                {event.location}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
</Box>

          {/* No events message */}
          {filteredEvents.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color="#4a5568">
                No events found for {city}
                {startDate && endDate && (
                  <>
                    {" "}
                    between {dayjs(startDate).format("MMM D")} and{" "}
                    {dayjs(endDate).format("MMM D, YYYY")}
                  </>
                )}
              </Text>
            </Box>
          )}
        </Box>

        {/* Popup for email capture - this should be conditionally rendered */}
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
            zIndex={2000}
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
                Hey, Hope you have a great time dancing in {city}.
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
                  country={"in"}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "9999px",
                    border: "1px solid #E2E8F0",
                    paddingLeft: "48px",
                  }}
                  containerStyle={{
                    width: "100%",
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

              <Text fontSize="md" textAlign="center" mt={4} color="gray.600">
                Get verified schedule sent to your contacts.
              </Text>
              <Text fontSize="md" textAlign="center" mt={4} color="gray.600">
                We handle the plan. You handle the dancing.
              </Text>

              <Flex justify="center" mt={6}>
                <Button
                  width="200px"
                  h="50px"
                  fontSize="lg"
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
      {/* </Box> */}
    </ChakraProvider>
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

    return {
      props: {
        allEvents: events,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching all events for display page:", err);
    return {
      props: {
        allEvents: [],
      },
      revalidate: 60,
    };
  }
}
