<script setup lang="ts">
	import { ref } from "vue";

	const props = defineProps({
		className: {
			type: String,
			default: "text-xs grid grid-cols-2 gap-6 mt-10",
		},
		items: {
			type: Object,
			default: {
				label: "Label",
				items: [
					{
						type: "input",
						name: "nama",
						label: "Nama",
						placehoder: "Masukan Nama Lengkap",
						ref_form: "",
						rule: "required",
					},
					{
						type: "date",
						label: "Tanggal Lahir ",
						name: "tanggal_lahir",
						ref_form: "",
						placehoder: "Masukan Tanggal Lahir Anda",
						enable_time: false,
						rule: "required",
					},
					{
						type: "select",
						label: "Agama",
						name: "agama",
						ref_form: "",
						placehoder: "Silahkan Pilih..",
						enable_time: false,
						rule: "required",
						list: [],
						on_open: () => {},
						loading: ref(false),
					},
				],
			},
		},
	});
</script>

<template>
	<main>
		<div class="bg-blue-500 text-white py-4 px-3 rounded-md mb-5 text-xs">
			<p>{{ items.label }}</p>
		</div>
		<div :class="className">
			<div class="form" v-for="(e, i) in items.items" :key="i">
				<VeeField
					v-slot="{ field }"
					:name="e.name"
					:rules="e.rule"
					v-model="e.ref_form"
					v-if="e.type == 'input'"
				>
					<label
						>{{ e.label }}
						<span class="text-red-500">* <VeeErrorMessage :name="e.name" /> </span>
					</label>

					<InputText
						v-bind="field"
						:placeholder="e.placehoder"
						class="text-xs"
						autocomplete="off"
					/>
				</VeeField>

				<VeeField
					:name="e.name"
					:rules="e.rule"
					v-model="e.ref_form"
					v-if="e.type == 'date'"
				>
					<label
						>{{ e.label }}
						<span class="text-red-500">* <VeeErrorMessage :name="e.name" /> </span>
					</label>
					<DatePicker
						v-model="e.ref_form"
						showIcon
						iconDisplay="input"
						class="text-xs"
						:placeholder="e.placehoder"
						:manualInput="false"
						dateFormat="DD, dd  MM yy"
					/>
				</VeeField>

				<VeeField
					:name="e.name"
					:rules="e.rule"
					v-model="e.ref_form"
					v-if="e.type == 'select'"
				>
					<label
						>{{ e.label }}
						<span class="text-red-500">* <VeeErrorMessage :name="e.name" /> </span>
					</label>
					<v-select
						:placeholder="e.placehoder"
						:options="e.list"
						:loading="e.loading"
						v-model="e.ref_form"
						@open="e.on_open"
					/>
				</VeeField>
			</div>
		</div>
	</main>
</template>
