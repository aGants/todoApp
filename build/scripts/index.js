!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);let r=document.querySelector(".today-add__message"),o=document.querySelector(".today-list"),c=[],l="",u="1";function i(e){if(localStorage.getItem(e))return JSON.parse(localStorage.getItem(e));switch(e){case o:return[];case l:return"";case u:return"1"}}function d(e,t){return localStorage.setItem(e,JSON.stringify(t))}function a(){document.querySelector(".lvl-count").innerHTML=String(u),d("lvlnumber",u),d("lvlprogress",l),s()}function s(){let e="";c.forEach((function(t,n){e+=`\n      <li class = 'today-list__item' >\n          <input type = 'checkbox' id = 'item_${n}' ${t.checked?"checked":""}>\n          <label for='item_${n}'>${t.todo}</label> \n          <input type = "image"class = "today-list__item-delete delete" id = "${n}" src = "assets/images/delete.png" >\n      </li>`,o.innerHTML=e,f(),document.querySelector(".header-info__progress").value=l,document.querySelector(".lvl-count").innerHTML=String(u)}))}function f(){document.querySelectorAll(".today-list__item-delete").forEach((function(e){e.addEventListener("click",(function(){let t=e.getAttribute("id"),n=this.parentNode;n.parentNode.removeChild(n),c.splice(t,1),s(),d("todo",c)}))}))}document.querySelector(".lvl-count").innerHTML=String(u),document.addEventListener("DOMContentLoaded",(function(){c=i("todo"),l=i("lvlprogress"),u=i("lvlnumber"),console.log(c,l,u),s(),document.querySelector(".header-info__button").addEventListener("click",(function(){c.forEach((function(e){e.checked=!1,d("todo",c),s()}))})),r.addEventListener("keydown",(function(e){if(13===e.keyCode){if(!r.value)return;let e={todo:r.value,checked:!1};c.push(e),s(),d("todo",c),r.value="",d("lvlprogress",l),d("lvlnumber",u)}})),o.addEventListener("change",(function(e){let t=e.target.getAttribute("id"),n=o.querySelector("[for="+t+"]").innerHTML;c.forEach((function(e){e.todo===n&&(e.checked=!e.checked,d("todo",c),function(e){!0===e.checked?(l=document.querySelector(".header-info__progress").value+=10,d("lvlprogress",l)):(l=document.querySelector(".header-info__progress").value-=10,d("lvlprogress",l))}(e))})),l>=100&&(l=0,u=+u+1,a()),l<0&&(l=100,u=+u-1,a())})),f()}))}]);