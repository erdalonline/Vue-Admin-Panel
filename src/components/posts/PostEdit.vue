<!--
     * Filename: PostEdit.vue
     * Author: Yusuf Erdal
     * AuthorUrl : https://github.com/erdalonline
     * Date: 21.08.2020
     * Time: 17:56 
-->
<template>
    <b-form @submit.prevent="formSubmit">
        <b-row>
            <b-col sm="9">
                <b-form-group>
                    <b-form-group>
                        <b-form-input
                                placeholder="Başlığı Düzenle"
                                v-model="post.title"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-input-group size="sm">
                        <template v-slot:prepend>
                            <b-input-group-text>Kalıcı Bağlantı :</b-input-group-text>
                        </template>
                        <b-form-input
                                placeholder="Kalıcı bağlantı"
                                v-model="post.slug"
                                disabled
                                size="sm"
                                class="disabled-slug"
                        ></b-form-input>
                    </b-input-group>

                </b-form-group>
                <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
                <b-form-group
                        class="mt-2"
                        label="Seo Ayarları"
                        label-size="lg"

                >
                    <b-form-group
                            label="Seo Başlığı">
                        <b-form-input v-model="post.meta_title"></b-form-input>
                    </b-form-group>
                    <b-form-group
                            label="Seo Açıklaması">
                        <b-form-textarea v-model="post.meta_description"></b-form-textarea>
                    </b-form-group>
                </b-form-group>

            </b-col>
            <b-col sm="3">
                <b-card header="Yayımla">
                    <b-form-group label="Durum">
                        <b-form-select
                                v-model="postStatusSelected"
                                :options="postStatusSelectOption"
                                size="sm"
                        ></b-form-select>
                    </b-form-group>
                    <b-card-text>İçerik Dili:
                        <strong>{{ User.languages[selectLanguage]}}</strong>
                    </b-card-text>
                    <template v-slot:footer>
                        <b-button type="submit" size="sm" class="float-right" variant="success">Güncelle</b-button>
                    </template>
                </b-card>
                <b-card header="Öne çıkan görsel" class="mt-3">
                    <b-form-file
                            accept="image/*"
                            @change="uploadFeaturedImage($event)"
                            placeholder="Bir görsel seçebilirsiniz.."
                            browse-text="Resim Seç"
                            drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="text-center pt-2" v-show="featuredImageUploading">
                        <b-spinner variant="primary"></b-spinner>
                    </div>
                    <img :src="featuredImage" v-show="featuredImage" class="img-fluid pt-2">
                </b-card>
                <b-card header="Foto Galeri" class="mt-3">
                    <b-form-select v-model="gallery" :options="galleryOptions"></b-form-select>
                </b-card>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
    // Basic Use - Covers most scenarios
    import settings from '@/settings'
    import store from "../../store/store";
    import axios from 'axios'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "PostEdit",
        props: ['postType', 'createdRewriteRoute'],
        data() {
            return {
                visible: true,
                editorData: '<p>Bir şeyler yazın.</p>',
                featuredImage: '',
                featuredImageUploading: false,
                post: {
                    title: '',
                    slug: '',
                    meta_title: '',
                    meta_description: '',
                    parent_id: null
                },
                selectLanguage: '',
                translateLanguages: [],
                gallery:null,
                galleryOptions: null,
                editorConfig: {
                    // The configuration of the editor.
                    autoParagraph: false,
                    entities_latin: false,
                    allowedContent : true,
                    // extraAllowedContent  : 'x-slot x-widgets(*)',
                    filebrowserImageUploadUrl: settings.API_URL + 'upload/ckeditor/',
                    fileTools_requestHeaders: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': 'Bearer ' + store.getters["User/getToken"]
                    },
                    resourceTypes: {
                        'maxSize': '8MB',
                        'allowedExtensions': 'gif,jpg,pdf,png'
                    }
                },
                postStatusSelectOption: [
                    {
                        value: 'public', 'text': 'Yayında'
                    },
                    {
                        value: 'draft', 'text': 'Taslak'
                    }
                ],
                postStatusSelected: 'public'
            }
        },
        computed: {
            ...mapGetters({
                User: 'User/getUser',
                EditPost: 'Posts/editPost'
            }),
            editPostId() {
                return this.$route.params.id
            },
            contentPost() {
                return {
                    title: this.post.title,
                    slug: this.post.slug,
                    content: this.editorData,
                    meta_description: this.post.meta_description,
                    meta_title: this.post.meta_title,
                    lang: this.selectLanguage,
                    status: this.postStatusSelected,
                    type: this.postType,
                    featured_image: this.featuredImage,
                    parent_id: this.post.parent_id,
                    gallery: this.gallery
                }
            }

        },
        methods: {
            ...mapActions({
                getEditPost: 'Posts/getEditPost',
                setEditPost: 'Posts/setEditPost',
                getGalleryOptions: 'Posts/getGallery',
            }),
            uploadFeaturedImage(event) {
                this.featuredImage = ''
                let data = new FormData();
                data.append('upload', event.target.files[0]);
                this.featuredImageUploading = true
                axios({
                    url: settings.API_URL + 'upload/ckeditor/',
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + store.getters["User/getToken"]
                    },
                    data: data
                })
                    .then((result) => {
                        this.featuredImageUploading = false
                        this.featuredImage = result.data.url
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },

            /**
             * formu gönder
             */
            formSubmit() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                });
                this.setEditPost({id: this.editPostId, data: this.contentPost} ).then(() => {
                    // console.log(response.data)
                    loader.hide()
                    this.$router.push({name: this.createdRewriteRoute})
                }).catch(error => {
                    console.log(error.data)
                })
            }
        },

        created() {
            let loader = this.$loading.show({
                // Optional parameters
                // container: false,
                canCancel: false,
            });
            this.getEditPost(this.editPostId).then(() => {
                this.post.title = this.EditPost.title
                this.post.slug = this.EditPost.slug
                this.editorData = this.EditPost.content
                this.post.meta_description = this.EditPost.meta_description
                this.post.meta_title = this.EditPost.meta_title
                this.selectLanguage = this.EditPost.lang
                this.postStatusSelected = this.EditPost.status
                this.type = this.EditPost.type
                this.featuredImage = this.EditPost.featured_image
                this.post.parent_id = this.EditPost.parent_id
                this.gallery = this.EditPost.gallery
                this.getGalleryOptions({
                    lang:  this.EditPost.lang
                }).then(response => {
                    this.galleryOptions = response.data
                })
                loader.hide()
            })
        }
    }
</script>

<style>
    .disabled-slug {
        background: none !important;
        border: none;
    }

    .ck-content {
        height: 300px;
    }
</style>