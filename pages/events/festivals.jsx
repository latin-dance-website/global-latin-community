import React, { useState } from "react";
import Navbar from "@components/Navbar";
import MarqueeComponent from "@components/landing_page/Marquee";
import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";
import EventCard from "../../src/components/events/EventCard";
import Map from "react-map-gl/mapbox";
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import "mapbox-gl/dist/mapbox-gl.css";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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

export default function EventsPage({ dataByCity, cities }) {
  const [showPopup, setShowPopup] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
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
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const events = dataByCity[selectedCity] || [];

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

      <Box
        minH={"fit"}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        padding="1rem"
      >
        <Box
          width={"100%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Box
            display="flex"
            overflowX="auto"
            width="100%"
            alignItems="center"
            justifyContent="center"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            {[
              {
                id: 1,
                title: "Music Festival",
                details: "Enjoy live music and performances.",
                location: "Central Park, NY",
                dateTime: "June 25, 2023, 6:00 PM",
                image:
                  "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                buttonColor: "#f63c80",
              },
              {
                id: 2,
                title: "Food Festival",
                details: "Taste delicious cuisines from around the world.",
                location: "Downtown LA, CA",
                dateTime: "July 10, 2023, 12:00 PM",
                image:
                  "https://images.unsplash.com/photo-1587403310983-968055703d5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                buttonColor: "#a23cf6",
              },
              {
                id: 3,
                title: "Art Festival",
                details: "Explore amazing art and creativity.",
                location: "Art District, SF",
                dateTime: "August 15, 2023, 10:00 AM",
                image:
                  "https://images.unsplash.com/photo-1593893197313-b05f4d012f8f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                buttonColor: "#ff7c19",
              },
            ].map((event) => (
              <Box
                key={event.id}
                flex="0 0 auto"
                width={{ base: "90%", sm: "400px" }}
                height={"auto"}
                margin="10px"
                display="flex"
                flexDirection="column"
                backgroundColor="#fff"
                alignItems="center"
                justifyContent="space-between"
                border="1px solid #ccc"
                borderRadius="10px"
                overflow="hidden"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
              >
                <Box
                  flex="0 0 auto"
                  width="100%"
                  height={"200px"}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius="5px"
                  overflow="hidden"
                >
                  <Box flex="1" height={"100%"} padding={"6px"}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </Box>
                  <Box
                    flex="1"
                    padding="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {event.title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#555" }}>
                        {event.details}
                      </p>
                    </Box>
                    <HStack>
                      <FaCalendar color={event.buttonColor} />
                      <Text fontSize="1rem">
                        {event.dateTime.split(",")[0]}
                      </Text>
                    </HStack>
                    <HStack>
                      <FaClock color={event.buttonColor} />
                      <Text fontSize="1rem">
                        {event.dateTime.split(",")[1]}
                      </Text>
                    </HStack>
                    <HStack>
                      <FaLocationDot color={event.buttonColor} />
                      <Text fontSize="1rem">{event.location}</Text>
                    </HStack>
                  </Box>
                </Box>
                <Box width="100%">
                  <button
                    style={{
                      backgroundColor: event.buttonColor,
                      color: "white",
                      width: "100%",
                      borderRadius: "5px",
                      padding: "6px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => alert(`You clicked on ${event.title}`)}
                  >
                    Buy Now
                  </button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        width="70%"
        // background="linear-gradient(135deg, #fff4e6, #fff)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingY="2rem"
        marginTop="1rem"
        // border="2px solid #ff7c19"
        borderRadius="12px"
        boxShadow="0 6px 20px rgba(0, 0, 0, 0.1)"
      >
        <HStack
          width="100%"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          spacing={4}
        >
          <Heading
            as="h2"
            fontWeight="bold"
            size="xl"
            textAlign="center"
            color="#f63c80"
            marginBottom="0.5rem"
          >
            Where’s the Party?{" "}
            <span style={{ color: "#a23cf6" }}> Just Pick a City!</span>
          </Heading>

          <Text
            fontWeight="medium"
            fontSize="md"
            color="#333"
            textAlign="center"
            maxW="600px"
          >
            Discover the hottest{" "}
            <span style={{ color: "#f63c80", fontWeight: "light" }}>
              {selectedCity}
            </span>{" "}
            Latin dance events from salsa socials to bachata nights, all
            organized under one vibrant roof. Your rhythm starts here!
          </Text>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              marginTop: "16px",
              padding: "12px 20px",
              border: "2px solid #f63c80",
              borderRadius: "10px",
              backgroundColor: "#fff",
              color: "#f63c80",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <Button
            bg="#f63c7f"
            color="white"
            size="md"
            borderRadius="5px"
            px={6}
            py={4}
            fontWeight="bold"
            boxShadow="md"
            leftIcon={<CalendarIcon />}
            _hover={{ bg: "#e12a6e", transform: "scale(1.05)" }}
            _active={{ bg: "#c41f5f" }}
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Calendar
          </Button>
          <Button onClick={() => setShowPopup(true)} colorScheme="pink">
            Send Events to Email
          </Button>

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
                <Heading size="md" color="pink.500">
                  Enter Email to Send Events
                </Heading>
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

      <Box
        width="70%"
        background="linear-gradient(135deg, #a23cf6, #f63c80)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingY="2rem"
        borderRadius="12px"
        boxShadow="0 4px 16px rgba(0, 0, 0, 0.1)"
        marginTop="1.5rem"
      >
        <HStack width="100%" justifyContent="center" alignItems="center">
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            color="white"
            fontWeight="extrabold"
            letterSpacing="1px"
          >
            {selectedCity} in MAY !
          </Heading>
        </HStack>
      </Box>

      <Box bg="#f9f9f9" my={10} py={10} px={5}>
        <Box
          maxW="1200px"
          mx="auto"
          display="grid"
          gridTemplateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
            lg: "repeat(7, 1fr)",
          }}
          gap={6}
        >
          {events.map((event, index) => (
            <Box
              key={index}
              borderRadius="12px"
              p={4}
              bg="white"
              boxShadow="md"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading
                as="h3"
                size="sm"
                mb={3}
                color="#f63c80"
                fontWeight="bold"
                textAlign="center"
              >
                Day {index + 1}
              </Heading>

              <Box
                w="100%"
                py={2}
                px={3}
                borderRadius="8px"
                textAlign="center"
                fontWeight="medium"
                color="white"
                bg={
                  index % 3 === 0
                    ? "#f63c80"
                    : index % 3 === 1
                    ? "#a23cf6"
                    : "#ff7c19"
                }
              >
                {event}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
