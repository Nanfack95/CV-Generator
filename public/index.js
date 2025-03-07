const photoInput = document.getElementById('photo');
const nom = document.getElementById('nom');
const titre = document.getElementById('titre');
const age = document.getElementById('age');
const ageError = document.createElement('div');
const sexe = document.getElementById('sexe');
const mail = document.getElementById('email');
const tel = document.getElementById('tel');
const adresse = document.getElementById('adresse');
const description = document.getElementById('description');
const experienceForm = document.getElementById('experience');
// -------------------------------------------------------------------------------------------------------------------------------------------------------
const mois = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const anneeActuelle = new Date().getFullYear();
const anneeMin = anneeActuelle - 50; // On affiche les 50 dernières années

// Ajouter les années
let annees = [];
for (let i = anneeActuelle; i >= anneeMin; i--) {
    annees.push(i);
}

function remplirSelect(select, options) {
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

function remplirTousLesSelects() {
    document.querySelectorAll('select[placeholder="Mois de début"]').forEach(select => remplirSelect(select, mois));
    document.querySelectorAll('select[placeholder="Mois de fin"]').forEach(select => remplirSelect(select, mois));
    document.querySelectorAll('select[placeholder="Année de début"]').forEach(select => remplirSelect(select, annees));
    document.querySelectorAll('select[placeholder="Année de fin"]').forEach(select => remplirSelect(select, annees));
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------
photoInput.addEventListener('change', function(event) {
    const container = document.getElementById('profil'); // Zone où afficher l'image en <img>
    const photoContainer = document.getElementById('photoContainer'); // Zone de fond
    const file = event.target.files[0]; // Récupérer le fichier

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const dataURL = reader.result; // Image encodée en base64

            // Afficher l'image dans le conteneur (zone profil)
            container.innerHTML = `
                <div class="w-full flex justify-center items-center mt-3">
                    <img src="${dataURL}" alt="photo de profil" class="w-35 h-35 rounded-full">
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
    updateTextElement(nom, 'h1', 'text-3xl text-blue-950 font-bold uppercase','nameContainer');
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

// verifier d'abord si l'age est un nombre et est compris entre 18 et 65
age.addEventListener('input', function() {
    const ageValue = parseInt(age.value, 10);
    const iage = document.getElementById('iage');
    const ageError = document.getElementById('ageError');

    if (!isNaN(ageValue) && ageValue >= 18 && ageValue <= 65) {
        age.style.borderColor = ''; // Reset border color
        iage.innerHTML = `
            <i class="fa-solid fa-calendar-check text-blue-950"></i>
            <span class="text-[13px] break-all">${ageValue} ans</span>
        `;
        ageError.textContent = ''; // Clear error message
    } else {
        age.style.borderColor = 'red'; // Set border color to red
        iage.innerHTML = '';
        ageError.textContent = 'Veuillez entrer un âge valide entre 18 et 65 ans.'; // Set error message
        ageError.style.color = 'red'; // Set error message color to red
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

mail.addEventListener('input', function() {
    const imail = document.getElementById('imail');
    const emailPattern = /@(gmail\.com|yahoo\.com|yahoo\.fr|outlook\.com|hotmail\.com)$/;
    if (mail.value.trim() !== '' && emailPattern.test(mail.value)) {
        imail.innerHTML = `
            <i class="fa-solid fa-envelope text-blue-950"></i>
            <span class="text-[13px] break-all">${mail.value}</span>
        `;
        mail.style.borderColor = ''; // Reset border color
        emailError.textContent = ''; // Clear error message
    } else {
        imail.innerHTML = '';
        mail.style.borderColor = 'red'; // Set border color to red
        emailError.textContent = 'Veuillez entrer une adresse email valide.'; // Set error message
        emailError.style.color = 'red'; // Set error message color to red
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
    remplirTousLesSelects();
});

function cacher(contentId, iconId, forceShow = true) {
    const form = document.getElementById(contentId);
    const icon = document.getElementById(iconId);

    if (forceShow || (form.style.maxHeight && form.style.maxHeight !== "0px")) {
        form.style.maxHeight = form.scrollHeight + "px"; // Ajuste la hauteur réelle
        icon.style.transform = "rotate(180deg)"; // Fait tourner l'icône
    } else {
        form.style.maxHeight = "0px"; // Cache avec une transition
        icon.style.transform = "rotate(0deg)"; // Remet l'icône vers le bas
    }
}
// --------------------------------------------------------------------------------------------------------------------
document.getElementById('toggleExperience').addEventListener('click', function(){
    cacher('experienceForm', 'icon');
});
document.getElementById('toggleCompetence').addEventListener('click', function(){
    cacher('competenceForm', 'iconComp');
});
document.getElementById('toggleInteret').addEventListener('click', function(){
    cacher('interetForm', 'iconInteret');
});
document.getElementById('toggleReference').addEventListener('click', function(){
    cacher('referenceForm', 'iconRef');
});
document.getElementById('toggleLang').addEventListener('click', function(){
    cacher('langueForm', 'iconLang');
});
document.getElementById('toggleFormation').addEventListener('click', function(){
    cacher('formationForm', 'iconFor');
});
// ------------------------------------------------------------------------------------------------------------------
// Ecouteur d'evenement pour ajouter une experience
document.getElementById('addExp').addEventListener('click', function () {
    const experienceContainer = document.getElementById('experience');

    // Création d'un nouveau formulaire d'expérience
    const newExp = document.createElement('div');
    newExp.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newExp.innerHTML = `
        <div class="w-full">
            <input type="text" placeholder="Entreprise" class="w-full p-2 outline-none bg-gray-100 rounded">
        </div>
        <div class="w-full">
            <input type="text" placeholder="Poste occupé"  class="w-full p-2 outline-none bg-gray-100 rounded">
        </div>
        <div class="flex w-full space-x-6">
            <div class="flex space-x-3 w-1/2">
                <div class="w-1/2">
                    <label class="block text-gray-700">Mois debut</label>
                    <select placeholder="Mois de début" class="w-full p-2 outline-none text-gray-500 bg-gray-100 rounded">
                        <option value="">Mois</option>
                    </select>
                </div>
                <div class="w-1/2">
                    <label class="block text-gray-700">Annee debut</label>
                    <select placeholder="Année de début" class=" px-2 text-gray-500 w-full p-2 outline-none bg-gray-100 rounded">
                        <option value="">Année</option>
                    </select>
                </div>
            </div>
            <div class="flex space-x-3 w-1/2">
                <div class="w-1/2">
                    <label class="block text-gray-700">Mois fin</label>
                    <select placeholder="Mois de fin" class=" px-2  w-full p-2 text-gray-500 outline-none bg-gray-100 rounded">
                        <option value="">Mois</option>
                    </select>
                </div>
                <div class="w-1/2">
                    <label class="block text-gray-700">Annee fin</label>
                    <select placeholder="Année de fin" class=" px-2  w-full text-gray-500 p-2 outline-none bg-gray-100 rounded">
                        <option value="">Année</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="w-full">
            <textarea type="text" placeholder="Description des tâches" class="w-full p-2 outline-none bg-gray-100 rounded"></textarea>
        </div>
        <div class="flex justify-end">
            <button id="delExp" type="button" class="bg-red-500  text-white px-4 py-2 rounded cursor-pointer removeExp"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    experienceContainer.appendChild(newExp);

    // Remplir les sélecteurs de mois et d'années pour le nouveau formulaire
    remplirSelect(newExp.querySelector('select[placeholder="Mois de début"]'), mois);
    remplirSelect(newExp.querySelector('select[placeholder="Mois de fin"]'), mois);
    remplirSelect(newExp.querySelector('select[placeholder="Année de début"]'), annees);
    remplirSelect(newExp.querySelector('select[placeholder="Année de fin"]'), annees);

    // Suppression d'une expérience
    newExp.querySelector('.removeExp').addEventListener('click', function () {
        newExp.remove();
        updateExperiencesOnCV();
    });

    // Forcer l'affichage du formulaire d'expérience
    cacher('experienceForm', 'icon', true);
});
// Fonction pour mettre à jour l'affichage des expériences sur le CV
function updateExperiencesOnCV() {
    const experienceTitle = document.getElementById('experienceTitle');
    const experienceCV = document.getElementById('experienceCV');

    // Effacer l'affichage existant
    experienceCV.innerHTML = '';

    // Récupérer toutes les expériences saisies
    const experiences = document.querySelectorAll("#experience > div");
    let hasExperiences = false;

    experiences.forEach((exp, index) => {
        const entreprise = exp.querySelector("input[placeholder='Entreprise']")?.value.trim();
        const poste = exp.querySelector("input[placeholder='Poste occupé']")?.value.trim();
        const moisDebut = exp.querySelector("select[placeholder='Mois de début']")?.value.trim();
        const anneeDebut = exp.querySelector("select[placeholder='Année de début']")?.value.trim();
        const moisFin = exp.querySelector("select[placeholder='Mois de fin']")?.value.trim();
        const anneeFin = exp.querySelector("select[placeholder='Année de fin']")?.value.trim();
        const description = exp.querySelector("textarea[placeholder='Description des tâches']")?.value.trim();

        if (entreprise || poste || moisDebut || anneeDebut || moisFin || anneeFin || description) {
            hasExperiences = true;
            const expDiv = document.createElement('div');
            expDiv.className = "p-2 border border-gray-300 mb-2";
            expDiv.innerHTML = `
                <h3 class="text-[14px] font-medium" id="posteV">${poste}</h3>
                <div class="flex items-center text-gray-500 text-[12px] space-x-1">
                    <h3 class="capitalize text-[12px]" id="entrepriseV">${entreprise} |</h3>
                    <p class="text-[12px]" id="dureV">${moisDebut} ${anneeDebut} - ${moisFin} ${anneeFin}</p>
                </div>
                <div class="w-full break-words text-[10px]" id="experienceText">${description}</div>
            `;      
            experienceCV.appendChild(expDiv);
        }
    });

    // Afficher ou masquer le titre "Expériences professionnelles"
    if (hasExperiences) {
        experienceTitle.innerHTML = 'Expériences professionnelles';
        experienceTitle.className = 'my-4  bg-white  text-[18px] p-2 text-blue-950 font-medium uppercase';
    } else {
        experienceTitle.innerHTML = '';
        experienceTitle.className = '';
    }
}
// Écouteur d'événement pour mettre à jour le CV en direct
document.getElementById('experience').addEventListener('input', updateExperiencesOnCV);
// ----------------------------------------------------------------------------------------------------------------------
// Fonction pour afficher l'expérience sur le CV
// function addExperienceToCV(form, index) {
//     const experienceSection = document.getElementById('experienceCV'); // Récupérer la section contenant toutes les expériences
//     const expTitle = document.getElementById('experienceTitle');

//     if (!form) {
//         console.error("Aucun formulaire trouvé !");
//         return;
//     }

//     const inputs = form.querySelectorAll('input, select, textarea');
//     const isFilled = Array.from(inputs).some(input => input.value.trim() !== '');

//     // Afficher le titre "Expériences professionnelles" si ce n'est pas déjà fait
//     if (isFilled) {
//         expTitle.innerHTML = 'Expériences professionnelles';
//         expTitle.className = 'my-4  bg-white  text-[18px] p-2 text-blue-950 font-medium uppercase';
//     }

//     // Création ou mise à jour de l'affichage
//     let expDiv = document.getElementById(`experienceCV-${index}`);
//     if (!expDiv) {
//         expDiv = document.createElement('div');
//         expDiv.id = `experienceCV-${index}`;
//         experienceSection.appendChild(expDiv);
//     }

//     // Récupérer et afficher les valeurs des champs
//     const entreprise = form.querySelector("input[placeholder='Entreprise']")?.value || "";
//     const poste = form.querySelector("input[placeholder='Poste occupé']")?.value || "";
//     const moisDebut = form.querySelector("select[placeholder='Mois de début']")?.value || "";
//     const anneeDebut = form.querySelector("select[placeholder='Année de début']")?.value || "";
//     const moisFin = form.querySelector("select[placeholder='Mois de fin']")?.value || "";
//     const anneeFin = form.querySelector("select[placeholder='Année de fin']")?.value || "";
//     const description = form.querySelector("textarea[placeholder='Description des tâches']")?.value || "";

//     expDiv.innerHTML = `
//         <h3 class="text-[14px] font-medium" id="posteV">${poste}</h3>
//         <div class="flex items-center text-gray-500 text-[12px] space-x-1">
//             <h3 class="capitalize" id="entrepriseV">${entreprise} |</h3>
//             <p class="" id="dureV">${moisDebut} ${anneeDebut} - ${moisFin} ${anneeFin}</p>
//         </div>
//         <div class="w-full break-words text-[10px]" id="experienceText">${description}</div>
//     `;

//     if (!isFilled) {
//         expDiv.innerHTML = '';
//         expTitle.innerHTML = '';
//         expTitle.className = '';
//     }
// }
// Ecouteur d'evement pour mettre jour l'experience
// window.addEventListener('DOMContentLoaded', function () {
//     // Sélectionner le premier formulaire d'expérience
//     const firstForm = document.getElementById('experience');
//     if (firstForm) {
//         const formId = "experience"; // ID unique du premier formulaire

//         // Ajouter un écouteur sur chaque champ du premier formulaire
//         firstForm.querySelectorAll('input, select, textarea').forEach(input => {
//             input.addEventListener('input', function () {
//                 addExperienceToCV(firstForm, formId);
//             });
//         });

//         // Ajouter la première expérience au CV au cas où elle est déjà remplie
//         addExperienceToCV(firstForm, formId);
//     }
// });
// Fonction pour supprimer une expérience du CV
// function removeExperienceFromCV(index) {
//     // Supprimer du formulaire
//     const formExp = document.getElementById(index); 
//     if (formExp) formExp.remove();

//     // Supprimer du CV
//     const experienceCV = document.getElementById(`experienceCV-${index}`);
//     if (experienceCV) experienceCV.remove();

//     // Verifier si d'autres expériences existent encore
//     const experienceSection = document.getElementById('experienceCV');
//     if (experienceSection.children.length === 0) {
//         const expTitle = document.getElementById('experienceTitle');
//         expTitle.innerHTML = ''; // Supprimer le titre si
//         expTitle.className = '';    
//     }
// }
// fonction pour ajouter une exprerience
// document.getElementById('addExp').addEventListener('click', function () {
//     const experienceContainer = document.getElementById('experience');
//     const form = document.getElementById('form');

//     if (!form) {
//         console.error("Aucun modèle de formulaire trouvé !");
//         return;
//     }

//     // Création d'un ID unique basé sur le temps
//     const uniqueId = "form-" + Date.now();

//     // Cloner le formulaire
//     const newExp = form.cloneNode(true);
//     newExp.id = uniqueId;

//     // Reinisialiser les champs du formulaire cloné
//     newExp.querySelectorAll('input, select, textarea').forEach(input => input.value = '');

//     // Modifier l'ID du bouton de suppression pour chaque formulaire
//     const delButton = newExp.querySelector('#delExp');
//     delButton.style.background = 'red';
//     if (delButton) {
//         delButton.addEventListener('click', function () {
//             removeExperienceFromCV(uniqueId);
//         });
//     }

//     // Ajouter le formulaire cloné au DOM
//     experienceContainer.appendChild(newExp);

//     // Ajouter l'expérience au CV
//     newExp.querySelectorAll('input, select, textarea').forEach(input => {
//         input.addEventListener('input', function () {
//             addExperienceToCV(newExp, uniqueId);
//         });
//     });
// });
// ----------------------------------------------------------------------------------------------------------------------
// Ecouteur d'evenement pour ajouter une formation
document.getElementById('addForm').addEventListener('click', function () {
    const formationsContainer = document.getElementById('formations');

    // Création d'un nouveau formulaire de formation
    const newForm = document.createElement('div');
    newForm.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newForm.innerHTML = `
        <input type="text" placeholder="Diplôme" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Établissement" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Année d'obtention" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <div class="flex justify-end">
            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeForm"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    formationsContainer.appendChild(newForm);

    // Suppression d'une formation
    newForm.querySelector('.removeForm').addEventListener('click', function () {
        newForm.remove();
        updateFormationsOnCV();
    });
    cacher('formationForm', 'iconFor', true);
});
// Fonction pour mettre à jour l'affichage des formations sur le CV
function updateFormationsOnCV() {
    const formationTitle = document.getElementById('formationTitle');
    const formationCV = document.getElementById('formationCV');

    // Effacer l'affichage existant 
    formationCV.innerHTML = '';

    // Récupérer toutes les formations saisies
    const formations = document.querySelectorAll("#formations > div");
    let hasFormations = false;

    formations.forEach((form, index) => {
        const diplome = form.querySelector("input[placeholder='Diplôme']")?.value.trim();
        const etablissement = form.querySelector("input[placeholder='Établissement']")?.value.trim();
        const anneeObtention = form.querySelector("input[placeholder=\"Année d'obtention\"]")?.value.trim();

        if (diplome || etablissement || anneeObtention) {
            hasFormations = true;
            const formDiv = document.createElement('div');
            formDiv.className = "p-2 border border-gray-300 mb-2";
            formDiv.innerHTML = `
                <p><strong>${diplome}</strong> - ${etablissement}</p>
                <p>Année d'obtention: ${anneeObtention}</p>
            `;
            formationCV.appendChild(formDiv);
        }
    });

    // Afficher ou masquer le titre "Formations"
    if (hasFormations) {
        formationTitle.innerHTML = 'Formations';
        formationTitle.className = 'my-4  bg-white  text-[18px] p-2 text-blue-950 font-medium uppercase';
    } else {
        formationTitle.innerHTML = '';
        formationTitle.className = '';
    }
}
// Écouteur d'événement pour mettre à jour le CV en direct
document.getElementById('formations').addEventListener('input', updateFormationsOnCV);  
// ------------------------------------------------------------------------------------------------------------------------
// Ecouteur d'evenement pour ajouter une competence
document.getElementById('addComp').addEventListener('click', function () {
    const competencesContainer = document.getElementById('competences');

    // Création d'un nouveau formulaire de compétence
    const newComp = document.createElement('div');
    newComp.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newComp.innerHTML = `
        <input type="text" placeholder="Compétence" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Niveau de maîtrise" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <div class="flex justify-end">
            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeComp"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    competencesContainer.appendChild(newComp);

    // Suppression d'une compétence
    newComp.querySelector('.removeComp').addEventListener('click', function () {
        newComp.remove();
        updateCompetencesOnCV();
    });
    cacher('competenceForm', 'iconComp', true);
});
// Fonction pour mettre à jour l'affichage des compétences sur le CV
function updateCompetencesOnCV() {
    const competenceTitle = document.getElementById('competenceTitle');
    const competenceCV = document.getElementById('competenceCV');
    
    // Effacer l'affichage existant
    competenceCV.innerHTML = '';

    // Récupérer toutes les compétences saisies
    const competences = document.querySelectorAll("#competences > div");
    let hasCompetences = false;

    competences.forEach((comp, index) => {
        const skill = comp.querySelector("input[placeholder='Compétence']")?.value.trim();
        const level = comp.querySelector("input[placeholder='Niveau de maîtrise']")?.value.trim();

        if (skill || level) {
            hasCompetences = true;
            const listItem = document.createElement('li');
            listItem.className = "text-gray-800 flex items-center justify-start capitalize font-medium";
            listItem.innerHTML = `<i class="fa-solid fa-check text-blue-500 mr-2"></i>${skill} : ${level}`;
            competenceCV.appendChild(listItem);
        }
    });

    // Afficher ou masquer le titre "Compétences"
    if (hasCompetences) {
        competenceTitle.innerHTML = 'Compétences';
        competenceTitle.className = 'my-4 border-b border-gray-300 py-2 text-xl text-blue-950 font-medium capitalize';
    } else {
        competenceTitle.innerHTML = '';
        competenceTitle.className = '';
    }
}
// Écouteurs d'événements pour mettre à jour le CV en direct
document.getElementById('competences').addEventListener('input', updateCompetencesOnCV);

// --------------------------------------------------------------------------------------------------------------------------
// Ecouteur d'evement pour ajouter un centre d'interet
document.getElementById('addLoisir').addEventListener('click', function () {
    const interetContainer = document.getElementById('interet');

    // Création d'un nouveau formulaire pour un centre d'intérêt
    const newInteret = document.createElement('div');
    newInteret.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newInteret.innerHTML = `
        <input type="text" placeholder="Loisirs et passions" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <div class="flex justify-end">
            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeInteret"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    interetContainer.appendChild(newInteret);

    // Suppression d'un centre d'intérêt
    newInteret.querySelector('.removeInteret').addEventListener('click', function () {
        newInteret.remove();
        updateInteretsOnCV();
    });
    cacher('interetForm', 'iconInteret', true);
});
// Fonction pour mettre à jour l'affichage des centres d'intérêt sur le CV
function updateInteretsOnCV() {
    const interetTitle = document.getElementById('interetTitle');
    const interetCV = document.getElementById('interetCV');
    
    // Effacer l'affichage existant
    interetCV.innerHTML = '';

    // Récupérer tous les centres d'intérêt saisis
    const interets = document.querySelectorAll("#interet > div");
    let hasInterets = false;

    interets.forEach((int, index) => {
        const loisir = int.querySelector("input[placeholder='Loisirs et passions']")?.value.trim();

        if (loisir) {
            hasInterets = true;
            const listItem = document.createElement('li');
            listItem.className = "text-gray-800 flex items-center capitalize";
            listItem.innerHTML = `<i class="fa-solid fa-check text-blue-500 mr-2"></i> ${loisir}`;
            interetCV.appendChild(listItem);
        }
    });

    // Afficher ou masquer le titre "Centres d'intérêt"
    if (hasInterets) {
        interetTitle.innerHTML = "Centres d'intérêt";
        interetTitle.className = 'mb-4 border-b border-gray-300 py-2 text-xl text-blue-950 font-medium capitalize';
    } else {
        interetTitle.innerHTML = '';
        interetTitle.className = '';
    }
}
// Écouteur d'événement pour mettre à jour le CV en direct
document.getElementById('interet').addEventListener('input', updateInteretsOnCV);
// ---------------------------------------------------------------------------------------------------------------------------
// Ecouteur d'evenement pour ajouter une reference
document.getElementById('addRef').addEventListener('click', function () {
    const referenceContainer = document.getElementById('references');

    // Création d'un nouveau formulaire pour une référence
    const newReference = document.createElement('div');
    newReference.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newReference.innerHTML = `
        <input type="text" placeholder="Nom" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Poste" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Contact" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <div class="flex justify-end">
            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeReference"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    referenceContainer.appendChild(newReference);

    // Suppression d'une référence
    newReference.querySelector('.removeReference').addEventListener('click', function () {
        newReference.remove();
        updateReferencesOnCV();
    });
    cacher('referenceForm', 'iconRef', true);
});
// Fonction pour mettre à jour l'affichage des références sur le CV
function updateReferencesOnCV() {
    const refTitle = document.getElementById('refTitle');
    const referenceCV = document.getElementById('referenceCV');

    // Effacer l'affichage existant
    referenceCV.innerHTML = '';

    // Récupérer toutes les références saisies
    const references = document.querySelectorAll("#references > div");
    let hasReferences = false;

    references.forEach((ref, index) => {
        const nom = ref.querySelector("input[placeholder='Nom']")?.value.trim();
        const poste = ref.querySelector("input[placeholder='Poste']")?.value.trim();
        const contact = ref.querySelector("input[placeholder='Contact']")?.value.trim();

        if (nom || poste || contact) {
            hasReferences = true;
            const card = document.createElement('div');
            card.className = "bg-gray-100 p-4 rounded space-y-2 shadow-md mb-2 capitalize";
            card.innerHTML = `
                <h3 class="text-[14px] font-bold flex space-x-2 items-center "><i class="fa-solid fa-user text-blue-500"></i><span>${nom}</span></h3>
                <p class="text-[14px] text-gray-600 flex space-x-2 items-center "><i class="fa-solid fa-user-doctor text-blue-500"></i><span>${poste}</span></p>
                <p class="text-[14px] text-gray-600 flex space-x-2 items-center "><i class="fa-solid fa-phone text-blue-500"></i><span>${contact}</span></p>
            `;
            referenceCV.appendChild(card);
        }
    });

    // Afficher ou masquer le titre "Références"
    if (hasReferences) {
        refTitle.innerHTML = "Références";
        refTitle.className = 'my-4  bg-white  text-[18px] p-2 text-blue-950 font-medium uppercase';
    } else {
        refTitle.innerHTML = '';
        refTitle.className = '';
    }
}
// Écouteur d'événement pour mettre à jour le CV en direct
document.getElementById('references').addEventListener('input', updateReferencesOnCV);
// ---------------------------------------------------------------------------------------------------------------------------
// Ecouteur d'événement pour ajouter une langue
document.getElementById('addLang').addEventListener('click', function () {
    const langueContainer = document.getElementById('langues');

    // Création d'un nouveau formulaire pour une langue
    const newLangue = document.createElement('div');
    newLangue.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";

    newLangue.innerHTML = `
        <input type="text" placeholder="Langue" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <input type="text" placeholder="Niveau de compétence" class="w-full p-2 outline-none bg-gray-100 rounded" required>
        <div class="flex justify-end">
            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeLangue"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    langueContainer.appendChild(newLangue);

    // Suppression d'une langue
    newLangue.querySelector('.removeLangue').addEventListener('click', function () {
        newLangue.remove();
        updateLanguesOnCV();
    });
    cacher('langueForm', 'iconLang', true);
});
// Fonction pour mettre à jour l'affichage des langues sur le CV
function updateLanguesOnCV() {
    const langTitle = document.getElementById('langTitle');
    const langueCV = document.getElementById('langueCV');

    // Effacer l'affichage existant
    langueCV.innerHTML = '';

    // Récupérer toutes les langues saisies
    const langues = document.querySelectorAll("#langues > div");
    let hasLangues = false;

    langues.forEach((lang) => {
        const langue = lang.querySelector("input[placeholder='Langue']")?.value.trim();
        const niveau = lang.querySelector("input[placeholder='Niveau de compétence']")?.value.trim();

        if (langue || niveau) {
            hasLangues = true;
            const listItem = document.createElement('li');
            listItem.className = "flex items-center space-x-2";
            listItem.innerHTML = `
                <i class="fa-solid fa-check-circle text-green-500"></i>
                <span class="text-lg font-semibold capitalize">${langue} :</span>
                <span class="text-gray-600 capitalize">${niveau}</span>
            `;
            langueCV.appendChild(listItem);
        }
    });

    // Afficher ou masquer le titre "Langues"
    if (hasLangues) {
        langTitle.innerHTML = "Langues";
        langTitle.className = 'my-4 bg-white p-2 text-[18px] text-blue-950 font-medium uppercase';
    } else {
        langTitle.innerHTML = '';
        langTitle.className = '';
    }
}
// Écouteur d'événement pour mettre à jour le CV en direct
document.getElementById('langues').addEventListener('input', updateLanguesOnCV);
// ------------------------------------------------------------------------------------------------------------------------------
const cvName = document.getElementById('cvName');
// Fonction pour sauvegarder les données du CV dans LocalStorage
function saveCVData() {
    const cvData = {
        photo: document.getElementById('profil').querySelector('img')?.src || '',
        nom: nom.value,
        titre: titre.value,
        age: age.value,
        sexe: sexe.value,
        mail: mail.value,
        tel: tel.value,
        adresse: adresse.value,
        description: description.value,
        experience: [],
        competence: [],
        interet: [],
        reference: [],
        langue: [],
        formation: []
    };

    // Sauvegarder les expériences professionnelles
    const experiences = document.querySelectorAll('#experience > div');
    experiences.forEach((exp, index) => {
        const entreprise = exp.querySelector("input[placeholder='Entreprise']")?.value || "";
        const poste = exp.querySelector("input[placeholder='Poste occupé']")?.value || "";
        const moisDebut = exp.querySelector("select[placeholder='Mois de début']")?.value || "";
        const anneeDebut = exp.querySelector("select[placeholder='Année de début']")?.value || "";
        const moisFin = exp.querySelector("select[placeholder='Mois de fin']")?.value || "";
        const anneeFin = exp.querySelector("select[placeholder='Année de fin']")?.value || "";
        const description = exp.querySelector("textarea[placeholder='Description des tâches']")?.value || "";

        if (!entreprise && !poste && !moisDebut && !anneeDebut && !moisFin && !anneeFin && !description) return;
        cvData.experience.push({
            entreprise,
            poste,
            moisDebut,
            anneeDebut,
            moisFin,
            anneeFin,
            description
        });
    });


    // Sauvegarder les formations
    const formations = document.querySelectorAll('#formations > div');
    formations.forEach(form => {
        const diplome = form.querySelector("input[placeholder='Diplôme']")?.value || "";
        const etablissement = form.querySelector("input[placeholder='Établissement']")?.value || "";
        const anneeObtention = form.querySelector("input[placeholder=\"Année d'obtention\"]")?.value || "";
        if (!diplome && !etablissement && !anneeObtention) return;
        cvData.formation.push({ diplome, etablissement, anneeObtention });
    });

    // Sauvegarder les compétences
    const competences = document.querySelectorAll('#competences > div');
    competences.forEach(comp => {
        const skill = comp.querySelector("input[placeholder='Compétence']")?.value || "";
        const level = comp.querySelector("input[placeholder='Niveau de maîtrise']")?.value || "";
        if (!skill && !level) return;
        cvData.competence.push({ skill, level });
    });

    // Sauvegarder les centres d'intérêt
    const interets = document.querySelectorAll('#interet > div');
    interets.forEach(int => {
        const loisir = int.querySelector("input[placeholder='Loisirs et passions']")?.value || "";
        if (!loisir) return;
        cvData.interet.push(loisir);
    });

    // Sauvegarder les références
    const references = document.querySelectorAll('#references > div');
    references.forEach(ref => {
        const nom = ref.querySelector("input[placeholder='Nom']")?.value || "";
        const poste = ref.querySelector("input[placeholder='Poste']")?.value || "";
        const contact = ref.querySelector("input[placeholder='Contact']")?.value || "";
        if (!nom && !poste && !contact) return
        cvData.reference.push({ nom, poste, contact });
    });

    // Sauvegarder les langues
    const langues = document.querySelectorAll('#langues > div');
    langues.forEach(lang => {
        const langue = lang.querySelector("input[placeholder='Langue']")?.value || "";
        const niveau = lang.querySelector("input[placeholder='Niveau de compétence']")?.value || "";
        if (!langue & !niveau) return;
        cvData.langue.push({ langue, niveau });
    });

    // Sauvegarder les données dans LocalStorage
    // const cvName = document.getElementById('cvName');
    localStorage.setItem('cvData', JSON.stringify(cvData));
}
// Fonction pour charger les données du CV depuis LocalStorage
function loadCVData() {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    if (!cvData) return;

    nom.value = cvData.nom;
    titre.value = cvData.titre;
    age.value = cvData.age;
    sexe.value = cvData.sexe;
    mail.value = cvData.mail;
    tel.value = cvData.tel;
    adresse.value = cvData.adresse;
    description.value = cvData.description;

    // Mettre à jour les éléments du CV avec les valeurs chargées
    updateTextElement(nom, 'h1', 'text-3xl text-blue-950 font-bold uppercase', 'nameContainer');
    updateTextElement(titre, 'h2', 'text-lg text-blue-950 font-medium uppercase break-all', 'nameContainer');
    document.getElementById('iage').innerHTML = age.value.trim() ? `<i class="fa-solid fa-calendar-check text-blue-950"></i><span class="text-[13px] break-all">${age.value} ans</span>` : '';
    document.getElementById('isexe').innerHTML = sexe.value.trim() ? `<i class="fa-solid fa-venus-mars text-blue-950"></i><span class="text-[13px] break-all">${sexe.value}</span>` : '';
    document.getElementById('imail').innerHTML = mail.value.trim() ? `<i class="fa-solid fa-envelope text-blue-950"></i><span class="text-[13px] break-all">${mail.value}</span>` : '';
    document.getElementById('itel').innerHTML = tel.value.trim() ? `<i class="fa-solid fa-phone-flip text-blue-950"></i><span class="text-[13px] break-all">${tel.value}</span>` : '';
    document.getElementById('iadresse').innerHTML = adresse.value.trim() ? `<i class="fa-solid fa-house text-blue-950"></i><span class="text-[13px] break-all">${adresse.value}</span>` : '';
    document.getElementById('profilText').textContent = description.value.trim() ? description.value : '';
    document.getElementById('protext').className = description.value.trim() ? 'mb-2 bg-white p-2 text-[18px] text-blue-950 font-medium uppercase' : '';
    document.getElementById('protext').innerHTML = description.value.trim() ? 'profil' : '';

    // Charger les expériences professionnelles
    cvData.experience.forEach(exp => {
        const newExp = document.createElement('div');
        newExp.className = "w-full border border-gray-200 py-6 px-6 space-y-4";
        newExp.innerHTML = `
            <div class="w-full">
                <input type="text" placeholder="Entreprise" class="w-full p-2 outline-none bg-gray-100 rounded" value="${exp.entreprise}">
            </div>
            <div class="w-full">
                <input type="text" placeholder="Poste occupé" class="w-full p-2 outline-none bg-gray-100 rounded" value="${exp.poste}">
            </div>
            <div class="flex w-full space-x-6">
                <div class="flex space-x-3 w-1/2">
                    <div class="w-1/2">
                        <label class="block text-gray-700">Mois début</label>
                        <select placeholder="Mois de début" class="w-full p-2 outline-none text-gray-500 bg-gray-100 rounded">
                            <option value="">Mois</option>
                            <!-- Ajouter les options de mois ici -->
                        </select>
                    </div>
                    <div class="w-1/2">
                        <label class="block text-gray-700">Année début</label>
                        <select placeholder="Année de début" class="px-2 text-gray-500 w-full p-2 outline-none bg-gray-100 rounded">
                            <option value="">Année</option>
                            <!-- Ajouter les options d'années ici -->
                        </select>
                    </div>
                </div>
                <div class="flex space-x-3 w-1/2">
                    <div class="w-1/2">
                        <label class="block text-gray-700">Mois fin</label>
                        <select placeholder="Mois de fin" class="px-2 w-full p-2 text-gray-500 outline-none bg-gray-100 rounded">
                            <option value="">Mois</option>
                            <!-- Ajouter les options de mois ici -->
                        </select>
                    </div>
                    <div class="w-1/2">
                        <label class="block text-gray-700">Année fin</label>
                        <select placeholder="Année de fin" class="px-2 w-full text-gray-500 p-2 outline-none bg-gray-100 rounded">
                            <option value="">Année</option>
                            <!-- Ajouter les options d'années ici -->
                        </select>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <textarea type="text" placeholder="Description des tâches" class="w-full p-2 outline-none bg-gray-100 rounded">${exp.description}</textarea>
            </div>
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeExp"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('experience').appendChild(newExp);


        // Suppression d'une expérience
        newExp.querySelector('.removeExp').addEventListener('click', function () {
            newExp.remove();
            updateExperiencesOnCV(); 
        }
        );

        // Remplir les sélecteurs de mois et d'années pour le nouveau formulaire
        remplirSelect(newExp.querySelector('select[placeholder="Mois de début"]'), mois);
        remplirSelect(newExp.querySelector('select[placeholder="Mois de fin"]'), mois);
        remplirSelect(newExp.querySelector('select[placeholder="Année de début"]'), annees);
        remplirSelect(newExp.querySelector('select[placeholder="Année de fin"]'), annees);

        // Définir les valeurs des sélecteurs
        newExp.querySelector('select[placeholder="Mois de début"]').value = exp.moisDebut;
        newExp.querySelector('select[placeholder="Mois de fin"]').value = exp.moisFin;
        newExp.querySelector('select[placeholder="Année de début"]').value = exp.anneeDebut;
        newExp.querySelector('select[placeholder="Année de fin"]').value = exp.anneeFin;
    });

    // Charger les formations
    cvData.formation.forEach(form => {
        const newForm = document.createElement('div');
        newForm.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";
        newForm.innerHTML = `
            <input type="text" placeholder="Diplôme" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${form.diplome}">
            <input type="text" placeholder="Établissement" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${form.etablissement}">
            <input type="text" placeholder="Année d'obtention" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${form.anneeObtention}">
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeFormation"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('formations').appendChild(newForm);

        // Suppression d'une formation
        newForm.querySelector('.removeFormation').addEventListener('click', function () {
            newForm.remove();
            updateFormationsOnCV();
        });
    });

    // Charger les compétences
    cvData.competence.forEach(comp => {
        const newComp = document.createElement('div');
        newComp.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";
        newComp.innerHTML = `
            <input type="text" placeholder="Compétence" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${comp.skill}">
            <input type="text" placeholder="Niveau de maîtrise" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${comp.level}">
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeComp"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('competences').appendChild(newComp);
    });

    // Charger les centres d'intérêt
    cvData.interet.forEach(int => {
        const newInteret = document.createElement('div');
        newInteret.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";
        newInteret.innerHTML = `
            <input type="text" placeholder="Loisirs et passions" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${int}">
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeInteret"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('interet').appendChild(newInteret);

        // Suppression d'un centre d'intérêt
        newInteret.querySelector('.removeInteret').addEventListener('click', function () {
            newInteret.remove();
            updateInteretsOnCV();
        });
    });

    // Charger les références
    cvData.reference.forEach(ref => {
        const newReference = document.createElement('div');
        newReference.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";
        newReference.innerHTML = `
            <input type="text" placeholder="Nom" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${ref.nom}">
            <input type="text" placeholder="Poste" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${ref.poste}">
            <input type="text" placeholder="Contact" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${ref.contact}">
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeReference"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('references').appendChild(newReference);

        // Suppression d'une référence
        newReference.querySelector('.removeReference').addEventListener('click', function () {
            newReference.remove();
            updateReferencesOnCV();
        });
    });

    // Charger les langues
    cvData.langue.forEach(lang => {
        const newLangue = document.createElement('div');
        newLangue.className = "mb-4 border border-gray-200 py-6 px-6 space-y-4";
        newLangue.innerHTML = `
            <input type="text" placeholder="Langue" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${lang.langue}">
            <input type="text" placeholder="Niveau de compétence" class="w-full p-2 outline-none bg-gray-100 rounded" required value="${lang.niveau}">
            <div class="flex justify-end">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer removeLangue"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        document.getElementById('langues').appendChild(newLangue);

        // Suppression d'une langue
        newLangue.querySelector('.removeLangue').addEventListener('click', function () {
            newLangue.remove();
            updateLanguesOnCV();
        });
    });

    // Mettre à jour les sections du CV
    updateCompetencesOnCV();
    updateInteretsOnCV();
    updateReferencesOnCV();
    updateLanguesOnCV();
    updateExperiencesOnCV();
    updateFormationsOnCV();
}

// Sauvegarde automatique à chaque modification
document.addEventListener('input', saveCVData);

// Charger les données au chargement de la page
document.addEventListener('DOMContentLoaded', loadCVData);

document.getElementById('download').addEventListener('click', function () {

    // verifier si tout les champs du formulaire ne sont pas vides
    const inputs = document.querySelectorAll('input, textarea');
    let isEmpty = false;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isEmpty = true;
        }
    });

    if (isEmpty) {
        alert("⚠️ Veuillez remplir tous les champs du formulaire avant de télécharger votre CV.");
        return;
    }

    saveCVData();
    alert("✅ Votre CV a été enregistré !");

    const element = document.getElementById('cvContainer');
    const opt = {
        margin: 0,
        filename: `${cvName.value}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save()
    .catch(err => {
        console.error('Erreur lors de la génération du PDF:', err);
        alert('Une erreur est survenue lors de la génération du PDF.');
    });
});
// --------------------------------------------------------------------------------------------------------------------------