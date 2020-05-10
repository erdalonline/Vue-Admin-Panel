<!--
     * Filename: AddRole.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 10.05.2020
     * Time: 06:45 
-->
<template>
    <b-modal
            id="addRole"
            ref="modal"
            title="Rol Ekle"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            :ok-disabled="formSubmit"
    >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
                    :state="nameState"
                    label="Rol Adı"
                    label-for="name-input"
                    invalid-feedback="*Rol Adı Zorunlu!"
            >
                <b-form-input
                        id="name-input"
                        v-model="role.name"
                        :state="nameState"
                        required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                    label="Rol Açıklaması"
            >
                <b-form-textarea
                        id="textarea"
                        v-model="role.description"
                        placeholder="Rol Hakkında kısa bilgi.."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
            </b-form-group>
        </form>
        <template v-slot:modal-cancel>İptal</template>
        <template v-slot:modal-ok>Ekle</template>
    </b-modal>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "AddRole",
        data() {
            return {
                formSubmit: false,
                role: {
                    name: null,
                    description: null
                },
                nameState: null,
                submittedNames: []
            }
        },
        methods: {
            ...mapActions({
                'addRole': 'Users/addRole'
            }),
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.role = {
                    name: null,
                    description: null
                }
                this.nameState = null
                this.formSubmit = false
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // form'u gönder
                this.formSubmit = true
                // eslint-disable-next-line no-unused-vars
                this.addRole(this.role).then(response => {
                    this.$nextTick(() => {
                          // Hide the modal manually
                         this.$bvModal.hide('addRole')
                    })
                }).catch(() =>{
                    this.formSubmit = false
                })


            }
        }
    }
</script>

<style scoped>

</style>