// ++ 사용변수

const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];


const wordInput = document.querySelector('.word-input')
//클래스가 word-input인 태그(이하 검색창)를 상수로 지정
const wordDisplay = document.querySelector('.word-display')
// 입력해야할 단어를 상수로 지정
const scoreDisplay = document.querySelector('.score');
//획득 점수를 상수로 지정
const timeDisplay = document.querySelector('.time')
// 제한 시간을 상수로 지정
const button = document.querySelector('.button')



// 사용하는 변수들을 화면에 렌더링됬을 때 선언하기 위해 만드는것 (뭔말인지 모르겠음)

init(); {} //뭔지 모름

function init() {
    buttonChange('게임로딩중...')
    getWords();
    wordInput.addEventListener('input' , checkMatch) //뭔지 모름
}




// * 게임 실행 *
function run() {
    if(isPlaying){
        return;                    //게임 실행중에 버튼 활성화 되지 않게 해줌
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000); //모르는거
    checkInterval = setInterval(checkStatus,50)  //50초동안 계속 상태를 체크
    buttonChange('게임중')
}



// *게임 종료*
function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange('게임시작')
        clearInterval(checkInterval)
    }
}


// * 단어 불러오기 *
function getWords() {
    // axios 코드
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

       
}


// * 단어일치 체크 *
function checkMatch () {
    if(wordInput.value.toLowerCase() ===  wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying) {
            return;              //if 문이 실행되면 밑에 있는 내용은 실행이 안되고 함수 종료
        }
        score++;   
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.ramdom() *words.length); //랜덤한 숫자 발생
        wordDisplay.innerHTML = words[randomIndex]  //발생한 랜덤숫자와 같은 인덱스 번호를 가진 단어가 도출
        
       }

}
// === 연산자를 넣으면 대문자까지 철저하게 맞아야 true로 인식, 소문자도 true로 인식하게끔 tolowerCase() 메소드 적용.
// if문 해석 : wordInput 과 wordDisplay 이 같다면 score에 1점 올리고 1점 표시를 해라. 그 다음 wordInput 의 값을 초기화 시켜라. 






// * 카운트다운 구현 *
function countDown(){
    //삼항 연산자 : (조건) ? 참일경우 : 거짓일 경우
    time > 0 ? time -- : isPlaying = false;    
    //해석 못하겠음. 
    if(!isPlaying) {
        clearInterval(timeInterval)
    } // isPlaying = false 일 때 실행되는 것 ( !isplaying = isPlaying = false) <--확실하지 않음

    timeDisplay.innerText = time;
}


// * 버튼색깔 활성화 구현 *
function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
    //버튼 글자가 '게임시작'이면 css의 .loading을 삭제하고, 그렇지 않으면 추가해라. 
}

