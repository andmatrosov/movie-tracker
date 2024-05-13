<template lang="pug">
.content-wrapper
	section
		.container
			.auth
				.auth__banner
					img.banner(
						src="/banner.png"
					)
				.auth__form
					span.ui-title-2 Registration
					form(@submit.prevent="onSubmit")
						.form-item(:class="{errorInput: v$.email.$error }")
							input(
								type="email"
								placeholder="Email"
								v-model="email"
								:class="{ error: v$.email.$error }"
								@change="v$.email.$touch()"
							)
							span.error-text(v-if="v$.email.email.$invalid") {{ v$.email.email.$message }}
							span.error-text(v-if="v$.email.required.$invalid ") {{ v$.email.required.$message }}
						.form-item(:class="{errorInput: v$.password.$error }")
							input(
								type="password"
								placeholder="Password"
								v-model="password"
								:class="{error: v$.password.$error }"
								@change="v$.password.$touch()"
							)
							span.error-text(v-if="v$.password.minLength.$invalid") {{ v$.password.minLength.$message }}
							span.error-text(v-if="v$.password.required.$invalid ") {{ v$.password.required.$message }}
						.form-item(:class="{errorInput: v$.confirmPassword.$error }")
							input(
								type="password"
								placeholder="Confirm password"
								v-model="confirmPassword"
								:class="{error: v$.confirmPassword.$error }"
								@change="v$.confirmPassword.$touch()"
							)
							span.error-text(v-if="v$.confirmPassword.sameAsPassword.$invalid && confirmPassword.length") {{ v$.confirmPassword.sameAsPassword.$message }}
							span.error-text(v-if="v$.confirmPassword.required.$invalid") {{ v$.confirmPassword.required.$message }}
						.buttons-list
							button.button.button--round.button-primary(
								type="submit"
								:disabled="submitStatus === 'PENDING'"
							) Registration
						.buttons-list.buttons-list--info
							p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
							p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
							p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
						.buttons-list.buttons-list--info
							span Do you have an accont?
								router-link(to="/login")  Login
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'


export default {
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			email: '',
			password: '',
			confirmPassword: '',
			submitStatus: null
		}
	},
	methods: {
    async onSubmit () {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid
				this.submitStatus = 'ERROR'
        return
      }
			const user = {
				email: this.email,
				password: this.password
			}
			 this.submitStatus = 'PENDING'
			 setTimeout(() => {
          this.submitStatus = 'OK'
					console.log('user: ', user);
					this.resetForm()

        }, 500)
      // perform async actions
    },
		resetForm () {
			this.email = ''
			this.password = ''
			this.confirmPassword = ''
			this.v$.$reset()
		}
  },
	validations() {
		return {
			email: {
				required,
				email,
				lazy: true
			},
			password: {
				required,
				minLength: minLength(6),
			},
			confirmPassword: {
				required,
				sameAsPassword: sameAs(this.password)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.auth
	display flex
.auth__banner,
.auth__form
	width 50%

.form-item
	.error-text
		display none
		font-size 14px
		color #fc5c65
	&.errorInput
		.error-text
			display block
			margin-left 10px
			margin-bottom 5px

input
	&.error
		margin-bottom 5px
		border-color #fc5c65
		animation-duration .4s
		animation-name shake

.buttons-list
	text-align right
	margin-bottom 20px
	&.buttons-list--info
		text-align center
		&:last-child
			margin-bottom 0
	a
		color #444ce0
	
</style>