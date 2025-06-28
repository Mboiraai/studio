import type { Profile, Match, Message } from './types';

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
    relationshipIntent: 'Long-term'
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
    relationshipIntent: 'Open to anything'
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
    relationshipIntent: 'Friendship'
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
    relationshipIntent: 'Casual'
  },
];

export const matches: Match[] = [
  {
    id: 'match1',
    userId: 'liam',
    userName: 'Liam',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Haha, challenge accepted! What time?',
    lastMessageTimestamp: '10:42 PM',
    unreadCount: 1,
  },
  {
    id: 'match2',
    userId: 'chloe',
    userName: 'Chloe',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'I know this amazing place downtown!',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'match3',
    userId: 'ethan',
    userName: 'Ethan',
    userAvatar: 'https://placehold.co/100x100.png',
    lastMessage: 'You\'re welcome to join my next workout session!',
    lastMessageTimestamp: '2d ago',
    unreadCount: 0,
  },
];

export const messages: Message[] = [
    { id: '1', senderId: 'other', text: 'Hey! I saw you like hiking too. Any favorite trails?', timestamp: '10:30 PM' },
    { id: '2', senderId: 'me', text: 'Hey Liam! Yeah, I love the Eagle Peak trail. The view is insane!', timestamp: '10:32 PM' },
    { id: '3', senderId: 'other', text: 'Oh nice! I haven\'t been there yet. We should go sometime.', timestamp: '10:35 PM' },
    { id: '4', senderId: 'me', text: 'Totally! What about this weekend?', timestamp: '10:40 PM' },
    { id: '5', senderId: 'other', text: 'Haha, challenge accepted! What time?', timestamp: '10:42 PM' },
];
