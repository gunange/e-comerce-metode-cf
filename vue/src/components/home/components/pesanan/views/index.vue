<script setup>
	import { ref as vueRef } from "vue";

	import ImageView from "./image-view.vue";
	import TerimaView from "./terima.vue";

	const ref_image_view = vueRef();
	const ref_terima = vueRef();

	const open = async (act = "", uid = "unknow") => {
		if (act == "image-view") {
			ref_image_view.value.open(act, uid);
		} else if (act == "terima") {
			ref_terima.value.open(act, uid);
		}
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<ImageView ref="ref_image_view" />
		<TerimaView ref="ref_terima" />
	</main>
</template>
