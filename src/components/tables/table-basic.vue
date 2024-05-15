<script setup>
const props = defineProps(['columns', 'rows'])
</script>

<template>
    <table class="table ">
        <thead>
            <tr style="background-color: #A2422C;">
                <th v-for="(column, index) in props.columns" :key="index" class="text-white text-lg"
                    :style="`width: ${column.width}`">{{ column.label }}</th>
            </tr>
        </thead>
        <tbody class="bg-white">
            <tr v-for="(row, index) in props.rows" :key="index">
                <td v-for="(column, index) in props.columns" :key="index" class="font-semibold">{{ row[column.field] }}</td>
            </tr>
        </tbody>
        
    </table>
    
</template>



<style></style>