const fs = require('fs');

const file = 'src/components/Features.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/'Học Bằng Phản Xạ Đa Giác Quan'/, `t('features.item1.title')`);
content = content.replace(/'Loại bỏ cách học vẹt qua từ vựng rời rạc. Yipi kết hợp âm thanh, hình ảnh và ngữ cảnh thực tế giúp não bộ ghi nhớ sâu và phản xạ tự nhiên như người bản xứ.'/, `t('features.item1.desc')`);

content = content.replace(/'Đàm Thoại 1:1 Với Trí Tuệ Nhân Tạo'/, `t('features.item2.title')`);
content = content.replace(/'Môi trường luyện tập an toàn, không sợ sai. Trí tuệ nhân tạo sẽ đóng vai người bản xứ, trò chuyện và sửa lỗi phát âm, ngữ pháp cho bạn ngay lập tức.'/, `t('features.item2.desc')`);

content = content.replace(/'Lộ Trình Cá Nhân Hóa Chuẩn HSK'/, `t('features.item3.title')`);
content = content.replace(/'Cho dù bạn bắt đầu từ con số 0 hay muốn thi HSK cấp tốc, Yipi tự động điều chỉnh độ khó và nội dung bài học để phù hợp với tốc độ tiếp thu của riêng bạn.'/, `t('features.item3.desc')`);

content = content.replace(/'Khám Phá Văn Hóa Phương Đông'/, `t('features.item4.title')`);
content = content.replace(/'Học ngôn ngữ không thể tách rời văn hóa. Các bài học được lồng ghép tinh tế kiến thức về lịch sử, nghệ thuật và lối sống của người bản địa.'/, `t('features.item4.desc')`);

content = content.replace(/Trải Nghiệm Khác Biệt/, `{t('features.badge')}`);
content = content.replace(/Học Ngôn Ngữ,/, `{t('features.title.1')}`);
content = content.replace(/Khám Phá Thế Giới/, `{t('features.title.2')}`);
content = content.replace(/Yipi không chỉ là một ứng dụng học từ vựng. Chúng tôi xây dựng một hệ sinh thái học tập toàn diện, nơi tiếng Trung trở thành một phần trong cuộc sống của bạn./, `{t('features.desc')}`);

fs.writeFileSync(file, content);
