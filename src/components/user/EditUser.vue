<!--
     * Filename: EditUser.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 9.09.2020
     * Time: 04:23 
-->
<template>
    <b-modal id="editUser" hide-footer>
        <template v-slot:modal-title>
           {{ user.name }} Düzenle
        </template>
        <div class="d-block">
            <form @submit.prevent="editUserFormSubmit" v-if="user">
                <b-alert variant="danger" :show="editUserErrorMessage != null">
                    <ul>
                        <li v-for="(error, value) in editUserErrorMessage" :key="value">
                            <span v-for="message in error" :key="message"> {{ message }} </span>
                        </li>
                    </ul>
                </b-alert>
                <div class="form-group">
                    <label>Kullanıcı Rolü</label>
                    <b-form-select v-model="user.role_id" :options="Roles">{{ Roles.name }}</b-form-select>
                </div>
                <div class="form-group">
                    <label for="inputName">Ad / Soyad</label>
                    <input type="text" class="form-control" id="inputName" aria-describedby="emailHelp"
                           v-model="user.name"
                           placeholder="Ad / Soyad">
                </div>
                <div class="form-group">
                    <label for="inputEmail">E-Posta</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
                           v-model="user.email"
                           placeholder="Enter email" disabled>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Şifre</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"
                           v-model="user.password">
                </div>
                <b-button variant="success" class="mt-3" block type="submit" :disabled="formSubmit">Düzenle</b-button>
            </form>
        </div>

        <b-button class="mt-3" block @click="$bvModal.hide('editUser')">İptal</b-button>
    </b-modal>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditUser",
        data() {
            return {
                formSubmit:false,
                editUserErrorMessage: null,
            }
        },
        computed: {
            ...mapGetters({
                Roles: 'Users/Roles',
                user: 'Users/ShowUser'
            })
        },
        methods: {
            ...mapActions({
                updateUser: 'Users/updateUser', // APİ
                editUserAction: 'Users/setEditUser' // Stor
            }),
            ...mapMutations({
                setError: 'Error/SET_ERROR',
                editUserMutation: 'Users/SET_EDIT_USER'
            }),
            editUserFormSubmit() {
                this.formSubmit = true
                this.updateUser(this.user).then((response) => {
                    this.setError({
                        type: 'success',
                        message: 'Kullanıcı başarı ile düzenlendi.',
                    })
                    this.editUserAction(response.data) // storda değiştir
                    this.$bvModal.hide('editUser')
                    this.formSubmit = false
                    this.editUserErrorMessage = null
                }).catch(error => {
                    this.editUserErrorMessage = error.response.data
                    this.formSubmit = false
                })
            },
        }
    }
</script>

<style scoped>

</style>