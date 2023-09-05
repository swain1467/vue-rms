<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th class="text-center text-white bg-primary">Sl No</th>
                    <th class="text-center text-white bg-primary">User's Name</th>
                    <th class="text-center text-white bg-primary">User's Mail Address</th>
                    <th class="text-center text-white bg-primary">Type</th>
                    <th class="text-center text-white bg-primary">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='data in usersList' :key='data.id'>
                    <td style="width:10%;" class="text-center">{{data.sl_no}}</td>
                    <td style="width:25%;" class="text-left">{{data.name}}</td>
                    <td style="width:35%;" class="text-left">{{data.email}}</td>
                    <td style="width:10%;" class="text-center">{{data.user_type}}</td>
                    <td style="width:20%;" class="text-center">
                        <button class="btn btn-success btn-sm action-btn" @click="whiteListUser(data.id)"><i class="fa fa-check"></i></button>
                        &nbsp;<button class="btn btn-danger btn-sm action-btn" @click="deleteUser(data.id)"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import isAdmin from '../../composables/isAdmin.js'
import axios from 'axios'

export default {
    components:{
        Nav
    },
    data(){
        return{
            token:'',
            usersList:'',
            id:'',
            txtName:'',
            txtEmail:'',
            selUserType:''

        }
    },

    mounted() { 
        if(isAdmin() == 0){
            this.$router.push({ name: 'sign_in'})
        }

        this.token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get('auth/GetBlackListUsersList',config)
        .then(
            res => {
                this.usersList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    },

    methods:{
        closeForm(){
            this.id = ''
            this.txtName = ''
            this.txtEmail = ''
            this.selUserType = ''
        },
        whiteListUser(id){
            let text = 'Are you sure to white list this user ?'
            if (confirm(text) == true) {
               
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: id,
            };
            axios.post( 'auth/WhiteListUser',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'black_listed_users'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.warning('Sorry something went wrong', {
                            position: 'top'
                        })
                    }
                    setTimeout(this.$toast.clear, 1000)
                    axios.get('auth/GetBlackListUsersList',config)
                        .then(
                            res => {
                                this.usersList = res.data.aaData
                            }
                        ).catch(
                            err => {
                                console.log(err);
                            }
                        );
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                ); 
            }
        },

        deleteUser(id){
            let text = 'Are you sure to delete ?'
            if (confirm(text) == true) {
               
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: id,
            };
            axios.post( 'auth/DeleteUser',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'black_listed_users'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.warning('Sorry something went wrong', {
                            position: 'top'
                        })
                    }
                    setTimeout(this.$toast.clear, 1000)
                     axios.get('auth/GetBlackListUsersList',config)
                        .then(
                            res => {
                                this.usersList = res.data.aaData
                            }
                        ).catch(
                            err => {
                                console.log(err);
                            }
                        );
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                ); 
            }
        }
    }
}
</script>

<style>
</style>