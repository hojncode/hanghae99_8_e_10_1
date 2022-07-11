from flask import Flask, render_template, jsonify, request
# 회원가입시 pw 암호화 해싱
import hashlib

# jwt 토큰 생성
import jwt

SECRET_KEY = "sparta"

# 시간 라이브러리
import datetime
# 토큰을 만들때 유효기간을 설정하기 위해서 서버시간을 가져와서 그로부터 얼마만큼 유효하게 설정하기 위해 필요
from datetime import datetime, timedelta

# 파이몽고 라이브러리
from pymongo import MongoClient
# client = MongoClient('localhost', 27017)
client = MongoClient('15.165.158.21', 27017, username="test", password="test")
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
def loginPage():
    return render_template('login.html')


# 로그인 시도
@app.route('/login', methods=['POST'])
def login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 받은 비밀번호를 암호 알고리즘화 하여 해싱(관리자도 볼수 없게 암호화)
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    # id와 해싱된 pw를 디비에서 찾는다
    result = db.users.find_one({'id': id_receive, 'pw': pw_hash}, {'_id': False})

    # 디비에 일치하는 정보가 있다면 로그인토큰을 만들것이고 없어서 None이라면 fail 결과가 나옴
    if result is not None:
        payload = {
            'id': id_receive,
            # 토큰의 유효기간을 설정(지금은 24시간 유효기간으로 설정해놈)(시간지나면 로그인이 풀림)
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        }
        # SECRET_KEY를 임의로 설정하여 SECRET_KEY를 가지고 알고리즘 암호화 하여 토큰을 만듬
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # 토큰을 만들면 클라이언트쪽으로 보내줌
        return jsonify({'result': 'success', 'msg': '로그인 성공.', 'token': token, })
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

# 회원가입 예시
@app.route('/create', methods=['POST'])
def create():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    doc = {'id': id_receive, 'pw': pw_hash}
    db.users.insert_one(doc)

    return jsonify({'result': 'success', 'msg': '회원가입 시도'})


# 회원가입 페이지 이동
@app.route('/signup')
def singup():
    return render_template('signup.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
