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
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdAttachMoney, MdStar, MdLink } from "react-icons/md";
import {
  FaInstagram,
  FaCalendar,
  FaClock,
  FaLocationDot,
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
        maxW="container.lg"
        w="full"
        mt="80px"
        pb={10}
        px={{ base: 4, md: 4 }}
      >
        {isMobile ? (
          /* Mobile Layout - Title, Image, Details, Description */
          <Box>
            {/* Event Title */}
            <Box mb={3}>
              <Heading
                fontSize="2xl"
                fontWeight="bold"
                mb={2}
                textAlign="center"
              >
                {event.title}
              </Heading>
            </Box>

            {/* Hero Image - Right after title */}
            <Box display="flex" justifyContent="center" mb={4}>
              <Box
                width="280px"
                height="350px"
                borderRadius="12px"
                overflow="hidden"
                boxShadow="lg"
                border="1px solid #e2e8f0"
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

            {/* Mobile Info Cards - Same style as carousel cards */}
            <VStack spacing={3} mb={5}>
              {/* Date */}
              <Box
                bg="white"
                p={4}
                borderRadius="12px"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                w="full"
              >
                <Flex align="center" gap={3}>
                  <Box color="#6366f1" fontSize="16px">
                    <FaCalendar />
                  </Box>
                  <Text fontSize="14px" color="gray.600" fontWeight="600">
                    {formatDateWithDay(event.date)}
                  </Text>
                </Flex>
              </Box>

              {/* Time */}
              <Box
                bg="white"
                p={4}
                borderRadius="12px"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                w="full"
              >
                <Flex align="center" gap={3}>
                  <Box color="#6366f1" fontSize="16px">
                    <FaClock />
                  </Box>
                  <Text fontSize="14px" color="gray.600" fontWeight="600">
                    {event.startTime} - {event.endTime}
                  </Text>
                </Flex>
              </Box>

              {/* Location */}
              <Box
                bg="white"
                p={4}
                borderRadius="12px"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                w="full"
              >
                <Flex align="flex-start" gap={3}>
                  <Box flexShrink={0} color="#6366f1" fontSize="16px" mt="1px">
                    <FaLocationDot />
                  </Box>
                  <Text
                    fontSize="14px"
                    color="gray.600"
                    fontWeight="600"
                    lineHeight="1.4"
                  >
                    {event.location}
                  </Text>
                </Flex>
              </Box>

              {/* Price */}
              <Box
                bg="white"
                p={4}
                borderRadius="12px"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                w="full"
              >
                <Flex align="center" gap={3}>
                  <Icon as={MdAttachMoney} color="#6366f1" boxSize={4} />
                  <Text fontSize="14px" color="gray.600" fontWeight="600">
                    {event.fees} {currencies[0] || ""}
                  </Text>
                </Flex>
              </Box>
            </VStack>

            {/* Action Buttons - Side by side */}
            <HStack spacing={3} mb={5} justify="center">
              {event.instagramHandle && (
                <Button
                  as="a"
                  href={event.instagramHandle}
                  target="_blank"
                  size="md"
                  colorScheme="pink"
                  borderRadius="full"
                  leftIcon={<FaInstagram />}
                  flex="1"
                  maxW="160px"
                >
                  Event Page
                </Button>
              )}
              <Button
                as={event.googleMapsLink ? "a" : "button"}
                href={event.googleMapsLink || "#"}
                target={event.googleMapsLink ? "_blank" : undefined}
                size="md"
                colorScheme="orange"
                borderRadius="full"
                leftIcon={<MdLink />}
                flex="1"
                maxW="160px"
                onClick={
                  !event.googleMapsLink ? (e) => e.preventDefault() : undefined
                }
                cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
                opacity={!event.googleMapsLink ? 0.7 : 1}
              >
                View Map
              </Button>
            </HStack>

            {/* About Section */}
            <Box
              bg="white"
              p={6}
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
              mb={4}
            >
              <Heading fontSize="xl" mb={4} color="gray.800">
                About the Event
              </Heading>
              <Text fontSize="md" color="gray.700" lineHeight="1.7" mb={4}>
                {event.description || "No description available."}
              </Text>
              {event.musicRatio && (
                <Box mt={4}>
                  <Text fontWeight="semibold" mb={2}>
                    Music Ratio:
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {event.musicRatio}
                  </Text>
                </Box>
              )}
            </Box>

            {/* Reviews Section */}
            <Box
              bg="white"
              p={6}
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
            >
              <Heading fontSize="xl" mb={4} color="gray.800">
                Reviews
              </Heading>
              <Text color="gray.500" fontStyle="italic">
                Coming soon...
              </Text>
            </Box>
          </Box>
        ) : (
          /* Desktop Layout - Split image and content */
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={8} alignItems="start">
              {/* Image Column */}
              <GridItem>
                <Image
                  src={event.image || "/assets/images/hero.jpg"}
                  alt={event.title || "Event"}
                  objectFit="cover"
                  w="full"
                  h="600px"
                  borderRadius="12px"
                  border="1px solid #e2e8f0"
                  boxShadow="lg"
                />
              </GridItem>

              {/* Content Column */}
              <GridItem>
                <Heading fontSize="3xl" fontWeight="bold" mb={6}>
                  {event.title}
                </Heading>

                {/* Desktop Info Cards - Same style as carousel cards */}
                <VStack spacing={4} mb={6}>
                  {/* Date */}
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    boxShadow="sm"
                    border="1px solid #e2e8f0"
                    w="full"
                  >
                    <Flex align="center" gap={3}>
                      <Box color="#6366f1" fontSize="18px">
                        <FaCalendar />
                      </Box>
                      <Text fontSize="16px" color="gray.600" fontWeight="600">
                        {formatDateWithDay(event.date)}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Time */}
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    boxShadow="sm"
                    border="1px solid #e2e8f0"
                    w="full"
                  >
                    <Flex align="center" gap={3}>
                      <Box color="#6366f1" fontSize="18px">
                        <FaClock />
                      </Box>
                      <Text fontSize="16px" color="gray.600" fontWeight="600">
                        {event.startTime} - {event.endTime}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Location */}
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    boxShadow="sm"
                    border="1px solid #e2e8f0"
                    w="full"
                  >
                    <Flex align="flex-start" gap={3}>
                      <Box
                        flexShrink={0}
                        color="#6366f1"
                        fontSize="18px"
                        mt="1px"
                      >
                        <FaLocationDot />
                      </Box>
                      <Text
                        fontSize="16px"
                        color="gray.600"
                        fontWeight="600"
                        lineHeight="1.4"
                      >
                        {event.location}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Price */}
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    boxShadow="sm"
                    border="1px solid #e2e8f0"
                    w="full"
                  >
                    <Flex align="center" gap={3}>
                      <Icon as={MdAttachMoney} color="#6366f1" boxSize={5} />
                      <Text fontSize="16px" color="gray.600" fontWeight="600">
                        {event.fees} {currencies[0] || ""}
                      </Text>
                    </Flex>
                  </Box>
                </VStack>

                {/* Action Buttons - Side by side */}
                <HStack spacing={4} justify="flex-start">
                  {event.instagramHandle && (
                    <Button
                      as="a"
                      href={event.instagramHandle}
                      target="_blank"
                      size="lg"
                      colorScheme="pink"
                      borderRadius="full"
                      leftIcon={<FaInstagram />}
                      px={6}
                    >
                      Event Page
                    </Button>
                  )}
                  <Button
                    as={event.googleMapsLink ? "a" : "button"}
                    href={event.googleMapsLink || "#"}
                    target={event.googleMapsLink ? "_blank" : undefined}
                    size="lg"
                    colorScheme="orange"
                    borderRadius="full"
                    leftIcon={<MdLink />}
                    px={6}
                    onClick={
                      !event.googleMapsLink
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                    cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
                    opacity={!event.googleMapsLink ? 0.7 : 1}
                  >
                    View Map
                  </Button>
                </HStack>
              </GridItem>
            </Grid>

            {/* About Section - Below the image and info cards on desktop */}
            <Box
              bg="white"
              p={6}
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
              mt={8}
              mb={6}
            >
              <Heading fontSize="2xl" mb={4} color="gray.800">
                About the Event
              </Heading>
              <Text fontSize="md" color="gray.700" lineHeight="1.7" mb={4}>
                {event.description || "No description available."}
              </Text>
              {event.musicRatio && (
                <Box mt={4}>
                  <Text fontWeight="semibold" mb={2}>
                    Music Ratio:
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {event.musicRatio}
                  </Text>
                </Box>
              )}
            </Box>

            {/* Reviews Section */}
            <Box
              bg="white"
              p={6}
              borderRadius="12px"
              boxShadow="sm"
              border="1px solid #e2e8f0"
            >
              <Heading fontSize="2xl" mb={4} color="gray.800">
                Reviews
              </Heading>
              <Text color="gray.500" fontStyle="italic">
                Coming soon...
              </Text>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
