import{I as n}from"./index-BfEDlx2e.js";const o={config_authen(){return{"Content-Type":"application/json",headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}},async search(e,t){await n.post("/supplier/search",e,this.config_authen()).then(a=>{t(a.data)}).catch(a=>{t(a.response.data)})},async create(e,t){await n.post("/supplier",e,this.config_authen()).then(a=>{t(a.data)}).catch(a=>{t(a.response.data)})},async update(e,t,a){await n.patch(`/supplier/${t}`,e,this.config_authen()).then(s=>{a(s.data)}).catch(s=>{a(s.response.data)})},async delete(e,t){await n.delete(`/supplier/${e}`,this.config_authen()).then(a=>{t(a.data)}).catch(a=>{t(a.response.data)})}};export{o as _};