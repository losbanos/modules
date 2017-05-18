# Tab  [![dependencies Status](https://david-dm.org/boennemann/badges/status.svg)](https://david-dm.org/boennemann/badges) [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)


### Description ###
jQuery 기반 탭 플러그인 입니다.  

### Denpendencies ###
* jQuery 1.7.1 over
  
### Features ###
* 마크업 구조에 대한 의존성을 최소화
* Tab contents 내부의 bxslider 제어
* Tab contents 내부의 jwplayer 제어
    * 기존 마크업에 대한 추가/수정 필요.
* 기존 `js-tab-type` 으로 시작되는 탭 스크립트 비활성화

### Usages ###
 **Html Template**  
   ```html
<div id="tab_buttons">
    <a href="#content_1">Tab 1</a>
    <a href="#content_2">Tab 2</a>
    <a href="#content_3">Tab 3</a>
</div>

<div id="content_1">Tab Content 1</div>
<div id="content_2">Tab Content 2</div>
<div id="content_3">Tab Content 3</div>

<script type="text/javascript">
$(document).ready(function () {
	$('#tab_buttons').tab();
})
</script>
```

**Script**
  ```js
$(selector).tab([options]);
```
* selector 는 탭 버튼들을 자식요소로 가진 컨테이너 선택자입니다.
* selector 의 자식 요소중 a 태그를 찾아서 click 이벤트를 바인딩합니다.
* a 태그와 href 속성이 필요합니다.
* 각 탭버튼의 href 속성값과, 탭 컨텐츠의 id 명이 일치해야 합니다. 
* 기본적으로 click event 가 바인딩된 a 태그에 활성화 css 클래스가 추가됩니다.  
    만약 탭 버튼 활성화 클래스명이 `on` 이면   
    탭 버튼 클릭시 활성화된 탭은 `<a href="#content_1" class="on">Tab 1</a>` 의 형태가 됩니다.  
    
* 만약 다른 요소에 활성화 클래스를 추가해야 하는 경우 옵션을 주면 됩니다.  
  
```js
$(selector).tab({
    triggers: selector
});
// usage
$('#tab_buttons').tab({triggers: 'li'});

```

위의 경우 click event 는 a 가 아닌 li 요소에 바인딩되며 li 태그에 활성화 클래스(예: `on`)가 추가됩니다  
trigger 를 변경한 경우 트리거가 참조할 탭 컨텐츠의 아이디 값을 저장할 별도의 속성이 필요할 수 있습니다.  
기본값 : `href`  
a 태그와 href 속성을 다른 것으로 변경하고 싶은 경우  


**Example**
```html
<div id="tab_buttons">
    <li data-content="#content_1"><a href="#;">Tab 1</a></li>
    <li data-content="#content_2"><a href="#;">Tab 2</a></li>
    <li data-content="#content_3"><a href="#;">Tab 3</a></<li>
</div>

<div id="content_1">Tab Content 1</div>
<div id="content_2">Tab Content 2</div>
<div id="content_3">Tab Content 3</div>
<script>
$('#tab_buttons').tab({
    triggers: selector,
    triggerAttr: 'data-content'
})
</script>
```  
### Options ### 
 **default**  
기본으로 활성화시킬 탭 인덱스 , 1부터 시작.  
```json
base: 1  
type: integer
```  
  
**contents**  
탭 컨텐츠 선택자
```json
default: ''
type: String
examples: '.contents, #tab'
```  
  
**activeClassName**  
활성화 클래스명
```json
default: 'on'     
type: String
```  

**sliders**  
탭 변경시 제어해야하는 슬라이드 선택자들  
활성화된 탭컨텐츠안에서 해당 슬라이드를 검색하여 리로딩합니다.  
```json
default: ['.bxslider-lazy']
type: Array or String
```
    
**players**  
탭 변경시 제어해야하는 플레이어 선택자들  
활성화된 탭 컨텐츠에서 해당 플레이어를 검색하여 탭이 활성화 될때 이전 탭은 플레이 중지하고 현재탭은 영상을 자동으로 플레이합니다.  
```json
default: []
type: Array or String
ex: ['#player_1', '#player_2']
```
      
### 기존 탭 스크립트에 대한 제어 ###  
`m.js` : modules.min.js  
`b.js` : 기존의 탭 제어 스크립트가 포함된 스크립트 파일  
  
**m.js 가 b.js 보다 늦게 선언/호출된 경우**
  ```js
$(selector).tab({triggers: 'li'});
```  
    

tab 함수를 호출하면 기본적으로 현재 선택자의 탭 버튼 a 에 걸린 클릭 이벤트가 해제됩니다.  
기존 탭 버튼의 대부분이 a 태그에 클릭이 걸려 있다는 전제하에 내부적으로 처리되어 있습니다   
기존 탭 버튼이 a 태그가 아닌 태그에 클릭이 걸려있을 경우  
oldTabPrefix 옵션을 추가해주어야 합니다.
```json
oldTabPrefix : Array
```
```js
//Usage
$(selector).tab({triggers: 'li', oldTabPrefix: ['.js-other-tab', '.js-other-tab2']});
```


**m.js 가 b.js 보다 먼저 선언/호출된 경우**  
<br />
b.js 파일 안에  
기존 탭을 제어하는 코드 아래쪽에 다음의 코드를 추가합니다.  
```js
$(window).trigger('old-tab');
```
  
a 태그가 아닌 다른 태그에 클릭 이벤트가 걸려있을 경우  
```js
$(window).trigger('old-tab', ['.js-other-tab']);
```  
  


  
