<script setup>
	import { ref as vueRef } from "vue";

	import TerimaPesanan from "./terima.vue";
	import DelData from "./del.vue";
	import ImageView from "./image-view.vue";

	const ref_terima = vueRef();
	const ref_del = vueRef();
	const ref_image_view = vueRef();

	const open = async (act = "", uid = "unknow") => {
		if (act == "terima") {
			ref_terima.value.open(act, uid);
		} else if (act == "del") {
			ref_del.value.open(act, uid);
		} else if (act == "image-view") {
			ref_image_view.value.open(act, uid);
		}
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<TerimaPesanan ref="ref_terima" />
		<DelData ref="ref_del" />
		<ImageView ref="ref_image_view" />
	</main>
</template>
