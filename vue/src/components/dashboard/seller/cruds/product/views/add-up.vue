<script setup>
	import { ref as vueRef, computed, reactive } from "vue";
	import PickImage from "@/widgets/modal/PickImage.vue";

	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { Cruds } from "../controller";

	const main = new Cruds();

	const pick_image = vueRef({
		dataURL: null,
		blobURL: null,
		file: null,
	});

	const modal = main.modal;
	const form = vueRef({});
	const ref_form = vueRef();
	/* ----- computed ----- */

	/* ----- action dialog ----- */
	const open = async (act, uid) => {
		main.modal.act = act;
		main.modal.label = "act" == "up" ? "Update" : "Tambah";
		form.value = {};
		pick_image.value = {
			URL: null,
			blobURL: null,
			file: null,
		};

		await main.open(act);
		ref_form.value.resetForm();

		if (act == "up") {
			main.setUid(uid);
			ref_form.value.setValues(main.data);
		}
	};
	const close = async () => {
		main.close();
	};

	/* ----- on submit ----- */
	const onSave = async (e, { resetForm }) => {
		if (modal.proses_form) return;
		modal.proses_form = true;

		if (modal.act == "add") {
			await main.add(e);
		} else if (modal.act == "up") {
			await main.up(e);
		}
	};

	/* ----- method ----- */

	const onPick = async (a) => {
		pick_image.value = a;
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
				<div class="text-xs grid grid-cols-1 gap-4">
					<div class="form">
						<div class="mb-5 bg-gray-300 rounded">
							<div
								class="h-[250px] flex items-center justify-center cursor-pointer"
								@click="$refs.pick_image.atPick()"
							>
								<img
									:src="pick_image.blobURL"
									alt=""
									v-if="pick_image.blobURL"
									class="h-[250px] w-auto"
								/>
								<p v-else class="text-lg">Pick Image</p>
							</div>
						</div>
						<VeeField
							v-slot="{ field }"
							name="label"
							rules="required"
							v-model="form.label"
						>
							<label>
								<span>Label</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="label" />
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
							name="deskripsi"
							rules="required"
							v-model="form.no_hp"
						>
							<label>
								<span>Deskripsi</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="deskripsi" />
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
							name="stock"
							rules="required|number"
							v-model="form.stock"
						>
							<label>
								<span>Stock</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="stock" />
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
		<PickImage
			ref="pick_image"
			@onPick="onPick"
			:presetMode="{
				mode: 'fixedSize',
				width: 250,
				height: 250,
			}"
			:options="{
				viewMode: 1,
				dragMode: 'move',
				aspectRatio: 1,
				cropBoxResizable: false,
			}"
		/>
	</main>
</template>
