<template>
    <div>
        <Navbar :toogle="menuToggle" @myEvent="menuToggle = $event"></Navbar>

    <div class="wrapper">
        <!-- Navbar -->

        <!-- /Navbar -->
        <Sidebar :class="{ active: menuToggle}"/>
        <div id="content">
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
    body {
        font-size: .875rem;
        padding-top: 56px;
    }

    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
    }
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


</style>