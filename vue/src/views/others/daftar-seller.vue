<script setup>
	import "@/assets/css/daftar/main.css";
	import "@/assets/css/daftar/responsif.css";

	import { ref } from "vue";

	const form = ref({});
	const ref_form = ref();

	const onSave = async (e) => {};
</script>

<template>
	<div class="daftar w-full h-svh bg-sky-500">
		<div class="flex justify-between items-center h-full w-[80%] mx-auto">
			<div class="text-white w-[600px] flex-none">
				<div class="flex items-center mx-[-10px] mb-10">
					<img src="/images/logo/white.svg" class="size-16" alt="logo">
					<p class="text-2xl font-bold">DiahShoope</p>
				</div>
				<p class="text-6xl">Daftar Seller</p>
				<p>
					Jika belum memiliki akun, silahkan daftar lebih dulu melalui tombol yang
					sudah disediakan
				</p>
				<Button
					label="Beranda"
					icon="pi pi-home"
					size="large"
					class="mt-20"
					severity="secondary"
					as="router-link"
					to="/"
				/>
			</div>
			<div class="w-[.6px] flex-initial h-60 bg-white"></div>
			<div class="flex-auto ps-28">
				<Card class="p-5">
					<template #header>
						<p class="text-2xl font-bold px-4">Daftar</p>
					</template>
					<template #content>
						<VeeForm ref="ref_form" :initial-values="form" @submit="onSave">
							<div class="form text-xs mt-10 grid grid-cols-1 gap-4">
								<VeeField
									v-slot="{ field }"
									name="nama"
									rules="required"
									v-model="form.nama"
								>
									<label class="leading-none"
										>Nama Anda
										<span class="text-red-500"
											>* <VeeErrorMessage name="nama" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Nama"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
								<VeeField
									v-slot="{ field }"
									name="no_hp"
									rules="required"
									v-model="form.no_hp"
								>
									<label
									class="leading-none"
										>Nomor Heandphone Toko
										<span class="text-red-500"
											>* <VeeErrorMessage name="no_hp" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Nomor Heandphone"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
								<VeeField
									v-slot="{ field }"
									name="alamat"
									rules="required"
									v-model="form.alamat"
								>
									<label
									class="leading-none"
										>Alamat Toko
										<span class="text-red-500"
											>* <VeeErrorMessage name="alamat" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Alamat Toko"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
								<VeeField
									v-slot="{ field }"
									name="nama_toko"
									rules="required"
									v-model="form.nama_toko"
								>
									<label
									class="leading-none"
										>Nama Toko
										<span class="text-red-500"
											>* <VeeErrorMessage name="nama_toko" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Nama Toko"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
								<VeeField
									v-slot="{ field }"
									name="username"
									rules="required"
									v-model="form.username"
								>
									<label
									class="leading-none"
										>Username
										<span class="text-red-500"
											>* <VeeErrorMessage name="username" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Username"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
								<VeeField
									v-slot="{ field }"
									name="password"
									rules="required"
									v-model="form.passwords"
								>
									<label
									class="leading-none"
										>Password
										<span class="text-red-500"
											>* <VeeErrorMessage name="password" />
										</span>
									</label>

									<InputText
										v-bind="field"
										placeholder="Masukan Password"
										class="text-xs"
										autocomplete="off"
									/>
								</VeeField>
							</div>
							<div class="mt-6 flex justify-end">
								<Button
									type="button"
									label="Login"
									icon="pi pi-bell"
									class="text-[.8rem] mr-2"
									severity="warn"
									as="router-link" to="/login"
								/>
								<Button
									type="submit"
									label="Daftar"
									icon="pi pi-send"
									class="text-[.8rem]"
									:loading="false"
								/>
							</div>
						</VeeForm>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>
