var nameProduct, maProduct, sanPhamHienTai; // Tên sản phẩm trong trang này,
// là biến toàn cục để có thể dùng ở bát cứ đâu trong trang
// không cần tính toán lấy tên từ url nhiều lần

window.onload = function () {
  khoiTao();

  // thêm tags (từ khóa) vào khung tìm kiếm
  var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
  for (var t of tags) addTags(t, "index.html?search=" + t, true);

  phanTich_URL_chiTietSanPham();

  // autocomplete cho khung tim kiem
  autocomplete(document.getElementById("search-box"), list_products);

  // Thêm gợi ý sản phẩm
  sanPhamHienTai && suggestion();
  // Init
  loadProvinces();
  document.getElementById("province").addEventListener("change", function () {
    let provinceCode = this.value;
    if (provinceCode) loadDistricts(provinceCode);
  });

  document.getElementById("district").addEventListener("change", function () {
    let districtCode = this.value;
    if (districtCode) loadWards(districtCode);
  });
};

function khongTimThaySanPham() {
  document.getElementById("productNotFound").style.display = "block";
  document.getElementsByClassName("chitietSanpham")[0].style.display = "none";
}

function phanTich_URL_chiTietSanPham() {
  nameProduct = decodeURIComponent(window.location.href.split("?")[1]); // lấy tên
  
  if (!nameProduct) return khongTimThaySanPham();

  // tách theo dấu '-' vào gắn lại bằng dấu ' ', code này giúp bỏ hết dấu '-' thay vào bằng khoảng trắng.
  // code này làm ngược lại so với lúc tạo href cho sản phẩm trong file classes.js
  nameProduct = nameProduct.split("-").join(" ");

  for (var p of list_products) {
    if (nameProduct == p.name) {
      maProduct = p.masp;
      break;
    }
  }

  sanPhamHienTai = timKiemTheoMa(list_products, maProduct);
  console.log(sanPhamHienTai, "sanPhamHienTai");

  if (!sanPhamHienTai) return khongTimThaySanPham();

  var divChiTiet = document.getElementsByClassName("chitietSanpham")[0];

  // Đổi title
  document.title = nameProduct + " - Thế giới điện thoại";

  // Cập nhật tên h1
  var h1 = divChiTiet.getElementsByTagName("h1")[0];
  h1.innerHTML += nameProduct;

  // Cập nhật sao
  var rating = "";
  if (sanPhamHienTai.rateCount > 0) {
    for (var i = 1; i <= 5; i++) {
      if (i <= sanPhamHienTai.star) {
        rating += `<i class="fa fa-star"></i>`;
      } else {
        rating += `<i class="fa fa-star-o"></i>`;
      }
    }
    rating += `<span> ` + sanPhamHienTai.rateCount + ` đánh giá</span>`;
  }
  divChiTiet.getElementsByClassName("rating")[0].innerHTML += rating;

  // Cập nhật giá + label khuyến mãi
  var price = divChiTiet.getElementsByClassName("area_price")[0];
  if (sanPhamHienTai.promo.name != "giareonline") {
    // price.innerHTML = `<strong>` + sanPhamHienTai.price + `</strong>`;
    price.innerHTML += new Promo(
      sanPhamHienTai.promo.name,
      sanPhamHienTai.promo.value
    ).toWeb();
  } else {
    document.getElementsByClassName("ship")[0].style.display = ""; // hiển thị 'giao hàng trong 1 giờ'
    price.innerHTML =
      `<strong>` +
      sanPhamHienTai.promo.value +
      `&#8363;</strong>
					        <span>` +
      sanPhamHienTai.price +
      `&#8363;</span>`;
  }

  // Cập nhật chi tiết khuyến mãi
  document.getElementById("detailPromo").innerHTML =
    getDetailPromo(sanPhamHienTai);

  // Cập nhật thông số
  var info = document.getElementsByClassName("info")[0];

  var s = addThongSo("Tên", sanPhamHienTai.detail.ten);
  s += addThongSo("Model", sanPhamHienTai.detail.model);
  s += addThongSo("Tiêu chuẩn", sanPhamHienTai.detail.tieuchuan);
  s += addThongSo("Xuất sứ", sanPhamHienTai.detail.xuatsu);
  s += addThongSo("Đơn giá", sanPhamHienTai.detail.donggia);
  s += addThongSo("Bảo hành", sanPhamHienTai.detail.baohanh);
  s += addThongSo("Model khác", sanPhamHienTai.detail.modelkhac);
  // s += addThongSo('Thẻ nhớ', sanPhamHienTai.detail.deltailcontent);
  // s += addThongSo('Dung lượng pin', sanPhamHienTai.detail.image.iamge1);
  info.innerHTML = s;

  // Cập nhật hình
  var hinh = divChiTiet.getElementsByClassName("picture")[0];
  hinh = hinh.getElementsByTagName("img")[0];
  hinh.id = "sourceImg";
  hinh.src = sanPhamHienTai.img;
  document.getElementById("bigimg").src = sanPhamHienTai.img;
  enableZoom(hinh);

  // Hình nhỏ
  addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");
  addSmallImg("img/chitietsanpham/oppo-f9-mau-do-1-org.jpg");
  addSmallImg("img/chitietsanpham/oppo-f9-mau-do-2-org.jpg");
  addSmallImg("img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
  addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");
  addSmallImg("img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
  addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");

  // Khởi động thư viện hỗ trợ banner - chỉ chạy sau khi tạo xong hình nhỏ
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 5,
    center: true,
    smartSpeed: 450,
  });
}

