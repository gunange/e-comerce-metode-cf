<template>
	<div class="md:w-[80%] mx-auto mt-10">
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
										:src="`${item.foto}`"
										:alt="item.label"
                                        preview
									/>
									<div
										class="absolute bg-black/70 rounded-border"
										style="left: 4px; top: 4px"
									>
										
									</div>
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
											<div class="text-lg font-medium mt-2">
												{{ item.label }}
											</div>
										</div>
                                        <Rating v-model="item.rating" readonly />
										
									</div>
									<div class="flex flex-col md:items-end gap-8">
                                        <p>
                                            <span class="text-xl font-semibold me-3">Rp. {{ item.price }} </span>
                                            <span class="text-sm">(x 1)</span>
                                        </p>
										
										<div class="flex flex-row-reverse md:flex-row gap-2">
											<Button icon="pi pi-trash"  size="small" severity="danger" outlined></Button>
											<Button
												icon="pi pi-shopping-cart"
												label="Order Sekarang"
                                                size="small"
												:disabled="item.stock === 0"
												class="flex-auto md:flex-initial whitespace-nowrap"
											></Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</DataView>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{
						id: 1,
                        label : "lorem",
                        kategori : "lorem Ipsum",
                        price : "20000",
                        foto : "/assets/image/1.png",
                        rating : 3,
					},
                    
					{
						id: 2,
                        label : "lorem",
                        kategori : "lorem",
                        price : "20000",
                        foto : "/assets/image/1.png",
                        rating : 2,
					},
					{
						id: 3,
                        label : "lorem",
                        kategori : "lorem",
                        price : "20000",
                        foto : "/assets/image/1.png",
                        rating : 5,
					},
					{
						id: 4,
                        label : "lorem",
                        kategori : "lorem",
                        price : "20000",
                        foto : "/assets/image/1.png",
                        rating : 4,
					},
					{
						id: 5,
                        label : "lorem",
                        kategori : "lorem",
                        price : "20000",
                        foto : "/assets/image/1.png",
                        rating : 4,
					},

				],
			};
		},
	};
</script>
