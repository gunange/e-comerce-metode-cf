<script setup>
	import { AtributService as atribut } from "@/services/atribut";
    import { convertCurency } from "@/controller/tools";
</script>

<template>
	<Card class="mt-5">
		<template #title>
			<div class="text-primary">
				<p>
					<i class="pi pi-box me-1" />
					<span>Produk Dipesan</span>
				</p>
			</div>
		</template>
		<template #content>
			<div class="flex pt-5 border-t border-gray-300 text-sm">
				<div class="">
					<img :src="foto" alt="Gambar Product" width="100" />
				</div>
				<div class="ps-5 flex-2">
					<p class="text-lg font-bold text-primary-400">{{ item.label }}</p>
					<p>{{ item.deskripsi }}</p>
					<p>{{ item.kategori }}</p>
					<p class="font-bold">{{ convertCurency(item.harga * quantity) }}</p>
				</div>
				<div class="flex-1">
					<div class="mb-3" v-if="item">
						<div class="">
							<p class="mb-1">Kuantitas</p>
							<InputNumber
								:min="1"
								:max="maxQuantity"
								v-model="quantity"
								inputId="horizontal-buttons"
								showButtons
								buttonLayout="horizontal"
								:step="1"
								size="small"
								:allowEmpty="false"
								inputClass="w-full text-sm  px-3"
								class="w-full"
							>
								<template #incrementbuttonicon>
									<span class="pi pi-plus text-sm" />
								</template>
								<template #decrementbuttonicon>
									<span class="pi pi-minus text-sm" />
								</template>
							</InputNumber>
						</div>
					</div>
					<div class="form">
						<label for="quantity">Jasa Kurir</label>
						<v-select
							class="form text-xs w-full"
							placeholder="Silahkan Pilih .."
							:options="atribut.listOpsiKurir"
							v-model="jasa_kurir"
						/>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex justify-end mt-5 pt-5 border-t border-gray-300">
				<Button label="Kirim Permintaan Order" size="small" icon="pi pi-wallet" @click="order" />
			</div>
		</template>
	</Card>
	{{ item }}
</template>

<script>
	import { MainData, Cruds } from "./controller.ts";
	import { api } from "@/config/apiConfig.js";

	const __c = new MainData();
	export default {
		data() {
			return {
				quantity: 0,
				maxQuantity: 10,
				jasa_kurir: null,
			};
		},

		computed: {
			item() {
				return __c.item;
			},

			foto() {
				return this.item.foto ? `${api.url_api}storage/${this.item.foto}` : null;
			},
		},
		methods:{
			async order() {
				const cruds = new Cruds();
				await cruds.add({
					product_id: this.item.product_id,
					quantity: this.quantity,
					price: this.item.harga,
					total_price: this.item.harga * this.quantity,
				});
				this.$router.push('/');
			},
		}
		,
		mounted() {
            if (this.item) {
                this.quantity = Number(this.item.quantity);
				this.maxQuantity = Number(this.item.stock);
			}
		},
	};
</script>
