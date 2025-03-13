<template>
    <div class="md:w-[80%] mx-auto mt-10 mb-15">
        <div class="px-5 pb-4 border-b-4 border-sky-500 mb-5 text-center bg-white py-5">
			<p class="">Rekomendasi</p>
		</div>
        <div class="">
            <div class="grid grid-cols-5 gap-4">
                <CardProduct v-for="(item) in 13" :key="item" />
            </div>
        </div>
    </div>
</template>

<script>
import CardProduct from "@/components/home/widgets/card-product.vue"
import { Controller } from  "@/components/home/controller.ts"

const __c = new Controller();

export default {
    components: {
        CardProduct
    },
    computed: {
        kategori(){
            return __c.store.kategori;
        },
        items(){
            return this.kategori.data;
        },
        load(){
            return this.kategori.load;
        }
    }
}
</script>