const fs = require('fs');
const file = 'src/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf-8');

const newKeys = `
  | 'nav.hero'
  | 'nav.features'
  | 'nav.stats'
  | 'nav.methodology'
  | 'nav.faq'`;

content = content.replace(/(export type TranslationKey =.*?)(\nexport const translations)/s, (match, p1, p2) => {
  return p1 + newKeys + p2;
});

// Insert VI
const viInsert = `
    'nav.hero': 'Trang chủ',
    'nav.features': 'Hệ sinh thái',
    'nav.stats': 'Thống kê',
    'nav.methodology': 'Phương pháp',
    'nav.faq': 'FAQ',
`;
content = content.replace(/(\s*'nav\.login': 'Đăng nhập',)/, `$1\n${viInsert}`);

// Insert EN
const enInsert = `
    'nav.hero': 'Home',
    'nav.features': 'Ecosystem',
    'nav.stats': 'Statistics',
    'nav.methodology': 'Methodology',
    'nav.faq': 'FAQ',
`;
content = content.replace(/(\s*'nav\.login': 'Login',)/, `$1\n${enInsert}`);

// Insert ZH
const zhInsert = `
    'nav.hero': '首页',
    'nav.features': '生态系统',
    'nav.stats': '统计数据',
    'nav.methodology': '教学方法',
    'nav.faq': '常见问题',
`;
content = content.replace(/(\s*'nav\.login': '登录',)/, `$1\n${zhInsert}`);

fs.writeFileSync(file, content);
