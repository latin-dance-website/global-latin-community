// import React, {useState} from "react";
// import { Box } from "@chakra-ui/react";
// import Navbar from "@components/Navbar";
// import MarqueeComponent from "@components/landing_page/Marquee";
// import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
// import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";
// import EventCard from "../../src/components/events/EventCard";

// export default function EventsPage() {
//   const [isToastVisible, setIsToastVisible ] = useState(false);
//   return (
//     <Box
//       minH="100vh"
//       maxWidth="100vw"
//       position="relative"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       flexDirection="column"
//       overflowX="clip"
//       opacity={isToastVisible ? "0.2": "1"}
//     >
//       <Navbar isToastVisible={isToastVisible}/>
//       <LayerBlur2 />
//       {/* <EventCard /> */}
//       <HeroComingSoon isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}/>
//       <MarqueeComponent />
//     </Box>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@components/Navbar";

import { useRouter } from "next/router";
import MarqueeComponent from "@components/landing_page/Marquee";
import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";
import EventCard from "../../src/components/events/EventCard";
import Map from "react-map-gl/mapbox";
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import "mapbox-gl/dist/mapbox-gl.css";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Image,
  Grid,
  InputGroup,
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
import { FaCalendar, FaClock, FaSearch, FaWhatsapp } from "react-icons/fa";

import { DatePickerWithRange } from "../.././components/DatePicker";

import { DatePicker, Space, Modal as modal } from "antd";

import { google } from "googleapis";

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const range = "Sheet1!A1:C"; // Adjust range as needed
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length < 2) {
    return { props: { data: [] } };
  }

  const headers = rows[0].slice(1); // skip A1 (row label "City")
  const dataByCity = {};

  headers.forEach((city, colIndex) => {
    dataByCity[city] = rows
      .slice(1)
      .map((row) => row[colIndex + 1])
      .filter(Boolean);
  });

  return {
    props: {
      dataByCity,
      cities: headers,
    },
  };
}

