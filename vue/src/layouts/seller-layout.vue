<script setup>
	import { RouterView } from "vue-router";
	import MainDashboard from "@/components/dashboard/widgets/main-dashboard.vue";

	import { sidebar, navbar } from "@/components/dashboard/seller/config.ts";
</script>

<template>
	<main>
		<MainDashboard
			:sidebar="sidebar"
			title="Seller"
			:sub-title="'@' + user.username"
			:nama="user.nama"
			:navbar="navbar"
		>
			<router-view />
		</MainDashboard>
	</main>
</template>

<script>
	import { AuthController } from "@/controller/controllers/AuthController.ts";
	import { Controller as UserStorageController } from "@/components/dashboard/seller/controller.ts";

	const auth = new AuthController();

	export default {
		computed: {
			user() {
				// return auth.store.user;
				return {};
			},
		},
		// async beforeRouteEnter(to, from, next) {
		// 	await auth.init();
		// 	if (auth.store.isAuth && auth.store.user.role === "4dm1n-t0kO") {
		// 		auth.setToken();
		// 		next();
		// 		return;
		// 	}

		// 	await auth.signOut(() => {
		// 		next("/login");
		// 	});
		// },
		// async beforeRouteLeave(to, from, next) {
		// 	await auth.reset();
		// 	new UserStorageController().dispose();
		// 	next();
		// },
	};
</script>
