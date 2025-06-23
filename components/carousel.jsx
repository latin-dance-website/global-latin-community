import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function AutoCarousel() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolling, setIsScrolling] = useState(false);

  const handleExploreNow = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social");
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || res.status);

        const today = dayjs().format("YYYY-MM-DD");
        const filtered = data.filter(
          (e) => e.id && dayjs(e.date).isSame(today, "day")
        );
        const mapped = filtered.map((e) => ({
          ...e,
          date: dayjs(e.date).format("DD/MM/YY"),
        }));
        setEvents(mapped);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const scrollTo = (idx) => {
    if (!scrollRef.current || isScrolling || events.length === 0) return;
    setIsScrolling(true);
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const scrollAmount = cardWidth + 16;
    const target = isMobile
      ? idx * scrollAmount
      : idx * scrollAmount - (container.offsetWidth - cardWidth) / 2;

    container.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(() => setIsScrolling(false), 300);
  };

  useEffect(() => scrollTo(index), [index, isMobile]);

  const next = () =>
    !isScrolling &&
    setIndex((prev) => (prev >= events.length - 1 ? 0 : prev + 1));

  const prev = () =>
    !isScrolling &&
    setIndex((prev) => (prev <= 0 ? events.length - 1 : prev - 1));

  if (loading)
    return (
      <Box
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Loading events...</Text>
      </Box>
    );

  if (!events.length)
    return (
      <Box
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>No events found for today</Text>
      </Box>
    );

  return (
    <Box position="relative" pb={2} width="100%" overflow="hidden">
      <IconButton
        icon={<ChevronLeftIcon boxSize={isMobile ? 6 : 8} />}
        aria-label="Previous"
        position="absolute"
        top="46%"
        left={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={prev}
        bg="rgb(246, 108, 193)"
        _hover={{ bg: "rgba(0,0,0,0.6)" }}
        borderRadius="full"
        size={isMobile ? "sm" : "md"}
      />
      <IconButton
        icon={<ChevronRightIcon boxSize={isMobile ? 6 : 8} />}
        aria-label="Next"
        position="absolute"
        top="46%"
        right={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={next}
        bg="rgb(246, 108, 193)"
        _hover={{ bg: "rgba(0,0,0,0.6)" }}
        borderRadius="full"
        size={isMobile ? "sm" : "md"}
      />

      <Box
        ref={scrollRef}
        display="flex"
        overflowX="auto"
        gap={4}
        scrollSnapType="x mandatory"
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        px={{ base: 4, md: 0 }}
      >
        {events.map((event, i) => (
          <Box
            key={event.id}
            flex="none"
            width={{
              base: "calc(100% - 32px)",
              md: "calc(33.333% - 11px)",
            }}
            scrollSnapAlign="center"
            mx="auto"
          >
            <Box
              borderRadius="20px"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              display="flex"
              flexDirection="column"
              height="100%"
            >
              <Box height="200px" width="100%" overflow="hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box p={4} flexGrow={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {event.title}
                </Text>
                <HStack>
                  <FaCalendar color={event.buttonColor} />
                  <Text fontSize="sm">{event.date}</Text>
                </HStack>
                <HStack>
                  <FaClock color={event.buttonColor} />
                  <Text fontSize="sm">
                    {event.startTime} - {event.endTime}
                  </Text>
                </HStack>
                <HStack>
                  <FaLocationDot color={event.buttonColor} />
                  <Text fontSize="sm">{event.location}</Text>
                </HStack>
              </Box>
              <Box>
                <button
                  style={{
                    backgroundColor: event.buttonColor,
                    color: "white",
                    width: "100%",
                    border: "none",
                    padding: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleExploreNow(event)}
                >
                  Explore Now
                </button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <HStack justify="center" mt="2">
        {events.map((_, i) => (
          <Box
            key={`dot-${i}`}
            w={index === i ? "12px" : "8px"}
            h={index === i ? "12px" : "8px"}
            bg={index === i ? "blue.500" : "gray.300"}
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
