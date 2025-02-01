<script setup>
	import { ref as vueRef, computed } from "vue";
	import { breakpoints } from "@/config/vue-prime/appPrimeConfig";

	import { Controller } from "./controller";
	const _main = new Controller();

	const modal = _main.modal;
	const errors = vueRef({
		error : {},
		status : null,
	});

	/* ----- action dialog ----- */
	const open = async (act, data) => {
		errors.value = data;
		await _main.open(act);
	};
	const close = async () => {
		_main.close();
	};

	/* ----- on submit ----- */
	const onSave = async () => {
		if (modal.proses_form) return;
		modal.proses_form = true;

		await _main.onDelete();
		close();
	};

	defineExpose({ open, close });
</script>

<template>
	<main>
		<Dialog
			v-model:visible="modal.show"
			:breakpoints="breakpoints.dialog"
			:style="{ width: '30vw' }"
			modal
		>
			<template #header>
				<h6 class="text-red-500"><i class="pi pi-exclamation-triangle"></i> Error</h6>
			</template>
			<template #default>
				<div class="text-center" v-if="errors.status == 201">
					<i class="pi pi-exclamation-circle text-red-400 text text-7xl mb-7"></i>
					<p class="text-red-300">nomor telpon terdaftar : {{ msg.data }}</p>
					<p>{{ msg.errors }}</p>
				</div>
				<div class="text-center" v-else-if="errors.status == 400">
					<p>{{ msg.errors }}</p>
				</div>
			</template>
			<template #footer>
				<div class="d-flex justify-content-end gap-2">
					<Button
						type="button"
						label="Cancel"
						severity="secondary"
						outlined
						@click="close"
					></Button>
					
				</div>
			</template>
		</Dialog>
	</main>
</template>
