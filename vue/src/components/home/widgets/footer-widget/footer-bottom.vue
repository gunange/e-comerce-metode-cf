<script setup lang="ts">
	const items = {
		label: "ICT AIKOM",
		link: "#",
		deskripsi: "Designed and Developed by",
		items: [
			{
				label: "Terms of use",
				link: "#",
			},
			{
				label: "Privacy Policy",
				link: "#",
			},
			{
				label: "Faq",
				link: "#",
			},
			{
				label: "Contact",
				link: "#",
			},
		],
	};
</script>

<template>
	<div class="footer-bottom">
		<div class="2xl:max-w-6xl container text-xs text-blue-500 py-2">
			<div class="grid grid-cols-3">
                <div class="col-span-2">
                    <p>
                        {{ items.deskripsi
                        }}<a :href="items.link" rel="nofollow" target="_blank">{{
                            items.label
                        }}</a>
                    </p>
                </div>
                <div class="col-span-1 flex flex-row justify-end">
                    <ul v-for="(e, i) in items.items" :key="i" class="ml-3">
                        <li>
                            <a :href="e.link">{{ e.label }}</a>
                        </li>
                    </ul>
                </div>
				
			</div>
		</div>
	</div>
</template>
