(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-orderlist-orderdatails-orderdatails"],{"2eca":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"goods-section"},t._l(t.datagroup.orderStyles,function(e,a){return i("v-uni-view",{key:a,staticClass:"g-item"},[i("v-uni-image",{attrs:{src:e.mainImg}}),i("v-uni-view",{staticClass:"right"},[i("v-uni-text",{staticClass:"title clamp"},[t._v(t._s(e.styleDesc))]),i("v-uni-text",{staticClass:"spec"},[t._v("颜色："+t._s(e.color)+"("+t._s(e.label)+")")]),i("v-uni-text",{staticClass:"spec"},[t._v("尺寸："+t._s(e.size))]),i("v-uni-view",{staticClass:"price-box"},[i("v-uni-text",{staticClass:"price"},[t._v("￥"+t._s(t._f("NumToFixed")(e.price)))]),i("v-uni-text",{staticClass:"number"},[t._v("x "+t._s(e.orderQty))])],1)],1)],1)}),1),void 0!=t.datagroup.orderHead?i("v-uni-view",{staticClass:"yt-list"},[i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("订单总额")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v("￥"+t._s(t._f("NumToFixed")(t.datagroup.orderHead.totalAmount)))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("订单编号")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.orderNo))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("订单状态")]),10==t.datagroup.orderHead.newOrderStatus?i("v-uni-text",{staticClass:"cell-tip",staticStyle:{color:"#FA436A"}},[t._v("待付款")]):t._e(),20==t.datagroup.orderHead.newOrderStatus?i("v-uni-text",{staticClass:"cell-tip"},[t._v("已付款")]):t._e()],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("仓库")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.wareHouse))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("国家")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.country))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("货币单位")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.currency))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("客户")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.customer))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("客户名称")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.customerName))])],1),i("v-uni-view",{staticClass:"yt-list-cell b-b"},[i("v-uni-text",{staticClass:"cell-tit clamp"},[t._v("下单时间")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.datagroup.orderHead.orderDate))])],1)],1):t._e()],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},"37a7":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-9b44f7a0]{background:#f8f8f8;padding-bottom:%?100?%}.address-section[data-v-9b44f7a0]{padding:%?30?% 0;background:#fff;position:relative}.address-section .order-content[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.address-section .icon-shouhuodizhi[data-v-9b44f7a0]{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:%?90?%;color:#888;font-size:%?44?%}.address-section .cen[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?28?%;color:#303133}.address-section .name[data-v-9b44f7a0]{font-size:%?34?%;margin-right:%?24?%}.address-section .address[data-v-9b44f7a0]{margin-top:%?16?%;margin-right:%?20?%;color:#909399}.address-section .icon-you[data-v-9b44f7a0]{font-size:%?32?%;color:#909399;margin-right:%?30?%}.address-section .a-bg[data-v-9b44f7a0]{position:absolute;left:0;bottom:0;display:block;width:100%;height:%?5?%}.goods-section[data-v-9b44f7a0]{margin-top:%?16?%;background:#fff;padding-bottom:1px}.goods-section .g-header[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?84?%;padding:0 %?30?%;position:relative}.goods-section .logo[data-v-9b44f7a0]{display:block;width:%?50?%;height:%?50?%;border-radius:100px}.goods-section .name[data-v-9b44f7a0]{font-size:%?30?%;color:#606266;margin-left:%?24?%}.goods-section .g-item[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:%?20?% %?30?%}.goods-section .g-item uni-image[data-v-9b44f7a0]{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:block;width:%?160?%;height:%?160?%;border-radius:%?4?%}.goods-section .g-item .right[data-v-9b44f7a0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-left:%?24?%;overflow:hidden}.goods-section .g-item .title[data-v-9b44f7a0]{font-size:%?30?%;color:#303133}.goods-section .g-item .spec[data-v-9b44f7a0]{display:block;width:100%;font-size:%?26?%;color:#909399;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.goods-section .g-item .price-box[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?32?%;color:#303133;padding-top:%?10?%}.goods-section .g-item .price-box .price[data-v-9b44f7a0]{margin-bottom:%?4?%}.goods-section .g-item .price-box .number[data-v-9b44f7a0]{font-size:%?26?%;color:#606266;margin-left:%?20?%}.goods-section .g-item .step-box[data-v-9b44f7a0]{position:relative}.yt-list[data-v-9b44f7a0]{margin-top:%?16?%;background:#fff}.yt-list-cell[data-v-9b44f7a0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?10?% %?30?% %?10?% %?40?%;line-height:%?70?%;position:relative}.yt-list-cell.cell-hover[data-v-9b44f7a0]{background:#fafafa}.yt-list-cell.b-b[data-v-9b44f7a0]:after{left:%?30?%}.yt-list-cell .cell-icon[data-v-9b44f7a0]{height:%?32?%;width:%?32?%;font-size:%?22?%;color:#fff;text-align:center;line-height:%?32?%;background:#f85e52;border-radius:%?4?%;margin-right:%?12?%}.yt-list-cell .cell-icon.hb[data-v-9b44f7a0]{background:#ffaa0e}.yt-list-cell .cell-icon.lpk[data-v-9b44f7a0]{background:#3ab54a}.yt-list-cell .cell-more[data-v-9b44f7a0]{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;font-size:%?24?%;color:#909399;margin-left:%?8?%;margin-right:%?-10?%}.yt-list-cell .cell-tit[data-v-9b44f7a0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?26?%;color:#909399;margin-right:%?10?%}.yt-list-cell .cell-tip[data-v-9b44f7a0]{font-size:%?26?%;color:#303133}.yt-list-cell .cell-tip.disabled[data-v-9b44f7a0]{color:#909399}.yt-list-cell .cell-tip.active[data-v-9b44f7a0]{color:#fa436a}.yt-list-cell .cell-tip.red[data-v-9b44f7a0]{color:#fa436a}.yt-list-cell.desc-cell .cell-tit[data-v-9b44f7a0]{max-width:%?90?%}.yt-list-cell .desc[data-v-9b44f7a0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?28?%;color:#303133}body.?%PAGE?%[data-v-9b44f7a0]{background:#f8f8f8}',""])},"9a0e":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.requesterror=e.requestsuccess=e.api=void 0;var a="http://10.9.0.6:11156";e.api=a;var s=1;e.requestsuccess=s;var l=2;e.requesterror=l},ac35:function(t,e,i){"use strict";var a=i("fe00"),s=i.n(a);s.a},b309:function(t,e,i){"use strict";i.r(e);var a=i("2eca"),s=i("c272");for(var l in s)"default"!==l&&function(t){i.d(e,t,function(){return s[t]})}(l);i("ac35");var o=i("2877"),n=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"9b44f7a0",null);e["default"]=n.exports},c272:function(t,e,i){"use strict";i.r(e);var a=i("fc3d"),s=i.n(a);for(var l in a)"default"!==l&&function(t){i.d(e,t,function(){return a[t]})}(l);e["default"]=s.a},fc3d:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("9a0e"),s={data:function(){return{addressData:{},datagroup:{}}},onLoad:function(t){this.orderNo=t.orderNo},onShow:function(){var t=this;uni.getStorage({key:"userInfo",success:function(e){t.userInfo=e.data},fail:function(t){t.data}}),uni.request({url:a.api+"/api/Order/GetOrderDetail?orderNo="+t.orderNo,header:{Authorization:this.userInfo.token_type+" "+this.userInfo.access_token},success:function(e){e.data.statusCode==a.requestsuccess&&(t.datagroup=e.data.data)}})}};e.default=s},fe00:function(t,e,i){var a=i("37a7");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("757517fe",a,!0,{sourceMap:!1,shadowMode:!1})}}]);