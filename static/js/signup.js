$(document).ready(function () {
    set_temp()
});

window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');

    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                save_order()
                {
                    // alert('회원가입 완료!')

                }
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);
function save_order() {

    let name = $('#name').val()
    let nickname = $('#nickname').val()
    let idenfier = $('#idenfier').val()
    let password = $('#password').val()
    let email = $('#email').val()
    let number = $('#number').val()
    let address = $('#address').val()

    // if ($("#help-id").hasClass("is-danger")) {
    //             alert("아이디를 다시 확인해주세요.")
    //             return;
    //         } else if (!$("#help-id").hasClass("is-success")) {
    //              alert("아이디 중복확인을 해주세요.")
    //             return;
    //         }

    $.ajax({
        type: 'POST',
        url: '/signup',
        data: {
            name_give: name,
            nick_give: nickname,
            idenfier_give: idenfier,
            password_give: password,
            email_give: email,
            number_give: number,
            address_give: address,
        },
        success: function (response) {
            let result = response["result"]
            if(result =="success"){
                alert(response['msg'])
                window.location.replace("/login")
            }
            else if (result == "false"){
                alert(response['msg'])
                $('#idenfier').focus()
            }

        }
    });
}

// function check_dup() {
//             let idenfier = $("#input-idenfier").val()
//             console.log(idenfier)
//             if (idenfier == "") {
//                 $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
//                 $("#input-idenfier").focus()
//                 return;
//             }
//             // if (!is_nickname(idenfier)) {
//             //     $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
//             //     $("#input-idenfier").focus()
//             //     return;
//             // }
//             $("#help-id").addClass("is-loading")
//             $.ajax({
//                 type: "POST",
//                 url: "/signup/check_dup",
//                 data: {
//                     idenfier_give: idenfier
//                 },
//                 success: function (response) {
//
//                     if (response["exists"]) {
//                         $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
//                         $("#input-idenfier").focus()
//                     } else {
//                         $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
//                     }
//                     $("#help-id").removeClass("is-loading")
//
//                 }
//             });
//         }