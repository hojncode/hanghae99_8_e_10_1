from flask import Flask, render_template

# 시간 라이브러리
import datetime
# 파이몽고 라이브러리
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.playGround




app = Flask(__name__)

# 메인 페이지 이동
@app.route('/')
def home():
   return render_template('main.html')

# 글작성 페이지 이동
@app.route('/write')
def write():
   return render_template('workout.html')

# 로그인 페이지 이동
@app.route('/login')
def mypage():
   return render_template('login.html')

# 회원가입 페이지 이동
@app.route('/signup')
def singup():
   return render_template('signup.html')

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)