const fs = require('fs');

const file = 'src/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf-8');

const newKeys = `
  // Nav
  | 'nav.login'
  // Features
  | 'features.badge'
  | 'features.title.1'
  | 'features.title.2'
  | 'features.desc'
  | 'features.item1.title'
  | 'features.item1.desc'
  | 'features.item2.title'
  | 'features.item2.desc'
  | 'features.item3.title'
  | 'features.item3.desc'
  | 'features.item4.title'
  | 'features.item4.desc'
  // Stats
  | 'stats.item1.value'
  | 'stats.item1.label'
  | 'stats.item2.value'
  | 'stats.item2.label'
  | 'stats.item3.value'
  | 'stats.item3.label'
  | 'stats.item4.value'
  | 'stats.item4.label'`;

// Insert keys
content = content.replace(/(export type TranslationKey =.*?)(\nexport const translations)/s, (match, p1, p2) => {
  return p1 + newKeys + p2;
});

// Insert VI
const viInsert = `
    'nav.login': 'Đăng nhập',
    'features.badge': 'Trải Nghiệm Khác Biệt',
    'features.title.1': 'Học Ngôn Ngữ, ',
    'features.title.2': 'Khám Phá Thế Giới',
    'features.desc': 'Yipi không chỉ là một ứng dụng học từ vựng. Chúng tôi xây dựng một hệ sinh thái học tập toàn diện, nơi tiếng Trung trở thành một phần trong cuộc sống của bạn.',
    'features.item1.title': 'Học Bằng Phản Xạ Đa Giác Quan',
    'features.item1.desc': 'Loại bỏ cách học vẹt qua từ vựng rời rạc. Yipi kết hợp âm thanh, hình ảnh và ngữ cảnh thực tế giúp não bộ ghi nhớ sâu và phản xạ tự nhiên như người bản xứ.',
    'features.item2.title': 'Đàm Thoại 1:1 Với Trí Tuệ Nhân Tạo',
    'features.item2.desc': 'Môi trường luyện tập an toàn, không sợ sai. Trí tuệ nhân tạo sẽ đóng vai người bản xứ, trò chuyện và sửa lỗi phát âm, ngữ pháp cho bạn ngay lập tức.',
    'features.item3.title': 'Lộ Trình Cá Nhân Hóa Chuẩn HSK',
    'features.item3.desc': 'Cho dù bạn bắt đầu từ con số 0 hay muốn thi HSK cấp tốc, Yipi tự động điều chỉnh độ khó và nội dung bài học để phù hợp với tốc độ tiếp thu của riêng bạn.',
    'features.item4.title': 'Khám Phá Văn Hóa Phương Đông',
    'features.item4.desc': 'Học ngôn ngữ không thể tách rời văn hóa. Các bài học được lồng ghép tinh tế kiến thức về lịch sử, nghệ thuật và lối sống của người bản địa.',
    'stats.item1.value': '50K+',
    'stats.item1.label': 'Học Viên Tiêu Biểu',
    'stats.item2.value': '98%',
    'stats.item2.label': 'Tỉ Lệ Đạt HSK 4+',
    'stats.item3.value': '4.9/5',
    'stats.item3.label': 'Đánh Giá Trên App Store',
    'stats.item4.value': '200+',
    'stats.item4.label': 'Giáo Viên Bản Xứ',
`;
content = content.replace(/(\s*'footer\.privacy': 'Bảo mật',)/, `$1\n${viInsert}`);

// Insert EN
const enInsert = `
    'nav.login': 'Login',
    'features.badge': 'Different Experience',
    'features.title.1': 'Learn Language, ',
    'features.title.2': 'Explore the World',
    'features.desc': 'Yipi is not just a vocabulary app. We build a comprehensive learning ecosystem where Chinese becomes part of your life.',
    'features.item1.title': 'Multi-sensory Reflex Learning',
    'features.item1.desc': 'Eliminate rote learning through isolated vocabulary. Yipi combines sound, images, and real-world context to help the brain remember deeply and react naturally like a native speaker.',
    'features.item2.title': '1:1 Conversation With AI',
    'features.item2.desc': 'Safe practice environment, no fear of making mistakes. AI acts as a native speaker, conversing and correcting your pronunciation and grammar instantly.',
    'features.item3.title': 'Personalized HSK Standard Path',
    'features.item3.desc': 'Whether you are starting from zero or want to take the HSK quickly, Yipi automatically adjusts the difficulty and lesson content to match your own learning pace.',
    'features.item4.title': 'Explore Eastern Culture',
    'features.item4.desc': 'Language learning cannot be separated from culture. Lessons subtly integrate knowledge about the history, art, and lifestyle of the native people.',
    'stats.item1.value': '50K+',
    'stats.item1.label': 'Outstanding Students',
    'stats.item2.value': '98%',
    'stats.item2.label': 'HSK 4+ Pass Rate',
    'stats.item3.value': '4.9/5',
    'stats.item3.label': 'App Store Rating',
    'stats.item4.value': '200+',
    'stats.item4.label': 'Native Teachers',
`;
content = content.replace(/(\s*'footer\.privacy': 'Privacy',)/, `$1\n${enInsert}`);

// Insert ZH
const zhInsert = `
    'nav.login': '登录',
    'features.badge': '与众不同的体验',
    'features.title.1': '学习语言，',
    'features.title.2': '探索世界',
    'features.desc': 'Yipi不仅仅是一个背单词应用。我们构建了一个全面的学习生态系统，让中文成为你生活的一部分。',
    'features.item1.title': '多感官反射学习',
    'features.item1.desc': '消除通过孤立词汇死记硬背。Yipi结合声音、图像和真实语境，帮助大脑深度记忆并像母语者一样自然反应。',
    'features.item2.title': '与人工智能进行1:1对话',
    'features.item2.desc': '安全的练习环境，不怕犯错。人工智能扮演母语者，与您对话并即时纠正您的发音和语法。',
    'features.item3.title': '个性化HSK标准路线',
    'features.item3.desc': '无论您是从零开始还是想快速考取HSK，Yipi都会自动调整难度和课程内容，以适应您自己的学习节奏。',
    'features.item4.title': '探索东方文化',
    'features.item4.desc': '语言学习离不开文化。课程巧妙地融合了有关当地人历史、艺术和生活方式的知识。',
    'stats.item1.value': '50K+',
    'stats.item1.label': '优秀学员',
    'stats.item2.value': '98%',
    'stats.item2.label': 'HSK 4+ 通过率',
    'stats.item3.value': '4.9/5',
    'stats.item3.label': 'App Store 评分',
    'stats.item4.value': '200+',
    'stats.item4.label': '母语教师',
`;
content = content.replace(/(\s*'footer\.privacy': '隐私政策',)/, `$1\n${zhInsert}`);

fs.writeFileSync(file, content);
