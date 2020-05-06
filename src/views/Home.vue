<template>
    <div>
       <layout-title>Anasayfa</layout-title>

        <p>
            Merhaba, <b>{{ user.name }}</b> Hoşgeldin !
        </p>

    </div>
</template>

<script>
    import LayoutTitle from "../components/layout/LayoutTitle";
    export default {
        name: 'Home',
        components: {LayoutTitle},
        data() {
            return {
                control: false
            }
        },
        computed:{
            user(){
                return this.$store.state.User.user
            }
        },
        mounted() {

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
