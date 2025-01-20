from db.config import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    full_name = db.Column (db.String(50), unique=False, nullable=False)
    email = db.Column (db.String(80), unique=True, nullable=False)

    def to_json (self):
        return {
            "id" : self.id,
            "fullName" : self.full_name,
            "email" : self.email,
        }
