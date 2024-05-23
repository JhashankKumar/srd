import json
import tornado.ioloop
import tornado.web
from tornado.options import define, options
from db import connection
import bcrypt
from utils import hash_password, check_password

define("port", default=8888, help="run on the given port", type=int)


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, Authorization")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS')

    def options(self):
        # No body needed
        self.set_status(204)
        self.finish()

class SignupHandler(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        email = data['email']
        password = hash_password(data['password'])
        
        # Determine user role
        if '.admin' in email:
            role = 'admin'
        elif '.teacher' in email:
            role = 'teacher'
        else:
            self.write({"success": False, "message": "Invalid email format"})
            return

        if connection:
            cursor = connection.cursor()
            try:
                cursor.execute("INSERT INTO users (email, password, role) VALUES (%s, %s, %s)", (email, password, role))
                connection.commit()
                self.write({"success": True})
            except connection.Error as err:
                print(err)
                self.write({"success": False, "message": "Database error"})
            finally:
                cursor.close()
                connection.close()
        else:
            self.write({"success": False, "message": "Database connection error"})

class LoginHandler(BaseHandler):
    async def post(self):
        data = json.loads(self.request.body)
        email = data['email']
        password = data['password']
        
        if not email or not password:
            self.set_status(400)
            self.write({"success": False, "message": "Email and password are required"})
            return

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, password, role FROM users WHERE email = %s", (email,))
                user = cursor.fetchone()
                
                if user and check_password(password, user['password']):
                    self.set_status(200)
                    self.write({"success": True, "message": "Login successful", "user": user})
                else:
                    self.set_status(401)
                    self.write({"success": False, "message": "Invalid email or password"})
        except Exception as e:
            self.set_status(500)
            self.write({"success": False, "message": "Internal server error"})
            print(f"Error: {e}")

class ResultHandler(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        student_name = data['student_name']
        telugu = data['telugu']
        hindi = data['hindi']
        english = data['english']
        maths = data['maths']
        attendance = data['attendance']

        if connection:
            cursor = connection.cursor()
            try:
                cursor.execute("INSERT INTO results (student_name, telugu, hindi, english, maths, attendance) VALUES (%s, %s, %s, %s, %s, %s)", 
                               (student_name, telugu, hindi, english, maths, attendance))
                connection.commit()
                self.write({"success": True})
            except connection.Error as err:
                print(err)
                self.write({"success": False, "message": "Database error"})
            finally:
                cursor.close()
                connection.close()
        else:
            self.write({"success": False, "message": "Database connection error"})

    def get(self):
        if connection:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM results")
            results = cursor.fetchall()
            self.write({"success": True, "results": results})
            cursor.close()
            connection.close()
        else:
            self.write({"success": False, "message": "Database connection error"})

    def delete(self):
        data = json.loads(self.request.body)
        student_name = data['student_name']

        if connection:
            cursor = connection.cursor()
            try:
                cursor.execute("DELETE FROM results WHERE student_name=%s", (student_name,))
                connection.commit()
                if cursor.rowcount > 0:
                    self.write({"success": True})
                else:
                    self.write({"success": False, "message": "No such student found"})
            except connection.Error as err:
                print(err)
                self.write({"success": False, "message": "Database error"})
            finally:
                cursor.close()
                connection.close()
        else:
            self.write({"success": False, "message": "Database connection error"})

def make_app():
    return tornado.web.Application([
        (r"/signup", SignupHandler),
        (r"/login", LoginHandler),
        (r"/results", ResultHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    print("Server running on http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
