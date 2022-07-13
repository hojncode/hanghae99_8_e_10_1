<!doctype html>
<html lang="kor">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<<<<<<< HEAD
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>

    <!-- jQuery cookie 함수-->
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>

    <script>
        function toggle_like(post_id, type) {
        console.log(post_id, type)
        let $a_like = $(`#${post_id} a[aria-label='heart']`)
        let $i_like = $a_like.find("i")
        if ($i_like.hasClass("fa-heart")) {
            $.ajax({
                type: "POST",
                url: "/update_like",
                data: {
                    post_id_give: post_id,
                    type_give: type,
                    action_give: "unlike"
                },
                success: function (response) {
                    console.log("unlike")
                    $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                    $a_like.find("span.like-num").text(response["count"])
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/update_like",
                data: {
                    post_id_give: post_id,
                    type_give: type,
                    action_give: "like"
                },
                success: function (response) {
                    console.log("like")
                    $i_like.addClass("fa-heart").removeClass("fa-heart-o")
                    $a_like.find("span.like-num").text(response["count"])
                }
            })

        }
=======
# 시간 라이브러리
import datetime
# 토큰을 만들때 유효기간을 설정하기 위해서 서버시간을 가져와서 그로부터 얼마만큼 유효하게 설정하기 위해 필요
from datetime import datetime, timedelta

######## bson 패키지 설치 필요! ########
#pymongo에서 _id의 ObjectId를 사용하기 위해 필요
from bson.objectid import ObjectId

# 파이몽고 라이브러리
from pymongo import MongoClient

SECRET_KEY = "sparta"

app = Flask(__name__)

# client = MongoClient('localhost', 27017)
client = MongoClient('15.165.158.21', 27017, username="test", password="test")
db = client.playGround


# 메인 페이지 이동
@app.route('/')
def home():
    print("hi")
    token_receive = request.cookies.get('mytoken')
    if token_receive is not None:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"idenfier": payload["idenfier"]})
        return render_template('main.html', userid=user_info["idenfier"])
    else:
        return render_template('main.html')

# 작성된 글 불러오기
@app.route('/getpost', methods=['GET'])
def show_postlist():
    posts = list(db.postbox.find({}))
    for post in posts:
        post["_id"] = str(post["_id"])
    # print(posts)
    return jsonify({'all_post': posts, "msg":"가져오기 성공"})

# 세부 내용 보기(모달)
@app.route('/modal', methods=['POST'])
def show_modal():
    print("모달열기")
    post_id_receive = request.form["post_id_give"]

    # ObjectId 로 데이터 찾을때 bson 패키지 설치 필요
    post = db.postbox.find_one({'_id': ObjectId(post_id_receive)})
    # print(post['file'])
    if post['file'] is None:
        print("no")
    else:
        print("yes")

    data = {
        'location': post['location'],
        'workout': post['workout'],
        'address': post['address'],
        'comment': post['comment'],
        'file': post['file'],
    }

    return jsonify({
        'result': {
            'success': 'true',
            'message': 'modal 가져오기 성공',
            'data': data,
        }
    })


# 글작성 페이지 이동
@app.route('/write')
def write():
    token_receive = request.cookies.get('mytoken')
    if token_receive is not None:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"idenfier": payload["idenfier"]})
        return render_template('writing.html', userid=user_info["idenfier"])
    else:
        # return jsonify({'result': 'fail', 'msg': '로그인 후 글 작성 가능합니다.'})
        return render_template('main.html', msg="로그인 후 글 작성 가능합니다.")


# 글 작성(디비저장)
@app.route('/post', methods=['POST'])
def save_post():
    try:
        location_receive = request.form["location_give"]
        workout_receive = request.form["workout_give"]
        address_receive = request.form["address_give"]
        comment_receive = request.form["comment_give"]
        file_receive = request.files["file_give"]

        file = file_receive

        extension = file.filename.split('.')[-1]

        today = datetime.now()
        mytime = today.strftime('%Y년 %m월 %d일 %H시 %M분 %S초')

        filename = f'file-{mytime}'

        save_to = f'static/postimg/{filename}.{extension}'
        file.save(save_to)

        doc = {
            'location': location_receive,
            'workout': workout_receive,
            'address': address_receive,
            'comment': comment_receive,
            'file': f'{filename}.{extension}'
        }
        db.postbox.insert_one(doc)

        return jsonify({'msg': '저장완료'})

    except KeyError:
        location_receive = request.form["location_give"]
        workout_receive = request.form["workout_give"]
        address_receive = request.form["address_give"]
        comment_receive = request.form["comment_give"]

        doc = {
            'location': location_receive,
            'workout': workout_receive,
            'address': address_receive,
            'comment': comment_receive,
            'file': "",
        }
        db.postbox.insert_one(doc)

        return jsonify({'msg': '저장완료'})


# 로그인 페이지 이동
@app.route('/login')
def loginPage():
    token_receive = request.cookies.get('mytoken')
    if token_receive is not None:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"idenfier": payload["idenfier"]})
        return render_template('login.html', userid=user_info["idenfier"])
    else:
        return render_template('login.html')


# user 사용자 로그인 여부 확인 api
@app.route('/islogin', methods=['POST'])
def checkcookie():
    token_receive = request.cookies.get('mytoken')
    if token_receive is not None:
        return jsonify({
            'result': {'success': 'true'}
        })
    else:
        return jsonify({
            'result': {'success': 'false'}
        })


