import React, { useState, useRef, useEffect } from 'react';
import { speak } from '../lib/tts';
import { 
  StickyNote, 
  PenLine, 
  X, 
  Plus, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Trash2, 
  Search, 
  BookMarked,
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';

export interface QuickNoteItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  tag: 'character' | 'phrase' | 'grammar' | 'reminder';
  createdAt: string;
}

const TAG_CONFIG = {
  character: { label: 'Chữ Hán', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  phrase: { label: 'Cụm từ', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  grammar: { label: 'Ngữ pháp', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  reminder: { label: 'Lưu ý', color: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export const QuickNotes: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // In-session notes state
  const [notes, setNotes] = useState<QuickNoteItem[]>([
    {
      id: 'init-1',
      hanzi: '加油',
      pinyin: 'jiāyóu',
      meaning: 'Cố lên! (Thường dùng để khích lệ, cổ vũ)',
      tag: 'phrase',
      createdAt: 'Vừa xong',
    },
    {
      id: 'init-2',
      hanzi: '学习',
      pinyin: 'xuéxí',
      meaning: 'Học tập, rèn luyện',
      tag: 'character',
      createdAt: 'Vừa xong',
    },
  ]);

  // Form inputs
  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [meaning, setMeaning] = useState('');
  const [tag, setTag] = useState<'character' | 'phrase' | 'grammar' | 'reminder'>('phrase');
  
  // UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const hanziInputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        hanziInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle Text to Speech
  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(id);
    speak(text, 'zh-CN');
    setTimeout(() => {
      setSpeakingId(null);
    }, 2000);
  };

  // Handle Add Note
  const handleAddNote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedHanzi = hanzi.trim();
    const trimmedMeaning = meaning.trim();

    if (!trimmedHanzi) {
      setFormError('Vui lòng nhập chữ Hán hoặc cụm từ cần ghi chú.');
      hanziInputRef.current?.focus();
      return;
    }

    if (!trimmedMeaning) {
      setFormError('Vui lòng nhập ý nghĩa hoặc lời nhắc.');
      return;
    }

    const newNote: QuickNoteItem = {
      id: Date.now().toString(),
      hanzi: trimmedHanzi,
      pinyin: pinyin.trim(),
      meaning: trimmedMeaning,
      tag,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setNotes((prev) => [newNote, ...prev]);
    setHanzi('');
    setPinyin('');
    setMeaning('');
    setFormError('');

    // Re-focus for rapid continuous entry
    hanziInputRef.current?.focus();
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Copy single note
  const handleCopyNote = (note: QuickNoteItem) => {
    const text = `${note.hanzi} [${note.pinyin || ''}]: ${note.meaning}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Copy all notes
  const handleCopyAll = () => {
    if (notes.length === 0) return;
    const allText = notes
      .map((n, i) => `${i + 1}. ${n.hanzi} (${n.pinyin || '-'}): ${n.meaning} [${TAG_CONFIG[n.tag].label}]`)
      .join('\n');

    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesSearch = 
      n.hanzi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTagFilter === 'all' || n.tag === selectedTagFilter;
    return matchesSearch && matchesTag;
  });

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        id="quick-notes-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Mở ghi chú nhanh"
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#C45827] hover:bg-[#A3431A] active:scale-95 text-white rounded-full shadow-lg shadow-[#C45827]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group border border-white/20"
      >
        <div className="relative">
          <PenLine className="w-5 h-5 transition-transform group-hover:rotate-12" />
          {notes.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#C45827] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {notes.length}
            </span>
          )}
        </div>
        <span className="font-bold text-sm tracking-wide hidden sm:inline">
          Ghi chú nhanh
        </span>
      </button>

      {/* Quick Notes Modal */}
      {isOpen && (
        <div 
          id="quick-notes-modal-overlay"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            id="quick-notes-modal-card"
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#4A190F]/10 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#4A190F]/10 flex items-center justify-between bg-gradient-to-r from-orange-50/70 to-amber-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C45827] text-white flex items-center justify-center shadow-sm shadow-[#C45827]/30">
                  <StickyNote className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#4A190F]">
                      Ghi Chú Nhanh
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C45827]/10 text-[#C45827]">
                      Phiên học này ({notes.length})
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ghi lại từ mới, mẫu câu hoặc ngữ pháp bạn vừa bắt gặp
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {notes.length > 0 && (
                  <button
                    onClick={handleCopyAll}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#682315] hover:bg-white rounded-xl border border-[#4A190F]/10 transition-colors"
                    title="Sao chép toàn bộ danh sách ghi chú"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAll ? 'Đã chép tất cả' : 'Sao chép hết'}</span>
                  </button>
                )}
                <button
                  id="close-quick-notes-btn"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
              {/* Rapid Input Form */}
              <form onSubmit={handleAddNote} className="bg-[#FAEDE6]/50 rounded-2xl p-4 border border-[#4A190F]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C45827] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Thêm từ / cụm từ mới
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Phím tắt: Enter để thêm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Hanzi input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A190F] mb-1">
                      Chữ Hán / Cụm từ <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={hanziInputRef}
                      type="text"
                      value={hanzi}
                      onChange={(e) => {
                        setHanzi(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="vd: 苹果, 没关系..."
                      className="w-full px-3.5 py-2 text-base font-serif bg-white border border-[#4A190F]/15 rounded-xl focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/10 transition-all text-[#4A190F]"
                    />
                  </div>

                  {/* Pinyin input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A190F] mb-1">
                      Phiên âm Pinyin (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={pinyin}
                      onChange={(e) => setPinyin(e.target.value)}
                      placeholder="vd: píngguǒ, méi guānxi..."
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#4A190F]/15 rounded-xl focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/10 transition-all text-gray-800"
                    />
                  </div>
                </div>

                {/* Meaning input */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A190F] mb-1">
                    Ý nghĩa / Ngữ cảnh gợi nhớ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={meaning}
                    onChange={(e) => {
                      setMeaning(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="vd: Quả táo / Không có gì đâu (đáp lại lời cảm ơn)..."
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#4A190F]/15 rounded-xl focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/10 transition-all text-gray-800"
                  />
                </div>

                {/* Tag Selection & Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-medium text-gray-500 mr-1">Phân loại:</span>
                    {(Object.keys(TAG_CONFIG) as Array<keyof typeof TAG_CONFIG>).map((tKey) => (
                      <button
                        key={tKey}
                        type="button"
                        onClick={() => setTag(tKey)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          tag === tKey
                            ? `${TAG_CONFIG[tKey].color} ring-2 ring-[#C45827]/30 shadow-2xs`
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {TAG_CONFIG[tKey].label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    id="submit-quick-note-btn"
                    className="px-4 py-2 bg-[#C45827] hover:bg-[#A3431A] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-[#C45827]/25 flex items-center justify-center gap-1.5 transition-colors self-end sm:self-auto shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm nhanh</span>
                  </button>
                </div>

                {formError && (
                  <p className="text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                    {formError}
                  </p>
                )}
              </form>

              {/* Notes List Section */}
              <div className="space-y-3">
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm từ đã ghi chú..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#C45827]"
                    />
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setSelectedTagFilter('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        selectedTagFilter === 'all'
                          ? 'bg-[#4A190F] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Tất cả ({notes.length})
                    </button>
                    {(Object.keys(TAG_CONFIG) as Array<keyof typeof TAG_CONFIG>).map((tKey) => {
                      const count = notes.filter((n) => n.tag === tKey).length;
                      if (count === 0 && selectedTagFilter !== tKey) return null;
                      return (
                        <button
                          key={tKey}
                          onClick={() => setSelectedTagFilter(tKey)}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                            selectedTagFilter === tKey
                              ? 'bg-[#4A190F] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {TAG_CONFIG[tKey].label} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Render Notes */}
                {filteredNotes.length === 0 ? (
                  <div className="py-10 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <BookMarked className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-sm font-semibold text-gray-600">
                      Chưa có ghi chú nào phù hợp
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Hãy dùng biểu mẫu phía trên để lưu lại bất kỳ từ hoặc mẫu câu nào bạn gặp trong lúc học!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-white p-3.5 rounded-2xl border border-gray-100 hover:border-orange-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-xl font-bold font-serif text-[#4A190F] tracking-wide">
                                {note.hanzi}
                              </span>
                              {note.pinyin && (
                                <span className="text-xs font-medium text-[#C45827] italic">
                                  [{note.pinyin}]
                                </span>
                              )}
                            </div>

                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                                TAG_CONFIG[note.tag].color
                              }`}
                            >
                              {TAG_CONFIG[note.tag].label}
                            </span>
                          </div>

                          <p className="text-xs text-gray-700 leading-relaxed font-medium">
                            {note.meaning}
                          </p>
                        </div>

                        {/* Card bottom actions */}
                        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-gray-50 text-gray-400">
                          <span className="text-[10px] text-gray-400">
                            {note.createdAt}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Pronounce TTS */}
                            <button
                              onClick={() => handleSpeak(note.hanzi, note.id)}
                              className={`p-1.5 rounded-lg hover:bg-orange-50 transition-colors ${
                                speakingId === note.id ? 'text-[#C45827]' : 'hover:text-[#C45827]'
                              }`}
                              title="Nghe phát âm tiếng Trung"
                            >
                              {speakingId === note.id ? (
                                <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Copy note */}
                            <button
                              onClick={() => handleCopyNote(note)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                              title="Sao chép từ này"
                            >
                              {copiedId === note.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Delete note */}
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Xóa ghi chú"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 sm:px-6 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Ghi chú lưu trong suốt phiên duyệt web của bạn
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 bg-white hover:bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
