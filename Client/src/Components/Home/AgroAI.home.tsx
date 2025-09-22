import { useState, useEffect, useRef } from "react";
import { Send, Mic, MicOff, Plus, MessageCircle, Globe, ChevronDown, Loader2, Menu, X } from "lucide-react";

interface Language {
  id: number;
  name: string;
  code: string;
  flag: string;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
}

export default function AgroAIChat() {
  const languages: Language[] = [
    { id: 1, name: 'English', code: 'en-US', flag: '🇺🇸' },
    { id: 2, name: 'Hindi', code: 'hi-IN', flag: '🇮🇳' },
    { id: 3, name: 'Telugu', code: 'te-IN', flag: '🇮🇳' },
    { id: 4, name: 'Tamil', code: 'ta-IN', flag: '🇮🇳' },
    { id: 5, name: 'Bengali', code: 'bn-IN', flag: '🇮🇳' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Crop Disease Diagnosis',
      messages: [],
      lastActivity: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '2',
      title: 'Weather Forecast Query',
      messages: [],
      lastActivity: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '3',
      title: 'Soil Analysis Help',
      messages: [],
      lastActivity: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth <= 768 && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node) &&
          isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const speakMessage = (text: string, languageCode: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const fetchAIResponse = async (message: string, language: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      `Based on your query about "${message.slice(0, 30)}...", I recommend checking soil moisture levels and considering organic pest control methods.`,
      `For agricultural concerns like this, I suggest consulting local agricultural extension services and monitoring weather patterns.`,
      `This is a common issue in ${language.name} farming regions. Consider implementing integrated pest management practices.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    let session = currentSession;
    if (!session) {
      session = {
        id: Date.now().toString(),
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        messages: [],
        lastActivity: new Date()
      };
      setChatSessions(prev => [session!, ...prev]);
      setCurrentSession(session);
    }

    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    session.messages = [...session.messages, userMessage];
    setCurrentSession({ ...session });
    setChatSessions(prev => 
      prev.map(s => s.id === session!.id ? { ...session!, lastActivity: new Date() } : s)
    );
    
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await fetchAIResponse(userMessage.text, selectedLanguage);
      const aiMessage: Message = {
        text: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };

      session.messages = [...session.messages, aiMessage];
      setCurrentSession({ ...session });
      setChatSessions(prev => 
        prev.map(s => s.id === session!.id ? { ...session!, lastActivity: new Date() } : s)
      );

      speakMessage(aiMessage.text, selectedLanguage.code);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.lang = selectedLanguage.code;
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;

    recognitionInstance.onstart = () => {
      setIsRecording(true);
    };

    recognitionInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const createNewChat = () => {
    setCurrentSession(null);
    setInput("");
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSessionClick = (session: ChatSession) => {
    setCurrentSession(session);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <div className="flex h-screen bg-white relative">
      {/* Mobile Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <h1 className="text-xl font-bold text-gray-900">AgroAI</h1>
        
        <div className="w-10"> {/* Spacer for balance */}
          {currentSession && (
            <button
              onClick={createNewChat}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed md:relative z-30 w-80 bg-gray-50 border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          h-full
        `}
        style={{ 
          top: window.innerWidth <= 768 ? '64px' : '0',
          height: window.innerWidth <= 768 ? 'calc(100vh - 64px)' : '100vh'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="hidden md:flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">AgroAI</h1>
            <button
              onClick={createNewChat}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {languages.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full flex items-center space-x-2 p-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span>{language.flag}</span>
                    <span className="text-sm text-gray-700">{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Recent Chats
          </h3>
          <div className="space-y-2">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleSessionClick(session)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-green-100 border border-green-200'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MessageCircle size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(session.lastActivity)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col md:mt-0 mt-16">
        {/* Chat Header */}
        {currentSession ? (
          <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{currentSession.title}</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  AI-powered agricultural assistance in {selectedLanguage.name}
                </p>
              </div>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="md:hidden flex items-center space-x-2 p-2 bg-gray-100 rounded-lg"
              >
                <span>{selectedLanguage.flag}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-gray-200 bg-white hidden md:block">
            <h2 className="text-xl font-semibold text-gray-900">Welcome to AgroAI</h2>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {!currentSession ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center px-4">
                <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Welcome to AgroAI
                </h3>
                <p className="text-gray-500 max-w-md text-sm md:text-base">
                  Start a new conversation to get AI-powered agricultural insights and recommendations.
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentSession.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] md:max-w-[80%] p-3 md:p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] md:max-w-[80%] p-3 md:p-4 rounded-2xl bg-gray-100">
                    <div className="flex items-center space-x-2">
                      <Loader2 size={14} className="text-green-600 animate-spin" />
                      <span className="text-sm text-gray-600">AgroAI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-3 md:space-x-4">
            <div className="flex-1">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100">
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm"
                  placeholder={`Ask AgroAI anything in ${selectedLanguage.name}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                />
                
                <div className="flex items-center space-x-1 md:space-x-2 ml-2 md:ml-3">
                  <button
                    onClick={isRecording ? stopListening : startListening}
                    className={`p-1 md:p-2 rounded-lg transition-colors ${
                      isRecording
                        ? 'text-red-600 bg-red-50 hover:bg-red-100'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title={isRecording ? 'Stop Recording' : 'Voice Input'}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="p-1 md:p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Send Message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-2 text-center">
            AgroAI can make mistakes. Please verify important agricultural information.
          </p>
        </div>
      </div>
    </div>
  );
}