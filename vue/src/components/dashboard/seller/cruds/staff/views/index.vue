<script setup>
	import { ref as vueRef } from "vue";

	import AddAndUp from "./add-up.vue";
	import DelData from "./del.vue";
	import RessetPassword from "./reset-password.vue";
	

	const ref_add_and_up = vueRef();
	const ref_del = vueRef();
	const ref_resset_password = vueRef();
	

	const open = async (act = "", uid = "unknow") => {
		if (act == "add" || act == "up") {
			ref_add_and_up.value.open(act, uid);
		} 
		else if (act == "del") {
			ref_del.value.open(act, uid);
		} 
		else if (act == "reset-password") {
			ref_resset_password.value.open(act, uid);
		} 
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<AddAndUp ref="ref_add_and_up" />
		<DelData ref="ref_del" />
		<RessetPassword ref="ref_resset_password" />
	</main>
</template>
