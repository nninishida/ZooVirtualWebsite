function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}


const backToTopButton = document.getElementById("backToTop");
// Mostra ou esconde o botão ao rolar
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block"; // Mostra o botão
    } else {
        backToTopButton.style.display = "none"; // Esconde o botão
    }
};

//Modo noturno
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentMode);
}
