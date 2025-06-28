export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests: string[];
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
  senderId: "me" | "other";
  text: string;
  timestamp: string;
}
