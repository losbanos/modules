# Lazy Load 3  [![dependencies Status](https://david-dm.org/boennemann/badges/status.svg)](https://david-dm.org/boennemann/badges) [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)


### Description ###

### Usages ###
 **Html**  
   
**추가되어야 할 파일**  
```html
<script type="text/javascript" src="path/js/modules.js"></script>
```
기존 img tag  
```html
<img src="images/filename.jpg" />
```
변경
```html
<img class="lazy" src="" data-original="images/filename.jpg" />
```
**Javascript**  
```js
$(selector).lazyload3()
```
**Options**  
`minHeight` :   
* 이미지 최소 높이 설정(px), lazyload 의 특성상 이미지의 기본 높이가 필요합니다.  
* 기본설정 : 500px
    
```js
$('.lazy').lazyload3({minHeight: 500})
```