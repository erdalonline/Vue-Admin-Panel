<template>
    <div>


        <div class="d-flex" :class="{ toggled: menuToggle}" id="wrapper">
            <!-- Sidebar -->
            <Sidebar/>
            <!-- /#sidebar-wrapper -->
            <!-- Page Content -->
            <div id="page-content-wrapper">
                <!-- Navbar -->
                    <Navbar :toogle="menuToggle" @myEvent="menuToggle = $event"></Navbar>
                <!-- /Navbar -->

                <div class="container-fluid">
                    <transition
                            name="fade"
                            mode="out-in"
                            @enter="enter"
                    >
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
            <!-- /#page-content-wrapper -->

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
        overflow-x: hidden;
    }
    /*
     * Sidebar
     */

    #sidebar-wrapper {
        min-height: 100vh;
        margin-left: -15rem;
        -webkit-transition: margin .25s ease-out;
        -moz-transition: margin .25s ease-out;
        -o-transition: margin .25s ease-out;
        transition: margin .25s ease-out;
    }

    #sidebar-wrapper .sidebar-heading {
        padding: 0.875rem 1.25rem;
        font-size: 1.2rem;
    }

    #sidebar-wrapper .list-group {
        width: 15rem;
    }

    #page-content-wrapper {
        min-width: 100vw;
    }

    #wrapper.toggled #sidebar-wrapper {
        margin-left: 0;
    }

    @media (min-width: 768px) {
        #sidebar-wrapper {
            margin-left: 0;
        }

        #page-content-wrapper {
            min-width: 0;
            width: 100%;
        }

        #wrapper.toggled #sidebar-wrapper {
            margin-left: -15rem;
        }
    }

</style>