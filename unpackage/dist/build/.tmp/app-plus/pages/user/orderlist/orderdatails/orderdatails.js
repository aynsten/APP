(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/orderlist/orderdatails/orderdatails"],{"068e":function(t,e,n){},"17c9":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"3d7e":function(t,e,n){"use strict";var a=n("068e"),r=n.n(a);r.a},"7e35":function(t,e,n){"use strict";(function(t){n("273e"),n("921b");a(n("66fd"));var e=a(n("b309"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},a277:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("9a0e"),r={data:function(){return{addressData:{},datagroup:{}}},onLoad:function(t){this.orderNo=t.orderNo},onShow:function(){var e=this;t.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data},fail:function(t){t.data}}),t.request({url:a.api+"/api/Order/GetOrderDetail?orderNo="+e.orderNo,header:{Authorization:this.userInfo.token_type+" "+this.userInfo.access_token},success:function(t){t.data.statusCode==a.requestsuccess&&(e.datagroup=t.data.data)}})}};e.default=r}).call(this,n("6e42")["default"])},b309:function(t,e,n){"use strict";n.r(e);var a=n("17c9"),r=n("c272");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("3d7e");var o=n("2877"),c=Object(o["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},c272:function(t,e,n){"use strict";n.r(e);var a=n("a277"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=r.a}},[["7e35","common/runtime","common/vendor"]]]);