<script setup>
	import { ref as vueRef } from "vue";

	
	import SuksesModal from "./sukses.vue";
	import ErrorModal from "./error.vue";

	const ref_sukses = vueRef();
	const ref_error = vueRef();

	const open = async (act = "", msg= {}) => {
		if (act == "sukses" ) {
			ref_sukses.value.open(act, msg);
		} else if (act == "gagal") {
			ref_error.value.open(act, msg);
		}
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<SuksesModal ref="ref_sukses" />
		<ErrorModal ref="ref_error" />
	</main>
</template>
