/* 화면이 로딩이되면 실행하는 코드*/

$(document).ready(function () {
    $(".cards").empty()
    show_cardList()
     show_login()
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
                let address = rows[i]['address']
                let comment = rows[i]['comment']
                let file = "../static/postimg/" + rows[i]['file']
                let location = rows[i]['location']
                let workout = rows[i]['workout']

                let temp_html = `<div class="card">
                                    <img src="${file}" class="card-img-top" onerror="this.src='../static/img/헬스장.jpg'">
                                    <div class="card-body">
                                        <h5 class="card-title" id="card_img">${workout}</h5>
                                        <p class="card-text">${location}</p>
                                    </div>
                                </div>`
                $('.cards').append(temp_html)


                //     let modal_html = ` <div class="photo_detail">
                // </div>
                // <div class="comment_detail">${comment}</div>
                // <div class="location_detail"></div>
                // <div class="link_detail"></div>`
                //
                //     $(`#modal_bg`).append(modal_html)

            }


        }
    });
}


/* 모달창  */

$('#card_img').on('click', function () {
    $('#modal').css('display', 'block');
});

$('#close').on('click', function () {
    $('#modal').css('display', 'none');
})



