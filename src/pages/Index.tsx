import { useState } from 'react';
import { Send, Globe, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  sender: string;
  country: string;
  avatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface User {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  online: boolean;
}

const SAMPLE_USERS: User[] = [
  { id: '1', name: 'Sofia', country: 'Spain', flag: '🇪🇸', avatar: 'S', online: true },
  { id: '2', name: 'Yuki', country: 'Japan', flag: '🇯🇵', avatar: 'Y', online: true },
  { id: '3', name: 'Pierre', country: 'France', flag: '🇫🇷', avatar: 'P', online: true },
  { id: '4', name: 'Amara', country: 'Kenya', flag: '🇰🇪', avatar: 'A', online: false },
  { id: '5', name: 'Marco', country: 'Brazil', flag: '🇧🇷', avatar: 'M', online: true },
  { id: '6', name: 'Aisha', country: 'Egypt', flag: '🇪🇬', avatar: 'Ai', online: true },
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Sofia',
    country: 'Spain',
    avatar: 'S',
    text: '¡Hola! Just finished exploring Barcelona. The architecture is amazing!',
    timestamp: '10:32 AM',
    isOwn: false,
  },
  {
    id: '2',
    sender: 'You',
    country: 'USA',
    avatar: 'Y',
    text: 'That sounds incredible! Barcelona is on my bucket list. How long are you there?',
    timestamp: '10:35 AM',
    isOwn: true,
  },
  {
    id: '3',
    sender: 'Yuki',
    country: 'Japan',
    avatar: 'Y',
    text: 'I recommend the Sagrada Familia! I was there last year.',
    timestamp: '10:36 AM',
    isOwn: false,
  },
  {
    id: '4',
    sender: 'Pierre',
    country: 'France',
    avatar: 'P',
    text: 'Barcelona is wonderful, but Paris has its own charm 😊',
    timestamp: '10:38 AM',
    isOwn: false,
  },
  {
    id: '5',
    sender: 'You',
    country: 'USA',
    avatar: 'Y',
    text: 'I love hearing about different perspectives! What do you all love most about your countries?',
    timestamp: '10:40 AM',
    isOwn: true,
  },
  {
    id: '6',
    sender: 'Marco',
    country: 'Brazil',
    avatar: 'M',
    text: 'The people! Brazilian culture is all about connection and joy. You should visit Rio!',
    timestamp: '10:42 AM',
    isOwn: false,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        sender: 'You',
        country: 'USA',
        avatar: 'Y',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Online Users */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Global Chat</h1>
          </div>
          <p className="text-sm text-muted-foreground">Connect with people worldwide</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
              Online Now ({SAMPLE_USERS.filter(u => u.online).length})
            </p>
            {SAMPLE_USERS.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedUser?.id === user.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    {user.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs opacity-75">{user.flag} {user.country}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Global Conversation</h2>
          </div>
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-2xl">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>{message.avatar}</AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{message.sender}</p>
                    <span className="text-xs text-muted-foreground">{message.country}</span>
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="h-20 border-t border-border bg-card p-4 flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Say hello to the world..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
