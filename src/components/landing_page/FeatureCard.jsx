import { VStack, Icon, Heading, Text } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/router";

function FeatureCard({
  icon,
  title,
  description,
  link,
  href,
  setCurrentlySelectedCard,
  setIsSelectedTileEvent
}) {
  const router = useRouter();
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
        cursor:"pointer"
      }}
      onClick={() => {
        if(title === "Events"){
          setIsSelectedTileEvent(true);
        }else{
          setIsSelectedTileEvent(false);
          router.push(href);
        }
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
      <Text
        fontWeight="bold"
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "underline" }}
      >
        {link} <Icon as={FiArrowRight} ml="2" />
      </Text>
    </VStack>
  );
}

export default FeatureCard;
