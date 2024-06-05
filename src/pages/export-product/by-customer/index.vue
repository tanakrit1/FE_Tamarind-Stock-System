<script setup>
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import tableBasic from "../../../components/tables/table-basic.vue";
import subDistrict from "../../../assets/address/thai_tambons.json"
import district from "../../../assets/address/thai_amphures.json"
import province from "../../../assets/address/thai_provinces.json"
import { onMounted, ref } from "vue";
import _apiProduct from "../../../api/master-products"
import _apiCustomer from "../../../api/master-customer"
import _apiTranExport from "../../../api/export-product"
import alert from "../../../components/alert/alert.vue"
import store from "../../../store";

const columns = [
    { field: "productName", label: "ชื่อสินค้า", width: "20%" },
    { field: "quantity", label: "ปริมาณสินค้า", width: "10%" },
    { field: "price", label: "ราคารวม", width: "10%" },
    { field: "customerFirstName", label: "ชื่อ", width: "20%" },
    { field: "customerLastName", label: "สกุล", width: "20%" },
    { field: "customerAddress", label: "ที่อยู่", width: "25%" },
    { field: "customerSubDistrict", label: "ตำบล", width: "20%" },
    { field: "customerDistrict", label: "อำเภอ", width: "20%" },
    { field: "customerProvince", label: "จังหวัด", width: "20%" },
    { field: "customerZipCode", label: "ไปรษณีย์", width: "10%" },
]
const rows = ref([]);
const ddl = ref({
    province: [],
    district: [],
    subDistrict: [],
    product: [],
    listProductAll: []
})
const formCustomerActive = ref(false)

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

const formCustomer = ref({
    firstName: "",
    lastName: "",
    address: "",
    province: "",
    district: "",
    subDistrict: "",
    zipCode: "",
    phone: "",
})

const onClearFormCustomer = () => {
    formCustomer.value = {
        id: "",
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

const onChangeProvince = async (provinceID) => {
    const filterDistrict = district.filter(
        (item) => item.province_id == provinceID
    );
    ddl.value.district = filterDistrict.map(item => {
        return { label: item.name_th, value: item.id }
    });
    formCustomer.value.district = "";
    formCustomer.value.subDistrict = "";
    formCustomer.value.zipCode = "";
};

const onChangeDistrict = async (districtID) => {
    const filterSubDistrict = subDistrict.filter(
        (item) => item.amphure_id == districtID
    );
    ddl.value.subDistrict = filterSubDistrict.map(item => {
        return { label: item.name_th, value: item.id }
    })
    formCustomer.value.subDistrict = "";
    formCustomer.value.zipCode = "";
};

const onChangeSubDistrict = async (subDistrictID) => {
    const zipCode = subDistrict.find((item) => item.id == subDistrictID).zip_code;
    formCustomer.value.zipCode = zipCode;
};

const onChangeProduct = (productID) => {
    if (productID !== "") {
        formOrder.value.price = ddl.value.listProductAll.find(item => item.id == productID).priceOut?.toLocaleString()
        formOrder.value.totalPrice = formOrder.value.price
        formOrder.value.quantity = "1"
    } else {
        formOrder.value.price = ""
    }

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
            formAlert.value = {
                status: true,
                title: "เกิดข้อผิดพลาด",
                body: response.message
            }
        }

    })
    ddl.value.province = province.map(item => {
        return { label: item.name_th, value: item.id }
    })
}

const onSearchCustomer = async (phone) => {
    store.commit("setStatusLoading", true);
    const body = {
        page: 1,
        limit: 1,
        filterModel: {
            logicOperator: "and",
            items: [
                {
                    field: "phone",
                    operator: "equals",
                    value: phone
                }
            ]
        }
    }
    await _apiCustomer.search(body, response => {
        if (response.statusCode === 200) {
            if (response.data.length > 0) {
                formCustomerActive.value = false
                formCustomer.value.firstName = response.data[0].firstName
                formCustomer.value.lastName = response.data[0].lastName
                formCustomer.value.address = response.data[0].address
                formCustomer.value.province = response.data[0].province
                formCustomer.value.district = response.data[0].distric
                formCustomer.value.subDistrict = response.data[0].subDistric
                formCustomer.value.zipCode = response.data[0].zipCode
                formCustomer.value.phone = response.data[0].phone
            } else {
                formAlert.value = {
                    status: true,
                    title: "เเจ้งเตือน",
                    body: "ไม่พบรายชื่อลูกค้าในระบบ กรณาเพิ่มลูกค้าใหม่"
                }
                formCustomerActive.value = true
                formCustomer.value = {
                    firstName: "",
                    lastName: "",
                    address: "",
                    province: "",
                    district: "",
                    subDistrict: "",
                    zipCode: "",
                    phone: phone,
                }
            }
        } else {
            formAlert.value = {
                status: true,
                title: "เกิดข้อผิดพลาด",
                body: response.message
            }
            formCustomerActive.value = true
            onClearFormCustomer()
        }
        store.commit("setStatusLoading", false);
    })
}

