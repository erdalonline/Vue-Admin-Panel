<template>
    <div>
       <layout-title title="Anasayfa"></layout-title>
        <div class="main-content">
            <div class="header bg-gradient-primary pb-8 pt-1 pt-md-8">
                <div class="container-fluid">
                    <div class="header-body">
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 pt-3" v-for="(item, index) in homeStats" :key="index">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-0">{{ item.name }}</h5>
                                                <span class="h2 font-weight-bold mb-0">{{ item.count }}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i class="fas fa-chart-bar"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Page content -->
        </div>
    </div>
</template>

<script>
    import LayoutTitle from "../components/layout/LayoutTitle";
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: 'Home',
        components: {LayoutTitle},
        data() {
            return {
                control: false
            }
        },
        computed:{
            ...mapGetters({
               homeStats: 'getHomeStats'
            }),
            user(){
                return this.$store.state.User.user
            }
        },
        methods:{
            ...mapActions({
                getHomeStats: 'getHomeStats'
            })
        },
        created() {
            /*
            let loader = this.$loading.show({
                canCancel:false
            })
            this.getHomeStats().then(() => {
                loader.hide()
            })
            */
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
