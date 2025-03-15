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
		<div class="mt-10 mb-15 bg-white p-5 rounded-md flex">
			<div class="flex-1/5">
				<Image
					src="/assets/image/1.png"
					alt="Gambar Product"
					preview
					imageClass="mx-auto"
					class="block"
				/>
			</div>
			<div class="flex-auto px-5 flex flex-col justify-between">
				<div class="">
					<p class="text-2xl">Lorem ipsum dolor sit.</p>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex harum
						delectus minus.
					</p>
					<div class="flex">
						<div class="flex border-e pe-3 me-2 border-gray-300">
							<span class="me-2">4</span>
							<Rating readonly />
						</div>
						<div class="flex items-center">
							<span>Favorit 2</span>
							<i class="pi pi-heart-fill ms-3 text-red-400" />
						</div>
					</div>
					<p class="mt-3 text-3xl text-primary font-bold">Rp. 120.000</p>
				</div>
				<div class="">
					<div class="flex">
						<p class="me-2">Kuantitas</p>
						<InputNumber
							:min="1"
							v-model="quntity"
							inputId="horizontal-buttons"
							showButtons
							buttonLayout="horizontal"
							:step="1"
							size="small"
							:allowEmpty="false"
							inputClass="w-14 text-sm py-0 px-3"
						>
							<template #incrementbuttonicon>
								<span class="pi pi-plus text-sm" />
							</template>
							<template #decrementbuttonicon>
								<span class="pi pi-minus text-sm" />
							</template>
						</InputNumber>
					</div>
					<div class="mt-5">
						<Button
							label="Masukan Keranjan"
							class="me-4"
							severity="warn"
							outlined
							size="small"
							icon="pi pi-cart-plus"
						/>
						<Button
							label="Beli Sekarang"
							icon="pi pi-wallet"
							size="small"
							as="router-link"
							to="/order/2"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				quntity: 1,
			};
		},
	};
</script>
