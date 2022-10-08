<template>
   <div>
       <div v-if="menu['hasComponent'] && menu['child'].length===0">
           <b-nav-text tag="li" :class="{active:this.$route.path===menu['component']}">
               <router-link :to="menu['component']===null?'':menu['component']">
                   <i class="icon icon-tint"></i><span>{{menu['menuName']}}</span>
               </router-link>
           </b-nav-text>
       </div>
       <div v-else-if="!menu['hasComponent'] && menu['child'].length>0">
           <b-nav-text tag="li" class="submenu">

               <a href="#"><i class="icon icon-inbox"></i><span>{{menu['menuName']}}</span></a>

               <b-nav vertical>
                   <SecondMenu :menu="item" v-for="item in menu['child']" :key="item.id"></SecondMenu>
               </b-nav>
           </b-nav-text>
       </div>
   </div>
</template>

<script>
    export default {
        name: "SecondMenu",
        props: {
            menu:Object
        },
        data(){
            return {

            }
        }
    }
</script>
