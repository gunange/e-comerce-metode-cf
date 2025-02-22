<template>
    <div class="md:w-[80%] mx-auto mt-10 mb-15">
        <div class="px-5 pb-4 border-b-4 border-sky-500 mb-5 text-center bg-white py-5">
			<p class="">Rekomendasi</p>
		</div>
        <div class="">
            <div class="grid grid-cols-5 gap-4">
                <Card class="overflow-hidden rounded-md" v-for="e in 13">
                    <template #header>
                        <div class="bg-white">
                            <img alt="gambar" src="/images/image/1.png" />
                        </div>
                    </template>
                    <template #title>
                        <div class="px-3 line-clamp-1">Advanced Card</div>
                    </template>
                    <template #subtitle>
                        <div class="px-3 line-clamp-1">
                            Card subtitle
                        </div>
                    </template>
                    <template #content>
                        <div class="px-3 mb-3">
                            <p class="m-0 line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                                quas!
                            </p>
                        </div>
                    </template>
                    
                </Card>
            </div>
        </div>
    </div>
</template>