const container = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const modal = document.getElementById("newsModal");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.getElementById("closeModal");

let currentPage = 1;
const perPage = 6;
let triggerButton = null; // nút “Đọc tiếp →” bấm lần cuối

// Render tin tức
function renderNews() {
  const query = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  const filtered = newsData.filter(n => {
    const matchQuery = n.title.toLowerCase().includes(query) || n.summary.toLowerCase().includes(query);
    const matchCat = category === "Tất cả" || n.category === category;
    return matchQuery && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);

  container.innerHTML = pageData.map(item => `
  <article class="news-card">
    <div class="skeleton">
      <img src="${item.image}" alt="${item.title}" onload="this.parentElement.classList.add('loaded')">
    </div>
    <div class="news-content">
      <div class="news-category"> <span>${item.category}</span> <span>${new Date(item.date).toLocaleDateString("vi-VN")}</span></div>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-summary">${item.summary}</p>
      <div class="news-footer">
        <a onclick="openArticle(${item.id}, this)">Đọc tiếp →</a>
      </div>
    </div>
  </article>
`).join("");


  renderPagination(totalPages);
}

// Pagination
function renderPagination(totalPages) {
  let pagination = document.getElementById("pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.className = "pagination";
    container.insertAdjacentElement("afterend", pagination);
  }
  pagination.innerHTML = `
    <button ${currentPage===1?"disabled":""} onclick="changePage(${currentPage-1})">← Trước</button>
    ${Array.from({length: totalPages}, (_, i) => `<button class="${currentPage===i+1?"active":""}" onclick="changePage(${i+1})">${i+1}</button>`).join("")}
    <button ${currentPage===totalPages?"disabled":""} onclick="changePage(${currentPage+1})">Sau →</button>
  `;
}

function changePage(page) {
  currentPage = page;
  renderNews();
  window.scrollTo({top:0, behavior:"smooth"});
}

// Mở modal
function openArticle(id, btn) {
  triggerButton = btn;
  modal.style.display = "flex";
  modal.classList.add("show");

  const article = newsData.find(n => n.id===id);
  document.getElementById("modalImage").src = article.image;
  document.getElementById("modalTitle").textContent = article.title;
  document.getElementById("modalCategory").textContent = article.category;
  document.getElementById("modalDate").textContent = new Date(article.date).toLocaleDateString("vi-VN");
  document.getElementById("modalContent").innerHTML = article.content;

  modalContent.style.transform = "scale(1) translate(0,0)";
  modalContent.style.opacity = "1";
}

// Đóng modal với Shrink to Button
function closeWithShrink() {
  if (!triggerButton) return;

  const btnRect = triggerButton.getBoundingClientRect();
  const modalRect = modalContent.getBoundingClientRect();

  const offsetX = btnRect.left - modalRect.left;
  const offsetY = btnRect.top - modalRect.top;

  modalContent.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.1)`;
  modalContent.style.opacity = "0";
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("show", "fade-out");
    modalContent.style.transform = "scale(1) translate(0,0)";
    modalContent.style.opacity = "1";
  }, 400);
}

closeModal.onclick = closeWithShrink;
window.onclick = e => { if(e.target===modal) closeWithShrink(); }

searchInput.addEventListener("input", () => { currentPage=1; renderNews(); });
categorySelect.addEventListener("change", () => { currentPage=1; renderNews(); });

renderNews();
