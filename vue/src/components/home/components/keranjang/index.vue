<template>
    <DataView :value="items">
        <template #list="slotProps">
            <div class="flex flex-col">
                <div v-for="(item, index) in slotProps.items" :key="index">
                    <div
                        class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                        :class="{
                            'border-t border-surface-200 dark:border-surface-700':
                                index !== 0,
                        }"
                    >
                        <div class="md:w-40 relative">
                            <Image
                                class="block xl:block mx-auto rounded w-full"
                                :src="foto(item)"
                                :alt="item.label"
                                preview
                            />
                            <div
                                class="absolute bg-black/70 rounded-border"
                                style="left: 4px; top: 4px"
                            ></div>
                        </div>
                        <div
                            class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                        >
                            <div
                                class="flex flex-row md:flex-col justify-between items-start gap-2"
                            >
                                <div>
                                    <span
                                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                                        >{{ item.kategori }}</span
                                    >
                                    <div class="font-medium mt-2">
                                        <p class="text-3xl">{{ item.label }}</p>
                                        <p class="text-sm">{{ item.deskripsi }}</p>
                                    </div>
                                </div>
                                <Rating v-model="item.rating" readonly />
                            </div>
                            <div class="flex flex-col md:items-end gap-8">
                                <p>
                                    <span class="text-xl font-semibold me-3"
                                        >{{ convertCurency(item.price) }}
                                    </span>
                                    <span class="text-sm">(x {{ item.quantity }})</span>
                                </p>

                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                    <Button
                                        icon="pi pi-trash"
                                        size="small"
                                        severity="danger"
                                        outlined
                                        @click="$refs.cruds.open('del', item.id)"
                                    ></Button>
                                    <Button
                                        icon="pi pi-wallet"
                                        label="Beli Sekarang"
                                        size="small"
                                        as="router-link"
                                        to="/order/2"
                                        :disabled="item.stock === 0"
                                        class="flex-auto md:flex-initial whitespace-nowrap"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
    <Crud ref="cruds"/>
</template>


<script>
	import { api } from "@/config/apiConfig.js";
    import * as tools from "@/controller/tools";
	import { MainData } from "@/components/home/components/keranjang/controller";
    import Crud from "./cruds/index.vue"

	const __m = new MainData();
	export default {
		data() {
			return {
				
			};
		},
        components :{
            Crud,
        },
		computed :{
			
			items(){
				return __m.items;
			}
		},

		methods: {
            ...tools,
			
			foto (item){
				return item.foto ? `${api.url_api}storage/${item.foto}` : "";
			},
		},
		
	};
</script>
