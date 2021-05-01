(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{798:function(t,e,r){"use strict";r.r(e);r(9),r(5),r(12),r(6),r(13);var n=r(2),o=(r(8),r(41),r(31),r(27),r(20),r(66),r(38),r(69)),c=r(451);r(527);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{dialog:!1,querying:!1,converting:!1,attrs:{class:"mb-6",boilerplate:!0,elevation:2}}},computed:d(d({},Object(o.b)(["auth","courses"])),{},{course:function(){var t=this;return this.courses.filter((function(e){return e.id==t.$route.params.courseId}))[0]},validCourse:function(){var t=this;return this.courses.filter((function(e){return e.id==t.$route.params.courseId}))[0]}}),head:{script:[{src:"/autotable.jspdf.js"}]},methods:{printList:function(){var t=this,e=this,r=this.$route.params.courseId,n=[];this.querying=!0,this.dialog=!0,db.collection("Students").where("courses","array-contains",r).get().then((function(t){e.querying=!1,e.converting=!0,t.docs.map((function(t){n.push(t.data())}))})).then((function(){for(var i=0;i<20;i++)n.push({name:{firstname:"",lastname:"",middlename:""},regNumber:""});var r=new c.default({orientation:"l",unit:"mm",format:"a4",putOnlyUsedFonts:!0,floatPrecision:"smart"});r.setFontSize(15),r.text("\t\t\t\t\t\t\tUNIVERSITY OF NIGERIA NSUKKA",10,10),r.text("\t\t\t\t\t\tDEPARTMENT OF COMPUTER SCIENCE",10,18),r.text("\t\t\t\t\t\t\t\t200 LEVEL CLASS LIST",10,26),r.setFontSize(11),r.text("ACADEMIC YEAR: 2019/2020",18,32),r.text("COURSE TITLE:".concat(t.course.title),100,32),r.text("COURSE CODE:".concat(t.course.code),200,32);var o={lineWidth:.2,lineColor:2,fontSize:8};r.autoTable({startY:35,margin:5,columnStyles:{sn:o,name:o,regno:o,t1:o,t2:o,t3:o,t4:o,t5:o,t6:o,t7:o,exam:o,total:o},headStyles:{fillColor:null,textColor:10,lineWidth:.2,lineColor:2},body:n.map((function(t,i){return{sn:i+1,name:"".concat(t.name.lastname.toUpperCase()," ").concat(t.name.firstname.toUpperCase()," ").concat(t.name.middlename.toUpperCase()),regno:t.regNumber,t1:"",t2:"",t3:"",t4:"",t5:"",t6:"",t7:"",exam:"",total:""}})),columns:[{header:"SN",dataKey:"sn"},{header:"Name",dataKey:"name"},{header:"REG NO",dataKey:"regno"},{header:"Week 1",dataKey:"t1"},{header:"Week 2",dataKey:"t2"},{header:"Week 3",dataKey:"t3"},{header:"Week 4",dataKey:"t4"},{header:"Week 5",dataKey:"t5"},{header:"Week 6",dataKey:"t6"},{header:"Week 7",dataKey:"t7"},{header:"EXAM",dataKey:"exam"},{header:"TOTAL",dataKey:"total"}]}),r.save("Class list for ".concat(e.course.code,".pdf")),e.converting=!1,e.dialog=!1}))}},filters:{capitalize:function(t){return t?(t=t.toString()).charAt(0).toUpperCase()+t.slice(1):""}}},v=r(73),f=r(100),h=r.n(f),y=r(784),C=r(382),O=r(332),S=r(801),_=r(794),E=r(151),k=r(96),x=r(65),V=r(790),j=r(429),w=r(792),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-main",[r("v-container",{staticClass:"py-8 px-6",attrs:{fluid:""}},[t.validCourse?r("v-card",[[r("div",[r("v-list-item",[r("v-card-text",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"display-1 text--primary"},[t._v("\n                  "+t._s(t.course.code))]),t._v(" "),r("v-list-item-subtitle",[t._v("\n                  "+t._s(t.course.title)+"\n                ")]),t._v(" "),r("v-list-item-subtitle",[t._v("\n                  Selected by\n                  "+t._s(t.course.users>0?t.course.users+" student":"none")+t._s(t.course.users>1?"s":"")+"\n                ")])],1),t._v(" "),r("v-card",{attrs:{flat:""}},[r("v-card-title",[t._v(" Course Content ")]),t._v(" "),r("v-card-subtitle",[t._v("\n                  "+t._s(t.course.description)+"\n                ")]),t._v(" "),r("v-btn",{staticClass:"mx-2",attrs:{disabled:t.course.users<1,fab:"",dark:"",fixed:"",right:"",bottom:"",large:"",color:"primary"},on:{click:t.printList}},[r("v-icon",{attrs:{dark:""}},[t._v(" mdi-printer ")])],1)],1)],1)],1)],1)],r("v-dialog",{attrs:{"hide-overlay":"",persistent:"",width:"300"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",{attrs:{color:"primary",dark:""}},[r("v-card-text",[t._v("\n            "+t._s(t.querying?"Getting user records":"")+"\n            "+t._s(t.converting?"Converting to pdf":"")+"\n            "),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],2):r("v-card",[r("v-skeleton-loader",t._b({attrs:{type:"date-picker"}},"v-skeleton-loader",t.attrs,!1))],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VBtn:y.a,VCard:C.a,VCardSubtitle:O.a,VCardText:O.b,VCardTitle:O.c,VContainer:S.a,VDialog:_.a,VIcon:E.a,VListItem:k.a,VListItemContent:x.a,VListItemSubtitle:x.b,VListItemTitle:x.c,VMain:V.a,VProgressLinear:j.a,VSkeletonLoader:w.a})}}]);