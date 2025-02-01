<script setup lang="ts">
	import { ref } from "vue";
	
	import { homeStore } from "@/stores/others/home";
	import { storeToRefs } from "pinia";

	import FormWidget from "@/components/home/widgets/other/FormWidget.vue"

	const { ref_form } = storeToRefs(homeStore());


	const form = ref({
		label: "Informasi Kontak",
		items: [
			{
				type: "input",
				name: "no_hp",
				label: "Nomor Heandphone",
				placehoder: "Masukan Nomor Heandphone",
				ref_form: ref_form["no_hp"],
				rule: "required|phone",
			},
			{
				type: "input",
				name: "email",
				label: "Email",
				placehoder: "Masukan Alamat E-Mail Anda (ex: name@domain.xyz)",
				ref_form: ref_form["email"],
				rule: "required|email",
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
