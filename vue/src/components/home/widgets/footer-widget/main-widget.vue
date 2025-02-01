<script setup lang="ts">
	import FooterBottom from "./footer-bottom.vue";
	import FooterMiddle from "./footer-middle.vue";
	import FooterTop from "./footer-top.vue";

	import { computed } from "vue";

	import { homeStore } from "@/stores/others/home";

	const onScrollToTop = computed(() => homeStore().onScroll);

	const scrollTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
</script>

<template>
	<main>
		<footer class="footer">
			<FooterTop />
			<FooterMiddle />
			<FooterBottom />
		</footer>
		<div class="fixed right-12 bottom-14" v-show="onScrollToTop">
			<p
				class="rounded-full bg-blue-500 text-white px-3 py-2 animated fadeInUp delay-1s"
				@click="scrollTop"

			>
				<i class="pi pi-sort-up-fill"></i>
			</p>
		</div>
	</main>
</template>
