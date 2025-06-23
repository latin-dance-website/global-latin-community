import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { RiWhatsappFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import logo from "../../public/assets/images/logo.png";
import Link from "next/link";

const NavbarCompact = ({ isToastVisible }) => {
  return (
    <HStack
      mx="auto"
      color="white"
      py={{ base: "0.2rem", md: "0.5rem", xl: "1rem" }} // reduced vertical padding on mobile
      px={{ base: "1rem", md: "3rem", lg: "4rem", xl: "6rem", "2xl": "8rem" }}
      position="sticky"
      zIndex="1000"
      height={{ base: "48px", md: "7vh", lg: "7vh", xl: "10vh" }} // reduced height on base (mobile)
      alignItems="center"
      top="0"
      w="100vw"
      backdropFilter="auto"
      backdropBlur="0.5rem"
      justifyContent="space-between"
      bgColor="whiteAlpha.100"
      borderBottom="solid 0.1rem"
      bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
    >
      {/* Logo */}
      <Box
        width={{ base: "40%", md: "40%", lg: "50%", xl: "50%", "2xl": "40%" }}
        justifyContent="start"
      >
        <Link href="/">
          <Box
            width={{ base: "90px", md: "70%", lg: "50%", xl: "40%" }}
            height="30px"
            display="flex"
            justifyContent="start"
            alignItems="center"
            _hover={{ cursor: "pointer" }}
            position="relative"
          >
            <Image
              src={logo}
              alt="Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Box>
        </Link>
      </Box>

      {/* Social Icons */}
      <HStack
        width={{ md: "50%", lg: "50%", xl: "50%" }}
        height="full"
        gap="2rem"
        px="1rem"
        justifyContent="center"
        alignItems="center"
        borderRadius="0.5rem"
      >
        <HStack
          gap={{ base: "1rem", md: "1rem", lg: "1.3rem", xl: "1.3rem", "2xl": "2rem" }}
          justifyContent="center"
          bg="white"
          px="1rem"
          py="0.3rem" // reduced vertical padding
          borderRadius="0.4rem"
          bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
        >
          <Text
            color="black"
            fontWeight="semibold"
            fontSize={{ base: "0.75rem", md: "1rem" }}
            fontFamily="montserrat"
            display={{ base: "none", md: "block" }}
          >
            Reach Out To Us:
          </Text>

          <Link href="https://www.instagram.com/bangalore_latin_events?igsh=ZTh6cTdoeXVrYW96" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon as={RiInstagramFill} fontSize="1.4rem" color="brand.pink" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon as={RiYoutubeFill} fontSize="1.4rem" color="red" />
            </a>
          </Link>
          <Link href="https://chat.whatsapp.com/Lr08jfHbN3o1wI4pGAkNxY" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon as={RiWhatsappFill} fontSize="1.4rem" color="#25d366" />
            </a>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default NavbarCompact;
