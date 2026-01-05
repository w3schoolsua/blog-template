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