<script setup lang="ts">
	import { ref, watch } from "vue";
	import { homeStore } from "@/stores/others/home";
	import { storeToRefs } from "pinia";

	import FormWidget from "@/components/home/widgets/other/FormWidget.vue"
	
	const { ref_form } = storeToRefs(homeStore());

	const list = ["SMA", "SMK"];

	const form = ref({
		label: "Data Sekolah",
		items: [
			{
				type: "input",
				name: "asal_sekolah",
				label: "Nama Sekolah",
				placehoder: "Masukan Nama Asal Sekolah",
				ref_form: ref_form["asal_sekolah"],
				rule: "required",
			},
			{
				type: "select",
				label: "Ijazah Terakhir ",
				name: "ijazah_terakhir",
				ref_form: ref_form["ijazah_terakhir"],
				placehoder: "Silahkan Pilih..",
				enable_time: false,
				rule: "required",
				list: list,
			},
			
			{
				type: "input",
				name: "tahun_lulus",
				label: "Tahun Lulus",
				placehoder: "Masukan Tahun Kelulusan Anda",
				ref_form: ref_form["tahun_lulus"],
				rule: "required|number|minMaxLength: 4, 4",
			},
			{
				type: "input",
				name: "no_ijazah",
				label: "Nomor Ijazah ",
				placehoder: "Masukan Nomor Ijazah Anda",
				ref_form: ref_form["no_ijazah"],
				rule: "required",
			},
			{
				type: "input",
				name: "nisn",
				label: "NISN",
				placehoder: "Masukan NISN Anda",
				ref_form: ref_form["nisn"],
				rule: "required|minLength:10",
			},
			
			
		],
	});

	defineExpose({ form });
</script>

<template>
	<main>
		<FormWidget :items="form" class-name="text-xs grid grid-cols-2 gap-6"  />
	</main>
</template>
