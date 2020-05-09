<template>
    <div>
        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">{{ this.$store.getters.appName }}</div>
            <ul class="list-group list-group-flush">
                <li v-for="item in nav" :key="item.path">
                    <router-link :to="item.children[0].path" active-class="active" exact
                                 class="list-group-item list-group-item-action">
                        <b-icon :icon="item.children[0].meta.icon"></b-icon>
                        {{ item.children[0].meta.title }}
                    </router-link>
                </li>
            </ul>
        </div>
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

<style scoped>

</style>