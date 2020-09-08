<template>

    <div>
        <b-navbar toggleable="lg" fixed="top" class="border-bottom" variant="light">
            <b-navbar-brand href="#">{{ this.$store.getters.appName }}</b-navbar-brand>
            <button class="btn btn-primary" id="menu-toggle" @click="menuToggleChance">Menü</button>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>{{ user.name }}</em>
                        </template>
                        <b-dropdown-item href="#">Profil</b-dropdown-item>
                        <b-dropdown-item to="logout">Çıkış Yap</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Navbar",
        props: ['toogle'],
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
        methods: {
            menuToggleChance() {
                this.menuToggle = !this.menuToggle
                this.$emit('myEvent', this.menuToggle)
            },
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        watch: {
            toogle() {
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