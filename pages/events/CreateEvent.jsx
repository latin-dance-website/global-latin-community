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
  Alert,
  AlertIcon,
  List,
  ListItem,
  Container,
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
    currency: 'INR',
    fees: '',
    location: '',
    venue: '',
    handle: '',
    googleMaps: '',
    eventPosterLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const toast = useToast();

  // Define all required fields
  const requiredFields = [
    'name', 'mobileNumber', 'mailId', 'country', 'city', 'address',
    'eventName', 'eventCity', 'day', 'date', 'eventDescription',
    'eventPageLink', 'startTime', 'endTime', 'musicRatio', 'fees',
    'location', 'venue', 'handle', 'googleMaps', 'eventPosterLink'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const missing = [];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        missing.push(field);
      }
    });
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMissingFields([]);

    // Validate all required fields
    const missing = validateForm();
    if (missing.length > 0) {
      setMissingFields(missing);
      toast({
        title: 'Validation Error',
        description: `Please fill in all required fields (${missing.length} missing)`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
      }

      const result = await response.json();

      if (!response.ok) {
        if (result.missingFields) {
          setMissingFields(result.missingFields);
        }
        throw new Error(result.message || 'Failed to create event');
      }

      toast({
        title: 'Success!',
        description: result.message || 'Event created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
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
        currency: 'INR',
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
        description: error.message.includes('<!DOCTYPE') 
          ? 'Server returned an HTML page instead of JSON. Check your API endpoint.'
          : error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldMissing = (fieldName) => missingFields.includes(fieldName);

  const getFieldLabel = (fieldName) => {
    const labels = {
      name: 'Name',
      mobileNumber: 'Mobile Number',
      mailId: 'Email ID',
      country: 'Country',
      city: 'City',
      address: 'Address',
      eventName: 'Event Name',
      eventCity: 'Event City',
      day: 'Day',
      date: 'Date',
      eventDescription: 'Event Description',
      eventPageLink: 'Event Page Link',
      startTime: 'Start Time',
      endTime: 'End Time',
      musicRatio: 'Music Ratio',
      fees: 'Fees',
      location: 'Location',
      venue: 'Venue',
      handle: 'Handle',
      googleMaps: 'Google Maps Link',
      eventPosterLink: 'Event Poster Link'
    };
    return labels[fieldName] || fieldName;
  };

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
      py={8}
      px={4}
    >
      <Container maxW="4xl" centerContent>
        <Box 
          bg="rgba(255, 255, 255, 0.95)" 
          backdropFilter="blur(10px)"
          rounded="3xl" 
          shadow="2xl" 
          overflow="hidden"
          border="1px solid rgba(255, 255, 255, 0.2)"
          w="full"
        >
          {/* Header */}
          <Box 
            bgGradient="linear(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" 
            p={8} 
            color="white"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgGradient: 'linear(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(240, 147, 251, 0.8) 100%)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Box position="relative" zIndex={1}>
              <Heading as="h1" size="2xl" textAlign="center" mb={3} fontWeight="bold">
                Create Your Own Event
              </Heading>
              <Text textAlign="center" fontSize="lg" opacity={0.95}>
                Host your own Latin dance event and connect with the community
              </Text>
            </Box>
          </Box>

          {/* Form */}
          <Box p={8}>
            {missingFields.length > 0 && (
              <Alert status="error" mb={6} borderRadius="xl" bg="red.50" borderColor="red.200">
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold" color="red.800">
                    Please fill in these required fields:
                  </Text>
                  <List styleType="disc" ml={4} mt={2}>
                    {missingFields.map((field) => (
                      <ListItem key={field} color="red.700">
                        {getFieldLabel(field)}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <VStack spacing={8} align="stretch">
                {/* Personal Information */}
                <Box>
                  <Heading as="h2" size="lg" color="gray.800" mb={6} display="flex" alignItems="center">
                    <Icon as={User} mr={3} color="purple.600" boxSize={7} />
                    Personal Information
                  </Heading>
                </Box>

                <FormControl isRequired isInvalid={isFieldMissing('name')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Name *</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('name') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('name') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('mobileNumber')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Phone} mr={2} boxSize={4} />
                    Mobile Number (Including Country Code) *
                  </FormLabel>
                  <Input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('mobileNumber') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('mobileNumber') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('mailId')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Mail} mr={2} boxSize={4} />
                    Email ID *
                  </FormLabel>
                  <Input
                    type="email"
                    name="mailId"
                    value={formData.mailId}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('mailId') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('mailId') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('country')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Globe} mr={2} boxSize={4} />
                    Country *
                  </FormLabel>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('country') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('country') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('city')}>
                  <FormLabel fontWeight="semibold" color="gray.700">City *</FormLabel>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('city') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('city') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('address')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={MapPin} mr={2} boxSize={4} />
                    Address *
                  </FormLabel>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('address') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('address') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                    rows={3}
                  />
                </FormControl>

                {/* Event Information */}
                <Box mt={10}>
                  <Heading as="h2" size="lg" color="gray.800" mb={6} display="flex" alignItems="center">
                    <Icon as={Calendar} mr={3} color="purple.600" boxSize={7} />
                    Event Information
                  </Heading>
                </Box>

                <FormControl isRequired isInvalid={isFieldMissing('eventName')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Event Name You Want to Create *</FormLabel>
                  <Input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="Enter your event name"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventName') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventName') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventCity')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Event City *</FormLabel>
                  <Input
                    type="text"
                    name="eventCity"
                    value={formData.eventCity}
                    onChange={handleInputChange}
                    placeholder="Event city"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventCity') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventCity') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('day')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Day *</FormLabel>
                  <Select
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    placeholder="Select Day"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('day') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('day') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Select>
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('date')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Date *</FormLabel>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('date') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('date') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventPageLink')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Event Page Link *</FormLabel>
                  <Input
                    type="url"
                    name="eventPageLink"
                    value={formData.eventPageLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/event"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventPageLink') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventPageLink') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventDescription')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Event Description *</FormLabel>
                  <Textarea
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your event in detail..."
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventDescription') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventDescription') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                    rows={4}
                  />
                </FormControl>

                {/* Time and Music */}
                <FormControl isRequired isInvalid={isFieldMissing('startTime')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Clock} mr={2} boxSize={4} />
                    Start Time *
                  </FormLabel>
                  <Input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('startTime') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('startTime') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('endTime')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Clock} mr={2} boxSize={4} />
                    End Time *
                  </FormLabel>
                  <Input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('endTime') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('endTime') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('musicRatio')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Music} mr={2} boxSize={4} />
                    Music Ratio *
                  </FormLabel>
                  <Input
                    type="text"
                    name="musicRatio"
                    value={formData.musicRatio}
                    onChange={handleInputChange}
                    placeholder="e.g., 70% Salsa, 30% Bachata"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('musicRatio') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('musicRatio') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={DollarSign} mr={2} boxSize={4} />
                    Currency
                  </FormLabel>
                  <Select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                  </Select>
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('fees')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Fees *</FormLabel>
                  <Input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('fees') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('fees') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('location')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Location *</FormLabel>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('location') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('location') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('venue')}>
                  <FormLabel display="flex" alignItems="center" fontWeight="semibold" color="gray.700">
                    <Icon as={Building} mr={2} boxSize={4} />
                    Venue *
                  </FormLabel>
                  <Input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Venue name"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('venue') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('venue') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('handle')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Handle *</FormLabel>
                  <Input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    placeholder="@youreventhandle"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('handle') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('handle') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('googleMaps')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Google Maps Link *</FormLabel>
                  <Input
                    type="url"
                    name="googleMaps"
                    value={formData.googleMaps}
                    onChange={handleInputChange}
                    placeholder="https://maps.google.com/..."
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('googleMaps') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('googleMaps') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventPosterLink')}>
                  <FormLabel fontWeight="semibold" color="gray.700">Event Poster Link *</FormLabel>
                  <Input
                    type="url"
                    name="eventPosterLink"
                    value={formData.eventPosterLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/poster.jpg"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventPosterLink') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventPosterLink') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size="lg"
                  />
                </FormControl>

                {/* Submit Button */}
                <Flex justify="center" mt={10}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Creating Event..."
                    bgGradient="linear(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
                    color="white"
                    size="lg"
                    w="full"
                    maxW="md"
                    h="14"
                    fontSize="lg"
                    fontWeight="bold"
                    borderRadius="xl"
                    _hover={{
                      bgGradient: "linear(135deg, #5a67d8 0%, #6b46c1 50%, #e879f9 100%)",
                      transform: "translateY(-2px)",
                      shadow: "xl",
                    }}
                    _active={{
                      transform: "translateY(0px)",
                    }}
                    transition="all 0.2s"
                    shadow="lg"
                  >
                    Start Creating Event
                  </Button>
                </Flex>
              </VStack>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateEvent;