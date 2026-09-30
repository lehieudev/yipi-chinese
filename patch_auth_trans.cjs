const fs = require('fs');

const file = 'src/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf-8');

const newKeys = `
  // Auth Modal
  | 'auth.login.title'
  | 'auth.login.subtitle'
  | 'auth.register.title'
  | 'auth.register.subtitle'
  | 'auth.fullName'
  | 'auth.email'
  | 'auth.password'
  | 'auth.btn.login'
  | 'auth.btn.register'
  | 'auth.noAccount'
  | 'auth.haveAccount'
  | 'auth.registerNow'
  | 'auth.loginNow'
  | 'auth.success.login'
  | 'auth.success.register'
  | 'auth.success.desc'`;

// Insert keys
content = content.replace(/(export type TranslationKey =.*?)(\nexport const translations)/s, (match, p1, p2) => {
  return p1 + newKeys + p2;
});

// Insert VI
const viInsert = `
    'auth.login.title': 'Đăng Nhập',
    'auth.login.subtitle': 'Tiếp tục hành trình chinh phục tiếng Trung của bạn.',
    'auth.register.title': 'Bắt Đầu Hành Trình',
    'auth.register.subtitle': 'Tạo tài khoản miễn phí để trải nghiệm phương pháp học của Yipi.',
    'auth.fullName': 'Họ và tên',
    'auth.email': 'Địa chỉ Email',
    'auth.password': 'Mật khẩu',
    'auth.btn.login': 'Đăng nhập',
    'auth.btn.register': 'Đăng ký tài khoản',
    'auth.noAccount': 'Chưa có tài khoản?',
    'auth.haveAccount': 'Đã có tài khoản?',
    'auth.registerNow': 'Đăng ký ngay',
    'auth.loginNow': 'Đăng nhập',
    'auth.success.login': 'Chào mừng trở lại!',
    'auth.success.register': 'Đăng ký thành công!',
    'auth.success.desc': 'Vui lòng kiểm tra email của bạn để xác nhận tài khoản. Cửa sổ này sẽ tự động đóng...',
`;
content = content.replace(/(\s*'footer\.privacy': 'Bảo mật',)/, `$1\n${viInsert}`);

// Insert EN
const enInsert = `
    'auth.login.title': 'Log In',
    'auth.login.subtitle': 'Continue your journey to master Chinese.',
    'auth.register.title': 'Start Your Journey',
    'auth.register.subtitle': 'Create a free account to experience the Yipi method.',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.btn.login': 'Log In',
    'auth.btn.register': 'Create Account',
    'auth.noAccount': 'Don\\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    'auth.registerNow': 'Register Now',
    'auth.loginNow': 'Log In',
    'auth.success.login': 'Welcome back!',
    'auth.success.register': 'Successfully registered!',
    'auth.success.desc': 'Please check your email to verify your account. This window will close automatically...',
`;
content = content.replace(/(\s*'footer\.privacy': 'Privacy',)/, `$1\n${enInsert}`);

// Insert ZH
const zhInsert = `
    'auth.login.title': '登录',
    'auth.login.subtitle': '继续您的中文学习之旅。',
    'auth.register.title': '开始您的旅程',
    'auth.register.subtitle': '创建一个免费账户以体验 Yipi 的学习方法。',
    'auth.fullName': '姓名',
    'auth.email': '电子邮件地址',
    'auth.password': '密码',
    'auth.btn.login': '登录',
    'auth.btn.register': '创建账户',
    'auth.noAccount': '还没有账户？',
    'auth.haveAccount': '已经有账户？',
    'auth.registerNow': '立即注册',
    'auth.loginNow': '登录',
    'auth.success.login': '欢迎回来！',
    'auth.success.register': '注册成功！',
    'auth.success.desc': '请检查您的电子邮件以验证您的账户。此窗口将自动关闭...',
`;
content = content.replace(/(\s*'footer\.privacy': '隐私政策',)/, `$1\n${zhInsert}`);

fs.writeFileSync(file, content);
