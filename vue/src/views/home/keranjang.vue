<script setup>
	import KeranjangView from "@/components/home/components/home/keranjang/index.vue";
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
		<div class="mt-10 mb-15 bg-white p-5 rounded-md">
			<KeranjangView />
		</div>
	</div>
</template>

<script>
	import { MainData } from "@/components/home/components/home/keranjang/controller.ts";

	const __m = new MainData();

	export default {
		async beforeRouteEnter(to, from, next) {
			await __m.init();
			next();
		},
	};
</script>
