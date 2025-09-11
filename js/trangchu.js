window.onload = function () {
  khoiTao();

  // Thêm hình vào banner
  function addBanner(img1, img2) {
    let wrapper = document.querySelector(".mySwiper .swiper-wrapper");
    let slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `<img src="${img1}" alt="sp">`;
    wrapper.appendChild(slide);
  }

  // Thêm ảnh vào banner
  addBanner("img/banners/banner-0.jpg", "img/banners/banner-1.jpg");
  let numBanner = 3;
  for (let i = 1; i <= numBanner; i++) {
    let linkimg = "img/banners/banner-" + i + ".jpg";
    addBanner(linkimg, linkimg);
  }

  // Khởi tạo Swiper
  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");

  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      },
    },
  });

  // autocomplete cho khung tim kiem
  autocomplete(document.getElementById("search-box"), list_products);

  // thêm tags (từ khóa) vào khung tìm kiếm
  var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
  for (var t of tags) addTags(t, "index.html?search=" + t);

  // Danh sách hãng
  var company = [
    "fuchs.png",
    "images.png",
    "mst.jpg",
    "nikken.jpeg",
    "seco.jpg",
    "ShellLogo.webp",
    "ssk.png",
    "techtyl.jpg",
    "windin.jpg",
  ];

  // Hàm tạo link
  function createLinkFilter(action, type, value) {
    return `#${action}-${type}-${value}`;
  }

  // Hàm thêm hãng sản xuất
  function addCompany(img, nameCompany) {
    var link = createLinkFilter("add", "company", nameCompany);
    var new_tag = `
    <div class="item">
      <a href="${link}">
        <img src="${img}" alt="${nameCompany}">
      </a>
    </div>`;
    document
      .querySelector(".companyMenu")
      .insertAdjacentHTML("beforeend", new_tag);
  }

  $(document).ready(function () {
    // Render item trước
    for (var c of company) {
      addCompany("img/company/" + c, c.replace(/\.[^/.]+$/, ""));
      // replace() để bỏ đuôi .png/.jpg cho sạch
    }

    // Rồi mới init Owl
    $(".companyMenu").owlCarousel({
      items: 5,
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2500,
      smartSpeed: 600,
      responsive: {
        0: { items: 2 },
        576: { items: 3 },
        768: { items: 4 },
        1200: { items: 4 },
      },
    });
  });

  // Thêm sản phẩm vào trang
  var sanPhamPhanTich;
  var sanPhamPhanTrang;

  var filters = getFilterFromURL();
  if (filters.length) {
    // có filter
    sanPhamPhanTich = phanTich_URL(filters, true);
    sanPhamPhanTrang = tinhToanPhanTrang(
      sanPhamPhanTich,
      filtersFromUrl.page || 1
    );
    if (!sanPhamPhanTrang.length) {
      alertNotHaveProduct(false);
      let filterBox = document.querySelector(".filter-container");
      if (filterBox) filterBox.style.display = "none";
    } else addProductsFrom(sanPhamPhanTrang);

    // hiển thị list sản phẩm
    document.getElementsByClassName("contain-products")[0].style.display = "";
    document.getElementsByClassName("swiper")[0].style.display = "none";
    // document.getElementsByClassName("title-products")[0].style.display = "none";
  } else {
    // ko có filter : trang chính mặc định sẽ hiển thị các sp hot, ...
    var soLuong = window.innerWidth < 1300 ? 4 : 4; // màn hình nhỏ thì hiển thị 4 sp, to thì hiển thị 5

    // Các màu
    var yellow_red = ["#ff9c00", "#ec1f1f"];
    var blue = ["#42bcf4", "#004c70"];
    var green = ["#5de272", "#007012"];

    // Thêm các khung sản phẩm
    var div = document.getElementsByClassName("contain-khungSanPham")[0];
    // addKhungSanPham(
    //   "NỔI BẬT NHẤT",
    //   yellow_red,
    //   ["star=3", "sort=rateCount-decrease"],
    //   soLuong,
    //   div
    // );
    addKhungSanPham(
      "DẦU NHỚT MOBIL",
      blue,
      ["promo=daunhotmobil", "sort=rateCount-decrease"],
      soLuong,
      div
    );
    addKhungSanPham(
      "DẦU NHỚT MOTUL",
      yellow_red,
      ["promo=daunhotmobil", "sort=rateCount-decrease"],
      soLuong,
      div
    );
    // addKhungSanPham(
    //   "GIÁ SỐC ONLINE",
    //   green,
    //   ["promo=giareonline", "sort=rateCount-decrease"],
    //   soLuong,
    //   div
    // );
    // addKhungSanPham(
    //   "GIẢM GIÁ LỚN",
    //   yellow_red,
    //   ["promo=giamgia"],
    //   soLuong,
    //   div
    // );
    // addKhungSanPham(
    //   "GIÁ RẺ CHO MỌI NHÀ",
    //   green,
    //   ["price=0-3000000", "sort=price"],
    //   soLuong,
    //   div
    // );
  }

  // Thêm chọn mức giá
  addPricesRange(0, 2000000);
  addPricesRange(2000000, 4000000);
  addPricesRange(4000000, 7000000);
  addPricesRange(7000000, 13000000);
  addPricesRange(13000000, 0);

  // Thêm chọn khuyến mãi
  addPromotion("giamgia");
  addPromotion("bangtai");
  addPromotion("moiramat");
  addPromotion("giareonline");

  // Thêm chọn số sao
  addStarFilter(3);
  addStarFilter(4);
  addStarFilter(5);

  // Thêm chọn sắp xếp
  // addSortFilter("ascending", "price", "Giá tăng dần");
  // addSortFilter("decrease", "price", "Giá giảm dần");
  // addSortFilter("ascending", "star", "Sao tăng dần");
  // addSortFilter("decrease", "star", "Sao giảm dần");
  // addSortFilter("ascending", "rateCount", "Đánh giá tăng dần");
  // addSortFilter("decrease", "rateCount", "Đánh giá giảm dần");
  addSortFilter("ascending", "name", "Tên A-Z");
  addSortFilter("decrease", "name", "Tên Z-A");

  // Thêm filter đã chọn
  addAllChoosedFilter();
};

