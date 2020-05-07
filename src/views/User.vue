<!--
     * Filename: User.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 5.05.2020
     * Time: 02:24 
-->
<template>
    <div>
        <layout-title title="Kullanıcılar" action="true">
            <b-button variant="primary" id="show-btn" @click="$bvModal.show('addUser')">
                <b-icon-plus/>
                Kullanıcı Ekle
            </b-button>
        </layout-title>
        <b-modal id="addUser" hide-footer>
            <template v-slot:modal-title>
                Yeni Kullanıcı Ekle
            </template>
            <div class="d-block">
                <form @submit.prevent="addUser">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Ad / Soyad</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               v-model="newUser.name"
                               placeholder="Ad / Soyad">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               v-model="newUser.email"
                               placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                               v-model="newUser.password">
                    </div>
                    <b-button variant="success" class="mt-3" block type="submit">Kaydet</b-button>
                </form>
            </div>

            <b-button class="mt-3" block @click="$bvModal.hide('addUser')">İptal</b-button>

        </b-modal>
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
                loading: true,
                users: [],
                newUser: {
                    'name': null,
                    'email': null,
                    'password': null,
                },
                isError: false,
                error: {
                    type: 'danger',
                    message: 'Bir hata oluştu. Daha sonra tekrar deneyin.'
                }
            }
        },
        components: {LayoutTitle},
        methods: {
            addUser() {
                HTTP.post('users',this.newUser).then(response => {
                    this.users.push(response.data)
                    this.$bvModal.hide('addUser')
                    this.newUser = {
                        name: null,
                        email: null,
                        password: null
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            HTTP.get('users').then(response => {
                this.loading = false
                if (response.data.error) {
                    this.isError = true
                    this.error = response.data
                } else {
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