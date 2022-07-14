window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');

    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                update_order()
                event.preventDefault();


                {
                    // alert('회원가입 완료!')

                }
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);


function update_order() {

    let name = $('#name')
    let nickname = $('#nickname')
    let idenfier = $('#idenfier')
    let password = $('#password')
    let email = $('#email')
    let number = $('#number')
    let address = $('#address')

    $.ajax({
        type: 'POST',
        url: '/update_user',
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
            window.location.replace("/")
        }
    });
}


 function delete_order() {

    let name = $('#name')
    let nickname = $('#nickname')
    let idenfier = $('#idenfier')
    let password = $('#password')
    let email = $('#email')
    let number = $('#number')
    let address = $('#address')

    $.ajax({
        type: 'POST',
        url: '/delete_user',
        data: {
            name_give: name.val(),
            nick_give: nickname.val(),
            idenfier_give: idenfier.val(),
            // password_give: password.val(),
            email_give: email.val(),
            number_give: number.val(),
            address_give: address.val()
        },
        success: function (response) {
            // alert(response['msg'])
            window.location.replace("/")
        }
    });
}

function logout() {
    console.log($.removeCookie('mytoken', {path: '/'}))
    $.removeCookie('mytoken', {path: '/'});
    window.location.href = '/login'
}

function user_delete(){
    let user_del = confirm("회원 탈퇴 하시겠습니까?");

    if(user_del == true){
       delete_order()
        alert("회원탈퇴가 정상처리 되었습니다")
        logout()
    }else{
        alert("회원탈퇴가 취소되었습니다")
    }
}