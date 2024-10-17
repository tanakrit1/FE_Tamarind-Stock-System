<script setup>
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import tableManage from "../../../components/tables/table-manage.vue";
import subDistrict from "../../../assets/address/thai_tambons.json"
import district from "../../../assets/address/thai_amphures.json"
import province from "../../../assets/address/thai_provinces.json"
import { onMounted, ref } from "vue";
import _apiProduct from "../../../api/master-products"
import _apiCustomer from "../../../api/master-customer"
import _apiTranExport from "../../../api/deposit-export"
import _apiTranImport from '../../../api/deposit-import'
import alert from "../../../components/alert/alert.vue"
import store from "../../../store";
import paginationPage from "../../../components/pagination/pagination-page.vue"

const columns = [
    { field: "productName", label: "ชื่อสินค้า", width: "20%" },
    { field: "quantity", label: "ปริมาณสินค้า", width: "10%" },
    { field: "remain", label: "คงเหลือ", width: "10%" },
    { field: "price", label: "ราคารวม", width: "10%" },
    { field: "supplierFirstName", label: "ชื่อ", width: "20%" },
    { field: "supplierLastName", label: "สกุล", width: "20%" },

    // { field: "supplierAddress", label: "ที่อยู่", width: "25%" },
    // { field: "supplierSubDistrict", label: "ตำบล", width: "20%" },
    // { field: "supplierDistrict", label: "อำเภอ", width: "20%" },
    // { field: "supplierProvince", label: "จังหวัด", width: "20%" },
    // { field: "supplierZipCode", label: "ไปรษณีย์", width: "10%" },
]
const rows = ref([]);
const rowsOriginal = ref([])
const rowAction = ref(null)
const effectClearTable = ref(false)
const ddl = ref({
    province: [],
    district: [],
    subDistrict: [],
    product: [],
    listProductAll: []
})
const formSupplierActive = ref(false)

const pagination = ref({
    page: 1,
    limit: 5,
    totalPage: 5,
});

const formAlert = ref({
    status: false,
    title: "",
    body: "",
})

const formOrder = ref({
    productID: "",
    quantity: "",
    price: "",
    totalPrice: "0"
})

const formSupplier = ref({
    firstName: "",
    lastName: "",
    address: "",
    province: "",
    district: "",
    subDistrict: "",
    zipCode: "",
    phone: "",
})

const onClearAllForm = () => {
    effectClearTable.value = !effectClearTable.value
    formSupplierActive.value = false
    formSupplier.value = {
        firstName: "",
        lastName: "",
        address: "",
        province: "",
        district: "",
        subDistrict: "",
        zipCode: "",
        phone: "",
    }

    formOrder.value = {
        productID: "",
        quantity: "",
        price: "",
        totalPrice: "0"
    }
}

const onClearFormSupplier = () => {
    formSupplier.value = {
        firstName: "",
        lastName: "",
        address: "",
        province: "",
        district: "",
        subDistrict: "",
        zipCode: "",
        phone: "",
    }
}

const onClearFormOrder = () => {
    formOrder.value = {
        productID: "",
        quantity: "",
        price: "",
        totalPrice: "0"
    }
}

const onCloseAlert = () => {
    formAlert.value.status = false
}



const onChangeQuantity = (quantity) => {
    formOrder.value.totalPrice = formOrder.value.price * quantity
}

const onLoadDDL = async () => {
    const body = {
        page: 1,
        limit: 1000
    }
    await _apiProduct.search(body, (response) => {
        if (response.statusCode === 200) {
            ddl.value.product = response.data.map(item => {
                return { label: item.name, value: item.id }
            })
            ddl.value.listProductAll = response.data
        } else {
            const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
            });
            formAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
            };
        }

    })
    // ddl.value.province = province.map(item => {
    //     return { label: item.name_th, value: item.id }
    // })
}

