import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Text,
  useToast,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Music,
  Globe,
  Mail,
  Phone,
  User,
  Building,
} from 'lucide-react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    mailId: '',
    country: '',
    city: '',
    address: '',
    eventName: '',
    eventCity: '',
    day: '',
    date: '',
    eventDescription: '',
    eventPageLink: '',
    startTime: '',
    endTime: '',
    musicRatio: '',
    currency: '',
    fees: '',
    location: '',
    venue: '',
    handle: '',
    googleMaps: '',
    eventPosterLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter((field) => !formData[field].trim());

    if (emptyFields.length > 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      toast({
        title: 'Success',
        description: 'We will contact you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        mobileNumber: '',
        mailId: '',
        country: '',
        city: '',
        address: '',
        eventName: '',
        eventCity: '',
        day: '',
        date: '',
        eventDescription: '',
        eventPageLink: '',
        startTime: '',
        endTime: '',
        musicRatio: '',
        currency: '',
        fees: '',
        location: '',
        venue: '',
        handle: '',
        googleMaps: '',
        eventPosterLink: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error submitting form. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-br, purple.600, pink.500, red.500)" p={4}>
      <Box maxW="4xl" mx="auto">
        <Box bg="white" rounded="2xl" shadow="2xl" overflow="hidden">
          {/* Header */}
          <Box bgGradient="linear(to-r, purple.600, pink.600)" p={6} color="white">
            <Heading as="h1" size="xl" textAlign="center" mb={2}>
              Create Your Own Event
            </Heading>
            <Text textAlign="center" opacity={0.9}>
              Host your own Latin dance event and connect with the community
            </Text>
          </Box>

          {/* Form */}
          <Box p={6} md={{ p: 8 }}>
            <VStack spacing={6} align="stretch">
              {/* Personal Information */}
              <Box>
                <Heading as="h2" size="lg" color="gray.800" mb={4} display="flex" alignItems="center">
                  <Icon as={User} mr={2} color="purple.600" boxSize={6} />
                  Personal Information
                </Heading>
              </Box>

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Phone} mr={1} boxSize={4} />
                  Mobile Number (Including Country Code)
                </FormLabel>
                <Input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Mail} mr={1} boxSize={4} />
                  Email ID
                </FormLabel>
                <Input
                  type="email"
                  name="mailId"
                  value={formData.mailId}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Globe} mr={1} boxSize={4} />
                  Country
                </FormLabel>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={MapPin} mr={1} boxSize={4} />
                  Address
                </FormLabel>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                />
              </FormControl>

              {/* Event Information */}
              <Box mt={8}>
                <Heading as="h2" size="lg" color="gray.800" mb={4} display="flex" alignItems="center">
                  <Icon as={Calendar} mr={2} color="purple.600" boxSize={6} />
                  Event Information
                </Heading>
              </Box>

              <FormControl isRequired>
                <FormLabel>Event Name You Want to Create</FormLabel>
                <Input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="Enter your event name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event City</FormLabel>
                <Input
                  type="text"
                  name="eventCity"
                  value={formData.eventCity}
                  onChange={handleInputChange}
                  placeholder="Event city"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Day</FormLabel>
                <Select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event Page Link</FormLabel>
                <Input
                  type="url"
                  name="eventPageLink"
                  value={formData.eventPageLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/event"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event Description</FormLabel>
                <Textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your event in detail..."
                />
              </FormControl>

              {/* Time and Music */}
              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Clock} mr={1} boxSize={4} />
                  Start Time
                </FormLabel>
                <Input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Clock} mr={1} boxSize={4} />
                  End Time
                </FormLabel>
                <Input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Music} mr={1} boxSize={4} />
                  Music Ratio
                </FormLabel>
                <Input
                  type="text"
                  name="musicRatio"
                  value={formData.musicRatio}
                  onChange={handleInputChange}
                  placeholder="e.g., 70% Salsa, 30% Bachata"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={DollarSign} mr={1} boxSize={4} />
                  Currency
                </FormLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Fees</FormLabel>
                <Input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={Building} mr={1} boxSize={4} />
                  Venue
                </FormLabel>
                <Input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Venue name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Handle</FormLabel>
                <Input
                  type="text"
                  name="handle"
                  value={formData.handle}
                  onChange={handleInputChange}
                  placeholder="@youreventhandle"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Google Maps Link</FormLabel>
                <Input
                  type="url"
                  name="googleMaps"
                  value={formData.googleMaps}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event Poster Link</FormLabel>
                <Input
                  type="url"
                  name="eventPosterLink"
                  value={formData.eventPosterLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/poster.jpg"
                />
              </FormControl>
            </VStack>

            {/* Submit Button */}
            <Flex justify="center" mt={8}>
              <Button
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Creating Event..."
                colorScheme="purple"
                size="lg"
                w="full"
                md={{ w: 'auto' }}
              >
                Start Creating Event
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateEvent;