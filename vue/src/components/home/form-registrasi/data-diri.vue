<script setup lang="ts">
	import { onMounted, ref, computed } from "vue";

	import {
		JkController,
		AgamaController,
	} from "@/components/home/form-registrasi/controller";
	import { homeStore } from "@/stores/others/home";
	import { storeToRefs } from "pinia";

	import FormWidget from "@/components/home/widgets/other/FormWidget.vue";

	const store = homeStore();
	const _c_jk = new JkController();
	const _c_agama = new AgamaController();
	const { ref_form } = storeToRefs(homeStore());

	const form = ref({
		label: "Informasi Data Diri",
		items: [
			{
				type: "input",
				name: "nama",
				label: "Nama",
				placehoder: "Masukan Nama Lengkap",
				ref_form: ref_form["nama"],
				rule: "required",
			},
			{
				type: "input",
				label: "NIK",
				name: "nik",
				ref_form: ref_form["nik"],
				placehoder: "Masukan NIK Anda",
				rule: "required|number|minMaxLength:16,16",
			},
			{
				type: "input",
				label: "Tempat Lahir",
				name: "tempat_lahir",
				ref_form: ref_form["tempat_lahir"],
				placehoder: "Masukan Tempat Lahir Anda",
				rule: "required",
			},
			{
				type: "date",
				label: "Tanggal Lahir ",
				name: "tanggal_lahir",
				ref_form: ref_form["tanggal_lahir"],
				placehoder: "Masukan Tanggal Lahir Anda",
				enable_time: false,
				rule: "required",
			},
			{
				type: "select",
				label: "Agama",
				name: "agama",
				ref_form: ref_form["agama"],
				placehoder: "Silahkan Pilih..",
				enable_time: false,
				rule: "required",
				list: computed(() => _c_agama.items),
				loading: computed(() => _c_agama.data.load),
				on_open: () => {
					if (_c_agama.items.length == 0) _c_agama.init();
				},
			},
			{
				type: "select",
				label: "Jenis Kelamin",
				name: "jenis_kelamin",
				ref_form: ref_form["jenis_kelamin"],
				placehoder: "Silahkan Pilih..",
				enable_time: false,
				rule: "required",
				list: computed(() => _c_jk.items),
				loading: computed(() => _c_jk.data.load),
				on_open: () => {
					if (_c_jk.items.length == 0) _c_jk.init();
				},
			},
		],
	});

	defineExpose({ form });
</script>

<template>
	<main>
		<FormWidget :items="form" class-name="text-xs grid grid-cols-2 gap-6" />
	</main>
</template>
