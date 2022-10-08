<template>
  <div id="admin-sidebar">
    <div class="mobile-phone">
      <a href="#">
        <i class="icon icon-th"></i>&nbsp;<span>{{ this.$route.path }}</span>
      </a>
      <div class="mobile-message">
        <b-badge variant="primary"
          ><i class="icon icon-envelope"></i>&nbsp;5</b-badge
        >
      </div>
    </div>

    <div class="mini-menu">
      <a href="#">&nbsp;</a>
    </div>

    <b-nav vertical id="admin-sidebar-menu">
      <SecondMenu :menu="menuList"></SecondMenu>
    </b-nav>
  </div>
</template>

<script>
import { sidebarMenuFeatures } from "../../assets/admin/js/sidebar";
import SecondMenu from "@/admin/layout/SecondMenu";

export default {
  components: {SecondMenu},
  data() {
    return {
      menuList:[]
    };
  },
  created() {
    this.showMenu()
  },
  methods: {
    showMenu:function(){
      const token = window.localStorage.getItem("customerInfo");
      this.$http.post("/api/tbMenu/getMenuList",{},{
        header:{
          "token":token
        }
      }).then(res=>{
        this.menuList = res.data[0]
      })
    }
  },
  mounted() {
    sidebarMenuFeatures();
  }
};
</script>
