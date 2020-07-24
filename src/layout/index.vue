<template>
    <div>
        <!-- Navbar -->
        <Navbar :toogle="menuToggle" @myEvent="menuToggle = $event"></Navbar>
        <!-- /Navbar -->

        <div class="row d-flex" :class="{ toggled: menuToggle}" id="body-row">
            <Sidebar/>
            <div class="col py-3">
                <transition
                        name="fade"
                        mode="out-in"
                        @enter="enter"
                >
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    import Sidebar from "./Sidebar";

    export default {
        name: "index",
        data() {
            return {
                width: window.innerWidth || null,
                menuToggle: false
            }
        },
        components: {Navbar, Sidebar},
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
        },
        methods: {
            enter() {
                this.menuToggle = false
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 0)
            },
            //mobile width
            isMobile() {
                if (this.width <= 760) {
                    return true
                } else {
                    return false
                }
            },
            onResize() {
                this.width = window.innerWidth
            }
        }
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: height, opacity;
        transition-timing-function: ease;
        overflow: hidden;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    body {
        font-size: .875rem;
        padding-top: 56px;
    }

    .sticky-offset {
        top: 59px !important;
    }

    #body-row {
        margin-left: 0;
        margin-right: 0;
    }

    #sidebar-container {
        min-height: 100vh;
        padding: 0;
    }

    .border-right {
        border-right: 1px solid #dee2e6!important;
    }

    /* Sidebar sizes when expanded and expanded */
    .sidebar-expanded {
        width: 230px;
    }

    .sidebar-collapsed {
        width: 60px;
    }

    /* Menu item*/
    #sidebar-container .list-group a {
        height: 50px;
    }

    /* Submenu item*/
    #sidebar-container .list-group .sidebar-submenu a {
        height: 45px;
        padding-left: 30px;
    }

    /* Closed submenu icon */
    #sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
        content: " \f0d7";
        font-family: FontAwesome;
        display: inline;
        text-align: right;
        padding-left: 10px;
    }

    /* Opened submenu icon */
    #sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
        content: " \f0da";
        font-family: FontAwesome;
        display: inline;
        text-align: right;
        padding-left: 10px;
    }

    /*
     * Sidebar
     */
    #sidebar-container {
        margin-left: -17rem;
        -webkit-transition: margin .25s ease-out;
        -moz-transition: margin .25s ease-out;
        -o-transition: margin .25s ease-out;
        transition: margin .25s ease-out;
    }

    #sidebar-wrapper .list-group {
        width: 15rem;
    }

    .toggled #sidebar-container {
        margin-left: 0;

    }

    @media (min-width: 768px) {
        #sidebar-container {
            margin-left: 0;
        }

        .toggled #sidebar-container {
            margin-left: -15rem;
        }
    }

    @media (max-width: 768px) {
        #sidebar-container {
            margin-left: 0;
        }
        .sidebar-heading{
            display: none;
        }
        .toggled #sidebar-container {
            display: block !important;
            min-width: 70%;
        }
    }

</style>