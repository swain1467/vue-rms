<template>
<br>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 class="text-center">Sign In</h3>
        <div class="form-group">
            <label for="txtEmail">Email: <span class="text-danger">*</span></label>
            <input type="email" id="txtEmail" class="form-control" required v-model="txtEmail" placeholder="Enter Email">
        </div>
        <div class="form-group">
            <label for="txtPassword">Password: <span class="text-danger">*</span></label>
            <input type="password" id="txtPassword" class="form-control" required v-model="txtPassword" placeholder="Enter Password">
        </div>
        <br>
        <button @click="handleSubmit" class="btn btn-warning btn-sm float-end"><i class="fa fa-paper-plane"></i> Submit</button>
        <br>
    </div>
</div>
<Home/>
</template>

<script>
import axios from 'axios'
import Home from '@/components/Home.vue'

export default {
  components: {
    Home
  },
     data(){
        return{
            txtEmail: '',
            txtPassword: '',
        }
    },
    methods:{
        async handleSubmit(){
            const data = {
                email: this.txtEmail,
                password: this.txtPassword,
            }

            axios.post('LogIn', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                        position: 'top'
                        })

                        localStorage.setItem('token', JSON.stringify(res.data.token.original.access_token));
                        localStorage.setItem('token_type', JSON.stringify(res.data.token.original.token_type));
                        localStorage.setItem('expires_in', JSON.stringify(res.data.token.original.expires_in));
                        localStorage.setItem('user_email', JSON.stringify(res.data.token.original.user_email));
                        localStorage.setItem('user_type', JSON.stringify(res.data.token.original.user_type));
                        localStorage.setItem('user_id', JSON.stringify(res.data.token.original.user_id));
                        localStorage.setItem('user_name', JSON.stringify(res.data.token.original.user_name));
                        
                        this.$router.push({ name: 'user_dashboard'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.error(res.data.message, {
                        position: 'top'
                        })
                    }
                    setTimeout(this.$toast.clear, 1000)
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        goToCP(){
            this.$router.push({ name: 'change_password'})
        }
    }
}
</script>

<style>

</style>