var soLuongSanPhamMaxTrongMotTrang = 8;

// =========== Đọc dữ liệu từ url ============
var filtersFromUrl = {
  // Các bộ lọc tìm được trên url sẽ đc lưu vào đây
  company: "",
  search: "",
  price: "",
  promo: "",
  star: "",
  page: "",
  sort: {
    by: "",
    type: "ascending",
  },
};

function getFilterFromURL() {
  // tách và trả về mảng bộ lọc trên url
  var fullLocation = window.location.href;
  fullLocation = decodeURIComponent(fullLocation);
  var dauHoi = fullLocation.split("?"); // tách theo dấu ?

  if (dauHoi[1]) {
    var dauVa = dauHoi[1].split("&");
    return dauVa;
  }

  return [];
}

function phanTich_URL(filters, saveFilter) {
  // var filters = getFilterFromURL();
  var result = copyObject(list_products);

  for (var i = 0; i < filters.length; i++) {
    var dauBang = filters[i].split("=");

    switch (dauBang[0]) {
      case "search":
        dauBang[1] = dauBang[1].split("+").join(" ");
        result = timKiemTheoTen(result, dauBang[1]);
        if (saveFilter) filtersFromUrl.search = dauBang[1];
        break;

      case "price":
        if (saveFilter) filtersFromUrl.price = dauBang[1];

        var prices = dauBang[1].split("-");
        prices[1] = Number(prices[1]) || 1e10;
        result = timKiemTheoGiaTien(result, prices[0], prices[1]);
        break;

      case "company":
        result = timKiemTheoCongTySanXuat(result, dauBang[1]);
        if (saveFilter) filtersFromUrl.company = dauBang[1];
        break;

      case "star":
        result = timKiemTheoSoLuongSao(result, dauBang[1]);
        if (saveFilter) filtersFromUrl.star = dauBang[1];
        break;

      case "promo":
        result = timKiemTheoKhuyenMai(result, dauBang[1]);
        if (saveFilter) filtersFromUrl.promo = dauBang[1];
        break;

      case "page": // page luôn ở cuối đường link
        if (saveFilter) filtersFromUrl.page = dauBang[1];
        break;

      case "sort":
        var s = dauBang[1].split("-");
        var tenThanhPhanCanSort = s[0];

        switch (tenThanhPhanCanSort) {
          case "price":
            if (saveFilter) filtersFromUrl.sort.by = "price";
            result.sort(function (a, b) {
              var giaA = parseInt(a.price.split(".").join(""));
              var giaB = parseInt(b.price.split(".").join(""));
              return giaA - giaB;
            });
            break;

          case "star":
            if (saveFilter) filtersFromUrl.sort.by = "star";
            result.sort(function (a, b) {
              return a.star - b.star;
            });
            break;

          case "rateCount":
            if (saveFilter) filtersFromUrl.sort.by = "rateCount";
            result.sort(function (a, b) {
              return a.rateCount - b.rateCount;
            });
            break;

          case "name":
            if (saveFilter) filtersFromUrl.sort.by = "name";
            result.sort(function (a, b) {
              return a.name.localeCompare(b.name);
            });
            break;
        }

        if (s[1] == "decrease") {
          if (saveFilter) filtersFromUrl.sort.type = "decrease";
          result.reverse();
        }

        break;
    }
  }

  return result;
}

