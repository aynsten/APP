(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"32c7":function(e,t,s){"use strict";var o=s("672a"),a=s.n(o);a.a},"3f97":function(e,t,s){"use strict";s.r(t);var o=s("fd46"),a=s("722a");for(var r in a)"default"!==r&&function(e){s.d(t,e,function(){return a[e]})}(r);s("32c7");var n=s("2877"),c=Object(n["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},"672a":function(e,t,s){},"722a":function(e,t,s){"use strict";s.r(t);var o=s("c329"),a=s.n(o);for(var r in o)"default"!==r&&function(e){s.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},b15c:function(e,t,s){"use strict";(function(e){s("273e"),s("921b");o(s("66fd"));var t=o(s("3f97"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("6e42")["createPage"])},c329:function(e,t,s){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(s("a34a")),r=s("9a0e");function n(e){return e&&e.__esModule?e:{default:e}}function c(e,t,s,o,a,r,n){try{var c=e[r](n),i=c.value}catch(u){return void s(u)}c.done?t(i):Promise.resolve(i).then(o,a)}function i(e){return function(){var t=this,s=arguments;return new Promise(function(o,a){var r=e.apply(t,s);function n(e){c(r,o,a,n,i,"next",e)}function i(e){c(r,o,a,n,i,"throw",e)}n(void 0)})}}var u=function(){return s.e("components/uni-number-box").then(s.bind(null,"bb8d"))},d=function(){return s.e("components/share").then(s.bind(null,"a5e8"))},l={components:{share:d,uniNumberBox:u},data:function(){return{specClass:"none",specSelected:[],favorite:!1,shareList:[],specList:[{id:2,name:"颜色",field:"styleColorDtos"},{id:1,name:"尺码",field:"styleSizeDtos"}],specChildList:[],styleID:"",datagroup:{},userInfo:{},hasLogin:!1,pType:0,num:1,sendorderlist:[],orderPrice:0,cartList:[]}},onLoad:function(){var e=i(a.default.mark(function e(t){return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.styleID=t.styleID;case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),onShow:function(){this.loaddata(),this.WhetherCollection(),e.removeStorage({key:"sendorderlist"})},methods:{loaddata:function(){var t=this;e.getStorage({key:"userInfo",success:function(e){t.userInfo=e.data,t.pLevel=e.data.customer.pLevel},fail:function(e){e.data}}),e.getStorage({key:"hasLogin",success:function(e){t.hasLogin=e.data},fail:function(e){""==e.data&&(t.hasLogin=!1)}}),e.request({url:r.api+"/api/StyleERP/GetStyleItemByStyleID?styleID="+t.styleID,success:function(e){if(e.data.statusCode==r.requestsuccess){t.datagroup=e.data.data;var s=e.data.data.styleSizeDtos,o=e.data.data.styleColorDtos,a=[];s.forEach(function(e,t){e.id=100+t,e.pid=1,e.name=e.size,a.push(e)}),o.forEach(function(e,t){e.id=t,e.pid=2,e.name=e.color,a.push(e)}),t.specChildList=a}}})},WhetherCollection:function(){var t=this;e.request({url:r.api+"/api/CustomerCollect/IsExist?style="+t.styleID,header:{Authorization:this.userInfo.token_type+" "+this.userInfo.access_token},success:function(e){e.data.statusCode==r.requestsuccess&&(t.favorite=e.data.data)}})},toggleSpec:function(){var e=this;"show"===this.specClass?(this.specClass="hide",setTimeout(function(){e.specClass="none"},250)):"none"===this.specClass&&(this.specClass="show")},selectSpec:function(e,t){var s=this,o=this.specChildList;o.forEach(function(e){e.pid===t&&s.$set(e,"selected",!1)}),this.$set(o[e],"selected",!0),this.specSelected=[],o.forEach(function(e){!0===e.selected&&s.specSelected.push(e)})},toFavorite:function(){var t=this;0==t.favorite?e.request({url:r.api+"/api/CustomerCollect/InsertCustomerCollect?style="+t.styleID,method:"POST",header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},success:function(e){e.data.statusCode==r.requestsuccess&&(t.favorite=!0,t.WhetherCollection(),t.$api.msg("收藏成功！"))}}):e.request({url:r.api+"/api/CustomerCollect/DeleteCustomerCollect?style="+t.styleID,method:"POST",header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},success:function(e){e.data.statusCode==r.requestsuccess&&(t.favorite=!1,t.WhetherCollection(),t.$api.msg("取消收藏成功！"))}})},numberChange:function(e){this.num=e.number},buy:function(){var t=this;this.specSelected.length<2?e.showModal({content:"请选择规格",showCancel:!1,success:function(e){e.confirm&&(t.specClass="show")}}):this.hasLogin?(e.getStorage({key:"hasLogin",success:function(e){t.hasLogin=e.data,console.log(o(e.data," at pages\\product\\product.vue:344"))},fail:function(e){""==e.data&&(t.hasLogin=!1)}}),0!=t.pType&&1!=t.pType||(t.orderPrice=t.datagroup.price),2==t.pType&&(t.orderPrice=t.datagroup.provincialPrice),3==t.pType&&(t.orderPrice=t.datagroup.cityPrice),4==t.pType&&(t.orderPrice=t.datagroup.regionPrice),t.datagroup.styleID=t.styleID,t.datagroup.orderQty=t.num,t.datagroup.orderPrice=t.orderPrice,t.datagroup.specSelected=t.specSelected,t.datagroup.checked=!0,t.sendorderlist[0]=t.datagroup,e.setStorage({key:"sendorderlist",data:t.sendorderlist}),e.navigateTo({url:"../order/sendorder"})):e.showModal({content:"请登录后再进行操作!",showCancel:!1,success:function(t){t.confirm&&e.navigateTo({url:"../public/login"})}})},addcart:function(){var t=this,s=this;if(e.getStorage({key:"cartList",success:function(e){s.cartList=e.data}}),this.specSelected.length<2)e.showModal({content:"请选择规格",showCancel:!1,success:function(e){e.confirm&&(s.specClass="show")}});else{0!=s.pType&&1!=s.pType||(s.orderPrice=s.datagroup.price),2==s.pType&&(s.orderPrice=s.datagroup.provincialPrice),3==s.pType&&(s.orderPrice=s.datagroup.cityPrice),4==s.pType&&(s.orderPrice=s.datagroup.regionPrice),s.datagroup.styleID=s.styleID,s.datagroup.orderQty=s.num,s.datagroup.orderPrice=s.orderPrice,s.datagroup.specSelected=s.specSelected,s.datagroup.checked=!0;var o=0;0!=s.cartList.length&&s.cartList.filter(function(e){return e.styleID==s.datagroup.styleID&&e.specSelected[0].name==s.specSelected[0].name&&e.specSelected[1].name==s.specSelected[1].name}).forEach(function(e){o=1,e.orderQty=e.orderQty+1,t.$api.msg("宝贝已成功添加购物车!")}),0==o&&(s.cartList.push(s.datagroup),this.$api.msg("宝贝已成功添加购物车!")),e.setStorage({key:"cartList",data:s.cartList})}},stopPrevent:function(){}}};t.default=l}).call(this,s("6e42")["default"],s("0de9")["default"])},fd46:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];s.d(t,"a",function(){return o}),s.d(t,"b",function(){return a})}},[["b15c","common/runtime","common/vendor"]]]);