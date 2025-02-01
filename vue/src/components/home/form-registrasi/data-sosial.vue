<script setup lang="ts">
	import { computed, ref } from "vue";

	import {
		JenisTinggalController,
		AlatTransportasiController,
		KebutuhanKhususController,
	} from "@/components/home/form-registrasi/controller";
	import { homeStore } from "@/stores/others/home";
	import { storeToRefs } from "pinia";

	
	const _c_jt = new JenisTinggalController();
	const _c_at = new AlatTransportasiController();
	const _c_kk = new KebutuhanKhususController();
	
	const { ref_form } = storeToRefs(homeStore());

	const kps = ref();

	const form_list = ["jenis_tinggal", "alat_transportasi", "kebutuhan_khusus", "no_kps"];

	defineExpose({ form_list });
</script>

<template>
	<main>
		<div class="bg-blue-500 text-white py-4 px-3 rounded-md mb-5 text-xs">
			<p>Data Sosial</p>
		</div>
		<div class="text-xs grid grid-cols-2 gap-6 mt-10">
			<div class="form">
				<VeeField
					name="jenis_tinggal"
					rules="required"
					v-model="ref_form['jenis_tinggal']"
				>
					<label
						>Jenis Tinggal
						<span class="text-red-500"
							>* <VeeErrorMessage name="jenis_tinggal" />
						</span>
					</label>
					<v-select
						placeholder="Siiahkan Pilih .."
						:options="_c_jt.items"
						v-model="ref_form['jenis_tinggal']"
						:loading="_c_jt.data.load"
						@open="() => !_c_jt.items.length && _c_jt.init()"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField
					name="alat_transportasi"
					rules="required"
					v-model="ref_form['alat_transportasi']"
				>
					<label
						>Alat Transportasi
						<span class="text-red-500"
							>* <VeeErrorMessage name="alat_transportasi" />
						</span>
					</label>
					<v-select
						placeholder="Siiahkan Pilih .."
						:options="_c_at.items"
						v-model="ref_form['alat_transportasi']"
						:loading="_c_at.data.load"
						@open="() => !_c_at.items.length && _c_at.init()"
					/>
				</VeeField>
			</div>

			<div class="form">
				<VeeField
					name="kebutuhan_khusus"
					rules=""
					v-model="ref_form['kebutuhan_khusus']"
				>
					<label
						>Kebutuhan Khusus
						<span class="text-red-500"
							>* <VeeErrorMessage name="kebutuhan_khusus" />
						</span>
					</label>
					<v-select
						placeholder="Siiahkan Pilih .."
						:options="_c_kk.items"
						v-model="ref_form['kebutuhan_khusus']"
						:loading="_c_kk.data.load"
						@open="() => !_c_kk.items.length && _c_kk.init()"
					/>
				</VeeField>
			</div>

			<div class="form">
				<div class="flex justify-between items-center">
					<p>Penerima KPS</p>
					<ToggleSwitch v-model="kps" />
				</div>
				<VeeField
					v-slot="{ field }"
					name="no_kps"
					rules="required"
					v-model="ref_form['no_kps']"
					v-if="kps"
				>
					<span class="text-red-500"><VeeErrorMessage name="no_kps" /> </span>

					<InputText
						v-bind="field"
						placeholder="Masukan Nomor KPS "
						class="text-xs"
						autocomplete="off"
					/>
				</VeeField>
			</div>
		</div>
	</main>
</template>
