<!--
     * Filename: PostList.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 28.07.2020
     * Time: 04:43 
-->
<template>
    <b-table small :fields="fields" :items="Posts" responsive="sm" striped>
        <template v-slot:cell(lang)="row">
            {{ Languages[row.item.lang] }}
        </template>
        <template v-slot:row-details="row">
            <b-list-group>
                <b-list-group-item
                        v-for="(item, index) in listLanguagesActiveSlice(row.item.lang)"
                        :key="index"
                        class="custom-lang-item"
                >
                    <span v-if="row.item.parent[item[0]]">
                        <strong>{{ item[1]}}</strong>
                        {{ row.item.parent[item[0]].title }}
                         <router-link
                                 class="btn btn-success btn-sm"
                                 :to="{ name: postTpe + 'Edit', params:{ id: row.item.parent[item[0]].id}}"
                         >
                <b-icon-pencil></b-icon-pencil>
                Düzenle
            </router-link>
                    </span>

                    <span v-else><strong>{{ item[1]}}</strong> sürümü yok
                        <b-button size="sm" variant="primary" @click="newLangClonPost(row, item[0])">
                            Hemen Ekle
                        </b-button>
                    </span>
                </b-list-group-item>
            </b-list-group>
        </template>
        <template v-slot:cell(edit)="row">
            <router-link
                    class="btn btn-success btn-sm"
                    :to="{ name: postTpe + 'Edit', params:{ id: row.item.id}}"
            >
                <b-icon-pencil></b-icon-pencil>
                Düzenle
            </router-link>
        </template>
    </b-table>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "PostList",
        props: ['postTpe'],
        data() {
            return {
                fields: [
                    // A column that needs custom formatting
                    /*{key: 'id', label: '#'},*/
                    { key: 'lang', label: 'Dil' },
                    { key: 'title', label: 'Başlık' },
                    { key: 'created_at', label: 'Eklenme Tarihi' },
                    { key: 'edit', label: 'Düzenle' },
                ],
            }
        },
        computed: {
            ...mapGetters({
                Posts: 'Posts/posts',
                Languages: 'User/getLanguages'
            }),

        },
        methods: {
            ...mapActions({
                getPosts: 'Posts/getPosts',
                setNewLangClonPost: 'Posts/setNewLangClonPost',
            }),
            listLanguagesActiveSlice(par){
                let array = Object.entries(this.Languages)
                return array.splice(array.indexOf(par),1)
            },
            newLangClonPost(data, lang){
                let loader = this.$loading.show({
                    canCancel: false,
                });
                this.setNewLangClonPost({
                    id: data.item.id,
                    lang: lang
                }).then(response => {
                    data.item.parent[lang] = response.data
                    this.Posts[data.index].parent.push({
                            lang:response.data
                    })
                    loader.hide()
                })
            }
        },
        created() {

            let loader = this.$loading.show({
                // Optional parameters
                // container: false,
                canCancel: false,
            });
            this.getPosts(
                {
                    type: this.postTpe,
                    data: null
                }
            ).then(() => {
                loader.hide()
            })
        }
    }
</script>

<style scoped>
    .custom-lang-item {
        padding: 1px;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.125)
    }
</style>