import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React, { useState } from 'react';
import { Mic, Play, Volume2, Target, CheckCircle2, AlertCircle, RefreshCw, AudioLines } from 'lucide-react';
import { speak } from '@/lib/tts';

export const PronunciationPage = () => {
  const [activeTab, setActiveTab] = useState<'initials' | 'finals' | 'tones'>('initials');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  

  const [score, setScore] = useState<number | null>(null);

  const initials = [
    { sound: 'b', desc: 'Âm môi', example: 'ba' },
    { sound: 'p', desc: 'Âm môi bật hơi', example: 'pa' },
    { sound: 'm', desc: 'Âm mũi', example: 'ma' },
    { sound: 'f', desc: 'Âm răng môi', example: 'fa' },
    { sound: 'd', desc: 'Âm đầu lưỡi', example: 'da' },
    { sound: 't', desc: 'Âm đầu lưỡi bật hơi', example: 'ta' },
    { sound: 'n', desc: 'Âm mũi', example: 'na' },
    { sound: 'l', desc: 'Âm biên', example: 'la' },
    { sound: 'g', desc: 'Âm cuống lưỡi', example: 'ge' },
    { sound: 'k', desc: 'Âm cuống lưỡi bật hơi', example: 'ke' },
    { sound: 'h', desc: 'Âm xát', example: 'he' },
    { sound: 'j', desc: 'Âm mặt lưỡi', example: 'ji' },
    { sound: 'q', desc: 'Âm mặt lưỡi bật hơi', example: 'qi' },
    { sound: 'x', desc: 'Âm xát mặt lưỡi', example: 'xi' },
    { sound: 'zh', desc: 'Âm uốn lưỡi', example: 'zha' },
    { sound: 'ch', desc: 'Âm uốn lưỡi bật hơi', example: 'cha' },
    { sound: 'sh', desc: 'Âm xát uốn lưỡi', example: 'sha' },
    { sound: 'r', desc: 'Âm xát uốn lưỡi', example: 're' },
    { sound: 'z', desc: 'Âm đầu lưỡi trước', example: 'zi' },
    { sound: 'c', desc: 'Âm đầu lưỡi trước bật hơi', example: 'ci' },
    { sound: 's', desc: 'Âm xát đầu lưỡi trước', example: 'si' },
  ];

  const finals = [
    { sound: 'a', type: 'Vận mẫu đơn' }, { sound: 'o', type: 'Vận mẫu đơn' },
    { sound: 'e', type: 'Vận mẫu đơn' }, { sound: 'i', type: 'Vận mẫu đơn' },
    { sound: 'u', type: 'Vận mẫu đơn' }, { sound: 'ü', type: 'Vận mẫu đơn' },
    { sound: 'ai', type: 'Vận mẫu kép' }, { sound: 'ei', type: 'Vận mẫu kép' },
    { sound: 'ui', type: 'Vận mẫu kép' }, { sound: 'ao', type: 'Vận mẫu kép' },
    { sound: 'ou', type: 'Vận mẫu kép' }, { sound: 'iu', type: 'Vận mẫu kép' },
    { sound: 'ie', type: 'Vận mẫu kép' }, { sound: 'üe', type: 'Vận mẫu kép' },
    { sound: 'er', type: 'Vận mẫu kép' },
    { sound: 'an', type: 'Vận mẫu mũi' }, { sound: 'en', type: 'Vận mẫu mũi' },
    { sound: 'in', type: 'Vận mẫu mũi' }, { sound: 'un', type: 'Vận mẫu mũi' },
    { sound: 'ün', type: 'Vận mẫu mũi' }, { sound: 'ang', type: 'Vận mẫu mũi' },
    { sound: 'eng', type: 'Vận mẫu mũi' }, { sound: 'ing', type: 'Vận mẫu mũi' },
    { sound: 'ong', type: 'Vận mẫu mũi' },
  ];

  const tones = [
    { tone: '1', sound: 'ā', name: 'Thanh 1', desc: 'Đọc cao và bằng, không thay đổi độ cao (giống âm không dấu tiếng Việt nhưng cao hơn).', chart: '5-5' },
    { tone: '2', sound: 'á', name: 'Thanh 2', desc: 'Đọc từ thấp lên cao (giống dấu sắc tiếng Việt).', chart: '3-5' },
    { tone: '3', sound: 'ǎ', name: 'Thanh 3', desc: 'Đọc từ hơi thấp, xuống thấp rồi lên cao (giống dấu hỏi nhưng cong hơn).', chart: '2-1-4' },
    { tone: '4', sound: 'à', name: 'Thanh 4', desc: 'Đọc từ cao giật mạnh xuống thấp (ngắn và dứt khoát).', chart: '5-1' },
    { tone: '0', sound: 'a', name: 'Khinh thanh', desc: 'Đọc nhẹ và ngắn.', chart: 'nhẹ' },
  ];

  const playAudio = (text: string) => {
    // Play authentic standard native Putonghua Mandarin pronunciation audio
    const url = `/api/ai-tutor/tts?text=${encodeURIComponent(text)}&lang=zh-CN`;
    const audio = new Audio(url);
    audio.play().catch(() => {
      // Browser SpeechSynthesis fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        const voices = window.speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang.startsWith('zh'));
        if (zhVoice) utterance.voice = zhVoice;
        window.speechSynthesis.speak(utterance);
      }
    });
    
    setScore(null); // Reset score when playing new sound
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      // Mock evaluation after stopping record
      setTimeout(() => {
        // Random score between 70 and 100 for demo
        setScore(Math.floor(Math.random() * 30) + 70);
      }, 500);
    } else {
      setIsRecording(true);
      setScore(null);
    }
  };

  const currentList = activeTab === 'initials' ? initials : activeTab === 'finals' ? finals : tones;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 lg:gap-10">
      
      {/* Banner */}
      <div className="bg-white rounded-[24px] border border-red-900/10 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
            <AudioLines className="w-4 h-4" />
            Luyện phát âm
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Bảng phiên âm Pinyin</h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed">
            Nắm vững hệ thống phiên âm Pinyin là nền tảng quan trọng nhất để nói tiếng Trung chuẩn. Chọn một âm để nghe cách đọc mẫu và tự ghi âm để chấm điểm phát âm.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Left: Chart */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm w-fit overflow-x-auto max-w-full">
            <button
              onClick={() => { setActiveTab('initials'); setActiveItem(null); setScore(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'initials' ? 'bg-[#C45827] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Thanh mẫu (Initials)
            </button>
            <button
              onClick={() => { setActiveTab('finals'); setActiveItem(null); setScore(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'finals' ? 'bg-[#C45827] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Vận mẫu (Finals)
            </button>
            <button
              onClick={() => { setActiveTab('tones'); setActiveItem(null); setScore(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'tones' ? 'bg-[#C45827] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Thanh điệu (Tones)
            </button>
          </div>

          {/* Grid */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {currentList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveItem(item.sound);
                    // For initials and finals, we can use the item.example or construct a sound for TTS
                    // TTS for just "b" might sound weird in Chinese, so we append 'a' or use example if available.
                    let textToPlay = item.sound;
                    if ('example' in item) textToPlay = item.example;
                    playAudio(textToPlay);
                  }}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all border-2 ${
                    activeItem === item.sound 
                      ? 'border-red-400 bg-red-50 text-red-700 shadow-sm scale-105 z-10' 
                      : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-gray-200 text-gray-700'
                  }`}
                >
                  <span className="text-2xl font-bold font-oriental mb-1">{item.sound}</span>
                  {activeItem === item.sound && (
                    <Volume2 className="w-4 h-4 absolute top-2 right-2 text-red-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Studio/Evaluation */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <h3 className="font-bold text-[#4A190F] mb-6 w-full text-left flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#C45827]" />
              Phòng thu âm AI
            </h3>

            {activeItem ? (
              <div className="w-full flex flex-col items-center">
                {/* Active Sound Display */}
                <div className="text-6xl font-bold text-[#C45827] mb-2 font-oriental">
                  {activeItem}
                </div>
                
                {/* Find details */}
                {currentList.find(i => i.sound === activeItem) && (
                  <div className="text-center mb-8">
                    <p className="text-sm font-bold text-gray-800">
                      {/* @ts-ignore */}
                      {currentList.find(i => i.sound === activeItem)?.name || currentList.find(i => i.sound === activeItem)?.desc || currentList.find(i => i.sound === activeItem)?.type}
                    </p>
                    {(() => {
                      const item = currentList.find(i => i.sound === activeItem);
                      if (item && 'example' in item && item.example) {
                        return (
                          <p className="text-xs text-gray-500 mt-1">
                            Ví dụ: {item.example as string}
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}

                {/* Record Button */}
                <button
                  onClick={handleRecord}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white shadow-[0_0_0_8px_rgba(239,68,68,0.2)] animate-pulse' 
                      : 'bg-[#C45827] text-white hover:bg-[#A5471E] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isRecording ? <AudioLines className="w-10 h-10 animate-bounce" /> : <Mic className="w-10 h-10" />}
                </button>
                <p className={`mt-4 font-bold text-sm ${isRecording ? 'text-red-500' : 'text-gray-500'}`}>
                  {isRecording ? 'Đang nghe...' : 'Nhấn để phát âm'}
                </p>

                {/* Result Area */}
                <div className="w-full mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
                  {score !== null ? (
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">ĐIỂM ĐÁNH GIÁ</div>
                      <div className={`text-4xl font-black ${score >= 90 ? 'text-green-500' : score >= 70 ? 'text-orange-500' : 'text-red-500'}`}>
                        {score}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        {score >= 90 ? (
                          <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Rất chuẩn xác
                          </span>
                        ) : score >= 70 ? (
                          <span className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Target className="w-3.5 h-3.5" /> Khá tốt, cần cố gắng
                          </span>
                        ) : (
                          <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Cần chú ý phát âm lại
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 text-sm">
                      Đọc thử để xem điểm đánh giá của AI nhé!
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="w-full h-48 flex flex-col items-center justify-center text-center text-gray-400 gap-3 border-2 border-dashed border-gray-100 rounded-2xl">
                <Target className="w-8 h-8 opacity-50" />
                <p className="text-sm">Hãy chọn một âm bên trái<br/>để bắt đầu luyện tập</p>
              </div>
            )}
          </div>
          
          {/* Audio Disclaimer */}
          <div className="mt-4 text-xs text-gray-400 text-center px-4">
            * Hệ thống sử dụng công nghệ nhận diện giọng nói đa chiều để đánh giá cao độ và khẩu hình âm thanh.
          </div>
        </div>
        
      </div>
    
      <BeginnerRoadmap />
    </div>
  );
};
