// on recupere le bouton toggle dans le html
const toggleTheme = document.querySelector('.toggle-theme');
// on recupere le theme sauvegarde dans localstorage
const themeSauvegarde = localStorage.getItem('theme');
// fonction qui applique le theme selon le choix
function appliquerTheme (theme) {
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
            localStorage.setItem('theme','clair');
            
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

const boutonHaut = document.querySelector('.bouton-retour-haut');
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
            top: 0,
            behavior:'smooth'
        });
    });
}
// pour l'annee pieds page
// affiche tjrs l'annee actuel automatiquement
const spansAnnee = document.querySelectorAll('footer span');
spansAnnee.forEach(function(span) {
    span.textContent = new Date().getFullYear();
});





// on recupere tous les elements qui ont un data target
// cest l'attribu qu'on a mis sur les chiffres dans le html
const touslesCompteurs = document.querySelectorAll('[data-target]');
// fonction qui anime un compteur de 0 jusqu'a sa valeur cible
function animerCompteur(element) {
    // on recupeere la valeur cible depuis l'attribut data-target
    const valeurCible = parseInt(element.getAttribute('data-target'));
    // duree totale de l'animation en mili seconde
    const duree = 2000;
    // temps de depart 
    const debut = performance.now();
    // valeur depart 
    let valeurActuelle = 0;
    // fonction qui s'execute a chaque frame de l'animation
    function mettreAJour(tempsActuel) {

  
    // on calcule le temps ecoule depuis le debut 
    const tempsEcoule = tempsActuel - debut;
    // on calcule la progression entre 0 et 1
    const progression = Math.min(tempsEcoule / duree, 1);
    // on calcule la valeur actuelle
    valeurActuelle = Math.floor(progression * valeurCible)
    //  on affiche la valeur dans l 'element 
    element.textContent = '+' + valeurActuelle.toLocaleString('fr-FR');
    // si l'animation n'est pas terminer on continue 
    if (progression < 1) {
        requestAnimationFrame(mettreAJour);
        
    } else {
        // animation termine -on affiche la valeur finale
        element.textContent = '+' + valeurCible.toLocaleString('fr-FR');
    }
}
// on lance l'animation 
requestAnimationFrame(mettreAJour);
  }
//   on cree un intersectionobserver pour detecter quand 
// les compteurs entrent dans le zone d'affichage
const observateurCompteurs = new    IntersectionObserver(function(entries)
{
    entries.forEach(function(entry){
        // si l'elemet est viisible dans le zone d'affivchage  
        if (entry.isIntersecting) {
            // on lance l'animateur du compteur 
            animerCompteur(entry.target);
            // on arretd'observer cet element
            // pour que l'animation ne se relance pas 
            observateurCompteurs.unobserve(entry.target);
            
        }
    });
},{
    // l'animation se lance quand 20 % de l élement est visible 
    threshold:0.2 
});
// on observe tous les compteurs 
touslesCompteurs.forEach(function(compteur){
    observateurCompteurs.observe(compteur);

});
// animation fade-in au scroll
// les sections apparaissent en fondu quand elles entrent
// dans le zone d'affichage - on utilise aussi intersectionobserver
// tester sur index.html et about.html
// on recupere toutes les sections qui doivent apparaitre en fondu
const sectionAnimees = document.querySelectorAll('section');
// on ajoute la classe les rend invisible au depart 
sectionAnimees.forEach(function(section){
    section.classList.add('fade-init');
});
// on cree un intersectionobservateur pour detecter quand 
// les sections entrent dans le zone d'affichage
const observateurSections = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
    // si la section entre dans l zone d'affichage 
    if (entry.isIntersecting) {
        // on ajoute la classe qui declanche l'animation
        entry.target.classList.add('fade-visible');
        // on arrete d'observer cette section 
        observateurSections.unobserve(entry.target);
        
    }
    });
}, {
// l'animation se lance quand 10% de la section est visible
threshold:0.1
});
// on observe toutes les sections 
sectionAnimees.forEach(function(section){
    observateurSections.observe(section);
});