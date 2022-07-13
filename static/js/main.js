/* 화면이 로딩이되면 실행하는 코드*/

$(document).ready(function () {
    set_temp()
    $(".cards").empty()
    show_cardList()
});


/* card GET 코드 */
function show_cardList() {
    $.ajax({
        type: "GET",
        url: "/getpost",
        data: {},
        success: function (response) {
            console.log(response['msg'])

            let rows = response['all_post']
            for (let i = 0; i < rows.length; i++) {
                let post_id = rows[i]["_id"]
                // let address = rows[i]['address']
                // let comment = rows[i]['comment']
                let file = "../static/postimg/" + rows[i]['file']
                let placeName = rows[i]['placeName']
                let location = rows[i]['location']
                let workout = rows[i]['workout']

                if (file == "../static/postimg/") {
                    if (workout == "헬스") {
                        file = "../static/img/헬스장.jpg"
                    } else if (workout == "수영") {
                        file = "../static/img/수영.jpg"
                    } else if (workout == "등산") {
                        file = "../static/img/등산.jpg"
                    } else if (workout == "클라이밍") {
                        file = "../static/img/클라이밍.jpg"
                    } else if (workout == "싸이클") {
                        file = "../static/img/싸이클.jpg"
                    } else if (workout == "기타") {
                        file = "../static/img/걷기.jpg"
                    } else if (workout == "크로스핏") {
                        file = "../static/img/크로스핏.jpg"
                    }
                }

                let temp_html = `<div class="card" id="${post_id}" onclick="openmodal('${post_id}')">
                                    <img src="${file}" class="card-img-top" onerror="this.src='../static/img/exercise.png'">
                                    <div class="card-body">
                                        <h3>${placeName}</h3>
                                        <h5 class="card-title" id="card_img">${workout}</h5>
                                        <p class="card-text">${location}</p>
                                    </div>  
                                </div>`
                $('.cards').append(temp_html)
            }


        }
    });
}

// 상세 모달창에 클릭시 세부 내용 보여주기
function detailmodal(post_id) {

    $.ajax({
        type: "POST",
        url: "/modal",
        data: {post_id_give: post_id,},
        success: function (response) {
            // console.log(response['result']['message'])
            let rows = response['result']['data']

            let address = rows['address']
            let comment = rows['comment']
            let file = "../static/postimg/" + rows['file']
            let location = rows['location']
            let workout = rows['workout']

            if (file == "../static/postimg/") {
                    if (workout == "헬스") {
                        file = "../static/img/헬스장.jpg"
                    } else if (workout == "수영") {
                        file = "../static/img/수영.jpg"
                    } else if (workout == "등산") {
                        file = "../static/img/등산.jpg"
                    } else if (workout == "클라이밍") {
                        file = "../static/img/클라이밍.jpg"
                    } else if (workout == "싸이클") {
                        file = "../static/img/싸이클.jpg"
                    } else if (workout == "기타") {
                        file = "../static/img/걷기.jpg"
                    } else if (workout == "크로스핏") {
                        file = "../static/img/크로스핏.jpg"
                    }
                }

            let temp_html = `<div id="modalCard">
                                <div id="modalbox1">
                                    <div id="modalimgbox">
                                        <img id="modalimg" src="${file}" onerror="this.src='../static/img/exercise.png'">
                                    </div>

                                    <div id="modalinpomation">
                                        <h5>${placeName}</h5>
                                        <p>${workout}</p>
                                        <p>${location}</p>
                                        <p>
                                            <a href="${address}"
                                               target="_blank">자세한 링크</a>
                                        </p>
                                        <p>작성자 : 헬린이</p>

                                    </div>

                                </div>
                                <div id="modalbox2">
                                    <p id="review">리뷰 : ${comment}</p>
                                </div>
                            </div>`
            $('#modal').append(temp_html)
        }
    })
}

/* 모달창  */

function openmodal(a) {
    detailmodal(a)
    $('#modal').css('display', 'block');
}

$('#modalBg').on('click', function () {
    $('#modal').css('display', 'none');
})
$('#modalBtn').on('click', function () {
    $('#modal').css('display', 'none');
})