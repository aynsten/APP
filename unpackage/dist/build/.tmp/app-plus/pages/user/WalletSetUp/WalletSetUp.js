(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/WalletSetUp/WalletSetUp"],{1345:function(e,t,a){"use strict";(function(e){a("273e"),a("921b");n(a("66fd"));var t=n(a("89c3"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},7935:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("9a0e"),o={data:function(){return{wechatId:"",name:"",mobile:"",userInfo:{}}},onShow:function(){var t=this;e.getStorage({key:"userInfo",success:function(e){t.userInfo=e.data},fail:function(e){e.data}}),e.request({url:n.api+"/api/CustomerWallet/GetCustomerWallet",header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},success:function(e){e.data.statusCode==n.requestsuccess&&(t.wechatId=e.data.data.wechatId,t.name=e.data.data.name,t.mobile=e.data.data.mobile)}})},methods:{send:function(){var t=this;""!=this.wechatId?""!=this.name?""!=this.wechatId?e.request({url:n.api+"/api/CustomerWallet/UpdateCustomerWallet",method:"POST",header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},data:{wechatId:this.wechatId,name:this.name,mobile:this.mobile},success:function(t){t.data.statusCode==n.requestsuccess&&e.showModal({content:"信息保存成功",showCancel:!1}),setTimeout(function(){e.navigateTo({url:"../Wallet/Wallet"})},2e3)}}):e.mobile({content:"手机号不能为空",showCancel:!1}):e.showModal({content:"姓名不能为空",showCancel:!1}):e.showModal({content:"微信号不能为空",showCancel:!1})}}};t.default=o}).call(this,a("6e42")["default"])},"883a":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"89c3":function(e,t,a){"use strict";a.r(t);var n=a("883a"),o=a("e998");for(var u in o)"default"!==u&&function(e){a.d(t,e,function(){return o[e]})}(u);a("de29");var s=a("2877"),c=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=c.exports},b893:function(e,t,a){},de29:function(e,t,a){"use strict";var n=a("b893"),o=a.n(n);o.a},e998:function(e,t,a){"use strict";a.r(t);var n=a("7935"),o=a.n(n);for(var u in n)"default"!==u&&function(e){a.d(t,e,function(){return n[e]})}(u);t["default"]=o.a}},[["1345","common/runtime","common/vendor"]]]);