<script setup>
	import { ref as vueRef, computed, reactive } from "vue";
	import PickImage from "@/widgets/modal/PickImage.vue";

	import { AuthController } from "@/controller/controllers/AuthController";
	import { AtributService as atribut } from "@/services/atribut.ts";

	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { Cruds } from "../controller";

	const main = new Cruds();
	const userStorage = new AuthController().user;

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

		e.stock = Number(e.stock);
		e.harga = Number(e.harga);

		if (modal.act == "add") {
			const formFile = new FormData();

			formFile.append("file", pick_image.value.file);
			formFile.append("label", e.label);
			formFile.append("path", `product/${userStorage.nama_toko}`);

			const { data, status } = await main.sendFile(formFile);
			e.foto = data.uid;
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
					<div class="form" v-if="modal.act == 'add'">
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
						<VeeField name="kategori" rules="required" v-model="form.kategori">
							<label>
								<span>Kategori</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="kategori" />
								</span>
							</label>

							<v-select
								class="form"
								placeholder="Silahkan Pilih .."
								:options="atribut.listOpsiKategori"
								v-model="form.kategori"
								:appendToBody="true"
							/>
						</VeeField>
					</div>

					<div class="form" v-if="modal.act == 'add'">
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
					<div class="form">
						<VeeField name="harga" rules="required|number" v-model="form.herga">
							<label>
								<span>Harga</span>
								<span class="text-red-500">
									* <VeeErrorMessage name="harga" />
								</span>
							</label>

							<InputNumber
								v-model="form.herga"
								inputId="integeronly"
								placeholder="Masukan Input Sesuai Field.."
								inputClass="text-xs"
								fluid
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
				width: 650,
				height: 650,
			}"
			:options="{
				viewMode: 1,
				dragMode: 'move',
				cropBoxResizable: false,
				aspectRatio: 1,
			}"
		/>
	</main>
</template>
