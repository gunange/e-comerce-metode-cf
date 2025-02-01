<script setup lang="ts">
	import { color } from "@/config/vue-prime/presets/color";
	import { ref } from "vue";

	const props = defineProps({
		items: {
			type: Array,
			default: [
				{ label: "Electronics" },
				{ label: "Computer" },
				{ label: "Accessories" },
				{ label: "Keyboard" },
				{ label: "Wireless" },
			],
		},
		home: {
			type: Object,
			default: {
				icon: "pi pi-home",
			},
		},
		head: {
			type: String,
			default: "Pendaftaran Mahasiswa Baru",
		},
		subHead: {
			type: String,
			default: "Dapatkan kemudahan semua informasi dalam 1 genggaman",
		},
	});
</script>

<template>
	<div class="batas-for-el-header"></div>
	<div class="breadcrumbs text-sm">
		<div class="container 2xl:max-w-6xl text-white">
			<div class="breadcrumb-body">
				<h1 class="text-3xl mb-7 font-extrabold">{{ head }}</h1>
				<div class="h-0.5 w-20 bg-white rounded-sm mb-8"></div>
				<p>{{ subHead }}</p>
			</div>

			<div class="breadcump-rute mt-12">
				<Breadcrumb
					:home="home"
					:model="items"
					pt:root:style="background : transparent; padding: 0"
					:dt="{
						item: {
							color: 'rgb(var(--surface-0))',
							icon: {
								color: 'rgb(var(--surface-300))',
							},
							hover: {
								color: 'rgb(var(--primary-200))',
							},
						},
					}"
				>
					<template #separator> | </template>
				</Breadcrumb>
			</div>
		</div>
	</div>
</template>