// thêm các sản phẩm từ biến mảng nào đó vào trang
function addProductsFrom(list, vitri, soluong) {
  var start = vitri || 0;
  var end = soluong ? start + soluong : list.length;
  for (var i = start; i < end; i++) {
    addProduct(list[i]);
  }
}

function clearAllProducts() {
  document.getElementById("products").innerHTML = "";
}

// Thêm sản phẩm vào các khung sản phẩm
function addKhungSanPham(tenKhung, color, filter, len, ele) {
  // style màu
  var borderColor = `border-color: ${color[0]}`;

  // mở tag
  var s = `
    <div class="khungSanPham" style="${borderColor}">
      <div class="khungHeader">
        <h3 class="tenKhung">${tenKhung}</h3>
        <a class="xemTatCa" href="index.html?${filter.join("&")}">
          Xem tất cả <i class='bxr  bx-arrow-right'  ></i> 
        </a>
      </div>
      <div class="listSpTrongKhung flexContains row">`;

  // thêm sản phẩm
  var spResult = phanTich_URL(filter, false);
  if (spResult.length < len) len = spResult.length;

  if (spResult.length > 0) {
    for (var i = 0; i < len; i++) {
      s += addProduct(spResult[i], null, true);
    }
  } else {
    s += `<p class="noProduct">Không có sản phẩm nào</p>`;
  }

  // đóng tag
  s += `
      </div>
    </div>`;

  // thêm khung vào ele
  ele.insertAdjacentHTML("beforeend", s);
}

// Nút phân trang
function themNutPhanTrang(soTrang, trangHienTai) {
  var divPhanTrang = document.getElementsByClassName("pagination")[0];

  // ✅ Xóa nội dung cũ trước khi vẽ mới
  divPhanTrang.innerHTML = "";

  var k = createLinkFilter("remove", "page");
  if (k.indexOf("?") > 0) k += "&";
  else k += "?";

  if (trangHienTai > 1) {
    // Nút về phân trang trước
    divPhanTrang.innerHTML +=
      `<a href="` +
      k +
      `page=` +
      (trangHienTai - 1) +
      `"><i class="fa fa-angle-left"></i></a>`;
  }

  if (soTrang > 1) {
    for (var i = 1; i <= soTrang; i++) {
      if (i == trangHienTai) {
        divPhanTrang.innerHTML +=
          `<a href="javascript:;" class="current">` + i + `</a>`;
      } else {
        divPhanTrang.innerHTML +=
          `<a href="` + k + `page=` + i + `">` + i + `</a>`;
      }
    }
  }

  if (trangHienTai < soTrang) {
    divPhanTrang.innerHTML +=
      `<a href="` +
      k +
      `page=` +
      (trangHienTai + 1) +
      `"><i class="fa fa-angle-right"></i></a>`;
  }
}

