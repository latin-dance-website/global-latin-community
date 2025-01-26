import { VStack, Icon, Heading, Text, Link } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

function FeatureCard({
  icon,
  title,
  description,
  link,
  setCurrentlySelectedCard,
}) {
  return (
    <VStack
      onMouseOver={() => {
        setCurrentlySelectedCard(title);
      }}
      spacing="1rem"
      align="start"
      bgGradient="linear(to-br, #8EA3F4, #3C71FF)"
      color="white"
      borderRadius="1rem"
      p={{ base: "1rem", md: "2.5rem", lg: "1.5rem", xl: "2rem" }}
      shadow="md"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "lg",
        transition: "0.3s",
      }}
    >
      <Icon as={icon} w={{ base: "10", md: "8" }} h={{ base: "10", md: "8" }} />
      <Heading
        as="h3"
        fontSize={{ base: "0.9rem", md: "1.25rem" }}
        fontFamily={"montserrat"}
      >
        {title}
      </Heading>
      <Text
        fontSize={{ base: "0.8rem", md: "0.875rem" }}
        fontFamily={"montserrat"}
      >
        {description}
      </Text>
      <Link
        href="#"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "underline" }}
      >
        {link} <Icon as={FiArrowRight} ml="2" />
      </Link>
    </VStack>
  );
}

export default FeatureCard;
