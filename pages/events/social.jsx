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
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
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
} from "react-icons/fa6";
import Navbar from "@components/Navbar";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Social() {
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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
    shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

  useEffect(() => {
    const eventData = sessionStorage.getItem("currentEvent");

    if (eventData) {
      setEvent(JSON.parse(eventData));
      setLoading(false);
    } else {
      router.push("/events");
    }
  }, []);

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

  const formatDateWithDay = (dateString) => {
    if (!dateString || dateString.toLowerCase() === "to be decided") {
      return "To be decided";
    }

    try {
      const parsed = dayjs(dateString, "ddd, DD MMM");
      if (!parsed.isValid()) return dateString;

      const withYear = parsed.year(dayjs().year());
      return withYear.format("dddd, DD MMMM YYYY");
    } catch (e) {
      return dateString;
    }
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
            <Heading
              fontSize={{ base: "xl", sm: "2xl" }}
              fontWeight="bold"
              mb={3}
              mt={6}
              textAlign="center"
              color={colors.textPrimary}
              bgGradient={colors.primaryGradient}
              bgClip="text"
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
             <VStack spacing={2} align="stretch"> {/* 🔽 spacing reduced from 4 to 2 */}
  {/* Date */}
  <Flex align="center">
    <Box p={1.5} borderRadius="8px" bg="purple.50" mr={2}> {/* 🔽 tighter padding & margin */}
      <Icon as={FaCalendar} color={colors.accent} boxSize={4} />
    </Box>
    <Text
      fontSize="sm"
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
      letterSpacing="0.2px"
    >
      {formatDateWithDay(event.date)}
    </Text>
  </Flex>

  {/* Time */}
  <Flex align="center">
    <Box p={1.5} borderRadius="8px" bg="blue.50" mr={2}>
      <Icon as={FaClock} color="#3182ce" boxSize={4} />
    </Box>
    <Text
      fontSize="sm"
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
      letterSpacing="0.2px"
    >
      {event.startTime} - {event.endTime} hrs
    </Text>
  </Flex>

  {/* Duration */}
  {/* <Flex align="center">
    <Box p={1.5} borderRadius="8px" bg="orange.50" mr={2}>
      <Icon as={MdTimer} color={colors.warning} boxSize={4} />
    </Box>
    <Text
      fontSize="sm"
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
      letterSpacing="0.2px"
    >
      {calculateDuration(event.startTime, event.endTime)}
    </Text>
  </Flex> */}

  {/* Location */}
  <Flex align="center">
    <Box p={1.5} borderRadius="8px" bg="green.50" mr={2}>
      <Icon as={FaLocationDot} color={colors.success} boxSize={4} />
    </Box>
    <Text
      fontSize="sm"
      color="gray.800"
      fontWeight="600"
      lineHeight="1.4"
      letterSpacing="0.2px"
    >
      {event.location}
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
              <Text fontSize="sm" color={colors.warning} fontWeight="600" position="relative">
                ⚠️ Bookings are filling fast for{" "}
                {event?.CitybyCountry?.split(",")[0]?.trim() || "this city"}!
              </Text>
            </Box>

            {/* Price and Book Now with Gradient */}
            <Box
              bg={colors.cardBg}
              borderRadius="16px"
              boxShadow={colors.shadowLg}
              border={`1px solid ${colors.border}`}
              p={3}
              mb={4}
              position="relative"
              overflow="hidden"
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
                  <Text fontSize={{ base: "md", sm: "lg" }} fontWeight="bold" color={colors.textPrimary}>
                    <Box as="span" color={colors.success} display="inline" fontSize="xl">
                      {currencies[0]}
                    </Box>{" "}
                    {event.fees} onwards
                  </Text>
                  <Text fontSize="xs" color={colors.warning} fontWeight="600">
                    Filling Fast
                  </Text>
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
                  Book Now
                </Button>
              </Flex>
            </Box>

            {/* Action Buttons with Modern Style */}
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
              <Button
                as={event.googleMapsLink ? "a" : "button"}
                href={event.googleMapsLink || "#"}
                target={event.googleMapsLink ? "_blank" : undefined}
                flex="1"
                bgGradient={event.googleMapsLink ? colors.secondaryGradient : "linear(to-r, gray.400, gray.500)"}
                color="white"
                borderRadius="12px"
                leftIcon={<MdLink />}
                onClick={
                  !event.googleMapsLink ? (e) => e.preventDefault() : undefined
                }
                cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
                opacity={!event.googleMapsLink ? 0.7 : 1}
                boxShadow={colors.shadowMd}
                transition="all 0.2s"
                _hover={{
                  transform: event.googleMapsLink ? "translateY(-2px)" : "none",
                  boxShadow: event.googleMapsLink ? colors.shadowLg : colors.shadowMd,
                }}
                fontWeight="600"
                py={5}
                fontSize="sm"
              >
                View Map
              </Button>
            </HStack>

            {/* About Section with Enhanced Design */}
            <Box
              bg={colors.cardBg}
              borderRadius="16px"
              boxShadow={colors.shadowMd}
              border={`1px solid ${colors.border}`}
              p={3}
            >
              <Heading fontSize="lg" mb={2} color={colors.textPrimary}>
                About The Event
              </Heading>
              <Text fontSize="sm" color={colors.textSecondary} lineHeight="1.6" mb={2}>
                {event.description || "No description available."}
              </Text>
              {event.musicRatio && (
                <Box
                  bg="purple.50"
                  borderRadius="8px"
                  p={2}
                  mb={2}
                >
                  <Text fontWeight="semibold" fontSize="sm" mb={1} color={colors.textPrimary}>
                    Music Ratio:
                  </Text>
                  <Text fontSize="sm" color={colors.textSecondary}>
                    {event.musicRatio}
                  </Text>
                </Box>
              )}
              <Button
                variant="link"
                color={colors.primary}
                fontSize="sm"
                p={0}
                mt={2}
                _hover={{ color: colors.primaryDark, textDecoration: "underline" }}
              >
                Read More
              </Button>
            </Box>
          </Box>
        ) : (
          /* Desktop Layout - Enhanced with modern design */
          <Box>
            {/* Event Title */}
            <Heading
              fontSize="4xl"
              fontWeight="bold"
              mb={6}
              color={colors.textPrimary}
              textAlign="center"
              bgGradient={colors.primaryGradient}
              bgClip="text"
            >
              {event.title}
            </Heading>

            <Grid templateColumns="2fr 1fr" gap={8}>
              {/* Left Column - Image and About */}
              <GridItem>
                <Box
                  width="350px"
                  height="500px"
                  position="sticky"
                  top="120px"
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow={colors.shadowLg}
                  transition="all 0.3s"
                  _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
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
                    bgGradient="linear(to-t, rgba(0,0,0,0.4), transparent)"
                    pointerEvents="none"
                  />
                </Box>

                {/* Interest Counter */}
                <Flex align="center" mb={6} mt={6}>
                  <Icon as={FaUsers} color={colors.success} mr={2} />
                  <Text color={colors.textSecondary} mr={4}>
                    309 are interested
                  </Text>
                  <Button
                    variant="outline"
                    borderColor={colors.primary}
                    color={colors.primary}
                    borderRadius="full"
                    size="sm"
                    transition="all 0.2s"
                    _hover={{
                      bg: colors.primary,
                      color: "white",
                      transform: "scale(1.05)",
                      boxShadow: colors.shadowMd,
                    }}
                  >
                    I'm Interested
                  </Button>
                </Flex>

                {/* About Section */}
                <Box
                  bg={colors.cardBg}
                  borderRadius="20px"
                  boxShadow={colors.shadowMd}
                  border={`1px solid ${colors.border}`}
                  p={6}
                  transition="all 0.3s"
                  _hover={{
                    boxShadow: colors.shadowLg,
                  }}
                >
                  <Heading fontSize="xl" mb={4} color={colors.textPrimary}>
                    About The Event
                  </Heading>
                  <Text color={colors.textSecondary} lineHeight="1.6" mb={4}>
                    {event.description || "No description available."}
                  </Text>
                  {event.musicRatio && (
                    <Box
                      bg="purple.50"
                      borderRadius="12px"
                      p={3}
                      mb={3}
                    >
                      <Text fontWeight="semibold" mb={2} color={colors.textPrimary}>
                        Music Ratio:
                      </Text>
                      <Text color={colors.textSecondary}>{event.musicRatio}</Text>
                    </Box>
                  )}
                  <Button 
                    variant="link" 
                    color={colors.primary} 
                    p={0} 
                    mt={3}
                    _hover={{ color: colors.primaryDark, textDecoration: "underline" }}
                  >
                    Read More
                  </Button>
                </Box>
              </GridItem>

              {/* Right Column - Event Details and Booking */}
              <GridItem>
                {/* Event Details Card */}
                <Box
                  bg={colors.cardBg}
                  borderRadius="20px"
                  boxShadow={colors.shadowMd}
                  border={`1px solid ${colors.border}`}
                  p={6}
                  mb={4}
                  transition="all 0.3s"
                  _hover={{
                    boxShadow: colors.shadowLg,
                  }}
                >
                  <VStack spacing={4} align="stretch">
                    {/* Date */}
                    <Flex align="center">
                      <Box
                        p={3}
                        borderRadius="12px"
                        bg="purple.50"
                        mr={4}
                      >
                        <Icon as={FaCalendar} color={colors.accent} boxSize={5} />
                      </Box>
                      <Text color={colors.textSecondary} fontWeight="500">
                        {formatDateWithDay(event.date)}
                      </Text>
                    </Flex>

                    {/* Time */}
                    <Flex align="center">
                      <Box
                        p={3}
                        borderRadius="12px"
                        bg="blue.50"
                        mr={4}
                      >
                        <Icon as={FaClock} color="#3182ce" boxSize={5} />
                      </Box>
                      <Text color={colors.textSecondary} fontWeight="500">
                        {event.startTime} - {event.endTime} hrs
                      </Text>
                    </Flex>

                    {/* Duration */}
                    {/* <Flex align="center">
                      <Box
                        p={3}
                        borderRadius="12px"
                        bg="orange.50"
                        mr={4}
                      >
                        <Icon as={MdTimer} color={colors.warning} boxSize={5} />
                      </Box>
                      <Text color={colors.textSecondary} fontWeight="500">
                        {calculateDuration(event.startTime, event.endTime)}
                      </Text>
                    </Flex> */}

                    {/* Location */}
                    <Flex align="flex-start">
                      <Box
                        p={3}
                        borderRadius="12px"
                        bg="green.50"
                        mr={4}
                        mt={0.5}
                      >
                        <Icon as={FaLocationDot} color={colors.success} boxSize={5} />
                      </Box>
                      <Box display="inline-block" position="relative">
                        <Text color={colors.textSecondary} fontWeight="500" lineHeight="1.4" display="inline">
                          {event.location}
                        </Text>
                        {event.googleMapsLink && (
                          <Box 
                            as="a"
                            href={event.googleMapsLink}
                            target="_blank"
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                            display="inline-block"
                            position="absolute"
                            right="-24px"
                            top="0"
                            ml={2}
                          >
                            {/* <Box
                              as="img"
                              src="https://assets-in.bmscdn.com/nmcms/synopsis/navigate_icon.png"
                              alt="Navigate"
                              width="20px"
                              height="20px"
                              pointerEvents="none"
                              mb={8}
                              onContextMenu={(e) => e.preventDefault()}
                              style={{
                                userSelect: 'none',
                                WebkitUserDrag: 'none',
                                verticalAlign: 'middle'
                              }}
                            /> */}
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </VStack>
                </Box>

                {/* Booking Alert */}
                <Box
                  bg="orange.50"
                  border="2px solid"
                  borderColor="orange.200"
                  borderRadius="12px"
                  p={4}
                  mb={4}
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top="-20px"
                    right="-20px"
                    w="80px"
                    h="80px"
                    bg="orange.100"
                    borderRadius="full"
                    opacity={0.5}
                  />
                  <Text color={colors.warning} fontWeight="600" position="relative">
                    ⚠️ Bookings are filling fast for {event?.CitybyCountry?.split(",")[0]?.trim() || "this city"}!
                  </Text>
                </Box>

                {/* Price and Book Now */}
                <Box
                  bg={colors.cardBg}
                  borderRadius="20px"
                  boxShadow={colors.shadowLg}
                  border={`1px solid ${colors.border}`}
                  p={6}
                  mb={4}
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top="-40px"
                    right="-40px"
                    w="120px"
                    h="120px"
                    bgGradient="radial(purple.200, transparent)"
                    opacity={0.3}
                  />
                  <VStack spacing={4} position="relative">
                    <Box textAlign="center">
                      <Text fontSize="2xl" fontWeight="bold" color={colors.textPrimary}>
                        <Box as="span" color={colors.success} display="inline" fontSize="3xl">
                          {currencies[0]}
                        </Box>
                        {event.fees} onwards
                      </Text>
                      <Text color={colors.warning} fontWeight="600">
                        Filling Fast
                      </Text>
                    </Box>
                    <Button
                      size="lg"
                      bgGradient={colors.primaryGradient}
                      color="white"
                      borderRadius="12px"
                      w="full"
                      py={6}
                      fontSize="lg"
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
                      Book Now
                    </Button>
                  </VStack>
                </Box>

                {/* Action Buttons */}
                <VStack spacing={3}>
                  {event.instagramHandle && (
                    <Button
                      as="a"
                      href={event.instagramHandle}
                      target="_blank"
                      w="full"
                      bgGradient={colors.secondaryGradient}
                      color="white"
                      borderRadius="16px"
                      leftIcon={<FaInstagram />}
                      boxShadow={colors.shadowMd}
                      transition="all 0.2s"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: colors.shadowLg,
                      }}
                      fontWeight="600"
                      py={6}
                    >
                      Event Page
                    </Button>
                  )}
                  <Button
                    as={event.googleMapsLink ? "a" : "button"}
                    href={event.googleMapsLink || "#"}
                    target={event.googleMapsLink ? "_blank" : undefined}
                    w="full"
                    bgGradient={event.googleMapsLink ? colors.secondaryGradient : "linear(to-r, gray.400, gray.500)"}
                    color="white"
                    borderRadius="16px"
                    leftIcon={<MdLink />}
                    onClick={
                      !event.googleMapsLink
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                    cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
                    opacity={!event.googleMapsLink ? 0.7 : 1}
                    boxShadow={colors.shadowMd}
                    transition="all 0.2s"
                    _hover={{
                      transform: event.googleMapsLink ? "translateY(-2px)" : "none",
                      boxShadow: event.googleMapsLink ? colors.shadowLg : colors.shadowMd,
                    }}
                    fontWeight="600"
                    py={6}
                  >
                    View Map
                  </Button>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}