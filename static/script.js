// let userChoice;

// // Gestionnaire pour l'événement de chargement d'OpenCV.js
// function onOpenCvReady() {
//     console.log('OpenCV.js is ready.');
//     // Ici, vous pouvez ajouter d'autres initialisations ou configurations liées à OpenCV
// }

// // Vérifier si l'objet cv existe et initialiser OpenCV.js
// if (typeof cv === 'undefined') {
//     console.error('OpenCV.js not found!');
// } else {
//     cv['onRuntimeInitialized'] = onOpenCvReady;
// }

// function setUserChoice(choice) {
//     userChoice = choice;
//     document.getElementById('user-choice').value = choice;
// }

// function play() {
//     if (userChoice) {
//         document.getElementById('play-form').submit();
//     } else {
//         alert('Please choose an option before playing.');
//     }
// }

// // Ajout de l'écouteur d'événements au bouton de soumission
// document.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('play-button').addEventListener('click', function(event) {
//         play();
//         event.preventDefault(); // Empêche la soumission automatique du formulaire
//     });
// });


// let userChoice;

// // Gestionnaire pour l'événement de chargement d'OpenCV.js
// function onOpenCvReady() {
//     console.log('OpenCV.js is ready.');
//     // Ici, vous pouvez ajouter d'autres initialisations ou configurations liées à OpenCV
// }

// // Vérifier si l'objet cv existe et initialiser OpenCV.js
// if (typeof cv !== 'undefined') {
//     cv['onRuntimeInitialized'] = onOpenCvReady;
// } else {
//     console.error('OpenCV.js not found!');
// }

// function setUserChoice(choice) {
//     userChoice = choice;
//     document.getElementById('user-choice').value = choice;
// }

// function play() {
//     if (userChoice) {
//         document.getElementById('play-form').submit();
//     } else {
//         alert('Please choose an option before playing.');
//     }
// }

// // Ajout de l'écouteur d'événements au bouton de soumission
// document.addEventListener('DOMContentLoaded', () => {
//     const playButton = document.getElementById('play-button');
//     if (playButton) {
//         playButton.addEventListener('click', function(event) {
//             play();
//             event.preventDefault(); // Empêche la soumission automatique du formulaire
//         });
//     } else {
//         console.error('Play button not found!');
//     }
// });


// // Gestionnaire pour l'événement de chargement d'OpenCV.js
// function onOpenCvReady() {
//     console.log('OpenCV.js is ready.');
//     // Ici, vous pouvez ajouter d'autres initialisations ou configurations liées à OpenCV
// }

// // Vérifie si OpenCV.js est chargé toutes les 100 millisecondes
// function checkIfOpenCvIsReady() {
//     if (typeof cv !== 'undefined' && cv.getBuildInformation) {
//         console.log(cv.getBuildInformation());
//         onOpenCvReady();
//     } else {
//         console.log('Waiting for OpenCV.js to load...');
//         setTimeout(checkIfOpenCvIsReady, 100);
//     }
// }

// // Commence à vérifier si OpenCV.js est chargé
// checkIfOpenCvIsReady();

let userChoice;

function setUserChoice(choice) {
    userChoice = choice;
    document.getElementById('user-choice').value = choice;
}

function play() {
    if (userChoice) {
        document.getElementById('play-form').submit();
    } else {
        alert('Please choose an option before playing.');
    }
}

// Vérifie si le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const playButton = document.getElementById('play-button');
    console.log('playButton:', playButton); // Pour déboguer
    if (playButton) {
        playButton.addEventListener('click', function(event) {
            play();
            event.preventDefault(); // Empêche la soumission automatique du formulaire
        });
    } else {
        console.error('Play button not found!');
    }
});
