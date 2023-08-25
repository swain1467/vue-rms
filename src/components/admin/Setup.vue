<template>
<Nav/>
<div class="row">

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

<style>
</style>