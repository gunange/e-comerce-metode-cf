<script setup>
	import { ref as vueRef, computed, reactive } from "vue";

	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";
	import { Cruds } from "../controller";

	const main = new Cruds();

	const modal = main.modal;
	const form = vueRef({});
	const ref_form = vueRef();
	const item =vueRef({});
	/* ----- computed ----- */


	/* ----- action dialog ----- */
	const open = async (act, uid) => {
		main.modal.act = act;
		main.modal.label = "Terima Paket";
		form.value = {};

		await main.open(act);
		ref_form.value.resetForm();

		main.setUid(uid);
		item.value = main.data;
	};
	const close = async () => {
		main.close();
	};

	/* ----- on submit ----- */
	const onSave = async (e, { resetForm }) => {
		if (modal.proses_form) return;
		modal.proses_form = true;

		await main.terima(e);
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
				<h6 class="text-primary text-sm flex items-center">
					<i class="pi pi-tags mr-2"></i>
					<span>{{ modal.label }}</span>
				</h6>
			</template>

			<VeeForm @submit="onSave" :initial-values="form" ref="ref_form">
				<p class="mb-3 text-xs text-center border-b pb-1 border-gray-300">
					Pastikan Paket
					<span class="font-bold text-primary">{{ item.label }}</span> sudah anda
					terima, Karna anda sudah tidak dapat membatalkannya lagi
				</p>
				<div class="text-xs grid grid-cols-1 gap-4">
					<div class="form">
						<VeeField
							v-slot="{ field }"
							name="komentar"
							rules="required|minLength:10"
							v-model="form.komentar"
						>
							<label>
								<span>Komentar</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="komentar" />
								</span>
							</label>

							<Textarea
								v-model="form.komentar"
								placeholder="Masukan Input Sesuai Field.."
								class="text-xs w-full mt-2"
								autocomplete="off"
								rows="7"
							/>
						</VeeField>
					</div>
				</div>
				<div class="mt-5">
					<p class="text-center mb-2">Beri Penilaian</p>
					<VeeField name="ranting" rules="" v-model="form.ranting">
						<Rating v-model="form.ranting" class="mx-auto flex justify-center" />
					</VeeField>
				</div>

				<button type="submit" class="hidden" ref="refBtnAddAndUp">submit</button>
			</VeeForm>
			<template #footer>
				<div class="d-flex justify-content-end gap-2">
					<Button
						type="button"
						label="Kirim"
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