// const onSearchCustomer = async (phone) => {
//     store.commit("setStatusLoading", true);
//     const body = {
//         page: 1,
//         limit: 1,
//         filterModel: {
//             logicOperator: "and",
//             items: [
//                 {
//                     field: "phone",
//                     operator: "equals",
//                     value: phone
//                 }
//             ]
//         }
//     }
//     await _apiCustomer.search(body, response => {
//         if (response.statusCode === 200) {
//             if (response.data.length > 0) {
//                 formCustomerActive.value = false
//                 formCustomer.value.firstName = response.data[0].firstName
//                 formCustomer.value.lastName = response.data[0].lastName
//                 formCustomer.value.address = response.data[0].address
//                 formCustomer.value.province = response.data[0].province
//                 formCustomer.value.district = response.data[0].distric
//                 formCustomer.value.subDistrict = response.data[0].subDistric
//                 formCustomer.value.zipCode = response.data[0].zipCode
//                 formCustomer.value.phone = response.data[0].phone
//             } else {
//                 formAlert.value = {
//                     status: true,
//                     title: "เเจ้งเตือน",
//                     body: "ไม่พบรายชื่อลูกค้าในระบบ กรณาเพิ่มลูกค้าใหม่"
//                 }
//                 formCustomerActive.value = true
//                 formCustomer.value = {
//                     firstName: "",
//                     lastName: "",
//                     address: "",
//                     province: "",
//                     district: "",
//                     subDistrict: "",
//                     zipCode: "",
//                     phone: phone,
//                 }
//             }
//         } else {
//             formAlert.value = {
//                 status: true,
//                 title: "เกิดข้อผิดพลาด",
//                 body: response.message
//             }
//             formCustomerActive.value = true
//             onClearFormCustomer()
//         }
//         store.commit("setStatusLoading", false);
//     })
// }

const fnValidateRequired = async (pFormOrder, pFormSupplier) => {
    const totalForm = { ...pFormOrder, ...pFormSupplier }
    for (let i = 0; i < Object.keys(totalForm).length; i++) {
        const key = Object.keys(totalForm)[i]
        if (totalForm[key] === "") {
            return false
        }
    }
    return true
}

const fnValidateQuantity = async (pFormOrder, rowActionData) => {
    if (rowActionData.remain < pFormOrder.quantity) {
        return false
    }
    return true
}

const onCreateTransection = async (pFormOrder, rowActionData) => {
    // console.log("rowAction--> ", rowActionData)
    store.commit("setStatusLoading", true);
    const body = {
        quantity: pFormOrder.quantity.toString(),
        // price: Number(pFormOrder.totalPrice),
        product_id: pFormOrder.productID,
        Import_Deposit_id: rowActionData.id,

        firstName: rowActionData.supplier.firstName,
        lastName: rowActionData.supplier.lastName,
        address: rowActionData.supplier.address,
        subDistric: rowActionData.supplier.subDistric,
        distric: rowActionData.supplier.distric,
        province: rowActionData.supplier.province,
        zipCode: rowActionData.supplier.zipCode.toString(),
        phone: rowActionData.supplier.phone
    }
    await _apiTranExport.create(body, response => {
        console.log("response : ", response)
        if (response.statusCode === 200) {
            formAlert.value = {
                status: true,
                title: "สำเร็จ",
                body: "เพิ่มข้อมูลเรียบร้อย"
            }
            rowAction.value = null
            onClearFormSupplier()
            onClearFormOrder()

            onLoadTable()
        } else {
            const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
            });
            formAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
            };
            // formAlert.value = {
            //     status: true,
            //     title: "เเจ้งเตือน",
            //     body: response.message
            // }
        }
        store.commit("setStatusLoading", false);
    })
}

const onSubmitForm = async () => {
    // console.log("formSupplier--> ", formSupplier.value)
    // console.log("formOrder--> ", formOrder.value)
    const resultValidRequired = await fnValidateRequired(formOrder.value, formSupplier.value)
    const resultValidQuantity = await fnValidateQuantity(formOrder.value, rowAction.value)
    if (resultValidRequired && resultValidQuantity) {
        console.log("Success")
        await onCreateTransection(formOrder.value, rowAction.value)
    } else {
        if (resultValidRequired === false) {
            formAlert.value = {
                status: true,
                title: "เเจ้งเตือน",
                body: "กรุณากรอกข้อมูลให้ครบถ้วน"
            }
        }

        if (resultValidQuantity === false) {
            formAlert.value = {
                status: true,
                title: "เเจ้งเตือน",
                body: "ไม่สามารถเบิกสินค้าได้ เนื่องจากสินค้ามีจํานวนน้อยกว่าจํานวนที่เบิก"
            }
        }

    }
}

