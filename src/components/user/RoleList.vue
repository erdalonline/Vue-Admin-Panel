<!--
     * Filename: RoleList.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 02:40 
-->
<template>
    <b-modal id="userRoles" size="lg" hide-footer>
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
                        <b-button v-b-modal.modal-multi-1 size="sm" variant="success">
                            <b-icon-pencil></b-icon-pencil>
                            Yetkileri Düzenle
                        </b-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "RoleList",
        computed: {
            ...mapGetters({
               'Roles' : 'Users/Roles'
            }),
        },
        methods: {
            addRoleModal(){
                this.$bvModal.show('addRole')
            }
        }
    }
</script>

<style scoped>

</style>