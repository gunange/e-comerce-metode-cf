<script setup>
	import { ref as vueRef, computed, reactive } from "vue";

	import { AuthController } from "@/controller/controllers/AuthController";
	import { AtributService as atribut } from "@/services/atribut.ts";

	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { Cruds } from "../controller";

	const main = new Cruds();

	const modal = main.modal;
	const form = vueRef({});
	const ref_form = vueRef();
	const item = vueRef();
	/* ----- computed ----- */

	/* ----- action dialog ----- */
	const open = async (act, uid) => {
		main.modal.act = act;
		main.modal.label = "Stock";
		form.value = {};

		await main.open(act);
		ref_form.value.resetForm();

		main.setUid(uid);
		item.value = main.data;
		ref_form.value.setValues({
			stock_tersedia: main.data.stock,
		});
	};
	const close = async () => {
		main.close();
	};

	/* ----- on submit ----- */
	const onSave = async (e, { resetForm }) => {
		if (modal.proses_form) return;
		modal.proses_form = true;

		await main.upStock({
			stock: Number(e.stock_tersedia) + Number(e.new_stock),
		});
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
					<i class="pi pi-tags mr-2"></i>
					<span
						>{{ modal.label }}
						{{ Number(form.stock_tersedia) + Number(form.new_stock) }}</span
					>
				</h6>
			</template>

			<VeeForm @submit="onSave" :initial-values="form" ref="ref_form">
				<div class="text-xs grid grid-cols-1 gap-4">
					<div class="form">
						<VeeField
							v-slot="{ field }"
							name="stock_tersedia"
							rules="required|number"
							v-model="form.stock_tersedia"
						>
							<label>
								<span>Stock Tersedia</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="stock_tersedia" />
								</span>
							</label>

							<InputText
								v-bind="field"
								placeholder="Masukan Input Sesuai Field.."
								class="text-xs"
								autocomplete="off"
								disabled
							/>
						</VeeField>
					</div>
					<div class="form">
						<VeeField
							v-slot="{ field }"
							name="new_stock"
							rules="required|number"
							v-model="form.new_stock"
						>
							<label>
								<span>Tambah Stock</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="new_stock" />
								</span>
							</label>

							<InputNumber
								:min="1"
								v-model="form.new_stock"
								inputId="horizontal-buttons"
								showButtons
								buttonLayout="horizontal"
								:step="1"
								size="small"
								:allowEmpty="false"
								inputClass="w-full text-sm  px-3"
								class="w-full"
							>
								<template #incrementbuttonicon>
									<span class="pi pi-plus text-sm" />
								</template>
								<template #decrementbuttonicon>
									<span class="pi pi-minus text-sm" />
								</template>
							</InputNumber>
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
