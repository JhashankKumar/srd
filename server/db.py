import pymysql.cursors

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='Jhashank@190703',
    database='student_dashboard',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
