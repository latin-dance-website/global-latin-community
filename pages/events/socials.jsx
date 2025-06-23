import React, { useEffect, useRef, useState } from "react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { CaretDownOutlined } from "@ant-design/icons";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Grid,
  InputGroup,
  IconButton,
  Select,
  Flex,
  useBreakpointValue,
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
  0% { box-shadow: 0 0 0px rgb(246, 60, 128); }
  50% { box-shadow: 0 0 10px rgb(246, 60, 128); }
  100% { box-shadow: 0 0 0px rgb(246, 60, 128); }
`;
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [showEvents, setShowEvents] = useState(false);
  const { RangePicker } = DatePicker;
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      maxWidth="100vw"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      overflowX="clip"
    >
      <Navbar />
      <Box mt={{ base: 2, md: 3 }} mb={2} textAlign="center">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="extrabold"
          color="#f63c80"
        >
          Social Nights Today
        </Heading>
      </Box>

      <LayerBlur2 />
      <Caraousel />

      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="12px"
        bg="white"
        boxShadow={"xl"}
        border="1px solid pink"
        py="10px"
        px="1rem"
        mt="4"
        mb="8"
      >
        <HStack
          width="100%"
          justifyContent="center"
          flexDirection="column"
          spacing={1}
          mb="1rem"
        >
          <Heading
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="#f63c80"
          >
            Where's The Party?
          </Heading>

          <Heading as="h3" size="md" color="#a23cf6">
            Just Pick a City!
          </Heading>

          <Text
            fontWeight="medium"
            fontSize="md"
            color="#333"
            textAlign="center"
            maxW="600px"
            px="1rem"
          >
            Discover the verified <br />
            Global Latin Dance Events <br />
            Salsa, Bachata, Kizomba & Zouk Nights <br />
          </Text>

          <Flex
            mt="16px"
            mr={{ base: "0", md: "0" }}
            justify="center"
            align="center"
            gap="12px"
            width="100%"
            wrap="wrap"
            px={{ base: "0rem", md: "1rem" }}
            direction={{ base: "column", md: "row" }}
          >
            <Box
              width="80%"
              display="flex"
              height="40px"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FaLocationDot color="#f63c80" size="25" paddingBottom="20px" />
              <InputGroup width={{ base: "90%", md: "200px" }} mt="-1">
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setShowEvents(false);
                  }}
                  mx="0.5rem"
                  placeholder="Select a city"
                  border="1px solid #f63c80"
                  borderRadius="10px"
                  bg="white"
                  color="#f63c80"
                  fontWeight="600"
                  fontSize="1rem"
                  animation={
                    selectedCity ? "none" : `${blink} 1.5s ease-in-out infinite`
                  }
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city.trim()}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>

            <Flex
              align="center"
              width={{ base: "240px", md: "400px" }}
              textColor="black"
              position="relative"
              direction={{ base: "column", md: "row" }}
              gap={{ base: 2, md: 0 }}
            >
              {/* Mobile-only "Set Travel Dates" text */}
              <Text
                display={{ base: "block", md: "none" }}
                fontWeight="semibold"
                color="#f279a6"
                fontSize="sm"
                alignSelf="center"
              >
                Set Travel Dates
              </Text>
              {/* Desktop "Set Travel Dates" text (original implementation) */}
              <Text
                display={{ base: "none", md: "block" }}
                fontWeight="semibold"
                p="4.5px"
                pb="3.5px"
                color="white"
                whiteSpace="nowrap"
                bg="#f279a6"
                borderTopLeftRadius="5px"
                pl="8px"
                borderBottomLeftRadius="5px"
                zIndex={1}
                _hover={{ cursor: "pointer" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Set Travel Dates
              </Text>
              <Box width="100%">
                {" "}
                {/* Full width container for the RangePicker */}
                <RangePicker
                  format="Do MMMM"
                  value={dateRange}
                  onChange={(dates) => {
                    setDateRange(dates);
                    setShowEvents(false);
                  }}
                  placeholder={["Start", "End"]}
                  style={{
                    width: "100%", // Full width
                    border: "1px solid #f279a6",
                    color: "#76172c",
                    height: "36px",
                    padding: "0 6px",
                    fontSize: "14px",
                  }}
                  placement={isMobile ? "bottomRight" : "bottomLeft"}
                  suffixIcon={[
                    <CaretDownOutlined key="start" />,
                    <CaretDownOutlined key="end" />,
                  ]}
                  separator={
                    <span
                      style={{
                        margin: "0 4px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#f279a6",
                      }}
                    >
                      →
                    </span>
                  }
                  size="medium"
                  dropdownClassName={isMobile ? "mobile-date-picker" : ""}
                  popupStyle={isMobile ? { width: "90vw" } : {}}
                />
              </Box>
            </Flex>
            <Box>
              <Button
                onClick={handleShowEvents}
                bg="#f63c80"
                color="white"
                borderRadius="8px"
                fontWeight="600"
                boxShadow="md"
                isDisabled={!selectedCity}
                _hover={{
                  bg: "#e12a6e",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{ bg: "#c41f5f" }}
                transition="all 0.2s ease"
              >
                Find Events
              </Button>
            </Box>
          </Flex>
        </HStack>
      </Box>

      {showEvents && selectedCity && (
        <Box width="90%" mt={8} mb={12}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {getFilteredEvents().map((event, index) => (
              <Box
                key={`${event.id}-${index}`}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <Box height="250px" overflow="hidden">
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
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    {event.title}
                  </Text>
                  <HStack mt={2} spacing={3}>
                    <FaCalendar color="#f63c80" />
                    <Text>{event.formattedDate}</Text>
                  </HStack>
                  <HStack mt={2} spacing={3}>
                    <FaClock color="#f63c80" />
                    <Text>
                      {event.startTime} - {event.endTime}
                    </Text>
                  </HStack>
                  <HStack mt={2} spacing={3}>
                    <FaLocationDot color="#f63c80" />
                    <Text>{event.location}</Text>
                  </HStack>
                  {event.description && (
                    <Text mt={3} noOfLines={3} color="gray.600">
                      {event.description}
                    </Text>
                  )}
                </Box>
                <Box>
                  <Button
                    onClick={() => handleExploreNow(event)}
                    bg="#f63c80"
                    color="white"
                    width="100%"
                    borderRadius="0"
                    borderBottomRadius="lg"
                    py={3}
                    fontWeight="600"
                    _hover={{
                      bg: "#e12a6e",
                    }}
                    _active={{ bg: "#c41f5f" }}
                  >
                    Explore Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>

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
