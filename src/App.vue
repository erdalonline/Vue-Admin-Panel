<template>
    <div id="app">
        <div class="lds-ring-container text-center loading" v-if="!control">
            <img src="https://livepow.com/img/loading.gif" width="50">
        </div>
        <router-view v-show="control"></router-view>
    </div>
</template>

<script>
   export default {
        name: 'App',
       data() {
           return {
               key: 'okey',
               control: true
           }
       },
       created: function () {
           // eslint-disable-next-line no-unused-vars
           if(this.$store.getters["User/isLogin"]){
               this.control = false
               // eslint-disable-next-line no-unused-vars
               this.$store.dispatch('User/getUser').then(response => {
                   this.control = true
                   // eslint-disable-next-line no-unused-vars
               }).catch(error => {
                   this.control = true
                   this.$router.push('/logout')
               })
           }

       }
   }
</script>

<style scoped>
    .loading {
        padding-top: 15%;
    }
</style>
