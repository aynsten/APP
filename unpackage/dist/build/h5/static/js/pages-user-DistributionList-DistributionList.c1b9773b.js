(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-DistributionList-DistributionList"],{"190c":function(t,e,a){"use strict";a.r(e);var i=a("cdb9"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=s.a},"6a07":function(t,e,a){"use strict";a.r(e);var i=a("9f15"),s=a("190c");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("88cb");var r=a("2877"),c=Object(r["a"])(s["default"],i["a"],i["b"],!1,null,"5cda32e2",null);e["default"]=c.exports},"88cb":function(t,e,a){"use strict";var i=a("a70c"),s=a.n(i);s.a},"9a0e":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.requesterror=e.requestsuccess=e.api=void 0;var i="http://10.9.0.6:11156";e.api=i;var s=1;e.requestsuccess=s;var n=2;e.requesterror=n},"9f15":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"list"},[t.listdata.length<=0?a("v-uni-image",{staticStyle:{width:"100%"},attrs:{src:"../../../static/notdata.png",mode:"widthFix"}}):t._e(),t._l(t.listdata,function(e,i){return a("v-uni-view",{key:i,staticClass:"list-item"},[a("v-uni-view",{staticClass:"describe"},[a("v-uni-view",{},[t._v("账号"),a("v-uni-text",{staticClass:"name"},[t._v(":"+t._s(e.phoneAccount))])],1),a("v-uni-view",{},[t._v("客户名称"),a("v-uni-text",{staticClass:"customerName"},[t._v(": "+t._s(e.customerName))])],1)],1)],1)})],2)],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},a70c:function(t,e,a){var i=a("ce72");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("e2b4a180",i,!0,{sourceMap:!1,shadowMode:!1})},cdb9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("9a0e"),s={data:function(){return{listdata:[],userInfo:{}}},onShow:function(){var t=this;uni.getStorage({key:"userInfo",success:function(e){t.userInfo=e.data},fail:function(t){t.data}}),uni.request({url:i.api+"/api/CustomerDistributor/MyDistributorPagedList",method:"POST",data:{pageIndex:1,pageSize:10,sortBy:"Sc_TimeCreated",sortType:"desc"},header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},success:function(e){e.data.statusCode==i.requestsuccess&&(t.listdata=e.data.data.items)}})},methods:{}};e.default=s},ce72:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.list[data-v-5cda32e2]{padding:%?30?%}.list .list-item[data-v-5cda32e2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #eaeaea;padding:%?20?% 0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.list .describe[data-v-5cda32e2]{width:%?750?%;font-size:%?30?%;color:#353535;line-height:1.8;font-size:%?26?%}.list .describe .name[data-v-5cda32e2]{color:#888}.list .describe .customerName[data-v-5cda32e2]{color:#888}',""])}}]);