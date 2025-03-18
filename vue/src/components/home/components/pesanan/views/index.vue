<script setup>
	import { ref as vueRef } from "vue";

	import ImageView from "./image-view.vue";

	const ref_image_view = vueRef();

	const open = async (act = "", uid = "unknow") => {
		if (act == "image-view") {
			ref_image_view.value.open(act, uid);
		}
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<ImageView ref="ref_image_view" />
	</main>
</template>
