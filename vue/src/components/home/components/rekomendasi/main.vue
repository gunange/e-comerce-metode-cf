<script setup>
import { api } from "@/config/apiConfig.js";
</script>
<template>
	<div class="md:w-[80%] mx-auto mt-10 mb-15">
		<div class="px-5 pb-4 border-b-4 border-sky-500 mb-5 text-center bg-white py-5">
			<p class="">Rekomendasi</p>
		</div>
		<div class="">
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
	</div>
</template>

<script>
	import CardProduct from "@/components/home/widgets/card-product.vue";
	import { MainData } from "@/components/home/components/rekomendasi/controller.ts";

	const __main = new MainData();
	export default {
		components: {
			CardProduct,
		},
		computed: {
			store() {
				return __main.data;
			},
			items() {
				return __main.items;
			},
			load() {
				return __main.data.load;
			},
		},
        methods :{
            async goToProduct(a) {
				this.$router.push({ name: "home-detail-product", params: { id: a.id } });
			},
        }
	};
</script>
