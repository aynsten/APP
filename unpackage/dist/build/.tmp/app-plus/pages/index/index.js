(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3b5c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),i=n("9a0e");function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,a,i,r,o){try{var u=t[r](o),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(a,i)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,i){var r=t.apply(e,n);function u(t){o(r,a,i,u,s,"next",t)}function s(t){o(r,a,i,u,s,"throw",t)}u(void 0)})}}var s={data:function(){return{titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:[],goodsList:[],Selected:[],column:[],like:[]}},onShow:function(){this.loadData()},methods:{loadData:function(){var e=u(a.default.mark(function e(){var n;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=this,t.request({url:i.api+"/api/IndexHome/GetAdvertPosition?advertPositionCode=RotationChart&advertQuantity=all",success:function(t){t.data.statusCode==i.requestsuccess&&(n.carouselList=t.data.data.advertDtos)}}),t.request({url:i.api+"/api/IndexHome/GetAdvertPosition?advertPositionCode=Selected&advertQuantity=all",success:function(t){t.data.statusCode==i.requestsuccess&&(n.Selected=t.data.data,n.Selected.title=t.data.data.advertPositionDto.advertPositionName)}}),t.request({url:i.api+"/api/IndexHome/GetAdvertPosition?advertPositionCode=Like&advertQuantity=all",success:function(t){t.data.statusCode==i.requestsuccess&&(n.like=t.data.data,n.like.title=t.data.data.advertPositionDto.advertPositionName)}});case 4:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),swiperChange:function(t){var e=t.detail.current;this.swiperCurrent=e,this.titleNViewBackground=this.carouselList[e].pColor},navToDetailPage:function(e){t.navigateTo({url:"../product/product?styleID="+e.style})}},onNavigationBarSearchInputClicked:function(){var t=u(a.default.mark(function t(e){return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$api.msg("点击了搜索框");case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onNavigationBarButtonTap:function(e){var n=e.index;if(0===n)t.navigateTo({url:"../public/login"});else if(1===n){var a=getCurrentPages(),i=a[a.length-1],r=i.$getAppWebview();r.hideTitleNViewButtonRedDot({index:n}),t.navigateTo({url:"/pages/notice/notice"})}}};e.default=s}).call(this,n("6e42")["default"])},"5fb0":function(t,e,n){},"660b":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},7375:function(t,e,n){"use strict";(function(t){n("273e"),n("921b");a(n("66fd"));var e=a(n("b351"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b351:function(t,e,n){"use strict";n.r(e);var a=n("660b"),i=n("d253");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("dde0");var o=n("2877"),u=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},d253:function(t,e,n){"use strict";n.r(e);var a=n("3b5c"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},dde0:function(t,e,n){"use strict";var a=n("5fb0"),i=n.n(a);i.a}},[["7375","common/runtime","common/vendor"]]]);