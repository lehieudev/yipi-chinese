export type Language = 'vi' | 'en' | 'zh';

export type TranslationKey = 
  // Hero
  | 'hero.badge'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.desc'
  | 'hero.cta.register'
  | 'hero.cta.demo'
  | 'hero.feat1'
  | 'hero.feat2'
  | 'hero.feat3'
  | 'hero.stamp.text'
  // Methodology
  | 'meth.title'
  | 'meth.desc'
  | 'meth.card1.title'
  | 'meth.card1.desc'
  | 'meth.card2.title'
  | 'meth.card2.desc'
  | 'meth.card3.title'
  | 'meth.card3.desc'
  // Curriculum
  | 'curr.title'
  | 'curr.desc'
  | 'curr.card1.title'
  | 'curr.card1.desc'
  | 'curr.card2.title'
  | 'curr.card2.desc'
  | 'curr.card3.title'
  | 'curr.card3.desc'
  // Footer
  | 'footer.title'
  | 'footer.desc'
  | 'footer.cta.sub'
  | 'footer.cta'
  // Modals
  | 'modal.reg.title'
  | 'modal.reg.ph'
  | 'modal.reg.btn'
  | 'modal.reg.success.title'
  | 'modal.reg.success.desc'
  | 'modal.demo.title'
  | 'modal.demo.desc'
  // FAQ
  | 'faq.title'
  | 'faq.desc'
  | 'faq.q1'
  | 'faq.a1'
  | 'faq.q2'
  | 'faq.a2'
  | 'faq.q3'
  | 'faq.a3'
  | 'faq.q4'
  | 'faq.a4'
  // Newsletter
  | 'footer.newsletter.ph'
  | 'footer.newsletter.success'
  // Footer Links
  | 'footer.contact_support'
  | 'footer.terms'
  | 'footer.privacy'

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
  | 'stats.item4.label'
  // Auth Modal
  | 'auth.login.title'
  | 'auth.login.subtitle'
  | 'auth.register.title'
  | 'auth.register.subtitle'
  | 'auth.fullName'
  | 'auth.email'
  | 'auth.password'
  | 'auth.rememberMe'
  | 'auth.btn.login'
  | 'auth.btn.register'
  | 'auth.noAccount'
  | 'auth.haveAccount'
  | 'auth.registerNow'
  | 'auth.loginNow'
  | 'auth.success.login'
  | 'auth.success.register'
  | 'auth.success.desc'
  | 'nav.hero'
  | 'nav.features'
  | 'nav.stats'
  | 'nav.methodology'
  | 'nav.faq';
