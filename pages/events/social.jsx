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

  // Fixed duration calculation
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "1 hour 30 minutes";

    try {
      let start = dayjs(`2000-01-01 ${startTime}`);
      let end = dayjs(`2000-01-01 ${endTime}`);

      // If end time is earlier than start time, it means it crosses midnight
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
      bg="gray.50"
    >
      {/* Fixed Navbar at Top */}
      <Box position="fixed" top="0" left="0" w="100%" zIndex="1000">
        <Navbar isToastVisible={isToastVisible} />
      </Box>
      <LayerBlur2 />

      <Container
        maxW="container.xl"
        w="full"
        mt="80px"
        pb={10}
        px={{ base: 4, md: 6 }}
      >
        {isMobile ? (
          /* Mobile Layout - Following BookMyShow Structure */
          <Box>
            {/* Back Button and Share */}
            <Flex justify="space-between" align="center" mb={-2}>
              {/* <Button
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={MdLink} />}
                onClick={() => router.back()}
              >
                Back
              </Button> */}
              {/* <Button variant="ghost" size="sm">
                Share
              </Button> */}
            </Flex>

            {/* Event Title */}
            <Heading
              fontSize="2xl"
              fontWeight="bold"
              mb={2}
              textAlign="center"
              color="gray.800"
            >
              {event.title}
            </Heading>

            {/* Hero Image with Aspect Ratio */}
            <Box mb={4} display="flex" justifyContent="center">
              <Box width="280px" height="400px">
                <Image
                  src={event.image || "/assets/images/hero.jpg"}
                  alt={event.title || "Event"}
                  objectFit="cover"
                  w="full"
                  h="full"
                  borderRadius="12px"
                  border="1px solid #e2e8f0"
                  boxShadow="lg"
                />
              </Box>
            </Box>

            {/* Interest Counter */}
            <Flex align="center" justify="center" mb={4}>
              <Icon as={FaUsers} color="green.500" mr={2} />
              <Text fontSize="sm" color="gray.600">
                309 are interested
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="pink"
                ml={4}
                borderRadius="full"
              >
                Interested?
              </Button>
            </Flex>

            {/* Event Details Card */}
            <Box
              bg="white"
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
              p={4}
              mb={4}
            >
              <VStack spacing={4} align="stretch">
                {/* Date */}
                <Flex align="center">
                  <Icon as={FaCalendar} color="#6366f1" boxSize={4} mr={3} />
                  <Text fontSize="sm" color="gray.700" fontWeight="500">
                    {formatDateWithDay(event.date)}
                  </Text>
                </Flex>

                {/* Time */}
                <Flex align="center">
                  <Icon as={FaClock} color="#6366f1" boxSize={4} mr={3} />
                  <Text fontSize="sm" color="gray.700" fontWeight="500">
                    {event.startTime} - {event.endTime} hrs
                  </Text>
                </Flex>

                {/* Duration */}
                <Flex align="center">
                  <Icon as={MdTimer} color="#6366f1" boxSize={4} mr={3} />
                  <Text fontSize="sm" color="gray.700" fontWeight="500">
                    {calculateDuration(event.startTime, event.endTime)}
                  </Text>
                </Flex>

                {/* Language */}
                {/* <Flex align="center">
                  <Icon as={MdLanguage} color="#6366f1" boxSize={4} mr={3} />
                  <Text fontSize="sm" color="gray.700" fontWeight="500">
                    Tamil, English
                  </Text>
                </Flex> */}

                {/* Location */}
                <Flex align="flex-start">
                  <Icon
                    as={FaLocationDot}
                    color="#6366f1"
                    boxSize={4}
                    mr={3}
                    mt={0.5}
                  />
                  <Text
                    fontSize="sm"
                    color="gray.700"
                    fontWeight="500"
                    lineHeight="1.4"
                  >
                    {event.location}
                  </Text>
                </Flex>
              </VStack>
            </Box>

            {/* Booking Alert */}
            <Box
              bg="orange.50"
              border="1px solid"
              borderColor="orange.200"
              borderRadius="8px"
              p={3}
              mb={4}
            >
              <Text fontSize="sm" color="orange.800" fontWeight="500">
                ⚠️ Bookings are filling fast for{" "}
                {event?.CitybyCountry?.split(",")[0]?.trim() || "this city"}!
              </Text>
            </Box>
            {/* Price and Book Now */}
            <Box
              bg="white"
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
              p={4}
              mb={6}
            >
              <Flex align="center" justify="space-between">
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="#276749">
                    <Box as="span" color="#38a169" display="inline">
                      {currencies[0]}
                    </Box>{" "}
                    {event.fees} onwards
                  </Text>

                  <Text fontSize="sm" color="orange.500" fontWeight="500">
                    Filling Fast
                  </Text>
                </Box>
                <Button size="lg" colorScheme="red" borderRadius="8px" px={8}>
                  Book Now
                </Button>
              </Flex>
            </Box>

            <HStack spacing={3} mb={6}>
  {event.instagramHandle && (
    <Button
      as="a"
      href={event.instagramHandle}
      target="_blank"
      flex="1"
      bg="#4f46e5"  // Solid purple color similar to the image
      color="white"
      borderRadius="8px"  // Slightly less rounded than before
      leftIcon={<FaInstagram />}
      _hover={{
        bg: "#4338ca",  // Darker shade for hover
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      boxShadow="md"
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
    flex="1"
    bg="#4f46e5"  // Matching purple color
    color="white"
    borderRadius="8px"
    leftIcon={<MdLink />}
    onClick={
      !event.googleMapsLink ? (e) => e.preventDefault() : undefined
    }
    cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
    opacity={!event.googleMapsLink ? 0.7 : 1}
    _hover={{
      bg: event.googleMapsLink ? "#4338ca" : "#4f46e5",  // Only change on hover if link exists
      transform: event.googleMapsLink ? "translateY(-2px)" : "none",
      boxShadow: event.googleMapsLink ? "lg" : "md",
    }}
    boxShadow="md"
    fontWeight="600"
    py={6}
  >
    View Map
  </Button>
</HStack>

            {/* About Section */}
            <Box
              bg="white"
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
              p={4}
            >
              <Heading fontSize="lg" mb={3} color="gray.800">
                About The Event
              </Heading>
              <Text fontSize="sm" color="gray.700" lineHeight="1.6" mb={3}>
                {event.description || "No description available."}
              </Text>
              {event.musicRatio && (
                <Box>
                  <Text fontWeight="semibold" fontSize="sm" mb={1}>
                    Music Ratio:
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {event.musicRatio}
                  </Text>
                </Box>
              )}
              <Button
                variant="link"
                colorScheme="red"
                fontSize="sm"
                p={0}
                mt={2}
              >
                Read More
              </Button>
            </Box>
          </Box>
        ) : (
          /* Desktop Layout */
          <Box>
            {/* Back Button and Share */}
            <Flex justify="space-between" align="center" mb={0}>
              {/* <Button
                variant="ghost"
                leftIcon={<Icon as={MdLink} />}
                onClick={() => router.back()}
              >
                Back
              </Button> */}
              {/* <Button variant="ghost">
                Share
              </Button> */}
            </Flex>

            {/* Event Title */}
            <Heading
              fontSize="4xl"
              fontWeight="bold"
              mb={6}
              color="gray.800"
              textAlign="center"
            >
              {event.title}
            </Heading>

            <Grid templateColumns="2fr 1fr" gap={8}>
              {/* Left Column - Image and About */}
              <GridItem>
                {/* Hero Image - Changed to vertical aspect ratio */}
                <GridItem>
                  <Box
                    width="350px"
                    height="500px"
                    position="sticky"
                    top="120px" /* Adjust this value based on your navbar height */
                  >
                    <Image
                      src={event.image || "/assets/images/hero.jpg"}
                      alt={event.title || "Event"}
                      objectFit="cover"
                      w="full"
                      h="full"
                      borderRadius="12px"
                      border="1px solid #e2e8f0"
                      boxShadow="lg"
                    />
                  </Box>
                </GridItem>

                {/* Removed Event Tags - STAND UP COMEDY AND COMEDY SHOWS */}

                {/* Interest Counter */}
                <Flex align="center" mb={6}>
                  <Icon as={FaUsers} color="green.500" mr={2} />
                  <Text color="gray.600" mr={4}>
                    309 are interested
                  </Text>
                  <Button
                    variant="outline"
                    colorScheme="pink"
                    borderRadius="full"
                    size="sm"
                  >
                    I'm Interested
                  </Button>
                </Flex>

                {/* About Section */}
                <Box
                  bg="white"
                  borderRadius="12px"
                  boxShadow="sm"
                  border="1px solid #e2e8f0"
                  p={6}
                >
                  <Heading fontSize="xl" mb={4} color="gray.800">
                    About The Event
                  </Heading>
                  <Text color="gray.700" lineHeight="1.6" mb={4}>
                    {event.description || "No description available."}
                  </Text>
                  {event.musicRatio && (
                    <Box>
                      <Text fontWeight="semibold" mb={2}>
                        Music Ratio:
                      </Text>
                      <Text color="gray.600">{event.musicRatio}</Text>
                    </Box>
                  )}
                  <Button variant="link" colorScheme="red" p={0} mt={3}>
                    Read More
                  </Button>
                </Box>
              </GridItem>

              {/* Right Column - Event Details and Booking */}
              <GridItem>
                {/* Event Details Card */}
                <Box
                  bg="white"
                  borderRadius="12px"
                  boxShadow="sm"
                  border="1px solid #e2e8f0"
                  p={6}
                  mb={4}
                >
                  <VStack spacing={4} align="stretch">
                    {/* Date */}
                    <Flex align="center">
                      <Icon
                        as={FaCalendar}
                        color="#6366f1"
                        boxSize={5}
                        mr={4}
                      />
                      <Text color="gray.700" fontWeight="500">
                        {formatDateWithDay(event.date)}
                      </Text>
                    </Flex>

                    {/* Time */}
                    <Flex align="center">
                      <Icon as={FaClock} color="#6366f1" boxSize={5} mr={4} />
                      <Text color="gray.700" fontWeight="500">
                        {event.startTime} - {event.endTime} hrs
                      </Text>
                    </Flex>

                    {/* Duration */}
                    <Flex align="center">
                      <Icon as={MdTimer} color="#6366f1" boxSize={5} mr={4} />
                      <Text color="gray.700" fontWeight="500">
                        {calculateDuration(event.startTime, event.endTime)}
                      </Text>
                    </Flex>

                    {/* Language */}
                    {/* <Flex align="center">
                      <Icon as={MdLanguage} color="#6366f1" boxSize={5} mr={4} />
                      <Text color="gray.700" fontWeight="500">
                        Tamil, English
                      </Text>
                    </Flex> */}

                    {/* Location */}
                    <Flex align="flex-start">
  <Icon
    as={FaLocationDot}
    color="#6366f1"
    boxSize={5}
    mr={4}
    mt={0.5}
  />
  <Box display="inline-block" position="relative">
    <Text color="gray.700" fontWeight="500" lineHeight="1.4" display="inline">
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
        <Box
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
        />
      </Box>
    )}
  </Box>
</Flex>
                  </VStack>
                </Box>

                {/* Booking Alert */}
                <Box
                  bg="orange.50"
                  border="1px solid"
                  borderColor="orange.200"
                  borderRadius="8px"
                  p={4}
                  mb={4}
                >
                  <Text color="orange.800" fontWeight="500">
                    ⚠️ Bookings are filling fast for Chennai!
                  </Text>
                </Box>

                {/* Price and Book Now */}
                <Box
                  bg="white"
                  borderRadius="12px"
                  boxShadow="sm"
                  border="1px solid #e2e8f0"
                  p={6}
                  mb={4}
                >
                  <VStack spacing={4}>
                    <Box textAlign="center">
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        {currencies[0]}
                        {event.fees} onwards
                      </Text>
                      <Text color="orange.500" fontWeight="500">
                        Filling Fast
                      </Text>
                    </Box>
                    <Button
                      size="lg"
                      colorScheme="red"
                      borderRadius="8px"
                      w="full"
                      py={6}
                      fontSize="lg"
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
                      bg="linear-gradient(45deg, #f093fb 0%, #f5576c 100%)"
                      color="white"
                      borderRadius="12px"
                      leftIcon={<FaInstagram />}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      boxShadow="md"
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
                    bg="linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
                    color="white"
                    borderRadius="12px"
                    leftIcon={<MdLink />}
                    onClick={
                      !event.googleMapsLink
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                    cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
                    opacity={!event.googleMapsLink ? 0.7 : 1}
                    _hover={{
                      transform: event.googleMapsLink
                        ? "translateY(-2px)"
                        : "none",
                      boxShadow: event.googleMapsLink ? "lg" : "md",
                    }}
                    boxShadow="md"
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
