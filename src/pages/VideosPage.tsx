import React from 'react';
import { Play } from 'lucide-react';

export const VideosPage = () => {
  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 4',
      category: 'TRUYỆN NGẮN / CÔNG SỞ',
      sentences: '51 CÂU',
      title: 'Nhân viên mới lười biếng trốn việc đủ kiểu, ai ngờ sếp lại càng quan tâm',
      desc: 'Đoạn phim ngắn hài hước: một nhân viên mới suốt ngày trốn việc lười biếng...',
      isFree: true,
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 3',
      category: 'PODCAST',
      sentences: '199 CÂU',
      title: 'Bước nhỏ vẫn tiến về phía trước',
      isFree: true,
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 3',
      category: 'PODCAST',
      sentences: '276 CÂU',
      title: 'Đừng lãng phí cuộc đời',
      isFree: true,
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '216 CÂU',
      title: 'Ngày đầu tiên đi học của tôi',
      isFree: true,
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '182 CÂU',
      title: 'Nói về thói quen hằng ngày',
      isFree: true,
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 4',
      category: 'ẨM THỰC / NẤU ĂN',
      sentences: '144 CÂU',
      title: 'Gà bơ tỏi da giòn — nhớ 3 điều nên và 4 điều tránh',
      isFree: true,
    },
    {
      id: 7,
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 4',
      category: 'ẨM THỰC / NẤU ĂN',
      sentences: '172 CÂU',
      title: '4 nguyên tắc khoa học để làm món bò ngon',
      isFree: true,
    },
    {
      id: 8,
      thumbnail: 'https://images.unsplash.com/photo-1533282960533-51328aa26626?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 6',
      category: 'CỔ VĂN / VĂN HỌC',
      sentences: '64 CÂU',
      title: 'Ghi nhớ Đào Hoa Nguyên Ký thật dễ! Cổ văn phải thi',
      desc: 'Video hoạt hình giúp học thuộc bài cổ văn kinh điển 《桃花源记》 của Đào Uy...',
      isFree: true,
    },
    {
      id: 9,
      thumbnail: 'https://images.unsplash.com/photo-1576085898273-047f070b8c6f?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '192 CÂU',
      title: 'Đi siêu thị Trung Quốc mua đồ',
      isFree: true,
    },
    {
      id: 10,
      thumbnail: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 1',
      category: 'PODCAST',
      sentences: '224 CÂU',
      title: 'Cách gọi trà sữa bằng tiếng Trung',
      isFree: true,
    },
    {
      id: 11,
      thumbnail: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '191 CÂU',
      title: 'Nói về Giáng sinh bằng tiếng Trung',
      isFree: true,
    },
    {
      id: 12,
      thumbnail: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 4',
      category: 'ẨM THỰC / NẤU ĂN',
      sentences: '124 CÂU',
      title: 'Cà tím hấp trộn ớt nướng — món ăn kèm thanh mát',
      desc: 'Hướng dẫn làm món cà tím hấp xé trộn ớt nướng: cách giữ cà không thâm, kẻ...',
      isFree: true,
    },
    {
      id: 13,
      thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 4',
      category: 'ẨM THỰC / NẤU ĂN',
      sentences: '133 CÂU',
      title: 'Sườn thơm trứ danh — cách làm đặc biệt, ngày bán 600 phần',
      isFree: true,
    },
    {
      id: 14,
      thumbnail: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '274 CÂU',
      title: 'Ẩm thực đường phố Trung Quốc',
      isFree: true,
    },
    {
      id: 15,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 5',
      category: 'KINH TẾ / CÔNG NGHỆ',
      sentences: '325 CÂU',
      title: 'Nuôi heo ảo, đầu cơ nhà đất kiểu cyber: bong bóng công nghệ đã...',
      desc: 'Video giải thích của kênh 未知逗 về cách các bong bóng công nghệ hình thành,...',
      isFree: true,
    },
    {
      id: 16,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '221 CÂU',
      title: 'Vì sao tôi muốn học tiếng Trung',
      isFree: true,
    },
    {
      id: 17,
      thumbnail: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 3',
      category: 'PODCAST',
      sentences: '193 CÂU',
      title: 'Học tiếng Trung khó quá? Làm sao để kiên trì',
      isFree: true,
    },
    {
      id: 18,
      thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 1',
      category: 'PODCAST',
      sentences: '207 CÂU',
      title: 'Một ngày của tôi',
      isFree: true,
    },
    {
      id: 19,
      thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 2',
      category: 'PODCAST',
      sentences: '235 CÂU',
      title: 'Tiếng Trung trong đời sống hằng ngày',
      isFree: true,
    },
    {
      id: 20,
      thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400',
      tag: 'HSK 3',
      category: 'PODCAST',
      sentences: '208 CÂU',
      title: 'Vì sao bạn học mãi vẫn chưa nói được tiếng Trung?',
      desc: 'Podcast tiếng Trung tốc độ vừa phải bàn vì sao học lâu mà vẫn ngại nói —...',
      isFree: true,
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#4A190F] flex items-center gap-2">
          Học qua video <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">MIỄN PHÍ CHO MỌI NGƯỜI</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Xem hoạt hình và clip tiếng Trung với phụ đề đồng bộ — chữ Hán, pinyin và nghĩa. Bấm vào câu để tua lại và nghe kỹ.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer group flex flex-col">
            
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
              
              {/* Free Badge */}
              {video.isFree && (
                <div className="absolute top-2 left-2 bg-[#059669] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  MIỄN PHÍ
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-[9px] font-medium text-gray-400 uppercase mb-2">
                <span className="text-gray-500">{video.tag}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                <span className="truncate">{video.category}</span>
                <span className="ml-auto">{video.sentences}</span>
              </div>
              
              <h3 className="font-bold text-[#4A190F] text-[13px] leading-snug mb-1.5 group-hover:text-red-600 transition-colors line-clamp-2">
                {video.title}
              </h3>
              
              {video.desc && (
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mt-auto">
                  {video.desc}
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
