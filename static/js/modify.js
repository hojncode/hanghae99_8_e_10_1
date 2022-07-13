


window.addEventListener('load', () => {
    modify_show()
    // const forms = document.getElementsByClassName('validation-form');
    //
    // Array.prototype.filter.call(forms, (form) => {
    //     form.addEventListener('submit', function (event) {
    //         if (form.checkValidity() === false) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //         } else {
    //             event.preventDefault();
    //             save_order()
    //             {
    //                 // alert('회원가입 완료!')
    //
    //             }
    //         }
    //
    //         form.classList.add('was-validated');
    //     }, false);
    // });
}, false);

function modify_show() {

    $.ajax({
        type: "GET",
        url: "/getusers",
        data: {},
        success: function (response) {

                //로그인 정보를 가져와서 폼에다가 뿌림
             let rows = response['all_post']
               console.log(rows)
            for (let i = 0; i < rows.length; i++) {
                let address = rows[i]['address']
                let email = rows[i]['email']
                let idenfier = rows[i]['idenfier']
                let name = rows[i]['name']
                let nick = rows[i]['nick']
                let number = rows[i]['number']

            }
            }
    });
}



//회원탈퇴

function user_delete(){
    let user_del = confirm("회원 탈퇴 하시겠습니까?");

    if(user_del == true){
        // 회원탈퇴기능구현
        alert("회원탈퇴가 정상처리 되었습니다")
    }else{
        alert("회원탈퇴가 취소되었습니다")
    }
}