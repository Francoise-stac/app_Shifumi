from flask import Flask, render_template, url_for, redirect, request, session
from flask import Flask, request, jsonify
import cv2
import numpy as np
# from tensorflow.keras.models import load_model




app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
# model = load_model('C:\\Users\\Utilisateur\\Documents\\App_ShiFuMi\\vgg16_rock_paper_scissors.h5')

# Mock user data (replace with a proper authentication mechanism)
users = {'user1': 'password1', 'user2': 'password2'}

# Fonction utilitaire pour réinitialiser les scores
def reset_scores():
    session['player_score'] = 0
    session['computer_score'] = 0
    session['current_round'] = 1
    session['rounds_won_by_player'] = 0
    session['rounds_won_by_computer'] = 0

# Fonction utilitaire pour obtenir le choix de l'ordinateur
def get_computer_choice():
    import random
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

# Fonction utilitaire pour déterminer le gagnant d'un tour
def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return 'It\'s a tie!'
    elif (
        (user_choice == 'rock' and computer_choice == 'scissors') or
        (user_choice == 'paper' and computer_choice == 'rock') or
        (user_choice == 'scissors' and computer_choice == 'paper')
    ):
        return 'You win!'
    else:
        return 'Computer wins!'

@app.route('/')
def home():
    return render_template('home.html')



@app.route('/predict', methods=['POST'])
def predict():
    # Récupération de l'image
    image_file = request.files['image'].read()
    nparr = np.fromstring(image_file, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Prétraitement de l'image (comme lors de l'entraînement)
    # ...

    # Prédiction
    # prediction = model.predict(img_processed)
    # predicted_class = np.argmax(prediction, axis=-1)

    # # Envoyer la prédiction
    # return jsonify({'prediction': str(predicted_class)})
    # Pour l'instant, renvoyons simplement la taille de l'image comme exemple
    height, width = img.shape[:2]
    return jsonify({'message': 'Image reçue', 'width': width, 'height': height})



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        print("Username:", username)
        print("Password:", password)

        # Votre logique de vérification ici...

        session['username'] = username
        session['player_score'] = 0
        session['computer_score'] = 0
        return redirect(url_for('play'))
    return render_template('home.html')

@app.route('/play', methods=['GET', 'POST'])
def play():
    print("Session username:", session.get('username'))
    if 'username' not in session:
        return redirect(url_for('home'))

    if request.method == 'POST':
        user_choice = request.form['choice']
        computer_choice = get_computer_choice()

        result = determine_winner(user_choice, computer_choice)

        # Mettre à jour les scores et les rounds gagnés en fonction du résultat
        if result == 'You win!':
            session['player_score'] += 1
        elif result == 'Computer wins!':
            session['computer_score'] += 1

        # Vérifier si le joueur ou l'ordinateur a gagné trois rounds
        if session['player_score'] == 3:
            session['rounds_won_by_player'] += 1
            reset_scores()  # Réinitialiser les scores pour une nouvelle partie
        elif session['computer_score'] == 3:
            session['rounds_won_by_computer'] += 1
            reset_scores()  # Réinitialiser les scores pour une nouvelle partie

        # Incrémenter le numéro du tour pour le tour suivant
        session['current_round'] += 1

        # Passer les variables de round, player_score, computer_score, et rounds_won à l'interface
        return render_template('result.html', result=result, username=session['username'],
                               user_choice=user_choice, computer_choice=computer_choice,
                               round=session['current_round'], player_score=session['player_score'],
                               computer_score=session['computer_score'],
                               rounds_won_by_player=session['rounds_won_by_player'],
                               rounds_won_by_computer=session['rounds_won_by_computer'])
    else:
        return render_template('play.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
