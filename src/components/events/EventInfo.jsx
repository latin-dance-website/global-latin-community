import { Box, HStack, Image, Text, Button, Divider, UnorderedList, useToast, ListItem, Input, Link } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useRouter } from 'next/router';
import { FaCalendar, FaMoneyBill, FaStar, FaClock, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export default function EventInfo({setIsToastVisible}) {
    const router = useRouter();
    const {id} = router.query;
    console.log("id: ", id);
    const toast = useToast();
    const [isBookNowClicked, setIsBookNowClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidateEmail, setIsValidateEmail] = useState(false);

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
    
    async function handleSingleBooking () {
      const amount = 4000;
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
          // if(data.status === "ok"){
          setIsToastVisible(true);
          toast({
              title: "Payment Successful!",
              description: "Your payment is successfully captured. Enter your email to get notified.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
              onCloseComplete: () => setIsToastVisible(false)
            });
          setIsValidateEmail(true);
          // }else{
          //   setIsToastVisible(true);
          //   toast({
          //       title: "Payment verification failed.",
          //       description: "Your payment is not authorized, please try again.",
          //       status: "error",
          //       duration: 3000,
          //       isClosable: true,
          //       position: "top",
          //       onCloseComplete: () => setIsToastVisible(false)
          //     });
          // }
        }
      };
      const paymentObject = new window.Razorpay(options); 
      paymentObject.open();
    }

    async function handleCoupleBooking () {
      const amount = 7500;
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
          // if(data.status === "ok"){
            setIsToastVisible(true);
            toast({
                title: "Payment Successful!",
                description: "Your payment is successfully captured. Enter your email to get notified.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            setIsValidateEmail(true);
          // }else{
          //   setIsToastVisible(true);
          //   toast({
          //       title: "Payment verification failed.",
          //       description: "Your payment is not authorized, please try again.",
          //       status: "error",
          //       duration: 5000,
          //       isClosable: true,
          //       position: "top",
          //       onCloseComplete: () => setIsToastVisible(false)
          //     });
            
          // }
        }
      };
      const paymentObject = new window.Razorpay(options); 
      paymentObject.open();
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

  const handleSubmit = async () => {
      if (!validateEmail(email)) {
        // Show an error toast
        setIsToastVisible(true);
        toast({
          title: "Error",
          description: "Please enter a valid email address.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setIsToastVisible(false)
        });
      } else {
          setIsLoading(true);
          try {
            const response = await fetch(
              "https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  metadata: { email: email.toLowerCase(), event: "emailUpload", purpose:"paymentSuccessfulEmail"}
                }),
              }
            );
    
            if (response.ok) {
              setEmail("");
              setIsToastVisible(true);
              toast({
                title: "Email sent successfully.",
                description: "Email is sent. You will get it soon.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            }else{
              setIsToastVisible(true);
              toast({
                title: "Server Error",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            }
          } catch (error) {
            console.log("Email sending having problem: ", error);
            setIsToastVisible(true);
              toast({
                title: "Server Error",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
          } finally{
            setIsLoading(false);
          }
      }
    };

  return (
    <Box width="100vw" minHeight="80vh" display="flex" flexDirection={"column"} paddingY="20px" paddingX={{lg:"10rem",base:"20px"}}>
        <Image src={`/assets/images/eventImages/${id}.jpg`} width="100%" height="auto" borderRadius={"15px"}></Image>
        <Box width="100%" display="flex" flexDirection={{md:"row", base:"column"}} justifyContent={{md:"space-between", base:"center"}} alignItems={{md:"center", base:"start"}} gap="1rem">
            <Box>
                <Text fontSize={{md:"2rem", base:"1.5rem"}} marginTop="1rem" fontWeight={"600"} fontFamily={"montserrat"}>Bachata Partnerwork Intensive</Text>
                {/* <HStack marginBottom="0.5rem"><FaStar color="#ff7c19" size="1.5rem"></FaStar><Text fontSize="1.5rem" fontWeight={"600"} fontFamily={"montserrat"}>9.5/10</Text></HStack> */}
            </Box>
            <Box display="flex" flexWrap={"wrap"} flexDirection={"column"} gap='0.5rem' mt="1rem" mb="1rem" justifyContent={"center"}>
              <HStack><FaCalendar color="#ff7c19" size="1.3rem"></FaCalendar><Text fontSize="1.2rem">21st March, 2025: 8PM to 10PM</Text></HStack>
              <HStack><FaCalendar color="#ff7c19" size="1.3rem"></FaCalendar><Text fontSize="1.2rem">22nd March, 2025: 7PM to 10PM</Text></HStack>
              <HStack><FaCalendar color="#ff7c19" size="1.3rem"></FaCalendar><Text fontSize="1.2rem">23rd March, 2025: 7PM to 10PM</Text></HStack>
              {/* <HStack><FaClock color="#ff7c19" size="1.3rem"></FaClock><Text fontSize="1.2rem">6:30 PM onwards</Text></HStack> */}
              {/* <HStack><FaMoneyBill color="#ff7c19" size="1.3rem"></FaMoneyBill><Text fontSize="1.2rem">Rs 500 /- Onwards</Text></HStack> */}
            </Box>
            { isBookNowClicked ?
            <Box display="flex" flexDirection={{base:"column", md:"column"}} width="100%">
              { !isValidateEmail ?
                <>
                 <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"} marginTop="1rem" fontWeight="600">Early Bird Ticket: </Text>
                 <Box position="relative" width={{base:"90vw", md:"full"}} right={{base:"0rem", md:"0"}} marginTop="0.5rem"  marginX={{base:"0rem", sm:"0rem"}} marginBottom={"2rem"} display="flex"  justifyContent={"center"} alignItems={{base:"center", lg:"start", xl:""}} gap={{base:"1rem", sm:""}} flexDirection={{base:"column", xl:"row"}}>
                 <Box
                   height="2.8rem"
                   bg="white"
                   width={{base:"90vw", md:"full"}}
                   border={"3px solid #cccac7"}
                   focusBorderColor="blue.400"
                   borderRadius="18px"
                   display="flex"
                   marginLeft={{base:"-1rem", md:"1rem" }}
                   justifyContent={"center"}
                   paddingLeft={{base:"0rem", md:"1rem"}}
                   alignItems="center"
                   paddingRight={{base:"7rem", sm:"7rem"}}
                   fontWeight="500"
                   fontSize="1rem"
                   whiteSpace={"nowrap"}
                 > Single (₹ 4000)</Box>
                 <Button
                   bg="#ff7c19"
                   position="absolute"
                   right={{sm:"10px", base:"12px", md:"-5px", lg:"-13px", xl:"3px"}}
                   bottom={{xl:"3px", md:"3.5px"}}
                   height="38.8px"
                   width="fit-content"
                   zIndex={"20"}
                   color="white"
                   paddingX={{base:"1rem"}}
                   borderRadius="15px"
                   _hover={{ bg: "#ff7c19" }}
                   _active={{bg: "#ff7c19"}}
                   onClick={handleSingleBooking}
                   marginTop={{base:"0rem", md:"0rem"}}
                   marginBottom={{base:"0rem", md:"0rem"}}
                 >
                   Book Now
                 </Button>
               </Box>
               <Box position="relative" width={{base:"90vw", md:"full"}} marginTop={{md:"0.5rem", base:"-1rem"}} marginX={{base:"0rem", sm:"0rem"}} marginBottom={"2rem"} display="flex" justifyContent={"center"} alignItems={{base:"center", lg:"start", xl:""}} gap={{base:"1rem", sm:""}} flexDirection={{base:"column", xl:"row"}}>
               <Box
                   height="2.8rem"
                   bg="white"
                   width={{base:"90vw", md:"full"}}
                   border={"3px solid #cccac7"}
                   focusBorderColor="blue.400"
                   borderRadius="18px"
                   display="flex"
                   marginLeft={{base:"-1rem", md:"1rem" }}
                   justifyContent={"center"}
                   paddingLeft={{base:"0rem", md:"1rem"}}
                   alignItems="center"
                   paddingRight={{base:"7rem", sm:"7rem"}}
                   fontWeight="500"
                   fontSize="1rem"
                   whiteSpace={"nowrap"}
                 > Couple (₹ 7500)</Box>
                 <Button
                   bg="#ff7c19"
                   position="absolute"
                   right={{sm:"10px", base:"12px", md:"-5px", lg:"-13px", xl:"3px"}}
                   bottom={{xl:"3px", md:"3.5px"}}
                   height="38.8px"
                   width="fit-content"
                   zIndex={"20"}
                   color="white"
                   paddingX={{base:"1rem"}}
                   borderRadius="15px"
                   _hover={{ bg: "#ff7c19" }}
                   _active={{bg: "#ff7c19"}}
                   onClick={handleCoupleBooking}
                   marginTop={{base:"0rem", md:"0rem"}}
                   marginBottom={{base:"0rem", md:"0rem"}}
                 >
                   Book Now
                 </Button>
               </Box>
               </>
               :
               <>
               <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"} marginTop="1rem" fontWeight="600">Email: </Text>
              <Box position="relative" width={{base:"90vw", md:"full"}} marginTop="0.5rem"  marginX={{base:"0rem", sm:"0rem"}} marginBottom={"2rem"} display="flex" justifyContent={"center"} alignItems={{base:"center", lg:"start", xl:""}} gap={{base:"1rem", sm:""}} flexDirection={{base:"column", xl:"row"}}>
                <Input
                  placeholder="Email.."
                  height="2.8rem"
                  width={{base:"90vw", md:"full"}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  bg="white"
                  border={"3px solid #cccac7"}
                  focusBorderColor="blue.400"
                  borderRadius="18px"
                  // marginLeft={{base:"9rem", md:"0"}}
                  paddingRight={{base:"0rem", sm:"7rem"}}
                  isRequired
                />
                <Button
                  bg="black"
                  position="absolute"
                  right={{sm:"3px", base:"0"}}
                  // bottom={{base:"", md:"-8%"}}
                  bottom={"3px"}
                  height="38.8px"
                  width="fit-content"
                  zIndex={"20"}
                  color="white"
                  paddingX={{base:"1rem"}}
                  borderRadius="15px"
                  _hover={{ bg: "black" }}
                  _active={{bg: "black"}}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  marginTop={{base:"0rem", md:"0rem"}}
                  marginBottom={{base:"0rem", md:"0rem"}}
                  // width="10rem"
                >
                  Notify
                </Button>
              </Box>
              </>
              }
          </Box>
          :
          <Button bg="#ff7c19" padding="10px 20px" width="180px" color='white' fontSize="1rem" onClick={() => setIsBookNowClicked(true)} marginBottom={{base:"1rem", md:""}}>Book Now!</Button>
            }
        </Box>
        
        <Divider marginY="0.5rem" marginTop={{base:"-1rem", md:"0.5rem"}} marginBottom="1rem"></Divider>
        <Box width="100%" display="flex" gap="1rem" flexDirection={{sm:"row", base:"column"}}>
            <Box width={{sm:"60%", base:"100%"}}>
                <Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>About</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>Get ready for the next edition of our Bachata Intensive! This time, we’re bringing the incredible Amanda Rishabh from Mumbai to level for a transformative weekend with Amanda @manda_tong & Rishabh @rishabhd05 - Indian J&J Champions on some of the biggest stages in the country! 🏆💃🕺</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>After training under @amargueflowdanceacademy to strengthen their foundation in traditional bachata they expanded this knowledge to modern, sensual and fusion bachata. Now, they bring their expertise to Bangalore for an exclusive Partnerwork Intensive at Dhurii Domlur on March 21st-23rd, 2025!</Text>
                    <Text fontSize="1.2rem" fontFamily={"montserrat"} marginBottom={"0.5rem"} fontWeight="500">✨ What to expect?</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.2rem"}>1. Partner Work & Fundamentals</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Resistance and connection</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Changing instruments individually and with a partner</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}> - Expanding footwork vocabulary</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.2rem"}>2. Musicality & Modern Dance Understanding</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Exploring modern songs and their musical differences</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Incorporating turns and upper body movement</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.2rem"}>3. Turns & Technique Drills</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Teaching all basic turns (lead & follow)</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> -  Cross-over turns, hammerlock, cross grip, haircombs, flicks</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}> - Grip changes, preparation, timing, resistance, balance</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.2rem"}>4. Practice & Creative Application</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"}> - Intensive drills to internalize techniques</Text>
                      <Text fontSize="0.8rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}> -  Applying learned movements creatively to music</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom={"0.5rem"}>Share with your partner & let’s level up together! 💯🔥</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} color="blue.300">#BachataPartnerwork #BangaloreLatinEvents #AmandaAndRishabh #BachataWorkshop #DhuriiBangalore #bachataintensive</Text>
                </Box>
                <Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginTop="0.5rem">Terms and Conditions</Text>
                    <UnorderedList>
                        <ListItem fontSize="1rem" fontFamily={"montserrat"}>The ticket is non - refundable</ListItem>
                    </UnorderedList>
                </Box>
            </Box>
            <Box width={{sm:"40%", base:"100%"}} display="flex" flexDirection={"column"} gap="1rem">
                {/* <Box bg="#FFF2E8" width="100%" borderRadius={"10px"} textAlign={"center"} padding="10px" display="flex" flexDirection={"column"} alignItems={"center"}>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>Artist</Text>
                    <Box width="100px" height="100px" bg="gray" borderRadius="100%"></Box>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>Aman Singh</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"}>5+ years of dance training, some extra dance creds, 5+ years of dance training, some extra dance creds</Text>
                </Box> */}
                {/* <Box bg="#FFF2E8" width="100%" padding="10px" borderRadius={"10px"}>
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Share this event</Text>
                    <HStack><FaWhatsapp size="2rem" color="gray"/><FaInstagram size="2rem" color="gray"></FaInstagram></HStack>
                </Box> */}
                <Box bg="#FFF2E8" width='100%' padding="10px" borderRadius="10px">
                    <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Venue</Text>
                    <Text fontSize="1.2rem" fontWeight="600" fontFamily={"montserrat"} marginBottom="0.5rem">Dhurii Academy of Arts</Text>
                    <Text fontSize="1rem" fontFamily={"montserrat"} marginBottom="0.5rem">Domlur, Bengaluru, Karnataka 560071</Text>
                    <Link href="https://maps.app.goo.gl/WcGRLCwbbuXe7ErM6?g_st=iw" isExternal><Text cursor="pointer">View In Google Maps</Text></Link>
                    <Box mt={2}>
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.857219532653!2d77.6388245!3d12.9562128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153e2e11cd31%3A0x302df0f97fe220b9!2sDhurii%20Academy%20of%20Arts!5e1!3m2!1sen!2sin!4v1741606142543!5m2!1sen!2sin" 
                        width="100%" 
                        height="400" 
                        style={{borderRadius: "15px"}}
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                      </iframe>
                    </Box>
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
