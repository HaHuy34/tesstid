const newsData = [
  {
    id: 1,
    title: "Tổng quan về dầu nhớt công nghiệp – Lựa chọn đúng giúp tiết kiệm hàng triệu đồng",
    summary: "Khám phá tầm quan trọng của dầu nhớt công nghiệp và cách chọn loại dầu phù hợp cho dây chuyền sản xuất.",
    content: `
      <p>Dầu nhớt công nghiệp là yếu tố quyết định tuổi thọ của máy móc. Việc chọn loại dầu không đúng sẽ làm tăng ma sát, gây mài mòn và tiêu tốn năng lượng.</p>
      <p>Hãy chọn dầu có chỉ số độ nhớt phù hợp, độ ổn định nhiệt cao và khả năng chống oxy hoá tốt.</p>
      <p><strong>Mẹo nhỏ:</strong> Kiểm tra định kỳ dầu sau mỗi 1000 giờ vận hành.</p>
    `,
    category: "Kiến thức",
    image: "https://picsum.photos/seed/hydraulic/800/600",
    date: "2025-10-01"
  },
  {
    id: 2,
    title: "Hướng dẫn bảo dưỡng hệ thống thủy lực với dầu nhớt chuyên dụng",
    summary: "Cách lựa chọn dầu thủy lực giúp hệ thống hoạt động ổn định, giảm rò rỉ và tăng hiệu suất truyền động.",
    content: `
      <p>Dầu thủy lực đóng vai trò quan trọng trong truyền tải năng lượng. Khi bị ô nhiễm hoặc suy giảm, toàn hệ thống dễ gặp sự cố.</p>
      <p>Chọn dầu có khả năng chống tạo bọt, ổn định nhiệt và chống gỉ sét.</p>
      <ul>
        <li>Thay dầu định kỳ 6 tháng/lần</li>
        <li>Lọc dầu trước khi đổ vào hệ thống</li>
        <li>Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp</li>
      </ul>
    `,
    category: "Hướng dẫn",
    image: "https://picsum.photos/seed/compressor/800/600",
    date: "2025-09-25"
  },
  {
    id: 3,
    title: "Top 5 loại dầu nhớt công nghiệp phổ biến tại Việt Nam 2025",
    summary: "Cập nhật danh sách những thương hiệu dầu nhớt công nghiệp đáng tin cậy nhất trong năm nay.",
    content: `
      <p>Thị trường dầu nhớt công nghiệp Việt Nam có sự góp mặt của nhiều thương hiệu lớn như Castrol, Shell, Total, và Caltex.</p>
      <p>Tiêu chí đánh giá bao gồm: độ ổn định nhiệt, khả năng chống oxy hóa và hiệu quả kinh tế.</p>
    `,
    category: "Sản phẩm",
    image: "https://picsum.photos/seed/gearbox/800/600",
    date: "2025-09-18"
  },
  {
    id: 4,
    title: "Case study: Nhà máy xi măng tăng 20% hiệu suất nhờ thay đổi dầu bôi trơn",
    summary: "Một ví dụ thực tế về việc thay đổi loại dầu nhớt giúp tiết kiệm chi phí vận hành và tăng năng suất.",
    content: `
      <p>Sau khi chuyển sang dầu tổng hợp có độ ổn định cao, nhà máy giảm 30% chi phí bảo dưỡng và kéo dài chu kỳ thay dầu.</p>
      <p>Kết quả: hiệu suất dây chuyền tăng 20% chỉ trong 3 tháng.</p>
    `,
    category: "Case study",
    image: "https://picsum.photos/seed/synthetic/800/600",
    date: "2025-08-30"
  },
  {
    id: 5,
    title: "Phân biệt dầu gốc khoáng và dầu tổng hợp – Nên chọn loại nào?",
    summary: "Hai loại dầu phổ biến nhất hiện nay có sự khác biệt gì? Hãy cùng tìm hiểu để chọn đúng nhu cầu.",
    content: `
      <p>Dầu gốc khoáng thường rẻ hơn nhưng dễ bị oxy hoá. Dầu tổng hợp bền hơn, chịu nhiệt cao, phù hợp cho máy hoạt động liên tục.</p>
    `,
    category: "Kiến thức",
    image: "https://picsum.photos/seed/factory/800/600",
    date: "2025-08-20"
  },
  {
    id: 6,
    title: "Cách kiểm tra chất lượng dầu đang sử dụng trong nhà máy",
    summary: "5 phương pháp kiểm tra nhanh giúp xác định dầu có còn đạt tiêu chuẩn hay không.",
    content: `
      <ul>
        <li>Quan sát màu sắc</li>
        <li>Kiểm tra độ nhớt</li>
        <li>Đo chỉ số acid</li>
        <li>Kiểm tra tạp chất bằng kính hiển vi</li>
      </ul>
    `,
    category: "Bảo trì",
    image: "https://picsum.photos/seed/generator/800/600",
    date: "2025-08-15"
  },
  {
    id: 7,
    title: "Dầu truyền động – Ứng dụng trong các ngành công nghiệp nặng",
    summary: "Loại dầu nào phù hợp cho hộp số, bánh răng và các cơ cấu chịu tải lớn?",
    content: `
      <p>Dầu truyền động công nghiệp cần có chỉ số chịu áp EP cao và khả năng chống mài mòn tốt.</p>
    `,
    category: "Sản phẩm",
    image: "https://picsum.photos/seed/label/800/600",
    date: "2025-07-30"
  },
  {
    id: 8,
    title: "Cập nhật công nghệ dầu sinh học – Xu hướng xanh 2025",
    summary: "Tương lai của ngành dầu nhớt hướng đến bảo vệ môi trường và năng lượng tái tạo.",
    content: `
      <p>Dầu sinh học được sản xuất từ nguồn nguyên liệu tái chế, giúp giảm phát thải CO₂ mà vẫn đảm bảo hiệu suất bôi trơn cao.</p>
    `,
    category: "Kiến thức",
    image: "https://picsum.photos/seed/steel/800/600",
    date: "2025-07-10"
  }
];
