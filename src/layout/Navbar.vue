<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top">
            <div class="sidebar-heading">{{ this.$store.getters.appName }}</div>
            <button class="btn btn-primary" id="menu-toggle" @click="menuToggleChance">Menü</button>

            <button class="navbar-toggler" :class="{ collapsed: navBarCollaspe}" type="button" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" @click="navBarCollaspe = !navBarCollaspe"></span>
            </button>

            <div class="collapse navbar-collapse" :class="{ show: navBarCollaspe}" >
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item ">
                        <router-link to="logout" class="nav-link btn btn-danger text-white">
                            <b-icon-backspace-reverse-fill></b-icon-backspace-reverse-fill>
                            Çıkış
                        </router-link>
                    </li>
                    <!--
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    -->
                </ul>
            </div>
        </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Navbar",
        props:['toogle'],
        data() {
            return {
                menuToggle: this.toggle,
                navBarCollaspe: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'User/getUser'
            })
        },
        methods:{
            menuToggleChance(){
                this.menuToggle = !this.menuToggle
                this.$emit('myEvent', this.menuToggle)
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        watch: {
            toogle(){
                this.menuToggle = this.toogle
            }
        }
    }
</script>

<style scoped>
    .sidebar-heading {
        padding: 5px;
        font-size: 1.2rem;
    }
</style>