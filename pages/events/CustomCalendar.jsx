import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  HStack,
  VStack,
  Grid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';

const CustomCalendar = ({ dateRange, setDateRange, isOpen, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDates, setSelectedDates] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      setSelectedDates([dateRange[0], dateRange[1]]);
    } else {
      setSelectedDates([]);
    }
  }, [dateRange]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (month) => {
    const startOfMonth = month.startOf('month');
    const endOfMonth = month.endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');
    
    const days = [];
    let current = startDate;
    
    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      days.push(current);
      current = current.add(1, 'day');
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    if (date.isBefore(dayjs().startOf('day'))) return; // Disable past dates
    
    if (!isSelecting && selectedDates.length === 0) {
      // First selection
      setSelectedDates([date]);
      setIsSelecting(true);
    } else if (isSelecting && selectedDates.length === 1) {
      // Second selection
      const firstDate = selectedDates[0];
      if (date.isBefore(firstDate)) {
        setSelectedDates([date, firstDate]);
      } else {
        setSelectedDates([firstDate, date]);
      }
      setIsSelecting(false);
    } else {
      // Reset and start new selection
      setSelectedDates([date]);
      setIsSelecting(true);
    }
  };

  const isDateInRange = (date) => {
    if (selectedDates.length !== 2) return false;
    return date.isBetween(selectedDates[0], selectedDates[1], 'day', '[]');
  };

  const isDateSelected = (date) => {
    return selectedDates.some(selectedDate => 
      selectedDate && date.isSame(selectedDate, 'day')
    );
  };

  const handleDone = () => {
    if (selectedDates.length === 2) {
      setDateRange(selectedDates);
    }
    onClose();
  };

  const handleClear = () => {
    setSelectedDates([]);
    setIsSelecting(false);
    setDateRange(null);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => prev.add(direction, 'month'));
  };

  const renderMonth = (month) => {
    const days = getDaysInMonth(month);
    
    return (
      <Box key={month.format('YYYY-MM')} mb={6}>
        <Text 
          fontSize="lg" 
          fontWeight="bold" 
          mb={4} 
          textAlign="center"
          color="#333"
        >
          {monthNames[month.month()]} {month.year()}
        </Text>
        
        {/* Weekday headers */}
        <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={2}>
          {weekdays.map(day => (
            <Box key={day} textAlign="center" py={2}>
              <Text fontSize="sm" fontWeight="medium" color="#666">
                {day}
              </Text>
            </Box>
          ))}
        </Grid>
        
        {/* Calendar days */}
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {days.map((day, index) => {
            const isCurrentMonth = day.month() === month.month();
            const isToday = day.isSame(dayjs(), 'day');
            const isPast = day.isBefore(dayjs().startOf('day'));
            const isSelected = isDateSelected(day);
            const isInRange = isDateInRange(day);
            
            return (
              <Box
                key={index}
                as="button"
                onClick={() => handleDateClick(day)}
                disabled={isPast}
                w="40px"
                h="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
                cursor={isPast ? 'not-allowed' : 'pointer'}
                bg={
                  isSelected 
                    ? '#1e90ff' 
                    : isInRange 
                      ? '#e6f3ff'
                      : isToday && isCurrentMonth
                        ? '#f0f8ff'
                        : 'transparent'
                }
                color={
                  isSelected 
                    ? 'white'
                    : isPast
                      ? '#ccc'
                      : !isCurrentMonth
                        ? '#999'
                        : '#333'
                }
                border={isToday && isCurrentMonth ? '2px solid #1e90ff' : 'none'}
                _hover={{
                  bg: isPast 
                    ? 'transparent' 
                    : isSelected 
                      ? '#1e90ff'
                      : '#f0f8ff'
                }}
                transition="all 0.2s"
              >
                <Text fontSize="sm" fontWeight={isToday ? 'bold' : 'normal'}>
                  {day.date()}
                </Text>
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent maxW="400px" borderRadius="16px">
        <ModalHeader pb={2}>
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold" color="#333">
              Calendar
            </Text>
            <ModalCloseButton position="static" />
          </Flex>
        </ModalHeader>
        
        <ModalBody px={4} pb={4}>
          {/* Navigation */}
          <Flex justify="space-between" align="center" mb={4}>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => navigateMonth(-1)}
              variant="ghost"
              size="sm"
              aria-label="Previous month"
            />
            <Text fontSize="md" fontWeight="medium">
              {monthNames[currentMonth.month()]} {currentMonth.year()}
            </Text>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => navigateMonth(1)}
              variant="ghost"
              size="sm"
              aria-label="Next month"
            />
          </Flex>

          {/* Calendar */}
          <Box maxH="400px" overflowY="auto">
            {renderMonth(currentMonth)}
            {renderMonth(currentMonth.add(1, 'month'))}
          </Box>

          {/* Selected date display */}
          {selectedDates.length > 0 && (
            <Box mt={4} p={3} bg="#f8f9fa" borderRadius="8px">
              <Text fontSize="sm" color="#666" mb={1}>
                Selected dates:
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {selectedDates.length === 1 
                  ? selectedDates[0].format('MMM DD, YYYY')
                  : selectedDates.length === 2
                    ? `${selectedDates[0].format('MMM DD')} - ${selectedDates[1].format('MMM DD ')} `
                    : ''
                }
              </Text>
            </Box>
          )}

          {/* Action buttons */}
          <Flex gap={3} mt={4}>
            <Button
              variant="outline"
              onClick={handleClear}
              flex={1}
              borderColor="#ddd"
              _hover={{ borderColor: '#bbb' }}
            >
              Clear
            </Button>
            <Button
              bg="#1e90ff"
              color="white"
              onClick={handleDone}
              flex={1}
              _hover={{ bg: '#1c7ed6' }}
              isDisabled={selectedDates.length === 0}
            >
              Done
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomCalendar;