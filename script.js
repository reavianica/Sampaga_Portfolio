const themeCheckbox = document.getElementById('themeToggle');

function applyTheme(checked) {
    document.body.classList.toggle('light', checked);
}

if (themeCheckbox) {
    // initialize from current body class
    themeCheckbox.checked = document.body.classList.contains('light');
    themeCheckbox.addEventListener('change', () => applyTheme(themeCheckbox.checked));
}
// (No certification toggles — certifications are direct links)