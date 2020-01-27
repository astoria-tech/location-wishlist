<template>
  <div>
    <h4 class='mv3'>{{login ? 'Login' : 'Sign Up'}}</h4>
    <div class='flex flex-column'>
      <input
        v-show="!login"
        v-model="name"
        type="text"
        placeholder="Your name">
      <input
        v-model="email"
        type="text"
        placeholder="Your email address">
      <input
        v-model="password"
        type="password"
        placeholder="Password">
    </div>
    <div class='flex mt3'>
      <div
        class='pointer mr2 button'
        @click="confirm()">
        {{login ? 'login' : 'create account'}}
      </div>
      <div
        class='pointer button'
        @click="login = !login">
        {{login ? 'need to create an account?' : 'already have an account?'}}
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
            // console.log(result)
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