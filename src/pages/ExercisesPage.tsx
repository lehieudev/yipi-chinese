import React, { useState } from 'react';
import { Dumbbell, ArrowRight, Brain, HelpCircle, ChevronDown, Lock } from 'lucide-react';
import { ExercisePlayer } from '@/components/ExercisePlayer';

export const ExercisesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);


  const exercises = [
    { id: 1, title: 'Bài tập sắp xếp từ thành câu hoàn chỉnh', desc: 'Ghép các từ xáo trộn lại thành một câu tiếng Trung đúng ngữ pháp.' },
    { id: 2, title: 'Bài tập điền từ vào chỗ trống', desc: 'Chọn từ đúng để điền vào chỗ trống trong câu, dựa theo nghĩa và ngữ cảnh.' },
    { id: 3, title: 'Bài tập nghe điền từ còn thiếu', desc: 'Nghe cả câu rồi chọn đúng từ đã bị lược khỏi câu.' },
    { id: 4, title: 'Bài tập nghe và sắp xếp nội dung theo thứ tự', desc: 'Nghe từng lượt thoại rồi sắp xếp lại đúng thứ tự cuộc hội thoại.' },
    { id: 5, title: 'Bài tập đọc hiểu và tự suy đoán điền từ', desc: 'Đọc cả đoạn văn rồi đoán từ khoá còn thiếu dựa vào mạch nghĩa xung quanh.' },
  ];

  const faqs = [
    { id: 1, q: 'Bài tập ở đây sinh ra từ đâu?', a: 'Các bài tập được tự động sinh ra (Generate) dựa trên nội dung (từ vựng, ngữ pháp) của các bài học trong giáo trình mà bạn đang học. Mỗi lần luyện tập là một đề mới hoàn toàn.' },
    { id: 2, q: 'Vì sao không thấy đủ cả 6 dạng bài ở một số cấp?', a: 'Tùy thuộc vào cấp độ và lượng từ vựng bạn đã học, hệ thống sẽ chọn lọc các dạng bài phù hợp nhất. Ở các cấp độ thấp, một số dạng bài yêu cầu từ vựng phong phú sẽ chưa được kích hoạt.' },
  ];

  
  if (activeLevel && activeExercise) {
    return (
      <div className="min-h-screen bg-[#FAEDE6] w-full p-0 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <ExercisePlayer 
          exerciseId={activeExercise} 
          level={activeLevel} 
          onBack={() => setActiveLevel(null)} 
        />
      </div>
    );
  }

  if (activeExercise) {
    const ex = exercises.find(e => e.id === activeExercise);
    return (
      <div className="p-6 lg:p-8 xl:px-12 max-w-[1000px] mx-auto w-full flex flex-col gap-8 bg-transparent">
        <button 
          onClick={() => setActiveExercise(null)}
          className="text-gray-500 hover:text-[#C45827] flex items-center gap-2 text-sm font-bold transition-colors w-fit"
        >
          <span className="text-lg leading-none">&lt;</span> BÀI TẬP - Luyện tập
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#4A190F] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[10px] text-red-600 font-bold shrink-0">
              {ex?.id}
            </span>
            {ex?.title}
          </h1>
          <p className="text-[#682315]/70 text-sm">{ex?.desc}</p>
        </div>

        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Chọn cấp độ để luyện</h2>
          
          <div className="flex flex-col gap-3">
            {[
              { id: 'HSK 1', isFree: true },
              { id: 'HSK 2', isFree: false },
              { id: 'HSK 3', isFree: false },
              { id: 'HSK 4', isFree: false },
              { id: 'HSK 5', isFree: false },
              { id: 'HSK 6', isFree: false },
              { id: 'HSK 7-9', isFree: false },
            ].map(lvl => (
              <div 
                key={lvl.id} 
                className={`flex items-center justify-between p-4 rounded-xl border ${lvl.isFree ? 'border-gray-200 bg-white hover:border-[#C45827]' : 'border-yellow-100 bg-yellow-50/30'} transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${lvl.isFree ? 'bg-[#4A190F] text-white' : 'bg-yellow-100 text-yellow-700'}`}>
                    {lvl.id.replace('HSK ', '')}
                  </div>
                  <div>
                    <div className="font-bold text-[#4A190F]">{lvl.id}</div>
                    <div className="text-xs text-gray-500">
                      {lvl.isFree ? 'Sinh đề mới mỗi lần luyện, không lặp lại' : 'Dành cho hội viên Premium'}
                    </div>
                  </div>
                </div>
                {lvl.isFree ? (
                  <button 
                    onClick={() => setActiveLevel(lvl.id)}
                    className="px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-[#4A190F] hover:bg-gray-50 flex items-center gap-2"
                  >
                    BẮT ĐẦU <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5" /> MỞ KHÓA
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto w-full flex flex-col gap-10 bg-transparent">
      
      {/* Banner */}
      <div className="bg-white rounded-[24px] border border-red-900/10 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
            <Dumbbell className="w-3.5 h-3.5" />
            BÀI TẬP - 练习
          </div>
          <h1 className="text-2xl font-bold text-[#4A190F] mb-2">Bài tập luyện tiếng Trung</h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed">
            Chọn cấp độ rồi chọn dạng bài muốn luyện — mỗi dạng sinh đề mới ngẫu nhiên từ kho từ vựng, hội thoại, bài đọc của Hanbeego nên không lo làm trùng đề.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-gray-600 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Dạng bài</span>
            <span className="font-bold text-gray-800">5</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Cấp độ</span>
            <span className="font-bold text-gray-800">7</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Luyện lại</span>
            <span className="font-bold text-gray-800 text-lg leading-none">∞</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div>
        <h2 className="text-[15px] font-bold text-[#4A190F] mb-5">5 dạng bài luyện tập</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exercises.map((ex) => (
            <div key={ex.id} className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full min-h-[180px]" onClick={() => setActiveExercise(ex.id)}>
              <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 mb-4 group-hover:bg-red-50 group-hover:text-red-500 group-hover:border-red-100 transition-colors">
                {ex.id}
              </div>
              <h3 className="font-bold text-[#4A190F] text-[15px] mb-2">{ex.title}</h3>
              <p className="text-xs text-[#682315]/60 mb-6 leading-relaxed flex-1">
                {ex.desc}
              </p>
              <button className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-auto uppercase tracking-wider group-hover:text-red-700">
                BẮT ĐẦU <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-[17px] font-bold text-[#4A190F]">Luyện tiếng Trung đúng dạng bài cần</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed max-w-5xl">
          <p>
            Mỗi kỹ năng cần một cách luyện khác nhau: sắp xếp câu rèn ngữ pháp và trật tự từ, điền từ rèn phản xạ dùng từ đúng ngữ cảnh, nghe điền từ và nghe sắp xếp hội thoại rèn tai nghe, đọc suy luận rèn khả năng đoán nghĩa từ ngữ cảnh — đúng như dạng câu hỏi hay gặp trong đề thi HSK thật.
          </p>
          <p>
            Toàn bộ câu hỏi được sinh tự động từ đúng nội dung bạn đang học ở /hsk (từ vựng, hội thoại, bài đọc) theo cấp độ đã chọn, nên luyện xong dạng nào cũng gắn liền với từ vựng và ngữ pháp cấp đó — không phải câu hỏi rời rạc không liên quan.
          </p>
          <p>
            Làm lại một dạng bài sẽ luôn ra bộ câu hỏi mới (xáo trộn ngẫu nhiên trong kho nội dung của cấp độ), nên có thể luyện đi luyện lại nhiều lần mà không nhàm chán vì học thuộc đáp án.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-6 text-red-500">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-[17px] font-bold text-[#4A190F]">Câu hỏi thường gặp</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 w-5 h-5 rounded flex items-center justify-center shrink-0">Q</span>
                  <span className="font-bold text-[#4A190F] text-sm">{faq.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 text-[13px] text-[#682315]/70 pl-12 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
