<script setup>
	import { ref as vueRef, computed } from "vue";
	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { Cruds } from "../controller";

	const main = new Cruds();

	const modal = main.modal;

	/* ----- computed ----- */
	const form = vueRef({});

	/* ----- action dialog ----- */
	const open = async (act, uid) => {
		main.setUid(uid);
		form.value = main.data;
		await main.open();
	};
	const close = async () => {
		main.close();
	};

	

	defineExpose({ open, close });
</script>

<template>
	<main>
		<Dialog
			v-model:visible="modal.show"
			:breakpoints="breakpoints.dialog"
			:style="{ width: '50vw' }"
			modal
		>
			<template #header>
				<h6 class="text-blue-300 text-sm flex items-center">
					<i class="pi pi-image mr-2"></i> <span>Image Show</span>
				</h6>
			</template>
			<template #default>
				<div class="bg-gray-300 flex justify-center items-center size-full">
					<Image :src="'http://localhost:3001/api/storage/' + form.foto" alt="Image" width="250" />
				</div>
			</template>
			
		</Dialog>
	</main>
</template>
