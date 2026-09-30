import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Mic, 
  MicOff, 
  User, 
  Sparkles,
  GraduationCap,
  Keyboard,
  ChevronDown,
  Search,
  Check,
  AlertCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface QuickReply {
  hanzi: string;
  pinyin: string;
  vi: string;
}

interface MessageFeedback {
  hasUserFeedback?: boolean;
  score?: number;
  userCorrection?: string;
  grammarTip?: string;
  toneNote?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  chinese?: string;
  pinyin?: string;
  vietnamese?: string;
  audioText?: string;
  text: string;
  timestamp: string;
  feedback?: MessageFeedback;
  quickReplies?: QuickReply[];
}

interface TutorPersona {
  id: string;
  name: string;
  title: string;
  avatar: string;
  accent: string;
  greetingChinese: string;
  greetingPinyin: string;
  greetingVi: string;
}

interface WorldLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const TUTORS: TutorPersona[] = [
  {
    id: 'xiao_yi',
    name: 'Tiểu Yipi (小易)',
    title: 'Giọng nữ AI ấm áp & kiên nhẫn (Kore)',
    avatar: '👩‍🏫',
    accent: 'Giọng Bắc Kinh chuẩn, truyền cảm',
    greetingChinese: '你好！我是小易老师，按住麦克风随时和我练习对话吧！',
    greetingPinyin: 'Nǐ hǎo! Wǒ shì Xiǎoyì lǎoshī, ànzhù màikèfēng suíshí hé wǒ liànxí duìhuà ba!',
    greetingVi: 'Chào bạn! Mình là cô giáo Tiểu Yipi, hãy giữ nút nói để bắt đầu trò chuyện cùng mình nhé!'
  },
  {
    id: 'laoshi_li',
    name: 'Thầy Lý (李老师)',
    title: 'Giọng nam đĩnh đạc, chuẩn CCTV (Fenrir)',
    avatar: '👨‍🏫',
    accent: 'Phổ thông Bắc Kinh thanh lịch',
    greetingChinese: '同学你好，欢迎来到一对一中文课堂，准备好开始了吗？',
    greetingPinyin: 'Tóngxué nǐ hǎo, huānyíng lái dào yī duì yī zhōngwén kètáng, zhǔnbèi hǎo kāishǐ le ma?',
    greetingVi: 'Chào em, chào mừng đến với lớp đàm thoại 1-1, hãy giữ nút nói để bắt đầu trao đổi cùng thầy nhé.'
  },
  {
    id: 'xiao_yu',
    name: 'Tiểu Vũ (小雨)',
    title: 'Giọng nữ trẻ trung, vui tươi (Zephyr)',
    avatar: '👧',
    accent: 'Khẩu ngữ đời sống tự nhiên',
    greetingChinese: '哈喽！很高兴认识你呀，按住按钮随时和我聊天吧！',
    greetingPinyin: 'Hālóu! Hěn gāoxìng rènshi nǐ ya, ànzhù ànniǔ suíshí hé wǒ liáotiān ba!',
    greetingVi: 'Hí bạn! Rất vui được gặp bạn nhé, giữ nút nói để trò chuyện cùng mình nha!'
  },
  {
    id: 'laoban_zhang',
    name: 'Trương Tổng (张总)',
    title: 'Giọng nam thương mại, tự tin (Puck)',
    avatar: '👨‍💼',
    accent: 'Doanh nhân chuyên nghiệp',
    greetingChinese: '你好，很高兴在商务交流中遇到你，我们马上开始吧。',
    greetingPinyin: 'Nǐ hǎo, hěn gāoxìng zài shāngwù jiāoliú zhōng yù dào nǐ, wǒmen mǎshàng kāishǐ ba.',
    greetingVi: 'Chào bạn, rất vui được gặp bạn trong buổi giao lưu kinh doanh, chúng ta bắt đầu trao đổi ngay nhé.'
  }
];

