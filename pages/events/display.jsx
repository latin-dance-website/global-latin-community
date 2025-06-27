// pages/events/display.js

import React, { useEffect, useRef, useState } from "react";
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
  Input
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaLocationDot, FaDollarSign, FaMusic } from "react-icons/fa6";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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

  // State for the email popup
  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isSending, setIsSending] = useState(false);

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

    // Adjust the first date if it's before the start date of the week for the specified day
    currentDate = currentDate.day(dayNumber);
    if (currentDate.isBefore(start, 'day')) {
      currentDate = currentDate.add(1, "week");
    }

    while (currentDate.isSameOrBefore(lastDate, 'day')) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "week");
    }

    return dates;
  };

  const formatEventDates = (events, startDateObj, endDateObj) => {
    if (!startDateObj || !endDateObj) {
      // If no date range, find the next upcoming event for each event type
      const today = dayjs();
      return events.map((event) => {
        const eventDay = event.day?.toLowerCase();
        if (!eventDay || dayNameToNumber[eventDay] === undefined) return null;

        const dayNumber = dayNameToNumber[eventDay];
        let nextDate = today.day(dayNumber); // Get the next occurrence of the day
        if (nextDate.isBefore(today, 'day')) { // If it's earlier in the current week, get it for next week
          nextDate = nextDate.add(1, "week");
        }

        return {
          ...event,
          date: nextDate.toDate(),
          formattedDate: nextDate.format("ddd, DD MMM"),
          shortDate: nextDate.format("DD MMM"),
          day: nextDate.format("ddd"),
        };
      }).filter(Boolean); // Remove nulls
    }

    // If date range is provided, find all occurrences within the range
    return events.flatMap((event) => {
      const eventDay = event.day?.toLowerCase();
      if (!eventDay || dayNameToNumber[eventDay] === undefined) return [];

      const eventDates = getDatesForDayInRange(event.day, startDateObj, endDateObj);

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

    let eventsForSelectedCity = allEvents.filter(e => e.city.trim().toLowerCase() === city.trim().toLowerCase());

    let startDateObj = null;
    let endDateObj = null;

    if (startDate && endDate) {
      startDateObj = dayjs(startDate);
      endDateObj = dayjs(endDate);
    }

    const processedEvents = formatEventDates(eventsForSelectedCity, startDateObj, endDateObj);

    // Sort events by date if a date range is given, otherwise by the next upcoming date
    processedEvents.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    setFilteredEvents(processedEvents);
    setShowPopup(true); // Show popup when events are displayed
  }, [city, startDate, endDate, allEvents]); // Re-run when query params or allEvents change

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!filteredEvents.length || !isAutoScrolling || !isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const cardHeight = 350; // Height of each card
        const gap = 24; // Gap between cards
        container.scrollBy({ top: cardHeight + gap, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [filteredEvents, isAutoScrolling, isMobile]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const handleExploreNow = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social"); // This navigates to the event detail page
  };

const handleSend = async () => {
  setIsSending(true);
  try {
    // First, send the email
    const emailResponse = await fetch('/api/send-events-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: filteredEvents,
        city: city,
        userDetails: {
          email: toEmail,
          phone: phoneNumber,
          instagram: instagramId,
          startDate: startDate,
          endDate: endDate
        },
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(`Failed to send email: ${emailResult.message}`);
    }

    // Then, store the user details in Google Sheets
    const storeResponse = await fetch('/api/store-user-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: toEmail,
        phone: phoneNumber,
        instagram: instagramId,
      }),
    });

    const storeResult = await storeResponse.json();

    if (!storeResponse.ok) {
      throw new Error(`Failed to store user details: ${storeResult.message}`);
    }

    alert('Event details sent successfully! Check your email.');
    setShowPopup(false);
    // Reset form
    setToEmail("");
    setPhoneNumber("");
    setInstagramId("");
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      response: await error.response?.json(),
      stack: error.stack
    });
    alert(`Error: ${error.message}`);
  } finally {
    setIsSending(false);
  }
};
  if (!city) {
    return (
      <Center minH="100vh">
        <Text fontSize="xl">Please select a city from the <Button variant="link" onClick={() => router.push('/events')}>events page</Button>.</Text>
      </Center>
    );
  }

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
      mb={6}
    />

    <Box mt={{ base: "-14px", md: "6px" }} mb={6} textAlign="center">
      <Heading
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="extrabold"
        color="#2d3748"
      >
        Social Nights in {city}
      </Heading>
      {startDate && endDate && (
        <Text fontSize="lg" color="#4a5568" mt={1} mb={-4}>
          From {dayjs(startDate).format("MMM D")} to {dayjs(endDate).format("MMM D, YYYY")}
        </Text>
      )}
    </Box>

    {/* Events Display */}
    <Box width="100%" mt={0} mb={12} px={{ base: 4, md: 6 }}>
      {/* Mobile: Vertical scrolling grid */}
      <Box display={{ base: "block", md: "none" }}>
        <Box
          ref={scrollContainerRef}
          display="grid"
          gridTemplateColumns="1fr"
          gap={6}
          pb={4}
          pt="26px"
          maxHeight="70vh"
          overflowY="auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {filteredEvents.map((event, index) => (
            <Box
              key={`${event.id}-${index}`}
              width="100%"
              maxWidth="300px"
              mx="auto"
              onClick={() => handleExploreNow(event)}
              cursor="pointer"
            >
              <Box
                borderRadius="16px"
                overflow="hidden"
                bg="linear-gradient(145deg, #ffffff, #f0f2f5)"
                height="auto"
                minHeight="300px"
                border="2px solid transparent"
                boxShadow="0 6px 16px rgba(0, 0, 0, 0.12)"
                _hover={{
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 12px 24px rgba(246, 60, 128, 0.35)",
                  borderColor: "#f63c80",
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
                  borderRadius: "16px",
                  padding: "2px",
                  background: "linear-gradient(135deg, #f63c80, #6366f1, #f63c80)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                }}
                _hover={{
                  _before: {
                    opacity: 1,
                  }
                }}
              >
                <Box
                  width="100%"
                  height="180px"
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
                  p="12px"
                  flex="1"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  gap={3}
                >
                  {/* Title */}
                  <Text
                    fontSize="16px"
                    fontWeight="800"
                    noOfLines={1}
                    lineHeight="1.2"
                    color="#2d3748"
                    width="100%"
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {event.title}
                  </Text>

                  {/* Date, Time, and Price */}
                  <Flex align="center" justify="space-between" width="100%" gap={0}>
                    <Flex align="center" gap={1} flex="0 0 auto" justify="flex-start">
                      <Box color="#805ad5" fontSize="13px" flexShrink={0}>
                        <FaCalendar />
                      </Box>
                      <Text fontSize="12px" color="#4a5568" fontWeight="700">
                        {event.formattedDate}
                      </Text>
                    </Flex>

                    <Flex align="center" gap={1} flex="0 0 auto" justify="center" mx={1}>
                      <Box color="#3182ce" fontSize="13px" flexShrink={0}>
                        <FaClock />
                      </Box>
                      <Text fontSize="12px" color="#2c5282" fontWeight="600" noOfLines={1}>
                        {event.startTime}-{event.endTime}hrs
                      </Text>
                    </Flex>

                    <Flex align="center" gap={1} flex="0 0 auto" justify="flex-end">
                      <Box color="#38a169" fontSize="13px">
                        <FaDollarSign />
                      </Box>
                      <Text fontSize="12px" color="#276749" fontWeight="600">
                        {event.fees || 'Free'}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* Music Ratio */}
                  <Flex align="center" justify="flex-start" width="100%" gap={1}>
                    <Box color="#dd6b20" fontSize="13px">
                      <FaMusic />
                    </Box>
                    <Text fontSize="12px" color="#9c4221" fontWeight="600">
                      {event.musicRatio || 'Mixed'}
                    </Text>
                  </Flex>

                  {/* Location */}
                  <Flex align="flex-start" justify="flex-start" width="100%" gap={1}>
                    <Box color="#e53e3e" fontSize="13px" pt="1px">
                      <FaLocationDot />
                    </Box>
                    <Text
                      fontSize="12px"
                      color="#c53030"
                      fontWeight="600"
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
                  }
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
                  background: "linear-gradient(135deg, #f63c80, #6366f1, #f63c80)",
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
                  <Text
                    fontSize="20px"
                    fontWeight="800"
                    noOfLines={1}
                    lineHeight="1.2"
                    color="#2d3748"
                    width="100%"
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {event.title}
                  </Text>

                  {/* Date, Time, and Price */}
                  <Flex align="center" justify="space-between" width="100%" gap={2} wrap="wrap">
                    <Flex align="center" gap={2} flex="0 0 auto" justify="flex-start">
                      <Box color="#805ad5" fontSize="15px" flexShrink={0}>
                        <FaCalendar />
                      </Box>
                      <Text fontSize="14px" color="#4a5568" fontWeight="700">
                        {event.formattedDate}
                      </Text>
                    </Flex>

                    <Flex align="center" gap={2} flex="0 0 auto" justify="center">
                      <Box color="#3182ce" fontSize="15px" flexShrink={0}>
                        <FaClock />
                      </Box>
                      <Text fontSize="14px" color="#2c5282" fontWeight="600" noOfLines={1}>
                        {event.startTime}-{event.endTime}hrs
                      </Text>
                    </Flex>

                    <Flex align="center" gap={2} flex="0 0 auto" justify="flex-end">
                      <Box color="#38a169" fontSize="15px">
                        <FaDollarSign />
                      </Box>
                      <Text fontSize="14px" color="#276749" fontWeight="600">
                        {event.fees || 'Free'}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* Music Ratio */}
                  <Flex align="center" justify="flex-start" width="100%" gap={2}>
                    <Box color="#dd6b20" fontSize="15px">
                      <FaMusic />
                    </Box>
                    <Text fontSize="14px" color="#9c4221" fontWeight="600">
                      {event.musicRatio || 'Mixed'}
                    </Text>
                  </Flex>

                  {/* Location */}
                  <Flex align="center" justify="flex-start" width="100%" gap={2}>
                    <Box flexShrink={0} color="#e53e3e" fontSize="15px">
                      <FaLocationDot />
                    </Box>
                    <Text
                      fontSize="14px"
                      color="#c53030"
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
    </Box>
  );
}

// Fetch all events once at build time
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
        allEvents: events, // Pass all events to the component
      },
      // Revalidate frequently as event data might change
      revalidate: 60, // Revalidate every 60 seconds
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