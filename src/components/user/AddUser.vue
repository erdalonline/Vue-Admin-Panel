<!--
     * Filename: AddUser.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 05:17 
-->
<template>
    <b-modal id="addUser" hide-footer>
        <template v-slot:modal-title>
            Yeni Kullanıcı Ekle
        </template>
        <div class="d-block">
            <form @submit.prevent="addUserFormSubmit">
                <b-alert variant="danger" :show="newUserError">
                    <ul>
                        <li v-for="(error, value) in newUserErrorMessage" :key="value">
                            <span v-for="message in error" :key="message"> {{ message }} </span>
                        </li>
                    </ul>
                </b-alert>
                <div class="form-group">
                    <label>Kullanıcı Rolü</label>
                    <b-form-select v-model="newUser.role_id" :options="Roles">{{ Roles.name }}</b-form-select>
                </div>
                <div class="form-group">
                    <label for="inputName">Ad / Soyad</label>
                    <input type="text" class="form-control" id="inputName" aria-describedby="emailHelp"
                           v-model="newUser.name"
                           placeholder="Ad / Soyad">
                </div>
                <div class="form-group">
                    <label for="inputEmail">E-Posta</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
                           v-model="newUser.email"
                           placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="inputPassword">Şifre</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"
                           v-model="newUser.password">
                </div>
                <b-button variant="success" class="mt-3" block type="submit">Kaydet</b-button>
            </form>
        </div>

        <b-button class="mt-3" block @click="$bvModal.hide('addUser')">İptal</b-button>
    </b-modal>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "AddUser",
        data() {
            return {
                newUser: {
                    'name': null,
                    'email': null,
                    'password': null,
                    'role_id': null,
                    'role': null
                },
                newUserError: false,
                newUserErrorMessage: null,
            }
        },
        computed: {
            ...mapGetters({
                'Roles': 'Users/Roles'
            })
        },
        methods: {
            ...mapActions({
                'addUser': 'Users/addUser'
            }),
            ...mapMutations({
                'setError': 'Error/SET_ERROR',
            }),
            addUserFormSubmit() {
                this.addUser(this.newUser).then(() => {
                    this.setError({
                        type: 'success',
                        message: 'Kullanıcı başarı ile eklendi.',
                    })
                    this.$bvModal.hide('addUser')
                }).catch(error => {
                    this.newUserError = true
                    this.newUserErrorMessage = error.response.data
                    this.newUser.password = null
                })
            },
        }
    }
</script>

<style scoped>

</style>