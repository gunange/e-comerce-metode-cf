<template>
	<div class="md:w-[80%] mx-auto mt-10 pesanan-saya">
		<div class="bg-white px-5 py-2 ps-2 rounded-lg flex justify-between items-center">
			<Button
				label="Back to Home"
				icon="pi pi-angle-left"
				variant="text"
				as="router-link"
				to="/"
			/>
			<i class="pi pi-home text-lg" />
		</div>
		<div class="mt-10 mb-15 bg-white p-5 rounded-md">
			<Tabs value="0">
				<TabList>
					<Tab value="0">Selesai</Tab>
					<Tab value="1">Diproses</Tab>
					<Tab value="2">Diantar</Tab>
					<Tab value="3">Dibatalkan</Tab>
				</TabList>
				<TabPanels>
					<TabPanel value="0">
						<p class="m-0">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
							ab illo inventore veritatis et quasi architecto beatae vitae dicta
							sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
							eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
							velit, sed quia non numquam eius modi.
						</p>
					</TabPanel>
					<TabPanel value="1">
						<div class="">
							<DiProses />
						</div>
					</TabPanel>
					<TabPanel value="2">
						<div class="">
							<Dikirim />
						</div>
					</TabPanel>
					<TabPanel value="3">
						<div class="">
							<Dibatalkan />
						</div>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import DiProses from "@/components/home/components/pesanan/diproses.vue";
	import Dikirim from "@/components/home/components/pesanan/dikirim.vue";
	import Dibatalkan from "@/components/home/components/pesanan/dibatalkan.vue";
	import {MainData} from "@/components/home/components/pesanan/controller.ts"

	const __c = new MainData();
	export default {
		data() {
			return {};
		},
		components: {
			DiProses,
			Dikirim,
			Dibatalkan,
		},

		async beforeRouteEnter (to, from, next) {
			await __c.init();
			next();
		}
	};
</script>
