/* ============================================================
   year.js — розумний футер
   ------------------------------------------------------------
   Функції:
   1) Відображення року або діапазону років (2025–2026)
   2) Додавання тексту "Усі права захищені"
   3) Автоматичне визначення року оновлення статті
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       1. Рік або діапазон років
    ----------------------------- */
    const startYear = 2025; // ← Рік створення сайту
    const currentYear = new Date().getFullYear();

    const yearSpan = document.getElementById("yearRange");
    if (yearSpan) {
        yearSpan.textContent =
            currentYear === startYear
                ? startYear
                : `${startYear}–${currentYear}`;
    }

    /* -----------------------------
       2. Рік оновлення статті
       Працює тільки на сторінках статей
    ----------------------------- */
    const updatedInfo = document.getElementById("updatedInfo");

    if (updatedInfo) {
        // Шукаємо елемент з датою статті
        const dateElement = document.querySelector(".date");

        if (dateElement) {
            // Дата у форматі DD.MM.YYYY або YYYY-MM-DD
            const raw = dateElement.textContent.trim();

            let year = null;

            // Якщо формат DD.MM.YYYY
            if (raw.includes(".")) {
                year = raw.split(".")[2];
            }

            // Якщо формат YYYY-MM-DD
            if (raw.includes("-")) {
                year = raw.split("-")[0];
            }

            if (year) {
                updatedInfo.textContent = ` · Оновлено: ${year}`;
            }
        }
    }
});