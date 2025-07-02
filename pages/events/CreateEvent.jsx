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
  InputGroup,
  InputLeftAddon,
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

// Country codes for phone numbers
const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+7', country: 'Russia' },
  { code: '+34', country: 'Spain' },
  { code: '+39', country: 'Italy' },
  { code: '+52', country: 'Mexico' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+90', country: 'Turkey' },
  { code: '+31', country: 'Netherlands' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+358', country: 'Finland' },
  { code: '+48', country: 'Poland' },
  { code: '+380', country: 'Ukraine' },
  { code: '+351', country: 'Portugal' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+36', country: 'Hungary' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+30', country: 'Greece' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+63', country: 'Philippines' },
  { code: '+62', country: 'Indonesia' },
  { code: '+60', country: 'Malaysia' },
  { code: '+66', country: 'Thailand' },
  { code: '+84', country: 'Vietnam' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+977', country: 'Nepal' },
  { code: '+20', country: 'Egypt' },
  { code: '+254', country: 'Kenya' },
  { code: '+234', country: 'Nigeria' },
  { code: '+233', country: 'Ghana' },
  { code: '+212', country: 'Morocco' },
  { code: '+216', country: 'Tunisia' },
  { code: '+213', country: 'Algeria' },
  // More country codes...
];

// List of countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// List of currencies
const currencies = [
  { code: "USD", name: "US Dollar ($)" },
  { code: "EUR", name: "Euro (€)" },
  { code: "GBP", name: "British Pound (£)" },
  { code: "INR", name: "Indian Rupee (₹)" },
  { code: "JPY", name: "Japanese Yen (¥)" },
  { code: "CNY", name: "Chinese Yuan (¥)" },
  { code: "AUD", name: "Australian Dollar (A$)" },
  { code: "CAD", name: "Canadian Dollar (C$)" },
  { code: "CHF", name: "Swiss Franc (CHF)" },
  { code: "HKD", name: "Hong Kong Dollar (HK$)" },
  { code: "SGD", name: "Singapore Dollar (S$)" },
  { code: "SEK", name: "Swedish Krona (kr)" },
  { code: "NOK", name: "Norwegian Krone (kr)" },
  { code: "NZD", name: "New Zealand Dollar (NZ$)" },
  { code: "MXN", name: "Mexican Peso (Mex$)" },
  { code: "BRL", name: "Brazilian Real (R$)" },
  { code: "RUB", name: "Russian Ruble (₽)" },
  { code: "ZAR", name: "South African Rand (R)" },
  { code: "TRY", name: "Turkish Lira (₺)" },
  { code: "AED", name: "UAE Dirham (د.إ)" },
  { code: "SAR", name: "Saudi Riyal (ر.س)" },
  { code: "PLN", name: "Polish Złoty (zł)" },
  { code: "THB", name: "Thai Baht (฿)" },
  { code: "IDR", name: "Indonesian Rupiah (Rp)" },
  { code: "MYR", name: "Malaysian Ringgit (RM)" },
  { code: "PHP", name: "Philippine Peso (₱)" },
  { code: "KRW", name: "South Korean Won (₩)" },
  { code: "EGP", name: "Egyptian Pound (E£)" },
  { code: "NGN", name: "Nigerian Naira (₦)" },
  { code: "CLP", name: "Chilean Peso (CLP$)" },
  { code: "ARS", name: "Argentine Peso (AR$)" },
  { code: "COP", name: "Colombian Peso (COL$)" },
  { code: "PEN", name: "Peruvian Sol (S/)" },
  { code: "DKK", name: "Danish Krone (kr)" },
  { code: "HUF", name: "Hungarian Forint (Ft)" },
  { code: "CZK", name: "Czech Koruna (Kč)" },
  { code: "ILS", name: "Israeli New Shekel (₪)" },
  { code: "CRC", name: "Costa Rican Colón (₡)" },
  { code: "KES", name: "Kenyan Shilling (KSh)" },
  { code: "MAD", name: "Moroccan Dirham (د.م.)" },
  { code: "QAR", name: "Qatari Riyal (ر.ق)" },
  { code: "UAH", name: "Ukrainian Hryvnia (₴)" },
  { code: "RON", name: "Romanian Leu (lei)" },
  { code: "BDT", name: "Bangladeshi Taka (৳)" },
  { code: "VND", name: "Vietnamese Dong (₫)" },
  { code: "PKR", name: "Pakistani Rupee (₨)" },
  { code: "KWD", name: "Kuwaiti Dinar (د.ك)" },
  { code: "ISK", name: "Icelandic Króna (kr)" },
  { code: "BGN", name: "Bulgarian Lev (лв)" },
  { code: "HRK", name: "Croatian Kuna (kn)" },
  // More currencies...
];

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+1',
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
    currency: 'USD',
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
        countryCode: '+1',
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
        currency: 'USD',
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
      py={{ base: 4, md: 8 }}
      px={{ base: 2, md: 4 }}
    >
      <Container maxW="4xl" centerContent px={{ base: 0, sm: 2 }}>
        <Box 
          bg="rgba(255, 255, 255, 0.95)" 
          backdropFilter="blur(10px)"
          rounded={{ base: "xl", md: "3xl" }}
          shadow="2xl" 
          overflow="hidden"
          border="1px solid rgba(255, 255, 255, 0.2)"
          w="full"
        >
          {/* Header */}
          <Box 
            bgGradient="linear(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" 
            p={{ base: 4, md: 8 }}
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
              <Heading 
                as="h1" 
                size={{ base: "lg", md: "2xl" }}
                textAlign="center" 
                mb={{ base: 2, md: 3 }}
                fontWeight="bold"
              >
                Create Your Own Event
              </Heading>
              <Text 
                textAlign="center" 
                fontSize={{ base: "sm", md: "lg" }}
                opacity={0.95}
              >
                Host your Latin dance event
              </Text>
            </Box>
          </Box>

          {/* Form */}
          <Box p={{ base: 4, md: 8 }}>
            {missingFields.length > 0 && (
              <Alert 
                status="error" 
                mb={{ base: 4, md: 6 }}
                borderRadius="xl" 
                bg="red.50" 
                borderColor="red.200"
                fontSize={{ base: "sm", md: "md" }}
              >
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
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                {/* Personal Information */}
                <Box>
                  <Heading 
                    as="h2" 
                    size={{ base: "md", md: "lg" }}
                    color="gray.800" 
                    mb={{ base: 4, md: 6 }}
                    display="flex" 
                    alignItems="center"
                  >
                    <Icon as={User} mr={{ base: 2, md: 3 }} color="purple.600" boxSize={{ base: 5, md: 7 }} />
                    Personal Info
                  </Heading>
                </Box>

                <FormControl isRequired isInvalid={isFieldMissing('name')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Name
                  </FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('name') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('name') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('mobileNumber')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={Phone} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Mobile
                  </FormLabel>
                  <InputGroup size={{ base: "md", md: "lg" }}>
                    <InputLeftAddon 
                      bg="gray.100" 
                      color="gray.800" 
                      px={{ base: 1, md: 2 }}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={isFieldMissing('mobileNumber') ? "red.300" : "gray.200"}
                      borderRight="none"
                    >
                      <Select 
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        variant="unstyled"
                        fontSize={{ base: "sm", md: "md" }}
                        p={0}
                        w={{ base: "70px", md: "auto" }}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.code}
                          </option>
                        ))}
                      </Select>
                    </InputLeftAddon>
                    <Input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="123 456 7890"
                      bg="white"
                      border="2px solid"
                      borderColor={isFieldMissing('mobileNumber') ? "red.300" : "gray.200"}
                      _hover={{ borderColor: isFieldMissing('mobileNumber') ? "red.400" : "purple.300" }}
                      _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                      borderRadius="lg"
                      borderLeftRadius="0"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('mailId')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={Mail} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    name="mailId"
                    value={formData.mailId}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('mailId') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('mailId') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('country')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={Globe} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Country
                  </FormLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Select country"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('country') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('country') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('city')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    City
                  </FormLabel>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Your city"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('city') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('city') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('address')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={MapPin} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Address
                  </FormLabel>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full address"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('address') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('address') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                    rows={2}
                  />
                </FormControl>

                {/* Event Information */}
                <Box mt={{ base: 6, md: 10 }}>
                  <Heading 
                    as="h2" 
                    size={{ base: "md", md: "lg" }}
                    color="gray.800" 
                    mb={{ base: 4, md: 6 }}
                    display="flex" 
                    alignItems="center"
                  >
                    <Icon as={Calendar} mr={{ base: 2, md: 3 }} color="purple.600" boxSize={{ base: 5, md: 7 }} />
                    Event Info
                  </Heading>
                </Box>

                <FormControl isRequired isInvalid={isFieldMissing('eventName')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Event Name
                  </FormLabel>
                  <Input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="Your event name"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventName') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventName') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventCity')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Event City
                  </FormLabel>
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
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <Flex gap={{ base: 2, md: 4 }} direction={{ base: "column", sm: "row" }}>
                  <FormControl isRequired isInvalid={isFieldMissing('day')} flex="1">
                    <FormLabel 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Day
                    </FormLabel>
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
                      size={{ base: "md", md: "lg" }}
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

                  <FormControl isRequired isInvalid={isFieldMissing('date')} flex="1">
                    <FormLabel 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Date
                    </FormLabel>
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
                      size={{ base: "md", md: "lg" }}
                    />
                  </FormControl>
                </Flex>

                <FormControl isRequired isInvalid={isFieldMissing('eventPageLink')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Event Page Link
                  </FormLabel>
                  <Input
                    type="url"
                    name="eventPageLink"
                    value={formData.eventPageLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventPageLink') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventPageLink') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventDescription')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your event..."
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('eventDescription') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('eventDescription') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                    rows={3}
                  />
                </FormControl>

                {/* Time and Music */}
                <Flex gap={{ base: 2, md: 4 }} direction={{ base: "column", sm: "row" }}>
                  <FormControl isRequired isInvalid={isFieldMissing('startTime')} flex="1">
                    <FormLabel 
                      display="flex" 
                      alignItems="center" 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <Icon as={Clock} mr={2} boxSize={{ base: 3, md: 4 }} />
                      Start
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
                      size={{ base: "md", md: "lg" }}
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={isFieldMissing('endTime')} flex="1">
                    <FormLabel 
                      display="flex" 
                      alignItems="center" 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <Icon as={Clock} mr={2} boxSize={{ base: 3, md: 4 }} />
                      End
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
                      size={{ base: "md", md: "lg" }}
                    />
                  </FormControl>
                </Flex>

                <FormControl isRequired isInvalid={isFieldMissing('musicRatio')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={Music} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Music Ratio
                  </FormLabel>
                  <Input
                    type="text"
                    name="musicRatio"
                    value={formData.musicRatio}
                    onChange={handleInputChange}
                    placeholder="70% Salsa, 30% Bachata"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('musicRatio') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('musicRatio') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <Flex gap={{ base: 2, md: 4 }} direction={{ base: "column", sm: "row" }}>
                  <FormControl flex={{ base: "auto", sm: "1" }}>
                    <FormLabel 
                      display="flex" 
                      alignItems="center" 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <Icon as={DollarSign} mr={2} boxSize={{ base: 3, md: 4 }} />
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
                      size={{ base: "md", md: "lg" }}
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired isInvalid={isFieldMissing('fees')} flex={{ base: "auto", sm: "1" }}>
                    <FormLabel 
                      fontWeight="semibold" 
                      color="gray.700"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Fees
                    </FormLabel>
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
                      size={{ base: "md", md: "lg" }}
                    />
                  </FormControl>
                </Flex>

                <FormControl isRequired isInvalid={isFieldMissing('location')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Location
                  </FormLabel>
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
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('venue')}>
                  <FormLabel 
                    display="flex" 
                    alignItems="center" 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={Building} mr={2} boxSize={{ base: 3, md: 4 }} />
                    Venue
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
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('handle')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Handle
                  </FormLabel>
                  <Input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    placeholder="@yourevent"
                    bg="white"
                    border="2px solid"
                    borderColor={isFieldMissing('handle') ? "red.300" : "gray.200"}
                    _hover={{ borderColor: isFieldMissing('handle') ? "red.400" : "purple.300" }}
                    _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #805ad5" }}
                    borderRadius="lg"
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('googleMaps')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Google Maps
                  </FormLabel>
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
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isFieldMissing('eventPosterLink')}>
                  <FormLabel 
                    fontWeight="semibold" 
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Poster Link
                  </FormLabel>
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
                    size={{ base: "md", md: "lg" }}
                  />
                </FormControl>

                {/* Submit Button */}
                <Flex justify="center" mt={{ base: 6, md: 10 }}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Creating..."
                    bgGradient="linear(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
                    color="white"
                    size={{ base: "md", md: "lg" }}
                    w="full"
                    maxW={{ base: "full", sm: "md" }}
                    h={{ base: "12", md: "14" }}
                    fontSize={{ base: "md", md: "lg" }}
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
                    Create Event
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