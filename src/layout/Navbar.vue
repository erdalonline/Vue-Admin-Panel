<template>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-1">
        <router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">{{ this.$store.getters.appName }}</router-link>
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <router-link to="logout" class="nav-link">
                    <b-icon-backspace-reverse-fill></b-icon-backspace-reverse-fill>
                    Çıkış Yap
                </router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>