// Chi tiết khuyến mãi
function getDetailPromo(sp) {
  switch (sp.promo.name) {
    case "bangtai":
      var span =
        `<span style="font-weight: bold"> lãi suất ` +
        sp.promo.value +
        `% </span>`;
      return (
        `Khách hàng có thể mua trả góp sản phẩm với ` +
        span +
        `với thời hạn 6 tháng kể từ khi mua hàng.`
      );

    case "giamgia":
      var span =
        `<span style="font-weight: bold">` + sp.promo.value + `</span>`;
      return (
        `Khách hàng sẽ được giảm ` +
        span +
        ` khi tới mua trực tiếp tại cửa hàng`
      );

    case "moiramat":
      return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;

    case "giareonline":
      var del = stringToNum(sp.price) - stringToNum(sp.promo.value);
      var span =
        `<span style="font-weight: bold">` + numToString(del) + `</span>`;
      return (
        `Sản phẩm sẽ được giảm ` +
        span +
        ` khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`
      );

    default:
      var span = `<span style="font-weight: bold">61 xe Wave Alpha</span>`;
      return `Cơ hội trúng ` + span + ` khi trả góp Home Credit`;
  }
}

function addThongSo(ten, giatri) {
  return (
    `<li>
                <p>` +
    ten +
    `</p>
                <div>` +
    giatri +
    `</div>
            </li>`
  );
}

// add hình
function addSmallImg(img) {
  var newDiv =
    `<div class='item'>
                        <a>
                            <img src=` +
    img +
    ` onclick="changepic(this.src)">
                        </a>
                    </div>`;
  var banner = document.getElementsByClassName("owl-carousel")[0];
  banner.innerHTML += newDiv;
}

// đóng mở xem hình
// function opencertain() {
//     document.getElementById("overlaycertainimg").style.transform = "scale(1)";
// }

function closecertain() {
  document.getElementById("overlaycertainimg").style.transform = "scale(0)";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
  document.getElementById("bigimg").src = src;
}

// Thêm sản phẩm vào các khung sản phẩm
// function addKhungSanPham(list_sanpham, tenKhung, color, ele) {
// 	// convert color to code

// 	var borderColor = `border-color: ` + color[0];
// 	var borderA = `	border-left: 2px solid ` + color[0] + `;
// 					border-right: 2px solid ` + color[0] + `;`;

// 	// mở tag
// 	var s = `<div class="khungSanPham" style="` + borderColor + `">
// 				<h3 class="tenKhung">* ` + tenKhung + ` *</h3>
// 				<div class="listSpTrongKhung flexContain row">`;

// 	for (var i = 0; i < list_sanpham.length; i++) {
// 		s += addProduct(list_sanpham[i], null, true);
// 		// truyền vào 'true' để trả về chuỗi rồi gán vào s
// 	}

// 	// thêm khung vào contain-khung
// 	ele.innerHTML += s;
// }

// ===== Thêm sản phẩm vào khung (dạng slide) =====
function addKhungSanPham(list_sanpham, tenKhung, color, ele) {
  var borderColor = `border-color:${color[0]}`;
  var borderA = `border-left:0px ${color[0]}; border-right:0px ${color[0]};`;

  // Mở khung
  var s = `
    <div class="khungSanPham" style="${borderColor}">
      <div class="headAndMore">
        <h3 class="tenKhung" style="background-image:linear-gradient(120deg, ${color[0]} 0%, ${color[1]} 50%, ${color[0]} 100%)">
          ${tenKhung}
        </h3>
        <a class="xemTatCa" href="index.html" style="display: none;">
          Xem tất cả ${list_sanpham.length} <i class='bx bx-arrow-right'></i>
        </a>
      </div>
      <div class="listSpTrongKhung owl-carousel">`;

  // Thêm từng sản phẩm (dạng item slide)
  for (var i = 0; i < list_sanpham.length; i++) {
    s += addProduct(list_sanpham[i], null, true);
  }

  // Đóng khung
  s += `</div></div>`;

  // Gắn vào element
  ele.innerHTML += s;

  // Khởi tạo OwlCarousel cho phần này
  $(ele)
    .find(".owl-carousel")
    .owlCarousel({
      items: 4, // số sp/slide
      margin: 15,
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      smartSpeed: 600,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
      },
    });
}

