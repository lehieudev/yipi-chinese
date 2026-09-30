const fs = require('fs');

const file = 'src/components/Stats.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/'50K\+'/, `t('stats.item1.value')`);
content = content.replace(/'Học Viên Tiêu Biểu'/, `t('stats.item1.label')`);

content = content.replace(/'98%'/g, `t('stats.item2.value')`);
content = content.replace(/'Tỉ Lệ Đạt HSK 4\+'/g, `t('stats.item2.label')`);

content = content.replace(/'4.9\/5'/g, `t('stats.item3.value')`);
content = content.replace(/'Đánh Giá Trên App Store'/g, `t('stats.item3.label')`);

content = content.replace(/'200\+'/g, `t('stats.item4.value')`);
content = content.replace(/'Giáo Viên Bản Xứ'/g, `t('stats.item4.label')`);

fs.writeFileSync(file, content);
