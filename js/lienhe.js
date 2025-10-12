document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const requests = [];

  if (document.getElementById("baoGia").checked) requests.push("Nhận báo giá");
  if (document.getElementById("taiLieu").checked) requests.push("Xem tài liệu kỹ thuật");
  if (document.getElementById("tuVan").checked) requests.push("Tư vấn ngay");

  if (!name || !phone) {
    Swal.fire({
      title: "Thiếu thông tin!",
      text: "Vui lòng nhập Họ tên và Số điện thoại.",
      icon: "warning",
      confirmButtonText: "OK"
    });
    return;
  }

  Swal.fire({
    title: "Đang gửi...",
    text: "Vui lòng chờ trong giây lát",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  // ⚠️ Dùng chung URL Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbyVBD-VUizQ4UhNJTkXeNI6lg1DDdaIKy34c96A0oFsm4xUbipaecXtxgjH7a1xSaL_/exec";

  const data = {
    type: "contact", // 🔥 Phân biệt loại form
    name,
    phone,
    email,
    requests: requests.join(", ")
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    Swal.fire({
      title: "🎉 Gửi liên hệ thành công!",
      text: "Chúng tôi sẽ phản hồi bạn sớm nhất có thể.",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => document.getElementById("contactForm").reset());
  })
  .catch((err) => {
    Swal.fire({
      title: "Lỗi kết nối!",
      text: "Không thể gửi dữ liệu: " + err.message,
      icon: "error",
      confirmButtonText: "OK"
    });
  });
});
