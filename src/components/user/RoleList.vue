<!--
     * Filename: RoleList.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 02:40 
-->
<template>
    <div>
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
                <tr v-for="role in roles" :key="role.value">
                    <th>{{ role.text }}</th>
                    <td>{{ role.description}}</td>
                    <td><b-button v-b-modal.modal-multi-1 size="sm" variant="success">
                        <b-icon-pencil></b-icon-pencil>
                        Yetkileri Düzenle
                    </b-button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoleList",
        props:['roles']
    }
</script>

<style scoped>

</style>