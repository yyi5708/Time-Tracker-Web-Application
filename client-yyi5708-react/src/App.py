# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import psycopg2

# app = Flask(__name__)
# CORS(app)

# DB_HOST = 'localhost'
# DB_PORT = 5432
# DB_USER = 'swen344'
# DB_PASSWORD = 'Pakistan@2004'
# DB_NAME = 'swen344'

# def get_connection():
#   conn = psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
#   return conn

# @app.route('/', methods=['GET'])

# def home():
#     return jsonify({'message': 'Time Tracker'}), 200
    
# @app.route('/TimeTracker', methods=['GET', 'PUT'])

# def timeTracker():
#     conn = get_connection()
#     cur = conn.cursor()
#     if request.method == 'GET':
#         cur.execute('SELECT startTime FROM TimeTracker;')
#         timeTracker = cur.fetchone()
#         if timeTracker:
#             timeTracker = timeTracker[0]
#         conn.close()
#         return jsonify({'startTime': timeTracker}), 200
#     elif request.method == 'PUT':
#         data = request.get_json()
#         timeTracker = data.get('start_time')
#         cur.execute('UPDATE TimeTracker SET startTime = %s', (timeTracker,))
#         conn.commit()
#         conn.close()
#         return jsonify({'message': 'Start time updated'}), 200
#     conn.close()
#     return jsonify({'error': 'Error getting request method'}), 400

# if __name__ == '__main__':
#   app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import datetime

app = Flask(__name__)
CORS(app)

DB_HOST = 'localhost'
DB_PORT = 5432
DB_USER = 'swen344'
DB_PASSWORD = 'Pakistan@2004'
DB_NAME = 'swen344'


def get_connection():
    connection = psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    return connection

def extract_time(time_in):
    try:
        time_out = datetime.datetime.fromisoformat(time_in)
        return time_out.strftime('%H:%M:%S')
    except ValueError:
        return None

@app.route('/', methods=['GET', 'PUT'])
def time_tracker():
    connection = get_connection()
    cursor = connection.cursor()
    if request.method == 'GET':
        cursor.execute('SELECT start_time FROM TimeTracker;')
        time = cursor.fetchone()
        if time:
            time = time[0]
        connection.close()
        return jsonify({'Start Time': time}), 200
    elif request.method == 'PUT':
        data = request.get_json()
        time = data.get('start_time')
        extracted_time = extract_time(time)
        if extracted_time:
            cursor.execute('UPDATE TimeTracker SET start_time = %s', (extracted_time,))
            connection.commit()
            connection.close()
            return jsonify({'message': 'Success with updating start time'}), 200
        else:
            return jsonify({'error': 'Error with updating time format'}), 400
    connection.close()
    return jsonify({'error': 'Error with updating request method'}), 400

if __name__ == '__main__':
    app.run(debug=True)