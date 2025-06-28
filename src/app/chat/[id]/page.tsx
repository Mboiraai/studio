"use client";

import { useState } from 'react';
import { messages as initialMessages, matches } from '@/lib/data';
import { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const params = useParams();
  const match = matches.find(m => m.id === params.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: String(Date.now()),
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };
  
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
      <header className="flex items-center gap-4 border-b p-3 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
            <Link href="/matches"><ChevronLeft className="h-6 w-6" /></Link>
        </Button>
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          <AvatarImage src={match.userAvatar} alt={match.userName} data-ai-hint="person portrait"/>
          <AvatarFallback>{match.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-lg">{match.userName}</h2>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-end gap-2',
              message.senderId === 'me' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-xs rounded-2xl px-4 py-2 md:max-w-md',
                message.senderId === 'me'
                  ? 'rounded-br-none bg-primary text-primary-foreground'
                  : 'rounded-bl-none bg-card border'
              )}
            >
              <p>{message.text}</p>
              <p className={cn("text-xs mt-1", message.senderId === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </main>
      
      <footer className="sticky bottom-0 bg-background border-t p-2">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full"
          />
          <Button type="submit" size="icon" className="rounded-full bg-primary-gradient">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
