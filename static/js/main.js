/* 화면이 로딩이되면 실행하는 코드*/

$(document).ready(function(){
    set_temp()
    show_comment()
});


/* card GET 코드 */
function show_comment() {
    $('#comment-list').empty()
    $.ajax({
        type: "GET",
        url: "/homework",
        data: {},
        success: function (response) {
            // let rows = response['comments']
            // for (let i = 0; i < rows.length; i++) {
            //     let name = rows[i]['name']
            //     let comment = rows[i]['comment']

            //     let temp_html = `<div class="card">
            //                         <div class="card-body">
            //                             <blockquote class="blockquote mb-0">
            //                                 <p>${comment}</p>
            //                                 <footer class="blockquote-footer">${name}</footer>
            //                             </blockquote>
            //                         </div>
            //                     </div>`
            //     $('#comment-list').append(temp_html)
        //     }
         }
    });
}




/* 모달창  */

$('#card_img').on('click',function(){
    $('#modal').css('display','block');
});

$('#close').on('click', function(){
    $('#modal').css('display','none');
})



