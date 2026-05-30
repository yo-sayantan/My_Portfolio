
import React, { useState, useRef, useEffect, Component, ErrorInfo } from 'react';
import { MessageSquare, Send, X, Sparkles, Loader2, User, Bot, Trash2, Mail, Check } from 'lucide-react';
import { sendMessageToGemini, ChatHistoryItem } from '../services/geminiService';
import { sendEmail } from '../services/emailService';

// --- Error Boundary Component ---
class ChatErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Chatbot Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center flex flex-col items-center justify-center h-full text-slate-500">
          <Bot className="w-12 h-12 mb-4 text-slate-300" />
          <p className="text-sm font-medium">The assistant encountered an error.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 text-xs font-bold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            Try Reloading
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Typing Indicator Component ---
const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-in fade-in duration-300">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm ring-2 ring-white dark:ring-slate-900">
       <Bot size={16} className="text-white" />
    </div>
    <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 h-10 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-primary-500/5 animate-pulse"></div>
      
      {/* Animated Dots */}
      <span className="relative w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="relative w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="relative w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </div>
  </div>
);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_SUGGESTIONS = [
  "What are your core skills?",
  "Tell me about your experience at Experian.",
  "Show me your personal projects.",
  "How can I contact you?",
  "Do you know Java & Microservices?"
];

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sayantan's AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [transcriptEmail, setTranscriptEmail] = useState('');
  const [isSendingTranscript, setIsSendingTranscript] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isEmailMode, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const text = textOverride || inputText;
    
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Prepare history for API
    const history: ChatHistoryItem[] = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      text: msg.text
    }));

    try {
      const response = await sendMessageToGemini(userMessage.text, history);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update suggestions if AI provided them
      if (response.suggestions && response.suggestions.length > 0) {
        setSuggestions(response.suggestions);
      }

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "Chat cleared. How else can I help you?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setSuggestions(INITIAL_SUGGESTIONS);
  };

  const handleSendTranscript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcriptEmail.trim()) return;

    setIsSendingTranscript(true);

    // Format text version for fallback
    const transcriptText = messages.map(msg => 
      `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`
    ).join('\n\n');

    try {
      await sendEmail({
        name: "User", // Placeholder
        email: transcriptEmail,
        message: transcriptText,
        transcript: messages, // Pass structured data for rich HTML email
        type: 'transcript'
      });

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `✅ I've emailed the transcript to ${transcriptEmail}.`,
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      setIsEmailMode(false);
      setTranscriptEmail('');

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "❌ Failed to send transcript. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsSendingTranscript(false);
    }
  };

  // Simple parser to handle **bold** text and newlines
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-inherit">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto origin-bottom-right transition-all duration-500 ease-in-out transform
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'}
          w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh]
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl 
          border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden mb-4
          relative
        `}
      >
        <ChatErrorBoundary>
          {/* Header */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl shadow-lg shadow-primary-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Portfolio Assistant</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                  onClick={() => setIsEmailMode(!isEmailMode)}
                  className={`p-2 rounded-lg transition-colors ${isEmailMode ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  title="Email Transcript"
                >
                  <Mail className="w-4 h-4" />
                </button>
              <button 
                  onClick={handleClearChat}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Email Transcript Overlay */}
          {isEmailMode && (
            <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Transcript</h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[250px]">
                Enter your email address to receive a full copy of this conversation.
              </p>
              <form onSubmit={handleSendTranscript} className="w-full space-y-4">
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={transcriptEmail}
                    onChange={(e) => setTranscriptEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                  />
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setIsEmailMode(false)}
                      className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSendingTranscript} 
                      className="flex-1 py-3 rounded-xl font-bold text-sm bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSendingTranscript ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send
                    </button>
                  </div>
              </form>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white/10
                  ${msg.sender === 'ai' 
                    ? 'bg-gradient-to-br from-primary-500 to-blue-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}
                `}>
                  {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-sm' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-sm'}
                `}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggestions Chips - Always visible unless email mode */}
          {!isEmailMode && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-md">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {suggestions.map((q, i) => (
                      <button
                        key={`${q}-${messages.length}`}
                        onClick={() => handleSendMessage(undefined, q)}
                        disabled={isLoading}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white hover:border-primary-600 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md disabled:opacity-50 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {q}
                      </button>
                    ))}
                </div>
              </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700 shrink-0 backdrop-blur-sm">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400 shadow-sm"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-1.5 p-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </ChatErrorBoundary>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-inherit opacity-0 group-hover:opacity-10 transition-opacity" />
        
        {/* Notification Dot */}
        {!isOpen && (
             <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-900"></span>
            </span>
        )}

        <div className="relative transition-transform duration-500 ease-in-out transform group-hover:rotate-12">
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </div>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary-500" />
            Ask AI about me
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-inherit rotate-45 -translate-y-1/2 border-t border-r border-inherit"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
