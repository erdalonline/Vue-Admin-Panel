<!--
     * Filename: Ads.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 5.05.2020
     * Time: 02:20 
-->
<template>
    <div>
        <p>data ile uğraşmaca</p>
        {{ key }}
    </div>
</template>

<script>
    function timeout(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)

        })
    }
    // import HTTP from '@/config/http'
    export default {
        name: "Ads",
        data() {
            return {
                key: 'ilk gelen'
            }
        },
        // async mounted(){
        //     await HTTP.yeniGet2('user')
        //     this.key = 'olacak 1'
        // }
       async created() {
            await  timeout(2000)
            this.key = 'created'
           console.log('ilk 2 sn .')
        },
        async mounted() {
            await timeout(5000)
            console.log('ikinci 2 sn .')
            this.$store.dispatch('User/getUser')
            this.key  = 'son gelen'
        }
    }
</script>

<style scoped>

</style>