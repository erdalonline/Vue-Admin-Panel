<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item" v-for="item in nav" :key="item.path">
                    <router-link :to="item.children[0].path"  active-class="active" exact class="nav-link">
                        <b-icon :icon="item.children[0].meta.icon"></b-icon>
                        {{ item.children[0].meta.title }}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                nav: this.$store.getters["Routes/getRoutes"] || null
            }
        },
    }
</script>

<style scoped>

</style>