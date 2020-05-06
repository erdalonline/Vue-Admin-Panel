<!--
     * Filename: LayoutTitle.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 6.05.2020
     * Time: 04:49 
-->
<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2"><slot></slot></h1>
    </div>
</template>
<script>
    export default {
        name: "LayoutTitle"
    }
</script>

<style scoped>

</style>