<template>
  <div :id="SERVICEID" :class="SERVICEID">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '@/config.js'
import routes from '@/router/routes.js'

export default {
  data(){
    return {
      SERVICEID,
      SERVICENAME
    }
  }
}
</script>

