<template>
<Nav/>
<div class="row">
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-primary">
            <router-link :to="{name: 'active_users'}">
                <b class="text-white">
                    <i class = "fa fa-users"></i><br>
					<span class = "text-item">Active Users List</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-danger">
            <router-link :to="{name: 'black_listed_users'}">
                <b class="text-white">
                    <i class = "fa fa-users"></i><br>
					<span class = "text-item">Black Listed Users List</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-success">
            <router-link :to="{name: 'setup'}">
                <b class="text-white">
                    <i class = "fa fa-gear"></i><br>
					<span class = "text-item">Setup</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-dark">
            <router-link :to="{name: 'transition'}">
                <b class="text-white">
                    <i class = "fa fa-tasks"></i><br>
					<span class = "text-item">Trannsition</span>
                </b>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import isAdmin from '../../composables/isAdmin.js'

export default {
    components:{
        Nav
    },
    data(){
        return{
            user_name:'',
            user_type:'',
            user_id:'',

            showEmail: true,
        }
    },

    mounted() { 
        if(isAdmin() == 0){
            this.$router.push({ name: 'sign_in'})
        }
    },
}
</script>

<style scoped>
.card .fa {
    margin-top: 5%;
    font-size: 50px;
}
</style>