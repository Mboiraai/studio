
"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { matches } from '@/lib/data';
import { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, Timestamp } from 'firebase/firestore';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const match = matches.find(m => m.id === params.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && params.id) {
      const otherUserId = params.id as string;
      const chatId = [user.uid, otherUserId].sort().join('_');
      const messagesCollection = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesCollection, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Message));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [user, params.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;
    
    const otherUserId = params.id as string;
    const chatId = [user.uid, otherUserId].sort().join('_');
    const messagesCollection = collection(db, 'chats', chatId, 'messages');

    await addDoc(messagesCollection, {
      text: newMessage,
      senderId: user.uid,
      timestamp: serverTimestamp(),
    });

    const chatDocRef = doc(db, 'chats', chatId);
    await setDoc(chatDocRef, {
        participants: [user.uid, otherUserId],
        lastMessage: newMessage,
        lastMessageTimestamp: serverTimestamp(),
    }, { merge: true });

    setNewMessage('');
  };
  
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!match) {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <p>Match not found.</p>
            <Button asChild variant="link"><Link href="/matches">Back to matches</Link></Button>
        </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b p-3 md:p-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className='flex items-center gap-2'>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <Link href="/matches"><ChevronLeft className="h-6 w-6" /></Link>
            </Button>
            <Avatar className="h-10 w-10 border-2 border-primary/50">
            <AvatarImage src={match.userAvatar} alt={match.userName} data-ai-hint="person portrait"/>
            <AvatarFallback>{match.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">{match.userName}</h2>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
            <div
                key={message.id}
                className={cn(
                'flex items-end gap-2',
                message.senderId === user.uid ? 'justify-end' : 'justify-start'
                )}
            >
                <div
                className={cn(
                    'max-w-xs sm:max-w-sm md:max-w-md rounded-2xl px-4 py-2',
                    message.senderId === user.uid
                    ? 'rounded-br-none bg-primary text-primary-foreground'
                    : 'rounded-bl-none bg-card border'
                )}
                >
                <p className="break-words">{message.text}</p>
                {message.timestamp && (
                    <p className={cn("text-xs mt-1", message.senderId === user.uid ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                        {(message.timestamp as Timestamp).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
                </div>
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="sticky bottom-0 bg-background border-t p-2 md:p-4">
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full"
            />
            <Button type="submit" size="icon" className="rounded-full bg-primary-gradient shrink-0" disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
            </Button>
            </form>
        </div>
      </footer>
    </div>
  );
}
