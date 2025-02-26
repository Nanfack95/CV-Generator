const photo = document.getElementById('photo');
const nom = document.getElementById('nom');
const titre = document.getElementById('titre');
const age = document.getElementById('age');
const sexe = document.getElementById('sexe');
const mail = document.getElementById('email');
const tel = document.getElementById('tel');
const adresse = document.getElementById('adresse');
const description = document.getElementById('description');
// -------------------------------------------------------------------------------------------------------------------------------------------------------
// const entreprise = document.getElementById('entreprise');
// const poste = document.getElementById('poste');
// const moisDebut = document.getElementById('moisDebut');
// const anneeDebut = document.getElementById('anneeDebut');
// const moisFin = document.getElementById('moisFin');
// const anneeFin = document.getElementById('anneeFin');
// const descriptionExp = document.getElementById('descriptionExp');
const experienceForm = document.getElementById('experience');
// const exptext = document.getElementById('exptext');
// -------------------------------------------------------------------------------------------------------------------------------------------------------  

// Écoute les événements de changement de fichier  

photo.addEventListener('change', function(event) {
    const container = document.getElementById('profil'); // Zone où afficher l'image en <img>
    const photoContainer = document.getElementById('photoContainer'); // Zone de fond
    const file = event.target.files[0]; // Récupérer le fichier

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const dataURL = reader.result; // Image encodée en base64

            // Afficher l'image dans le conteneur (zone profil)
            container.innerHTML = `
                <div class="w-full flex justify-center items-center mt-4">
                    <img src="${dataURL}" alt="photo de profil" class="w-40 h-40 rounded-full">
                </div>    
            `;

            // Afficher aussi l'image en background de la div photoContainer
            photoContainer.style.backgroundImage = `url('${dataURL}')`;
            photoContainer.style.backgroundSize = "cover";
            photoContainer.style.backgroundPosition = "center";
            
            // Cacher l'icône de la caméra
            document.getElementById('cameraIcon').style.display = "none";
        };

        reader.readAsDataURL(file); // Lire le fichier et exécuter onload()
    }
});

function updateTextElement(inputElement, tagName, className, nodeName) {
    const container = document.getElementById(nodeName); // Recherche le conteneur
    let element = container.querySelector(tagName); // Recherche l'élément existant (h1 ou h2)
    if (!element) {
        element = document.createElement(tagName); // Si l'élément n'existe pas, on le crée
        element.className = className; // Applique la classe
        container.appendChild(element);
    }
    element.textContent = inputElement.value; // Mets à jour le texte avec la valeur du champ
}

nom.addEventListener('input', function() {
    updateTextElement(nom, 'h1', 'text-3xl text-blue-950 font-bold capitalize','nameContainer');
    const iname = document.getElementById('iname');
    if(nom.value.trim() !== ''){
        iname.innerHTML = `
            <i class="fa-solid fa-user text-blue-950"></i>
            <span class="text-[13px] break-all">${nom.value}</span> 
        `;
    }else{
        iname.innerHTML = '';
    }
});

titre.addEventListener('input', function() {
    updateTextElement(titre, 'h2', 'text-lg text-blue-950 font-medium uppercase break-all', 'nameContainer');
});

age.addEventListener('input', function(){
    const iage = document.getElementById('iage');
    if(age.value.trim()){
        iage.innerHTML = `
            <i class="fa-solid fa-calendar-check text-blue-950"></i>
            <span class="text-[13px] break-all">${age.value}</span>
        `;
    }else{
        iage.innerHTML = '';
    }
});

sexe.addEventListener('input', function(){
    const isexe = document.getElementById('isexe');
    if(sexe.value.trim() !== ''){
        isexe.innerHTML = `
            <i class="fa-solid fa-venus-mars text-blue-950"></i>
            <span class="text-[13px] break-all">${sexe.value}</span>
        `;
    }else{
        isexe.innerHTML = '';
    }
});

mail.addEventListener('input', function(){
    const imail = document.getElementById('imail');
    if(mail.value.trim() !== ''){
        imail.innerHTML = `
        <i class="fa-solid fa-envelope text-blue-950"></i>
        <span class="text-[13px] break-all">${mail.value}</span>
    `;
    }else{
        imail.innerHTML = '';
    }
});

tel.addEventListener('input', function(){
    const itel = document.getElementById('itel');
    if(tel.value.trim() !== ''){
        itel.innerHTML = `
            <i class="fa-solid fa-phone-flip text-blue-950"></i>
            <span class="text-[13px] break-all">${tel.value}</span>
        `;
    }else{
        itel.innerHTML = '';
    }
    
});

adresse.addEventListener('input', function(){
    const iadresse = document.getElementById('iadresse');
    if(adresse.value.trim() !== ''){
        iadresse.innerHTML = `
            <i class="fa-solid fa-house text-blue-950"></i>
            <span class="text-[13px] break-all">${adresse.value}</span>
        `;
    }else{
        iadresse.innerHTML = '';
    }
});

