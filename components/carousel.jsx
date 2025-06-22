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

export default function AutoCarousel() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolling, setIsScrolling] = useState(false);

  const handleExploreNow = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (response.ok) {
        const today = dayjs().format("YYYY-MM-DD");

        const todaysEvents = data
          .filter((event) => {
            const eventDate = dayjs(event.date).format("YYYY-MM-DD");
            return eventDate === today;
          })
          .map((event) => ({
            ...event,
            date: dayjs(event.date).format("DD/MM/YY"),
          }));

        setEvents(todaysEvents);
      } else {
        console.error("Failed to fetch events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

  const scrollToCard = (idx) => {
    if (scrollRef.current && !isScrolling && events.length > 0) {
      setIsScrolling(true);
      const container = scrollRef.current;
      const card = container.children[0];
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const gap = 16;
      let scrollPosition;

      if (isMobile) {
        scrollPosition = idx * (cardWidth + gap);
      } else {
        const containerWidth = container.offsetWidth;
        scrollPosition = idx * (cardWidth + gap) - (containerWidth - cardWidth) / 2;
      }

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  useEffect(() => {
    scrollToCard(index);
  }, [index, isMobile]);

  const next = () => {
    if (isScrolling || events.length === 0) return;
    
    setIndex((prev) => {
      if (prev >= events.length - 1) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0;
            setIndex(0);
          }
        }, 300);
        return prev;
      }
      return prev + 1;
    });
  };

  const prev = () => {
    if (isScrolling || events.length === 0) return;
    
    setIndex((prev) => {
      if (prev <= 0) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
            setIndex(events.length - 1);
          }
        }, 300);
        return prev;
      }
      return prev - 1;
    });
  };

  if (loading) {
    return (
      <Box height="300px" display="flex" justifyContent="center" alignItems="center">
        <Text>Loading events...</Text>
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box height="300px" display="flex" justifyContent="center" alignItems="center">
        <Text>No events found for today</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" pb={2} width="100%" overflow="hidden" ref={containerRef}>
      {/* Arrows */}
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

      {/* Carousel Content */}
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
        {events.map((event) => (
          <Box
            key={event.id}
            flex="none"
            width={{
              base: "calc(100% - 32px)", 
              md: "calc(33.333% - 11px)" 
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
                  src={event.image || "/assets/images/default-event.jpg"}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box p={4} flexGrow={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {event.title}
                </Text>
                <HStack>
                  <FaCalendar color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">{event.date}</Text>
                </HStack>
                <HStack>
                  <FaClock color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">
                    {event.startTime} - {event.endTime}
                  </Text>
                </HStack>
                <HStack>
                  <FaLocationDot color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">{event.location}</Text>
                </HStack>
              </Box>
              <Box>
                <button
                  style={{
                    backgroundColor: event.buttonColor || "#f63c80",
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

      {/* Dot Indicators */}
      <HStack justify="center" mt="2">
        {events.map((_, idx) => (
          <Box
            key={idx}
            w={index === idx ? "12px" : "8px"}
            h={index === idx ? "12px" : "8px"}
            bg={index === idx ? "blue.500" : "gray.300"}
            borderRadius="full"
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => setIndex(idx)}
          />
        ))}
      </HStack>
    </Box>
  );
}