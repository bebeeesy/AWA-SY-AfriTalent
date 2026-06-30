// ============================================================
// 1. THEME CLAIR / SOMBRE
// ============================================================

const toggleTheme = document.querySelector('.toggle-theme');

function appliquerTheme(theme) {
    if (theme === 'clair') {
        document.body.classList.add('mode-clair');
        document.body.classList.remove('mode-sombre');
        if (toggleTheme) {
            toggleTheme.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
            toggleTheme.setAttribute('aria-label', 'Passer en mode sombre');
        }
    } else {
        document.body.classList.remove('mode-clair');
        document.body.classList.add('mode-sombre');
        if (toggleTheme) {
            toggleTheme.innerHTML = '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
            toggleTheme.setAttribute('aria-label', 'Passer en mode clair');
        }
    }
}

const themeSauvegarde = localStorage.getItem('theme') || 'sombre';
appliquerTheme(themeSauvegarde);

if (toggleTheme) {
    toggleTheme.addEventListener('click', function () {
        const themeActuel = localStorage.getItem('theme') || 'sombre';
        const nouveauTheme = themeActuel === 'sombre' ? 'clair' : 'sombre';
        appliquerTheme(nouveauTheme);
        localStorage.setItem('theme', nouveauTheme);
    });
}

// ============================================================
// 2. NAVBAR QUI CHANGE AU SCROLL
// ============================================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// ============================================================
// 3. BOUTON RETOUR EN HAUT
// ============================================================

const boutonHaut = document.querySelector('.bouton-retour-haut');

window.addEventListener('scroll', function () {
    if (boutonHaut) {
        if (window.scrollY > 400) {
            boutonHaut.classList.add('visible');
        } else {
            boutonHaut.classList.remove('visible');
        }
    }
});

if (boutonHaut) {
    boutonHaut.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 4. ANNEE DYNAMIQUE DANS LE FOOTER
// ============================================================

const spanAnnee = document.getElementById('annee');
if (spanAnnee) {
    spanAnnee.textContent = new Date().getFullYear();
}

// ============================================================
// 5. COMPTEURS ANIMES AU SCROLL
// ============================================================

const touslesCompteurs = document.querySelectorAll('[data-target]');

function animerCompteur(element) {
    const valeurCible = parseInt(element.getAttribute('data-target'));
    const duree = 2000;
    const debut = performance.now();

    function mettreAJour(tempsActuel) {
        const progression = Math.min((tempsActuel - debut) / duree, 1);
        const valeur = Math.floor(progression * valeurCible);
        element.textContent = '+' + valeur.toLocaleString('fr-FR');

        if (progression < 1) {
            requestAnimationFrame(mettreAJour);
        } else {
            element.textContent = '+' + valeurCible.toLocaleString('fr-FR');
        }
    }

    requestAnimationFrame(mettreAJour);
}

const observateurCompteurs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animerCompteur(entry.target);
            observateurCompteurs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

touslesCompteurs.forEach(function (compteur) {
    observateurCompteurs.observe(compteur);
});

// ============================================================
// 6. ANIMATIONS FADE-IN DES SECTIONS
// ============================================================

const sectionAnimees = document.querySelectorAll('section, article');

sectionAnimees.forEach(function (section) {
    section.classList.add('fade-init');
});

const observateurSections = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
            observateurSections.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sectionAnimees.forEach(function (section) {
    observateurSections.observe(section);
});

// ============================================================
// 7. FILTRAGE DYNAMIQUE DES FREELANCES
// ============================================================

const boutonsFiltres = document.querySelectorAll('[data-categorie]');

if (boutonsFiltres.length > 0) {
    const cartesFreelances = document.querySelectorAll('.col-12[data-categorie]');

    function filtrerParCategorie(categorie) {
        cartesFreelances.forEach(function (carte) {
            const cat = carte.getAttribute('data-categorie');
            if (categorie === 'tous' || cat === categorie) {
                carte.style.display = '';
            } else {
                carte.style.display = 'none';
            }
        });
    }

    function activerBouton(boutonClique) {
        boutonsFiltres.forEach(function (btn) {
            btn.classList.remove('btn-info', 'text-dark');
            btn.classList.add('btn-outline-secondary');
        });
        boutonClique.classList.remove('btn-outline-secondary');
        boutonClique.classList.add('btn-info', 'text-dark');
    }

    boutonsFiltres.forEach(function (bouton) {
        bouton.addEventListener('click', function () {
            filtrerParCategorie(bouton.getAttribute('data-categorie'));
            activerBouton(bouton);
        });
    });
}

// ============================================================
// 8. VALIDATION DU FORMULAIRE DE CONTACT
// ============================================================

const formulaireContact = document.querySelector('form[aria-label="formulaire de contact AfriTalent"]');

if (formulaireContact) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function afficherErreur(champ, message) {
        champ.classList.add('is-invalid');
        const div = champ.nextElementSibling;
        if (div) div.textContent = message;
    }

    function retirerErreur(champ) {
        champ.classList.remove('is-invalid');
    }

    function validerFormulaire() {
        let estValide = true;

        const alerte = formulaireContact.querySelector('.alert');
        if (alerte) alerte.classList.add('d-none');

        const nom = formulaireContact.querySelector('[name="nom"]');
        if (!nom || nom.value.trim() === '') {
            afficherErreur(nom, 'Ce champ est obligatoire.');
            estValide = false;
        } else { retirerErreur(nom); }

        const prenom = formulaireContact.querySelector('[name="prenom"]');
        if (!prenom || prenom.value.trim() === '') {
            afficherErreur(prenom, 'Ce champ est obligatoire.');
            estValide = false;
        } else { retirerErreur(prenom); }

        const email = formulaireContact.querySelector('[name="email"]');
        if (!email || email.value.trim() === '') {
            afficherErreur(email, 'Ce champ est obligatoire.');
            estValide = false;
        } else if (!regexEmail.test(email.value.trim())) {
            afficherErreur(email, 'Entrez une adresse email valide.');
            estValide = false;
        } else { retirerErreur(email); }

        const sujet = formulaireContact.querySelector('[name="sujet"]');
        if (!sujet || sujet.value === '') {
            afficherErreur(sujet, 'Veuillez choisir un sujet.');
            estValide = false;
        } else { retirerErreur(sujet); }

        const message = formulaireContact.querySelector('[name="message"]');
        if (!message || message.value.trim() === '') {
            afficherErreur(message, 'Ce champ est obligatoire.');
            estValide = false;
        } else if (message.value.trim().length < 20) {
            afficherErreur(message, 'Le message doit faire au moins 20 caractères.');
            estValide = false;
        } else { retirerErreur(message); }

        return estValide;
    }

    formulaireContact.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validerFormulaire()) {
            const alerte = formulaireContact.querySelector('.alert');
            if (alerte) alerte.classList.remove('d-none');
            formulaireContact.reset();
            // Remet les champs en état neutre
            formulaireContact.querySelectorAll('.is-valid').forEach(function (c) {
                c.classList.remove('is-valid');
            });
        }
    });
}