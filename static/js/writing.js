$(document).ready(function(){
    // posting()
});

function posting() {
    console.log("post")
  let location = $('#location').val()
  let workout = $("#workout").val()
  let address = $("#address").val()
  let comment = $("#comment").val()

  let file = $('#input-image')[0].files[0]
    console.log(file)
  let form_data = new FormData()

  form_data.append("file_give", file)
  form_data.append("location_give", location)
  form_data.append("workout_give", workout)
  form_data.append("address_give", address)
  form_data.append("comment_give", comment)
    console.log(form_data)
  $.ajax({
      type: "POST",
      url: "/post",
      data: form_data,
      cache: false,
      contentType: false,
      processData: false,
      success: function (response) {
          alert(response["msg"])
          window.location.replace("/")
      }
  });
}

function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if(input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("preview-image")
            previewImage.src = e.target.result
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}
// input file에 change 이벤트 부여
const inputImage = document.getElementById("input-image")
inputImage.addEventListener("change", e => {
    readImage(e.target)
})