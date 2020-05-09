<!--
     * Filename: LayoutTitle.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 6.05.2020
     * Time: 04:49 
-->
<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom top">
        <h1 class="h2">{{ title }}</h1>
        <div class="btn-toolbar mb-2 mb-md-0" v-show="action">
            <div class="btn-group mr-2">
                <slot></slot>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        name: "LayoutTitle",
        props:{
            title:{
                default:'Title'
            },
            action:{
                default:false
            }

        }
    }
</script>

<style scoped>
    .top{
        padding-top: 3px;
    }
</style>