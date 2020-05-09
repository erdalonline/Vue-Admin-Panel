<!--
     * Filename: Ads.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 5.05.2020
     * Time: 02:20 
-->
<template>
    <div>
        <layout-title title="Ads"></layout-title>
        {{ key }}
    </div>
</template>

<script>
    import LayoutTitle from "../components/layout/LayoutTitle";
    export default {
        name: "Ads",
        components: {LayoutTitle},
        data() {
            return {
                key: 'Vue Data kısmında olan bir değişken.!'
            }
        },
    }
</script>

<style scoped>

</style>