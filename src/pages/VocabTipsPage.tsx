import React from 'react';
import { Lightbulb, BookOpen, BrainCircuit } from 'lucide-react';

export const VocabTipsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full mb-4 border border-yellow-100">
          <Lightbulb className="w-3.5 h-3.5" />
          MẸO HỌC - 记忆
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Mẹo nhớ từ vựng tiếng Trung</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed mb-6">
          8 kỹ thuật đã được kiểm chứng giúp bạn học chữ Hán nhanh hơn và nhớ lâu hơn — không phải học vẹt.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> 8 kỹ thuật cốt lõi</div>
            <div className="font-bold text-gray-900">8</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 15 phút/ngày là đủ</div>
            <div className="font-bold text-gray-900">15'</div>
          </div>
          
          <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 rounded-xl text-sm font-bold transition-colors">
            LUYỆN TỪ VỰNG NGAY
          </button>
          <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" /> Học bộ thủ
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 leading-relaxed mb-4">
        Chữ Hán trông rối rắm, nhưng thực ra có <span className="font-bold text-red-600">quy luật</span>. Khi bạn hiểu chữ được cấu tạo thế nào và ôn tập đúng cách, việc nhớ từ nhẹ đi rất nhiều. Dưới đây là 8 mẹo — hãy áp dụng từ trên xuống: mẹo 1-4 giúp bạn hiểu và nhớ chữ, mẹo 5-8 giúp bạn giữ chữ trong đầu lâu dài.
      </div>

      <h2 className="text-xl font-bold text-[#4A190F] mt-4 mb-2">8 mẹo nhớ từ vựng</h2>

      <div className="space-y-6">
        {/* Tip 1 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BrainCircuit className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg shrink-0">1</div>
            <h3 className="font-bold text-gray-900 text-lg">Học theo bộ thủ</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Chữ Hán không phải nét vẽ ngẫu nhiên — chúng ghép từ các bộ thủ có nghĩa. Bộ thủ là những mảnh ghép lặp đi lặp lại trong chữ Hán, và phần lớn gợi ý về nghĩa. Chỉ cần nắm khoảng 50 bộ thủ phổ biến, bạn sẽ đoán được nghĩa của hàng nghìn chữ và nhớ chúng theo nhóm thay vì từng chữ rời rạc.
          </p>
          
          <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 text-sm text-green-800 flex items-start gap-3">
             <Lightbulb className="w-5 h-5 shrink-0 text-green-600" />
             <div>
                <span className="font-bold">Vì sao hiệu quả:</span> Học 1 bộ thủ = mở khóa hàng chục chữ cùng nhóm nghĩa. Não nhớ theo cụm dễ hơn nhớ rời.
             </div>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg shrink-0">2</div>
            <h3 className="font-bold text-gray-900 text-lg">Tận dụng chữ hình thanh</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Khoảng 80% chữ Hán là 'hình thanh': một bên gợi nghĩa, một bên gợi âm đọc. Hình thanh là loại chữ phổ biến nhất. Một phần (bộ thủ) cho biết nghĩa thuộc lĩnh vực nào, phần còn lại cho biết chữ đọc gần giống chữ nào bạn đã biết. Nhận ra 'phần âm' giúp bạn đoán được cách đọc chữ lạ.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg shrink-0">3</div>
            <h3 className="font-bold text-gray-900 text-lg">Học theo từ, đừng học chữ lẻ</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tiếng Trung hiện đại chủ yếu là từ 2 chữ — học cả từ để dùng được ngay. Rất nhiều chữ hiếm khi đứng một mình. Học nguyên từ ghép giúp bạn hiểu nghĩa thực và dùng được luôn, đồng thời mỗi chữ được củng cố qua nhiều từ khác nhau.
          </p>
        </div>

         {/* Tip 4 */}
         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg shrink-0">4</div>
            <h3 className="font-bold text-gray-900 text-lg">Ghép chuyện & hình ảnh (mnemonic)</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Bịa một câu chuyện hoặc hình ảnh buồn cười cho chữ khó — não nhớ chuyện lâu hơn nhớ nét. Với những chữ khó không có quy luật rõ, hãy tách nó thành các bộ phận và dựng một hình ảnh sống động liên kết chúng. Càng vô lý, càng buồn cười thì càng dễ nhớ.
          </p>
        </div>

         {/* Tip 5 */}
         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg shrink-0">5</div>
            <h3 className="font-bold text-gray-900 text-lg">Lặp lại ngắt quãng (SRS)</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Ôn đúng vào lúc bạn sắp quên — đây là mẹo quyết định việc nhớ lâu. Trí nhớ phai theo thời gian. Nếu ôn lại đúng lúc sắp quên, mỗi lần ôn sẽ 'gia hạn' trí nhớ lâu hơn.
          </p>
        </div>
      </div>

    </div>
  );
};