# 로그인 시도
@app.route('/login', methods=['POST'])
def login():
    idenfier_receive = request.form['id_give']
    password_receive = request.form['pw_give']

    # 받은 비밀번호를 암호 알고리즘화 하여 해싱(관리자도 볼수 없게 암호화)
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    # id와 해싱된 pw를 디비에서 찾는다
    result = db.users.find_one({'idenfier': idenfier_receive, 'password': password_hash}, {'_id': False})

    # 디비에 일치하는 정보가 있다면 로그인토큰을 만들것이고 없어서 None이라면 fail 결과가 나옴
    if result is not None:
        payload = {
            'idenfier': idenfier_receive,
            # 토큰의 유효기간을 설정(지금은 24시간 유효기간으로 설정해놈)(시간지나면 로그인이 풀림)
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        }
        # SECRET_KEY를 임의로 설정하여 SECRET_KEY를 가지고 알고리즘 암호화 하여 토큰을 만듬
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # 토큰을 만들면 클라이언트쪽으로 보내줌
        return jsonify({'result': 'success', 'msg': '로그인 성공.', 'token': token, })
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


# 회원가입 페이지 이동
@app.route('/signup')
def signup():
    return render_template('signup.html')


# 회원가입
@app.route('/users', methods=['POST'])
def createUser():
    name_receive = request.form['name_give']
    nick_receive = request.form['nick_give']
    idenfier_receive = request.form['idenfier_give']
    password_receive = request.form['password_give']
    email_receive = request.form['email_give']
    number_receive = request.form['number_give']
    address_receive = request.form['address_give']

    # 받은 비밀번호를 암호 알고리즘화 하여 해싱(관리자도 볼수 없게 암호화)
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

    doc = {
        'name': name_receive,
        'nick': nick_receive,
        'idenfier': idenfier_receive,
        'password': password_hash,
        'email': email_receive,
        'number': number_receive,
        'address': address_receive,

>>>>>>> 004c48ccbc65817960c1d77181aa2f5afcacf6f7
    }
    </script>
    <!--구글폰트-->
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">

# 회원정보수정 페이지 이동
@app.route('/modify')
def modify():
    return render_template('modify.html')

    <title>우리들의 운동장</title>

    <!-- 배너 css -->
    <link rel="stylesheet" href="../static/css/banner.css">
    <!-- 로그인체크 및 로그아웃 js -->
    <script src="../static/js/logincheck.js" defer></script>
    <!-- css -->
    <link href="../static/css/main.css" rel="stylesheet">
    <!-- 포스팅 글 가져오기 -->
    <script src="../static/js/main.js" defer></script>


</head>

<body>
<div>
    <div class="header_title">
        <h1>
            <a>우리동네 운동장</a>
            <img id="bannerimg" src="../static/img/exercise.png">
{#        </h1>#}
{#                <div class="header_temp">#}
{#                    <p>현재온도 : <span id="temp">--</span>도</p>#}
{#                </div>#}

        <div class="login">
            <ul class="loginfalse">
                <li>
                    <a href="/login">로그인</a>
                </li>
                <li>
                    <a href="/signup">회원가입</a>
                </li>

            </ul>
            <ul class="loginture">
                <li>
                    <a href="/login">{{ userid }}</a>
                </li>
                <li>
                    <a onclick="logout()">로그아웃</a>
                </li>

                 <li>
                    <a href="/modify">회원정보수정</a>
                </li>
            </ul>

        </div>

    </div>
</header>
<div class="wrap">
    <nav>
        <div>
            <button type="button" id="addPost"><a href="/write">운동추가하기</a></button>
        </div>
    </nav>
    <section>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col cards">
                <div class="card">
                    <img src="../static/img/헬스장.jpg" class="card-img-top" id="card_img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">운동명</h5>
                        <p class="card-text">카테고리</p>
                        <p class="card-text">지역명</p>

                    </div>
                </div>



                <div class="card">
                    <img src="../static/img/헬스장.jpg" class="card-img-top" id="card_img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">운동명</h5>
                        <p class="card-text">카테고리</p>
                        <p class="card-text">지역명</p>
                    </div>
                </div>
                <div class="card">
                    <img src="../static/img/헬스장.jpg" class="card-img-top" id="card_img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">운동명</h5>
                        <p class="card-text">카테고리</p>
                        <p class="card-text">지역명</p>
                    </div>
                </div>
            </div>

        </div>
    </section>




    <footer>

    </footer>


    <!-- 팝업창 레이어-->

    <div class="modal-detail" id="modal">
        <div class="white-bg" id="modal_bg">
            <div class="photo_detail">
            </div>
            <div class="comment_detail"></div>
            <div class="location_detail"></div>
            <div class="link_detail"></div>
            <button type="button" class="btn btn-success" id="close">나가기</button>
        </div>


    </div>
</div>

    <div id="form-commentInfo">
        <div id="comment-count">댓글 <span id="count">0</span></div>
        <input id="comment-input" placeholder="댓글을 입력해 주세요.">
        <button id="submit">등록</button>
    </div>
    <div id=comments>

    </div>
    <script src="index.js"></script>


</div>


</body>

</html>
