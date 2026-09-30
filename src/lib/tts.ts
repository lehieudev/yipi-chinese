// Standard native pronunciation audio utility
let activeTtsAudio: HTMLAudioElement | null = null;

export const speak = (text: string, lang = 'zh-CN') => {
  if (!text || !text.trim()) return;

  // Stop any ongoing audio
  if (activeTtsAudio) {
    try {
      activeTtsAudio.pause();
      activeTtsAudio.currentTime = 0;
    } catch {}
    activeTtsAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  const normalizedLang = lang.startsWith('vi') ? 'vi' : 'zh-CN';
  const url = `/api/ai-tutor/tts?text=${encodeURIComponent(text.trim())}&lang=${encodeURIComponent(normalizedLang)}`;
  
  const audio = new Audio(url);
  activeTtsAudio = audio;

  audio.onended = () => {
    if (activeTtsAudio === audio) activeTtsAudio = null;
  };

  audio.onerror = () => {
    // Fallback to browser SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = normalizedLang === 'vi' ? 'vi-VN' : 'zh-CN';
      utterance.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(v => normalizedLang === 'vi' ? v.lang.startsWith('vi') : v.lang.startsWith('zh'));
      if (matched) utterance.voice = matched;
      window.speechSynthesis.speak(utterance);
    }
  };

  audio.play().catch(() => {
    // Autoplay fallback
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = normalizedLang === 'vi' ? 'vi-VN' : 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  });
};

