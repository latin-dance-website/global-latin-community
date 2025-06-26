import React, { useState, useEffect, useRef } from "react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Caraousel from "../.././components/carousel";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Image,
  Grid,
  Input,
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
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default function EventsHomePage({ cities }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [dateRange, setDateRange] = useState(null); // [dayjs, dayjs]
  // const [showDateSelectionPopup, setShowDateSelectionPopup] = useState(false); // Commented out - date selection popup
  const [datePickerOpen, setDatePickerOpen] = useState(false); // New state for controlling date picker
  const datePickerRef = useRef(null); // Ref to access the date picker
  const { RangePicker } = DatePicker;

  // Keyframes for animations
  const blink = keyframes`
    0% { box-shadow: 0 0 0px rgb(156, 60, 246); }
    50% { box-shadow: 0 0 10px rgb(156, 60, 246); }
    100% { box-shadow: 0 0 0px rgb(156, 60, 246); }
  `;
  const flashBackgroundDark = keyframes`
    0%, 100% {
      background-color: white;
      color: black;
    }
    50% {
      background-color: #9c3cf6;
      color: white;
    }
  `;

  // Handle city selection - simplified without popup
  const handleCityChange = (selectedValue) => {
    setSelectedCity(selectedValue);
    if (selectedValue) {
      // Directly open the date picker without showing popup
      setTimeout(() => {
        setDatePickerOpen(true);
        // Focus on the date picker to trigger the calendar
        if (datePickerRef.current) {
          datePickerRef.current.focus();
        }
      }, 500); // Reduced delay since no popup
    }
  };

  // Handle date picker open/close
  const handleDatePickerOpenChange = (open) => {
    setDatePickerOpen(open);
  };

  const handleGetEvents = () => {
    if (!selectedCity) {
      alert("Please select a city first!");
      return;
    }

    const queryParams = {
      city: selectedCity,
    };

    if (dateRange && dateRange[0] && dateRange[1]) {
      queryParams.startDate = dateRange[0].format("YYYY-MM-DD");
      queryParams.endDate = dateRange[1].format("YYYY-MM-DD");
      router.push({
        pathname: "/events/display", // Navigate to the new display page
        query: queryParams,
      });
      // setShowPopup(true); // Commented out - popup moved to display page
    } else {
      if (
        window.confirm(
          "No travel dates selected. Would you like to see all upcoming events for " +
            selectedCity +
            "?"
        )
      ) {
        router.push({
          pathname: "/events/display", // Navigate to the new display page
          query: queryParams,
        });
        // setShowPopup(true); // Commented out - popup moved to display page
      }
    }
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
    <Box w="100%" maxW="1200px" px={0} py={0} m={-1}>
      <Navbar />
    </Box>

    <Box mt={{ base: 1, md: 4 }} mb={-3} textAlign="center">
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

    {/* Main Control Box - Increased width */}
    <Box
      width="fit-content"
      maxWidth={{ base: "95%", md: "650px" }} // 🔥 Increased from 550px to 650px
      minWidth="320px" // Slightly increased minimum width too
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="16px"
      bg="white"
      boxShadow="xl"
      border="2px solid #9c3cf6"
      py={{ base: 6, md: 8 }}
      px={{ base: 6, md: 8 }} // 🔥 Increased padding to accommodate wider content
      mt={{ base: "-8px", md: "20px" }}
      position="relative"
      mx="auto"
      _hover={{
        "&::before": {
          opacity: 1,
        },
        borderColor: "#8a2be2",
      }}
      _focusWithin={{
        "&::before": {
          opacity: 1,
          boxShadow: "0 0 10px 2px rgba(156, 60, 246, 0.6)",
        },
      }}
      sx={{
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          borderRadius: "18px",
          border: "2px solid transparent",
          background:
            "linear-gradient(90deg, #9c3cf6, #ff6b35, #9c3cf6) border-box",
          backgroundSize: "200% 100%",
          animation: "borderGradient 3s linear infinite",
          opacity: 0,
          transition: "opacity 0.3s ease, box-shadow 0.3s ease",
          zIndex: -1,
        },
        "@keyframes borderGradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      }}
    >
      {/* Inner content remains the same */}
      <VStack
        spacing={0.5}
        mb={4}
        textAlign="center"
        position="relative"
        zIndex={1}
      >
        <Box mt={-4}>
          <Heading
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="#000001"
            lineHeight="1.1"
            mb={1}
          >
            Find Latin Events in your City
          </Heading>
        </Box>

        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          color="#a23cf6"
          fontWeight="bold"
          mb={1}
          lineHeight="1.1"
        >
          Just Pick a City{" "}
          <Box
            as="span"
            display="inline-block"
            sx={{
              animation: "bounce 1s infinite ease-in-out",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-4px)" },
              },
            }}
          >
            ↓
          </Box>
        </Heading>

        <Box textAlign="center" maxW="100%">
          <VStack spacing={1}>
            <Text
              fontWeight="medium"
              fontSize={{ base: "xs", md: "sm" }}
              color="#555"
              whiteSpace="nowrap"
              mt={-0.5}
            >
              Discover verified Global Latin Dance Events
            </Text>

            <Text
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
              color="#333"
              lineHeight="1.2"
              mt={-1}
              mb={1}
            >
              <Text as="span">Salsa</Text>
              {", "}
              <Text as="span">Bachata</Text>
              {", "}
              <Text as="span">Kizomba</Text>
              {" & "}
              <Text as="span">Zouk</Text>
              {" Nights"}
            </Text>
          </VStack>
        </Box>
      </VStack>

      {/* Controls Container */}
      <VStack spacing={3} width="100%" align="center" mt={-2}>
        {/* City Selector */}
        <Box
          width={{ base: "89%", md: "100%" }}
          maxWidth={{ base: "300px", md: "420px" }} // 🔥 Increased width to match container
          borderRadius={{ base: "10px", md: "12px" }}
          animation={
            !selectedCity
              ? `${flashBackgroundDark} 1.3s ease-in-out infinite`
              : "none"
          }
        >
          <Select
            value={selectedCity}
            onChange={(e) => {
              handleCityChange(e.target.value);
            }}
            placeholder="Select  City"
            border="2px solid #9c3cf6"
            borderRadius={{ base: "10px", md: "12px" }}
            bg="transparent"
            color="black"
            fontWeight="600"
            fontSize={{ base: "16px", md: "18px" }}
            height={{ base: "46px", md: "50px" }}
            width="100%"
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
              "& option": {
                color: "#9c3cf6",
                backgroundColor: "white",
                fontWeight: "600",
                _hover: {
                  backgroundColor: "#f8f4ff",
                },
                _selected: {
                  backgroundColor: "#9c3cf6",
                  color: "white",
                },
                animation: `${blink} 1.5s ease-in-out infinite`,
                animationDelay: "calc(var(--option-index) * 0.1s)",
              },
            }}
          >
            {cities.map((city, index) => (
              <option
                key={city}
                value={city}
                style={{ "--option-index": index }}
              >
                {city.trim()}
              </option>
            ))}
          </Select>
        </Box>

        {/* Date Range Picker */}
        <Box
          width={{ base: "90%", md: "100%" }}
          maxWidth={{ base: "300px", md: "350px" }} // 🔥 Increased width
          borderRadius={{ base: "10px", md: "12px" }}
          overflow="hidden"
          bg="white"
          position="relative"
          border="2px solid #9c3cf6"
          animation={
            selectedCity && !dateRange
              ? `${blink} 1.5s ease-in-out infinite`
              : "none"
          }
        >
          <Flex align="center" height={{ base: "44px", md: "48px" }}>
            {/* Set Travel Dates Label */}
            <Box
              bg="linear-gradient(135deg, #9c3cf6, #7c3aed)"
              color="white"
              px={{ base: 2, md: 3 }}
              py={0}
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              minWidth={{ base: "90px", md: "120px" }}
              fontWeight="600"
              fontSize={{ base: "14px", md: "16px" }}
              borderRight="1px solid #6b21a8"
              ml="0"
            >
              Set Travel Dates
            </Box>

            {/* Responsive Date Range Picker with current month start */}
            <Box flex="1" height="100%">
              <RangePicker
  ref={datePickerRef}
  format="DD MMM"
  value={dateRange}
  onChange={setDateRange}
  onCalendarChange={(dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  }}
  open={datePickerOpen}
  onOpenChange={handleDatePickerOpenChange}
  placeholder={["Start", "End"]}
  defaultPickerValue={[dayjs(), dayjs()]}
  allowEmpty={[false, false]}
  disabledDate={(current) => current && current < dayjs().startOf("day")}
  inputReadOnly={true}
  suffixIcon={null}
  className="custom-range-picker calendar-transition"
  dropdownClassName="calendar-slide-popup"
  transitionName="" // disables AntD built-in animation
  separator={
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={1}
      fontSize="14px"
      color="#9c3cf6"
      fontWeight="bold"
    >
      ⇌
    </Box>
  }
  popupStyle={{
    position: 'absolute',
    top: '420px', // Adjust this to fine-tune vertical position
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999
  }}
  getPopupContainer={() => document.body}
  panelRender={(panelNode) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* ✅ Only show 1 calendar, hiding header + second month */}
      {panelNode.props.children[1]}
    </div>
  )}
  style={{
    width: "100%",
    border: "none",
    height: "100%",
    backgroundColor: "transparent",
    padding: "0 4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  }}
/>

            </Box>
          </Flex>
        </Box>

        {/* Get Events Button - Enhanced with popup effect */}
        <Box
          width={{ base: "85%", md: "100%" }}
          maxWidth={{ base: "300px", md: "380px" }} // 🔥 Increased width
          mb={-3}
        >
          <Button
  onClick={handleGetEvents}
  bg={selectedCity && dateRange ? "#9c3cf6" : "#ff6b35"}
  color="white"
  borderRadius={{ base: "12px", md: "14px" }}
  fontWeight="700"
  fontSize={{ base: "16px", md: "20px" }}
  height={{ base: "52px", md: "58px" }}
  width={{ base: "110%", md: "105%" }}
  px={8}
  py={3}
  mx={{ base: "-5%", md: "-2.5%" }}
  position="relative"
  boxShadow={
    selectedCity && dateRange
      ? "0 0 12px #9c3cf6, 0 0 24px #c084fc"
      : "0 0 15px rgba(255, 107, 53, 0.6)"
  }
  _hover={{
    bg: selectedCity && dateRange ? "#8a2be2" : "#ff5722",
    transform: "translateY(-2px) scale(1.02)",
    boxShadow:
      selectedCity && dateRange
        ? "0 0 20px #9c3cf6, 0 0 30px #c084fc"
        : "0 0 20px rgba(255, 107, 53, 0.8)",
  }}
  _active={{
    bg: selectedCity && dateRange ? "#7b1fa2" : "#e64a19",
    transform: "translateY(0px) scale(1.0)",
  }}
  transition="all 0.3s ease-in-out"
  sx={{
    ...(selectedCity && dateRange && {
      animation: "borderGlow 1.8s infinite ease-in-out",
    }),
    "@keyframes borderGlow": {
      "0%": {
        boxShadow: "0 0 6px #9c3cf6, 0 0 12px #9c3cf6",
      },
      "50%": {
        boxShadow: "0 0 20px #c084fc, 0 0 30px #c084fc",
      },
      "100%": {
        boxShadow: "0 0 6px #9c3cf6, 0 0 12px #9c3cf6",
      },
    },
  }}
>
  Get Personalised Event Details
</Button>

        </Box>
      </VStack>
    </Box>
  </Box>
);
}

// Keep getStaticProps to fetch initial cities
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events`);
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }
    const events = await res.json();
    console.log("Fetched Events:", events);

    const uniqueCities = new Set();
    events.forEach((event) => {
      const city = event.city?.trim(); // Use optional chaining for safety
      if (city) {
        uniqueCities.add(city);
      }
    });

    return {
      props: {
        cities: Array.from(uniqueCities).sort(),
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (err) {
    console.error("Error fetching cities:", err);
    return {
      props: {
        cities: [],
      },
      revalidate: 60,
    };
  }
}
