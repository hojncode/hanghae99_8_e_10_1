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
                                        <div class="heart" onclick="hello()"></div>
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

//하트연습
function hello()  {
    alert("좋아요!");
}

//댓글
//타임스템프 만들기
function generateTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time = year+'-'+month+'-'+wDate+' '+hour+':'+min+':'+sec;
    return time;

}

//유저이름 발생기
//유저이름은 8글자로 제한.
function generateUserName(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var makeUsername = '';
    for(let i=0; i<4;i++){
        let index = Math.floor(Math.random(10) * alphabet.length);
        makeUsername += alphabet[index];
    }
    for(let j=0;j<4;j++){
        makeUsername += "*";
    }
    return makeUsername;
}

function numberCount(event){
    console.log(event.target);
    if(event.target === voteUp){
        console.log("2");
      return voteUp.innerHTML++;

    }else if(event.target === voteDown){
      return voteDown.innerHTML++;
    }

}

function deleteComments(event){
    const btn = event.target;
    const list = btn.parentNode.parentNode;//commentList
    rootDiv.removeChild(list);
    //메인댓글 카운트 줄이기.
    if(mainCommentCount.innerHTML <='0'){
        mainCommentCount.innerHTML = 0;
    }else{
        mainCommentCount.innerHTML--;
    }
}


//댓글보여주기
function showComment(comment){
    const userName = document.createElement('div');
    const inputValue = document.createElement('span');
    const showTime = document.createElement('div');
    const voteDiv = document.createElement('div');
    const countSpan = document.createElement('span')
    const voteUp = document.createElement('button');
    const voteDown = document.createElement('button');
    const commentList = document.createElement('div');
    //삭제버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.className ="deleteComment";
    delBtn.innerHTML="삭제";
    commentList.className = "eachComment";
    userName.className="name";
    inputValue.className="inputValue";
    showTime.className="time";
    voteDiv.className="voteDiv";
    //유저네임가져오기
    userName.innerHTML = generateUserName();
    userName.appendChild(delBtn);
    //입력값 넘기기
    inputValue.innerText = comment;
    //타임스템프찍기
    showTime.innerHTML = generateTime();
    countSpan.innerHTML=0;

    //댓글뿌려주기
    commentList.appendChild(userName);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    commentList.appendChild(voteDiv);
    rootDiv.prepend(commentList);

    voteUp.addEventListener("click",numberCount);
    voteDown.addEventListener("click",numberCount);
    delBtn.addEventListener("click",deleteComments);
   console.dir(rootDiv);

}



//버튼만들기+입력값 전달
function pressBtn(){
   const currentVal = inputBar.value;

   if(!currentVal.length){
      alert("댓글을 입력해주세요!!");
   }else{
      showComment(currentVal);
      mainCommentCount.innerHTML++;
      inputBar.value ='';
   }
}

btn.onclick = pressBtn;
