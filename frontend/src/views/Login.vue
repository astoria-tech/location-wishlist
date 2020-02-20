<template>
  <div class="d-flex flex-column align-items-center">
    <div>
      <h4 class='mv3'>{{login ? 'Admin Login' : 'Sign Up'}}</h4>
      <div class='d-flex flex-column mt-2 mb-2'>
        <input
          v-show="!login"
          v-model="name"
          type="text"
          placeholder="Your name">
        <input
          class="mb-1 border rounded px-1"
          v-model="email"
          type="text"
          placeholder="Email">
        <input
          class="border rounded px-1"
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
      <div>
        <div
          class='btn btn-outline-success'
          @click="confirm()">
          {{login ? 'Log In' : 'create account'}}
        </div>
        <div
          v-if="!login"
          class='pointer button'
          @click="login = !login">
          {{login ? 'need to create an account?' : 'already have an account?'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { SIGNIN_USER_MUTATION } from '../constants/graphql'
  import { onLogin } from '../vue-apollo';

  export default {
    name: 'AppLogin',
    data () {
      return {
        email: '',
        login: true,
        name: '',
        password: ''
      }
    },
    methods: {
      confirm () {
        const { email, password } = this.$data;

        if (this.login) {
          this.$apollo.mutate({
            mutation: SIGNIN_USER_MUTATION,
            variables: {
              login: email,
              password: password
            },
          }).then((result) => {
            const token = result.data.signIn.token
            onLogin(this.$apollo.provider.defaultClient, token)
            this.$router.push({path: '/obscurepath'})
          }).catch((error) => {
            alert(error)
          })
        }
      },
    }
  }
</script>