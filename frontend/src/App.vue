<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">Locations with Wishes</router-link>
      <span v-if="me"> | </span>
      <router-link v-if="me" to="/obscurepath">Admin</router-link>
      <span v-if="me"> | </span>
      <router-link v-if="me" to="">
        <span @click="logout()">Log Out</span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { ME_QUERY } from './constants/graphql'
import { onLogout } from './vue-apollo'


export default {
  data: () => ({
    me: null
  }),
  apollo: {
    me: ME_QUERY
  },
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient)
      this.$router.push("/")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.router-link-exact-active:last-of-type {
  color: #2c3e50;
}

.body {
  padding: 0 3rem;
  font-size: 1.15rem;
}
</style>
