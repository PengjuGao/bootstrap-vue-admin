<template>
  <b-nav-text tag="li" :class="{active:this.$route.path===menu['redictPath']}"
              v-if="menu != null && menu['child'].length===0 && menu['redictPath']">
    <router-link :to="menu['redictPath']===null?'':menu['redictPath']">
      <i :class="menu['icon']"></i><span>{{ menu['menuName'] }}</span>
    </router-link>
  </b-nav-text>
  <b-nav-item v-else-if="menu != null && menu['child'].length===0 && !menu['redictPath']">
    <i :class="menu['icon']"></i><span>{{ menu['menuName'] }}</span>
  </b-nav-item>
  <b-nav-text tag="li" class="submenu" v-else-if="menu !=null && menu['child'].length>0">

    <a href="#"><i :class="menu['icon']"></i><span>{{ menu['menuName'] }}</span></a>
    <b-nav vertical>
      <SecondMenu :menu="item" v-for="item in menu['child']" :key="item.id">
      </SecondMenu>
    </b-nav>
  </b-nav-text>
</template>

<script>
export default {
  name: "SecondMenu",
  props: {
    menu: Object
  },
  data() {
    return {
      hello: []
    }
  }
}
</script>
