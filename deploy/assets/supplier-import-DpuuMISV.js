import{I as o}from"./index-BfEDlx2e.js";const r={config_authen(){return{"Content-Type":"application/json",headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}},async searchSupplierImport(e,a){await o.post("transaction_import/search",e,this.config_authen()).then(t=>{a(t.data)}).catch(t=>{a(t.response.data)})},async createSupplierImport(e,a){await o.post("transaction_import",e,this.config_authen()).then(t=>{a(t.data)}).catch(t=>{a(t.response.data)})}};export{r as _};