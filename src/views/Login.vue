<template>
    <div class="container-fluid">
        <div class="text-center">
            <div class="lds-ring-container" v-if="loading">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <form class="form-signin login-form" @submit.prevent="submit">
                <b-alert :variant="error.type" :show="isError">
                    {{ error.message }}
                </b-alert>
                <h1 class="h3 mb-3 font-weight-normal">Giriş Yap</h1>
                <label for="inputUsername" class="sr-only">Email</label>
                <input type="email" v-model="email" id="inputUsername" class="form-control" placeholder="Kullanıcı Adı"
                       required autofocus>
                <label for="inputPassword" class="sr-only">Şifre</label>

                <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Şifre"
                       required>
                <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="loading">Giriş</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2018-2020</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                email: null,
                password: null,
                isError: false,
                error: {
                    type: 'danger',
                    message: 'Bir hata oluştu. Daha sonra tekrar deneyin.'
                }
            }
        },
        methods: {
            submit() {
                this.isError = false // form yeniden gönderildiğinde hata mesajlarını gizle
                this.loading = true
                const userInfo = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('User/login', userInfo).then(response => {
                    this.isError = true
                    this.error = {
                        type: response.data.type,
                        message: response.data.message
                    }
                    // eslint-disable-next-line no-unused-vars
                    this.$store.dispatch('User/getUser').then(response => {
                        this.loading = false
                        this.$router.push('/')
                    }).catch(error => {
                        this.isError = true
                        this.error = {
                            type: error.data.type,
                            message: error.data.message
                        }
                    })
                }).catch(error => {
                        this.isError = true // Hataları göster
                        this.loading = false // loading gizle
                        this.password = null // password alanı boşalt
                        this.error = {  // hataları al
                            type: error.response.data.type,
                            message: error.response.data.message
                        }

                    }
                )


            }
        },
        mounted() {
            this.$loading.hide()
        }
    }
</script>

<style scoped>

    .container-fluid {
        margin: 0 !important;
        padding-top: 50px;
    }

    .text-center {
        padding-top: 80px;
        padding-bottom: 40px;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
