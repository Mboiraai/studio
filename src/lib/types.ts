
import type { Timestamp } from 'firebase/firestore';

export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests: string[];
  // New optional fields for detailed profile
  dob?: string;
  gender?: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  interestedIn?: 'Men' | 'Women' | 'Everyone';
  location?: string;
  occupation?: string;
  education?: string;
  languages?: string;
  zodiac?: 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
  religion?: string;
  height?: string;
  bodyType?: 'Slim' | 'Athletic' | 'Curvy' | 'Average' | 'Other';
  pets?: 'Dog lover' | 'Cat owner' | 'Has other pets' | 'No pets' | 'Wants pets';
  lookingFor?: 'Casual' | 'Long-term' | 'Friendship' | 'Open to anything';
  smoking?: 'Socially' | 'Frequently' | 'Rarely' | 'Never';
  drinking?: 'Socially' | 'Frequently' | 'Rarely' | 'Never';
  kids?: 'Has and wants more' | 'Has and doesn\'t want more' | 'Doesn\'t have and wants' | 'Doesn\'t have and doesn\'t want';
  distance?: number;
  ageRange?: number[];
}

export interface Match {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
}
