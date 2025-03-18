<template>
	<div class="">
        <div class="search-easy-table mb-5">
            <InputGroup class="">
                <InputGroupAddon>
                    <i class="pi pi-search text-primary"></i>
                </InputGroupAddon>
                <InputText placeholder="Search.." v-model="table.search" class="text-xs" />
            </InputGroup>
        </div>
        <EasyDataTable
            :items="items"
            :loading="loadItems"
            :headers="table.th"
            :search-value="table.search"
            :sort-by="table.sort"
            :sort-type="table.sortType"
            :rowsItems="table.rowsItems"
            :rowsPerPage="table.rowsPerPage"
            rows-per-page-message="Jumlah data per-halaman"
            rows-of-page-separator-message="dari"
            theme-color="rgb(var(--primary))"
            table-class-name="customize-table"
            empty-message="Data tidak ditemukan"
            show-index
        >
            <template #header-operation>
                <div class="text-center">
                    <i class="pi pi-spin pi-cog"></i>
                </div>
            </template>
            <template #item-operation="item">
                <Button
                    @click="$refs.ref_cruds.open('image-view', item.id)"
                    icon="pi pi-image"
                />
            </template>

            <template #loading>
                <img src="/assets/gif/bola.gif" style="width: 100px; height: 80px" />
            </template>

            <template #item-total_price="item">
                <span>
                    {{ convertCurency(item.harga) }} ({{ item.quantity }} Product)
                </span>
            </template>

            <template #expand="item">
                <div>
                    <div v-for="(e, i) in item.status_order" :key="i" class="mb-2">
                        <p>Status : {{ e.status }}</p>
                        <p>
                            <i class="pi pi-calendar text-blue-300" /> :
                            {{ time.formatDate(e.created_at, true) }}
                        </p>
                       
                    </div>
                </div>
            </template>
        </EasyDataTable>
        <Cruds ref="ref_cruds" />
    </div>
</template>

<script>
	import { ref as vueRef } from "vue";
	import { MainData } from "@/components/home/components/pesanan/controller.ts";
	import * as tools from "@/controller/tools";
	import { TimeApp } from "@/controller/tools";
    import Cruds from "@/components/home/components/pesanan/views/index.vue";

	const main = new MainData();

	export default {
		data() {
			return {
				table: vueRef({
					search: vueRef(""),
					th: [
						{ text: "Toko", value: "toko.nama_toko" },
						{ text: "Product", value: "label" },
						{ text: "Jasa Kirim", value: "jasa_kirim" },
						{ text: "Estimasi", value: "estimasi" },
						{ text: "Jumlah Pesanan", value: "total_price" },
						{ text: "Operation", value: "operation" },
					],
					isUpdate: false,
					itemsSelected: [],
					sort: ["tanggal", "waktu"],
					sortType: ["desc", "desc"],
					rowsItems: [15, 25, 50],
					rowsPerPage: 15,
				}),
			};
		},
        components :{
            Cruds
        },
		computed: {
			items() {
				return main.itemsDikirim;
			},
			loadItems() {
				return main.data.load;
			},
			time() {
				return new TimeApp();
			},
		},
		methods: {
			...tools,
		},
		async mounted() {},
	};
</script>
