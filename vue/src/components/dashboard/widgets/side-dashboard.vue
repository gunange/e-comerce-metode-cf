<script setup>
	import { appLogoLight } from "@/config/appInfo";
	const props = defineProps({
		menu: {
			type: Array,
		},
		title: {
			type: String,
		},
		subTitle: {
			type: String,
		},
	});
</script>

<template>
	<div class="sidebar-wrapper flex flex-col">
		<div class="side-header px-4 mb-8">
			<div class="flex-none flex justify-start items-center">
				<img :src="appLogoLight" alt="" class="w-16" />
				<div class="text-2xl font-bold text-sky-500 leading-none">
					<p>Diah</p>
					<p>Shoope</p>
				</div>
			</div>
			<div class="flex flex-col text-slate-500 dark:text-blue-400 ml-3 mt-3">
				<p class="font-bold text-md">{{ title }}</p>
				<p class="text-[12px]">{{ subTitle }}</p>
			</div>
		</div>
		<div class="side-body flex-1 text-sm">
			<PanelMenu
				:model="menu"
				class="menu"
				unstyled
				pt:headerLabel:class="ml-5"
				pt:header:class="item-header"
				pt:content:class="ml-5 item-sub"
			>
				<template #item="{ item, active }">
					<router-link
						v-if="item.route"
						v-slot="{ href, navigate }"
						:to="item.route"
						class="item"
					>
						<span :class="item.icon" />
						<span class="label">{{ item.label }}</span>
					</router-link>
					<a v-else class="item" :href="item.url" :target="item.target">
						<span :class="item.icon" />
						<span class="label">{{ item.label }} </span>
						<span
							v-if="item.items"
							class="pi pi-chevron-left transition duration-150"
							:class="[active ? '-rotate-90' : 'rotate-0']"
							style="font-size: 0.6rem"
						/>
					</a>
				</template>
			</PanelMenu>
		</div>
		<div class="side-footer flex-none"></div>
	</div>
</template>
