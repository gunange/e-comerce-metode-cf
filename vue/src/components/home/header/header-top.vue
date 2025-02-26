<template>
    <div class="flex justify-between text-xs pt-3">
        <div class="">
            <Button class="px-0 hover:bg-transparent text-white" label="Seller"  as="router-link" to="/daftar-seller" size="small" variant="text" severity="secondary"/>
        </div>
        <div class="flex">
            <Button class="ms-[8px] hover:bg-transparent text-white" label="Daftar"  as="router-link" to="/login" size="small" variant="text" severity="secondary"/>
            <Button class="ms-[8px] hover:bg-transparent ml-4 text-white" label="Login"  as="router-link" to="/login" size="small" variant="text" severity="secondary"/>
        </div>
    </div>
</template>