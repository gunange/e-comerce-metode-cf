<template>
    <Card class="overflow-hidden rounded-md">
        <template #header>
            <div class="bg-gray-300 ">
                <Image :src="image" alt="Gambar Product" preview imageClass="h-[100%] mx-auto" class="block" />
            </div>
        </template>
        <template #title>
            <div class="px-2 line-clamp-1 text-sm">{{ title }}</div>
        </template>
        <template #subtitle>
            <div class="px-2 line-clamp-1 text-sm">
                {{subtitle}}
            </div>
        </template>
        <template #content>
            <div class="px-2 mb-3">
                <p class="m-0 line-clamp-2 text-xs">
                   {{ description }}
                </p>
            </div>
        </template>
        
    </Card>
</template>

<script>

export default {

    data() {
        return {
           
        }
    },
    props: {
        title:{
            type: String,
            required : false,
            default : 'Title or label'
        },
        subtitle:{
            type: String,
            required : false,
            default : 'Card Subtitle'
        },
        description:{
            type: String,
            required : false,
            default : 'Card Content'
        },
        price:{
            type: Number,
            required : false,
            default : 100000
        },
        image:{
            type: String,
            required : false,
            default : '/assets/image/1.png'
        },
        category:{
            type: String,
            required : false,
            default : 'Elektronik'
        },
        
    }
}
</script>