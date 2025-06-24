import React, { useEffect, useRef, useState } from "react";
import NavbarCompact from "@components/NavbarCompact";
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
  VStack,
  SimpleGrid,
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

      {/* Reduced margin top to bring title closer to navbar */}
      <Box mt={{ base: 1, md: 1 }} mb={-4} textAlign="center">
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

      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="12px"
        bg="white"
        boxShadow={"xl"}
        border="1px solid #9c3cf6"
        py="10px"
        px="1rem"
        mt={{ base: "-5", md: "4" }} // Move box down for desktop
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
            color="#000001"
            mt="-2"
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
            {/* City Selector */}
            <Box
              width={{ base: "80%", md: "200px" }}
              display="flex"
              height="40px"
              justifyContent="center"
              alignItems="center"
            >
              <InputGroup width="100%" mt={{ base: "-8", md: "0" }}>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setShowEvents(false);
                  }}
                  mx="0.5rem"
                  placeholder="Select a city"
                  border="1px solid #9c3cf6"
                  borderRadius="10px"
                  bg="white"
                  color="#9c3cf6"
                  fontWeight="600"
                  fontSize="1rem"
                  height="40px"
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

            {/* Date Range Picker */}
            <Flex
              align="center"
              width={{ base: "240px", md: "320px" }}
              textColor="black"
              position="relative"
              height="40px"
            >
              <Text
                fontWeight="semibold"
                color="white"
                whiteSpace="nowrap"
                bg="#9c3cf6"
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
                borderTopRightRadius="5px"
                borderBottomRightRadius="5px"
                zIndex={1}
                _hover={{ cursor: "pointer" }}
                fontSize="xs"
                flex="1"
                textAlign="center"
                height="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginRight="4px"
                minW="100px"
                mt={{ base: "-7", md: "0" }}
              >
                Set Travel Dates
              </Text>
              <RangePicker
                format="DD MMMM"
                value={dateRange}
                onChange={(dates) => {
                  setDateRange(dates);
                  setShowEvents(false);
                }}
                _hover={{ cursor: "pointer" }}
                placeholder={["Start", "End"]}
                style={{
                  width: "150px",
                  border: "1px solid #9c3cf6",
                  color: "#5a1a73",
                  fontSize: "12px",
                  height: "32px",
                  marginTop: isMobile ? "-28px" : "0px",
                }}
                placement={isMobile ? "bottomRight" : "bottomLeft"}
                inputReadOnly={isMobile}
                suffixIcon={[
                  <CaretDownOutlined
                    key="start"
                    style={{ fontSize: "10px" }}
                  />,
                  <CaretDownOutlined key="end" style={{ fontSize: "10px" }} />,
                ]}
                separator={
                  <span
                    style={{
                      margin: "0 1px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#9c3cf6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "16px",
                    }}
                  >
                    →
                  </span>
                }
                size="small"
              />
            </Flex>

            {/* Get Events Button */}
            <Box mt={{ base: "-14px", md: "0" }} height="40px" display="flex" alignItems="center">
              <Button
                onClick={handleShowEvents}
                bg="#9c3cf6"
                color="white"
                borderRadius="8px"
                fontWeight="600"
                boxShadow="md"
                height="40px"
                isDisabled={!selectedCity}
                _hover={{
                  bg: "#8a2be2",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{ bg: "#7b1fa2" }}
                transition="all 0.2s ease"
              >
                Get Personalised Event Details
              </Button>
            </Box>
          </Flex>
        </HStack>
      </Box>

      {showEvents && selectedCity && (
        <Box width="100%" mt={8} mb={12} px={{ base: 4, md: 6 }}>
          {/* Mobile: Single column scrollable */}
          <Box display={{ base: "block", md: "none" }}>
            <VStack spacing={6} align="stretch">
              {getFilteredEvents().map((event, index) => (
                <Box
                  key={`${event.id}-${index}`}
                  width="100%"
                  maxWidth="300px"
                  mx="auto"
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
                    {/* Event Image */}
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

                    {/* Event Details */}
                    <Box
                      p="6px"
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                    >
                      {/* Title */}
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

                      {/* Date */}
                      <Flex
                        align="center"
                        justify="space-between"
                        width="100%"
                        mb="3px"
                      >
                        <Flex align="center" gap={2}>
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
                        </Flex>
                      </Flex>

                      {/* Time */}
                      <Flex
                        align="center"
                        justify="space-between"
                        width="100%"
                        mb="3px"
                      >
                        <Flex align="center" gap={2}>
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
                      </Flex>

                      {/* Location */}
                      <Flex
                        align="flex-start"
                        justify="flex-start"
                        width="100%"
                      >
                        <Flex align="flex-start" gap={2} width="100%">
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="11px"
                            mt="1px"
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
            </VStack>
          </Box>

          {/* Desktop: Grid layout */}
          <Box display={{ base: "none", md: "block" }}>
            <SimpleGrid
              columns={{
                md:
                  getFilteredEvents().length >= 4
                    ? 4
                    : getFilteredEvents().length,
              }}
              spacing={5}
              justifyItems="center"
              maxWidth="1400px"
              mx="auto"
            >
              {getFilteredEvents().map((event, index) => (
                <Box
                  key={`${event.id}-${index}`}
                  width="100%"
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
                    {/* Event Image */}
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

                    {/* Event Details */}
                    <Box
                      p="8px"
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                    >
                      {/* Title */}
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

                      {/* Date */}
                      <Flex
                        align="center"
                        justify="space-between"
                        width="100%"
                        mb="4px"
                      >
                        <Flex align="center" gap={2}>
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
                        </Flex>
                      </Flex>

                      {/* Time */}
                      <Flex
                        align="center"
                        justify="space-between"
                        width="100%"
                        mb="4px"
                      >
                        <Flex align="center" gap={2}>
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
                      </Flex>

                      {/* Location */}
                      <Flex
                        align="flex-start"
                        justify="flex-start"
                        width="100%"
                      >
                        <Flex align="flex-start" gap={2} width="100%">
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="13px"
                            mt="1px"
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
            </SimpleGrid>
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