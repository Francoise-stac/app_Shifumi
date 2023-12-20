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

// Ajout de l'écouteur d'événements au bouton de soumission
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('play-button').addEventListener('click', function(event) {
        play();
        event.preventDefault(); // Empêche la soumission automatique du formulaire
    });
});
