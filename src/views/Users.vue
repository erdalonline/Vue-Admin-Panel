<!--
     * Filename: Users.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 5.05.2020
     * Time: 02:24 
-->
<template>
    <div>
        <layout-title title="Kullanıcılar" action="true">
            <b-button variant="primary" id="show-btn" @click="addUserModalOpen">
                <b-icon-plus/>
                Kullanıcı Ekle
            </b-button>
            <b-button variant="primary" id="show-btn" @click="roleModalOpen">
                <b-icon-person-lines-fill/>
                Kullanıcı Rollleri
            </b-button>
        </layout-title>

        <!-- add user modal -->
        <AddUser></AddUser>
        <!-- /add user modal -->

        <!-- edit user modal -->
        <EditUser></EditUser>
        <!-- /edit user modal -->

        <!-- role list modal -->
        <RoleList></RoleList>
        <!-- /role list modal -->

        <!-- add role modal -->
        <AddRole></AddRole>
        <!-- /add role modal -->

        <!-- role Actions List modal -->
        <UserRoleActions></UserRoleActions>
        <!-- /role Actions List modal -->

        <div class="lds-ring-container text-center loading" v-if="loading">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <b-table :items="Users" small :fields="fields" v-else>
            <template v-slot:cell(role_id)="row">
                {{ activeRoleText(row.item.role_id) }}
            </template>
            <template v-slot:cell(actions)="row">
                <b-button-group size="sm" class="float-right">
                    <b-button variant="primary" @click.prevent.stop="editUser(row.item.id)">
                        <b-icon-pencil></b-icon-pencil>
                        Düzenle
                    </b-button>
                    <b-button variant="danger" :disabled="row.item.id == AuthUser.id" @click.prevent.stop="deleteUser(row)">
                        <b-icon-trash></b-icon-trash>
                        Sil
                    </b-button>
                </b-button-group>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import LayoutTitle from "../components/layout/LayoutTitle";
    import RoleList from "../components/user/RoleList";
    import UserRoleActions from "../components/user/UserRoleActions";
    import AddUser from "../components/user/AddUser";
    import AddRole from "../components/user/AddRole";
    import EditUser from "../components/user/EditUser";

    export default {
        name: "User",
        data() {
            return {
                loading: true,
                fields: [
                    {
                        key: 'id', label: 'ID'
                    },
                    {
                        key: 'name', label: 'Ad - Soyad'
                    },
                    {
                        key: 'email', label: 'E-Posta'
                    },
                    {
                        key: 'role_id', label: 'Rol'
                    },
                    {
                        key: 'actions',
                        label: 'Düzenle - Sil',
                        class: 'text-center'
                    }
                ]
            }
        },
        components: {EditUser, AddRole, AddUser, UserRoleActions, RoleList, LayoutTitle},
        computed: {
            ...mapGetters({
                'AuthUser': 'User/getUser',
                'Users': 'Users/Users',
                'Roles': 'Users/Roles'
            })
        },
        methods: {
            ...mapActions({
                getUsers: 'Users/getUsers',
                getRoles: 'Users/getRoles',
                getUser: 'Users/getUser',
                setDeleteUser: 'Users/deleteUser'
            }),
            ...mapMutations({
                'setError': 'Error/SET_ERROR',
            }),
            activeRoleText(id){
                let index = this.Roles.findIndex(item => item.value == id)
                return this.Roles[index].text
            },
            /* user add and user list*/
            addUserModalOpen() {
                this.setError(null)
                this.$bvModal.show('addUser')
            },
            /* user role list modal */
            roleModalOpen() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.getRoles().then(response => {
                    this.$bvModal.show('userRoles')
                    this.loading = false
                }).catch(error => {
                    this.loading = false
                    this.setError(error.response.data)
                })
            },
            /* edit user */
            editUser(id){
                let loader = this.$loading.show({
                    canCancel: false
                })
                this.getUser(id).then(() => {
                    loader.hide()
                    this.$bvModal.show('editUser')
                }).catch(() => {
                    loader.hide()
                    this.setError({
                        type: 'danger',
                        message: 'Bir sorun oluştu! Yöneticiniz ile irtibata geçin.',
                    })
                })
            },
            /* delete user */
            deleteUser(data){
                if(data.item.id != this.AuthUser.id){
                    this.$bvModal.msgBoxConfirm('Silmek istediğinize emin misiniz?', {
                        title: 'Uyarı!',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'danger',
                        okTitle: 'Evet',
                        cancelTitle: 'Hayır',
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    })
                        .then(value => {
                            if (value){
                                this.setDeleteUser(data.item.id).then(() => {
                                    this.Users.splice(data.index,1)
                                })
                            }
                        })
                        .catch(() => {
                            // An error occurred
                        })
                }
            }
        },
        created() {
            // eslint-disable-next-line no-unused-vars
            this.getUsers().then(response => {
                this.loading = false
                this.getRoles().then(() => {

                }).catch(error => {
                    this.loading = false
                    this.setError(error.response.data)
                })
            }).catch(error => {
                this.loading = false
                this.setError(error.response.data)
                //this.$router.push('/logout')
            })
        }
    }
</script>

<style scoped>

</style>