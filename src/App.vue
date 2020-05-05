<template>
    <div id="app">
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
       mounted: function () {
           // eslint-disable-next-line no-unused-vars
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

<style>

</style>
