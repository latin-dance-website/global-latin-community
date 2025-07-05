import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
  Divider,
  Stack,
  Heading,
  Badge,
  Container,
  Grid,
  GridItem,
  AspectRatio,
  Link,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon,InfoIcon  } from "@chakra-ui/icons";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  MdLocationOn,
  MdAttachMoney,
  MdStar,
  MdLink,
  MdAccessTime,
  MdLanguage,
  MdTimer,
} from "react-icons/md";
import {
  FaInstagram,
  FaCalendar,
  FaClock,
  FaLocationDot,
  FaUsers,
  FaTheaterMasks,
  FaChevronDown,
} from "react-icons/fa6";
// import { FaChevronDown, FaCalendar, FaLocationDot, FaUsers } from 'react-icons/fa';
import Navbar from "@components/Navbar";
import LayerBlur2 from "../../../src/components/coming_soon/LayerBlur2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Social() {
  const router = useRouter();
  const { city, id } = router.query;
  const [event, setEvent] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [error, setError] = useState(null);
console.log("Fetching event:", `/api/events?city=${city}&id=${id}`);

  useEffect(() => {
    if (!city || !id) return;

    const fetchEvent = async () => {
  try {
    setLoading(true);
    
    // 1. Ensure parameters are properly encoded and formatted
    const apiUrl = `/api/events?city=${encodeURIComponent(city.toLowerCase())}&id=${encodeURIComponent(id)}`;
    console.log('Fetching event from:', apiUrl); // Debug log

    const response = await fetch(apiUrl);
    
    // 2. Better error handling
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Event not found (${response.status})`
      );
    }

    const data = await response.json();
    console.log('Received event data:', data); // Debug log
    
    // 3. Validate response data
    if (!data || !data.id) {
      throw new Error('Invalid event data received');
    }

    setEvent(data);
  } catch (err) {
    console.error('Full fetch error:', err);
    setError(err.message);
    
    // 4. Optional: Redirect if event not found
    if (err.message.includes('404') || err.message.includes('not found')) {
      router.push('/events/socials');
    }
  } finally {
    setLoading(false);
  }
};

    fetchEvent();
  }, [city, id]);

  if (loading) {
    return <Box>Loading event details...</Box>;
  }

  if (error) {
    return (
      <Box>
        <Text color="red.500">{error}</Text>
        <Button onClick={() => router.push('/events')}>Back to Events</Button>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box>
        <Text>Event not found</Text>
        <Button onClick={() => router.push('/events')}>Back to Events</Button>
      </Box>
    );
  }

  // Enhanced color palette with gradients
  const colors = {
    primary: "#e53e3e",
    primaryDark: "#c53030",
    primaryGradient: "linear(to-r, #e53e3e, #c53030)",
    secondary: "#4f46e5",
    secondaryDark: "#4338ca",
    secondaryGradient: "linear(to-r, #6366f1, #4f46e5)",
    accent: "#6366f1",
    success: "#38a169",
    warning: "#ed8936",
    background: "#f7fafc",
    cardBg: "white",
    textPrimary: "#2d3748",
    textSecondary: "#4a5568",
    textLight: "#718096",
    border: "#e2e8f0",
    shadowSm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    shadowMd:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadowLg:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

//   useEffect(() => {
//     const eventData = sessionStorage.getItem("currentEvent");

//     if (eventData) {
//       setEvent(JSON.parse(eventData));
//       setLoading(false);
//     } else {
//       router.push("/events");
//     }
//   }, []);

  if (loading) {
    return (
      <Box>
        <Text>Loading event...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Event not found</Text>
        <Button onClick={() => router.push("/events")} ml={4}>
          Back to Events
        </Button>
      </Box>
    );
  }

 const formatDateWithDay = (eventDay) => {
  if (!eventDay || eventDay.toLowerCase() === "to be decided") {
    return "To be decided";
  }

  try {
    const today = dayjs();
    const todayDayName = today.format('dddd').toLowerCase(); // e.g., 'saturday'
    const eventDayName = eventDay.toLowerCase(); // e.g., 'saturday'
    
    let targetDate;
    
    if (eventDayName === todayDayName) {
      // If event is on the same day as today, use today's date
      targetDate = today;
    } else {
      // Find the next occurrence of the event day
      const eventDayIndex = getDayIndex(eventDayName);
      const todayIndex = today.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      
      let daysUntilEvent;
      if (eventDayIndex > todayIndex) {
        daysUntilEvent = eventDayIndex - todayIndex;
      } else {
        daysUntilEvent = 7 - todayIndex + eventDayIndex;
      }
      
      targetDate = today.add(daysUntilEvent, 'day');
    }
    
    // Format as "Sat, 05 Jul"
    return targetDate.format('ddd, DD MMM');
    
  } catch (e) {
    console.error('Date formatting error:', e);
    return eventDay || "Date not available";
  }
};

// Helper function to get day index (0 = Sunday, 6 = Saturday)
const getDayIndex = (dayName) => {
  const days = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  };
  return days[dayName.toLowerCase()] ?? 0;
};


  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "1 hour 30 minutes";

    try {
      let start = dayjs(`2000-01-01 ${startTime}`);
      let end = dayjs(`2000-01-01 ${endTime}`);

      if (end.isBefore(start)) {
        end = end.add(1, "day");
      }

      const duration = end.diff(start, "minute");
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      if (hours > 0 && minutes > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else {
        return `${minutes} minutes`;
      }
    } catch (e) {
      return "1 hour 30 minutes";
    }
  };

  const currencies = event.currencySymbols
    ? event.currencySymbols.split(",")
    : ["₹", "₫", "฿"];

  return (
    <Box
      minH="100vh"
      w="full"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={{ base: 0, md: 8 }}
      overflowX="clip"
      opacity={isToastVisible ? "0.2" : "1"}
      bg={colors.background}
    >
      {/* Fixed Navbar at Top */}
      <Box position="fixed" top="0" left="0" w="100%" zIndex="1000">
        <Navbar isToastVisible={isToastVisible} />
      </Box>
      <LayerBlur2 />

      <Container
        maxW="container.xl"
        w="full"
        mt={{ base: "60px", md: "80px" }}
        pb={{ base: 6, md: 10 }}
        px={{ base: 3, md: 6 }}
      >
        {isMobile ? (
          /* Mobile Layout - Enhanced with modern design */
          <Box>
            {/* Event Title */}
            {/* Event Title - Gradient Text Version */}
{/* Event Title - Matching Social Nights Style */}
<Heading
  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}  // Same responsive sizes
  fontWeight="extrabold"                            // Same weight
  color="#dc2626"                                   // Same red color
  textShadow="0 1px 2px rgba(0,0,0,0.1)"           // Same shadow
  mb={3}
  mt={{ base: 9, sm: 8 }}
  textAlign="center"
  sx={{
    fontFamily: "inherit",                          // Ensures font consistency
    lineHeight: "1.2",                              // Matches original heading
  }}
>
  {event.title}
</Heading>


            {/* Hero Image with Enhanced Styling */}
            <Box mb={3} display="flex" justifyContent="center">
              <Box
                width={{ base: "240px", sm: "280px" }}
                height={{ base: "340px", sm: "400px" }}
                position="relative"
                boxShadow={colors.shadowLg}
                borderRadius="16px"
                overflow="hidden"
              >
                <Image
                  src={event.image || "/assets/images/hero.jpg"}
                  alt={event.title || "Event"}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)"
                  pointerEvents="none"
                />
              </Box>
            </Box>

            {/* Interest Counter with Animation */}
            <Flex align="center" justify="center" mb={3}>
              <Icon as={FaUsers} color={colors.success} mr={2} boxSize={4} />
              <Text fontSize="sm" color={colors.textSecondary}>
                309 are interested
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                ml={3}
                borderRadius="full"
                borderColor={colors.primary}
                color={colors.primary}
                transition="all 0.2s"
                _hover={{
                  bg: colors.primary,
                  color: "white",
                  transform: "scale(1.05)",
                  boxShadow: colors.shadowMd,
                }}
              >
                Interested?
              </Button>
            </Flex>

            {/* Event Details Card with Modern Styling */}
            <Box
              bg={colors.cardBg}
              borderRadius="16px"
              boxShadow={colors.shadowMd}
              border={`1px solid ${colors.border}`}
              p={3}
              mb={3}
              transition="all 0.3s"
            >
              <VStack spacing={2} align="stretch">
                {" "}
                {/* 🔽 spacing reduced from 4 to 2 */}
                {/* Date */}
                {/* Date + Time in one row on mobile */}
<Flex align="center" justify="space-between">
  {/* Date */}
  <Flex align="center" mr={2}>
    <Box 
          color="#805AD5" 
          fontSize="14px"
          display="flex"
          alignItems="center"
          mr={2}
        >
          <FaCalendar />
        </Box>
    <Text
      fontSize="sm" // smaller on mobile
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
    >
      {formatDateWithDay(event.date, event.day)}
    </Text>
  </Flex>

  {/* Time */}
  <Flex align="center">
   <Box 
         color="#805AD5" 
         fontSize="14px"
         display="flex"
         alignItems="center"
         mr={2}
       >
         <FaClock />
       </Box>
    <Text
      fontSize="sm"
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
    >
      {event.startTime} - {event.endTime} hrs
    </Text>
  </Flex>
</Flex>

                {/* Duration */}
                {/* Location */}
                <Flex align="center">
 <Box color="#805AD5" fontSize="14px" display="flex" alignItems="center" mr={2}>
     <FaLocationDot />
   </Box>
  <Text
    fontSize="sm"
    color="gray.800"
    fontWeight="600"
    lineHeight="1.4"
    letterSpacing="0.2px"
    display="flex"
    alignItems="center"
  >
    {event.location}
    {event.googleMapsLink && (
      <Link
        href={event.googleMapsLink}
        target="_blank"
        ml={1}
        display="inline-flex"
        alignItems="center"
      >
        <Icon as={ExternalLinkIcon} color={colors.primary} boxSize={4} />
      </Link>
    )}
  </Text>
</Flex>

              </VStack>
            </Box>

            {/* Booking Alert with Enhanced Styling */}
            <Box
              bg="orange.50"
              border="2px solid"
              borderColor="orange.200"
              borderRadius="12px"
              p={2.5}
              mb={3}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                w="60px"
                h="60px"
                bg="orange.100"
                borderRadius="full"
                opacity={0.5}
              />
              <Text
                fontSize="sm"
                color={colors.warning}
                fontWeight="600"
                position="relative"
              >
                ⚠️ Bookings are filling fast for{" "}
                {event?.CitybyCountry?.split(",")[0]?.trim() || "this city"}!
              </Text>
            </Box>

            {/* Price and Book Now with Gradient */}
            <Box
  position="fixed"
  bottom="0"
  left="0"
  right="0"
  bg={colors.cardBg}
  borderRadius="16px 16px 0 0"
  boxShadow={colors.shadowLg}
  border={`1px solid ${colors.border}`}
  borderBottom="none"
  p={3}
  zIndex="sticky"
>
  <Box
    position="absolute"
    top="-30px"
    right="-30px"
    w="100px"
    h="100px"
    bgGradient="radial(purple.200, transparent)"
    opacity={0.3}
  />
  <Flex align="center" justify="space-between" position="relative">
    <Box>
      <Text fontSize="sm" color={colors.textSecondary} fontWeight="medium">
        Starts from
      </Text>
      <Text
        fontSize={{ base: "lg", sm: "xl" }}
        fontWeight="bold"
        color={colors.textPrimary}
      >
        <Box
          as="span"
          color={colors.success}
          display="inline"
          fontSize="xl"
        >
          {currencies[0]}
        </Box>{" "}
        {event.fees}
      </Text>
      {/* <Text fontSize="xs" color={colors.warning} fontWeight="600">
        Filling Fast
      </Text> */}
    </Box>
    <Button
      size={{ base: "md", sm: "lg" }}
      bgGradient={colors.primaryGradient}
      color="white"
      borderRadius="12px"
      px={{ base: 6, sm: 8 }}
      boxShadow={colors.shadowMd}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: colors.shadowLg,
      }}
      _active={{
        transform: "translateY(0)",
      }}
    >
      BOOK TICKETS
    </Button>
  </Flex>
</Box>

           {/* About Section with Enhanced Design */}
<Box mb={14}>
  <Box
    bg={colors.cardBg}
    borderRadius="16px"
    boxShadow={colors.shadowMd}
    border={`1px solid ${colors.border}`}
    p={3}
    mb={4}
  >
    <Heading fontSize="lg" mb={3} color={colors.textPrimary}>
      About The Event
    </Heading>
    <Text
      fontSize="sm"
      color={colors.textSecondary}
      lineHeight="1.6"
      mb={3}
    >
      {event.description || "No description available."}
    </Text>
    
    {/* Music Ratio */}
    {/* {event.musicRatio && (
      <Box mb={4}>
        <Text fontWeight="bold" fontSize="sm" mb={2} color={colors.textPrimary}>
          Music Ratio
        </Text>
        <Text fontSize="sm" color={colors.textSecondary}>
          {event.musicRatio}
        </Text>
      </Box>
    )} */}
     <HStack spacing={2} mb={4}>
              {event.instagramHandle && (
                <Button
                  as="a"
                  href={event.instagramHandle}
                  target="_blank"
                  flex="1"
                  bgGradient={colors.secondaryGradient}
                  color="white"
                  borderRadius="12px"
                  leftIcon={<FaInstagram />}
                  boxShadow={colors.shadowMd}
                  transition="all 0.2s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: colors.shadowLg,
                  }}
                  fontWeight="600"
                  py={5}
                  fontSize="sm"
                >
                  Event Page
                </Button>
              )}
              
            </HStack>
    
    
    <Button
      variant="link"
      color={colors.primary}
      fontSize="sm"
      p={0}
      _hover={{
        color: colors.primaryDark,
        textDecoration: "underline",
      }}
    >
      Show more
    </Button>
  </Box>
</Box>
  </Box>

        ) : (
          /* Desktop Layout - Enhanced with modern design */
           <Box maxW="1200px" mx="auto" px={4}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Left Column - Image */}
        <Box flex={1}>
          <Box
            width="100%"
            height="600px"
            borderRadius="20px"
            overflow="hidden"
            boxShadow={colors.shadowLg}
          >
            <Image
              src={event.image || "/assets/images/hero.jpg"}
              alt={event.title || "Event"}
              objectFit="cover"
              w="full"
              h="full"
            />
          </Box>
        </Box>

        {/* Right Column */}
        <Box width={{ base: "100%", md: "400px" }}>
          {/* Booking Box */}
          <Box
            bg={colors.cardBg}
            borderRadius="16px"
            boxShadow={colors.shadowLg}
            border={`1px solid ${colors.border}`}
            p={6}
            mb={4}
          >
            <Heading fontSize="2xl" mb={4} color="#dc2626">
  {event.title}
</Heading>


           {/* Details with Chakra Icons */}
<VStack spacing={3} align="flex-start" mb={4}>
  <HStack spacing={3}>
    <Box 
          color="#805AD5" 
          fontSize="16px"
          display="flex"
          alignItems="center"
        >
          <FaCalendar />
        </Box>
   <Text color={colors.textSecondary} fontWeight="600">
  {formatDateWithDay(event.day)}
</Text>
  </HStack>

  <HStack spacing={3}>
     <Box 
          color="#805AD5" 
          fontSize="16px"
          display="flex"
          alignItems="center"
        >
          <FaClock />
        </Box>
    <Text color={colors.textSecondary} fontWeight="600">
      {event.startTime} - {event.endTime} hrs
    </Text>
  </HStack>

  {event.location && (
    <HStack spacing={3}>
      <Box color="#805AD5" fontSize="16px" display="flex" alignItems="flex-start">
          <FaLocationDot />
        </Box>
      <Text color={colors.textSecondary} fontWeight="600">
        {event.location}{" "}
        {event.googleMapsLink && (
          <Link
            href={event.googleMapsLink}
            target="_blank"
            ml={1}
            display="inline-flex"
            alignItems="center"
          
          >
            <Icon as={ExternalLinkIcon} color={colors.primary} boxSize={4} />
          </Link>
        )}
      </Text>
    </HStack>
  )}
</VStack>

{/* Horizontal line below location */}
<Box
  borderBottom="1px solid"
  borderColor={colors.border}
  mb={4}
/>

{/* Price and Book CTA */}
<Flex justify="space-between" align="center">
  {/* Price Section */}
  <Box mt={-2}>
    <Text fontSize="sm" color={colors.textSecondary} mb={0}>
      Starts from
    </Text>
    <Text
      fontSize="2xl"
      fontWeight="bold"
      color={colors.textPrimary}
      lineHeight="1"
    >
      <Box
        as="span"
        color={colors.success}
        display="inline"
        fontSize="2xl"
        mr={1.5}
      >
        {currencies[0]}
      </Box>
      {event.fees}
    </Text>
  </Box>

  {/* CTA Button */}
  <Button
    size="md"
    bgGradient={colors.primaryGradient}
    color="white"
    borderRadius="12px"
    px={6}
    py={3}
    fontSize="md"
    fontWeight="bold"
    boxShadow={colors.shadowMd}
  >
    BOOK TICKETS
  </Button>
</Flex>


          </Box>

          {/* People Interested */}
          <Flex align="center" justify="center" mb={6}>
            <Box p={1.5} borderRadius="8px" bg="green.100" mr={2}>
              <Icon as={FaUsers} color={colors.success} boxSize={4} />
            </Box>
            <Text fontSize="sm" color={colors.textSecondary}>
              309 people are interested
            </Text>
          </Flex>

          {/* About Section */}
          <Box
            bg={colors.cardBg}
            borderRadius="16px"
            boxShadow={colors.shadowMd}
            border={`1px solid ${colors.border}`}
            
            p={6}
          >
            <Heading fontSize="xl" mb={4} color={colors.textPrimary}>
              About The Event
            </Heading>
            <Text color={colors.textSecondary} mb={4}>
              {event.description || "No description available."}
            </Text>

            {/* {event.musicRatio && (
              <Box mb={4}>
                <Text fontWeight="bold" mb={2} color={colors.textPrimary} >
                  Music Ratio
                </Text>
                <Text color={colors.textSecondary} fontWeight="600">{event.musicRatio}</Text>
              </Box>
            )} */}

            <Button
              variant="link"
              color={colors.primary}
              p={0}
              _hover={{
                color: colors.primaryDark,
                textDecoration: "underline",
              }}
            >
              Show more
            </Button>

            {/* Event Page Button */}
            {event.instagramHandle && (
              <Button
                as="a"
                href={event.instagramHandle}
                target="_blank"
                mt={4}
                width="100%"
                bgGradient={colors.secondaryGradient}
                color="white"
                borderRadius="12px"
                leftIcon={<FaInstagram />}
                boxShadow={colors.shadowMd}
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: colors.shadowLg,
                }}
                fontWeight="600"
                py={5}
                fontSize="sm"
              >
                Visit Event Page
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
        )}
      </Container>
    </Box>
  );
}
