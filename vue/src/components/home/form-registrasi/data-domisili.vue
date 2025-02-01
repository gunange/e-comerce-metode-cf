<script setup lang="ts">
	import { onMounted, ref, watch } from "vue";

	import { computed } from "vue";

	import {
		NegaraController,
		WilayahController,
	} from "@/components/home/form-registrasi/controller";
	import { homeStore } from "@/stores/others/home";
	import { storeToRefs } from "pinia";

	
	const _c_negara = new NegaraController();
	const _c_wilayah = new WilayahController();
	const { ref_form } = storeToRefs(homeStore());

	const id_negara = ref(null);

	const wilayah = computed(() => {
		return id_negara
			? _c_wilayah.items.filter((el) => el.id_negara == id_negara.value)
			: [];
	});

	const form_list = [
		"kewarganegaraan",
		"wilayah",
		"jalan",
		"kelurahan",
		"dusun",
		"rt",
		"rw",
		"kode_pos",
	];

	const initWilayah = async (obj) => {
		if(!obj)return;
		if (_c_wilayah.items.length == 0) await _c_wilayah.init();
		if (ref_form.value["wilayah"]) ref_form.value["wilayah"] = null;

		id_negara.value = obj.uid;
	};

	const onSelectWn = () => {
		if (_c_negara.items.length == 0) _c_negara.init();
	};

	


	defineExpose({ form_list });
</script>

<template>
	<main>
		<div class="bg-blue-500 text-white py-4 px-3 rounded-md mb-5 text-xs">
			<p>Data Domisili</p>
		</div>
		<div class="text-xs grid grid-cols-2 gap-6 mt-10">
			<div class="form">
				<VeeField
					name="kewarganegaraan"
					rules="required"
					v-model="ref_form['kewarganegaraan']"
				>
					<label
						>Kewarganegaraan
						<span class="text-red-500"
							>* <VeeErrorMessage name="kewarganegaraan" />
						</span>
					</label>
					<v-select
						placeholder="Siiahkan Pilih .."
						:options="_c_negara.items"
						v-model="ref_form['kewarganegaraan']"
						:loading="_c_negara.data.load"
						@open=" (_c_negara.items.length == 0) && _c_negara.init()"
						@update:model-value="initWilayah"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField name="wilayah" rules="required" v-model="ref_form['wilayah']">
					<label
						>Wilayah
						<span class="text-red-500">* <VeeErrorMessage name="wilayah" /> </span>
					</label>
					<v-select
						placeholder="Siiahkan Pilih .."
						:options="wilayah"
						v-model="ref_form['wilayah']"
						:loading="_c_wilayah.data.load"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField
					v-slot="{ field }"
					name="jalan"
					rules="required"
					v-model="ref_form['jalan']"
				>
					<label>
						Jalan
						<span class="text-red-500">* <VeeErrorMessage name="jalan" /> </span>
					</label>

					<InputText
						v-bind="field"
						placeholder="Masukan Jalan"
						class="text-xs"
						autocomplete="off"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField
					v-slot="{ field }"
					name="kelurahan"
					rules="required"
					v-model="ref_form['kelurahan']"
				>
					<label>
						Kelurahan
						<span class="text-red-500"
							>* <VeeErrorMessage name="kelurahan" />
						</span>
					</label>

					<InputText
						v-bind="field"
						placeholder="Masukan Kelurahan "
						class="text-xs"
						autocomplete="off"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField
					v-slot="{ field }"
					name="dusun"
					rules="required"
					v-model="ref_form['dusun']"
				>
					<label>
						Dusun
						<span class="text-red-500">* <VeeErrorMessage name="dusun" /> </span>
					</label>

					<InputText
						v-bind="field"
						placeholder="Masukan Dusun "
						class="text-xs"
						autocomplete="off"
					/>
				</VeeField>
			</div>

			<div class="grid grid-cols-4 gap-2">
				<div class="form">
					<VeeField
						v-slot="{ field }"
						name="rt"
						rules="required|number"
						v-model="ref_form['rt']"
					>
						<label>
							RT
							<span class="text-red-500">* <VeeErrorMessage name="rt" /> </span>
						</label>

						<InputText
							v-bind="field"
							placeholder="Masukan RT"
							class="text-xs"
							autocomplete="off"
						/>
					</VeeField>
				</div>

				<div class="form">
					<VeeField
						v-slot="{ field }"
						name="rw"
						rules="required|number"
						v-model="ref_form['rw']"
					>
						<label>
							RW
							<span class="text-red-500">* <VeeErrorMessage name="rw" /> </span>
						</label>

						<InputText
							v-bind="field"
							placeholder="Masukan RW "
							class="text-xs"
							autocomplete="off"
						/>
					</VeeField>
				</div>
				<div class="form col-span-2">
					<VeeField
						v-slot="{ field }"
						name="kode_pos"
						rules="required|number"
						v-model="ref_form['kode_pos']"
					>
						<label>
							Kode Pos
							<span class="text-red-500"
								>* <VeeErrorMessage name="kode_pos" />
							</span>
						</label>

						<InputText
							v-bind="field"
							placeholder="Masukan Kode Pos "
							class="text-xs"
							autocomplete="off"
						/>
					</VeeField>
				</div>
			</div>
		</div>
	</main>
</template>
