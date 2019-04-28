//const 값
var max_check_times = 2;  //최대 확인 시도 횟수
var max_music_obj = 51; //현재 db music_obj에 있는 곡 수

//이전 페이지에서 받아올 값들....
var total_quiz = number; //처음에 풀 문제 수를 받아 올 예정
var _genre = genre;  //선택한 장르 genre = {모두, 발라드, 댄스, 랩/힙합, R&B, 트로트, 락/메탈, 팝}
var _year = decades; //선택한 연도 year = {모두,  00년 이전, 00년대 초반, 00년대 후반, 10년대 초반, 10년대 후반}
//다음 페이지에도 넘길 값
var isPlaying = false;
var correctAnswer = 0;

//let 값
var quiz_number = 1; //현재 문제 번호
var times = 0; //확인 시도 횟수
var answer;
var music;
var qualified_array = [];  //장르, 연도에 따라 만들어질 퀴즈 후보
var preAnswer = [];
var randomNum;
var sec = 15000;

var MakeQuiz = {
  //장르, 연도에 따라 후보 선별하는 메소드
  make_array : function(genre, year){
    for(var i = 0; i < max_music_obj; i++)
      if((genre == 0 || genre == music_obj[i].genre) && (year == 0 || year == music_obj[i].year))
        qualified_array.push(music_obj[i]);
  },
  //후보 중 랜덤 값으로 답 정하는 메소드
  setAnswer : function(){
    randomNum = Math.floor(Math.random()*qualified_array.length);
    for(var i = 0; i<preAnswer.length; i++)
      if(randomNum == preAnswer[i])  return this.setAnswer();
    preAnswer.push(randomNum);
    answer = qualified_array[randomNum].title;
    music = qualified_array[randomNum].src;
    return answer;
  },
  setMusic : function(){
    var target = document.getElementById("music_source");
    target.setAttribute("src", "./mp3/"+music+".mp3");
    console.log("./mp3/"+music+".mp3");
  },
  playMusic : function(){
    var myaudio = document.getElementById("myautoload");
    myaudio.load();
    myaudio.oncanplaythrough = function(){
      myaudio.play();
    };
  },
  //정답 보여주기
  show_qualified_array : function(){
    console.log(randomNum);
    console.log("정답 : " + this.setAnswer());
  },
};

var Check = {
  //확인 시도시에 시행하는 메소드
  check_func : function(){
      var input = document.getElementById('user_answer_input').value;
      var isRight = this.check_answer(input);
      console.log(input+", "+isRight);

      times += 1; //시도 횟수 증가
      this.show_result(isRight, times, max_check_times);
  },
  //입력한 답과 문제의 답이 같은지 판단하는 메소드
  check_answer:function(user_answer){
    if(user_answer == answer) return true;
    else return false;
  },
  //결과 확인 띄우는 메소드
  show_result: function(isRight, times, max_check_times){
    if(isRight) {
      alert("정답!");
      correctAnswer++;
      Next.next_quiz();
    }
    else if(times === max_check_times) {
      alert("실패!");
      Next.next_quiz();
    }
    else alert("틀렸습니다!\n 남은 기회 : "+ (max_check_times - times) +"번");
  }
};

var Next = {
  //다음 문제로
  next_quiz : function(){
    times = 0;
    quiz_number += 1;
    End.isEnd(quiz_number);
  }
};

var New = {
  //장르, 연도에 따른 배열 생성
  setQuizArray : function(){
    MakeQuiz.make_array(_genre, _year);
  },
  //만들어진 배열에서 문제 하나 고르기
  setNewAnswer : function(){
    MakeQuiz.setAnswer();
    console.log(quiz_number+"번 문제");
    //document.getElementById("quiz_number").innerHTML = quiz_number;
    MakeQuiz.show_qualified_array();
    MakeQuiz.setMusic();
    MakeQuiz.playMusic();
    //Time.leftTime();
    //setTimeout("Check.show_result(false, max_check_times, max_check_times)", 15000);
  }
}

var End = {
  //게임이 끝났는지 판단하는 메소드
  isEnd : function(quiz_number){
    if(quiz_number>total_quiz) {
      alert("게임 종료");
      console.log("게임 종료 "+correctAnswer+"개 정답");
      isPlaying = false;
    }
    else New.setNewAnswer();
  }
}
/*
var Time = {
  timer: function(){
  sec -= 1000;
  console.log(sec);
  },
  leftTime : function(){
  setInterval("timer()",1000);
  },
}
*/
//페이지 처음 접속하면서 시행할 것들
window.onload = function(){
  isPlaying = true;
  if(isPlaying){
    New.setQuizArray();
    New.setNewAnswer();
    };
  /*
  document.getElementById("quiz_number").innerHTML = quiz_number;
  MakeQuiz.setMusic;
  MakeQuiz.playMusic;*/

}
