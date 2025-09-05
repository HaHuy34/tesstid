function User(username, pass, ho, ten, email, products, donhang) {
	this.ho = ho || '';
	this.ten = ten || '';
	this.email = email || '';

	this.username = username;
	this.pass = pass;
	this.products = products || [];
	this.donhang = donhang || [];
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function Promo(name, value) { // khuyen mai
	this.name = name; // giamGia, bangtai, giaReOnline
	this.value = value;

	this.toWeb = function () {
		if (!this.name) return "";
		var contentLabel = "";
		switch (this.name) {
			case "giamgia":
				contentLabel = `<i class="fa fa-bolt"></i> Giảm ` + this.value + ``;
				break;

			case "bangtai":
				// contentLabel = `Trả góp ` + this.value + `%`;
				// break;
				return ""

			case "giareonline":
				contentLabel = `Giá rẻ online`;
				break;

			case "moiramat":
				contentLabel = "Mới ra mắt";
				break;
		}

		var label =
			`<label class=` + this.name + `>
			` + contentLabel + `
		</label>`;

		return label;
	}
}

function Product(masp, name, img, price, star, rateCount, promo) {
	this.masp = masp;
	this.img = img;
	this.name = name;
	this.price = price;
	this.star = star;
	this.rateCount = rateCount;
	this.promo = promo;
}

function addToWeb(p, ele, returnString) {
	// Chuyển star sang dạng tag html
	var rating = "";
	if (p.rateCount > 0) {
		for (var i = 1; i <= 5; i++) {
			if (i <= p.star) {
				rating += `<i class="fa fa-star"></i>`
			} else {
				rating += `<i class="fa fa-star-o"></i>`
			}
		}
		rating += `<span>` + p.rateCount + ` đánh giá</span>`;
	}

	// Chuyển giá tiền sang dạng tag html
	var price = `<span style="font-size: 20px;">Giá:</span><a class="call-phone" href="tel:0983976896" style="font-size: 20px; font-weight: 700; color: red;"> `  +  p.price + `</a>`;
	if (p.promo && p.promo.name == "giareonline") {
		// khuyến mãi 'Giá rẻ online' sẽ có giá thành mới
		price = `<strong>` + p.promo.value + `</strong>
				<span>` + p.price + `</span>`;
	}

	// tách theo dấu ' ' vào gắn lại bằng dấu '-', code này giúp bỏ hết khoảng trắng và thay vào bằng dấu '-'.
	// Tạo link tới chi tiết sản phẩm, chuyển tất cả ' ' thành '-'
	var chitietSp = 'chitietsanpham.html?' + p.name.split(' ').join('-');

	// Cho mọi thứ vào tag <li>... </li>
	var newLi =
	`<div class="sanPham col-12 col-sm-6 col-md-3 col-lg-3">
		<a href="` + chitietSp + `">
				<div class="imgContainer">
					<img src=` + p.img + ` alt="sp">
				</div>
				<h3>` + p.name + `</h3>
				<div class="price" style="text-align: center;">
					` + price +  `
				</div>
				` + (p.promo && p.promo.toWeb()) + `
				<div class="tooltip">
					<button class="themvaogio" onclick="themVaoGioHang('`+p.masp+`', '`+p.name+`'); return false;">
						<span class="tooltiptext" style="font-size: 15px;">Thêm vào giỏ</span>
						+
					</button>
				</div>
			</a>
	</div>`;

	if(returnString) return newLi;

	// Thêm tag <li> vừa tạo vào <ul> homeproduct (mặc định) , hoặc tag ele truyền vào
	var products = ele || document.getElementById('products');
	products.innerHTML += newLi;
}