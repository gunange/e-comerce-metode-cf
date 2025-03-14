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
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Detail Product" class="w-full" size="small" @click="goToDetail"/>
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
        itemId:{
            type: Number,
            required : false,
            default : null
        },
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
    },
    methods: {
        goToDetail() {
            this.$emit('detail-product', { 
                id: this.itemId,
                title: this.title,
                subtitle: this.subtitle,
                description: this.description,
                price: this.price,
                image: this.image,
                category: this.category
             });
        }
    }
}
</script>