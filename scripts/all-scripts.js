// Плавне завантаження сторінок
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

/* Перемикач теми світла-темна */
const toggle = document.getElementById("themeToggle");

function applyTheme() {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    if (toggle) {
        toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

if (toggle) {
    toggle.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || "light";
        const next = current === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        applyTheme();
    });
}

applyTheme();

// Бургер-меню вгорі ліворуч
    document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burgerBtn");
    const nav = document.getElementById("mainNav");

    burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("open");
    nav.classList.toggle("nav-open", isOpen);
});
});

// Автоматичне оновлення дати в футері
document.addEventListener("DOMContentLoaded", () => {
    const yearRange = document.getElementById("yearRange");
    const updatedInfo = document.getElementById("updatedInfo");

    const startYear = 2025;
    const currentYear = new Date().getFullYear();

    // Виводимо діапазон років
    if (currentYear > startYear) {
        yearRange.innerHTML = `${startYear}&ndash;${currentYear}`;
    } else {
        yearRange.textContent = startYear;
    }

    // Формат дати оновлення: DD.MM.YYYY
    if (updatedInfo) {
        const updated = new Date(document.lastModified);
        const day = String(updated.getDate()).padStart(2, "0");
        const month = String(updated.getMonth() + 1).padStart(2, "0");
        const year = updated.getFullYear();
        updatedInfo.textContent = ` (оновлено: ${day}.${month}.${year})`;
    }
});

// Скрипт для кнопки підняття вгору
    document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
} else {
    scrollBtn.classList.remove("show");
}
});

    scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
});