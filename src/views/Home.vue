<template>
    <div class="hello">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Anasayfa</h1>
        </div>

        <p>
            {{ user }} gelecek .
            {{ control }} .
        </p>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                control: false
            }
        },
        computed:{
            user(){
                return this.$store.state.User
            }
        },
        mounted() {
            if(this.$store.getters["User/isLogin"]){
                this.control = false
                this.$store.dispatch('User/getUser').then(response => {
                    console.log(response)
                    this.control = true
                }).catch(error => {
                    console.log(error)
                    this.control = true
                    this.$router.push('/logout')
                })
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
