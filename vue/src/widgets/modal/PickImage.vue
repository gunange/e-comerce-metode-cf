<script setup>
	import VuePictureCropper, { cropper } from "vue-picture-cropper";
	import { breakpoints } from "@/config/vue-prime/appPrimeConfig.ts";

	import { ref, reactive } from "vue";

	const refUploadInput = ref();

	const emit = defineEmits(["onPick"]);

	const modal = ref({
		show: false,
		label: "Pick Image",
		act: null,
		proses_form: false,
		uid: null,
		load: true,
	});

	const pic = ref();
	const nameFile = ref("name-file");
	const result = reactive({
		dataURL: "",
		blobURL: "",
		file: null,
	});


	const openModal = () => {
		modal.value.load = true;
		modal.value.show = true;
	};
	const closeModal = () => {
		modal.value.load = true;
		modal.value.show = false;
	};

	const selectFile = (e) => {
		modal.value.load = true;
		pic.value = "";
		result.dataURL = "";
		result.blobURL = "";
		result.file = null;

		// Get selected files
		const { files } = e.target;
		if (!files || !files.length) return;

		// Convert to dataURL and pass to the cropper component
		const file = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			// Update the picture source of the `img` prop
			pic.value = String(reader.result);

			// Show Modal
			openModal();

			// Finish Load
			setTimeout(() => {
				modal.value.load = false;
			}, 700);

			// Clear selected files of input element
			if (!refUploadInput.value) return;
			refUploadInput.value.value = "";
		};
	};

	const getResult = async () => {
		if (!cropper) return;

		const base64 = cropper.getDataURL();
		const blob = await cropper.getBlob();

		if (!blob) return;

		const file = await cropper.getFile({
			fileName: "Nama Avatar",
		});

		result.dataURL = base64;
		result.file = file;
		result.blobURL = URL.createObjectURL(blob);

		emit("onPick", result);
		closeModal();
	};

	const atPick = () => {
		result.blobURL = "";
		result.dataURL = "";
		result.file = null;

		refUploadInput.value.click();
	};

	defineExpose({ openModal, closeModal, atPick, nameFile });
	defineProps({
		options: {
			viewMode: 1,
			aspectRatio: 1,
			dragMode: "move",
			cropBoxResizable: false,
		},
		presetMode: {
			mode: "fixedSize",
			width: 250,
			height: 250,
		},
	});
</script>

<template>
	<main>
		<Dialog
			v-model:visible="modal.show"
			:breakpoints="breakpoints.dialog"
			:style="{ width: '40vw' }"
			modal
		>
			<template #header>
				<h6 class="text-primary text-sm flex items-center">
					<i class="pi pi-tags mr-2"></i>
					<span>{{ modal.label }}</span>
				</h6>
			</template>

			<div class="card">
				<div class="">
					<div class="flex justify-center items-center" v-if="modal.load">
						<img src="/assets/gif/bola.gif" style="width: 350px; height: auto" />
					</div>
					<div v-else>
						<VuePictureCropper
							:boxStyle="{
								width: '100%',
								height: '100%',
								backgroundColor: '#f8f8f8',
								margin: 'auto',
							}"
							:img="pic"
							:options="options"
							:presetMode="presetMode"
						/>
					</div>
				</div>
			</div>
			<template #footer>
				<div class="">
					<div class="btn-group">
						<InputGroup>
							<Button
								label="Cencel"
								icon="pi pi-times"
								severity="danger"
								size="small"
								@click="closeModal"
							/>
							<Button
								label="Pick Image"
								icon="pi pi-check"
								iconPos="right"
								size="small"
								@click="getResult"
							/>
						</InputGroup>
					</div>
				</div>
			</template>
		</Dialog>
		<input
			ref="refUploadInput"
			type="file"
			accept="image/jpg, image/jpeg, image/png, image/gif"
			@change="selectFile"
			v-show="false"
		/>
	</main>
</template>
