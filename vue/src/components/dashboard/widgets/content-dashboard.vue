<script setup>
	import NavbarDashboard from "./navbar-dashboard.vue";

	const props = defineProps({
		profilMenu: {
			type: Array,
			
		},
		
		nama:{
			type: String,
			default: "Unknow"
		}
	});
</script>

<template>
	<div class="content-wrapper flex flex-col">
		<div class="navbar-wrapper flex-none shadow-md">
			<NavbarDashboard
				:profil-menu="profilMenu"
				
				:nama="nama"
			/>
		</div>
		<div class="main-wrapper flex-auto shadow-inner">
			<slot></slot>
		</div>
		<div class="footer-wrapper flex-none"></div>
	</div>
</template>
