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
import Caraousel from "../.././components/carousel";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  InputLeftElement,
  InputGroup,
  Input,
  Select,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FaCalendar, FaClock,FaSearch } from "react-icons/fa";
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

      <Caraousel/>

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
            Discover the verified <br />
            Global Latin Dance Events <br />
            Salsa, Bachata, Kizomba & Zouk Nights <br />
          </Text>

         {/* <select
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
          </select>*/}
        <InputGroup maxW="200px">
  <InputLeftElement pointerEvents="none">
    <FaSearch color="#f63c80" />
  </InputLeftElement>
  <Select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    placeholder="" /* Placeholder removed */
    border="2px solid #f63c80"
    borderRadius="10px"
    bg="white"
    color="#f63c80"
    fontWeight="600"
    fontSize="1rem"
    height="40px"
    boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
    textAlign="center" /* Ensures proper alignment */
    transition="all 0.2s ease-in-out"
    _hover={{ borderColor: "#e12a6e" }}
    _focus={{
      borderColor: "#c41f5f",
      boxShadow: "0 0 0 3px rgba(246, 60, 128, 0.3)",
    }}
  >
    <option value="Bangalore">Bangalore, India</option>
    <option value="Hanoi">Hanoi, Vietnam</option>
  </Select>
</InputGroup>

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
            Set Travel Dates
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