/// gợi ý sản phẩm
function suggestion() {
  // ====== Lay ra thong tin san pham hien tai ======
  const giaSanPhamHienTai = stringToNum(sanPhamHienTai.price);

  // ====== Tìm các sản phẩm tương tự theo tiêu chí ======
  const sanPhamTuongTu = list_products
    // Lọc sản phẩm trùng
    .filter((_) => _.masp !== sanPhamHienTai.masp)
    // Tính điểm cho từng sản phẩm
    .map((sanPham) => {
      // Tiêu chí 1: giá sản phẩm ko lệch nhau quá 1 triệu
      const giaSanPham = stringToNum(sanPham.price);
      let giaTienGanGiong = Math.abs(giaSanPham - giaSanPhamHienTai) < 1000000;

      // Tiêu chí 2: các thông số kỹ thuật giống nhau
      let soLuongChiTietGiongNhau = 0;
      for (let key in sanPham.detail) {
        let value = sanPham.detail[key];
        let currentValue = sanPhamHienTai.detail[key];

        if (value == currentValue) soLuongChiTietGiongNhau++;
      }
      let giongThongSoKyThuat = soLuongChiTietGiongNhau >= 3;

      // Tiêu chí 3: cùng hãng sản xuất
      let cungHangSanXuat = sanPham.company === sanPhamHienTai.company;

      // Tiêu chí 4: cùng loại khuyến mãi
      let cungLoaiKhuyenMai =
        sanPham.promo?.name === sanPhamHienTai.promo?.name;

      // Tiêu chí 5: có đánh giá, số sao
      let soDanhGia = Number.parseInt(sanPham.rateCount, 10);
      let soSao = Number.parseInt(sanPham.star, 10);

      // Tính điểm cho sản phẩm này (càng thoả nhiều tiêu chí điểm càng cao => càng nên gợi ý)
      let diem = 0;
      if (giaTienGanGiong) diem += 20;
      if (giongThongSoKyThuat) diem += soLuongChiTietGiongNhau;
      if (cungHangSanXuat) diem += 15;
      if (cungLoaiKhuyenMai) diem += 10;
      if (soDanhGia > 0) diem += (soDanhGia + "").length;
      diem += soSao;

      // Thêm thuộc tính diem vào dữ liệu trả về
      return {
        ...sanPham,
        diem: diem,
      };
    })
    // Sắp xếp theo số điểm cao xuống thấp
    .sort((a, b) => b.diem - a.diem)
    // Lấy ra 10 sản phẩm đầu tiên
    .slice(0, 10);

  console.log(sanPhamTuongTu);

  // ====== Hiển thị 5 sản phẩm lên web ======
  if (sanPhamTuongTu.length) {
    let div = document.getElementById("goiYSanPham");
    addKhungSanPham(sanPhamTuongTu, "SẢN PHẨM TƯƠNG TỰ", ["", ""], div);
  }
}

function enableZoom(imgElement) {
  const zoom = document.getElementById("zoomCircle");

  imgElement.addEventListener("mousemove", function (e) {
    const rect = imgElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    zoom.style.display = "block";
    zoom.style.left = e.pageX - zoom.offsetWidth / 2 + -200 + "px";
    zoom.style.top = e.pageY - zoom.offsetHeight / 2 + -250 + "px"; // lệch xuống 10px

    zoom.style.backgroundImage = `url(${imgElement.src})`;
    zoom.style.backgroundPosition = `${percentX}% ${percentY}%`;
  });

  imgElement.addEventListener("mouseleave", function () {
    zoom.style.display = "none";
  });
}

