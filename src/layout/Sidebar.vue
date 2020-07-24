<template>
    <div id="sidebar-container" class="sidebar-expanded d-none d-md-block col-2 border-right">
            <ul class="list-group sticky-offset sticky-top">
                <li v-for="item in nav" :key="item.path">
                    <router-link :to="item.children[0].path" active-class="active" exact
                                 class="list-group-item list-group-item-action">
                        <b-icon :icon="item.children[0].meta.icon"></b-icon>
                        {{ item.children[0].meta.title }}
                    </router-link>
                </li>
            </ul>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                nav: this.$store.getters["Routes/getRoutes"] || null,
            }
        },
    }
</script>

<style>

</style>