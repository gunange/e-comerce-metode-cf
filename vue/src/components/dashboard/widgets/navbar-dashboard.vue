<script setup>
	import IconField from "primevue/iconfield";
	import InputIcon from "primevue/inputicon";
	import OverlayBadge from "primevue/overlaybadge";

	import { ref } from "vue";

	import { dashboardStore } from "@/stores/others/dashboard";
	import { appLogo } from "@/config/appInfo.js";

	const sideActive = dashboardStore();

	const search = ref("");

	const props = defineProps({
		profilMenu: {
			type: Array,
			
		},
		notif: {
			type: Array,
			
		},
		message: {
			type: Array,
			
		},
		nama:{
			type: String,
			default: "Unknow"
		}
	});
</script>

<template>
	<div>
		<div class="flex">
			<div class="flex-none">
				<Button
					id="menu-toggle"
					@click="sideActive.sidebarActive = !sideActive.sidebarActive"
					class="px-5 text-[.9rem]"
				>
					<i class="lni lni-chevron-left me-2" v-if="sideActive.sidebarActive"></i>
					<i class="lni lni-menu me-2" v-else></i>
					Menu
				</Button>
			</div>
			<div class="flex-none w-2/4 search px-5 ">
				<IconField>
					<InputIcon class="pi pi-search text-xs" />
					<InputText
						v-model="search"
						placeholder="Search.."
						variant="filled"
						class="w-full text-xs dark:bg-slate-600"
					/>
				</IconField>
			</div>
			<div class="flex-1 flex justify-end align-items-center">
				<div class="flex justify-end items-center">
					<div
						class="bg-slate-100 dark:bg-slate-600 rounded-[8px] w-7 h-7 flex justify-center items-center cursor-pointer"
						@click="$refs.notif.toggle"
					>
						<OverlayBadge :value="notif.length" size="small">
							<i class="pi pi-bell" style="font-size: 0.6rem" />
						</OverlayBadge>
					</div>
					<div
						class="bg-slate-100 dark:bg-slate-600 rounded-[8px] w-7 h-7 flex justify-center items-center ml-4 cursor-pointer"
						@click="$refs.message.toggle"
					>
						<OverlayBadge
							:value="message.length"
							size="small"
							severity="danger"
						>
							<i class="pi pi-envelope" style="font-size: 0.6rem" />
						</OverlayBadge>
					</div>
				</div>
				<div
					class="ml-10 flex justify-end cursor-pointer items-center text-slate-500"
					@click="$refs.profilMenu.toggle"
				>
					<p class="text-xs font-bold dark:text-blue-400">{{nama}}</p>
					<div class="image ml-3">
						<img :src="appLogo" alt="" />
						<span class="status"></span>
					</div>
					<div class="flex justify-center items-center ml-1">
						<i class="pi pi-chevron-down text-blue-400 text-[.5rem]"></i>
					</div>
				</div>
				<Menu
					ref="profilMenu"
					:model="profilMenu"
					:popup="true"
					class="animated fadeInUp text-xs"
					pt:root:style="top : 95px; min-width: 14.5rem;"
				/>
				<Menu
					ref="notif"
					:model="notif"
					:popup="true"
					class="animated fadeInUp text-xs"
					pt:root:style="top : 95px; min-width: 14.5rem;"
				/>
				<Menu
					ref="message"
					:model="message"
					:popup="true"
					class="animated fadeInUp text-xs"
					pt:root:style="top : 95px; min-width: 14.5rem;"
				/>
			</div>
		</div>
	</div>
</template>
