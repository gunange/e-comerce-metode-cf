<script setup lang="ts">
	import { ref, computed } from "vue";
	import { storeToRefs } from "pinia";


	import { homeStore } from "@/stores/others/home";
	import DataProdi from "./form-registrasi/data-prodi.vue";
	import DataDiri from "./form-registrasi/data-diri.vue";
	import DataDomisili from "./form-registrasi/data-domisili.vue";
	import DataSosial from "./form-registrasi/data-sosial.vue";
	import DataKontak from "./form-registrasi/data-kontak.vue";
	import AsalSekolah from "./form-registrasi/asal-sekolah.vue";

	import ModalInfo from "./form-registrasi/modal/index.vue";

	import { CrudCotroller } from "./form-registrasi/controller";

	const activeStep = ref(0);
	const store = homeStore();
	const { ref_form } = storeToRefs(store);

	const items = ref([
		{
			label: "Program Studi",
			icon: "lni lni-layers-1",
			err_form: false,
		},
		{
			label: "Data Diri",
			icon: "lni lni-user-4",
			err_form: false,
		},
		{
			label: "Domisili",
			icon: "lni lni-map-marker-5",
			err_form: false,
		},
		{
			label: "Sosial",
			icon: "lni lni-cloud-check-circle",
			err_form: false,
		},
		{
			label: "Kontak",
			icon: "lni lni-phone",
			err_form: false,
		},
		{
			label: "Asal Sekolah",
			icon: "lni lni-bike",
			err_form: false,
		},
	]);

	const length = items.value.length - 1;

	const refs_form = ref();
	const ref_modal_info = ref();
	const _main = new CrudCotroller();

	

	const activeItem = computed(() => {
		return items.value[activeStep.value] ?? {};
	});

	const ref_prodi = ref();
	const ref_dd = ref();
	const ref_domisili = ref();
	const ref_ss = ref();
	const ref_kontak = ref();
	const ref_as = ref();

	const heandleError = (e) => {
		const objKeys = Object.keys(e.errors);

		const prodi = ref_prodi.value.form.items.map((el) => el.name);
		items.value[0].err_form = objKeys.some((key) => prodi.includes(key));

		const dd = ref_dd.value.form.items.map((el) => el.name);
		items.value[1].err_form = objKeys.some((key) => dd.includes(key));

		items.value[2].err_form = objKeys.some((key) =>
			ref_domisili.value.form_list.includes(key)
		);

		items.value[3].err_form = objKeys.some((key) =>
			ref_ss.value.form_list.includes(key)
		);

		const kontak = ref_kontak.value.form.items.map((el) => el.name);
		items.value[4].err_form = objKeys.some((key) => kontak.includes(key));

		const as = ref_as.value.form.items.map((el) => el.name);
		items.value[5].err_form = objKeys.some((key) => as.includes(key));
	};

	const resetHeandlleErr = () => {
		items.value[0].err_form = false;
		items.value[1].err_form = false;
		items.value[2].err_form = false;
		items.value[3].err_form = false;
		items.value[4].err_form = false;
		items.value[5].err_form = false;
	};

	const onSave = async (e, { resetForm }) => {
		resetHeandlleErr();
		await _main.onSend(e);
		if (_main.sendInfo.statusCode == 200) {
			ref_modal_info.value.open("sukses", _main.sendInfo.data);
			homeStore().reset_form();
			refs_form.value.resetForm();
			return;
		} else if (_main.sendInfo.msg) {
			ref_modal_info.value.open("gagal", {
				error : _main.sendInfo.msg,
				status : _main.sendInfo.statusCode,
			});
		} 
	};


</script>

<template>
	<div class="text-center mt-24">
		<p>{{ activeItem["label"] ?? "" }}</p>
	</div>
	<div class="mt-10 pb-20">
		<steps
			:model="items"
			v-model:activeStep="activeStep"
			:readonly="false"
			class="custom-steps"
		>
			<template #item="{ item, active, label }">
				<span
					class="text-3xl rounded-full leading-[0] border-blue-500 transition flex justify-center items-center"
					role="button"
					:class="[
						item.err_form
							? 'bg-red-400 text-white'
							: active
							? 'text-white bg-blue-500'
							: 'text-blue-500 bg-white border-2',
					]"
				>
					<i class="pi pi-exclamation-triangle" v-if="item.err_form" />
					<i :class="[item.icon]" v-else />
				</span>
			</template>
		</steps>

		<div class="">
			<VeeForm
				ref="refs_form"
				:initial-values="ref_form"
				@invalid-submit="heandleError"
				@submit="onSave"
			>
				<div class="bg-white shadow-lg mt-20 py-14 px-12 rounded-lg">
					<DataProdi ref="ref_prodi" v-show="activeStep == 0" />
					<DataDiri ref="ref_dd" v-show="activeStep == 1" />
					<DataDomisili ref="ref_domisili" v-show="activeStep == 2" />
					<DataSosial ref="ref_ss" v-show="activeStep == 3" />
					<DataKontak ref="ref_kontak" v-show="activeStep == 4" />
					<AsalSekolah ref="ref_as" v-show="activeStep == 5" />

					<div class="mt-14 flex justify-between">
						<div class="">
							<Button
								label="Sebelumnya"
								severity="danger"
								@click="activeStep--"
								v-if="activeStep != 0"
								size="small"
							/>
						</div>
						<div class="">
							<Button
								label="Selanjutnya"
								@click="activeStep++"
								size="small"
								v-if="activeStep < length"
							/>
							<Button
								label="Kirim"
								type="submit"
								v-if="activeStep == length"
								:loading="_main.sendInfo.load"
								icon="pi pi-send"
								size="small"
							/>
						</div>
					</div>
				</div>
			</VeeForm>
		</div>
		<ModalInfo ref="ref_modal_info" />
	</div>
</template>
