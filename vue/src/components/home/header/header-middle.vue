<template>
	<div class="flex justify-between items-center py-[15px]">
		<router-link class="brand flex items-center mx-[-10px] flex-auto" to="/">
			<img src="/assets/logo/white.svg" class="size-16" alt="logo" />
			<p class="text-2xl">DiahShoope</p>
		</router-link>
		<div class="search flex-3/12">
			<InputGroup>
				<InputText
					placeholder="Keyword"
					class="w-150 ps-3 py-0 border-0 bg-transparent"
				/>
				<Button icon="pi pi-search text-white" severity="secondary" variant="text" />
			</InputGroup>
		</div>
		<div class="keranjang flex-auto flex justify-end relative">
			<Button
				icon="pi pi-shopping-cart hover:bg-transparent text-white"
				severity="secondary"
				size="large"
				variant="text"
				as="router-link"
				to="/keranjang"
			/>
			<Badge
				v-if="keranjang > 0"
				:value="keranjang"
				class="absolute -top-1 -right-2"
				size="small"
				severity="secondary"
				data-aos="fade-up-right"
				data-aos-anchor-placement="bottom"
				:data-aos-once="true"
			/>
		</div>
	</div>
</template>

<script>
	import { MainData } from "@/components/home/components/keranjang/controller";

	const __m = new MainData();

	export default {
		data() {
			return {
				keranjangShow: false,
			};
		},

		computed: {
			keranjang() {
				return __m.items.length;
			},
		},
		async mounted() {
			__m.init();
		},
	};
</script>
