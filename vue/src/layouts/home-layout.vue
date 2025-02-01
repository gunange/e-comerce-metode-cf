<script setup lang="ts">
	import { onMounted } from "vue";
	import { RouterView } from "vue-router";

	import "@/assets/css/home/main.css";
	import "@/assets/css/home/responsif.css";

	import LoadingArea from "@/widgets/others/loading-area.vue";
	import HeaderMain from "@/components/home/widgets/header-widget/main-widget.vue";
	import FooterMain from "@/components/home/widgets/footer-widget/main-widget.vue";

	import { LoadHtml } from "@/controller/tools";

	const tools = new LoadHtml();

	const isLoadHtml = tools.items.html.load;

	onMounted(() => {
		tools.run();
	});
</script>

<template>
	<div>
		<LoadingArea v-show="isLoadHtml" />
		<div v-show="!isLoadHtml">
			<div class="home">
				<HeaderMain />
				<main class="home-wraper">
					<router-view />
				</main>
				<FooterMain />
			</div>
		</div>
	</div>
</template>
