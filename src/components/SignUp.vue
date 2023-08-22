<template>
<br>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 class="text-center">Sign Up</h3>
        <div class="form-group">
            <label for="txtName">Name: <span class="text-danger">*</span></label>
            <input type="text" id="txtName" class="form-control" required v-model="txtName" placeholder="Enter Name">
        </div>
        <div class="form-group">
            <label for="txtEmail">Email: <span class="text-danger">*</span></label>
            <input type="email" id="txtEmail" class="form-control" required v-model="txtEmail" placeholder="Enter Email">
        </div>
        <div class="form-group">
            <label for="txtPassword">Password: <span class="text-danger">*</span></label>
            <input type="password" id="txtPassword" class="form-control" required v-model="txtPassword" placeholder="Enter Password">
        </div>
        <div class="form-group">
            <label for="txtConfirmPassword">Confirm Password: <span class="text-danger">*</span></label>
            <input type="password" id="txtConfirmPassword" class="form-control" required v-model="txtConfirmPassword" placeholder="Confirm above Password">
        </div>
        <br>
        <button @click="handleSubmit" class="btn btn-warning btn-sm float-end"><i class="fa fa-paper-plane"></i> Submit</button>
    </div>
</div>
<Home/>
</template>

<script>
import axios from 'axios'
import Home from '@/components/Home.vue'

export default {
    components:{
        Home
    },
    data(){
        return{
            txtName: '',
            txtEmail: '',
            txtPassword: '',
            txtConfirmPassword: '',
        }
    },
    methods:{
        async handleSubmit(){
            const data = {
                txtName: this.txtName,
                txtEmail: this.txtEmail,
                txtPassword: this.txtPassword,
                txtConfPassword: this.txtConfirmPassword,
            }

            axios.post('Register', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                        position: 'top'
                        })
                        this.$router.push({ name: 'sign_in'})
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
        }
    }
}
</script>

<style>

</style>