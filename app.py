from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Movie data for V2
MOVIES_DATA = {
    "trending": [
        {"id": 1, "title": "Cyber Storm", "genre": "Action", "year": 2024, "rating": 4.8, "duration": "2h 15m"},
        {"id": 2, "title": "Ocean Mystery", "genre": "Thriller", "year": 2024, "rating": 4.6, "duration": "1h 55m"},
        {"id": 3, "title": "Galaxy Warriors", "genre": "Sci-Fi", "year": 2024, "rating": 4.9, "duration": "2h 30m"},
        {"id": 4, "title": "The Last Dance", "genre": "Drama", "year": 2024, "rating": 4.7, "duration": "2h 05m"},
        {"id": 5, "title": "Midnight Sun", "genre": "Romance", "year": 2024, "rating": 4.5, "duration": "1h 50m"},
        {"id": 6, "title": "Code Red", "genre": "Action", "year": 2024, "rating": 4.4, "duration": "2h 10m"},
    ],
    "newReleases": [
        {"id": 7, "title": "Shadow Protocol", "genre": "Spy", "year": 2024, "rating": 4.7, "duration": "2h 20m"},
        {"id": 8, "title": "Wild Heart", "genre": "Adventure", "year": 2024, "rating": 4.3, "duration": "1h 45m"},
        {"id": 9, "title": "Digital Dreams", "genre": "Sci-Fi", "year": 2024, "rating": 4.8, "duration": "2h 00m"},
        {"id": 10, "title": "Family Reunion", "genre": "Comedy", "year": 2024, "rating": 4.2, "duration": "1h 40m"},
        {"id": 11, "title": "Dark Waters", "genre": "Horror", "year": 2024, "rating": 4.1, "duration": "1h 55m"},
        {"id": 12, "title": "Speed Racer", "genre": "Action", "year": 2024, "rating": 4.6, "duration": "2h 15m"},
    ],
    "tvShows": [
        {"id": 13, "title": "Kingdom's Edge", "genre": "Fantasy", "seasons": 4, "rating": 4.9},
        {"id": 14, "title": "Tech Giants", "genre": "Drama", "seasons": 3, "rating": 4.7},
        {"id": 15, "title": "Crime Division", "genre": "Crime", "seasons": 5, "rating": 4.8},
        {"id": 16, "title": "Space Colony", "genre": "Sci-Fi", "seasons": 2, "rating": 4.6},
        {"id": 17, "title": "Comedy Hour", "genre": "Comedy", "seasons": 6, "rating": 4.4},
        {"id": 18, "title": "Medical Team", "genre": "Drama", "seasons": 4, "rating": 4.5},
    ]
}

@app.route('/')
def home():
    return render_template('index.html', movies=MOVIES_DATA)

@app.route('/api/movies')
def get_movies():
    return jsonify(MOVIES_DATA)

@app.route('/api/search/<query>')
def search(query):
    results = []
    for category in MOVIES_DATA.values():
        for item in category:
            if query.lower() in item['title'].lower():
                results.append(item)
    return jsonify(results)

@app.route('/health')
def health():
    return {'status': 'healthy', 'version': 'v2'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
