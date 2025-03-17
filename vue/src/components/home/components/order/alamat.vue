<template>

    <Card class="mt-10">
        <template #title>
            <div class="text-primary">
                <p>
                    <i class="pi pi-map-marker me-1" />
                    <span>Alamat Pengiriman</span>
                </p>
            </div>
        </template>
        <template #content>
            <div class="flex">
                <p class="flex-1/3 font-bold">
                    <span class="me-2">{{user.nama}}</span>
                    <span>( {{ user.no_hp }})</span>
                </p>
                <p class="flex-auto">
                    {{ user.alamat }}
                </p>
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
			};
		},

        computed:{
            user(){
                return __c.user;
            }
        }
	};
</script>