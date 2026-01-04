document.addEventListener("DOMContentLoaded", () => {
    const yearRange = document.getElementById("yearRange");
    const updatedInfo = document.getElementById("updatedInfo");

    const startYear = 2025;
    const currentYear = new Date().getFullYear();

    // Використовуємо HTML-код &ndash; замість символу тире
    if (currentYear > startYear) {
        yearRange.innerHTML = `${startYear}&ndash;${currentYear}`;
    } else {
        yearRange.textContent = startYear;
    }

    // Дата оновлення (опціонально)
    const updated = document.lastModified;
    if (updatedInfo) {
        updatedInfo.textContent = ` (оновлено: ${updated.split(" ")[0]})`;
    }
});