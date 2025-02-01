<script setup>
	import { ref as vueRef, computed } from "vue";
	import { breakpoints } from "@/config/vue-prime/appPrimeConfig";

	import { Controller } from "./controller";
	const _main = new Controller();

	const modal = _main.modal;
	const msg = vueRef({});

	/* ----- action dialog ----- */
	const open = async (act, messages) => {
		msg.value = messages;
		await _main.open(act);
	};
	const close = async () => {
		_main.close();
	};

	defineExpose({ open, close });
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
				<h6 class="text-blue-500"><i class="pi pi-bell"></i></h6>
			</template>
			<template #default>
				<div class="text-center">
					<span class="pi pi-check-circle text-6xl text-green-600" />
					<p class="text-3xl mt-6">Sukses</p>
					<p>
						Anda berhasil terdaftar sebagai calon Mahasiswa dengan nomor registrasi
						dibawah ini
					</p>
					<p class="text-blue-500 text-2xl mt-3">{{ msg.no_regis }}</p>
					<div class="border p-2 mt-8 rounded-md">
						<ul class="grid grid-cols-3 gap-2 justify-start text-start">
							<li>Username</li>
							<li class="col-span-2">
								<span>:</span>
								<span class="text-blue-500">{{msg.username}}</span>
							</li>
							<li>Password</li>
							<li class="col-span-2">
								<span>:</span>
								<span class="text-blue-500">{{msg.password}}</span>
							</li>
							
						</ul>
						
					</div>
				</div>
			</template>
		</Dialog>
	</main>
</template>