// Tính toán xem có bao nhiêu trang + trang hiện tại,
// Trả về mảng sản phẩm trong trang hiện tại tính được
function tinhToanPhanTrang(list, vitriTrang) {
  var sanPhamDu = list.length % soLuongSanPhamMaxTrongMotTrang;
  var soTrang =
    parseInt(list.length / soLuongSanPhamMaxTrongMotTrang) +
    (sanPhamDu ? 1 : 0);
  var trangHienTai = parseInt(vitriTrang < soTrang ? vitriTrang : soTrang);

  themNutPhanTrang(soTrang, trangHienTai);
  var start = soLuongSanPhamMaxTrongMotTrang * (trangHienTai - 1);

  var temp = copyObject(list);

  return temp.splice(start, soLuongSanPhamMaxTrongMotTrang);
}

// ======== TÌM KIẾM (Từ mảng list truyền vào, trả về 1 mảng kết quả) ============

// function timKiemTheoTen(list, ten, soluong) {}
// hàm Tìm-kiếm-theo-tên được đặt trong dungchung.js , do trang chitietsanpham cũng cần dùng tới nó

function timKiemTheoCongTySanXuat(list, tenCongTy, soluong) {
  var count,
    result = [];
  if (soluong < list.length) count = soluong;
  else count = list.length;

  for (var i = 0; i < list.length; i++) {
    if (list[i].company.toUpperCase().indexOf(tenCongTy.toUpperCase()) >= 0) {
      result.push(list[i]);
      count--;
      if (count <= 0) break;
    }
  }
  return result;
}

function timKiemTheoSoLuongSao(list, soLuongSaoToiThieu, soluong) {
  var count,
    result = [];
  if (soluong < list.length) count = soluong;
  else count = list.length;

  for (var i = 0; i < list.length; i++) {
    if (list[i].star >= soLuongSaoToiThieu) {
      result.push(list[i]);
      count--;
      if (count <= 0) break;
    }
  }

  return result;
}

function timKiemTheoGiaTien(list, giaMin, giaMax, soluong) {
  var count,
    result = [];
  if (soluong < list.length) count = soluong;
  else count = list.length;

  for (var i = 0; i < list.length; i++) {
    var gia = parseInt(list[i].price.split(".").join(""));
    if (gia >= giaMin && gia <= giaMax) {
      result.push(list[i]);
      count--;
      if (count <= 0) break;
    }
  }

  return result;
}

function timKiemTheoKhuyenMai(list, tenKhuyenMai, soluong) {
  var count,
    result = [];
  if (soluong < list.length) count = soluong;
  else count = list.length;

  for (var i = 0; i < list.length; i++) {
    if (list[i].promo.name == tenKhuyenMai) {
      result.push(list[i]);
      count--;
      if (count <= 0) break;
    }
  }

  return result;
}

function timKiemTheoRAM(list, luongRam, soluong) {
  var count,
    result = [];
  if (soluong < list.length) count = soluong;
  else count = list.length;

  for (var i = 0; i < list.length; i++) {
    if (parseInt(list[i].detail.ram) == luongRam) {
      result.push(list[i]);
      count--;
      if (count <= 0) break;
    }
  }

  return result;
}

// ========== LỌC ===============
// ================== LỌC ==================

// Tạo link cho bộ lọc
function createLinkFilter(type, nameFilter, valueAdd) {
  var o = copyObject(filtersFromUrl);
  o.page = ""; // reset phân trang

  if (nameFilter == "sort") {
    if (type == "add") {
      o.sort.by = valueAdd.by;
      o.sort.type = valueAdd.type;
    } else if (type == "remove") {
      o.sort.by = "";
    }
  } else {
    if (type == "add") o[nameFilter] = valueAdd;
    else if (type == "remove") o[nameFilter] = "";
  }

  var link = "index.html";
  var h = false;

  // thêm những filter trước sort
  for (var i in o) {
    if (i != "sort" && o[i]) {
      link += (h ? "&" : "?") + i + "=" + o[i];
      h = true;
    }
  }

  // thêm sort
  if (o.sort.by != "")
    link += (h ? "&" : "?") + "sort=" + o.sort.by + "-" + o.sort.type;

  return link;
}

