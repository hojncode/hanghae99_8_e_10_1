// 날씨 api 이용 실시간 온도 받아오기
function set_temp() {
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            $('#temp').text(response['temp'])

        }
    })
}