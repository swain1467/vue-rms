<template>
<Nav/>
<div class="row">
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-primary">
            <router-link :to="{name: 'find'}">
                <b class="text-white">
                    <i class = "fa fa-users"></i><br>
					<span class = "text-item">Active Users List</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-danger">
            <router-link :to="{name: 'find'}">
                <b class="text-white">
                    <i class = "fa fa-users"></i><br>
					<span class = "text-item">Black Listed Users List</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-success">
            <router-link :to="{name: 'find'}">
                <b class="text-white">
                    <i class = "fa fa-gear"></i><br>
					<span class = "text-item">Setup</span>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <div class="card bg-dark">
            <router-link :to="{name: 'find'}">
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
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
      this.user_id = JSON.parse(localStorage.getItem('user_id'))
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
    },

    methods:{
        
    }
}
</script>

<style scoped>
.card .fa {
    margin-top: 5%;
    font-size: 50px;
}
</style>