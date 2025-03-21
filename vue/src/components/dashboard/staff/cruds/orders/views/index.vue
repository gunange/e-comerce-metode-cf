<script setup>
	import { ref as vueRef } from "vue";

	import TerimaPesanan from "./terima.vue";
	import TolakPesanan from "./tolak.vue";
	import ImageView from "./image-view.vue";

	const ref_terima = vueRef();
	const ref_tolak = vueRef();
	const ref_image_view = vueRef();

	const open = async (act = "", uid = "unknow") => {
		if (act == "terima") {
			ref_terima.value.open(act, uid);
		} else if (act == "tolak") {
			ref_tolak.value.open(act, uid);
		} else if (act == "image-view") {
			ref_image_view.value.open(act, uid);
		}
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<TerimaPesanan ref="ref_terima" />
		<TolakPesanan ref="ref_tolak" />
		<ImageView ref="ref_image_view" />
	</main>
</template>
