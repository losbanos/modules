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
    * 
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
trigger 를 변경한 경우 탭컨텐츠의 아이디 값을 참조할 별도로 속성이 필요할 수 있습니다.  
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