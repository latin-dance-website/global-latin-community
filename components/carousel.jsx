import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
  Flex,
  useMediaQuery,
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
  const [autoPlay, setAutoPlay] = useState(true);
const [isVerySmallMobile] = useMediaQuery("(max-width: 350px)");
  const cardsPerView = isMobile ? 2 : 4;

  const prev = () => {
    if (!isScrolling && events.length > 0) {
      const maxIndex = Math.max(0, events.length - cardsPerView);
      setIndex((prev) => Math.max(0, prev - 1));
      setAutoPlay(false); // Stop autoplay when user interacts
      setTimeout(() => setAutoPlay(true), 10000); // Resume after 10 seconds
    }
  };

  const next = () => {
    if (!isScrolling && events.length > 0) {
      const maxIndex = Math.max(0, events.length - cardsPerView);
      setIndex((prev) => Math.min(maxIndex, prev + 1));
      setAutoPlay(false); // Stop autoplay when user interacts
      setTimeout(() => setAutoPlay(true), 10000); // Resume after 10 seconds
    }
  };

  const handleCardClick = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
    router.push("/events/social");
  };

  const scrollTo = (idx) => {
    if (!scrollRef.current || isScrolling || events.length === 0) return;
    setIsScrolling(true);
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = isMobile ? 16 : 20;
    const scrollAmount = (cardWidth + gap) * idx;

    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setTimeout(() => setIsScrolling(false), 300);
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || res.status);

        const today = dayjs();
        const todayFullDay = today.format("dddd");
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const mapped = data
          .filter((e) => e.id && weekdays.includes(e.day))
          .map((e) => {
            const targetDayIndex = weekdays.indexOf(e.day);
            const todayIndex = today.day();
            let offset = targetDayIndex - todayIndex;
            if (offset < 0) offset += 7;

            const targetDate = today.add(offset, "day");

            return {
              ...e,
              originalDay: e.day,
              date: targetDate.format("ddd, DD MMM"),
              shortDate: targetDate.format("DD MMM"),
              day: targetDate.format("ddd"),
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

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || events.length === 0 || events.length <= cardsPerView) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const maxIndex = Math.max(0, events.length - cardsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, events.length, cardsPerView]);

  if (loading)
    return (
      <Box
        height="200px"
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
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>No events found for today</Text>
      </Box>
    );

  // Calculate if we need navigation arrows
  const showNavigation = events.length > cardsPerView;
  const maxIndex = Math.max(0, events.length - cardsPerView);

 return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      px={{ base: 4, md: 6 }}
      pt={4}
      pb={6}
    >
      {/* Navigation Arrows - keep existing */}
      {showNavigation && (
        <>
          <IconButton
            icon={<ChevronLeftIcon boxSize={6} />}
            aria-label="Previous"
            position="absolute"
            top="50%"
            left={2}
            transform="translateY(-50%)"
            zIndex={10}
            onClick={prev}
            bg="rgba(255,255,255,0.9)"
            color="black"
            _hover={{ bg: "rgba(255,255,255,1)" }}
            borderRadius="full"
            size="md"
            boxShadow="lg"
            isDisabled={index === 0}
          />
          <IconButton
            icon={<ChevronRightIcon boxSize={6} />}
            aria-label="Next"
            position="absolute"
            top="50%"
            right={2}
            transform="translateY(-50%)"
            zIndex={10}
            onClick={next}
            bg="rgba(255,255,255,0.9)"
            color="black"
            _hover={{ bg: "rgba(255,255,255,1)" }}
            borderRadius="full"
            size="md"
            boxShadow="lg"
            isDisabled={index >= maxIndex}
          />
        </>
      )}

      {/* Cards Container */}
      <Box
        ref={scrollRef}
        display="flex"
        overflowX="hidden"
        gap={{ base: 4, md: 5 }}
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        justifyContent={events.length < cardsPerView ? "center" : "flex-start"}
      >
        {events.map((event) => (
          <Box
            key={event.id}
            flex="none"
            width={{
              base: events.length === 1 ? "80%" : `calc(50% - 8px)`,
              md:
                events.length === 1
                  ? "300px"
                  : events.length === 2
                  ? "calc(50% - 10px)"
                  : events.length === 3
                  ? "calc(33.333% - 14px)"
                  : "calc(25% - 15px)",
            }}
            onClick={() => {
              handleCardClick(event);
              setAutoPlay(false);
            }}
            cursor="pointer"
            maxWidth={{ base: "300px", md: "350px" }}
          >
            <Box
              borderRadius="12px"
              overflow="hidden"
              bg="white"
              height={{ base: "320px", md: "380px" }}
              border="1px solid #e2e8f0"
              boxShadow="sm"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "#f63c80",
              }}
              transition="all 0.3s ease"
              display="flex"
              flexDirection="column"
            >
              {/* Event Image */}
              <Box
                width="100%"
                height={{ base: "240px", md: "280px" }}
                overflow="hidden"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#f8f9fa"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Event Details */}
              <Box
                p={{ base: "6px", md: "8px" }}
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                {/* Title */}
                <Text
                  fontSize={{ 
                    base: isVerySmallMobile ? "10px" : "11px", 
                    sm: "12px", 
                    md: "13px" 
                  }}
                  fontWeight="700"
                  noOfLines={1}
                  lineHeight="1.2"
                  color="#E53E3E"
                  width="100%"
                  textAlign="center"
                  mb={{ base: "4px", md: "6px" }}
                  px={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {event.title}
                </Text>

                {/* Mobile Layout */}
                {isMobile ? (
                  <Flex align="flex-start" justify="center" width="100%" gap={0.5} px={0}>
                    {/* Icons column - unchanged */}
                    <VStack spacing={1} align="center" mt="1px" width="12px" flexShrink={0} ml={0.5}>
                      <Box
                        color="#6366f1"
                        fontSize="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="12px"
                        height="12px"
                        mt="-1px"
                      >
                        <FaCalendar />
                      </Box>
                      <Box
                        color="#6366f1"
                        fontSize="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="12px"
                        height="12px"
                        mt="1px"
                      >
                        <FaLocationDot />
                      </Box>
                    </VStack>

                    {/* Content column */}
                    <VStack spacing={1} align="flex-start" width="100%" pr={0}>
                      {/* Date + Time Row */}
                      <Flex align="center" gap={1} flexWrap="nowrap" flex="1" flexShrink={1} width="100%">
                        {/* Date */}
                        <Flex align="center" gap={1} whiteSpace="nowrap" flexShrink={0} ml= "-3px">
                          <Text
                            fontSize={isVerySmallMobile ? "9px" : "10px"}
                            color="gray.600"
                            fontWeight="600"
                            lineHeight="1.3"
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {event.day}, {event.shortDate}
                          </Text>
                        </Flex>
                        {/* Time */}
                        <Flex align="center" gap={0.5} whiteSpace="nowrap" flexShrink={1} minWidth={0} ml="-3px">
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="12px"
                            height="12px"
                          >
                            <FaClock />
                          </Box>
                          <Text
                            fontSize={isVerySmallMobile ? "9px" : "10px"}
                            color="gray.600"
                            fontWeight="600"
                            lineHeight="1.3"  
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {event.startTime}-{event.endTime === '0:00' ? '00:00' : event.endTime} hrs
                          </Text>
                        </Flex>
                      </Flex>

                      {/* Location Row */}
                      <Text
                        fontSize={isVerySmallMobile ? "9px" : "10px"}
                        color="gray.600"
                        fontWeight="600"
                        lineHeight="1.3"
                        wordBreak="break-word"
                        noOfLines={2}
                      >
                        {event.location}
                      </Text>
                    </VStack>
                  </Flex>
                ) : (
                  /* Desktop Layout - unchanged */
                  <>
                    <Flex
                      align="flex-start"
                      justify="center" 
                      width="100%"
                      mb={{ base: "3px", md: "4px" }}
                    >
                      <Flex align="flex-start" gap={{ base: 0.5, md: 2 }} justify="center">
                        <Box
                          flexShrink={0}
                          color="#6366f1"
                          fontSize="13px"
                          mt="1px"
                        >
                          <FaCalendar />
                        </Box>
                        <Text
                          fontSize="12px"
                          color="gray.600"
                          fontWeight="600"
                          noOfLines={1}
                          lineHeight="1.3"
                          textAlign="center"
                          flex="none"
                          wordBreak="break-word"
                        >
                          {event.day}, {event.shortDate} {event.startTime}-{event.endTime}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex 
                      align="center" 
                      justify="center" 
                      width="100%"
                    >
                      <Flex align="center" gap={2}>
                        <Box
                          flexShrink={0}
                          color="#6366f1"
                          fontSize="13px"
                        >
                          <FaLocationDot />
                        </Box>
                        <Text
                          fontSize="12px"
                          color="gray.600"
                          fontWeight="600"
                          noOfLines={2}
                          lineHeight="1.3"
                          textAlign="center"
                          wordBreak="break-word"
                        >
                          {event.location}
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dots Navigation - keep existing */}
      {showNavigation && (
        <HStack justify="center" mt={2} spacing={2}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <Box
              key={`dot-${i}`}
              w={index === i ? "12px" : "8px"}
              h={index === i ? "12px" : "8px"}
              bg={index === i ? "#f63c80" : "gray.300"}
              borderRadius="full"
              transition="all 0.3s ease"
              cursor="pointer"
              onClick={() => {
                setIndex(i);
                setAutoPlay(false);
                setTimeout(() => setAutoPlay(true), 10000);
              }}
              _hover={{ bg: index === i ? "#e91e63" : "gray.400" }}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
}