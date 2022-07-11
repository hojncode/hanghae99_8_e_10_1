// 로그인 여부 확인 함수
function check_login() {
    $.ajax({
        type: 'POST',
        url: '/islogin',
        data: {},
        success: function (response) {
            let result = response['result'];
            let success = result['success'];
            if (success == 'true') {
                $('.loginture').show();
            } else {
                $('.loginfalse').show();
            }
        }
    });
}

// 로그아웃 함수
function logout() {
    $.removeCookie('mytoken', {path: '/'});
    window.location.href = '/login'
}