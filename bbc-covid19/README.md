# 인터랙티브_BBC_1분코딩
## CSS
### 박싱사이즈
`box-sizing: border-box;`
콘텐츠의 테두리까지도 사이즈처럼 취급함. 이걸 설정하면, 좀 더 크기 셋팅하기 쉬움. 모든 요소`*{}` 에 추가하면 관리가 편해짐.

### 콘텐츠 중앙 정렬
`margin: 0 auto;`

### 포지션에 따른 z-index
`position: relative;`
기본값은 `static` . 만약 기본값이 아니라면 기본적으로 z-index가 설정되고 아래에 있는 엘리먼트의 인덱스가 더 높아진다. 즉, `position: relative;` 하면 그건 기본 요소보다 위에 위치

### 스티키 포지션
``` 
position: sticky; 
top: 0;
```
이걸쓰면, 해당 요소가 top의 위치에 고정되었다가 떨어진다.

### 보였다가, 안보였다가
```
    opacity: 0;
    transition: 0.5s;
```
기본 요소들에게 모두 투명도 0(안보이게)를 주고, 애니매이션을 걸면 0으로 0.5초만에 변한다.
그리고, `visible` 클래스를 만들어서 `opacity : 1;`  로 설정. JS를 통해 제어한다.

## JS
### 기본 셋팅
`(()=>{})();`
실행되어야지 안에 있는 변수나 기능들이 동작함. `익명함수();` 의 형태로 바로 실행되도록 설정한다.
**전역변수 사용을 회피하기 위한 즉시실행 익명함수 (전역 변수 사용시, 충돌 위험

### HTML 내 속성으로 가져오기
**모든 태그 가져오기(배열로)**
`const graphicElems = document.querySelectorAll(‘.graphic-item’);`

**단일 태그 가져오기**
`document.querySelector('[data-index="2"] .bird')`

### Intersection Observer 
눈에 보이는지, 사라졌는지, 얼마 비율만큼 사라지는지 등등 다양한 옵션을 제공
*1) 선언*
```   
const io = new IntersectionObserver((entries, observer) => {
		 // taget이라는 속성값에서 'data-index' 로 되어있는거 가져옴
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex);
});
```
생성한 뒤, (entries, observer) 파라메터를 받는 콜백함수로 어떤 기능할지 선언

*2) 사용*
`io.observe(stepElems[4]);`
io의 옵져버기능을 통해 4번 stepElems에다가 감시자를 붙임.

### 속성값 붙이기(data-)
JS에는 `data-` 로 시작하는 고유 속성값이 존재.
1.  `stepElems[i].setAttribute('data-index', i);`
속성값을 추가하는 흔한 방법. `data-index-0` 이런식으로 추가된다.

2. `stepElems[i].dataset.yourname = i;`
자체적으로 존재하는 dataset 함수를 통해, index라는 명명규칙을 지정하는 방법

### data-index
HTML 태그의 요소들을 제어하기 위해, 각 요소마다 변수명처럼 설정하는 과정.
왜냐면, 일일이 document.querySelectorAll(‘.graphic-item’) 로 가져오기 힘들잖아;

### 엘리먼트 페이지의 위치 알아내기
`DOM.getBoundingClientRect()`
해당 요소(element)의 다양한 값에 대해서 정보를 가져올 수 있음
	* top or y // 화면 상단 부터 대상의 처음 위치 값
	* bottom // 화면 상단 부터 대상의 끝 위치 값
	* left or x // 화면 좌측 부터 대상의 처음 위치 값
	* right // 화면 좌측 부터 대상의 끝 위치 값
	* width // 대상의 길이
	* height // 대상의 높이

### 클래스를 추가하고 지우기(visible 제어)
*class 추가하기* `item.classList.add(‘visible’);`
*class 지우기* `item.classList.remove(‘visible’);`

### 기타 팁 들
1. 이벤트 핸들러 안에는 조건판별만. 세부 기능들은 모두 함수형태로 분리하는게 좋음.
2. 콘솔창에 검정색(문자열), 파란색(숫자)로 나타남
3. 문자열을 쉽게 숫자로 바꾸는 방법 : `* 1` 
