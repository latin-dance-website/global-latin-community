import sendPersonalizedEventEmail from './pages/api/sendPersonalizedEventEmail.js';

// Sample data to test with
const sampleEvents = [
  {
    title: 'Bachata Social Night',
    image: 'https://via.placeholder.com/300x200',
    day: 'Friday',
    shortDate: '28 Jun',
    formattedDate: 'Friday, 28 Jun',
    startTime: '8:00PM',
    endTime: '12:00AM',
    fees: '₹500',
    musicRatio: '70% Bachata, 30% Salsa',
    location: 'Latin Vibes Club, Hanoi',
  },
  {
    title: 'Kizomba Workshop',
    image: 'https://via.placeholder.com/300x200',
    day: 'Saturday',
    shortDate: '29 Jun',
    formattedDate: 'Saturday, 29 Jun',
    startTime: '6:00PM',
    endTime: '9:00PM',
    fees: '₹300',
    musicRatio: '100% Kizomba',
    location: 'Dance Studio X, Hanoi',
  },
  {
    title: 'Zouk Open Floor',
    image: 'https://via.placeholder.com/300x200',
    day: 'Sunday',
    shortDate: '30 Jun',
    formattedDate: 'Sunday, 30 Jun',
    startTime: '5:00PM',
    endTime: '8:00PM',
    fees: 'Free',
    musicRatio: '100% Zouk',
    location: 'Zouk Clubhouse, Hanoi',
  },
];

const city = 'Hanoi';
const userDetails = {
  email: 'preview@only.com', // Won't be used — no email is sent
};

// Call the function — it will only save preview.html
sendPersonalizedEventEmail(sampleEvents, city, userDetails);
