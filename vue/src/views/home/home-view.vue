<script setup>
import Kategori from '@/components/home/components/kategori.vue';
import Rekomendasi from '@/components/home/components/rekomendasi/main.vue';
</script>


<template>
	<Kategori />
    <Rekomendasi />
</template>

<script>
import { MainData } from "@/components/home/components/rekomendasi/controller.ts"

const __main = new MainData();
export default {
    data(){
        return {}
    },
    mounted() {
        __main.init();
    },
}
</script>

