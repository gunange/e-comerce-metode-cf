<script setup>
	import { onMounted } from "vue";
	import { RouterView } from "vue-router";

	import "@/assets/css/home/main.css";
	import "@/assets/css/home/responsif.css";

	import HeaderCostume from "@/components/home/header/index.vue";

	import { LoadHtml } from "@/controller/tools";

	const tools = new LoadHtml();

	const isLoadHtml = tools.items.html.load;

	onMounted(() => {
		tools.run();
	});
</script>

<template>
	<div class="home">
		<HeaderCostume />
		<div class="wrapper">
			<RouterView />
		</div>
	</div>
</template>

<script>
	import { AuthController } from "@/controller/controllers/AuthController";
	import { Controller } from "@/components/home/controller.ts";
	import { HeaderLandingPage } from "@/controller/tools";

	

	const auth = new AuthController();
	const _c = new Controller();

	export default {
		async beforeRouteEnter(to, from, next) {
			await auth.init();
			if (auth.isAuth) {
				auth.setToken();
			}
			next();
		},

		mounted(){
			const __header = new HeaderLandingPage(document.getElementById("header"));
			__header.init();
		}
	};
</script>
