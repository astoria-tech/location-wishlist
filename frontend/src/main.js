import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  link: createUploadLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  apolloProvider,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
