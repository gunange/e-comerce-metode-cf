<script setup>
    import { AtributService as atribut } from "@/services/atribut";
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
                    <img src="/assets/image/1.png" alt="Gambar Product" width="100" />
                </div>
                <div class="ps-5 flex-2">
                    <p>Nama Produk</p>
                    <p>Keterangan</p>
                    <p>
                        <span>Jumlah</span>
                        <span class="text-red-400 mx-2">=</span>
                        <span>10</span>
                    </p>
                </div>
                <div class="flex-1">
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
                <Button label="Kirim Permintaan Order" size="small" icon="pi pi-wallet" />
            </div>
        </template>
    </Card>
</template>


<script>
import { Controller } from "./controller.ts";

const __c = new Controller();
	export default {
		data() {
			return {
				quntity: 1,
				jasa_kurir: null,
			};
		},

        components:{
            user(){
                return __c.user;
            }
        }
	};
</script>