const fnValidate = async (pFormOrder, pFormCustomer) => {
    const totalForm = { ...pFormOrder, ...pFormCustomer }
    for (let i = 0; i < Object.keys(totalForm).length; i++) {
        const key = Object.keys(totalForm)[i]
        if (totalForm[key] == "") {
            return false
        }
    }
    return true
}

const onCreateTransection = async (pFormOrder, pFormCustomer) => {
    console.log("pFormCustomer--> ", pFormCustomer)
    store.commit("setStatusLoading", true);
    const body = {
        quantity: pFormOrder.quantity.toString(),
        price: Number(pFormOrder.totalPrice),
        typeAction: "ซื้อ-ขาย",
        product_id: pFormOrder.productID,

        firstName: pFormCustomer.firstName,
        lastName: pFormCustomer.lastName,
        address: pFormCustomer.address,
        subDistric: formCustomerActive.value===false ? pFormCustomer.subDistrict : subDistrict.find(item => item.id == pFormCustomer.subDistrict).name_th,
        distric: formCustomerActive.value===false ? pFormCustomer.district : district.find(item => item.id == pFormCustomer.district).name_th,
        province: formCustomerActive.value===false ? pFormCustomer.province : province.find(item => item.id == pFormCustomer.province).name_th,
        zipCode: pFormCustomer.zipCode.toString(),
        phone: pFormCustomer.phone
    }
    await _apiTranExport.create(body, response => {
        console.log("response : ", response)
        if (response.statusCode === 200) {
            formAlert.value = {
                status: true,
                title: "สำเร็จ",
                body: "เพิ่มข้อมูลเรียบร้อย"
            }
            onClearFormCustomer()
            onClearFormOrder()
            onLoadTable()
        } else {
            formAlert.value = {
                status: true,
                title: "เเจ้งเตือน",
                body: response.message
            }
        }
        store.commit("setStatusLoading", false);
    })
}

const onSubmitForm = async () => {
    const resultValid = await fnValidate(formOrder.value, formCustomer.value)
    if (resultValid) {
        await onCreateTransection(formOrder.value, formCustomer.value)
    } else {
        formAlert.value = {
            status: true,
            title: "เเจ้งเตือน",
            body: "กรุณากรอกข้อมูลให้ครบถ้วน"
        }
    }
}

const onLoadTable = async() => {
    store.commit("setStatusLoading", true);
    const body = {
        page: 1,
        limit: 10,
        sortField:"createdAt",
        sortType:"DESC",
        filterModel: {
            logicOperator: "and",
            items: [
                {
                    field: "typeAction",
                    operator: "equals",
                    value: "ซื้อ-ขาย"
                }
            ]
            
        }
    }

    await _apiTranExport.search( body, response => {
        console.log("response : ", response)
        rows.value = response.data.map( item => {
            return {
                productName: item.product.name,
                quantity: item.quantity,
                price: item.price,
                customerFirstName: item.customer.firstName,
                customerLastName: item.customer.lastName,
                customerAddress: item.customer.address,
                customerSubDistrict: item.customer.subDistric,
                customerDistrict: item.customer.distric,
                customerProvince: item.customer.province,
                customerZipCode: item.customer.zipCode
            }
        } )
        store.commit("setStatusLoading", false);
    } )
}

