<!--
     * Filename: User.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 5.05.2020
     * Time: 02:24 
-->
<template>
    <div>
        <layout-title title="Kullanıcılar">Kullanıcılar</layout-title>
        <div class="lds-ring-container text-center loading" v-if="loading">
            <img src="https://livepow.com/img/loading.gif" width="50">
        </div>

        <b-alert :variant="error.type" :show="isError">{{ error.message }}</b-alert>
        <div class="table-responsive">
            <table class="table table-striped table-sm" v-show="users.length > 0">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user) in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import HTTP from '@/config/http'
    import LayoutTitle from "../components/layout/LayoutTitle";
    export default {
        name: "User",
        data() {
            return {
                loading:true,
                users: [],
                isError:false,
                error: {
                    type: 'danger',
                    message: 'Bir hata oluştu. Daha sonra tekrar deneyin.'
                }
            }
        },
        components: {LayoutTitle},
        created() {
            HTTP.get('users').then(response => {
                this.loading = false
                if(response.data.error){
                    this.isError = true
                    this.error = response.data
                }else{
                    this.users = response.data
                }
            }).catch(error => {
                this.error = error.response.data
                this.$router.push('/logout')
            })
        }
    }
</script>

<style scoped>

</style>