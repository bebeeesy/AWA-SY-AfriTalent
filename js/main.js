// on recupere le bouton toggle dans le html
const toggleTheme = document.querySelector('.toggle-theme');
// on recupere le theme sauvegarde dans localstorage
const toggleTheme = localStorage.getItem('theme');
// fonction qui applique le theme selon le choix
function appliquer (theme) {
    if (theme === 'clair') {
        // mode clair
document.body.classList.add('mode-clair');
document.body.classList.remove('mode-sombre');
        // icone soleil
        if (toggleTheme) {
            toggleTheme.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
            toggleTheme.setAttribute('aria-label','Passer en mode sombre');
            
        }
    } else {
        // mode soombre par defaut 
        document.body.classList.remove('mode-clair');
        document.body.classList.add('mode-sombre');
        // icone lune
        if (toggleTheme) {
            toggleTheme.innerHTML =  '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
            toggleTheme.setAttribute('aria-label', 'Passer en mode clair');
        }
    }

}
// au chargement on applique le theme sauvegarde
// sinon mode sombre par defaut
if (themeSauvegarde) {
    appliquerTheme(themeSauvegarde);

    
} else {
    appliquerTheme('sombre');

}
if (toggleTheme) {
    toggleTheme.addEventListener('click',function() {
        const themeActuel = localStorage.getItem('theme') || 'sombre';
        if (themeActuel === 'sombre') {
            appliquerTheme('clair');
            localStorage.setItem('clair');
            
        } else {
            appliquerTheme('sombre');
localStorage.setItem('theme','sombre');
        }
    });
}
// navbar dinamique au scrool
// le style change au defilemet
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll',function() {
    if (window.scrollY > 80) {
        navbar.classList.add('navbar-scrolled');

    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
// bouton retour en haut
// apparait apres 400px de scroll
// remonte en douceur avec smooth scrool

const boutonHaut = document.querySelector('bouton-retour-haut');
// affiche ou cache le bouton selon la position du scrool
window.addEventListener('scroll', function() {
    if (boutonHaut) {
        
    
    if (window.scrollY > 400) {
        boutonHaut.classList.add('visible');
    } else {

        boutonHaut.classList.remove('visible');
    }
}
});
// clic sur le bouton et remonte en douceur
if (boutonHaut) {
    boutonHaut.addEventListener('click',function(){
        window.scrollTo({
            top:0;
            behavior:'smoth'
        });
    });
}
// pour l'annee pieds page
// affiche tjrs l'annee actuel automatiquement
const spansAnnee = document.querySelectorAll('footer span');
spansAnnee.forEach(function(span) {
    span.textContent = new Date().getFullYear();
});