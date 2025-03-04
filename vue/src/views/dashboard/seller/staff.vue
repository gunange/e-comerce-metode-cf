<script setup>
	import BradcumpWidget from "@/widgets/others/bardcump-widget.vue";
	import Cruds from "@/components/dashboard/seller/cruds/staff/views/index.vue";
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
						<h6><i class="pi pi-sparkles" /> <span>Staff Setting</span></h6>
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

						<Button
							icon="pi pi-plus"
							class="ml-2"
							size="small"
							v-tooltip.top="'Tambah Data'"
							outlined
							@click="$refs.ref_cruds.open('add')"
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
							<div class="text-center w-100">
								<i class="pi pi-spin pi-cog"></i>
							</div>
						</template>
						<template #item-operation="item">
							<div class="" style="position: relative">
								<SpeedDial
									direction="left"
									style="position: absolute; top: -8px; right: 48%"
									:model="[
										{
											label: 'Update',
											icon: 'pi pi-pencil text-red',
											severity: 'success',
											command: () => $refs.ref_cruds.open('up', item.id),
										},
										{
											label: 'Delete',
											icon: 'pi pi-trash',
											severity: 'danger',
											command: () => $refs.ref_cruds.open('del', item.id),
										},
										{
											label: 'Swtich Status',
											icon: 'pi pi-sync',
											severity: 'info',
											command: () =>
												$refs.ref_cruds.open('switch-status', item.id),
										},
									]"
								>
									<template #button="{ toggleCallback }">
										<Button
											class=""
											@click="toggleCallback"
											icon="pi pi-align-right"
										/>
									</template>
									<template #item="{ item, toggleCallback }">
										<Button
											:icon="item.icon"
											:title="item.label"
											rounded
											:severity="item.severity ?? 'secondary'"
											@click="toggleCallback"
										/>
									</template>
								</SpeedDial>
							</div>
						</template>

						<template #loading>
							<img src="/assets/gif/bola.gif" style="width: 100px; height: 80px" />
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
	import { MainData } from "@/components/dashboard/seller/cruds/staff/controller";

	const main = new MainData();

	export default {
		data() {
			return {
				table: vueRef({
					search: vueRef(""),
					th: [
						{ text: "Nama", value: "nama" },
						{ text: "No.Heandphone", value: "no_hp" },
						{ text: "Username", value: "username" },						
						{ text: "Created", value: "created_at" },
						{ text: "Updated", value: "updated_at" },
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
				return main.items;
			},
			loadItems() {
				return main.data.load;
			},
		},
		methods: {},
		async mounted() {
			if (!main.data.run) await main.init();
		},
	};
</script>
