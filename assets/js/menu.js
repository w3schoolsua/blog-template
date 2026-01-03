/* ============================================================
   menu.js — ЄДИНИЙ ПРАВИЛЬНИЙ РОБОЧИЙ СКРИПТ
   ------------------------------------------------------------
   Виконує:
   - завантаження articles.json
   - сортування
   - фільтрацію (категорії + пошук)
   - пагінацію
   - рендеринг списку статей
   - рендеринг бокового меню статей
   ============================================================ */
/* -----------------------------
   Глобальні змінні
----------------------------- */
let articles = [];          // всі статті
let filteredArticles = [];  // відфільтровані статті
let page = 1;               // поточна сторінка
const perPage = 5;          // кількість статей на сторінку
/* -----------------------------
   Завантаження articles.json
----------------------------- */
async function loadArticles() {

    // ❗ ВАЖЛИВО: правильний шлях для GitHub Pages репозиторію
    const res = await fetch("data/articles.json");
    articles = await res.json();

    // Сортуємо за датою (новіші зверху)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Початковий список = всі статті
    filteredArticles = [...articles];

    // Отримуємо елементи DOM
    const list = document.getElementById("articlesList");
    const menu = document.getElementById("articlesMenu");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");
    const pagination = document.getElementById("pagination");
    /* -----------------------------
       Заповнення списку категорій
    ----------------------------- */
    if (categoryFilter) {
        const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];

        categories.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            categoryFilter.appendChild(opt);
        });
        categoryFilter.addEventListener("change", () => {
            applyFilters();
            page = 1;
            renderList(list, pagination);
        });
    }
    /* -----------------------------
       Пошук
    ----------------------------- */
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            applyFilters();
            page = 1;
            renderList(list, pagination);
        });
    }
    /* -----------------------------
       Початковий рендер
    ----------------------------- */
    renderList(list, pagination);

    /* -----------------------------
       Бокове меню статей
    ----------------------------- */
    if (menu) {
        menu.innerHTML = articles
            .map(a => `<a href="${a.url}">${a.title}</a>`)
            .join("");
    }
}
/* -----------------------------
   Фільтрація статей
----------------------------- */
function applyFilters() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const q = searchInput ? searchInput.value.toLowerCase() : "";
    const cat = categoryFilter ? categoryFilter.value : "";

    filteredArticles = articles.filter(a => {
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchCat = !cat || a.category === cat;
        return matchTitle && matchCat;
    });
}

/* -----------------------------
   Рендеринг списку статей
----------------------------- */
function renderList(list, pagination) {
    if (!list) return;

    const totalPages = Math.ceil(filteredArticles.length / perPage) || 1;

    // Захист від виходу за межі
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slice = filteredArticles.slice(start, end);

    list.innerHTML = slice
        .map(a => {
            const tags = a.tags?.length
                ? `<span class="tags">${a.tags.map(t => `#${t}`).join(" ")}</span>`
                : "";

            return `
                <a href="${a.url}">
                    <div class="article-item">
                        <div>
                            <div class="article-title">${a.title}</div>
                            <div class="article-meta">${a.date} · ${a.category || ""}</div>
                            ${tags}
                        </div>
                    </div>
                </a>
            `;
        })
        .join("");

    /* -----------------------------
       Пагінація
    ----------------------------- */
    if (pagination) {
        pagination.innerHTML = `
            <button ${page === 1 ? "disabled" : ""} onclick="prevPage()">Назад</button>
            <span>${page} / ${totalPages}</span>
            <button ${page === totalPages ? "disabled" : ""} onclick="nextPage()">Вперед</button>
        `;
    }
}


/* -----------------------------
   Кнопки пагінації
----------------------------- */
window.prevPage = () => {
    page--;
    renderList(
        document.getElementById("articlesList"),
        document.getElementById("pagination")
    );
};

window.nextPage = () => {
    page++;
    renderList(
        document.getElementById("articlesList"),
        document.getElementById("pagination")
    );
};


/* -----------------------------
   Запуск
----------------------------- */
loadArticles();