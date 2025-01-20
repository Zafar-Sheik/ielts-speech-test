from flask import request, jsonify
from flask_cors import CORS
from db.config import app, db
from db.model import Student
from utils import set_transcription, get_result, is_system_ready

CORS(app)

#POST: RECEIVE TRANSCRIPT
@app.route('/receive-transcript', methods =["POST"])
def create_transcript():
    try:
        # Get JSON payload
        data = request.get_json()

        # Validate payload
        if not data or "transcript" not in data:
            return jsonify({'message': 'No audio transcript received'}), 400

        transcript = data.get("transcript")
        if not transcript:
            return jsonify({'message': 'Transcript is empty'}), 400

        # Successfully received transcript
        print("Received transcript:", transcript)
        set_transcription(transcript)
        return jsonify({'message': 'Transcript received successfully'}), 200

    except Exception as e:
        return jsonify({'message': 'Invalid request', 'error': str(e)}), 400

#GET: AI Response
@app.route('/get-ai', methods=["GET"])
def get_ai ():

    if not is_system_ready():  # Check if the system is ready
        return jsonify({"message": "System is not ready. Please wait until transcription is complete."}), 400
    
    ai_response = get_result()
    return jsonify({"aiResponse": ai_response})

#CRUD APP Endpoints-----------------------------------------------------------------------------------------------

#GET: Student Details
@app.route("/students", methods=["GET"])
def get_students():
   students = Student.query.all()
   json_students = list(map(lambda x:x.to_json(), students))
   return jsonify({"students": json_students})

#CREATE: New Student
@app.route('/create-student', methods= ["POST"])
def create_student():
    full_name = request.json.get("fullName")
    email = request.json.get("email")

    #Validate Input
    if not full_name or not email: 
        return jsonify({'message': 'Include full name and email'}), 400
    
    new_student = Student(full_name = full_name, email=email)


   #Commit To DB
    try: 
        db.session.add(new_student)
        db.session.commit()
        
    except Exception as e: 
        return jsonify({'message':str(e)}), 400
    
    return jsonify({'message': 'Student Added To DB'}), 201 #201 status message for created

#UPDATE Student Data 
@app.route('/update-student/<int:student_id>', methods=["PATCH"])
def update_student (student_id):
    student = Student.query.get(student_id)

    if not student: 
        return jsonify({'message': 'Student Not Found'}), 404
    
    data = request.json
    student.full_name = data.get("fullName", student.full_name)
    student.email = data.get("email", student.email)

    db.session.commit()

    return jsonify({'message':'Student Updated'}), 200

#DELETE: Student Data
@app.route('/delete-student/<int:student_id>', methods = ['DELETE'])
def delete_student (student_id):
    student = Student.query.get(student_id)

    if not student: 
        return jsonify({'message': 'Student Not Found'}), 404
    
    db.session.delete(student)
    db.session.commit()

    return jsonify({'message':'Student Deleted'}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)

