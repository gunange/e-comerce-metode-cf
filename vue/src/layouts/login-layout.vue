<script setup>
	import "@/assets/css/login/main.css";
	import "@/assets/css/login/responsif.css";

</script>

<template>
	<RouterView />
</template>

<script>
	import { AuthController } from "@/controller/controllers/AuthController.ts";
	import { Controller } from "@/components/login/controller.ts";

	// const auth = new AuthController();

	export default {
		// async beforeRouteEnter(to, from, next) {
		// 	await auth.init();
		// 	if (auth.isAuth) {
		// 		const controller = new Controller();
		// 		const routeTo = controller.routeRedirect(auth.user);

		// 		if (routeTo) {
		// 			next(routeTo);
		// 			return;
		// 		}
		// 	}
		// 	next();
		// },
	};
</script>
