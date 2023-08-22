<template>
<br>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 class="text-center">Change Password</h3>
        <div div v-if="showEmail">
            <div class="form-group">
                <label for="txtEmail">Email: <span class="text-danger">*</span></label>
                <input type="email" id="txtEmail" class="form-control" required v-model="txtEmail" autocomplete="off" placeholder="Enter Email">
            </div>
            <br>
            <button @click="sendOTP" class="btn btn-warning btn-sm float-end"><i class="fa fa-paper-plane"></i> Send OTP</button>
        </div>
        <div v-else>
            <div class="form-group">
                <label for="txtOTP">OTP: <span class="text-danger">*</span></label>
                <input type="text" id="txtOTP" class="form-control" required v-model="txtOTP" autocomplete="off" placeholder="Enter OTP">
            </div>
            <div class="form-group">
                <label for="txtPassword">Password: <span class="text-danger">*</span></label>
                <input type="password" id="txtPassword" class="form-control" required v-model="txtPassword" autocomplete="off" placeholder="Enter Password">
            </div>
            <div class="form-group">
                <label for="txtConfPassword">Confirm Password: <span class="text-danger">*</span></label>
                <input type="password" id="txtConfPassword" class="form-control" required v-model="txtConfPassword" autocomplete="off" placeholder="Enter Confirm Password">
            </div>
            <br>
            <button @click="handleSubmit" class="btn btn-success btn-sm float-end"><i class="fa fa-paper-plane"></i> Submit</button>
        </div>
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
            txtEmail: '',
            txtOTP: '',
            txtPassword: '',
            txtConfPassword: '',

            showEmail: true,
        }
    },
    methods:{
        sendOTP(){
            const data = {
                email: this.txtEmail
            }

            axios.post('SendOTP', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.showEmail= false
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else if(res.data.status == 'Failure'){
                        this.$toast.error(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.show(res.data.message, {
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

        async handleSubmit(){
            const data = {
                email: this.txtEmail,
                otp: this.txtOTP,
                password: this.txtPassword,
                confirm_password: this.txtConfPassword,
            }

            axios.post('Verify', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'sign_in'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else if(res.data.status == 'Failure'){
                        this.$toast.error(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.show(res.data.message, {
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