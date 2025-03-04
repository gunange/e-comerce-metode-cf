<template>
    <div class="flex justify-between items-center py-[15px]">
        <div class="brand flex items-center mx-[-10px]">
            <img src="/assets/logo/white.svg" class="size-16" alt="logo">
            <p class="text-2xl">DiahShoope</p>
        </div>
        <div class="search">
            <InputGroup>
                <InputText placeholder="Keyword" class="w-150 ps-3 py-0 border-0 bg-transparent" />
                <Button  icon="pi pi-search text-white" severity="secondary" variant="text" />
            </InputGroup>
        </div>
        <div class="keranjang">
            <Button  icon="pi pi-shopping-cart hover:bg-transparent text-white" severity="secondary"  size="large" variant="text"/>
        </div>
    </div>
</template>