(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/DistributionList/DistributionList"],{"0416":function(t,e,n){"use strict";(function(t){n("273e"),n("921b");a(n("66fd"));var e=a(n("6a07"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"190c":function(t,e,n){"use strict";n.r(e);var a=n("6c0f"),u=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=u.a},"6a07":function(t,e,n){"use strict";n.r(e);var a=n("f707"),u=n("190c");for(var r in u)"default"!==r&&function(t){n.d(e,t,function(){return u[t]})}(r);n("ad12");var i=n("2877"),o=Object(i["a"])(u["default"],a["a"],a["b"],!1,null,"d5457798",null);e["default"]=o.exports},"6c0f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("9a0e"),u={data:function(){return{listdata:[],userInfo:{}}},onShow:function(){var e=this;t.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data},fail:function(t){t.data}}),t.request({url:a.api+"/api/CustomerDistributor/MyDistributorPagedList",method:"POST",data:{pageIndex:1,pageSize:10,sortBy:"Sc_TimeCreated",sortType:"desc"},header:{Authorization:e.userInfo.token_type+" "+e.userInfo.access_token},success:function(t){t.data.statusCode==a.requestsuccess&&(e.listdata=t.data.data.items)}})},methods:{}};e.default=u}).call(this,n("6e42")["default"])},ad12:function(t,e,n){"use strict";var a=n("bdd9"),u=n.n(a);u.a},bdd9:function(t,e,n){},f707:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})}},[["0416","common/runtime","common/vendor"]]]);