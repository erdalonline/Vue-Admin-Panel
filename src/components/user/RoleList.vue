<!--
     * Filename: RoleList.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 02:40 
-->
<template>
    <b-modal id="userRoles" size="lg" hide-footer>
        <div class="lds-ring-container text-center loading" v-if="loading">
            <img src="https://livepow.com/img/loading.gif" width="50">
        </div>
        <template v-slot:modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <h5>Kullanıcı Rolleri</h5>
            <b-button-group>
                <b-button size="sm" variant="outline-success" @click="addRoleModal">
                    <b-icon-plus-circle />
                    Yeni Rol Ekle
                </b-button>
                <b-button size="sm" variant="danger" @click="close()">
                    Kapat
                </b-button>
            </b-button-group>
        </template>
        <div class="table-responsive">

            <table class="table">
                <caption>Yetki Listesi</caption>
                <thead>
                <tr>
                    <th scope="col">Rol Adı</th>
                    <th scope="col">Rol Açıklaması</th>
                    <th scope="col">İşlem</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="role in Roles" :key="role.value">
                    <th>{{ role.text }}</th>
                    <td>{{ role.description}}</td>
                    <td>
                        <b-button-group>
                            <b-button size="sm" variant="success" @click="chanceTermActions(role.value)">
                                <b-icon-pencil></b-icon-pencil>
                                Yetkileri Düzenle
                            </b-button>
                            <!--
                            <b-button variant="danger" size="sm">
                                <b-icon-archive />
                                Sil
                            </b-button>
                            -->
                        </b-button-group>

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        name: "RoleList",
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters({
               'Roles' : 'Users/Roles',
            }),
        },
        methods: {
            ...mapActions({
                'getActions': 'Users/getRoleActions'
            }),
            ...mapMutations({
               'userRoleTermSelect': 'Users/GET_USER_ROLE_TERM'
            }),
            addRoleModal(){
                this.$bvModal.show('addRole')
            },
            chanceTermActions(id){
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.getActions(id).then(response => {
                    this.userRoleTermSelect(id)
                    this.$bvModal.show('chanceTermActions')
                    this.loading = false
                }).catch(error => {
                    this.loading = false
                    this.setError(error.response.data)
                })
            }
        }
    }
</script>

<style scoped>

</style>