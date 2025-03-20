<script setup>
	import BradcumpWidget from "@/widgets/others/bardcump-widget.vue";
	import Cruds from "@/components/dashboard/seller/cruds/orders/views/index.vue";
</script>
<template>
	<div>
		<div class="px-5 mt-5">
			<BradcumpWidget
				:home="{
					icon: 'pi pi-home',
					route: '/seller',
				}"
				:items="[{ label: 'Library', route: '/seller' }]"
			/>
		</div>
		<div class="px-5 mt-5">
			<div class="card">
				<div class="card-header flex justify-between">
					<div class="flex-none flex items-center">
						<h6><i class="pi pi-sparkles" /> <span>Pesanan Selesai</span></h6>
					</div>

					<div class="flex items-center justify-end">
						<Button
							icon="pi pi-refresh"
							class="ml-2"
							size="small"
							v-tooltip.top="'Refresh'"
							outlined
							@click="main.reset()"
						/>

						
					</div>
				</div>
				<div class="card-body">
					<div class="search-easy-table mb-5">
						<InputGroup class="">
							<InputGroupAddon>
								<i class="pi pi-search text-primary"></i>
							</InputGroupAddon>
							<InputText placeholder="Search.." v-model="table.search" />
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
							<Button @click="$refs.ref_cruds.open('image-view', item.id)" icon="pi pi-image" />
						</template>

						<template #loading>
							<img src="/assets/gif/bola.gif" style="width: 100px; height: 80px" />
						</template>

						<template #item-total_price="item">
							<span>
								{{ convertCurency(item.harga) }} ({{ item.quantity }} Product)
							</span>
						</template>

						<template #item-ranting="item">
							<div class="">
								<Rating v-model="item.ranting" readonly  />
							</div>
						</template>
						
						<template #expand="item">
							<div>
								<div v-for="(e, i) in item.status_order" :key="i" class="mb-2">
									<p>
										Status : {{e.status}}
									</p>
									<p><i class="pi pi-calendar text-blue-300 " /> : {{time.formatDate(e.created_at, true)}}</p>
								</div>
								<div class="mt-5 flex items-center underline decoration-wavy">
									<span class="pi pi-envelope me-2"/>
									<p>{{ item.komentar }}</p>
								</div>
							</div>
						</template>
					</EasyDataTable>
				</div>
			</div>
		</div>
		<Cruds ref="ref_cruds" />
	</div>
</template>

<script>
	import { ref as vueRef } from "vue";
	import { MainData } from "@/components/dashboard/seller/cruds/orders/controller";
	import * as tools from "@/controller/tools";
	import { TimeApp } from "@/controller/tools";

	const main = new MainData();

	export default {
		data() {
			return {
				table: vueRef({
					search: vueRef(""),
					th: [
						{ text: "Pemesan", value: "pelanggan.user.nama" },
						{ text: "Product", value: "label" },
						{ text: "Jasa Kirim", value: "jasa_kirim" },					
						{ text: "Jumlah Pesanan", value: "total_price" },
						{ text: "Rating", value: "ranting" },
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

		computed: {
			items() {
				return main.itemsSelesai;
			},
			loadItems() {
				return main.data.load;
			},
			time(){
				return new TimeApp();
			}
		},
		methods: {
			...tools,
		},
		async mounted() {
			if (!main.data.run) await main.init();
		},
	};
</script>
