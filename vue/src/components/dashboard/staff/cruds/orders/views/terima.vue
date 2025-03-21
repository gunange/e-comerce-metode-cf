<script setup>
	import { ref as vueRef, computed, reactive } from "vue";

	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { Cruds } from "../controller";

	const main = new Cruds();

	const modal = main.modal;
	const form = vueRef({});
	const ref_form = vueRef();
	/* ----- computed ----- */

	/* ----- action dialog ----- */
	const open = async (act, uid) => {
		main.modal.act = act;
		main.modal.label = "Terima Pesanan";
		form.value = {};

		await main.open(act);
		ref_form.value.resetForm();

		main.setUid(uid);
		
	};
	const close = async () => {
		main.close();
	};

	/* ----- on submit ----- */
	const onSave = async (e, { resetForm }) => {
		if (modal.proses_form) return;
		modal.proses_form = true;
		await main.setTerima(e);
	};

	/* ----- method ----- */

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
				<h6 class="text-primary text-sm flex items-center">
					<i class="pi pi-check mr-2"></i>
					<span>{{ modal.label }}</span>
				</h6>
			</template>

			<VeeForm @submit="onSave" :initial-values="form" ref="ref_form">
				<div class="text-xs grid grid-cols-1 gap-4">
					<div class="form">
						<VeeField
							v-slot="{ field }"
							name="estimasi"
							rules="required"
							v-model="form.estimasi"
						>
							<label>
								<span>Estimasi Pengiriman</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="estimasi" />
								</span>
							</label>

							<InputText
								v-bind="field"
								placeholder="Masukan Input Sesuai Field.."
								class="text-xs"
								autocomplete="off"
							/>
						</VeeField>
						
					</div>
					<div class="form">
						<VeeField
							v-slot="{ field }"
							name="resi"
							rules="required"
							v-model="form.resi"
						>
							<label>
								<span>Resi Pengiriman</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="resi" />
								</span>
							</label>

							<InputText
								v-bind="field"
								placeholder="Masukan Input Sesuai Field.."
								class="text-xs"
								autocomplete="off"
							/>
						</VeeField>
						
					</div>
				</div>

				<button type="submit" class="hidden" ref="refBtnAddAndUp">submit</button>
			</VeeForm>
			<template #footer>
				<div class="d-flex justify-content-end gap-2">
					<Button
						type="button"
						label="Save"
						size="small"
						icon="pi pi-send"
						@click="$refs.refBtnAddAndUp.click()"
						:loading="modal.proses_form"
						outlined
					/>
				</div>
			</template>
		</Dialog>
	</main>
</template>
