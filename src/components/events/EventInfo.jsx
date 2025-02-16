import { Box, HStack, Image, Text, Button, Divider, UnorderedList, useToast, ListItem } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router';
import { FaCalendar, FaMoneyBill, FaStar, FaClock, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Link from 'next/link';

export default function EventInfo({setIsToastVisible}) {
    const router = useRouter();
    const {id} = router.query;
    console.log("id: ", id);
    const toast = useToast();

    const KEY_ID = "rzp_live_5e4WhgJbQt8tjI";

    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }
    
    async function handleBooking () {
      const amount = 500;
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  
        if (!res){
          alert('Razropay failed to load!!')
          return 
        }
  
        const order = await fetch('https://3jvno3zjoxtzp3wpbj4uqa43540unylc.lambda-url.ap-south-1.on.aws/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route:"create-order",
            metadata:{
                    amount: amount, 
                    currency: 'INR', 
                    receipt: 'receipt', 
                    notes: {}
                }
            })
        })
        .then((t) => t.json()) 
  
        console.log("order: ", order);
  
      const options = {
        "key": KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Global Latin Dance Community",
        "description": "Test Transaction",
        "image": "https://www.globallatindancecommunity.com/assets/images/ogLogo4(200).png",
        "order_id": order.data.id, //This is Order ID
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
        "handler": async function (response) {
          console.log(response);
          const data = await fetch('https://3jvno3zjoxtzp3wpbj4uqa43540unylc.lambda-url.ap-south-1.on.aws/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                route: "verify",
                metadata:{
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                }
            })
          }).then( res => res.json());
  
          console.log("Payment Verified: ", data);
          if(data.status === "ok"){
            setIsToastVisible(true);
            toast({
                title: "Payment Successful!",
                description: "Your payment is successfully captured.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
          }else{
            setIsToastVisible(true);
            toast({
                title: "Payment verification failed.",
                description: "Your payment is not authorized, please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
          }
        }
      };
      const paymentObject = new window.Razorpay(options); 
      paymentObject.open();
    }

  return (
    <Box width="100vw" minHeight="80vh" display="flex" flexDirection={"column"} paddingY="20px" paddingX={{lg:"10rem",base:"20px"}}>
        <Image src={`/assets/images/eventImages/${id}.png`} width="100%" height="auto"></Image>
        <Box width="100%" display="flex" flexDirection={{md:"row", base:"column"}} justifyContent={{md:"space-between", base:"center"}} alignItems={{md:"center", base:"start"}}>
            <Box>
                <Text fontSize={{md:"2rem", base:"1.5rem"}} marginTop="1rem" fontWeight={"600"} fontFamily={"montserrat"}>Salsa Dance by Aman Singh</Text>
                <HStack marginBottom="0.5rem"><FaStar color="#ff7c19" size="1.5rem"></FaStar><Text fontSize="1.5rem" fontWeight={"600"} fontFamily={"montserrat"}>9.5/10</Text></HStack>
            </Box>
            <Button bg="#ff7c19" padding="10px 20px" color='white' fontSize="1.2rem" onClick={handleBooking} marginBottom={{base:"1rem", md:""}}>Book Now</Button>
        </Box>
        <Box display="flex" flexWrap={"wrap"} gap='1rem'>
            <HStack><FaCalendar color="#ff7c19" size="1.3rem"></FaCalendar><Text fontSize="1.2rem">Sunday, 21st January 2025</Text></HStack>
            <HStack><FaClock color="#ff7c19" size="1.3rem"></FaClock><Text fontSize="1.2rem">6:30 PM</Text></HStack>
            <HStack><FaLocationDot color="#ff7c19" size="1.3rem"></FaLocationDot><Text fontSize="1.2rem">Cubbon Park</Text></HStack>
            <HStack><FaMoneyBill color="#ff7c19" size="1.3rem"></FaMoneyBill><Text fontSize="1.2rem">Rs 500 /- Onwards</Text></HStack>
        </Box>
        <Divider marginY="0.5rem" marginBottom="1rem"></Divider>
        <Box width="100%" display="flex" gap="1rem" flexDirection={{sm:"row", base:"column"}}>
            <Box width={{sm:"60%", base:"100%"}}>
                <Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>About</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>IT'S LA RUMBA TIME ♥️</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>Make your way to We Neighborhood, on residency road, tonight, 9.00pm onward & groove to DJ Alex's Latin tunes🎶</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>🥳 Social Dancing At Its Finest!</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>Dance under the night sky at La Rumba's perfect venue – a perfect blend of space, ambience and vibrant beats</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>Don't Miss Out 💃 Spread The Word 🗣️</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"}>#lovesocialdancing</Text>
                </Box>
                <Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginTop="0.5rem">Terms and Conditions</Text>
                    <UnorderedList>
                        <ListItem fontSize="1rem" fontFamily={"montserrat"}>The fee includes entry plus cover charges</ListItem>
                        <ListItem fontSize="1rem" fontFamily={"montserrat"}>The ticket is non - refundable</ListItem>
                        <ListItem fontSize="1rem" fontFamily={"montserrat"}>We recommend to arrive at least 15 minutes prior for smooth operation</ListItem>
                    </UnorderedList>
                </Box>
            </Box>
            <Box width={{sm:"40%", base:"100%"}} display="flex" flexDirection={"column"} gap="1rem">
                <Box bg="#FFF2E8" width="100%" borderRadius={"10px"} textAlign={"center"} padding="10px" display="flex" flexDirection={"column"} alignItems={"center"}>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>Artist</Text>
                    <Box width="100px" height="100px" bg="gray" borderRadius="100%"></Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>Aman Singh</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"}>5+ years of dance training, some extra dance creds, 5+ years of dance training, some extra dance creds</Text>
                </Box>
                <Box bg="#FFF2E8" width="100%" padding="10px" borderRadius={"10px"}>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Share this event</Text>
                    <HStack><FaWhatsapp size="2rem" color="gray"/><FaInstagram size="2rem" color="gray"></FaInstagram></HStack>
                </Box>
                <Box bg="#FFF2E8" width='100%' padding="10px" borderRadius="10px">
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Venue</Text>
                    <Text fontSize="1.2rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Cubbon Park</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom="0.5rem">Ambedkar Veedhi, Bengaluru, Karnataka 560001</Text>
                    <Link href="https://www.google.com/maps/place/Sri+Chamarajendra+Park/@12.9779291,77.5951549,849m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bae1673e7d0672f:0xc62ca5a6e943dfb8!8m2!3d12.9779291!4d77.5951549!16zL20vMGJtN2Q1?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"><Text cursor="pointer">View In Google Maps</Text></Link>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}


// route:"/create-order",
//             metadata:{
//                     amount: amount, 
//                     currency: 'INR', 
//                     receipt: 'receipt', 
//                     notes: {}
//                 }
//             })
