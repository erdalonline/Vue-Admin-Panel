<!--
     * Filename: UserRoleActions.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 02:49 
-->
<template>
    <div>
        <b-modal id="chanceTermActions" size="xl"
                 :ok-disabled="loading"
                 @ok="setRoleActions"
                 @hidden="resetActions(null)">
            <div class="lds-ring-container text-center loading" v-if="loading">
                <img src="https://livepow.com/img/loading.gif" width="50">
            </div>
            <template v-slot:modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <h5>
                    <span class="font-weight-bold">
                    {{ role.text }}
                </span>
                    Yetkilerini Düzenle
                </h5>
                <b-button size="sm" variant="danger" @click="close()">
                    Kapat
                </b-button>
            </template>

            <b-form-group v-for="(controller,index) in actions" :key="index">
                <label class="font-weight-bold">{{ controller.action }}</label>
                <b-form inline>
                    <b-form-checkbox name="check-button"
                                     class="m-1"
                                     v-for="(action, aindex) in controller.sub"
                                     v-model="actions[controller.id].sub[aindex].selected"
                                     :key="aindex">
                        {{ action.url }}
                    </b-form-checkbox>
                </b-form>
            </b-form-group>
            <template v-slot:modal-cancel>İptal</template>
            <template v-slot:modal-ok>Kaydet</template>
        </b-modal>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: "UserRoleActions",
        data() {
            return {
                loading: false
            }
        },
        computed: {
            ...mapGetters({
                'actions': 'Users/UserRoleTermActions',
                'role': 'Users/UserRoleTerm',
            })
        },
        methods: {
            ...mapActions({
               'actionPost' : 'Users/setRoleActions'
            }),
            ...mapMutations({
                'resetActions': 'Users/SET_ROLE_TERM_ACTIONS'
            }),
            setRoleActions(event){
                event.preventDefault()
                this.loading = true
                this.actionPost({
                    id: this.role.value,
                    data: this.actions
                }).then(() => {
                    this.loading = false
                    this.$bvModal.hide('chanceTermActions')
                }).catch(() => {
                    this.loading = false
                })
            }
        },
        watch: {
            actions() {
                //alert('değişti')
            }
        }
    }
</script>

<style scoped>

</style>