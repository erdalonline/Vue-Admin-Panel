<template>
    <div class="hello">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Anasayfa</h1>
        </div>

        <p>
            {{ user }} gelecek .
            branch .
        </p>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        computed:{
            user(){
                return this.$store.state.User
            }
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
