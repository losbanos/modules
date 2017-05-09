# BxSlider For Lazyload  [![dependencies Status](https://david-dm.org/boennemann/badges/status.svg)](https://david-dm.org/boennemann/badges) [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)

### Description ###
bxslider 기본 세팅 및 슬라이더 컨텐츠의 내부 이미지에 대한 lazyload가 적용된 라이브러리입니다.    
해당 라이브러리는 common.js 에 대한 dependency 가 있습니다.(dependencies 참조)  
  
#### Dependencies ####
* [jQuery 1.7.1 over](http://code.jquery.com/jquery-1.10.1.min.js)
* [Bxslider](https://github.com/stevenwanderski/bxslider-4)
* [Common.js](http://222.122.229.21/guide/modules/blob/master/src/common/common.js)


### Usage ###  
**Call Script**  
```html
<script type="text/javascript" src="path/jquery.min.js"></script>
<script type="text/javascript" src="path/bxslider.min.js"></script>
<script type="text/javascript" src="path/common.js"></script>
<script type="text/javascript" src="path/bxlazy.js"></script>
```
**HTML Template**  
```html
<ul class="bxslider" data-mode="horizontal" data-auto="true" data-controls="true">
    <li><img class="bx-lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_01.jpg"></li>
    <li><img class="bx-lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_02.jpg"></li>
    <li><img class="bx-lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_03.jpg"></li>
</ul>
```

**Call Function**
```js
// in Document Ready 
$(selector).setBxSlider([options])
//Usage
$('.bxslider').setBxSlider()
```

#### Warning ####
만약 lazyload3 를 동시에 사용하는 페이지일 경우 ( Assumed to most case )  
bxslider의  img node 에 선언될 bx-lazy 클래스는 lazyload3 가 호출하는 클래스명과 구분되어야 합니다.  
  
slider의 lazy 와 일반 img node 의 lazy는 별개의 progress 를 거칩니다.  
lazyload3 의 선택자와 bxslider img node 의 선택자가 동일할 수 없습니다.  

```html
<!-- ↓ normal lazyload img node ↓ -->
<div class="other-elements">
    <img class="lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_01.jpg" />
</div>

<!-- ↓ set bxslider ↓ -->
<ul class="bxslider" data-mode="horizontal" data-auto="true" data-controls="true">
    <li><img class="lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_01.jpg"></li>
    <li><img class="lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_02.jpg"></li>
    <li><img class="lazy" src="" data-original="http://image.hackers.ac/images/event/2017/0508/img_07_03.jpg"></li>
</ul>
```
```js
$('.lazy').lazyload3();
$('.bxslider').setBxSlider()
```

위의 경우 오류 혹은 정상적인 동작이 되지 않을 수 있음  
