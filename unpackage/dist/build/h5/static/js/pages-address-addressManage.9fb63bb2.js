(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-addressManage"],{"09f9":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("省市区")]),void 0!=e.addressData.provinceName?a("v-uni-text",{staticClass:"input",on:{click:function(t){t=e.$handleEvent(t),e.openpicker(t)}}},[e._v(e._s(e.addressData.provinceName)+" "+e._s(e.addressData.cityName)+" "+e._s(e.addressData.regionName))]):a("v-uni-text",{staticClass:"input",on:{click:function(t){t=e.$handleEvent(t),e.openpicker(t)}}},[e._v("请选择省市区")])],1),a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("名称")]),a("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"名称","placeholder-class":"placeholder"},model:{value:e.addressData.storename,callback:function(t){e.$set(e.addressData,"storename",t)},expression:"addressData.storename"}})],1),a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("地址")]),a("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"楼号、门牌","placeholder-class":"placeholder"},model:{value:e.addressData.addresS1,callback:function(t){e.$set(e.addressData,"addresS1",t)},expression:"addressData.addresS1"}})],1),a("v-uni-view",{staticClass:"row default-row"},[a("v-uni-text",{staticClass:"tit"},[e._v("设为默认")]),a("v-uni-switch",{attrs:{checked:e.addressData.defaule,color:"#fa436a"},on:{change:function(t){t=e.$handleEvent(t),e.switchChange(t)}}})],1),a("v-uni-view",{staticClass:"row default-row"},[a("v-uni-text",{staticClass:"tit",staticStyle:{color:"#FA436A"},on:{click:function(t){t=e.$handleEvent(t),e.removeaddress(e.addressData)}}},[e._v("删除收货地址")])],1),a("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.confirm(t)}}},[e._v("提交")]),a("KPicker",{attrs:{pickershow:e.pickershow,datagroup:e.GetRegionAll},on:{cancel:function(t){t=e.$handleEvent(t),e.cancel(t)},tempcode:function(t){t=e.$handleEvent(t),e.tempcode(t)},temptext:function(t){t=e.$handleEvent(t),e.temptext(t)}}})],1)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},"142a":function(e,t,a){"use strict";var i=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a("9a0e"),n=i(a("8b39")),r={components:{KPicker:n.default},data:function(){return{pickershow:!1,GetRegionAll:[],temptitle:"点击选择省市区",addressData:{},manageType:""}},onLoad:function(e){var t="";"edit"===e.type&&(t="编辑收货地址",this.addressData=JSON.parse(e.data)),"add"===e.type&&(t="新增收货地址"),this.manageType=e.type,uni.setNavigationBarTitle({title:t})},onShow:function(){var e=this;uni.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data},fail:function(e){e.data}}),uni.request({url:s.api+"/api/Region/GetRegionAll",header:{Authorization:e.userInfo.token_type+" "+e.userInfo.access_token},success:function(t){t.data.statusCode==s.requestsuccess&&(e.GetRegionAll=t.data.data)}})},methods:{switchChange:function(e){console.log(e.detail),1==e.detail?this.addressData.hlIsDefault="N":this.addressData.hlIsDefault="Y"},openpicker:function(){this.pickershow=!0},cancel:function(){this.pickershow=!1},tempcode:function(e){this.addressData=e,this.pickershow=!1},temptext:function(e){this.temptitle=e,this.pickershow=!1},confirm:function(){var e=this;if("add"==e.manageType){if(e.addressData.store=null,void 0==e.addressData.provinceName||void 0==e.addressData.cityName||void 0==e.addressData.regionName||""==e.addressData.provinceName||""==e.addressData.cityName||""==e.addressData.regionName)return e.$api.msg("请选择省市区"),void setTimeout(function(){e.pickershow=!0},500);if(void 0==e.addressData.storename||""==e.addressData.storename)return void e.$api.msg("请输入名称");if(void 0==e.addressData.addresS1||""==e.addressData.addresS1)return void e.$api.msg("地址不能为空");uni.request({url:s.api+"/api/Order/SaveStore",header:{Authorization:e.userInfo.token_type+" "+e.userInfo.access_token},method:"POST",data:e.addressData,success:function(t){t.data.statusCode==s.requestsuccess?(e.$api.msg("添加成功！即将返回上页！"),setTimeout(function(){uni.navigateBack()},1e3)):e.$api.msg(t.data.msg)}})}if("edit"==e.manageType){if(void 0==e.addressData.provinceName||void 0==e.addressData.cityName||void 0==e.addressData.regionName||""==e.addressData.provinceName||""==e.addressData.cityName||""==e.addressData.regionName)return e.$api.msg("请选择省市区"),void setTimeout(function(){e.pickershow=!0},500);if(void 0==e.addressData.storename||""==e.addressData.storename)return void e.$api.msg("请输入名称");if(void 0==e.addressData.addresS1||""==e.addressData.addresS1)return void e.$api.msg("地址不能为空");uni.request({url:s.api+"/api/Order/SaveStore",header:{Authorization:e.userInfo.token_type+" "+e.userInfo.access_token},method:"POST",data:e.addressData,success:function(t){t.data.statusCode==s.requestsuccess?(e.$api.msg("修改成功！即将返回上页！"),setTimeout(function(){uni.navigateBack()},1e3)):e.$api.msg(t.data.msg)}})}},removeaddress:function(e){var t=this;uni.showModal({title:"确定删除该地址吗？",success:function(a){confirm&&uni.request({url:s.api+"/api/Order/DeleteStore?store="+e.store,header:{Authorization:t.userInfo.token_type+" "+t.userInfo.access_token},method:"POST",success:function(e){e.data.statusCode==s.requestsuccess?uni.navigateBack():t.$api.msg(e.daa.msg)}})}})}}};t.default=r},"4c38":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("c5f6");var i={data:function(){return{provinceactive:-1,province:[],provincetext:"",provincecode:"",city:[],citytext:"",cityactie:-1,citycode:"",area:[],areatext:"",areaactive:-1,areacode:"",tempcode:{},temptext:""}},props:{pickershow:{type:Boolean},datagroup:{type:Array},level:{type:Number}},mounted:function(){console.log(this.datagroup)},methods:{cancel:function(){this.$emit("cancel",this.pickershow)},ChangeProvince:function(e,t){this.provinceactive=t,this.cityactie=-1,this.areaactive=-1,this.provincecode=e.code,this.provincetext=e.regionName,this.city=[],this.area=[];var a=[];a=this.datagroup.filter(function(t){return t.code===e.code}),this.city=a[0].childrens},ChangeCity:function(e,t){this.cityactie=t,this.areaactive=-1,this.citycode=e.parentCode,this.citytext=e.regionName,this.area=[];var a=[];a=this.city.filter(function(t){return t.parentCode===e.parentCode}),this.area=a[0].childrens},ChangeArea:function(e,t){this.areaactive=t,this.areacode=e.code,this.areatext=e.regionName},Determine:function(){this.temptext=this.provincetext+" - "+this.citytext+" - "+this.areatext,this.tempcode={provinceCode:this.provincecode,cityCode:this.citycode,regionCode:this.areacode,provinceName:this.provincetext,cityName:this.citytext,regionName:this.areatext},this.$emit("tempcode",this.tempcode),this.$emit("temptext",this.temptext)}}};t.default=i},"5bc5":function(e,t,a){var i=a("d0cd");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("72b36318",i,!0,{sourceMap:!1,shadowMode:!1})},"5f6c":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.Mask[data-v-f9873b66]{position:fixed;background:rgba(0,0,0,.6);width:100%;height:100%;top:0;left:0}.picker-cont[data-v-f9873b66]{background:#fff;position:fixed;left:0;bottom:0;height:%?600?%;width:100%;z-index:4;padding:0 %?30?%;font-size:%?32?%}.picker-cont .picker-operation[data-v-f9873b66]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;color:#333;line-height:2}.picker-cont .picker-operation .cancel[data-v-f9873b66]{color:#888}.picker-cont .picker-operation .Determine[data-v-f9873b66]{color:#fa436a}.picker-cont .picker-view-wrapper[data-v-f9873b66]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;overflow:hidden;height:100%;padding-top:%?20?%;padding-bottom:%?20?%;font-size:%?28?%}.picker-cont .picker-view-wrapper .picker-view-column[data-v-f9873b66]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative;height:100%;overflow:hidden;overflow-y:scroll;text-align:center}.picker-cont .picker-view-wrapper .picker-view-column .picker-view-group[data-v-f9873b66]{width:100%}.picker-cont .picker-view-wrapper .picker-view-column .picker-view-group .picker-view-mask[data-v-f9873b66]{position:absolute;left:0;width:100%;margin-bottom:%?40?%}.picker-cont .picker-view-wrapper .picker-view-column .picker-view-group .picker-view-mask .picker-view-indicator[data-v-f9873b66]{height:%?80?%;line-height:%?80?%;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.active[data-v-f9873b66]{color:#fa436a}',""])},"64af":function(e,t,a){"use strict";var i=a("5bc5"),s=a.n(i);s.a},"865f":function(e,t,a){"use strict";a.r(t);var i=a("142a"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a},"8b39":function(e,t,a){"use strict";a.r(t);var i=a("c173"),s=a("b6d7");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("a37a");var r=a("2877"),o=Object(r["a"])(s["default"],i["a"],i["b"],!1,null,"f9873b66",null);t["default"]=o.exports},"9a0e":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.requesterror=t.requestsuccess=t.api=void 0;var i="http://10.9.0.6:11156";t.api=i;var s=1;t.requestsuccess=s;var n=2;t.requesterror=n},a37a:function(e,t,a){"use strict";var i=a("d563"),s=a.n(i);s.a},b6d7:function(e,t,a){"use strict";a.r(t);var i=a("4c38"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a},c173:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{},[a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.pickershow,expression:"pickershow"}],staticClass:"Mask",on:{click:function(t){t=e.$handleEvent(t),e.cancel(t)}}}),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.pickershow,expression:"pickershow"}],staticClass:"picker-cont"},[a("v-uni-view",{staticClass:"picker-operation"},[a("v-uni-view",{staticClass:"cancel",on:{click:function(t){t=e.$handleEvent(t),e.cancel(t)}}},[e._v("取消")]),a("v-uni-view",{staticClass:"Determine",on:{click:function(t){t=e.$handleEvent(t),e.Determine(t)}}},[e._v("确定")])],1),a("v-uni-view",{staticClass:"picker-view-wrapper"},[a("v-uni-view",{staticClass:"picker-view-column"},[a("v-uni-view",{staticClass:"picker-view-group"},[a("v-uni-view",{staticClass:"picker-view-mask"},e._l(e.datagroup,function(t,i){return a("v-uni-view",{key:i,staticClass:"picker-view-indicator",class:e.provinceactive==i?"active":"",on:{click:function(a){a=e.$handleEvent(a),e.ChangeProvince(t,i)}}},[e._v(e._s(t.regionName))])}),1)],1)],1),a("v-uni-view",{staticClass:"picker-view-column"},[a("v-uni-view",{staticClass:"picker-view-group"},[a("v-uni-view",{staticClass:"picker-view-mask"},e._l(e.city,function(t,i){return a("v-uni-view",{key:i,staticClass:"picker-view-indicator",class:e.cityactie==i?"active":"",on:{click:function(a){a=e.$handleEvent(a),e.ChangeCity(t,i)}}},[e._v(e._s(t.regionName))])}),1)],1)],1),a("v-uni-view",{staticClass:"picker-view-column"},[a("v-uni-view",{staticClass:"picker-view-group"},[a("v-uni-view",{staticClass:"picker-view-mask"},e._l(e.area,function(t,i){return a("v-uni-view",{key:i,staticClass:"picker-view-indicator",class:e.areaactive==i?"active":"",on:{click:function(a){a=e.$handleEvent(a),e.ChangeArea(t,i)}}},[e._v(e._s(t.regionName))])}),1)],1)],1)],1)],1)],1)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},d0cd:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-b5dba66e]{background:#f8f8f8;padding-top:%?16?%}.row[data-v-b5dba66e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative;padding:0 %?30?%;height:%?110?%;background:#fff}.row .tit[data-v-b5dba66e]{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:%?120?%;font-size:%?28?%;color:#303133}.row .input[data-v-b5dba66e]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?28?%;color:#303133}.row .icon-shouhuodizhi[data-v-b5dba66e]{font-size:%?28?%;color:#909399}.default-row[data-v-b5dba66e]{margin-top:%?16?%}.default-row .tit[data-v-b5dba66e]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.default-row uni-switch[data-v-b5dba66e]{-webkit-transform:translateX(%?16?%) scale(.9);-ms-transform:translateX(%?16?%) scale(.9);transform:translateX(%?16?%) scale(.9)}.add-btn[data-v-b5dba66e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:%?690?%;height:%?80?%;margin:%?60?% auto;font-size:%?28?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;-webkit-box-shadow:1px 2px 5px rgba(219,63,96,.4);box-shadow:1px 2px 5px rgba(219,63,96,.4)}.b-b[data-v-b5dba66e]:after,.b-t[data-v-b5dba66e]:after{border-bottom:none}body.?%PAGE?%[data-v-b5dba66e]{background:#f8f8f8}',""])},d563:function(e,t,a){var i=a("5f6c");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("4e13a004",i,!0,{sourceMap:!1,shadowMode:!1})},ee1e:function(e,t,a){"use strict";a.r(t);var i=a("09f9"),s=a("865f");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("64af");var r=a("2877"),o=Object(r["a"])(s["default"],i["a"],i["b"],!1,null,"b5dba66e",null);t["default"]=o.exports}}]);