// Check form
function validateForm() {
    let gender = document.querySelector("input[name='gender']:checked");
    let name = document.querySelector("input[placeholder='Họ và tên']").value.trim();
    let phone = document.querySelector("input[placeholder='Số điện thoại']").value.trim();
    let email = document.querySelector("input[type='email']").value.trim();
    let province = document.getElementById("province").value;
    let district = document.getElementById("district").value;
    let ward = document.getElementById("ward").value;
    let address = document.querySelector("input[placeholder='Số nhà, tên đường']").value.trim();

    // Regex kiểm tra số điện thoại VN (10 số, bắt đầu từ 0)
    let phoneRegex = /^0\d{9}$/;
    // Regex kiểm tra email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!gender) {
        Swal.fire("Thiếu thông tin", "Vui lòng chọn Anh/Chị", "warning");
        return false;
    }
    if (name === "") {
        Swal.fire("Thiếu thông tin", "Vui lòng nhập họ và tên", "warning");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        Swal.fire("Sai định dạng", "Số điện thoại phải có 10 số và bắt đầu bằng 0", "error");
        return false;
    }
    if (!emailRegex.test(email)) {
        Swal.fire("Sai định dạng", "Vui lòng nhập email hợp lệ", "error");
        return false;
    }
    if (province === "") {
        Swal.fire("Thiếu thông tin", "Vui lòng chọn Tỉnh/Thành phố", "warning");
        return false;
    }
    if (district === "") {
        Swal.fire("Thiếu thông tin", "Vui lòng chọn Quận/Huyện", "warning");
        return false;
    }
    if (ward === "") {
        Swal.fire("Thiếu thông tin", "Vui lòng chọn Xã/Phường", "warning");
        return false;
    }
    if (address === "") {
        Swal.fire("Thiếu thông tin", "Vui lòng nhập số nhà, tên đường", "warning");
        return false;
    }

    // Nếu ok thì hiện thông báo đẹp
    Swal.fire({
        title: "🎉 Đặt hàng thành công!",
        text: "Chúng tôi sẽ liên hệ với bạn sớm.",
        icon: "success",
        confirmButtonText: "OK"
    });

    return true;
}

// Gắn sự kiện khi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-submit").addEventListener("click", function (e) {
        e.preventDefault();
        validateForm();
    });
});


// Load Tỉnh/TP
async function loadProvinces(provinceCode) {
  console.log(provinceCode, "provinceCode");
  const res = await fetch("https://provinces.open-api.vn/api/p/");
  const data = await res.json();

  let provinceSelect = document.getElementById("province");
  data.forEach((p) => {
    let opt = document.createElement("option");
    opt.value = p.code;
    opt.textContent = p.name;
    provinceSelect.appendChild(opt);
  });
}

// Load Quận/Huyện
async function loadDistricts(provinceCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  const data = await res.json();

  let districtSelect = document.getElementById("district");
  districtSelect.innerHTML = "<option value=''>Quận/Huyện</option>";
  document.getElementById("ward").innerHTML =
    "<option value=''>Xã/Phường</option>";

  data.districts.forEach((d) => {
    let opt = document.createElement("option");
    opt.value = d.code;
    opt.textContent = d.name;
    districtSelect.appendChild(opt);
  });
}

// Load Xã/Phường
async function loadWards(districtCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  const data = await res.json();
  let wardSelect = document.getElementById("ward");
  wardSelect.innerHTML = "<option value=''>Xã/Phường</option>";

  data.wards.forEach((w) => {
    let opt = document.createElement("option");
    opt.value = w.code;
    opt.textContent = w.name;
    wardSelect.appendChild(opt);
  });
}




// Event
document.getElementById("province").addEventListener("change", function () {
  if (this.value) loadDistricts(this.value);
});
document.getElementById("district").addEventListener("change", function () {
  if (this.value) loadWards(this.value);
});

function openBuyNow() {
  if (!sanPhamHienTai) return;

  const popup = document.getElementById("buyNowPopup");
  const box = document.getElementById("buyNowBox");

  popup.classList.add("active");

  // Reset animation mở
  box.classList.remove("Jelly", "FadeOutJelly");
  void box.offsetWidth;
  box.classList.add("Jelly");

  // Đổ dữ liệu sản phẩm
  popup.querySelector(".order-header h2 span").textContent = sanPhamHienTai.name;

  const img = popup.querySelector(".product img");
  img.src = sanPhamHienTai.img;
  img.alt = sanPhamHienTai.name;

  popup.querySelector(".product h3").textContent = sanPhamHienTai.name;
}

function closeBuyNow() {
  const popup = document.getElementById("buyNowPopup");
  const box = document.getElementById("buyNowBox");

  // Thay animation mở bằng animation tắt
  box.classList.remove("Jelly");
  box.classList.add("FadeOutJelly");

  // Sau khi animation kết thúc thì ẩn popup
  box.addEventListener("animationend", function handler() {
    popup.classList.remove("active");
    box.classList.remove("FadeOutJelly");
    box.removeEventListener("animationend", handler);
  });
}

function openQuestion(btn) {
  // toggle class cho chính button
  btn.classList.toggle("active");

  // tìm đến phần trả lời liền kề
  const answer = btn.nextElementSibling;
  answer.classList.toggle("show");
}


