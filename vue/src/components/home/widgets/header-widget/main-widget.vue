<script setup lang="ts">
	import MegaMenu from "primevue/megamenu";

	import BeforeWidget from "./before-widget.vue";
	import BrandWidget from "./brand-widget.vue";
	import { ref,reactive, onMounted, onBeforeUnmount } from "vue";
	import { homeStore } from "@/stores/others/home";

	import { menu } from "./menu";
	const header = ref();
	const _homeS = homeStore();
	let timeOut;

	const handleScrollDebounced = (scrollTop) => {
		clearTimeout(timeOut);
		timeOut = setTimeout(() => {
			_homeS.onScroll = scrollTop > 631;
		}, 150);
	};

	const handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		var sticky = header.value.offsetTop;
		if (scrollTop > sticky) {
			header.value.classList.add("on-scroll");
		} else {
			header.value.classList.remove("on-scroll");
		}
		handleScrollDebounced(scrollTop);
	};

	const setHeightHeader = () => {
		if (!header.value) return;
		const height = header.value.offsetHeight ?? 30;
		document.documentElement.style.setProperty("--nav-height", `${height}px`);
	};

	onMounted(() => {
		header.value = document.getElementById("header");

		setHeightHeader();
		window.addEventListener("scroll", handleScroll);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("scroll", handleScroll);
	});
</script>
<template>
	<header class="header" id="header">
		<BeforeWidget />

		<div class="py-2 container 2xl:max-w-6xl">
			<MegaMenu
				:model="menu as any"
				class="flex justify-between"
				:pt="{
					column: {
						class: ['mx-7'],
					},

					submenuIcon: {
						class: ['mr-7'],
					},
				}"
			>
				<template #start>
					<BrandWidget />
				</template>
				<template #item="{ item }">
					<p class="text-xs">
						<i :class="item.icon"></i> <span>{{ item.label }}</span>
					</p>
					<span>{{ item.subtext }}</span>
				</template>
				<template #end>
					<div class="flex">
						<div class="">
							<!-- <Button label="Pendaftaran!" class="px-3 me-3 py-3 text-[0.60rem]" /> -->
							<router-link to="/login" >
								<Button label="Login!" class="px-3 py-2 text-[0.60rem]" />
							</router-link>
						</div>
					</div>
				</template>
			</MegaMenu>
		</div>
	</header>
</template>
