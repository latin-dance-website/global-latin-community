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
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
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


  // Auto-scroll functionality
  useEffect(() => {
    if (!filteredEvents.length || !isAutoScrolling) return;

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
      const response = await fetch('/api/send-events-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: filteredEvents, // Send the actual filtered events
          city: city,
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
    >
      <Box w="100%" maxW="1200px" px={0} py={0} m={-1}>
        <Navbar />
      </Box>

      <Box mt={{ base: "-2px", md: "-3px" }} mb={4} textAlign="center">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="extrabold"
          color="#000100"
        >
          Social Nights in {city}
        </Heading>
        {startDate && endDate && (
          <Text fontSize="lg" color="gray.600" mt={2}>
            From {dayjs(startDate).format("MMM D")} to {dayjs(endDate).format("MMM D, YYYY")}
          </Text>
        )}
      </Box>

      {/* Events Display */}
      <Box width="100%" mt={0} mb={12} px={{ base: 4, md: 6 }}>
        {/* Mobile: Vertical grid */}
        <Box display={{ base: "block", md: "none" }}>
          <Box
            display="grid"
            gridTemplateColumns="1fr"
            gap={6}
            pb={4}
          >
            {filteredEvents.map((event, index) => (
              <Box
                key={`${event.id}-${index}`}
                width="100%"
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
                            {event.citybycountry}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Desktop: Vertical grid */}
        <Box display={{ base: "none", md: "block" }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
            gap={5}
            pb={4}
          >
            {filteredEvents.map((event, index) => (
              <Box
                key={`${event.id}-${index}`}
                width="100%"
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
                            {event.citybycountry}
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
        {filteredEvents.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg">
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
              Hey, Hope you have a great time in {city}.
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