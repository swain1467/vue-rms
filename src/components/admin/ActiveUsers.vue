<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div v-if="txtName" class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtName">User's Name :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtName" id="txtName" placeholder="Enter Advance Amount" autocomplete="off"/>
            </div>
        </div>
        <div v-if="txtEmail" class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtEmail">User's Mail Address :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtEmail" id="txtEmail" placeholder="Enter Advance Amount" autocomplete="off"/>
            </div>
        </div>
        <div v-if="selUserType" class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selUserType">User's Type :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selUserType" v-model="selUserType">
                    <option value= ''>Select a property type</option>
                    <option value="USER">USER</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
        </div>
        <div v-if="txtName && txtEmail && selUserType" class="form-group">
            <br>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="buttion" @click="closeForm" class="btn btn-danger"><i class="fa fa-times fa-lg"></i> close</button>&ensp;
                <button type="buttion" @click="saveUserData" class="btn btn-dark pull-right"><i class="fa fa-pencil fa-lg"></i> Update</button>
            </div>
        </div>
        <br>
    </div>
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
                        <button class="btn btn-success btn-sm action-btn" @click="updateUser(data.id, data.name, data.email, data.user_type)"><i class="fa fa-edit"></i></button>
                        &nbsp;<button class="btn btn-warning btn-sm action-btn" @click="blackListUser(data.id)"><i class="fa fa-ban"></i></button>
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
        axios.get('auth/GetActiveUsersList',config)
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
        updateUser(id, name, email, user_type){
            this.id = id
            this.txtName = name
            this.txtEmail = email
            this.selUserType = user_type
        },
        saveUserData(){
            
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: this.id,
                name: this.txtName,
                email: this.txtEmail,
                user_type: this.selUserType
            };
            axios.post( 'auth/UpdateUserDetails',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        
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
                    this.id = ''
                    this.txtName = ''
                    this.txtEmail = ''
                    this.selUserType = ''
                    axios.get('auth/GetActiveUsersList',config)
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
        },
        blackListUser(id){
            let text = 'Are you sure to black list this user ?'
            if (confirm(text) == true) {
               
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: id,
            };
            axios.post( 'auth/BlackListUser',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'active_users'})
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
                    axios.get('auth/GetActiveUsersList',config)
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
                        this.$router.push({ name: 'active_users'})
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
                     axios.get('auth/GetActiveUsersList',config)
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