const HourlyCalendar = ({ eventHour }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  useEffect(() => {
    const el = document.getElementById(`hour-${eventHour}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [eventHour]);

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Text fontWeight="bold" fontSize="sm" mb={2}>
        Hourly View
      </Text>
      <Box
        maxH="300px"
        overflowY="auto"
        border="1px solid #eee"
        borderRadius="md"
        p={2}
        bg="gray.50"
      >
        {Array.from({ length: 24 }, (_, idx) => (
          <Box
            key={idx}
            id={`hour-${idx}`}
            h="50px"
            px={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #ddd"
            bg={eventHour === idx ? "orange.100" : "white"}
          >
            <Text fontSize="sm">{`${idx}:00`}</Text>
            {eventHour === idx && (
              <Text fontSize="xs" color="orange.600" fontWeight="bold">
                Event
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventsPage({ dataByCity, cities }) {
  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const stripeColor = useColorModeValue("#f63c80", "#e53e3e");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const inputWidth = useBreakpointValue({ base: "100%", md: "200px" });
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const initialFocusRef = useRef();
  const { RangePicker } = DatePicker;
  const triggerRef = useRef();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const rangePickerRef = useRef(null);

  const handleOpenCalendar = () => {
    const input = rangePickerRef.current?.input;
    if (input) {
      input.click(); // this will open the calendar popup
    }
  };

  // const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // useEffect(() => {
  //   const el = document.getElementById(`hour-${eventHour}`);
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [eventHour]);

  const handleClose = () => setIsOpenModal(false);

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSend = async () => {
    if (!toEmail) return alert("Please enter recipient email");
    setIsSending(true);

    // Prepare the events data in the expected format
    const eventList = events.map((event, index) => ({
      event: event.title,
    }));

    const formData = { events: eventList }; // Structure formData as expected by the backend
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

  const events = dataByCity[selectedCity] || [];
  console.log("selected city", selectedCity);

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
        width="95%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="12px"
        boxShadow="0 6px 20px rgba(0, 0, 0, 0.6)"
        py="24px"
        mt="10px"
      >
        <HStack
          width="100%"
          justifyContent="center"
          flexDirection="column"
          spacing={4}
        >
          <Heading
            as="h2"
            fontWeight="bold"
            size="xl"
            textAlign="center"
            color="#f63c80"
          >
            <p className="m-6">Where’s The Party?</p>
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
          >
            Discover the verified <br />
            Global Latin Dance Events <br />
            Salsa, Bachata, Kizomba & Zouk Nights <br />
            {/* <span className="m-2">All organized under one vibrant roof.</span> */}
          </Text>

          <Flex
            mt="16px"
            mr={{ base: "0", md: "10px" }}
            justify="center"
            align="center"
            gap="12px"
            wrap="wrap"
            direction={{ base: "column", md: "row" }} // stack vertically on mobile
          >
            <Box width="100%">
              <InputGroup width={{ base: "95%", md: "200px" }}>
                <InputLeftElement pointerEvents="none">
                  {/* <span>
                  <FaSearch color="#f63c80" />
                </span> */}
                </InputLeftElement>

                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="Select a city"
                  border="1px solid #f63c80"
                  borderRadius="10px"
                  bg="white"
                  color="#f63c80"
                  fontWeight="600"
                  fontSize="1rem"
                  boxShadow="sm"
                  mr={3}
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "#e12a6e" }}
                  _focus={{
                    borderColor: "#c41f5f",
                    boxShadow: "0 0 0 3px rgba(246, 60, 128, 0.3)",
                  }}
                >
                  <option value="Vietnam">Bangalore, India</option>
                  <option value="Bangalore">Hanoi, Vietnam</option>
                </Select>

                {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select Date Range</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <RangePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder={["Start date", "End date"]}
                    onChange={(dates) => {
                      console.log("Selected dates:", dates);
                      onClose();
                    }}
                    autoFocus
                    open // ensures calendar shows on open
                  />
                </ModalBody>
              </ModalContent>
            // </Modal> */}

                {/* <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button
                  border="1px solid #f63c80"
                  borderRadius="10px"
                  bg="white"
                  color="#f63c80"
                >
                  Set Travel Dates
                </Button>
              </PopoverTrigger>
              <PopoverContent width="auto" p={2}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <RangePicker
                    ref={initialFocusRef}
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder={["Start date", "End date"]}
                    onChange={(dates) => {
                      console.log("Selected dates:", dates);
                      // Here you can set your date range state
                      if (dates) {
                        setRange([
                          {
                            startDate: dates[0].toDate(),
                            endDate: dates[1].toDate(),
                            key: "selection",
                          },
                        ]);
                      }
                      onClose();
                    }}
                    autoFocus
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            {isDateOpen && (
              <Box>
                <RangePicker
                  ref={rangePickerRef}
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  placeholder={["Start date", "End date"]}
                  />
              </Box>
            )} */}
              </InputGroup>
              {/* <Button
                border="1px solid #f63c80"
                borderRadius="10px"
                bg="white"
                color="#f63c80"
                width={60}
                onClick={() => setIsOpenModal(!isDateOpen)}
              >
                Set Travel Dates
              </Button> */}
            </Box>

            <Box width="90%">
              <RangePicker
                block
                format="yyyy-MM-dd"
                placeholder="Start date → End date"
                style={{ width: "100%" }}
                placement="bottomLeft" // or "bottomRight" or try custom placement
                direction="vertical" // if supported (antd v5+)
              />
            </Box>
            <Box>
              <Button
                onClick={() => setShowPopup(true)}
                bg="#f63c80"
                color="white"
                px={6}
                py={2}
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

          {/* Popup */}
          {showPopup && (
            <Box
              position="fixed"
              top="0"
              left="0"
              width="100vw"
              height="100vh"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex={1000}
            >
              <Box
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                minW={{ base: "80%", md: "400px" }}
                display="flex"
                flexDirection="column"
                gap={4}
              >
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="pink.500"
                  size="md"
                >
                  Hey, Hope you have a great time in xxx (city name).
                </Text>

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Enter recipient email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    color: "black",
                  }}
                />

                {/* WhatsApp Input */}
                <input
                  type="tel"
                  placeholder="WhatsApp number (with country code)"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    color: "black",
                  }}
                />

                {/* Instagram ID Input */}
                <input
                  type="text"
                  placeholder="Instagram handle (without @)"
                  value={instagramId}
                  onChange={(e) => setInstagramId(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    color: "black",
                  }}
                />
                <Text fontSize="sm">
                  Get authenticated data sent to you so that you just dance
                  leave everything else to us
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
        </HStack>
      </Box>

      <Box bg={useColorModeValue("#f9f9f9", "gray.800")} my={8} py={8} px={4}>
        <Box maxW="1200px" mx="auto">
          {/* Weekday Header for large screens */}
          {!isMobile && (
            <Grid templateColumns="repeat(7, 2fr)" mb={4} gap={2} px={1}>
              {weekdays.map((day) => (
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
              ))}
            </Grid>
          )}

          {/* Responsive Event Grid */}
          <Grid
            templateColumns={{
              base: "repeat(2, 2fr)", // single column on mobile
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(7, 1fr)",
            }}
            gap={4}
          >
            {events.map((event, idx) => (
              <>
                {/* Clickable Card */}
                <Box
                  as="button"
                  onClick={onOpen}
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
                >
                  {/* Top Stripe */}
                  <Box
                    position="absolute"
                    top={0}
                    left="0"
                    w="100%"
                    h="6px"
                    bg={stripeColor}
                  />

                  <Heading
                    as="h4"
                    size="sm"
                    color={stripeColor}
                    fontWeight="bold"
                    mb={2}
                  >
                    Day {idx + 1}
                  </Heading>

                  <Box
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
                  >
                    <Text fontSize="sm">{event}</Text>
                  </Box>
                </Box>

                {/* Modal on Click */}
                <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
                  <ModalOverlay />
                  <ModalContent borderRadius="16px" p={2}>
                    <ModalHeader>Day 1 Schedule</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Stack spacing={16}>
                        {isMobile && (
                          <HourlyCalendar eventHour={5} /> // 6 PM = hour 18
                        )}
                        <Box>
                          {/* <Box display={{ base: "block", md: "none" }}>
                            <Text fontWeight="bold" fontSize="sm" mb={2}>
                              Hourly View
                            </Text>
                            <Box
                              maxH="300px"
                              overflowY="auto"
                              border="1px solid #eee"
                              borderRadius="md"
                              p={2}
                              bg="gray.50"
                            >
                              {Array.from({ length: 24 }, (_, idx) => (
                                <Box
                                  key={idx}
                                  id={`hour-${idx}`}
                                  h="60px"
                                  px={4}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  borderBottom="1px solid #ddd"
                                  bg="orange.100"
                                >
                                  <Text fontSize="sm">{`${idx}:00`}</Text>
                                  {
                                    <Text
                                      fontSize="xs"
                                      color="orange.600"
                                      fontWeight="bold"
                                    >
                                      Event
                                    </Text>
                                  }
                                </Box>
                              ))}
                            </Box>
                          </Box> */}

                          <Image
                            src="/assets/images/hero.jpg"
                            alt="Salsa dance"
                            borderRadius="md"
                            w="full"
                            h="250px"
                            objectFit="fill"
                          />

                          <Box mt={4}>
                            <Heading size="sm" mb={1}>
                              Salsa dance class
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                              About the dance class, who is taking it, what will
                              it teach or some two-line description.
                            </Text>
                          </Box>

                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            mt={3}
                          >
                            <CalendarIcon />
                            <Text fontSize="sm" fontWeight="medium">
                              21 January 2025 &nbsp;|&nbsp; 6:30 PM – 8:00 PM
                            </Text>
                          </Box>

                          <Box display="flex" gap={2}>
                            <Text fontWeight="semibold">Fees:</Text>
                            <Text>Free</Text>
                          </Box>

                          <Box display="flex" gap={2}>
                            <Text fontWeight="semibold">Location:</Text>
                            <Text>Cubbon Park</Text>
                          </Box>
                        </Box>
                      </Stack>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="orange"
                        mr={3}
                        onClick={() => router.push("/events/social")}
                      >
                        Book Now
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
