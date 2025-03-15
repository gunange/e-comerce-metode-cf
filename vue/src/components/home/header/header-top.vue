<template>
	<div class="flex justify-between text-xs pt-3">
		<div class="">
			<Button
				class="px-0 hover:bg-transparent text-white"
				label="Seller"
				as="router-link"
				to="/daftar-seller"
				size="small"
				variant="text"
				severity="secondary"
			/>
		</div>
		<div class="flex">
			<Button
				class="ms-[8px] hover:bg-transparent text-white"
				label="Daftar"
				as="router-link"
				to="/daftar"
				size="small"
				variant="text"
				severity="secondary"
			/>
			<div class="" v-if="user">
                <Menu ref="menu_profil" id="overlay_menu" :model="menu.items" :popup="true" class="text-sm" />
				<Button
					type="button"
                    :label="user.nama"
					icon="pi pi-spin pi-cog text-lg"
					@click="toggleMenuProfil"
                    iconPos="right"
                    variant="text"
                    severity="secondary"
                    size="small"
					aria-haspopup="true"
					aria-controls="overlay_menu"
                    class="text-white hover:bg-transparent"
				/>
			</div>
			<Button
				class="ms-[8px] hover:bg-transparent text-white"
				label="Login"
				as="router-link"
				to="/login"
				size="small"
				variant="text"
				severity="secondary"
				v-else
			/>
		</div>
	</div>
</template>

<script>
	import { Controller } from "@/components/dashboard/pelanggan/controller.ts";

	const _c = new Controller();
	export default {
		data() {
			return {
				menu: {
					label: "Options",
					items: [
						{
							label: "Logout",
							icon: "pi pi-power-off text-red-500",
							command : ()=>{
								_c.logout(this.$router)
							}
						},
						{
							label: "Pesanan Saya",
							icon: "pi pi-address-book",
							command : () => this.$router.push('/pesanan-saya')
						},
					],
				},
			};
		},
		computed: {
			user() {
				return _c.user;
			},
		},
        methods :{
            toggleMenuProfil(e){
                this.$refs.menu_profil.toggle(e)
            },
        }
	};
</script>
