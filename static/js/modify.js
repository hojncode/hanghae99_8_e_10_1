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

    let name = $('#name')
    let nickname = $('#nickname')
    let idenfier = $('#idenfier')
    let password = $('#password')
    let email = $('#email')
    let number = $('#number')
    let address = $('#address')

    $.ajax({
        type: 'POST',
        url: '/users',
        data: {
            name_give: name.val(),
            nick_give: nickname.val(),
            idenfier_give: idenfier.val(),
            password_give: password.val(),
            email_give: email.val(),
            number_give: number.val(),
            address_give: address.val()
        },
        success: function (response) {
            alert(response['msg'])
            window.location.replace("/login")
        }
    });
}

function user_delete(){
    let user_del = confirm("회원 탈퇴 하시겠습니까?");

    if(user_del == true){
        // 회원탈퇴기능구현
        alert("회원탈퇴가 정상처리 되었습니다")
    }else{
        alert("회원탈퇴가 취소되었습니다")
    }
}