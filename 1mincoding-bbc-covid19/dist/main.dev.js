"use strict";

// 전역변수 사용을 회피하기 위한 즉시실행 익명함수
// 이 안에 들어있는 변수는 여기서만 사용 가능. 전역으로 사용하면, 충돌 위험.
// JS에선 지역적으로 할 필요가 있고, 함수 자체는 실행이 되어야만 사용할 수 있어서 즉시사용 익명함수 적용.
(function () {
  var actions = {
    birdFlies: function birdFlies(flag) {
      if (flag) {
        //윈도우 창 크기만큼 이동
        document.querySelector('[data-index="2"] .bird').style.transform = "translateX(".concat(window.innerWidth, "px)");
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = "translateX(-100%)"; //다시 원래 위치로 보내기
      }
    },
    birdFlies2: function birdFlies2(flag) {
      if (flag) {
        //위로 올라가게 하기 위해 - 붙이고, 70%만 이동
        document.querySelector('[data-index="5"] .bird').style.transform = "translate(".concat(window.innerWidth, "px, ").concat(-window.innerHeight * 0.7, "px)");
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = "translateX(-100%)"; //다시 원래 위치로 보내기
      }
    }
  }; //HTML 안의 코드를 노가다로 채우는 것이 아닌, JS 함수로 자동 채우기

  var stepElems = document.querySelectorAll('.step');
  var graphicElems = document.querySelectorAll('.graphic-item'); //현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정

  var currentItem = graphicElems[0];
  var ioIndex; //Intersection Observer 
  //눈에 보이는지, 사라졌는지, 얼마 비율만큼 사라지는지 등등 다양한 옵션
  //IO는 우리가 보는걸 기준으로 처리하기 때문에, 새로고침을 하게 되면 제대로 동작하지 않음. 스크롤을 다시 해야지 동작..

  var io = new IntersectionObserver(function (entries, observer) {
    // 콘솔창에 검정색(문자열), 파란색(숫자)
    // 문자열을 숫자로 바꾸기? 끝에 * 1 붙이기.
    ioIndex = entries[0].target.dataset.index * 1; // console.log(ioIndex);
  });

  for (var i = 0; i < stepElems.length; i++) {
    //stepElems 에다가 옵져버를 붙임
    //옵져버 붙인 녀석들이 사라지거나 나타날때마다 위의 콜백함수가 실행
    io.observe(stepElems[i]); // stepElems[i].dataset.index = i;

    stepElems[i].setAttribute('data-index', i);
    graphicElems[i].setAttribute('data-index', i);
  }

  function activate(action) {
    currentItem.classList.add('visible');

    if (action) {
      actions[action](true);
    }
  } //장면이 비활성화시 실행


  function inactivate(action) {
    currentItem.classList.remove('visible');

    if (action) {
      actions[action](false);
    }
  } //이벤트 핸들러는 조건판별만. 세부 기능들은 각 함수로 분리하는게 좋음.


  window.addEventListener('scroll', function () {
    var step;
    var boundingRect;
    var temp = 0; // for (let i = 0; i < stepElems.length; i++){

    for (var _i = ioIndex - 1; _i <= ioIndex + 1; _i++) {
      step = stepElems[_i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect(); // console.log(boundingRect.top);

      temp++;

      if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
        // console.log(step.dataset.index);
        // 기존 아이템을 비활성화시키고 다시 
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    } // console.log(temp);

  }); //새로고침하면 맨 처음으로 이동

  window.addEventListener('load', function () {
    //setTimeout() : 타이밍 상 지연을 시켜야지, 제대로 동작함 0.1초 정도 지연
    //scrollTo(x방향, y방향) : 0,0으로 하면 올라감 
    setTimeout(function () {
      return scrollTo(0, 0);
    }, 100);
  });
  activate();
})();