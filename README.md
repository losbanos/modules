# Modules  [![dependencies Status](https://david-dm.org/boennemann/badges/status.svg)](https://david-dm.org/boennemann/badges) [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)

Common JS Libraries for Hackers Publish Team  

* 해커스 퍼블리시팀 공통 js 입니다.
* Version build - 0.7.1
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### Structure ###
* `src/`  : 개발용 폴더
* `dist/*`: 배포용.
* 각 src 폴더는 각 기능 개발용 소스/폴더입니다.  
* dist 폴더는 차후 src 와 동일한 폴더 구조를 가지게 될 예정이며 통합 js 파일도 동시에 제공할 예정입니다.  

### Features ###
* jQuery-floating : 제이쿼리 기반 플로팅배너 (추가예정)
* jQuery-tab      : 제이쿼리 기반 탭 플러그인 (추가예정)  
* SetBxSlider     : bx 슬라이더 업데이트 및 탭 연동 (업데이트 예정)
* lazyload : 스크률 및 뷰포트 인지에 따른 이미지 순차로드. 
* modules: 통합 js 파일

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

### Who do I talk to? ###
일단 메서드 네임은 좀 거지같으니 이따가 바꿀께연.  
* Repo owner or admin
* Other community or team contact