const onLoadTable = async () => {
    store.commit("setStatusLoading", true);
    const body = {
        page: pagination.value.page.toString(),
        limit: pagination.value.limit.toString(),
        sortField: "createdAt",
        sortType: "DESC",
        filterModel: {
            logicOperator: "and",
            items: [
                {
                    field: "remain",
                    operator: "notEqual",
                    value: "0"
                }
            ]

        }
    }

    await _apiTranImport.searchDepositImport(body, response => {
        pagination.value.totalPage = response.metadata.totalPage
        rowsOriginal.value = response.data
        rows.value = response.data.map(item => {
            return {
                id: item.id,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.price,
                remain: item.remain,
                supplierFirstName: item.supplier.firstName,
                supplierLastName: item.supplier.lastName,
                supplierAddress: item.supplier.address,
                supplierSubDistrict: item.supplier.subDistric,
                supplierDistrict: item.supplier.distric,
                supplierProvince: item.supplier.province,
                supplierZipCode: item.supplier.zipCode
            }
        })
        store.commit("setStatusLoading", false);
    })
}

const onChangePagination = (result) => {
    pagination.value.page = result
    onLoadTable()
}

const onTranform = (row) => {
    console.log("**onTranform**", row)
    const findRows = rowsOriginal.value.find(item => item.id == row.id)
    rowAction.value = findRows
    console.log("findRows--> ", findRows)
    formOrder.value = {
        productID: findRows.product.id,
        quantity: findRows.remain,
        price: "0",
        totalPrice: "0"
    }

    formSupplier.value = {
        firstName: findRows.supplier.firstName,
        lastName: findRows.supplier.lastName,
        address: findRows.supplier.address,
        province: findRows.supplier.province,
        district: findRows.supplier.distric,
        subDistrict: findRows.supplier.subDistric,
        zipCode: findRows.supplier.zipCode,
        phone: findRows.supplier.phone,
    }
}

