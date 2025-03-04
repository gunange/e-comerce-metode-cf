<script setup>
	import "@/assets/css/login/main.css";
	import "@/assets/css/login/responsif.css";
	import {Controller } from "@/components/login/controller.ts"
	import ErrorModal from "@/components/login/error.vue"

	import { ref } from "vue";

	const main = new Controller() ;

	const form = ref({});
	const ref_form = ref();
	const ref_modal_err = ref();

	const onSave = async (e) => {
		await main.onSubmit(e);
		if (!main.post.sukses) {
			ref_modal_err.value.open(main.post.message , main.post.errors);
		}
	};
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
						<div class="flex items-center justify-center mt-5">
							<img src="/assets/logo/blue.svg" class="size-16" alt="logo">
							<p class="text-2xl font-bold text-sky-500">DiahShoope</p>
						</div>
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
									label="Daftar"
									icon="pi pi-bell"
									class="text-[.8rem] mr-2"
									severity="warn"
									as="router-link"
									to="/daftar"
								/>
								<Button
									type="submit"
									label="Sign In"
									icon="pi pi-key"
									class="text-[.8rem]"
									:loading="main.post.load"
								/>
							</div>
						</VeeForm>
					</template>
				</Card>
			</div>
		</div>
	</div>
	<ErrorModal ref="ref_modal_err" />
</template>


<script>
	import { AuthController } from "@/controller/controllers/AuthController.ts";
	import { Controller } from "@/components/login/controller.ts";

	const auth = new AuthController();

	export default {
		async beforeRouteEnter(to, from, next) {
			await auth.init();
			if (auth.isAuth) {
				const controller = new Controller();
				const routeTo = controller.routeRedirect(auth.user);

				if (routeTo) {
					next(routeTo);
					return;
				}
			}
			next();
		},
	};
</script>