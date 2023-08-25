<template>
  <nav>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
// function refreshToekn(){
//       const token = JSON.parse(localStorage.getItem('token'))
//         const config = {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         };

//         const bodyParameters = {
//           key: "value"
//         };
//         axios.post( 
//           'auth/Refresh',
//           bodyParameters,
//           config
//         ).then(
//               res => {
//                 localStorage.setItem('token', JSON.stringify(res.data.token.original.access_token));
//                         localStorage.setItem('token_type', JSON.stringify(res.data.token.original.token_type));
//                         localStorage.setItem('expires_in', JSON.stringify(res.data.token.original.expires_in));
//                         localStorage.setItem('user_email', JSON.stringify(res.data.token.original.user_email));
//                         localStorage.setItem('user_type', JSON.stringify(res.data.token.original.user_type));
//                         localStorage.setItem('user_id', JSON.stringify(res.data.token.original.user_id));
//                         localStorage.setItem('user_name', JSON.stringify(res.data.token.original.user_name));
//               }
//         ).catch(
//               err => {
//                   console.log(err);
//               }
//         )
//     }
export default({
  mounted() {
    // setTimeout(refreshToekn, 4000)
  },
  methods:{
    
  }
})
</script>

<style>
 body {
  background: #aaa !important;
}
.container{
background: #aaa;
}

.text-white{
  color: #fff;
}
.action-btn {
    border-radius: 50% !important;
}

.card{
  margin-top: 5%;
  height: 120px;
  border-radius: 5% 5%;
  text-align: center;
}

a{
  text-decoration: none !important;
}
.card:hover {
    -ms-transform: scale(0.8);
    /* IE 9 */
    -webkit-transform: scale(0.8);
    /* Safari 3-8 */
    transform: scale(0.8);
    transition: 0.5s;
}
.form-group{
  margin-top: 1%;
}
label{
  color: #161515;
  font-weight: bold;
}
</style>
