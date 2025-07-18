function setTheme() {
    const body = document.body;
    if (body.classList.contains('dark_mode')) {
        body.classList.remove('dark_mode');
        body.classList.add('light_mode');
        document.querySelector('.theme_toggle').textContent = '🌙';
    } else {
        body.classList.remove('light_mode');
        body.classList.add('dark_mode');
        document.querySelector('.theme_toggle').textContent = '🌞';
    }
}