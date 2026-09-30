import React, { useState } from 'react';
import { Layers, Search, Volume2 } from 'lucide-react';

export const QuantifiersPage = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filters = [
    { name: 'Tất cả', count: 34 },
    { name: 'Lượng từ chung', count: 2 },
    { name: 'Người', count: 3 },
    { name: 'Động vật', count: 4 },
    { name: 'Vật dẹt / mỏng', count: 2 },
    { name: 'Vật dài / cầm tay', count: 3 },
    { name: 'Sách vở', count: 2 },
    { name: 'Phương tiện / máy móc', count: 4 },
    { name: 'Ăn uống', count: 4 },
    { name: 'Quần áo', count: 3 },
    { name: 'Nhà cửa / khối', count: 3 },
    { name: 'Trừu tượng / hành động', count: 4 }
  ];

  const items = [
    {
      group: 'Lượng từ chung', count: 2,
      list: [
        { char: '个', pinyin: 'gè', meaning: 'cái, người (lượng từ vạn năng)', desc: 'Lượng từ phổ biến nhất, dùng cho người và phần lớn đồ vật khi không có lượng từ chuyên dụng.' },
        { char: '些', pinyin: 'xiē', meaning: 'một vài, một ít', desc: 'Chỉ số lượng không xác định, luôn đi sau "một" (一些) hoặc các đại từ chỉ định.' }
      ]
    },
    {
      group: 'Người', count: 3,
      list: [
        { char: '位', pinyin: 'wèi', meaning: 'vị (lịch sự, trang trọng)', desc: 'Dùng cho người một cách kính trọng: khách, thầy cô, người lớn tuổi.' },
        { char: '名', pinyin: 'míng', meaning: 'người (theo chức danh)', desc: 'Dùng cho người gắn với nghề nghiệp/vai trò, văn phong hơi trang trọng.' },
        { char: '口', pinyin: 'kǒu', meaning: 'khẩu (đếm nhân khẩu)', desc: 'Đếm số người trong một gia đình.' }
      ]
    },
    {
      group: 'Động vật', count: 4,
      list: [
        { char: '只', pinyin: 'zhī', meaning: 'con (động vật nhỏ)', desc: 'Dùng cho phần lớn động vật nhỏ: chó, mèo, chim, gà...' },
        { char: '条', pinyin: 'tiáo', meaning: 'con (vật dài), cái (quần)', desc: 'Dùng cho vật thuôn dài: cá, rắn, sông, đường, quần.' }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full mb-4 border border-yellow-200">
          <Layers className="w-3.5 h-3.5" />
          TRA CỨU - 量词
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Lượng từ tiếng Trung</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed">
          Tiếng Trung không nói "một người" mà nói "một 个 người". Mỗi loại danh từ đi với một lượng từ riêng — tra cứu 34 lượng từ phổ biến nhất theo nhóm để nói tự nhiên.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Lượng từ</div>
          <div className="font-bold text-gray-900">34</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Nhóm nghĩa</div>
          <div className="font-bold text-gray-900">11</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Ví dụ có pinyin</div>
          <div className="font-bold text-gray-900">50</div>
        </div>
        <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 rounded-xl text-sm font-bold transition-colors">
          TRA CỨU LƯỢNG TỪ
        </button>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5">
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm lượng từ, nghĩa, ví dụ..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827] outline-none text-sm shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1.5 transition-colors ${
                activeFilter === filter.name 
                  ? 'bg-gray-800 text-white border-gray-800' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter.name} <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${activeFilter === filter.name ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-8">
        <div className="text-sm font-bold text-gray-500">34 lượng từ</div>

        {items.map((group, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">{group.group}</h2>
              <span className="text-xs text-orange-600 font-bold ml-1">{group.count}</span>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden divide-y divide-gray-100">
              {group.list.map((item, itemIdx) => (
                <div key={itemIdx} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="text-3xl font-oriental text-red-600">{item.char}</div>
                      <Volume2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-0.5">{item.pinyin}</div>
                      <div className="font-bold text-gray-800 text-[15px] mb-2">{item.meaning}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};
