const fs = require('fs');
let file = 'src/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/'modal.demo.desc': 'Experience a live demo of Yipi's learning method \(Coming soon\)\.',/g, "'modal.demo.desc': 'Experience a live demo of Yipi\\'s learning method (Coming soon).',");
content = content.replace(/'faq.a3': 'Yipi's AI acts as a 1:1 native tutor, ready to converse 24\/7\. The virtual assistant analyzes your pronunciation and grammar errors for immediate adjustment during your chat\.',/g, "'faq.a3': 'Yipi\\'s AI acts as a 1:1 native tutor, ready to converse 24/7. The virtual assistant analyzes your pronunciation and grammar errors for immediate adjustment during your chat.',");
content = content.replace(/'auth.noAccount': 'Don't have an account\?',/g, "'auth.noAccount': 'Don\\'t have an account?',");

fs.writeFileSync(file, content);
