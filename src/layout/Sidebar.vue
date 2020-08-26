<template>
    <div id="sidebar-container" class="sidebar-expanded d-none d-md-block col-2 border-right">
        <ul class="list-group sticky-offset sticky-top">
            <li v-for="item in nav" :key="item.path">
                <!-- normal menü -->
                <router-link
                        :to="item.children[0].path"
                        active-class="active"
                        :exact="item.children[0].meta.exact"
                        class="list-group-item list-group-item-action"
                        v-if="!item.subnav"
                >
                    <b-icon
                            :icon="item.children[0].meta.icon"
                    ></b-icon>
                    {{ item.children[0].meta.title }}
                </router-link>
                <!-- sub menü -->
                <router-link
                        :to="item.path"
                        active-class="active"
                        :exact="item.children[0].meta.exact"
                        class="list-group-item list-group-item-action"
                        v-else
                >
                    <!-- v-b-toggle="item.name"-->
                    <b-icon
                            :icon="item.children[0].meta.icon"
                    ></b-icon>
                    {{ item.meta.title }}
                </router-link>
                <b-collapse :id="item.name" v-show="item.subnav" v-model="item.subshow">
                    <ul class="list-group">
                        <li v-for="(subnav, index) in subnavfilter(item.children)" :key="index">
                            <router-link
                                    :to="item.path + '/' +subnav.path"
                                    class="list-group-item list-group-item-action"
                                    active-class="active-sub"
                                    exact
                            >
                              <b-icon-arrow-right></b-icon-arrow-right>
                                {{ subnav.meta.title }}
                            </router-link>
                        </li>
                    </ul>
                </b-collapse>

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
        methods: {
            subnavfilter(subs){
                return subs.filter(item => {
                    if (!item.hidden){
                        return item
                    }
                })
            },
            subNawShow(item){
                console.log(this.$route.path)
                console.log("item :     " + item)
                if (this.$route.path.search(item)){
                    return true
                }else{
                    return false
                }
            }
        },

    }
</script>

<style>
    .active-sub {
        font-weight: bold;
        background-color: #d0d0d0 !important;
    }
</style>