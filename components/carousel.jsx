import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";

export default function Carousel() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolling, setIsScrolling] = useState(false);

  const prev = () =>
    !isScrolling &&
    setIndex((prev) => (prev <= 0 ? events.length - 1 : prev - 1));

  const next = () =>
    !isScrolling &&
    setIndex((prev) => (prev >= events.length - 1 ? 0 : prev + 1));

  const handleCardClick = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social");
  };

  const scrollTo = (idx) => {
    if (!scrollRef.current || isScrolling || events.length === 0) return;
    setIsScrolling(true);
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const scrollAmount = cardWidth + 12;
    const target = idx * scrollAmount - (isMobile ? 16 : 24);

    container.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(() => setIsScrolling(false), 300);
  };

  useEffect(() => {
  async function load() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.status);

      const today = dayjs();
      const todayFullDay = today.format("dddd"); // e.g., "Monday"
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      const mapped = data
        .filter((e) => e.id && weekdays.includes(e.day)) // Make sure `e.day` exists and is valid
        .map((e) => {
          const targetDayIndex = weekdays.indexOf(e.day); // "Monday" → 1
          const todayIndex = today.day(); // 0 = Sunday, 1 = Monday, etc.
          let offset = targetDayIndex - todayIndex;
          if (offset < 0) offset += 7; // Move to the next week

          const targetDate = today.add(offset, "day");

          return {
            ...e,
            originalDay: e.day, // This stores the full name like "Monday"
            date: targetDate.format("ddd, DD MMM"), // e.g., Mon, 24 Jun
            shortDate: targetDate.format("DD MMM"), // e.g., 24 Jun
            day: targetDate.format("ddd"), // e.g., Mon
            title: e.title?.replace(/\s+/g, " ").trim() || "",
          };
        });

      const filtered = mapped.filter((e) => e.originalDay === todayFullDay);
      setEvents(filtered);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);

  useEffect(() => scrollTo(index), [index, isMobile]);


  if (loading)
    return (
      <Box height="200px" display="flex" justifyContent="center" alignItems="center">
        <Text>Loading events...</Text>
      </Box>
    );

  if (!events.length)
    return (
      <Box height="200px" display="flex" justifyContent="center" alignItems="center">
        <Text>No events found for today</Text>
      </Box>
    );

  // Desktop View - Grid Layout
  if (!isMobile) {
    return (
      <Box width="100%" px={{ base: 2, md: 4 }} pt={2} pb={1}>
        <SimpleGrid columns={{ md: 3, lg: 4 }} spacing={{ md: 4, lg: 5 }} px={{ md: 2, lg: 4 }}>
          {events.map((event) => (
            <Box key={event.id} onClick={() => handleCardClick(event)} cursor="pointer">
              <Box
                borderRadius="8px"
                overflow="hidden"
                bg="white"
                height="100%"
                border="1px solid #e2e8f0"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                <Box width="100%" height="300px" overflow="hidden" display="flex" justifyContent="center" alignItems="center" bg="#f9f9f9">
  <img
    src={event.image}
    alt={event.title}
    style={{
      height: "100%",
      width: "auto",
      objectFit: "cover",
    }}
  />
</Box>

                <VStack p={3} spacing={2} align="flex-start">
                  <Text fontSize="sm" fontWeight="600" noOfLines={2} lineHeight="shorter">
                    {event.title}
                  </Text>
                  <Flex align="center" gap={2}>
                    <FaCalendar size={14} color="#f63c80" />
                    <Text fontSize="xs" color="gray.600">
                      {event.day}, {event.shortDate}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <FaClock size={14} color="#f63c80" />
                    <Text fontSize="xs" color="gray.600">
                      {event.startTime} - {event.endTime}
                    </Text>
                  </Flex>
                  <Flex align="flex-start" gap={2}>
                    <Box mt="2px">
                      <FaLocationDot size={14} color="#f63c80" />
                    </Box>
                    <Text fontSize="xs" color="gray.600" noOfLines={2} lineHeight="shorter">
                      {event.location}
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  // Mobile View - Carousel
  return (
    <Box position="relative" width="100%" overflow="hidden" px={{ base: 2, md: 4 }} pt={2} pb={1}>
    {!isMobile && (
  <>
      <IconButton
        icon={<ChevronLeftIcon boxSize={5} />}
        aria-label="Previous"
        position="absolute"
        top="50%"
        left={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={prev}
        bg="rgba(255,255,255,0.8)"
        color="black"
        _hover={{ bg: "rgba(255,255,255,1)" }}
        borderRadius="full"
        size="sm"
        boxShadow="md"
      />
      <IconButton
        icon={<ChevronRightIcon boxSize={5} />}
        aria-label="Next"
        position="absolute"
        top="50%"
        right={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={next}
        bg="rgba(255,255,255,0.8)"
        color="black"
        _hover={{ bg: "rgba(255,255,255,1)" }}
        borderRadius="full"
        size="sm"
        boxShadow="md"
      />
</>
)}
      <Box
        ref={scrollRef}
        display="flex"
        overflowX="auto"
        gap={{ base: 3, md: 4 }}
        scrollSnapType="x mandatory"
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        py={2}
      >
        {events.map((event) => (
          <Box
            key={event.id}
            flex="none"
            width={{ base: "80%", sm: "60%", md: "50%" }}
            scrollSnapAlign="start"
            onClick={() => handleCardClick(event)}
            cursor="pointer"
          >
            <Box
              borderRadius="8px"
              overflow="hidden"
              bg="white"
              height="100%"
              border="1px solid #e2e8f0"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              <Box width="100%" height="150px" overflow="hidden" display="flex" justifyContent="center" alignItems="center" bg="#f9f9f9">
  <img
    src={event.image}
    alt={event.title}
    style={{
      height: "100%",
      width: "auto",
      objectFit: "cover",
    }}
  />
</Box>

              <Box px={3} pt={2} pb={3}>
  <Text
    fontSize="sm"
    fontWeight="600"
    noOfLines={2}
    lineHeight="shorter"
    mb={2}
  >
    {event.title}
  </Text>

  <Flex align="center" gap={2} mb={1}>
    <FaCalendar size={14} color="#f63c80" />
    <Text fontSize="xs" color="gray.600">
      {event.day}, {event.shortDate}
    </Text>
  </Flex>
  <Flex align="center" gap={2} mb={1}>
    <FaClock size={14} color="#f63c80" />
    <Text fontSize="xs" color="gray.600">
      {event.startTime} - {event.endTime}
    </Text>
  </Flex>
  <Flex align="flex-start" gap={2}>
    <Box mt="2px">
      <FaLocationDot size={14} color="#f63c80" />
    </Box>
    <Text fontSize="xs" color="gray.600" noOfLines={2} lineHeight="shorter">
      {event.location}
    </Text>
  </Flex>
</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <HStack justify="center" mt={3} spacing={2}>
        {events.map((_, i) => (
          <Box
            key={`dot-${i}`}
            w={index === i ? "8px" : "6px"}
            h={index === i ? "8px" : "6px"}
            bg={index === i ? "#f63c80" : "gray.300"}
            borderRadius="full"
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => setIndex(i)}
          />
        ))}
      </HStack>
    </Box>
  );
}