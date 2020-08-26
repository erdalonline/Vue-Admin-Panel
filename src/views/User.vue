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

        <div class="table-responsive" v-else>
            <table class="table table-striped table-sm" v-show="Users.length > 0">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user) in Users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations} from 'vuex'
    import LayoutTitle from "../components/layout/LayoutTitle";
    import RoleList from "../components/user/RoleList";
    import UserRoleActions from "../components/user/UserRoleActions";
    import AddUser from "../components/user/AddUser";
    import AddRole from "../components/user/AddRole";
    export default {
        name: "User",
        data() {
            return {
                loading: true,
            }
        },
        components: {AddRole, AddUser, UserRoleActions, RoleList, LayoutTitle},
        computed: {
            ...mapGetters({
                'Users': 'Users/Users',
                'Roles': 'Users/Roles'
            })
        },
        methods: {
            ...mapActions({
                getUsers: 'Users/getUsers',
                getRoles: 'Users/getRoles'
            }),
            ...mapMutations({
                'setError': 'Error/SET_ERROR'
            }),
            /* user add and user list*/
            addUserModalOpen() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.getRoles().then(response => {
                    this.$bvModal.show('addUser')
                    this.loading = false
                }).catch(error => {
                    this.loading = false
                    this.setError(error.response.data)
                })
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
            }
        },
        created() {
            // eslint-disable-next-line no-unused-vars
            this.getUsers().then(response => {
                this.loading = false
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