import React, { useEffect, useRef, useState } from "react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import MarqueeComponent from "@components/landing_page/Marquee";
import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";
import EventCard from "../../src/components/events/EventCard";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import dayjs from "dayjs";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  CalendarIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { CalendarOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Image,
  Grid,
  InputGroup,
  IconButton,
  InputLeftElement,
  useColorModeValue,
  Select,
  Flex,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
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
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { FaCalendar, FaClock, FaSearch, FaWhatsapp } from "react-icons/fa";
import { DatePickerWithRange } from "../.././components/DatePicker";
import { DatePicker, Space, Modal as modal } from "antd";
import { google } from "googleapis";
import { FaLocationDot } from "react-icons/fa6";

export async function getStaticProps() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // Direct fetch without timeout
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A2:J",
    });

    const rows = response.data.values || [];

    const eventsByCity = {};
    rows.forEach((row) => {
      const city = row[0];
      if (!eventsByCity[city]) eventsByCity[city] = [];
      eventsByCity[city].push({
        id: row[1],
        city: row[0],
        title: row[2],
        date: row[4],
        startTime: row[5],
        endTime: row[6],
        fees: row[7],
        location: row[8],
        googleMapsLink: row[9],
      });
    });

    return {
      props: {
        eventsByCity,
        cities: Object.keys(eventsByCity),
      },
      revalidate: 60, // Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        eventsByCity: {},
        cities: [],
      },
      revalidate: 60, // Still try to regenerate later
    };
  }
}


