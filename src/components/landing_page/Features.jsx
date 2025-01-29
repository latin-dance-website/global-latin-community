import {
  Box,
  Fade,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpoint,
  VStack,
} from "@chakra-ui/react";
import {
  FiMusic,
  FiPlay,
  FiTrendingUp,
  FiGlobe,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import FeatureCard from "./FeatureCard";
import { useEffect, useMemo, useState } from "react";

const Features = () => {
  const [currentlySelectedCard, setCurrentlySelectedCard] =
    useState("Music & Culture");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dynamicText, setDynamicText] = useState(
    "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture."
  );
  const cardData = useMemo(
    () => [
      {
        icon: FiMusic,
        title: "Music & Culture",
        description:
          "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture.",
        link: "Explore",
        href: "/music-culture",
      },
      {
        icon: FiPlay,
        title: "Tutorials & Courses",
        description:
          "Access beginner to advanced tutorials and structured courses designed for your growth, wherever you are.",
        link: "Start Learning",
        href: "/tutorial-courses",
      },
      {
        icon: FiTrendingUp,
        title: "Events",
        description:
          "Attend exclusive workshops, bootcamps, and live events hosted by top Latin dance experts.",
        link: "See Events",
        href: "/events",
      },
      {
        icon: FiUser,
        title: "Brand Building",
        description:
          "Create your professional profile, showcase your achievements, and grow your influence as a dancer or instructor.",
        link: "Start Building",
        href: "/brand",
      },
      {
        icon: FiGlobe,
        title: "Global Community",
        description:
          "Join a vibrant global network of dancers. Share your journey, collaborate, and celebrate together.",
        link: "Join The Community",
        href: "/global-community",
      },
      {
        icon: FiShoppingBag,
        title: "E-Commerce",
        description:
          "Discover premium dancewear, accessories, and lifestyle products that elevate your practice and performances.",
        link: "Shop Now",
        href: "/ecommerce",
      },
    ],
    []
  );

  useEffect(() => {
    setIsTransitioning(false);
    console.log(currentlySelectedCard);

    const timeoutId = setTimeout(() => {
      const selectedCard = cardData.find(
        (obj) => obj.title === currentlySelectedCard
      );

      setDynamicText(selectedCard.description);
      console.log(currentlySelectedCard);
      setIsTransitioning(true);
    }, 600);

    // Cleanup timeout on component unmount or when dependencies change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardData, currentlySelectedCard]);

  let currentBreakpoint = useBreakpoint();

  return (
    <VStack
      px={{ base: "1rem", md: "4rem", lg: "4rem", xl: "7rem", "2xl": "10rem" }}
      paddingBottom={{ md: "3rem", lg: "3rem", xl: "5rem", "2xl": "8rem" }}
      bgColor="transparent"
      marginTop={{ base: "3rem", md: "2rem", xl: "0rem", "2xl": "0rem" }}
    >
      {/* Header */}
      <VStack
        spacing={{
          base: "0.75rem",
          md: "0.75rem",
          lg: "0.75rem",
          xl: "0.75rem",
          "2xl": "1rem",
        }}
        textAlign="center"
        mb="10"
      >
        <Heading
          as="h1"
          fontSize={{
            base: "2rem",
            md: "2.2rem",
            lg: "2.5rem",
            xl: "3rem",
            "2xl": "3rem",
          }}
          fontFamily="montserrat"
        >
          Step Into The World Of Latin Dancing
        </Heading>
        <Box
          height="0.2rem"
          width="20rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
        />
        {currentBreakpoint !== "base" && (
          <>
            <Text
              fontSize={{ base: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" }}
              fontStyle="italic"
              marginTop="1rem"
              fontFamily={"montserrat"}
            >
              Here you can,{" "}
            </Text>
            <Fade
              transition={{ exit: { duration: 0.3 }, enter: { duration: 0.3 } }}
              in={isTransitioning}
            >
              <Text
                as="span"
                fontWeight="bold"
                fontSize={{
                  base: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.2rem",
                }}
                fontStyle="italic"
                fontFamily={"montserrat"}
              >
                {dynamicText}
              </Text>
            </Fade>
          </>
        )}
      </VStack>

      {/* Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        columnGap={{
          base: "1rem",
          md: "3.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "5rem",
        }}
        rowGap={{ base: "1rem", md: "2rem", lg: "3rem", xl: "4rem" }}
        width={{ base: "75%", md: "100%", lg: "100%", xl: "80%", "2xl": "75%" }}
      >
        {cardData.map((card, index) => (
          <GridItem key={index}>
            <FeatureCard
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              href={card.href}
              setCurrentlySelectedCard={setCurrentlySelectedCard}
            />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Features;