const WORLD_LANGUAGES: WorldLanguage[] = [
  { code: 'auto', name: 'Tự động', nativeName: 'Auto', flag: '🌐' },
  { code: 'vi-VN', name: 'Tiếng Việt', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh-CN', name: 'Tiếng Trung (Phổ thông)', nativeName: '普通话', flag: '🇨🇳' },
  { code: 'zh-HK', name: 'Tiếng Quảng Đông', nativeName: '廣東話', flag: '🇭🇰' },
  { code: 'zh-TW', name: 'Tiếng Trung (Đài Loan)', nativeName: '國語', flag: '🇹🇼' },
  { code: 'en-US', name: 'Tiếng Anh (Mỹ)', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'Tiếng Anh (Anh)', nativeName: 'English (UK)', flag: '🇬🇧' },
  { code: 'ja-JP', name: 'Tiếng Nhật', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Tiếng Hàn', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'fr-FR', name: 'Tiếng Pháp', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es-ES', name: 'Tiếng Tây Ban Nha', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de-DE', name: 'Tiếng Đức', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru-RU', name: 'Tiếng Nga', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'th-TH', name: 'Tiếng Thái', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'id-ID', name: 'Tiếng Indonesia', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ar-SA', name: 'Tiếng Ả Rập', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'it-IT', name: 'Tiếng Ý', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Tiếng Bồ Đào Nha', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'hi-IN', name: 'Tiếng Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr-TR', name: 'Tiếng Thổ Nhĩ Kỳ', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl-NL', name: 'Tiếng Hà Lan', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl-PL', name: 'Tiếng Ba Lan', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'ms-MY', name: 'Tiếng Malaysia', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'sv-SE', name: 'Tiếng Thụy Điển', nativeName: 'Svenska', flag: '🇸🇪' }
];

export const AITutorPage: React.FC = () => {
  // Tutor & Language Selection
  const [selectedTutorId, setSelectedTutorId] = useState<string>('xiao_yi');
  const [voiceLang, setVoiceLang] = useState<string>('auto');
  const [showTutorPicker, setShowTutorPicker] = useState<boolean>(false);
  const [showLangPicker, setShowLangPicker] = useState<boolean>(false);
  const [langSearch, setLangSearch] = useState<string>('');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  // Micro Mode: 'hold' (Giữ để nói) or 'tap' (Chạm để nói)
  const [micMode, setMicMode] = useState<'hold' | 'tap'>('hold');

  // Permission Banner State
  const [micPermissionDenied, setMicPermissionDenied] = useState<boolean>(false);
  const [micPermissionNotice, setMicPermissionNotice] = useState<string | null>(null);

  // Detect whether app is running inside iframe (e.g. AI Studio preview)
  const isInIframe = useMemo(() => {
    try {
      return typeof window !== 'undefined' && window.self !== window.top;
    } catch {
      return true;
    }
  }, []);

  // Text vs Keyboard toggle
  const [showKeyboardInput, setShowKeyboardInput] = useState<boolean>(false);
  const [input, setInput] = useState('');

  // Active Tutor Persona
  const activeTutor = useMemo(() => {
    return TUTORS.find((t) => t.id === selectedTutorId) || TUTORS[0];
  }, [selectedTutorId]);

  // Active Language Object
  const activeLanguage = useMemo(() => {
    return WORLD_LANGUAGES.find((l) => l.code === voiceLang) || WORLD_LANGUAGES[0];
  }, [voiceLang]);

  // Filtered Languages for Dropdown
  const filteredLanguages = useMemo(() => {
    if (!langSearch.trim()) return WORLD_LANGUAGES;
    const q = langSearch.toLowerCase();
    return WORLD_LANGUAGES.filter(
      (l) => l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
    );
  }, [langSearch]);

  // Messages State
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-01',
      role: 'model',
      chinese: TUTORS[0].greetingChinese,
      pinyin: TUTORS[0].greetingPinyin,
      vietnamese: TUTORS[0].greetingVi,
      audioText: TUTORS[0].greetingChinese,
      text: `${TUTORS[0].greetingChinese}\n(${TUTORS[0].greetingPinyin})\n${TUTORS[0].greetingVi}`,
      timestamp: 'Vừa xong',
      quickReplies: [
        { hanzi: '你好老师！我想练习口语。', pinyin: 'Nǐ hǎo lǎoshī! Wǒ xiǎng liànxí kǒuyǔ.', vi: 'Chào cô! Em muốn luyện khẩu ngữ.' },
        { hanzi: 'Cô ơi, em có thể nói tiếng Việt được không?', pinyin: 'Lǎoshī, wǒ kěyǐ shuō Yuènányǔ ma?', vi: 'Cô ơi, em có thể nói tiếng Việt được không?' },
        { hanzi: 'Can I practice Chinese with you?', pinyin: 'Can I practice Chinese with you?', vi: 'Em có thể luyện tiếng Trung với cô không?' }
      ]
    }
  ]);

  // Status & Audio
  const [isLoading, setIsLoading] = useState(false);
  const [isHoldingToTalk, setIsHoldingToTalk] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Synchronous refs for speech & audio streams
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const speechTextRef = useRef<string>('');
  const isRecordingRef = useRef<boolean>(false);
  const activeSessionIdRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);
  
  // MediaRecorder audio fallback
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Check microphone permissions status on mount & listen for changes
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'microphone' as any })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'denied') {
            setMicPermissionDenied(true);
          } else if (permissionStatus.state === 'granted') {
            setMicPermissionDenied(false);
          }
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              setMicPermissionDenied(false);
              setMicPermissionNotice('Đã cấp quyền Micro thành công!');
              setTimeout(() => setMicPermissionNotice(null), 3500);
            } else if (permissionStatus.state === 'denied') {
              setMicPermissionDenied(true);
            }
          };
        })
        .catch(() => {
          // Ignore if permission query is not supported
        });
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, interimTranscript]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setShowLangPicker(false);
      }
    };
    if (showLangPicker) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showLangPicker]);

  // Request browser microphone permission directly
  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicPermissionDenied(false);
      setMicPermissionNotice('Đã kết nối Micro thành công! Bây giờ bạn có thể nói chuyện.');
      setTimeout(() => setMicPermissionNotice(null), 4000);
      return true;
    } catch {
      setMicPermissionDenied(true);
      return false;
    }
  };

  // Reference to active server MP3 Audio element
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  // SpeechSynthesis keep-alive timer reference (fixes Chrome audio pause bug)
  const speechTimerRef = useRef<any>(null);

  // Pre-load SpeechSynthesis voices and unlock audio context
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      stopAllAudio();
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    };
  }, []);

  const stopAllAudio = () => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch {}
      activeAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setSpeakingId(null);
    if (speechTimerRef.current) {
      clearInterval(speechTimerRef.current);
      speechTimerRef.current = null;
    }
  };

  const keepSpeechAlive = () => {
    if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    speechTimerRef.current = setInterval(() => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        if (speechTimerRef.current) clearInterval(speechTimerRef.current);
      }
    }, 4500);
  };

  // Conversational Tutor Voice: speaks naturally like a 1-1 dialogue (Vietnamese explanation + native Chinese pronunciation chained)
  const speakConversationalTutor = (msg: { id: string; vietnamese?: string; chinese?: string; text?: string }) => {
    if (speakingId === msg.id) {
      stopAllAudio();
      return;
    }

    stopAllAudio();
    setSpeakingId(msg.id);

    // Case 1: Both Vietnamese explanation and Chinese focus word exist
    if (msg.vietnamese && msg.chinese) {
      const viUrl = `/api/ai-tutor/tts?text=${encodeURIComponent(msg.vietnamese)}&lang=vi&tutorId=${encodeURIComponent(selectedTutorId)}`;
      const audioVi = new Audio(viUrl);
      activeAudioRef.current = audioVi;

      audioVi.onended = () => {
        if (speakingId && speakingId !== msg.id) return;
        // Natural pedagogical pause between explanation and pronunciation
        setTimeout(() => {
          if (!activeAudioRef.current && speakingId !== msg.id) return;
          const zhUrl = `/api/ai-tutor/tts?text=${encodeURIComponent(msg.chinese!)}&lang=zh-CN&tutorId=${encodeURIComponent(selectedTutorId)}`;
          const audioZh = new Audio(zhUrl);
          activeAudioRef.current = audioZh;
          audioZh.onended = () => {
            setSpeakingId(null);
            activeAudioRef.current = null;
          };
          audioZh.onerror = () => {
            setSpeakingId(null);
            activeAudioRef.current = null;
          };
          audioZh.play().catch(() => {
            setSpeakingId(null);
            activeAudioRef.current = null;
          });
        }, 350);
      };

      audioVi.onerror = () => {
        // Fallback to browser SpeechSynthesis if server audio is blocked
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const uttVi = new SpeechSynthesisUtterance(msg.vietnamese!);
          uttVi.lang = 'vi-VN';
          uttVi.rate = 0.9;
          const voices = window.speechSynthesis.getVoices();
          const viVoice = voices.find((v) => v.lang.startsWith('vi'));
          if (viVoice) uttVi.voice = viVoice;

          uttVi.onend = () => {
            const uttZh = new SpeechSynthesisUtterance(msg.chinese!);
            uttZh.lang = 'zh-CN';
            uttZh.rate = 0.85;
            const zhVoice = voices.find((v) => v.lang.startsWith('zh'));
            if (zhVoice) uttZh.voice = zhVoice;
            uttZh.onend = () => setSpeakingId(null);
            window.speechSynthesis.speak(uttZh);
          };
          window.speechSynthesis.speak(uttVi);
        } else {
          setSpeakingId(null);
        }
      };

      audioVi.play().catch(() => {
        // Autoplay policy fallback: try browser speech synthesis
        if ('speechSynthesis' in window) {
          window.speechSynthesis.resume();
          const uttVi = new SpeechSynthesisUtterance(msg.vietnamese!);
          uttVi.lang = 'vi-VN';
          uttVi.rate = 0.9;
          const voices = window.speechSynthesis.getVoices();
          const viVoice = voices.find((v) => v.lang.startsWith('vi'));
          if (viVoice) uttVi.voice = viVoice;
          uttVi.onend = () => setSpeakingId(null);
          window.speechSynthesis.speak(uttVi);
        } else {
          setSpeakingId(null);
        }
      });
      return;
    }

    // Case 2: Only Vietnamese or Only Chinese or fallback text
    if (msg.vietnamese) {
      speakAudio(msg.vietnamese, msg.id, 'vi');
      return;
    }
    const textToSpeak = msg.chinese || msg.text || '';
    speakAudio(textToSpeak, msg.id, 'zh-CN');
  };

  // Pronounce audio matching appropriate language (Standard Server MP3 with SpeechSynthesis backup)
  const speakAudio = (textToSpeak: string, msgId: string, explicitLang?: string) => {
    if (speakingId === msgId) {
      stopAllAudio();
      return;
    }

    stopAllAudio();

    const cleanText = textToSpeak.replace(/[\n\r]/g, ' ').trim();
    if (!cleanText) return;

    setSpeakingId(msgId);

    let targetLang = explicitLang || '';
    if (!targetLang) {
      const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(cleanText);
      const hasChinese = /[\u4e00-\u9fa5]/.test(cleanText);

      if (hasVietnamese && !hasChinese) targetLang = 'vi';
      else if (hasChinese) targetLang = 'zh-CN';
      else if (voiceLang !== 'auto') targetLang = voiceLang;
      else targetLang = 'zh-CN';
    }

    const normalizedLang = targetLang.startsWith('vi') ? 'vi' : 'zh-CN';

    // Standard native pronunciation MP3 TTS
    const ttsUrl = `/api/ai-tutor/tts?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(normalizedLang)}&tutorId=${encodeURIComponent(selectedTutorId)}`;
    const audio = new Audio(ttsUrl);
    activeAudioRef.current = audio;

    audio.onended = () => {
      if (activeAudioRef.current === audio) {
        setSpeakingId(null);
        activeAudioRef.current = null;
      }
    };

    audio.onerror = () => {
      // Browser SpeechSynthesis fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = normalizedLang === 'vi' ? 'vi-VN' : 'zh-CN';
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const matched = voices.find((v) => normalizedLang === 'vi' ? v.lang.startsWith('vi') : v.lang.startsWith('zh'));
        if (matched) utterance.voice = matched;
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingId(null);
      }
    };

    audio.play().catch(() => {
      // Autoplay blocked fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = normalizedLang === 'vi' ? 'vi-VN' : 'zh-CN';
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const matched = voices.find((v) => normalizedLang === 'vi' ? v.lang.startsWith('vi') : v.lang.startsWith('zh'));
        if (matched) utterance.voice = matched;
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingId(null);
      }
    });
  };

  // Convert Blob to Base64 helper
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || '';
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Start Voice Recording
  const startRecording = async () => {
    if (isRecordingRef.current) return;

    if (speakingId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }

    // Clean previous recognition instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    const sessionId = ++activeSessionIdRef.current;
    isRecordingRef.current = true;
    speechTextRef.current = '';
    setInterimTranscript('');
    setIsHoldingToTalk(true);
    audioChunksRef.current = [];

    // 1. Start MediaRecorder (Audio capture fallback)
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // If user already released while waiting for stream
        if (!isRecordingRef.current || activeSessionIdRef.current !== sessionId) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        mediaStreamRef.current = stream;
        setMicPermissionDenied(false);

        let mimeType = '';
        if (typeof MediaRecorder !== 'undefined') {
          if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            mimeType = 'audio/webm;codecs=opus';
          } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            mimeType = 'audio/webm';
          } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
            mimeType = 'audio/mp4';
          }

          const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };
          recorder.start(100);
          mediaRecorderRef.current = recorder;
        }
      }
    } catch (micErr: any) {
      if (micErr?.name === 'NotAllowedError' || micErr?.name === 'PermissionDeniedError') {
        setMicPermissionDenied(true);
      }
    }

    // 2. Start Web Speech Recognition (for real-time live preview)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && isRecordingRef.current && activeSessionIdRef.current === sessionId) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = voiceLang === 'auto' ? (navigator.language || 'zh-CN') : voiceLang;
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event: any) => {
          let full = '';
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript;
          }
          const clean = full.trim();
          speechTextRef.current = clean;
          setInterimTranscript(clean);
        };

        recognition.onerror = () => {
          // Quietly ignore Web Speech API errors since MediaRecorder captures raw audio for Gemini
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        // Quiet fallback
      }
    }
  };

  // Stop Voice Recording & Send
  const stopRecordingAndSend = () => {
    if (!isRecordingRef.current) return;
    const currentSessionId = activeSessionIdRef.current;
    isRecordingRef.current = false;
    setIsHoldingToTalk(false);

    // Stop Web Speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    // Stop MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }

    // Release microphone tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    // Brief delay to capture final chunks & speech transcripts
    setTimeout(async () => {
      if (activeSessionIdRef.current !== currentSessionId) return;

      const textFromSpeech = speechTextRef.current.trim();
      const chunks = [...audioChunksRef.current];
      speechTextRef.current = '';
      setInterimTranscript('');
      audioChunksRef.current = [];

      // If text was recognized by Web Speech API, send text
      if (textFromSpeech) {
        handleSendMessage(textFromSpeech);
        return;
      }

      // If text was not recognized (e.g. SpeechRecognition blocked in iframe) but audio was captured:
      if (chunks.length > 0) {
        try {
          const audioBlob = new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' });
          if (audioBlob.size > 500) {
            const base64Audio = await blobToBase64(audioBlob);
            handleSendMessage('', base64Audio, chunks[0]?.type || 'audio/webm');
            return;
          }
        } catch {}
      }
    }, 280);
  };

  // Pointer event handlers for rock-solid hold-to-talk
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only primary mouse button or touch/pen
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Prime speech synthesis on user interaction to bypass browser autoplay restrictions
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }

    if (micMode === 'tap') {
      if (isHoldingToTalk) {
        stopRecordingAndSend();
      } else {
        startRecording();
      }
      return;
    }

    // In 'hold' mode:
    e.preventDefault();
    isPointerDownRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    startRecording();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (micMode === 'tap') return;
    if (!isPointerDownRef.current) return;
    e.preventDefault();
    isPointerDownRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    stopRecordingAndSend();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (micMode === 'tap') return;
    if (!isPointerDownRef.current) return;
    e.preventDefault();
    isPointerDownRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    stopRecordingAndSend();
  };

  // Send message or audio to AI
  const handleSendMessage = async (textToSend: string, audioBase64?: string, audioMimeType?: string) => {
    const messageText = textToSend.trim();
    if (!messageText && !audioBase64) return;
    if (isLoading) return;

    if (speakingId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText || '🎙️ Đang nghe giọng nói của bạn...',
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          audioBase64,
          audioMimeType,
          tutorId: selectedTutorId,
          voiceLang,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            text: m.chinese || m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi kết nối từ gia sư.');
      }

      const data = await response.json();

      // If user spoke via audio and Gemini recognized their spoken text, update user message
      if (!messageText && data.userSpokenText) {
        setMessages((prev) => 
          prev.map((m) => m.id === userMsg.id ? { ...m, text: data.userSpokenText } : m)
        );
      }

      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        chinese: data.chinese,
        pinyin: data.pinyin,
        vietnamese: data.vietnamese,
        audioText: data.audioText || data.chinese,
        text: data.reply || data.chinese,
        timestamp: 'Vừa xong',
        feedback: data.feedback,
        quickReplies: data.quickReplies
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Auto pronounce response if enabled
      if (autoSpeak) {
        speakConversationalTutor(aiMsg);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        chinese: '抱歉，刚才网络有点不稳定，请您再说一遍好吗？',
        pinyin: 'Bàoqiàn, gāngcái wǎngluò yǒudiǎn bù wěndìng, qǐng nín zài shuō yí biàn hǎo ma?',
        vietnamese: 'Xin lỗi bạn, mạng vừa rồi hơi chập chờn, bạn nói lại giúp mình nhé!',
        audioText: '抱歉，刚才网络有点不稳定，请您再说一遍好吗？',
        text: 'Xin lỗi, mạng vừa rồi hơi chập chờn, bạn nói lại giúp mình nhé!',
        timestamp: 'Vừa xong'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch Tutor Persona
  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    setShowTutorPicker(false);
    const tutor = TUTORS.find((t) => t.id === tutorId) || TUTORS[0];

    const switchMsg: ChatMessage = {
      id: `tutor-switch-${Date.now()}`,
      role: 'model',
      chinese: tutor.greetingChinese,
      pinyin: tutor.greetingPinyin,
      vietnamese: tutor.greetingVi,
      audioText: tutor.greetingChinese,
      text: `${tutor.greetingChinese}\n(${tutor.greetingPinyin})\n${tutor.greetingVi}`,
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, switchMsg]);
    if (autoSpeak) {
      speakConversationalTutor(switchMsg);
    }
  };

  // Reset conversation
  const handleClearChat = () => {
    if (speakingId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'model',
        chinese: activeTutor.greetingChinese,
        pinyin: activeTutor.greetingPinyin,
        vietnamese: activeTutor.greetingVi,
        audioText: activeTutor.greetingChinese,
        text: `${activeTutor.greetingChinese}\n(${activeTutor.greetingPinyin})\n${activeTutor.greetingVi}`,
        timestamp: 'Vừa xong',
        quickReplies: [
          { hanzi: '好的，我们重新开始吧！', pinyin: 'Hǎo de, wǒmen chóngxīn kāishǐ ba!', vi: 'Vâng, chúng ta bắt đầu lại nhé!' }
        ]
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] max-w-4xl mx-auto w-full px-3 sm:px-6 py-3">
      
      {/* Micro Permission Alert Banner if not-allowed */}
      {micPermissionDenied && (
        <div className="mb-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-sm animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start sm:items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-semibold text-amber-950">
                Chưa nhận được quyền Micro từ trình duyệt
              </p>
              <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                Vui lòng bấm biểu tượng ổ khóa 🔒 hoặc Micro 🎙️ trên thanh địa chỉ chọn <strong>Cho phép (Allow)</strong>.
                {isInIframe && (
                  <span className="block sm:inline sm:ml-1 text-[#C45827] font-medium">
                    (Hoặc bấm mở tab riêng để tránh giới hạn bảo mật của khung xem trước)
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={requestMicPermission}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-[#C45827] hover:bg-[#A3431A] text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs text-center"
            >
              Thử lại Micro
            </button>
            {isInIframe && (
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-xl font-semibold transition-colors cursor-pointer shadow-xs text-center inline-flex items-center justify-center gap-1"
              >
                <span>Mở tab riêng</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Permission Success Notice */}
      {micPermissionNotice && (
        <div className="mb-2 bg-emerald-50 border border-emerald-300 rounded-2xl p-2.5 flex items-center gap-2 text-xs text-emerald-900 shadow-sm animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{micPermissionNotice}</span>
        </div>
      )}

      {/* 1. MINIMAL HEADER BAR */}
      <header className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#4A190F]/10 shadow-xs px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2.5 shrink-0 relative z-30">
        
        {/* Tutor Identity & Dropdown Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowTutorPicker(!showTutorPicker)}
            className="flex items-center gap-2 hover:bg-orange-50/60 p-1.5 rounded-xl transition-colors cursor-pointer text-left"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C45827] to-[#A3431A] text-xl flex items-center justify-center shadow-xs">
                {activeTutor.avatar}
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isHoldingToTalk 
                  ? 'bg-rose-500 animate-ping' 
                  : isLoading 
                  ? 'bg-amber-400 animate-pulse' 
                  : speakingId 
                  ? 'bg-orange-500' 
                  : 'bg-emerald-500'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#4A190F]">
                <span>{activeTutor.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                {isHoldingToTalk ? (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    Đang nghe bạn nói...
                  </span>
                ) : isLoading ? (
                  <span className="text-amber-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    Đang suy nghĩ...
                  </span>
                ) : speakingId ? (
                  <span className="text-orange-600 font-semibold flex items-center gap-1">
                    <Volume2 className="w-3 h-3 animate-bounce" />
                    Đang phát âm...
                  </span>
                ) : (
                  <span>{activeTutor.title}</span>
                )}
              </div>
            </div>
          </button>

          {/* Tutor Persona Picker Dropdown */}
          {showTutorPicker && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                Chọn gia sư đồng hành:
              </div>
              {TUTORS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTutor(t.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    t.id === selectedTutorId ? 'bg-orange-50 text-[#C45827] font-bold' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{t.avatar}</span>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold leading-tight">{t.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{t.title}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Controls: Language Selector, Auto-speak, Reset */}
        <div className="flex items-center gap-2">
          
          {/* Language Selector Button & Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100/90 hover:bg-orange-50 hover:text-[#C45827] rounded-xl border border-gray-200/80 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Chọn ngôn ngữ nói"
            >
              <span className="text-sm">{activeLanguage.flag}</span>
              <span className="max-w-[80px] sm:max-w-none truncate">{activeLanguage.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Language Popover */}
            {showLangPicker && (
              <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 flex flex-col max-h-96">
                
                {/* Search Language Header */}
                <div className="p-1.5 border-b border-gray-100 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    placeholder="Tìm ngôn ngữ nói..."
                    className="w-full text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>

                {/* Popular Language Quick Badges */}
                <div className="p-2 border-b border-gray-100 flex flex-wrap gap-1">
                  {['auto', 'vi-VN', 'zh-CN', 'en-US', 'ja-JP', 'ko-KR'].map((code) => {
                    const l = WORLD_LANGUAGES.find((item) => item.code === code);
                    if (!l) return null;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          setVoiceLang(code);
                          setShowLangPicker(false);
                          setLangSearch('');
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                          voiceLang === code ? 'bg-[#C45827] text-white font-bold' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Full Language List */}
                <div className="overflow-y-auto flex-1 p-1 space-y-0.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                    Danh sách ngôn ngữ ({filteredLanguages.length}):
                  </div>
                  {filteredLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setVoiceLang(l.code);
                        setShowLangPicker(false);
                        setLangSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        voiceLang === l.code ? 'bg-orange-50 text-[#C45827] font-bold' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{l.flag}</span>
                        <span className="truncate">{l.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">({l.nativeName})</span>
                      </div>
                      {voiceLang === l.code && <Check className="w-3.5 h-3.5 text-[#C45827] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auto Speak Toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              autoSpeak 
                ? 'bg-orange-50 text-[#C45827] border-orange-200' 
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
            title={autoSpeak ? 'Tự động phát giọng đọc AI (Bật)' : 'Tự động phát giọng đọc AI (Tắt)'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Chat */}
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-[#C45827] hover:bg-orange-50/50 rounded-xl transition-colors border border-gray-200 cursor-pointer"
            title="Làm mới hội thoại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN 1-1 DIALOGUE STREAM */}
      <div className="flex-1 overflow-y-auto py-4 px-1 flex flex-col gap-3.5 scroll-smooth">
        {messages.map((msg) => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 ${
                isModel ? 'self-start max-w-[92%] sm:max-w-[85%]' : 'self-end flex-row-reverse max-w-[88%] sm:max-w-[78%]'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-base border ${
                  isModel
                    ? 'bg-[#C45827] text-white border-orange-200'
                    : 'bg-[#4A190F] text-white border-[#4A190F]'
                }`}
              >
                {isModel ? activeTutor.avatar : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col gap-1.5 w-full">
                <div
                  className={`p-4 rounded-2xl transition-all shadow-xs ${
                    isModel
                      ? 'bg-white border border-[#4A190F]/10 text-[#3A1910]'
                      : 'bg-[#C45827] text-white'
                  }`}
                >
                  {isModel ? (
                    <div className="space-y-3">
                      {/* 1. Lời giải thích / Hướng dẫn thân thiện bằng tiếng Việt (hoặc ngôn ngữ người học) */}
                      {msg.vietnamese ? (
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="text-sm sm:text-base text-[#3A1910] leading-relaxed font-medium">
                            {msg.vietnamese}
                          </div>
                          <button
                            type="button"
                            onClick={() => speakAudio(msg.vietnamese!, `${msg.id}-vi`, 'vi')}
                            className={`p-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                              speakingId === `${msg.id}-vi`
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 shadow-2xs'
                            }`}
                            title="Nghe đọc tiếng Việt chuẩn"
                          >
                            {speakingId === `${msg.id}-vi` ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span className="text-[11px]">Đọc tiếng Việt</span>
                          </button>
                        </div>
                      ) : !msg.chinese && (
                        <div className="text-sm sm:text-base text-[#3A1910] leading-relaxed font-medium">
                          {msg.text}
                        </div>
                      )}

                      {/* 2. Thẻ Từ vựng / Câu tiếng Trung trọng tâm */}
                      {msg.chinese && (
                        <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-0.5">
                            <div className="text-lg sm:text-xl font-bold text-[#4A190F] tracking-wide">
                              {msg.chinese}
                            </div>
                            {msg.pinyin && (
                              <div className="text-xs sm:text-sm text-[#C45827] font-mono font-medium">
                                {msg.pinyin}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => speakAudio(msg.chinese!, `${msg.id}-zh`, 'zh-CN')}
                            className={`p-2 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                              speakingId === `${msg.id}-zh`
                                ? 'bg-[#C45827] text-white shadow-xs'
                                : 'bg-white hover:bg-orange-100 text-[#C45827] border border-orange-200 shadow-2xs'
                            }`}
                            title="Nghe phát âm tiếng Trung chuẩn phổ thông"
                          >
                            {speakingId === `${msg.id}-zh` ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                            <span>Phát âm chuẩn</span>
                          </button>
                        </div>
                      )}

                      {/* 3. Pedagogical Correction & Tips (if user had mistakes) */}
                      {msg.feedback && msg.feedback.userCorrection && (
                        <div className="pt-2 border-t border-gray-100 space-y-1 text-xs text-gray-700 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900">
                            <GraduationCap className="w-3.5 h-3.5 text-[#C45827]" />
                            <span>Góp ý cách nói chuẩn bản xứ:</span>
                          </div>
                          <p className="font-medium text-[#4A190F]">
                            👉 {msg.feedback.userCorrection}
                          </p>
                          {msg.feedback.grammarTip && (
                            <p className="text-gray-600 text-[11px]">
                              💡 {msg.feedback.grammarTip}
                            </p>
                          )}
                          {msg.feedback.toneNote && (
                            <p className="text-gray-600 text-[11px]">
                              🎯 {msg.feedback.toneNote}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-medium">
                      {msg.text}
                    </div>
                  )}
                </div>

                {/* Speaker Buttons for Model message */}
                {isModel && (
                  <div className="flex items-center flex-wrap gap-2 px-2 text-xs text-gray-400">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => speakConversationalTutor(msg)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                        speakingId === msg.id 
                          ? 'bg-[#C45827] text-white border-[#C45827] font-bold ring-2 ring-[#C45827]/30' 
                          : 'bg-orange-50/90 hover:bg-orange-100 text-[#C45827] border-orange-200/90 font-medium'
                      }`}
                      title="Nghe gia sư nói chuyện đàm thoại: tiếng Việt trước rồi đến phát âm tiếng Trung"
                    >
                      {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{speakingId === msg.id ? 'Đang nói...' : 'Nghe đàm thoại (Việt + Trung)'}</span>
                    </button>
                    {msg.chinese && (
                      <button
                        onClick={() => speakAudio(msg.chinese!, `${msg.id}-zh`, 'zh-CN')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          speakingId === `${msg.id}-zh`
                            ? 'bg-[#C45827] text-white font-bold border-[#C45827]'
                            : 'bg-white hover:bg-orange-50 text-[#C45827] border-orange-200/80 font-medium'
                        }`}
                        title="Nghe phát âm chuẩn tiếng Trung"
                      >
                        {speakingId === `${msg.id}-zh` ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{speakingId === `${msg.id}-zh` ? 'Đang đọc...' : 'Nghe tiếng Trung (Chuẩn)'}</span>
                      </button>
                    )}
                    {msg.vietnamese && (
                      <button
                        onClick={() => speakAudio(msg.vietnamese!, `${msg.id}-vi`, 'vi')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          speakingId === `${msg.id}-vi`
                            ? 'bg-amber-600 text-white font-bold border-amber-600'
                            : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-200/80 font-medium'
                        }`}
                        title="Nghe giọng đọc tiếng Việt chuẩn"
                      >
                        {speakingId === `${msg.id}-vi` ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{speakingId === `${msg.id}-vi` ? 'Đang đọc...' : 'Nghe tiếng Việt'}</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Quick Suggested Replies */}
                {isModel && msg.quickReplies && msg.quickReplies.length > 0 && msg.id === messages[messages.length - 1]?.id && (
                  <div className="flex flex-wrap gap-1.5 mt-1 px-1">
                    {msg.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qr.hanzi)}
                        className="px-3 py-1 bg-white hover:bg-orange-50 border border-orange-200/80 hover:border-[#C45827] text-[#4A190F] rounded-full text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{qr.hanzi}</span>
                        {qr.pinyin && <span className="text-[10px] text-gray-400">({qr.pinyin})</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Interim speech transcript preview while recording */}
        {isHoldingToTalk && (
          <div className="self-end max-w-[85%] bg-orange-100 text-[#4A190F] p-3 rounded-2xl border border-orange-300 text-sm animate-pulse shadow-sm">
            <span className="text-[10px] font-bold text-orange-600 uppercase block mb-0.5">
              Đang nghe bạn nói:
            </span>
            {interimTranscript ? (
              <span>"{interimTranscript}"</span>
            ) : (
              <span className="italic text-gray-500">Hãy nói vào micro... âm thanh đang được ghi nhận</span>
            )}
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 self-start max-w-[85%]">
            <div className="w-9 h-9 rounded-2xl bg-[#C45827] text-white flex items-center justify-center shrink-0 shadow-xs text-base">
              {activeTutor.avatar}
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#4A190F]/10 flex items-center gap-2 shadow-xs">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C45827] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#C45827]/70 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#C45827]/40 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-gray-500 italic ml-1">
                {activeTutor.name} đang suy nghĩ...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. CENTERPIECE: TALK BUTTON & INPUT CONTROLS */}
      <div className="pt-2 shrink-0 flex flex-col items-center gap-2">
        
        {/* Mic Mode Selector: Hold vs Tap */}
        <div className="flex items-center gap-1 bg-gray-100/90 p-0.5 rounded-xl border border-gray-200/80 text-[11px] shadow-2xs">
          <button
            type="button"
            onClick={() => setMicMode('hold')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              micMode === 'hold' ? 'bg-white text-[#C45827] shadow-xs' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Giữ để nói
          </button>
          <button
            type="button"
            onClick={() => setMicMode('tap')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              micMode === 'tap' ? 'bg-white text-[#C45827] shadow-xs' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Chạm 1 lần để nói
          </button>
        </div>

        {/* Talk Big Button */}
        <div className="relative flex flex-col items-center">
          {/* Animated sound ripple rings while recording */}
          {isHoldingToTalk && (
            <>
              <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping -m-2 pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-pulse -m-4 pointer-events-none" />
            </>
          )}

          <button
            type="button"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onContextMenu={(e) => e.preventDefault()}
            className={`relative z-10 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center gap-3 shadow-lg select-none transition-all cursor-pointer touch-none ${
              isHoldingToTalk
                ? 'bg-rose-600 text-white scale-105 ring-4 ring-rose-300 animate-pulse'
                : 'bg-gradient-to-r from-[#C45827] to-[#A3431A] hover:opacity-95 text-white active:scale-95'
            }`}
          >
            {isHoldingToTalk ? (
              <>
                <MicOff className="w-6 h-6 animate-spin" />
                <span>
                  {micMode === 'hold' ? 'Đang nghe... Thả tay để gửi' : 'Đang nghe... Chạm lại để gửi'}
                </span>
              </>
            ) : (
              <>
                <Mic className="w-6 h-6" />
                <span>
                  {micMode === 'hold' ? 'Giữ để nói' : 'Chạm để nói'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Sub-bar: Instructions & Keyboard Input Toggle */}
        <div className="flex items-center justify-between w-full text-xs text-gray-400 px-2">
          <span className="flex items-center gap-1.5 text-gray-500 font-medium text-[11px] sm:text-xs">
            <Mic className="w-3.5 h-3.5 text-[#C45827]" />
            {micMode === 'hold'
              ? 'Nhấn giữ nút để nói, thả tay ra để gửi câu đối thoại.'
              : 'Bấm nút 1 lần để nói, bấm lại lần nữa để gửi câu.'}
          </span>
          <button
            onClick={() => setShowKeyboardInput(!showKeyboardInput)}
            className="flex items-center gap-1 text-gray-500 hover:text-[#C45827] ml-auto transition-colors cursor-pointer shrink-0"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{showKeyboardInput ? 'Ẩn gõ chữ' : 'Gõ chữ'}</span>
          </button>
        </div>

        {/* Optional Keyboard Input Area */}
        {showKeyboardInput && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                handleSendMessage(input);
              }
            }}
            className="w-full flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-1.5 shadow-xs focus-within:border-[#C45827] focus-within:ring-1 focus-within:ring-[#C45827] transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu đối thoại bằng bất kỳ ngôn ngữ nào..."
              className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-[#C45827] text-white rounded-xl hover:bg-[#A3431A] disabled:bg-gray-200 disabled:text-gray-400 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
