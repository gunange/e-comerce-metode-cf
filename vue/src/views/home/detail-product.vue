<template>
 <DetailProduct />
 
</template>

<script>
import DetailProduct  from "@/components/home/components/detail-product/index.vue"
import { MainData } from "@/components/home/components/detail-product/controller";
const __main = new MainData();

export default {
	
	components:{
		DetailProduct
	},
	async beforeRouteEnter(to, from, next) {
			__main.data.id = to.params.id;
			await __main.init();
			
			next();
		},
}
</script>