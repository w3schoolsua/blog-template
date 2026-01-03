/* ============================================================
   article-date.js — автоматичне вставлення дати публікації
   ------------------------------------------------------------
   1) Визначає URL поточної статті
   2) Шукає її в articles.json (по відносному шляху)
   3) Вставляє <time datetime="YYYY-MM-DD">DD.MM.YYYY</time>
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {

    // Елемент <time> у статті
    const timeEl = document.getElementById("articleDate");
    if (!timeEl) return; // якщо це не сторінка статті — виходимо

    // Завантажуємо список статей
    // ВАЖЛИВО: шлях відносно сторінки статті (/articles/...)
    const res = await fetch("../data/articles.json");
    const articles = await res.json();

    // Поточний шлях, наприклад:
    // /repository/articles/2025-01-01-first.html
    const fullPath = window.location.pathname.replace(/^\/+/, "");

    // Беремо тільки частину після репозиторію:
    // repository/articles/2025-01-01-first.html → articles/2025-01-01-first.html
    const parts = fullPath.split("/");
    const relPath = parts.slice(-2).join("/"); // останні 2 сегменти: articles/файл.html

    // Знаходимо статтю в JSON по відносному шляху
    const article = articles.find(a => a.url === relPath);

    if (!article) {
        // Якщо не знайшли — нічого не робимо
        return;
    }

    // Форматуємо дату
    const iso = article.published; // YYYY-MM-DD
    const [y, m, d] = iso.split("-");
    const formatted = `${d}.${m}.${y}`;

    // Вставляємо дату у <time>
    timeEl.setAttribute("datetime", iso);
    timeEl.textContent = formatted;
});