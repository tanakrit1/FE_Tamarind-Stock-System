import{E as U,r as g,o as $,v as r,f as w,j as P,k as i,x as C,y as I,F as q,z as G,A as N,B as x,G as A,H as F,l as M,C as Q,m as W,D as J}from"./index-BfEDlx2e.js";import{_ as T,a as K}from"./pagination-page-BpupLFiI.js";import{_ as L}from"./supplier-import-DpuuMISV.js";import{_ as S}from"./deposit-import-DgzSnkOq.js";import{_ as X}from"./master-products-CGZ8hcHS.js";import{E as Y}from"./exceljs.min-COGG1g5r.js";import"./button-primary-outline-DA8sDgzx.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ee={class:"flex md:justify-center"},te={class:"sm:w-1/1 md:w-4/5 flex flex-col mb-5 space-y-2"},ae=W('<div class="flex justify-start"><div class="flex"><svg width="33" height="33" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9436 1.25H13.0564C14.8942 1.24998 16.3498 1.24997 17.489 1.40314C18.6614 1.56076 19.6104 1.89288 20.3588 2.64124C21.1071 3.38961 21.4392 4.33856 21.5969 5.51098C21.75 6.65019 21.75 8.10583 21.75 9.94359V14.0564C21.75 15.8942 21.75 17.3498 21.5969 18.489C21.4392 19.6614 21.1071 20.6104 20.3588 21.3588C19.6104 22.1071 18.6614 22.4392 17.489 22.5969C16.3498 22.75 14.8942 22.75 13.0564 22.75H10.9436C9.10583 22.75 7.65019 22.75 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24998 15.8942 2.25 14.0564V9.94358C2.24998 8.10582 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.10582 1.24998 10.9436 1.25ZM6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V14C3.75 15.9068 3.75159 17.2615 3.88976 18.2892C4.02502 19.2952 4.27869 19.8749 4.7019 20.2981C5.12511 20.7213 5.70476 20.975 6.71085 21.1102C7.73851 21.2484 9.09318 21.25 11 21.25H13C14.9068 21.25 16.2615 21.2484 17.2892 21.1102C18.2952 20.975 18.8749 20.7213 19.2981 20.2981C19.7213 19.8749 19.975 19.2952 20.1102 18.2892C20.2484 17.2615 20.25 15.9068 20.25 14V10C20.25 8.09318 20.2484 6.73851 20.1102 5.71085C19.975 4.70476 19.7213 4.12511 19.2981 3.7019C18.8749 3.27869 18.2952 3.02502 17.2892 2.88976C16.2615 2.75159 14.9068 2.75 13 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z" fill="#A2422C"></path></g></svg><span class="text-2xl font-bold text-red-800">รายการนำเข้าสินค้า</span></div></div>',1),le={class:"flex justify-center pb-5"},ie={class:"w-full bg-white rounded-xl py-5"},se={class:"grid grid-cols-2 gap-4 px-6 mt-3"},re={class:"flex flex-col"},oe=i("span",{class:"text-red-800 font-semibold"},"ชื่อสินค้า",-1),ue=["value"],pe={class:"flex flex-col"},de=i("span",{class:"text-red-800 font-semibold"},"ประเภทนำเข้าสินค้า",-1),ce=i("option",{value:"ซื้อ-ขาย"},"ซื้อ-ขาย",-1),ne=i("option",{value:"ฝาก"},"ฝาก",-1),ve=[ce,ne],fe={class:"flex flex-col"},he=i("span",{class:"text-red-800 font-semibold"},"วันที่เริ่มต้น",-1),De={class:"flex flex-col"},me=i("span",{class:"text-red-800 font-semibold"},"วันที่สิ้นสุด",-1),ge={key:0,class:"grid grid-cols-2 gap-4 px-6 mt-3"},ye={class:"flex flex-col"},be=i("span",{class:"text-red-800 font-semibold"},"วันที่เลิกฝากเริ่มต้น",-1),we={class:"flex flex-col"},Pe=i("span",{class:"text-red-800 font-semibold"},"วันที่เลิกฝากสิ้นสุด",-1),Ce={class:"flex justify-center py-5 space-x-3"},_e=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},[i("path",{fill:"currentColor","fill-rule":"evenodd",d:"M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.21 10.21 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25","clip-rule":"evenodd"})],-1),Se=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 512 512"},[i("path",{d:"M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336.1c-70.7 0-128-57.3-128-128.1s57.3-128.1 128-128.1v-37c0-6.4 7.1-10.2 12.4-6.7l72.9 52.6c4.9 3.3 4.7 10.6-.4 13.6L268 196.7c-5.3 3.1-12-.8-12-6.9v-41.9c-60.3 0-109.2 49.7-108.1 110.2 1.1 59.1 50.3 106.7 109.5 106 55.9-.7 101.8-43.7 106.3-99 .4-5.2 4.7-9.1 9.9-9.1 5.8 0 10.4 4.9 9.9 10.7-5.4 66-60.4 117.4-127.5 117.4z",fill:"#A2422C"})],-1),Ne=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24"},[i("path",{fill:"currentColor",d:"M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z",opacity:".5"}),i("path",{fill:"currentColor",d:"M16.519 16.501c.175-.136.334-.295.651-.612l3.957-3.958c.096-.095.052-.26-.075-.305a4.332 4.332 0 0 1-1.644-1.034a4.332 4.332 0 0 1-1.034-1.644c-.045-.127-.21-.171-.305-.075L14.11 12.83c-.317.317-.476.476-.612.651c-.161.207-.3.43-.412.666c-.095.2-.166.414-.308.84l-.184.55l-.292.875l-.273.82a.584.584 0 0 0 .738.738l.82-.273l.875-.292l.55-.184c.426-.142.64-.212.84-.308c.236-.113.46-.25.666-.412m5.849-5.809a2.163 2.163 0 1 0-3.06-3.059l-.126.128a.524.524 0 0 0-.148.465c.02.107.055.265.12.452c.13.375.376.867.839 1.33a3.5 3.5 0 0 0 1.33.839c.188.065.345.1.452.12a.525.525 0 0 0 .465-.148z"}),i("path",{fill:"currentColor","fill-rule":"evenodd",d:"M7.25 9A.75.75 0 0 1 8 8.25h6.5a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75","clip-rule":"evenodd"})],-1),xe={key:0,class:"rounded-xl mb-10 overflow-auto"},Ae={class:"flex justify-end py-5"},je={__name:"product-list",setup(Le){U();const u=g({page:1,limit:10,totalPage:0}),Z=d=>{u.page=d,V()},n=g({status:!1,title:"",body:""}),j=()=>{n.value.status=!1},R=[{field:"specialID",label:"รหัส",width:"auto"},{field:"productName",label:"ชื่อสินค้า",width:"auto"},{field:"typeAction",label:"ประเภทสินค้า",width:"auto"},{field:"productPrice",label:"ราคาสินค้า",width:"auto"},{field:"quantity",label:"ปริมาณสินค้า",width:"auto"},{field:"price",label:"รวมทั้งสิ้น",width:"auto"},{field:"supplierFirstName",label:"ชื่อ",width:"auto"},{field:"supplierLastName",label:"สกุล",width:"auto"},{field:"supplierPhone",label:"เบอร์โทร",width:"auto"},{field:"supplierAddress",label:"ที่อยู่",width:"auto"},{field:"supplierSubDistrict",label:"ตำบล",width:"auto"},{field:"supplierDistrict",label:"อำเภอ",width:"auto"},{field:"supplierProvince",label:"จังหวัด",width:"auto"},{field:"supplierZipCode",label:"ไปรษณีย์",width:"auto"}],E=[{field:"specialID",label:"รหัส",width:"auto"},{field:"productName",label:"ชื่อสินค้า",width:"auto"},{field:"productPrice",label:"ราคาสินค้า",width:"auto"},{field:"quantity",label:"ปริมาณสินค้า",width:"auto"},{field:"remain",label:"จํานวนคงเหลือ",width:"auto"},{field:"price",label:"รวมทั้งสิ้น",width:"auto"},{field:"periodDate",label:"วันที่สิ้นสุดการฝาก",width:"auto"},{field:"supplierFirstName",label:"ชื่อ",width:"auto"},{field:"supplierLastName",label:"สกุล",width:"auto"},{field:"supplierPhone",label:"เบอร์โทร",width:"auto"},{field:"supplierAddress",label:"ที่อยู่",width:"auto"},{field:"supplierSubDistrict",label:"ตำบล",width:"auto"},{field:"supplierDistrict",label:"อำเภอ",width:"auto"},{field:"supplierProvince",label:"จังหวัด",width:"auto"},{field:"supplierZipCode",label:"ไปรษณีย์",width:"auto"}],p=g([]);let c=null,m=null;const s=g(!1),f=g(!1),o=g(!1),t=g({startDate:"",endDate:"",startPeriodDate:"",endPeriodDate:""}),h=g({in_productName:""}),y=g({in_productType:"ซื้อ-ขาย"}),H=async()=>{const d={page:1,limit:1e4,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[]}};await X.search(d,l=>{l.statusCode===200?(console.log("response --> ",l),h.value=l.data.map(a=>({id:a.id,specialID:a.specialID,productName:a.name,typeAction:a.type,productPrice:a.price,quantity:a.quantity}))):n.value={status:!0,title:"เกิดข้อผิดพลาด",body:l.message}})},k=async()=>{if(f.value==!0){if(t.value.startDate!=""&&t.value.endDate!=""){if(console.log("currentDate.value.startDate --> ",t.value.startDate),console.log("currentDate.value.endDate --> ",t.value.endDate),b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName},{field:"importDate",operator:"between",value:[t.value.startDate,t.value.endDate]}]}};console.log("bodyimportDate --> ",l),await S.searchDepositImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!0,r.commit("setStatusLoading",!1),console.log("response5555--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startPeriodDate!=""&&t.value.endPeriodDate!=""&&h.value.in_productName!=""){if(console.log("currentDate.value.startPeriodDate --> ",t.value.startPeriodDate),console.log("currentDate.value.endPeriodDate --> ",t.value.endPeriodDate),b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName},{field:"periodDate",operator:"between",value:[t.value.startPeriodDate,t.value.endPeriodDate]}]}};console.log("bodyperiodDate --> ",l),await S.searchDepositImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!0,r.commit("setStatusLoading",!1),console.log("response5555--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startDate!=""&&t.value.endDate!=""&&t.value.startPeriodDate!=""&&t.value.endPeriodDate!=""){if(b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName},{field:"importDate",operator:"between",value:[t.value.startDate,t.value.endDate]},{field:"periodDate",operator:"between",value:[t.value.startPeriodDate,t.value.endPeriodDate]}]}};console.log("bodyperiodDate --> ",l),await S.searchDepositImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!0,r.commit("setStatusLoading",!1),console.log("response5555--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startDate==""&&t.value.endDate==""&&t.value.startPeriodDate==""&&t.value.endPeriodDate==""){if(console.log("ไม่มีค่าวันที่"),b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName}]}};console.log("body --> ",l),await S.searchDepositImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!0,r.commit("setStatusLoading",!1),console.log("response5555--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startDate==""&&t.value.endDate==""&&t.value.startPeriodDate==""&&t.value.endPeriodDate==""&&h.value.in_productName==""&&y.value.in_productType=="ฝาก"&&(console.log("ไม่มีค่าวันที่"),b())){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[]}};console.log("body --> ",l),await S.searchDepositImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!0,r.commit("setStatusLoading",!1),console.log("response5555--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(console.log("fromDepositActive --> false"),t.value.startDate!=""&&t.value.endDate!=""){if(b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"id",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName},{field:"typeAction",operator:"equals",value:y.value.in_productType},{field:"importDate",operator:"between",value:[t.value.startDate,t.value.endDate]}]}};console.log("bodyimportDate --> ",l),await L.searchSupplierImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!1,r.commit("setStatusLoading",!1),console.log("responseimportDate--> ",a),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,typeAction:e.typeAction,quantity:e.quantity,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startDate==""&&t.value.endDate==""&&t.value.startPeriodDate==""&&t.value.endPeriodDate==""){if(console.log("ไม่มีค่าวันที่"),b()){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"product_specialID",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"product_name",operator:"equals",value:h.value.in_productName},{field:"typeAction",operator:"equals",value:y.value.in_productType}]}};console.log("bodyproduct_name --> ",l),await L.searchSupplierImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!1,r.commit("setStatusLoading",!1),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,typeAction:e.typeAction,quantity:e.quantity,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}}else if(t.value.startDate==""&&t.value.endDate==""&&t.value.startPeriodDate==""&&t.value.endPeriodDate==""&&h.value.in_productName==""&&(console.log("ไม่มีค่าวันที่"),b())){r.commit("setStatusLoading",!0);const l={page:o.value?1:u.value.page,limit:o.value?1e4:u.value.limit,sortField:"product_specialID",sortType:"ASC",filterModel:{logicOperator:"and",items:[{field:"typeAction",operator:"equals",value:y.value.in_productType}]}};console.log("bodyproduct_name --> ",l),await L.searchSupplierImport(l,a=>{if(a.statusCode===200)a.data.length>0?(s.value=!0,f.value=!1,r.commit("setStatusLoading",!1),c=a.data.map(e=>({specialID:e.product.specialID,productName:e.product.name,productPrice:e.product.price,typeAction:e.typeAction,quantity:e.quantity,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplier.firstName,supplierLastName:e.supplier.lastName,supplierPhone:e.supplier.phone,supplierAddress:e.supplier.address,supplierSubDistrict:e.supplier.subDistric,supplierDistrict:e.supplier.distric,supplierProvince:e.supplier.province,supplierZipCode:e.supplier.zipCode})),o.value==!0?(m=c,o.value=!1):(p.value=c,u.value.totalPage=a.metadata.totalPage,s.value=!0)):(r.commit("setStatusLoading",!1),s.value=!1,n.value={status:!0,title:"แจ้งเตือน",body:"ไม่พบข้อมูล"},p.value=[]);else{s.value=!1;const e=a.message.map(v=>`<li>${v}</li>`);modalAlert.value={status:!0,title:"กรุณาตรวจสอบ",body:e.join("")},r.commit("setStatusLoading",!1)}})}},V=async()=>{await k()},b=()=>{console.log("***CheckCurrentDate***");let d=!0;return t.value.startDate>t.value.endDate?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด"},t.value.startDate="",t.value.endDate="",p.value=[],d=!1):t.value.endDate<t.value.startDate?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น"},t.value.startDate="",t.value.endDate="",p.value=[],d=!1):t.value.startDate!=""&&t.value.endDate==""?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"กรุณากรอกวันที่สิ้นสุด"},t.value.startDate="",t.value.endDate="",p.value=[],d=!1):t.value.startDate==""&&t.value.endDate!=""&&(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"กรุณากรอกวันที่เริ่มต้น"},t.value.startDate="",t.value.endDate="",p.value=[],d=!1),t.value.startPeriodDate>t.value.endPeriodDate?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด"},t.value.startPeriodDate="",t.value.endPeriodDate="",p.value=[],d=!1):t.value.endPeriodDate<t.value.startPeriodDate?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น"},t.value.startPeriodDate="",t.value.endPeriodDate="",p.value=[],d=!1):t.value.startPeriodDate!=""&&t.value.endPeriodDate==""?(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"กรุณากรอกวันที่สิ้นสุด"},t.value.startPeriodDate="",t.value.endPeriodDate="",p.value=[],d=!1):t.value.startPeriodDate==""&&t.value.endPeriodDate!=""&&(n.value={status:!0,title:"เกิดข้อผิดพลาด",body:"กรุณากรอกวันที่เริ่มต้น"},d=!1),d},z=()=>{p.value=[],s.value=!1,f.value=!1,h.value.in_productName="",y.value.in_productType="ซื้อ-ขาย",t.value.startDate="",t.value.endDate="",t.value.startPeriodDate="",t.value.endPeriodDate=""},B=()=>{p.value=[],s.value=!1,y.value.in_productType=="ฝาก"?f.value=!0:f.value=!1};$(async()=>{r.commit("setStatusLoading",!0),await H(),r.commit("setStatusLoading",!1)});const O=async()=>{console.log("***onExportExcel***");const d=new Y.Workbook,l=d.addWorksheet("Sheet A");o.value=!0,await k(),f.value==!0?(l.columns=[{header:"Special ID",key:"specialID",width:15},{header:"Product Name",key:"productName",width:30},{header:"Product Price",key:"productPrice",width:15},{header:"Quantity",key:"quantity",width:15},{header:"Remain",key:"remain",width:15},{header:"Price",key:"price",width:15},{header:"Period Date",key:"periodDate",width:15},{header:"Supplier First Name",key:"supplierFirstName",width:20},{header:"Supplier Last Name",key:"supplierLastName",width:20},{header:"Supplier Phone",key:"supplierPhone",width:20},{header:"Supplier Address",key:"supplierAddress",width:30},{header:"Supplier SubDistrict",key:"supplierSubDistrict",width:20},{header:"Supplier District",key:"supplierDistrict",width:20},{header:"Supplier Province",key:"supplierProvince",width:20},{header:"Supplier Zip Code",key:"supplierZipCode",width:15}],l.getRow(1).eachCell(e=>{e.fill={type:"pattern",pattern:"solid",fgColor:{argb:"DD5746"}},e.border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}}}),m.forEach((e,v)=>{l.addRow({specialID:e.specialID,productName:e.productName,productPrice:e.productPrice,quantity:e.quantity,remain:e.remain,price:e.price,periodDate:e.periodDate,supplierFirstName:e.supplierFirstName,supplierLastName:e.supplierLastName,supplierPhone:e.supplierPhone,supplierAddress:e.supplierAddress,supplierSubDistrict:e.supplierSubDistrict,supplierDistrict:e.supplierDistrict,supplierProvince:e.supplierProvince,supplierZipCode:e.supplierZipCode}).eachCell(D=>{D.border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}}})}),d.xlsx.writeBuffer().then(e=>{const v=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),_=window.URL.createObjectURL(v),D=document.createElement("a");D.href=_,D.download="ExportedData.xlsx",D.click()})):(l.columns=[{header:"Special ID",key:"specialID",width:15},{header:"Product Name",key:"productName",width:30},{header:"Type of Action",key:"typeAction",width:20},{header:"Product Price",key:"productPrice",width:15},{header:"Quantity",key:"quantity",width:15},{header:"Price",key:"price",width:15},{header:"Supplier First Name",key:"supplierFirstName",width:20},{header:"Supplier Last Name",key:"supplierLastName",width:20},{header:"Supplier Phone",key:"supplierPhone",width:20},{header:"Supplier Address",key:"supplierAddress",width:30},{header:"Supplier SubDistrict",key:"supplierSubDistrict",width:20},{header:"Supplier District",key:"supplierDistrict",width:20},{header:"Supplier Province",key:"supplierProvince",width:20},{header:"Supplier Zip Code",key:"supplierZipCode",width:15}],l.getRow(1).eachCell(e=>{e.fill={type:"pattern",pattern:"solid",fgColor:{argb:"A8CD9F"}},e.border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}}}),m.forEach((e,v)=>{l.addRow({specialID:e.specialID,productName:e.productName,typeAction:e.typeAction,productPrice:e.productPrice,quantity:e.quantity,price:e.price,supplierFirstName:e.supplierFirstName,supplierLastName:e.supplierLastName,supplierPhone:e.supplierPhone,supplierAddress:e.supplierAddress,supplierSubDistrict:e.supplierSubDistrict,supplierDistrict:e.supplierDistrict,supplierProvince:e.supplierProvince,supplierZipCode:e.supplierZipCode}).eachCell(D=>{D.border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}}})}),d.xlsx.writeBuffer().then(e=>{const v=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),_=window.URL.createObjectURL(v),D=document.createElement("a");D.href=_,D.download="ExportedData2.xlsx",D.click()}))};return(d,l)=>(w(),P(q,null,[i("div",ee,[i("div",te,[ae,i("div",le,[i("div",ie,[i("div",se,[i("div",re,[oe,C(i("select",{"onUpdate:modelValue":l[0]||(l[0]=a=>h.value.in_productName=a),class:"h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"},[(w(!0),P(q,null,G(h.value,(a,e)=>(w(),P("option",{key:e,value:a.productName},J(a.productName),9,ue))),128))],512),[[I,h.value.in_productName]])]),i("div",pe,[de,C(i("select",{"onUpdate:modelValue":l[1]||(l[1]=a=>y.value.in_productType=a),onChange:B,class:"h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"},ve,544),[[I,y.value.in_productType]])]),i("div",fe,[he,C(i("input",{class:"h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3",type:"date","onUpdate:modelValue":l[2]||(l[2]=a=>t.value.startDate=a)},null,512),[[N,t.value.startDate]])]),i("div",De,[me,C(i("input",{class:"h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3",type:"date","onUpdate:modelValue":l[3]||(l[3]=a=>t.value.endDate=a)},null,512),[[N,t.value.endDate]])])]),f.value?(w(),P("div",ge,[i("div",ye,[be,C(i("input",{class:"h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3",type:"date","onUpdate:modelValue":l[4]||(l[4]=a=>t.value.startPeriodDate=a)},null,512),[[N,t.value.startPeriodDate]])]),i("div",we,[Pe,C(i("input",{class:"h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3",type:"date","onUpdate:modelValue":l[5]||(l[5]=a=>t.value.endPeriodDate=a)},null,512),[[N,t.value.endPeriodDate]])])])):x("",!0),i("div",Ce,[i("button",{label:"ค้นหา",onClick:V,class:"h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"},[_e,A(" ค้นหา ")]),i("button",{onClick:z,class:"h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"},[Se,A(" ยกเลิก ")]),s.value?(w(),P("button",{key:0,onClick:O,class:"h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"},[Ne,A(" รายงาน ")])):x("",!0)])])])])]),s.value?(w(),P("div",xe,[f.value?(w(),F(T,{key:0,columns:E,rows:p.value},null,8,["rows"])):(w(),F(T,{key:1,columns:R,rows:p.value},null,8,["rows"])),i("div",Ae,[M(K,{currentPage:u.value.page,"onUpdate:currentPage":[l[6]||(l[6]=a=>u.value.page=a),Z],totalPages:u.value.totalPage,limit:u.value.limit},null,8,["currentPage","totalPages","limit"])])])):x("",!0),M(Q,{titleMessage:n.value.title,bodyMessage:n.value.body,status:n.value.status,onCloseAlertModal:j},null,8,["titleMessage","bodyMessage","status"])],64))}};export{je as default};