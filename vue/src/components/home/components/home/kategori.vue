<script setup>
	import { api } from "@/config/apiConfig.js";
</script>
<template>
	<div class="md:w-[80%] mx-auto mt-10 bg-white py-5">
		<div class="px-5 pb-4 border-b border-gray-200 mb-5">
			<p>Kategori</p>
		</div>
		<div class="p-5 flex justify-around">
			<div class="text-center cursor-pointer" @click="kategoriChange('Elektronik')">
				<img src="/assets/icon/electronik.svg" class="size-20" alt="" />
				<p class="">Elektronik</p>
			</div>
			<div class="text-center cursor-pointer" @click="kategoriChange('Kosmetik')">
				<img src="/assets/icon/kosmetik.svg" class="size-20" alt="" />

				<p class="">Kosmetik</p>
			</div>
			<div class="text-center cursor-pointer" @click="kategoriChange('Fashion')">
				<img src="/assets/icon/fashion.svg" class="size-20" alt="" />
				<p class="">Fashion</p>
			</div>
		</div>
	</div>
	<div class="md:w-[80%] mx-auto mt-5 mb-20">
		<div
			class="grid md:grid-cols-5 sm:grid-cols-2 gap-4"
			v-if="items.length && store.run"
		>
			<CardProduct
				v-for="(item, i) in items"
				:key="i"
				:title="item.label"
				:subtitle="'Rp. ' + item.harga"
				:description="item.deskripsi"
				:image="`${api.url_api}storage/` + item.foto"
				:item-id="item.id"
				@detail-product="goToProduct"
			/>
		</div>
		<div class="text-red-400 text-center text-2xl" v-else-if="store.run">
			<i class="pi pi-exclamation-triangle text-4xl mt-5" />
			<p>Item Not Found</p>
		</div>
	</div>
</template>

<script>
	import CardProduct from "@/components/home/widgets/card-product.vue";
	import { Controller } from "@/components/home/controller.ts";

	import { get } from "@/controller/others/RequestApiController";

	const __c = new Controller();

	export default {
		data() {
			return {
				kategori: null,
			};
		},
		components: {
			CardProduct,
		},
		computed: {
			store() {
				return __c.store.kategori;
			},
			items() {
				return this.store.data;
			},
			load() {
				return this.store.load;
			},
		},
		methods: {
			async kategoriChange(kategori) {
				this.kategori = kategori;
				await this.init();
			},
			async init() {
				if (!this.kategori) return;
				if (this.store.load) return;
				this.store.load = true;

				const { data, status } = await get(`main/product/kategori/${this.kategori}`);
				this.store.data = data;
				this.store.run = status === 200;
				this.store.load = false;
			},
			async goToProduct(a) {
				this.$router.push({ name: "home-detail-product", params: { id: a.id } });
			},
		},
	};
</script>
