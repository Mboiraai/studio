import type { Profile, Match } from './types';

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    bio: 'Lover of sunsets, hiking, and spontaneous road trips. My passport is always ready for a new stamp. Looking for someone to share adventures with, whether it\'s climbing a mountain or finding the best hidden food spots in the city. 🌄',
    images: [
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png',
    ],
    interests: ['Hiking', 'Photography', 'Live Music', 'Cooking', 'Travel'],
    occupation: 'Marketing Manager',
    education: 'University of Arts',
    height: "5'7\"",
    zodiac: 'Leo',
    lookingFor: 'Long-term'
  },
  {
    id: '2',
    name: 'Liam',
    age: 31,
    bio: 'Software engineer by day, aspiring chef by night. I can probably beat you at Mario Kart. Fluent in sarcasm and Python. Let\'s build something cool together. 🎮',
    images: [
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png',
    ],
    interests: ['Gaming', 'Cooking', 'Sci-Fi Movies', 'Dogs', 'Board Games'],
    occupation: 'Software Engineer',
    education: 'Tech Institute',
    height: "6'1\"",
    zodiac: 'Aquarius',
    lookingFor: 'Open to anything'
  },
  {
    id: '3',
    name: 'Chloe',
    age: 25,
    bio: 'Graphic designer with a passion for art, coffee, and my cat, Jasper. Let\'s find the best café in town or spend an afternoon at a museum. ☕️🎨',
    images: [
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png',
    ],
    interests: ['Art', 'Coffee', 'Yoga', 'Thrift Shopping', 'Cats'],
    occupation: 'Graphic Designer',
    education: 'Design School',
    height: "5'5\"",
    zodiac: 'Pisces',
    lookingFor: 'Friendship'
  },
  {
    id: '4',
    name: 'Ethan',
    age: 29,
    bio: 'Fitness enthusiast and dog dad. My golden retriever is my world. Looking for a gym buddy and more. Let\'s hit a new PR together!',
    images: [
      'https://placehold.co/600x800.png',
    ],
    interests: ['Fitness', 'Dogs', 'Meal Prep', 'Beach Days', 'Running'],
    occupation: 'Personal Trainer',
    education: 'State University',
    height: "5'11\"",
    zodiac: 'Aries',
    lookingFor: 'Casual'
  },
];

export const matches: Match[] = [
  {
    id: 'uid_liam_123',
    userId: 'liam',
    userName: 'Liam',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Haha, challenge accepted! What time?',
    lastMessageTimestamp: '10:42 PM',
    unreadCount: 1,
  },
  {
    id: 'uid_chloe_456',
    userId: 'chloe',
    userName: 'Chloe',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'I know this amazing place downtown!',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'uid_ethan_789',
    userId: 'ethan',
    userName: 'Ethan',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'You\'re welcome to join my next workout session!',
    lastMessageTimestamp: '2d ago',
    unreadCount: 0,
  },
];