onMounted(async () => {
    await onLoadTable()
    await onLoadDDL()
})
</script>
<template>
    <div class="flex md:justify-center">
        <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-5 space-y-2 px-6">
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

                    <span class="text-2xl font-bold text-red-800">บันทึกรายการขายสินค้า</span>
                </div>
            </div>
            <div class="w-full bg-white rounded-xl py-5">
                <div class="px-6">
                    <span class="text-lg font-semibold text-red-800">รายละเอียดการสั่งซื้อสินค้า</span>
                </div>
                <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
                <div class="grid grid-cols-2 gap-4 px-6">
                    <div class="flex flex-wrap space-y-2 py-2">
                        <div class="flex flex-col md:flex-row space-x-2">
                            <div class="grid gap-4 grid-cols-2">
                                <div class="mb-3">
                                    <span class="text-red-800 font-semibold">ชื่อสินค้า</span>
                                    <select v-model="formOrder.productID"
                                        class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                                        @change="(event) => onChangeProduct(event.target.value)">
                                        <option value="">------เลือก------</option>
                                        <option v-for="(item, index) in ddl.product" :key="index" :value="item.value">
                                            {{ item.label }}
                                        </option>
                                    </select>
                                    <!-- <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                                        type="text" /> -->
                                </div>
                                <!-- <div class="mb-3">
                                    <span class="text-red-800 font-semibold">วันที่ขอเบิกสินค้า</span>
                                    <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                                        type="date" />
                                </div> -->
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row space-x-2">
                            <div class="grid gap-4 grid-cols-2">
                                <div class="grid gap-4 grid-cols-2 mb-3">
                                    <div>
                                        <span class="text-red-800 font-semibold">ปริมาณสินค้า</span>
                                        <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                                            @change="(event) => onChangeQuantity(event.target.value)" type="number"
                                            v-model="formOrder.quantity" />
                                    </div>
                                    <div>
                                        <span class="text-red-800 font-semibold">ราคาสินค้า</span>
                                        <input class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3" disabled
                                            type="text" v-model="formOrder.price" />
                                    </div>
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

                            <span class="text-red-800 text-sm text-center">ชิ้น</span>
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
                        <input pattern="[0-9]*" maxlength="10"
                            class="h-8  focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.phone" @blur="(event) => onSearchCustomer(event.target.value)" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">ชื่อ</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.firstName" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">สกุล</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.lastName" />
                    </div>


                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">ที่อยู่</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.address" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">จังหวัด</span>
                        <select v-if="formCustomerActive" v-model="formCustomer.province"
                            @change="(event) => onChangeProvince(event.target.value)"
                            class="h-8 focus:outline-red-400 rounded bg-red-100 px-3">
                            <option value="">------เลือก------</option>
                            <option v-for="(item, index) in ddl.province" :key="index" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                        <input v-else class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.province" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3 mb-3">
                        <span class="text-red-800 font-semibold">อำเภอ</span>
                        <select v-if="formCustomerActive" v-model="formCustomer.district"
                            @change="(event) => onChangeDistrict(event.target.value)"
                            class="h-8 focus:outline-red-400 rounded bg-red-100 px-3">
                            <option value="">------เลือก------</option>
                            <option v-for="(item, index) in ddl.district" :key="index" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>

                        <input v-else class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.district" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3">
                        <span class="text-red-800 font-semibold">ตำบล</span>
                        <select v-if="formCustomerActive" v-model="formCustomer.subDistrict"
                            @change="(event) => onChangeSubDistrict(event.target.value)"
                            class="h-8 focus:outline-red-400 rounded bg-red-100 px-3">
                            <option value="">------เลือก------</option>
                            <option v-for="(item, index) in ddl.subDistrict" :key="index" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                        <input v-else class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.subDistrict" />
                    </div>
                    <div class="sm:basis-full md:basis-1/2 lg:basis-2/6 flex flex-col px-3">
                        <span class="text-red-800 font-semibold">ไปรษณีย์</span>
                        <input class="h-8 focus:outline-red-400 rounded bg-red-100 px-3" type="text"
                            v-model="formCustomer.zipCode" />
                    </div>

                </div>
            </div>
            <div class="flex justify-center py-10">
                <buttonPrimaryOutline @click="onSubmitForm" label="บันทึกข้อมูล" />
            </div>

            <div class="mt-10">
                <tableBasic :columns="columns" :rows="rows" />
            </div>
        </div>

        <alert :titleMessage="formAlert.title" :bodyMessage="formAlert.body" :status="formAlert.status"
            @close-alert-modal="onCloseAlert" />
    </div>
</template>