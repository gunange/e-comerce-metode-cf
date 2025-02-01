<script setup lang="ts">
	import { onMounted, ref } from "vue";

	import { ProdiController } from "@/components/home/form-registrasi/controller";
	import {homeStore} from "@/stores/others/home"
	import { toastStore } from "@/stores/services/toast-store";

	import FormWidget from "@/components/home/widgets/other/FormWidget.vue";
	import { computed } from "vue";
	import { storeToRefs } from "pinia";

	
	const _controller = new ProdiController();
	const toast = toastStore().toast;
	const { ref_form } = storeToRefs(homeStore());
	
	const list_2 = computed(() => {
		const uid = form.value.items[0];
		if (!uid || uid.ref_form == undefined) return [];

		return _controller.items.filter((e) => e.uid !== uid?.ref_form.uid);
	});

	const ref_form_widget = ref();

	const form = ref({
		label: "Informasi Program Studi",
		items: [
			{
				type: "select",
				label: "Pilihan 1",
				name: "prodi",
				ref_form: ref_form["prodi"],
				placehoder: "Silahkan Pilih..",
				enable_time: false,
				rule: "required",
				list: computed(() => _controller.items) ,
				on_open: () => {
					if ( _controller.items.length == 0) _controller.init();
				},
				loading:  computed( () =>_controller.data.load),
			},
			{
				type: "select",
				label: "Pilihan 2",
				name: "prodi_pilihan",
				ref_form: ref_form["prodi_pilihan"],
				placehoder: "Silahkan Pilih..",
				enable_time: false,
				rule: "required",
				list: list_2,
				on_open: () => {
					if (list_2.value.length == 0) {
						toast.add({
							severity: "warn",
							summary: "Perigatan!!",
							detail: "Anda harus memilih prodi prioritas lebih dulu",
							life: 4000,
						});
					}
				},
				loading:  computed(() => _controller.data.load),
			},
		],
	});

	defineExpose({ form });
	onMounted(() => {
		ref_form_widget.value = form;
	});
</script>

<template>
	<main>
		<div class="text-[--color-secondary] font-bold">
			<h6 class="mb-8">Informasi Program Studi</h6>
		</div>
		<FormWidget
			:items="form"
			class-name="text-xs grid grid-cols-2 gap-6"
			ref="ref_form_widget"
		/>
	</main>
</template>
