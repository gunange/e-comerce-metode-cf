<script setup>
	import { ref } from "vue";

	const form = ref({});
	const ref_form = ref();

	const onSave = async (e) => {};
</script>

<template>
	<div class="login w-full h-svh bg-sky-500">
		<div class="flex justify-between items-center h-full w-[80%] mx-auto">
			<div class="text-white w-[600px] flex-none">
				<p class="text-6xl">Login Page</p>
				<p>
					Jika belum memiliki akun, silahkan daftar lebih dulu melalui tombol yang
					sudah disediakan
				</p>
			</div>
			<div class="w-[.6px] flex-initial h-60 bg-white"></div>
			<div class="flex-auto ps-28">
				<Card class="p-5">
					<template #header>
						<p class="text-2xl font-bold">Login</p>
					</template>
					<template #content>
						<VeeForm ref="ref_form" :initial-values="form" @submit="onSave">
							<div class="form text-xs mt-10 grid grid-cols-1 gap-4">
								<VeeField
									v-slot="{ field }"
									name="username"
									rules="required"
									v-model="form.username"
								>
									<label
										>Account
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
							<div class="">
								<Button
									type="submit"
									label="Sign In"
									icon="pi pi-key"
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