description.addEventListener('input', function(){
    const profilText = document.getElementById('profilText');
    const protexte = document.getElementById('protext');
    if(description.value.trim() !== ''){
        protexte.className = 'mb-2 bg-white p-2 text-[18px] text-blue-950 font-medium  uppercase';
        protexte.innerHTML = 'profil';
        profilText.textContent = `${description.value}`;
    }else{
        protexte.innerHTML = '';
        protexte.className = '';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const mois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    const anneeActuelle = new Date().getFullYear();
    const anneeMin = anneeActuelle - 50; // On affiche les 50 dernières années
    
    function remplirSelect(selectId, options) {
        const select = document.getElementById(selectId);
        options.forEach((val, index) => {
            const option = document.createElement("option");
            option.textContent = val;
            select.appendChild(option);
        });
    }

    // Ajouter les mois
    remplirSelect("moisDebut", mois);
    remplirSelect("moisFin", mois);

    // Ajouter les années
    let annees = [];
    for (let i = anneeActuelle; i >= anneeMin; i--) {
        annees.push(i);
    }
    remplirSelect("anneeDebut", annees);
    remplirSelect("anneeFin", annees);
});

document.getElementById('toggleExperience').addEventListener('click', function () {
    const form = document.getElementById('experienceForm');
    const icon = document.getElementById('icon');

    if (form.style.maxHeight && form.style.maxHeight !== "0px") {
        form.style.maxHeight = "0px"; // Cache avec une transition
        icon.style.transform = "rotate(0deg)"; // Remet l'icône vers le bas
    } else {
        form.style.maxHeight = form.scrollHeight + "px"; // Ajuste la hauteur réelle
        icon.style.transform = "rotate(180deg)"; // Fait tourner l'icône
    }
});
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
let expIndex = 1; // Compteur global pour les expériences

// Fonction pour afficher l'expérience sur le CV
function addExperienceToCV(form, index) {
    form.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', function () {
            const entreprise = document.getElementById(`entreprise${index === 0 ? '' : `-${index}`}`).value;
            const poste = document.getElementById(`poste${index === 0 ? '' : `-${index}`}`).value;
            const moisDebut = document.getElementById(`moisDebut${index === 0 ? '' : `-${index}`}`).value;
            const anneeDebut = document.getElementById(`anneeDebut${index === 0 ? '' : `-${index}`}`).value;
            const moisFin = document.getElementById(`moisFin${index === 0 ? '' : `-${index}`}`).value;
            const anneeFin = document.getElementById(`anneeFin${index === 0 ? '' : `-${index}`}`).value;
            const description = document.getElementById(`descriptionExp${index === 0 ? '' : `-${index}`}`).value;
            const inputs = experienceForm.querySelectorAll('input, select, textarea');


            const isFilled = Array.from(inputs).some(input => input.value.trim() !== '');

            // Vérifier si au moins un champ est rempli
            if (isFilled) {
                document.getElementById('exptext').innerHTML = 'Expériences professionnelles';
                document.getElementById('exptext').className = 'mb-2  bg-white  text-[18px] p-2 text-blue-950 font-medium uppercase';
            }

            // Création ou mise à jour de l'affichage
            let expDiv = document.getElementById(`experienceCV-${index}`);
            if (!expDiv) {
                expDiv = document.createElement('div');
                expDiv.id = `experienceCV-${index}`;
                document.getElementById('expDiv').appendChild(expDiv);
            }

            // Mise à jour du contenu
            expDiv.innerHTML = `
                <h3 class="text-[14px] font-medium" id="posteV">${poste}</h3>
                <div class="flex items-center text-gray-500 text-[12px] space-x-1">
                    <h3 class="capitalize" id="entrepriseV">${entreprise} |</h3>
                    <p class="" id="dureV">${moisDebut} ${anneeDebut} - ${moisFin} ${anneeFin}</p>
                </div>
                <div class="w-full break-words text-[10px]" id="experienceText">${description}</div>
            `;

            // Cacher la section si tout est vide
            if (!isFilled) {
                // expDiv.remove();
                // if (document.getElementById('experienceCV').children.length === 0) {
                    document.getElementById('exptext').innerHTML = '';
                    document.getElementById('exptext').className = '';
                // }
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function () {
    addExperienceToCV(document.getElementById('form'), 0);
});

// Fonction pour supprimer une expérience du CV
function removeExperienceFromCV(index) {
    const experienceSection = document.getElementById('experienceCV'); // Récupérer la section contenant toutes les expériences

    const expDiv = document.getElementById(`experienceCV-${index}`);

    if (expDiv) {
        expDiv.remove(); // Supprime l'expérience spécifique
    }

    // Vérifier s'il reste des expériences, sinon masquer la section
    if (experienceSection.children.length === 0) {
        const exptext = document.getElementById('exptext');
        if (exptext) {
            exptext.innerHTML = '';
            exptext.className = '';
        }
    }
}
// fonction pour ajouter une exprerience
document.getElementById('addExp').addEventListener('click', function () {
    const experienceContainer = document.getElementById('experience');
    const form = document.getElementById('form');

    // Cloner le formulaire
    const newExp = form.cloneNode(true);
    newExp.id = `form-${expIndex}`;

    // Modifier les ID des champs pour les rendre uniques
    newExp.querySelectorAll('input, select, textarea').forEach(element => {
        const oldId = element.id;
        element.id = `${oldId}-${expIndex}`;
        element.value = ''; // Vider les champs
    });

    // Modifier l'ID du bouton de suppression
    const btn = newExp.querySelector('#delExp');
    btn.id = `delExp-${expIndex}`;
    btn.style.background = 'red';

    // Ajouter le formulaire au DOM
    experienceContainer.appendChild(newExp);

    setTimeout(() => {
        newExp.style.maxHeight = newExp.scrollHeight + "px";
    }, 10);

    // Afficher l'expérience sur le CV lors de la saisie
    addExperienceToCV(newExp, expIndex);

    // Suppression de l'expérience
    btn.addEventListener('click', function () {
        newExp.style.maxHeight = "0px";
        setTimeout(() => {
            newExp.remove();
            removeExperienceFromCV(expIndex); // Supprimer l'expérience du CV
        }, 100);
    });

    expIndex++; // Incrémenter l'index
});