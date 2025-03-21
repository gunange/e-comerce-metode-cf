<script setup>
	import { RouterView } from "vue-router";
	import MainDashboard from "@/components/dashboard/widgets/main-dashboard.vue";

	import { sidebar, navbar } from "@/components/dashboard/staff/config.ts";
</script>

<template>
	<main>
		<MainDashboard
			:sidebar="sidebar"
			:title="user?.nama_toko"
			:sub-title="'@' + user?.user?.username ?? null"
			:nama="user?.nama ?? 'Unknow'"
			:navbar="navbar"
		>
			<router-view />
		</MainDashboard>
	</main>
</template>

<script>
	import { AuthController } from "@/controller/controllers/AuthController.ts";
	import { Controller as UserStorageController } from "@/components/dashboard/staff/controller.ts";

	const auth = new AuthController();

	export default {
		computed: {
			user() {
				return auth.store.user;
			},
		},
		async beforeRouteEnter(to, from, next) {
			await auth.reset();
			await auth.init();
			if (auth.store.isAuth && auth.store.user.role === "p3gaw4i-t0kO") {
				auth.setToken();
				next();
				return;
			}

			await auth.signOut(() => {
				next("/login");
			});
		},
		async beforeRouteLeave(to, from, next) {
			await auth.reset();
			new UserStorageController().dispose();
			next();
		},
	};
</script>