// Reset sort về mặc định
function resetSortFilter() {
  // Xoá sort khỏi URL
  var link = createLinkFilter("remove", "sort");
  window.history.pushState({}, "", link);

  // Lấy filter từ URL mới
  var filters = getFilterFromURL();

  // Phân tích lại sản phẩm
  var sanPhamPhanTich = phanTich_URL(filters, true);
  var sanPhamPhanTrang = tinhToanPhanTrang(
    sanPhamPhanTich,
    filtersFromUrl.page || 1
  );

  // Clear sản phẩm cũ
  clearAllProducts();

  // Hiển thị sản phẩm mới
  if (!sanPhamPhanTrang.length) {
    alertNotHaveProduct(false);
  } else {
    addProductsFrom(sanPhamPhanTrang);
  }
}

// Nút bấm sắp xếp → cập nhật URL + gọi phanTich_URL
// Nút bấm sắp xếp → cập nhật URL + gọi phanTich_URL
function addSortFilter(type, nameFilter, text) {
  // Tạo link mới cho URL
  var link = createLinkFilter("add", "sort", {
    by: nameFilter,
    type: type,
  });

  // Cập nhật URL trên trình duyệt (không reload)
  window.history.pushState({}, "", link);

  // Lấy filter từ URL
  var filters = getFilterFromURL();

  // Phân tích lại sản phẩm
  var sanPhamPhanTich = phanTich_URL(filters, true);
  var sanPhamPhanTrang = tinhToanPhanTrang(
    sanPhamPhanTich,
    filtersFromUrl.page || 1
  );

  // Clear sản phẩm cũ
  clearAllProducts();

  // Hiển thị sản phẩm mới
  if (!sanPhamPhanTrang.length) {
    alertNotHaveProduct(false);
  } else {
    addProductsFrom(sanPhamPhanTrang);
  }
}

// ================== Lọc TRONG TRANG ==================

// Hiển thị Sản phẩm
function showLi(li) {
  li.style.opacity = 1;
  li.style.width = "239px";
  li.style.borderWidth = "1px";
}
// Ẩn sản phẩm
function hideLi(li) {
  li.style.width = 0;
  li.style.opacity = 0;
  li.style.borderWidth = "0";
}

// Lấy mảng sản phẩm hiện tại
function getLiArray() {
  var ul = document.getElementById("products");
  return ul.getElementsByTagName("li");
}

// Lấy tên sản phẩm từ li
function getNameFromLi(li) {
  var a = li.getElementsByTagName("a")[0];
  var h3 = a.getElementsByTagName("h3")[0];
  return h3.innerHTML;
}

// Lọc theo tên trong input
function filterProductsName(ele) {
  var filter = ele.value.toUpperCase();
  var listLi = getLiArray();
  var coSanPham = false;
  var soLuong = 0;

  for (var i = 0; i < listLi.length; i++) {
    if (
      getNameFromLi(listLi[i]).toUpperCase().indexOf(filter) > -1 &&
      soLuong < soLuongSanPhamMaxTrongMotTrang
    ) {
      showLi(listLi[i]);
      coSanPham = true;
      soLuong++;
    } else {
      hideLi(listLi[i]);
    }
  }

  alertNotHaveProduct(coSanPham);
}

// ================== Thông báo ==================
function alertNotHaveProduct(coSanPham) {
  var thongbao = document.getElementById("khongCoSanPham");
  if (!coSanPham) {
    thongbao.style.width = "auto";
    thongbao.style.display = "block";
    thongbao.style.margin = "auto";
    thongbao.style.transitionDuration = "1s";
  } else {
    thongbao.style.width = "0";
    thongbao.style.opacity = "0";
    thongbao.style.margin = "0";
    thongbao.style.transitionDuration = "0s";
  }
}

// ================== Tiện ích ==================
function sortToString(sortBy) {
  switch (sortBy) {
    case "price":
      return "Giá ";
    case "star":
      return "Sao ";
    case "rateCount":
      return "Đánh giá ";
    case "name":
      return "Tên ";
    default:
      return "";
  }
}

// filter product
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // bỏ active ở tất cả nút
      buttons.forEach((b) => b.classList.remove("active"));
      // thêm active cho nút được click
      btn.classList.add("active");
    });
  });
});
