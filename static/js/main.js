/* 화면이 로딩이되면 실행하는 코드*/

$(document).ready(function () {
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
                let address = rows[i]['address']
                let comment = rows[i]['comment']
                let file = "../static/postimg/" + rows[i]['file']
                let location = rows[i]['location']
                let workout = rows[i]['workout']

                let temp_html = `<div class="card" id="${post_id}" onclick="openmodal()">
                                    <img src="${file}" class="card-img-top" onerror="this.src='../static/img/헬스장.jpg'">
                                    <div class="card-body">
                                        <h5 class="card-title" id="card_img">${workout}</h5>
                                        <p class="card-text">${location}</p>
                                    </div>
                                </div>`
                $('.cards').append(temp_html)
            }


        }
    });
}

function detailmodal() {

    let postID = '{{post_id}}'
    post_id = postID

    $.ajax({
        type: "POST",
        url: "/modal/" + postID,
        data: {},
        success: function (response) {
            console.log(response['msg'])
            let rows = response['data']
            for (let i of rows) {
                let address = rows[i]['address']
                let comment = rows[i]['comment']
                // let file = "../static/postimg/" + rows[i]['file']
                let location = rows[i]['location']
                let workout = rows[i]['workout']

                let temp_html = `<div id="modalCard">
                                <div id="modalbox1">
                                    <div id="modalimgbox">
                                        <img id="modalimg" src="${file}" onerror="this.src='../static/img/헬스장.jpg'">
                                    </div>
                    
                                    <div id="modalinpomation">
                                        <h5>넥스트 짐</h5>
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
                $('.cards').append(temp_html)
            }
        }


    })
}

/* 모달창  */

function openmodal() {
    detailmodal()
    $('#modal').css('display', 'block');
}

$('#modalBg').on('click', function () {
    $('#modal').css('display', 'none');
})
$('#modalBtn').on('click', function () {
    $('#modal').css('display', 'none');
})



