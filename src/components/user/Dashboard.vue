<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    </div>
</div>
</template>

<script>
import axios from 'axios'
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

<style>

</style>