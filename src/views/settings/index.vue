<!--
     * Filename: index.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 9.09.2020
     * Time: 22:52 
-->
<template>
    <div>
        <LayoutTitle title="Ayarlar"></LayoutTitle>
        <b-form-group>
            <b-button variant="success" class="float-right" @click="SettingSubmit">Kaydet</b-button>
            <div class="clearfix"></div>
            <b-form-group label="Site Ayarları" label-size="lg">
                <b-form-group label-cols="4" label-cols-lg="2" label="Site Adı" label-for="site_name">
                    <b-form-input id="site_name" v-model="Settings.site_name"></b-form-input>
                </b-form-group>
                <b-form-group label-cols="4" label-cols-lg="2" label="Site Eposta" label-for="site_mail">
                    <b-form-input id="site_mail" v-model="Settings.site_mail"></b-form-input>
                </b-form-group>
            </b-form-group>
            <b-form-group label="Diğer Ayarlar" label-size="lg">
                <b-form-group label-cols="4" label-cols-lg="2" label="Google Analytics" label-for="google_analytics"
                              description="Site izleme kodu">
                    <b-form-input id="google_analytics" v-model="Settings.google_analytics"></b-form-input>
                </b-form-group>
                <b-form-group label-cols="4" label-cols-lg="2" label="Header Kod" label-for="header_code"
                              description="<head> </head> Tagları arasına ekleyeceğiniz kodları girin.">
                    <b-form-textarea v-model="Settings.header_code" id="header_code"></b-form-textarea>
                </b-form-group>
                <b-form-group label-cols="4" label-cols-lg="2" label="Footer Kod" label-for="footer_code"
                              description="Sitenin Footer kısmına ekleyeceğiniz kodları girin.">
                    <b-form-textarea v-model="Settings.footer_code" id="footer_code"></b-form-textarea>
                </b-form-group>
            </b-form-group>
            <b-button variant="success" class="float-right" @click="SettingSubmit">Kaydet</b-button>
        </b-form-group>
    </div>
</template>

<script>
    import LayoutTitle from "../../components/layout/LayoutTitle";
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "index",
        components: {LayoutTitle},
        computed: {
            ...mapGetters({
                Settings: 'Settings/settingsForm'
            })
        },
        methods: {
            ...mapActions({
                getSettings: 'Settings/getSettings',
                setSettings: 'Settings/setSettings',
            }),
            SettingSubmit(){
                let loader = this.$loading.show({
                    canCancel:false
                })
                this.setSettings(this.Settings).then(() => {
                        loader.hide()
                })
            }
        },
        created() {
            let loader = this.$loading.show({
                canCancel:false
            })
            this.getSettings().then(() => {
                loader.hide()
            })
        }
    }
</script>

<style scoped>

</style>