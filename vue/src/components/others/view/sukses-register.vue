<script setup>
	import { ref } from "vue";

	const show = ref(false);
	const data = ref([]);
	const message = ref();
	const open = (messages, errors) => {
		message.value = messages;
		data.value = errors;
		show.value = true;
	};
	const close = () => {
		show.value = true;
	};

	defineExpose({ open, close });
</script>

<template>
	<div>
		<Dialog v-model:visible="show" modal :style="{ width: '35vw' }">
			<template #header>
				<h6 class="text-green-400 flex items-center">
					<i class="pi pi-check mr-2" />
					<span>{{ message ?? "Error!!" }}</span>
				</h6>
			</template>

			<div class="text-center">
				<span class="pi pi-check-circle text-7xl text-green-500" />
            <p class="mb-5">Sukses</p>
				<p class="my-3 text-start">
               Berhasil daftar dangan data:
            </p>
            <table class="text-start table-auto w-full mb-2 border-1 p-2 border-collapse border-gray-300">
               <tr class="border border-gray-300">
                  <td class="p-2">Nama</td>
                  <td class="p-2">:</td>
                  <td class="p-2">{{ data.nama}}</td>
               </tr>
               <tr class="border border-gray-300">
                  <td class="p-2">Username</td>
                  <td class="p-2">:</td>
                  <td class="p-2">{{ data.user.username}}</td>
               </tr>
               <tr class="border border-gray-300">
                  <td class="p-2">No Heandphone</td>
                  <td class="p-2">:</td>
                  <td class="p-2">{{ data.no_hp}}</td>
               </tr>
            </table>

            <p class="mb-3">Lakukan login dengan akun yang telah anda buat !!</p>
				<Button
					type="button"
					label="Pergi Ke Login"
					icon="pi pi-bell"
					class="text-[.8rem] mr-2"
					as="router-link"
					to="/login"
				/>
			</div>
		</Dialog>
	</div>
</template>
