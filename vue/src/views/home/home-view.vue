<script setup >
	import BradcumpWidget from "@/components/home/widgets/other/BradcumpWidget.vue";
	import Registrasi from "@/components/home/registrasi.vue"


	const rootBreadcummp = [{ label: "Registrasi" }];
	const homeBrreadcump = {
		icon: "pi pi-home mr-2",
		label: "Home",
	};
</script>

<script>
import {SesiDaftar} from "@/components/home/form-registrasi/controller.ts";

const _main = new SesiDaftar();


export default {
	computed :{
		sesi(){
			return _main.data.data ;
		},
		sesiMsg(){
			return "Sesi Daftar sudah berakhir atau belum dibuka" ;
		},
	},
	async beforeRouteEnter (to, from, next) {
		await _main.init();
		next();
	}
}
</script>

<template>
	<div class="bg-slate-50">
		<BradcumpWidget :items="rootBreadcummp" :home="homeBrreadcump" />
		
		<div class="2xl:max-w-6xl container pt-36" v-if="sesi">
			<div class="text-center">
				<p class="text-4xl font-bold mb-3 text-gray-600">Form Registrasi</p>
				<span class="text-gray-400"
					>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, ab.
				</span>
			</div>

			<Registrasi />

		</div>

		<div class="2xl:max-w-6xl container py-36 text-center" v-else>
			<img src="@/assets/images/ilustrator/1.svg" class="mx-auto mb-14" alt="">
			<p class="text-3xl text-red-400" > {{ sesiMsg }} </p>
		</div>
	</div>
</template>


