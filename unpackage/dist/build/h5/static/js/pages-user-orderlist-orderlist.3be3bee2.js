(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-orderlist-orderlist"],{"002f":function(t,e,a){var i=a("4171");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("118a86c7",i,!0,{sourceMap:!1,shadowMode:!1})},"0658":function(t,e,a){"use strict";var i=a("002f"),n=a.n(i);n.a},"091e":function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("9a0e"),o=i(a("71af")),r={components:{uniLoadMore:o.default},data:function(){return{userInfo:{},listdata:[],status:"more",loadingText:"加载中...",loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},pageIndex:null,totalPages:null}},onShow:function(){var t=this;uni.getStorage({key:"userInfo",success:function(e){t.userInfo=e.data},fail:function(t){t.data}}),this.loaddata()},methods:{loaddata:function(){var t=this;this.loadingType=0,uni.request({url:n.api+"/api/Order/QueryOrder",header:{Authorization:this.userInfo.token_type+" "+this.userInfo.access_token},method:"POST",data:{pageIndex:1,pageSize:20,sortBy:"Sc_TimeCreated",sortType:"desc"},success:function(e){e.data.statusCode==n.requestsuccess&&(t.listdata=e.data.data.items,t.pageIndex=e.data.data.pageIndex,t.totalPages=e.data.data.totalPages,1!=e.data.data.totalPages?t.status="more":t.status="hidetext",uni.stopPullDownRefresh())}})},onPullDownRefresh:function(){this.loaddata()},onReachBottom:function(){var t=this;t.pageIndex<=t.totalPages?(uni.showNavigationBarLoading(),uni.request({url:n.api+"/api/Order/QueryOrder",header:{Authorization:this.userInfo.token_type+" "+this.userInfo.access_token},method:"POST",data:{pageIndex:t.pageIndex+1,pageSize:20,sortBy:"Sc_TimeCreated",sortType:"desc"},success:function(e){if(e.data.data.items.length<=0)return t.loadingType=2,t.status="noMore",void uni.hideNavigationBarLoading();t.pageIndex++,t.listdata=t.listdata.concat(e.data.data.items),t.loadingType=0,uni.hideNavigationBarLoading()}})):t.status="noMore"},navtodatails:function(t){uni.navigateTo({url:"orderdatails/orderdatails?orderNo="+t.orderNo})}}};e.default=r},"0b21":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-load-more"},[a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.status&&t.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"uni-load-more__img"},[a("v-uni-view",{staticClass:"load1"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load2"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load3"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1)],1),"hidetext"!=t.status?a("v-uni-text",{staticClass:"uni-load-more__text",style:{color:t.color}},[t._v(t._s("more"===t.status?t.contentText.contentdown:"loading"===t.status?t.contentText.contentrefresh:t.contentText.contentnomore))]):t._e()],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},4171:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".uni-load-more[data-v-1505f800]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.uni-load-more__text[data-v-1505f800]{font-size:%?28?%;color:#999}.uni-load-more__img[data-v-1505f800]{height:24px;width:24px;margin-right:10px}.uni-load-more__img>uni-view[data-v-1505f800]{position:absolute}.uni-load-more__img>uni-view uni-view[data-v-1505f800]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-1505f800 1.56s ease infinite;animation:load-data-v-1505f800 1.56s ease infinite}.uni-load-more__img>uni-view uni-view[data-v-1505f800]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-1505f800]:nth-child(2){-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.uni-load-more__img>uni-view uni-view[data-v-1505f800]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-1505f800]:nth-child(4){top:11px;left:0}.load1[data-v-1505f800],.load2[data-v-1505f800],.load3[data-v-1505f800]{height:24px;width:24px}.load2[data-v-1505f800]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-1505f800]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.load1 uni-view[data-v-1505f800]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-1505f800]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-1505f800]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-1505f800]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-1505f800]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-1505f800]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-1505f800]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-1505f800]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-1505f800]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-1505f800]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-1505f800]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-1505f800]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-1505f800{0%{opacity:1}to{opacity:.2}}",""])},"4b8c":function(t,e,a){var i=a("4d26");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("21eb6796",i,!0,{sourceMap:!1,shadowMode:!1})},"4d26":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.list-group[data-v-90998b5e]{background:#fff;padding:%?20?% %?30?%}.list-group .list-item[data-v-90998b5e]{padding:%?20?% %?30?%;border-bottom:1px solid #f2f2f2;margin-bottom:%?20?%;line-height:1.8;font-size:%?30?%;color:#353535}.list-group .list-item .list-item-date[data-v-90998b5e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:%?26?%;color:#888}',""])},"71af":function(t,e,a){"use strict";a.r(e);var i=a("0b21"),n=a("a9d9");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);a("0658");var r=a("2877"),s=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"1505f800",null);e["default"]=s.exports},"770f":function(t,e,a){"use strict";a.r(e);var i=a("091e"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},"82f0":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"list-group"},t._l(t.listdata,function(e,i){return a("v-uni-view",{key:i,staticClass:"list-item",on:{click:function(a){a=t.$handleEvent(a),t.navtodatails(e)}}},[a("v-uni-text",[t._v("订单："+t._s(e.orderNo))]),a("v-uni-view",{staticClass:"list-item-date"},[a("v-uni-text",[t._v(t._s(e.orderDate))]),a("v-uni-text",[t._v("￥"+t._s(t._f("NumToFixed")(e.totalAmount))+" ("+t._s(e.country)+")")])],1)],1)}),1),a("uniLoadMore",{attrs:{loadingType:t.loadingType,contentText:t.contentText,status:t.status}})],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"839f":function(t,e,a){"use strict";a.r(e);var i=a("82f0"),n=a("770f");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);a("e723");var r=a("2877"),s=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"90998b5e",null);e["default"]=s.exports},"9a0e":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.requesterror=e.requestsuccess=e.api=void 0;var i="http://10.9.0.6:11156";e.api=i;var n=1;e.requestsuccess=n;var o=2;e.requesterror=o},a9d9:function(t,e,a){"use strict";a.r(e);var i=a("c3a2"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},c3a2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"uni-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=i},e723:function(t,e,a){"use strict";var i=a("4b8c"),n=a.n(i);n.a}}]);