const HourlyCalendar = ({ eventHour }) => {
  const scrollRef = useRef(null);
  const router = useRouter();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const padding = 32;
      const scrollAmount = container.clientWidth + padding;

      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Text fontWeight="bold" fontSize="sm" align="center" mb={2}>
        Hourly Timings
      </Text>

      {/* Horizontal carousel wrapper */}
      <Box position="relative">
        {/* Arrows */}
        <IconButton
          aria-label="Scroll left"
          icon={<ArrowBackIcon />}
          position="absolute"
          bg="#fc658b"
          _hover={{ bg: "#fc658b" }}
          _active={{ bg: "#fc658b", borderColor: "#fc658b" }}
          _focus={{ boxShadow: "none", bg: "#fc658b" }}
          borderRadius="50%"
          color="white"
          left={-3}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          border="1px solid #fc658b"
          size="sm"
          onClick={() => scroll("left")}
        />
        <IconButton
          aria-label="Scroll right"
          icon={<ArrowForwardIcon />}
          position="absolute"
          right={-3}
          borderRadius="50%"
          bg="#fc658b"
          _hover={{ bg: "#fc658b" }}
          _active={{ bg: "#fc658b", borderColor: "#fc658b" }}
          _focus={{ boxShadow: "none", bg: "#fc658b" }}
          color="white"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          border="1px solid #fc658b"
          size="sm"
          onClick={() => scroll("right")}
        />

        {/* Scrollable container */}
        <Box
          mx="2rem"
          ref={scrollRef}
          maxH="300px"
          overflowX="auto"
          whiteSpace="nowrap"
          border="1px solid #eee"
          borderRadius="md"
          boxShadow={"-25px 25px 50px -12px rgba(0, 0, 0, 0.25)"}
          bg="gray.50"
          scrollBehavior="smooth"
        >
          <Box display="flex" gap={4}>
            {/* Slide 1 */}
            <Box minW="100%">
              {Array.from({ length: 5 }, (_, idx) => (
                <Box
                  key={idx}
                  h={"55px"}
                  px={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #ddd"
                  color={
                    eventHour === idx
                      ? "white"
                      : idx % 2 === 0
                      ? "black"
                      : "white"
                  }
                  bg={
                    eventHour === idx
                      ? "#9E0232"
                      : idx % 2 === 0
                      ? "#FFE5EC"
                      : "#FB6F92"
                  }
                >
                  <Text fontSize="sm">{`${idx}:00`}</Text>
                  {eventHour === idx && (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems="center"
                    >
                      <Text fontSize="xs" color="white" fontWeight="bold">
                        Event
                      </Text>
                      <Text
                        fontSize="xs"
                        bg="#800128"
                        borderRadius="10px"
                        mt="5px"
                        p="0.5rem"
                        color="white"
                        fontWeight="bold"
                      >
                        Buy Now
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Slide 2 */}
            <Box minW="100%">
              {Array.from({ length: 5 }, (_, idx) => (
                <Box
                  key={idx + 5}
                  h={eventHour === idx + 5 ? "75px" : "50px"}
                  px={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #ddd"
                  color={
                    eventHour === idx + 5
                      ? "white"
                      : idx % 2 === 0
                      ? "black"
                      : "white"
                  }
                  bg={
                    eventHour === idx + 5
                      ? "#9E0232"
                      : idx % 2 === 0
                      ? "#FFE5EC"
                      : "#FB6F92"
                  }
                >
                  <Text fontSize="sm">{`${idx + 5}:00`}</Text>
                  {eventHour === idx + 5 && (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems="center"
                    >
                      <Text fontSize="xs" color="white" fontWeight="bold">
                        Event
                      </Text>
                      <Text
                        fontSize="xs"
                        bg="#800128"
                        borderRadius="10px"
                        mt="5px"
                        p="0.5rem"
                        color="white"
                        fontWeight="bold"
                        onClick={() => router.push("/events/social")}
                      >
                        Buy Now
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventsPage({ eventsByCity, cities }) {
  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const stripeColor = useColorModeValue("#f63c80", "#e53e3e");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [dateRange, setDateRange] = useState(null);
  const { RangePicker } = DatePicker;

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSend = async () => {
    if (!toEmail) return alert("Please enter recipient email");
    setIsSending(true);

    const eventList = events.map((event, index) => ({
      event: event.title,
    }));

    const formData = { events: eventList };
    console.log(formData);
    try {
      const res = await fetch("/api/eventmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: toEmail, formData }),
      });
      const result = await res.json();
      if (res.ok) {
        alert("✅ Email sent!");
      } else {
        alert(" Failed to send: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert(" Error sending email");
    } finally {
      setIsSending(false);
      setShowPopup(false);
      setToEmail("");
    }
  };

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBothDatesSelected, setIsBothDatesSelected] = useState(false);
  const [dates, setDates] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates); // Store the selected dates
    if (dates && dates[0] && dates[1]) {
      setIsBothDatesSelected(true);
      // Your other logic for handling date changes
    } else {
      setIsBothDatesSelected(false);
    }
  };

  useEffect(() => {
    setIsBothDatesSelected((prev) => {
      return (
        dates &&
        dates.length === 2 &&
        dates[0] &&
        dates[1] &&
        dayjs(dates[0]).isValid() &&
        dayjs(dates[1]).isValid()
      );
    });
  }, [dates]);

  const blinkColorSwap = keyframes`
    0%, 100% {
      color: #f63c80;
      background-color: white;
    }
    50% {
      color: white;
      background-color: #f63c80;
    }
  `;

  const events = eventsByCity[selectedCity] || [];
  console.log("selected city", selectedCity);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleViewDetails = () => {
    router.push(`/social?id=${selectedEvent.id}`);
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
      opacity={isToastVisible ? "0.2" : "1"}
    >
      <Navbar isToastVisible={isToastVisible} />
      <LayerBlur2 />
      {/* <MarqueeComponent /> */}

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
        mt="10px"
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
                  onChange={(e) => setSelectedCity(e.target.value)}
                  mx="0.5rem"
                  onFocus={() => {
                    if (!hasInteracted) {
                      setHasInteracted(true);
                    }
                  }}
                  placeholder="Select a city"
                  border="1px solid #f63c80"
                  borderRadius="10px"
                  bg="white"
                  color="#f63c80"
                  fontWeight="600"
                  fontSize="1rem"
                  boxShadow="sm"
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "#e12a6e", pointer: "cursor" }}
                  _focus={{
                    borderColor: "#c41f5f",
                    boxShadow: "0 0 0 3px rgba(246, 60, 128, 0.3)",
                  }}
                  sx={{
                    animation: !hasInteracted
                      ? `${blinkColorSwap} 1.5s infinite`
                      : "none",
                  }}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>

            <Flex
  align="center"
  width={{ base: "180px", md: "400px" }}
  textColor="black"
  position="relative"
>
  <Text
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
  <RangePicker
    className={`custom-range-picker ${
      isBothDatesSelected ? "range-selected" : ""
    }`}
    format="Do MMMM"
    value={dateRange}
    onChange={(dates) => {
      handleDateChange(dates);
      setDateRange(dates);
    }}
    placeholder={["Start", "End"]}
    style={{
      flex: 1,
      border: "1px solid #f279a6",
      color: "#76172c",
      height: "36px",
      padding: "0 6px",
      fontSize: "14px",
    }}
    placement="bottomLeft"
    suffixIcon={[
      <CaretDownOutlined key="start" />,
      <CaretDownOutlined key="end" />,
    ]}
    separator={
      <span style={{ 
        margin: "0 4px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#f279a6"
      }}>→</span>
    }
    size="medium"
    getPopupContainer={(trigger) => trigger.parentNode}
    onFocus={(e) => e.stopPropagation()} // Add this line
  />
</Flex>
            <Box>
              <Button
                onClick={() => setShowPopup(true)}
                bg="#f63c80"
                color="white"
                borderRadius="8px"
                fontWeight="600"
                boxShadow="md"
                _hover={{
                  bg: "#e12a6e",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{ bg: "#c41f5f" }}
                transition="all 0.2s ease"
              >
                Get Personalised Event Details
              </Button>
            </Box>
          </Flex>
        </HStack>
        {/* Popup */}
        {showPopup && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.9)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex={1000}
          >
            <Box
              bg="white"
              p={6}
              boxShadow="lg"
              w={{ base: "90%", sm: "400px" }}
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Text
                fontSize={{ base: "lg", sm: "xl" }}
                fontWeight="bold"
                color="pink.500"
                size="md"
                textAlign={"center"}
              >
                Hey, Hope you have a great time in {selectedCity}.
              </Text>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter your email..."
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                required
                style={{
                  padding: "0.5rem",
                  pr: "1rem",
                  border: "1px solid black",
                  borderRadius: "20px",
                  color: "black",
                  paddingLeft: "1rem",
                }}
              />

              {/* Phone Number Input */}
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputStyle={{
                  width: "100%",
                  borderRadius: "20px",
                  border: "1px solid black",
                  paddingLeft: "3rem",
                  color: "black",
                }}
                buttonStyle={{
                  border: "1px solid black",
                }}
                placeholder="Phone number"
              />

              {/* Instagram ID Input */}
              <input
                type="text"
                placeholder="Enter Instagram username"
                value={instagramId}
                onChange={(e) => setInstagramId(e.target.value)}
                style={{
                  padding: "0.5rem",
                  pr: "1rem",
                  border: "1px solid black",
                  borderRadius: "20px",
                  color: "black",
                  paddingLeft: "1rem",
                }}
              />
              <Text fontSize="sm" textAlign={"center"}>
                Get verified schedule sent to you so that you just dance. Leave
                everything else to us.
              </Text>

              <HStack justifyContent="flex-end" mt={2}>
                <Button variant="ghost" onClick={() => setShowPopup(false)}>
                  Cancel
                </Button>
                <Button
                  colorScheme="pink"
                  isLoading={isSending}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </HStack>
            </Box>
          </Box>
        )}
        {/* <Caraousel /> */}
      </Box>
      <Box position="relative" textAlign="center" mt={8}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          mb={-3}
          mr="2rem"
        >
          {/* <svg
            width="300"
            height="30"
            viewBox="0 0 220 30"
            xmlns="http://www.w3.org/2000/svg"
          > */}
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={i}>
              <rect
                x={i * 20 + 8}
                y="0"
                width="4"
                height="30"
                rx="2"
                fill="#555"
              />
              <circle cx={i * 20 + 10} cy="5" r="2" fill="#aaa" />
              <circle cx={i * 20 + 10} cy="25" r="2" fill="#aaa" />
            </g>
          ))}
          {/* </svg> */}
        </Box>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          mb={-5}
          mr="2rem"
        >
          {/* <svg
            width="300"
            height="20"
            viewBox="0 0 220 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > */}
          {/* {Array.from({ length: 15 }).map((_, i) => (
              <circle key={i} cx={20 * i + 10} cy={10} r={4} fill="#333" />
            ))} */}
          {/* </svg> */}
          {/* </Box> */}
          {/* <Box
          bg={useColorModeValue("#f9f9f9", "gray.800")}
          py={8}
          px={4}
          borderRadius="md"
          boxShadow="dark-lg"
          textColor="black"
        > */}
          <Box maxW="1200px" mx="auto">
            {/* Weekday Header for large screens */}
            {!isMobile && (
              <Grid templateColumns="repeat(7, 2fr)" mb={4} gap={2} px={1}>
                {/* {weekdays.map((day) => (
                  <Flex
                    key={day}
                    justify="center"
                    align="center"
                    py={2}
                    bg={useColorModeValue("white", "gray.700")}
                    borderTop="4px solid"
                    borderColor={stripeColor}
                    borderRadius="6px"
                    boxShadow="sm"
                  >
                    <Text fontSize="sm" fontWeight="bold" color={stripeColor}>
                      {day}
                    </Text>
                  </Flex>
                ))} */}
              </Grid>
            )}

            {/* Responsive Event Grid */}
            <Grid
              templateColumns={{
                base: "repeat(2, 2fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(7, 1fr)",
              }}
              gap={4}
            >
              {events.map((event, idx) => (
                <React.Fragment key={event.id}>
                  {/* Clickable Card */}
                  {/* <Box
                    as="button"
                    onClick={() => handleEventClick(event)}
                    bg="white"
                    borderRadius="12px"
                    boxShadow="md"
                    position="relative"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "lg",
                    }}
                    transition="all 0.2s"
                    overflow="hidden"
                    p={{ base: 4, sm: 5 }}
                    pt={6}
                    w="full"
                    textAlign="center"
                  > */}
                  {/* Top Stripe */}
                  {/* <Box
                      position="absolute"
                      top={0}
                      left="0"
                      w="100%"
                      h="6px"
                      bg={stripeColor}
                    /> */}

                  {/* <Heading
                      as="h4"
                      size="sm"
                      color={stripeColor}
                      fontWeight="bold"
                      mb={2}
                    >
                      Day {event.day}
                    </Heading> */}

                  {/* <Box
                      bg={
                        idx % 3 === 0
                          ? "#f63c80"
                          : idx % 3 === 1
                          ? "#a23cf6"
                          : "#ff7c19"
                      }
                      color="white"
                      borderRadius="8px"
                      px={3}
                    > */}
                  {/* <Text fontSize="sm">{event.title}</Text> */}
                  {/* </Box> */}
                  {/* </Box> */}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Event Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="16px" mx="0.5rem">
          <Text
            align="center"
            bg="#A020F0"
            color="white"
            borderTopRadius={"10px"}
            fontSize="20px"
            p="10px 10px 10px 30px"
          >
            Day {selectedEvent?.day} Schedule
          </Text>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Stack spacing={6}>
              {isMobile && <HourlyCalendar eventHour={5} />}

              <Box
                bg="#E9CFE8"
                p={4}
                py={4}
                borderRadius={"15px"}
                mb="10px"
                border="0.5px solid #b5b3b3"
                boxShadow="-25px 25px 50px -12px rgba(0, 0, 0, 0.25)"
              >
                <Box>
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Heading size="sm" mb={1}>
                      {selectedEvent?.title}
                    </Heading>
                    <Button
                      bg="#7806bf"
                      onClick={() => {
                        sessionStorage.setItem(
                          "currentEvent",
                          JSON.stringify(selectedEvent)
                        );
                        router.push("/events/social");
                      }}
                      float={"right"}
                      color="white"
                      _hover={{
                        bg: "#3b025e",
                        boxShadow: "lg",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                  <Text fontSize="sm" color="gray.600" mt="8px">
                    {selectedEvent?.description}
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mt={3}>
                  <CalendarIcon />
                  <Text fontSize="sm" fontWeight="medium">
                    {selectedEvent?.date} &nbsp;|&nbsp;{" "}
                    {selectedEvent?.startTime} – {selectedEvent?.endTime}
                  </Text>
                </Box>

                <Box display="flex" gap={2}>
                  <Text fontWeight="semibold">Fees:</Text>
                  <Text>{selectedEvent?.fees}</Text>
                </Box>

                <Box display="flex" gap={2}>
                  <Text fontWeight="semibold">Location:</Text>
                  <Text>{selectedEvent?.location}</Text>
                </Box>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
