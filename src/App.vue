<template>
    <div id="app">
        <router-view v-show="control"></router-view>
    </div>
</template>

<script>
    // import HTTP from '@/config/http'
   export default {
        name: 'App',
       data() {
           return {
               key: 'okey',
               control: true
           }
       },
       /*
       async created (){
            console.log(this.$router)
           if(this.$route.path !== '/login'){
               let status
               status = await HTTP.get('user')
               console.log(status)
               this.key = status
               if(status){
                   // console.log('burda')
                   // this.key = 'false'
                   // localStorage.removeItem('access_token')
                   this.$router.push('/login')
               }
           }
       },
       */
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
