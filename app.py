<!doctype html>
<html lang="kor">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

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
    }
    </script>
    <!--구글폰트-->
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">


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
