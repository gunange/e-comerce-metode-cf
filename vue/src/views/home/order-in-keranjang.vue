<script setup>
	import AlamatView from "@/components/home/components/order/alamat.vue";
	import MainView from "@/components/home/components/order/main-in-keranjang.vue";
</script>

<template>
	<div class="md:w-[80%] mx-auto mt-10">
		<div class="bg-white px-5 py-2 ps-2 rounded-lg flex justify-between items-center">
			<Button
				label="Back to Home"
				icon="pi pi-angle-left"
				variant="text"
				as="router-link"
				to="/"
			/>
			<i class="pi pi-home text-lg" />
		</div>

		<AlamatView />
		<MainView />
	</div>
</template>

<script>
	import { MainData } from "@/components/home/components/order/controller";
	const __main = new MainData();

	export default {
		async beforeRouteEnter(to, from, next) {			
			__main.data.id = to.params.id;
			await __main.initFormKeranjang();
			next();
		},
	};
</script>