onMounted(async () => {
    await onLoadTable()
    await onLoadDDL()
})
</script>
<template>
    <div class="flex md:justify-center">
        <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-5 px-6">
            <div class="flex justify-between space-y-5">
                <div class="flex items-center">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.28869 2.76279C1.41968 2.36983 1.84442 2.15746 2.23737 2.28845L2.50229 2.37675C2.51549 2.38115 2.52864 2.38554 2.54176 2.38991C3.16813 2.59867 3.69746 2.7751 4.11369 2.96873C4.55613 3.17456 4.94002 3.42965 5.23112 3.83352C5.52221 4.2374 5.64282 4.68226 5.69817 5.16708C5.75025 5.62318 5.75023 6.18114 5.7502 6.84139L5.7502 9.49996C5.7502 10.9354 5.7518 11.9365 5.85335 12.6918C5.952 13.4256 6.13245 13.8142 6.40921 14.091C6.68598 14.3677 7.07455 14.5482 7.80832 14.6468C8.56367 14.7484 9.56479 14.75 11.0002 14.75H18.0002C18.4144 14.75 18.7502 15.0857 18.7502 15.5C18.7502 15.9142 18.4144 16.25 18.0002 16.25H10.9453C9.57774 16.25 8.47542 16.25 7.60845 16.1334C6.70834 16.0124 5.95047 15.7535 5.34855 15.1516C4.74664 14.5497 4.48774 13.7918 4.36673 12.8917C4.25017 12.0247 4.25018 10.9224 4.2502 9.55484L4.2502 6.883C4.2502 6.17 4.24907 5.69823 4.20785 5.33722C4.16883 4.99538 4.10068 4.83049 4.01426 4.71059C3.92784 4.59069 3.79296 4.47389 3.481 4.32877C3.15155 4.17551 2.70435 4.02524 2.02794 3.79978L1.76303 3.71147C1.37008 3.58049 1.15771 3.15575 1.28869 2.76279Z"
                                fill="#A2422C"></path>
                            <path opacity="0.5"
                                d="M5.74512 6C5.75008 6.25912 5.75008 6.53957 5.75007 6.8414L5.75006 9.5C5.75006 10.9354 5.75166 11.9365 5.85321 12.6919C5.86803 12.8021 5.8847 12.9046 5.90326 13H16.0221C16.9815 13 17.4612 13 17.8369 12.7523C18.2126 12.5045 18.4016 12.0636 18.7795 11.1818L19.2081 10.1818C20.0176 8.29294 20.4223 7.34853 19.9777 6.67426C19.5331 6 18.5056 6 16.4507 6H5.74512Z"
                                fill="#A2422C"></path>
                            <path
                                d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                fill="#A2422C"></path>
                            <path
                                d="M18 19.5001C18 18.6716 17.3284 18.0001 16.5 18.0001C15.6716 18.0001 15 18.6716 15 19.5001C15 20.3285 15.6716 21.0001 16.5 21.0001C17.3284 21.0001 18 20.3285 18 19.5001Z"
                                fill="#A2422C"></path>
                        </g>
                    </svg>

                    <span class="text-2xl font-bold text-red-800">บันทึกรายการเบิกสินค้าออกจากคลัง (ฝากเก็บ)</span>
                </div>
            </div>

            <div class="mt-2 mb-8 rounded-xl">
                <tableManage :columns="columns" :rows="rows" :rowTranform="true" @onClickTranform="onTranform" :trickerClear="effectClearTable" />
                <div class="flex justify-end mt-3">
                    <paginationPage v-model:currentPage="pagination.page" :totalPages="pagination.totalPage"
                        :limit="pagination.limit" @update:currentPage="onChangePagination" />
                </div>
            </div>

            <div class="w-full bg-white rounded-xl py-5 mb-5">
                <!-- <div class="px-6">
                    <span class="text-lg font-semibold text-red-800">รายละเอียดการเบิกซื้อสินค้า</span>
                    <span v-if="rowAction" class="rounded-full bg-red-800 text-white px-8 ml-2">#{{ rowAction?.id
                        }}</span>
                </div> -->
                <div class="flex justify-between px-6">
                    <span class="text-lg font-semibold text-red-800">รายละเอียดการเบิกสินค้า</span>
                    <div class="flex space-x-2 items-center rounded-full px-3  bg-red-100 cursor-pointer" @click="onClearAllForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" >
                            <path
                                d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336.1c-70.7 0-128-57.3-128-128.1s57.3-128.1 128-128.1v-37c0-6.4 7.1-10.2 12.4-6.7l72.9 52.6c4.9 3.3 4.7 10.6-.4 13.6L268 196.7c-5.3 3.1-12-.8-12-6.9v-41.9c-60.3 0-109.2 49.7-108.1 110.2 1.1 59.1 50.3 106.7 109.5 106 55.9-.7 101.8-43.7 106.3-99 .4-5.2 4.7-9.1 9.9-9.1 5.8 0 10.4 4.9 9.9 10.7-5.4 66-60.4 117.4-127.5 117.4z"
                                fill="#A2422C" />
                        </svg>
                        <span class="text-sm font-bold text-red-800">ล้างฟอร์ม</span>
                    </div>
                </div>
                <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
                <div class="grid grid-cols-2 gap-4 px-6">
                    <div class="flex flex-wrap space-y-2 py-2">
                        <div class="flex flex-col md:flex-row space-x-2">
                            <div class="grid gap-4 grid-cols-2">
                                <div class="mb-3">
                                    <span class="text-red-800 font-semibold">ชื่อสินค้า</span>
                                    <select v-model="formOrder.productID" disabled
                                        class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3">
                                        <option value="">------เลือก------</option>
                                        <option v-for="(item, index) in ddl.product" :key="index" :value="item.value">
                                            {{ item.label }}
                                        </option>
                                    </select>
                                    <!-- <input v-model="formOrder.productID"
                                        class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3" /> -->
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row space-x-2">
                            <div class="grid gap-4 grid-cols-2">
                                <div class="grid gap-4 grid-cols-2 mb-3">
                                    <div>
                                        <span class="text-red-800 font-semibold">ปริมาณสินค้า</span>
                                        <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                                            :disabled="!rowAction"
                                            @change="(event) => onChangeQuantity(event.target.value)" type="number"
                                            v-model="formOrder.quantity" />
                                    </div>
                                    <!-- <div>
                                        <span class="text-red-800 font-semibold">ราคาสินค้า</span>
                                        <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3" disabled
                                            type="text" v-model="formOrder.price" />
                                    </div> -->
                                </div>
                                <!-- <div class="mb-3">
                  <span class="text-red-800 font-semibold">ประเภทสินค้า</span>
                  <input
                    class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                    type="text"
                  />
                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center space-y-2 py-2">
                        <div class="flex justify-center mb-5">
                            <span class="text-red-800 font-semibold">คำนวณการสั่งซื้อ
                            </span>
                        </div>
                        <div class="flex flex-row-3">
                            <span class="text-red-800 text-sm text-center px-10">ราคาสินค้า
                            </span>
                            <span class="text-red-800 text-sm text-center px-5">{{ formOrder.price == "" ? 0 :
                                Number(formOrder.price).toLocaleString() }}</span>

                            <span class="text-red-800 text-sm text-center">บาท </span>
                        </div>
                        <div class="flex flex-row-3">
                            <span class="text-red-800 text-sm text-center px-10">ปริมาณ
                            </span>
                            <span class="text-red-800 text-sm text-center px-5">{{ formOrder.quantity.toLocaleString()
                                }}</span>

                            <span class="text-red-800 text-sm text-center">กิโลกรัม</span>
                        </div>
                        <!-- <div class="flex flex-row-3">
                            <span class="text-red-800 text-sm text-center px-10">ส่วนลด
                            </span>
                            <span class="text-red-800 text-sm text-center px-5">10</span>

                            <span class="text-red-800 text-sm text-center">% </span>
                        </div> -->
                        <hr class="w-64 mx-10" style="border: 1px solid #c2796a">
                        <div class="flex flex-row-3 justify-center">
                            <span class="text-red-800 text-sm text-center px-10">รวมทั้งสิ้น
                            </span>
                            <span class="text-red-800 text-sm text-center px-5">{{ formOrder.totalPrice.toLocaleString()
                                }}</span>

                            <span class="text-red-800 text-sm text-center">บาท </span>
                        </div>
                        <hr class="w-64 mx-10" style="border: 1px solid #c2796a">
                        <hr class="w-64 mx-10" style="border: 1px solid #c2796a">
                    </div>
                </div>
            </div>
            <div class="w-full bg-white rounded-xl py-5">
                <div class="px-6">
                    <span class="text-lg font-semibold text-red-800">ข้อมูลลูกค้า</span>
                </div>
                <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
                <div class="flex flex-row flex-wrap px-10 mt-3 ">
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">เบอร์โทร</span>
                        <input pattern="[0-9]*" maxlength="10" :disabled="!formSupplierActive"
                            class="h-8  focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formSupplier.phone" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">ชื่อ</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.firstName" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">สกุล</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.lastName" />
                    </div>


                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">ที่อยู่</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.address" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">จังหวัด</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.province" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">อำเภอ</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.district" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3">
                        <span class="text-red-800 font-semibold">ตำบล</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.subDistrict" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3">
                        <span class="text-red-800 font-semibold">ไปรษณีย์</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            :disabled="!formSupplierActive" v-model="formSupplier.zipCode" />
                    </div>

                </div>
            </div>
            <div id="btn-save" class="flex justify-center py-10" v-if="rowAction !== null">
                <buttonPrimaryOutline @click="onSubmitForm" label="บันทึกข้อมูล" />
            </div>
        </div>

        <alert :titleMessage="formAlert.title" :bodyMessage="formAlert.body" :status="formAlert.status"
            @close-alert-modal="onCloseAlert" />
    </div>
</template>