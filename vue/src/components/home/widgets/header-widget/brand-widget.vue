<script setup>
import { appLogo } from "@/config/appInfo.js";
</script>

<template>
	<router-link class="flex" to="/">
		<img class="logo" :src="appLogo" alt="Logo" />
			<div class="ps-2 text-xs flex flex-col justify-center text-[--color-secondary]">
				<span class="font-bold text-11px">Label</span>
				<span class="text-[5px]">Sub Label</span>
			</div>
	</router-link>
</template>