export const translations: Record<Language, Record<TranslationKey, string>> = {
  vi: {
    'hero.badge': 'Bản thử nghiệm kín (Closed Beta)',
    'hero.title': 'HỌC TIẾNG TRUNG\nTỰ NHIÊN\nCÙNG YIPI',
    'hero.subtitle': '格物致知 · 自然习得 · 见微知著',
    'hero.desc': 'Tạm biệt lối học vẹt ngữ pháp và từ vựng rời rạc. Yipi mở ra cánh cửa lĩnh hội tiếng Trung tự nhiên qua thế giới hội thoại sinh động, ngữ cảnh đa chiều và người bạn đồng hành thông minh luôn lắng nghe bạn.',
    'hero.cta.register': 'Đăng Ký Trải Nghiệm',
    'hero.cta.demo': 'Xem Demo Giáo Trình',
    'hero.feat1': 'Nghe - hiểu trực giác',
    'hero.feat2': 'Mô phỏng đàm thoại 1:1',
    'hero.feat3': 'Chuẩn khung HSK 3.0',
    'hero.stamp.text': 'CHÍNH TÂM TIẾP NHẬN',
    'meth.title': 'Triết lý của Yipi',
    'meth.desc': 'Học ngôn ngữ không phải là giải toán. Đó là quá trình nhúng mình vào văn hóa và âm thanh. Yipi xây dựng 3 trụ cột giúp bạn "thấm" tiếng Trung một cách vô thức.',
    'meth.card1.title': 'Tắm Ngôn Ngữ Trực Giác',
    'meth.card1.desc': 'Học qua ngữ cảnh thực tế thay vì bảng từ vựng khô khan.',
    'meth.card2.title': 'Trọng Âm & Giai Điệu',
    'meth.card2.desc': 'Khai mở đôi tai, cảm nhận thanh điệu tự nhiên như người bản xứ.',
    'meth.card3.title': 'Phản Xạ Đàm Thoại Mở',
    'meth.card3.desc': 'AI nhập vai không giới hạn kịch bản, rèn luyện tư duy phản biện.',
    'curr.title': 'Lộ trình tinh giản',
    'curr.desc': 'Giáo trình được thiết kế theo tư duy Module hóa, giúp bạn dễ dàng theo dõi tiến độ và tối ưu thời gian.',
    'curr.card1.title': 'Nền Tảng Âm Thanh',
    'curr.card1.desc': 'Xây dựng phản xạ thính giác và phát âm chuẩn xác.',
    'curr.card2.title': 'Hội Thoại Sinh Tồn',
    'curr.card2.desc': 'Tự tin giao tiếp các chủ đề đời sống hàng ngày.',
    'curr.card3.title': 'Khai Mở Tư Duy',
    'curr.card3.desc': 'Tranh luận và trình bày quan điểm cá nhân.',
    'footer.title': 'Bắt đầu hành trình',
    'footer.desc': 'Đăng ký ngay hôm nay để nhận thông báo khi phiên bản chính thức ra mắt.',
    'footer.cta.sub': 'Trở thành người dùng đầu tiên',
    'footer.cta': 'Tham gia Early Access',
    'modal.reg.title': 'Đăng ký nhận thông báo',
    'modal.reg.ph': 'Email của bạn...',
    'modal.reg.btn': 'Đăng ký ngay',
    'modal.reg.success.title': 'Đăng ký thành công!',
    'modal.reg.success.desc': 'Chúng tôi sẽ liên hệ với bạn sớm nhất.',
    'modal.demo.title': 'Khám phá Lộ trình',
    'modal.demo.desc': 'Trải nghiệm demo trực tiếp phương pháp học của Yipi (Sắp ra mắt).',
    'faq.title': 'Câu hỏi thường gặp',
    'faq.desc': 'Tìm hiểu thêm về cách Yipi giúp bạn chinh phục tiếng Trung tự nhiên.',
    'faq.q1': 'Yipi khác biệt như thế nào so với các ứng dụng khác?',
    'faq.a1': 'Yipi từ bỏ lối học ghi nhớ từ vựng và ngữ pháp khô khan. Chúng tôi tập trung vào việc hấp thụ ngôn ngữ tự nhiên thông qua các kịch bản thực tế, giúp bạn "cảm" tiếng Trung một cách trực giác nhất.',
    'faq.q2': 'Ứng dụng có phù hợp cho người mới bắt đầu?',
    'faq.a2': 'Hoàn toàn phù hợp. Lộ trình của Yipi bắt đầu từ nền tảng ngữ âm và Pinyin, giúp bạn xây dựng gốc rễ vững chắc trước khi tiến tới các kỹ năng giao tiếp phức tạp.',
    'faq.q3': 'Tính năng đàm thoại AI hoạt động ra sao?',
    'faq.a3': 'AI của Yipi đóng vai trò như một gia sư bản xứ 1:1, sẵn sàng đàm thoại 24/7. Trợ lý ảo sẽ phân tích lỗi phát âm và ngữ pháp của bạn để điều chỉnh ngay lập tức trong quá trình trò chuyện.',
    'faq.q4': 'Giáo trình có theo chuẩn HSK không?',
    'faq.a4': 'Có. Toàn bộ lộ trình học được thiết kế bám sát hệ thống tiêu chuẩn HSK 3.0 mới nhất, đảm bảo tính ứng dụng thực tiễn nhưng vẫn giữ vững giá trị học thuật.',
    'footer.newsletter.ph': 'Nhập email của bạn...',
    'footer.newsletter.success': 'Đăng ký thành công! Chúng tôi sẽ sớm liên hệ.',
    'footer.contact_support': 'Liên hệ hỗ trợ',
    'footer.terms': 'Điều khoản',
    'footer.privacy': 'Bảo mật',

    'auth.login.title': 'Đăng Nhập',
    'auth.login.subtitle': 'Tiếp tục hành trình chinh phục tiếng Trung của bạn.',
    'auth.register.title': 'Bắt Đầu Hành Trình',
    'auth.register.subtitle': 'Tạo tài khoản miễn phí để trải nghiệm phương pháp học của Yipi.',
    'auth.fullName': 'Họ và tên',
    'auth.email': 'Địa chỉ Email',
    'auth.password': 'Mật khẩu',
    'auth.rememberMe': 'Ghi nhớ đăng nhập',
    'auth.btn.login': 'Đăng nhập',
    'auth.btn.register': 'Đăng ký tài khoản',
    'auth.noAccount': 'Chưa có tài khoản?',
    'auth.haveAccount': 'Đã có tài khoản?',
    'auth.registerNow': 'Đăng ký ngay',
    'auth.loginNow': 'Đăng nhập',
    'auth.success.login': 'Chào mừng trở lại!',
    'auth.success.register': 'Đăng ký thành công!',
    'auth.success.desc': 'Vui lòng kiểm tra email của bạn để xác nhận tài khoản. Cửa sổ này sẽ tự động đóng...',


    'nav.login': 'Đăng nhập',

    'nav.hero': 'Trang chủ',
    'nav.features': 'Hệ sinh thái',
    'nav.stats': 'Thống kê',
    'nav.methodology': 'Phương pháp',
    'nav.faq': 'FAQ',

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

  },
  en: {
    'hero.badge': 'Closed Beta',
    'hero.title': 'MASTER CHINESE\nNATURALLY\nWITH YIPI',
    'hero.subtitle': '格物致知 · 自然习得 · 见微知著',
    'hero.desc': 'Say goodbye to rote memorization. Yipi opens the door to natural Chinese acquisition through vivid conversations, multi-dimensional contexts, and an intelligent companion that always listens.',
    'hero.cta.register': 'Request Access',
    'hero.cta.demo': 'View Curriculum Demo',
    'hero.feat1': 'Intuitive listening',
    'hero.feat2': '1:1 Conversation Simulation',
    'hero.feat3': 'HSK 3.0 Standard',
    'hero.stamp.text': 'MINDFUL ACQUISITION',
    'meth.title': 'The Yipi Philosophy',
    'meth.desc': 'Language learning is not solving math. It is immersing yourself in culture and sound. Yipi builds 3 pillars to help you internalize Chinese subconsciously.',
    'meth.card1.title': 'Intuitive Immersion',
    'meth.card1.desc': 'Learn through real-world context instead of dry vocabulary lists.',
    'meth.card2.title': 'Intonation & Melody',
    'meth.card2.desc': 'Unlock your ears, feel the natural tones like a native speaker.',
    'meth.card3.title': 'Open Conversational Reflex',
    'meth.card3.desc': 'AI roleplays without scripted limits, forging critical thinking.',
    'curr.title': 'Streamlined Path',
    'curr.desc': 'The curriculum is designed with modular thinking, helping you track progress and optimize time.',
    'curr.card1.title': 'Phonetic Foundation',
    'curr.card1.desc': 'Build auditory reflexes and accurate pronunciation.',
    'curr.card2.title': 'Survival Conversation',
    'curr.card2.desc': 'Confidently communicate in daily life scenarios.',
    'curr.card3.title': 'Cognitive Expansion',
    'curr.card3.desc': 'Debate and present personal perspectives.',
    'footer.title': 'Begin your journey',
    'footer.desc': 'Register today to be notified when the official version launches.',
    'footer.cta.sub': 'Be the first to use',
    'footer.cta': 'Join Early Access',
    'modal.reg.title': 'Stay Updated',
    'modal.reg.ph': 'Your email address...',
    'modal.reg.btn': 'Register Now',
    'modal.reg.success.title': 'Successfully Registered!',
    'modal.reg.success.desc': 'We will contact you shortly.',
    'modal.demo.title': 'Explore Curriculum',
    'modal.demo.desc': 'Experience a live demo of Yipi\'s learning method (Coming soon).',
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Learn more about how Yipi helps you master Chinese naturally.',
    'faq.q1': 'How is Yipi different from other apps?',
    'faq.a1': 'Yipi moves away from dry vocabulary and grammar memorization. We focus on natural language acquisition through real-world contexts, helping you intuitively "feel" the language.',
    'faq.q2': 'Is it suitable for absolute beginners?',
    'faq.a2': 'Absolutely. The Yipi learning path starts with phonetic foundations and Pinyin, helping you build a solid base before moving on to complex communication skills.',
    'faq.q3': 'How does the AI conversation feature work?',
    'faq.a3': 'Yipi\'s AI acts as a 1:1 native tutor, ready to converse 24/7. The virtual assistant analyzes your pronunciation and grammar errors for immediate adjustment during your chat.',
    'faq.q4': 'Does the curriculum follow HSK standards?',
    'faq.a4': 'Yes. The entire curriculum is strictly aligned with the latest HSK 3.0 standards, ensuring practical application while maintaining academic value.',
    'footer.newsletter.ph': 'Enter your email address...',
    'footer.newsletter.success': 'Subscribed successfully! We will be in touch.',
    'footer.contact_support': 'Contact Support',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',

    'auth.login.title': 'Log In',
    'auth.login.subtitle': 'Continue your journey to master Chinese.',
    'auth.register.title': 'Start Your Journey',
    'auth.register.subtitle': 'Create a free account to experience the Yipi method.',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.rememberMe': 'Remember me',
    'auth.btn.login': 'Log In',
    'auth.btn.register': 'Create Account',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    'auth.registerNow': 'Register Now',
    'auth.loginNow': 'Log In',
    'auth.success.login': 'Welcome back!',
    'auth.success.register': 'Successfully registered!',
    'auth.success.desc': 'Please check your email to verify your account. This window will close automatically...',


    'nav.login': 'Login',

    'nav.hero': 'Home',
    'nav.features': 'Ecosystem',
    'nav.stats': 'Statistics',
    'nav.methodology': 'Methodology',
    'nav.faq': 'FAQ',

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

  },
  zh: {
    'hero.badge': '内测阶段 (Closed Beta)',
    'hero.title': '与 YIPI\n自然习得\n中文',
    'hero.subtitle': '格物致知 · 自然习得 · 见微知著',
    'hero.desc': '告别死记硬背。Yipi 通过生动的对话、多维的语境和始终倾听的智能伙伴，为您开启自然习得中文的大门。',
    'hero.cta.register': '申请体验',
    'hero.cta.demo': '查看课程演示',
    'hero.feat1': '直觉听力',
    'hero.feat2': '1:1 对话模拟',
    'hero.feat3': 'HSK 3.0 标准',
    'hero.stamp.text': '正心诚意',
    'meth.title': 'Yipi 教学理念',
    'meth.desc': '语言学习不是解数学题。它是沉浸于文化与声音的过程。Yipi 建立三大支柱，助您潜移默化地内化中文。',
    'meth.card1.title': '直觉式语言沉浸',
    'meth.card1.desc': '在真实语境中学习，而非枯燥的词汇表。',
    'meth.card2.title': '语调与旋律',
    'meth.card2.desc': '唤醒双耳，感受如母语者般的自然声调。',
    'meth.card3.title': '开放式对话反射',
    'meth.card3.desc': 'AI 沉浸式角色扮演，打破剧本限制，锻炼批判性思维。',
    'curr.title': '精简学习路径',
    'curr.desc': '采用模块化思维设计的课程，助您轻松追踪进度，优化学习时间。',
    'curr.card1.title': '语音基础',
    'curr.card1.desc': '建立听觉反射与准确发音。',
    'curr.card2.title': '生存对话',
    'curr.card2.desc': '自信应对日常生活场景的沟通。',
    'curr.card3.title': '思维拓展',
    'curr.card3.desc': '能够进行辩论并表达个人观点。',
    'footer.title': '开启您的旅程',
    'footer.desc': '立即注册，以便在正式版本发布时获得通知。',
    'footer.cta.sub': '成为首批用户',
    'footer.cta': '加入抢先体验',
    'modal.reg.title': '注册获取更新',
    'modal.reg.ph': '您的电子邮箱...',
    'modal.reg.btn': '立即注册',
    'modal.reg.success.title': '注册成功！',
    'modal.reg.success.desc': '我们将尽快与您联系。',
    'modal.demo.title': '探索课程',
    'modal.demo.desc': '体验 Yipi 学习方法的现场演示（敬请期待）。',
    'faq.title': '常见问题',
    'faq.desc': '了解更多关于 Yipi 如何帮助您自然习得中文的信息。',
    'faq.q1': 'Yipi 与其他应用有何不同？',
    'faq.a1': 'Yipi 摒弃了枯燥的词汇和语法记忆。我们专注于通过真实语境自然习得语言，帮助您直觉般地“感受”中文。',
    'faq.q2': '适合零基础初学者吗？',
    'faq.a2': '绝对适合。Yipi 的学习路径从语音基础和拼音开始，帮助您在进行复杂交流前打下坚实的基础。',
    'faq.q3': 'AI 对话功能如何工作？',
    'faq.a3': 'Yipi 的 AI 扮演 1:1 母语外教的角色，24/7 随时准备对话。虚拟助手会在聊天过程中分析您的发音和语法错误并进行实时纠正。',
    'faq.q4': '课程是否遵循 HSK 标准？',
    'faq.a4': '是的。整个课程严格按照最新的 HSK 3.0 标准设计，在保持学术价值的同时确保其实用性。',
    'footer.newsletter.ph': '请输入您的电子邮箱...',
    'footer.newsletter.success': '订阅成功！我们将尽快与您联系。',
    'footer.contact_support': '联系客服',
    'footer.terms': '使用条款',
    'footer.privacy': '隐私政策',

    'auth.login.title': '登录',
    'auth.login.subtitle': '继续您的中文学习之旅。',
    'auth.register.title': '开始您的旅程',
    'auth.register.subtitle': '创建一个免费账户以体验 Yipi 的学习方法。',
    'auth.fullName': '姓名',
    'auth.email': '电子邮件地址',
    'auth.password': '密码',
    'auth.rememberMe': '记住我',
    'auth.btn.login': '登录',
    'auth.btn.register': '创建账户',
    'auth.noAccount': '还没有账户？',
    'auth.haveAccount': '已经有账户？',
    'auth.registerNow': '立即注册',
    'auth.loginNow': '登录',
    'auth.success.login': '欢迎回来！',
    'auth.success.register': '注册成功！',
    'auth.success.desc': '请检查您的电子邮件以验证您的账户。此窗口将自动关闭...',


    'nav.login': '登录',

    'nav.hero': '首页',
    'nav.features': '生态系统',
    'nav.stats': '统计数据',
    'nav.methodology': '教学方法',
    'nav.faq': '常见问题',

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

  }
};
