<script setup lang="ts">
	import { appLogo, appLogoDark } from "@/config/appInfo.js";
	const items = {
		stafDosen: {
			label: "Untuk Staff & Dosen",
			items: [
				{
					label: "User Dashboard",
					link: "#",
				},
				{
					label: "Sister",
					link: "#",
				},
				{
					label: "Jurnal",
					link: "#",
				},
				{
					label: "Simlimtabmas",
					link: "#",
				},
				{
					label: "Jafa",
					link: "#",
				},
			],
		},
		mahasiswa: {
			label: "Untuk Mahasiswa",
			items: [
				{
					label: "Siakad",
					link: "#",
				},
				{
					label: "Teams",
					link: "#",
				},
				{
					label: "Jurnal",
					link: "#",
				},
				{
					label: "Peneriamaan",
					link: "#",
				},
				{
					label: "Job Fair",
					link: "#",
				},
				{
					label: "Event",
					link: "#",
				},
			],
		},
		sosilMedia: {
			label: "Sosial Media",
			deskripsi: "Ikuti update-an informasi melalui akun sosial media kami",
			items: [
				{
					icon: "lni  lni-twitter-old",
					link: "#",
				},
				{
					icon: "lni lni-facebook",
					link: "#",
				},
				{
					icon: "lni lni-instagram",
					link: "#",
				},
				{
					icon: "lni lni-youtube",
					link: "#",
				},
			],
		},
		contact: {
			label: "",
			items: [
				{
					label: "Address",
					sub_label: "addres siite",
				},
				{
					label: "Email",
					sub_label: "email",
					mail: "",
				},
				{
					label: "Telp",
					sub_label: "0921xxxxxxxxx",
				},
			],
		},
	};
</script>

<template>
	<div class="footer-middle bg-black text-white text-xs">
		<div class="2xl:max-w-6xl container py-20">
			<div class="grid grid-cols-4 gap-6">
				<!-- 1 -->
				<div>
					<div class="flex items-center">
						<img class="logo1" :src="appLogoDark" alt="Logo" />
						<div class="ps-2">
							<h4 class="text-[--color-yellow]">Label</h4>
							<p class="text-xs">Deskripsi App</p>
						</div>
					</div>
					<p class="mb-12 mt-6 text-xs">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut esse
						consequuntur ab error, aspernatur perferendis? Aliquid iure fuga optio.
						Repudiandae.
					</p>
					<ul class="">
						<li v-for="(e, i) in items.contact.items" :key="i" class="mb-4">
							<p>{{ e.label }} : {{ e.sub_label }}</p>

							<a :href="`mailto:${e.mail}`" v-if="e.mail">
								<p>{{ e.label }} : {{ e.sub_label }}</p>
							</a>
						</li>
					</ul>
				</div>
				<!-- 2 -->
				<div class="col-span-2 grid grid-cols-2 gap-8">
					<!-- 1 -->
					<div>
						<p class="text-[--color-yellow] mb-7 text-lg">
							{{ items.stafDosen.label }}
						</p>
						<ul v-for="(e, i) in items.stafDosen.items" :key="i">
							<li class="mb-3 text-sm hover:underline">
								<a :href="e.link">
									{{ e.label }}
								</a>
							</li>
						</ul>
					</div>
					<!-- 2 -->
					<div>
						<p class="text-[--color-yellow] mb-7 text-lg">
							{{ items.mahasiswa.label }}
						</p>

						<ul v-for="(e, i) in items.mahasiswa.items" :key="i">
							<li class="mb-4 text-sm hover:underline">
								<a :href="e.link">
									{{ e.label }}
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- 3 -->
				<div>
					<div class="mb-12">
						<p class="text-[--color-yellow] mb-8 text-lg">
							{{ items.sosilMedia.label }}
						</p>
						<span>{{ items.sosilMedia.deskripsi }}</span>
					</div>
					<div class="grid grid-cols-4 gap-2">
						<div v-for="(e, i) in items.sosilMedia.items" :key="i" class="">
							<a
								:href="e.link"
								class="bg-blue-500 py-[15px] px-[16px] pb-[10px] rounded-md text-2xl"
							>
								<i :class="e.icon" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
