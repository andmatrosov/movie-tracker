<template lang="pug">
.content-wrapper
	section
		.container(v-auto-animate)
			h1.ui-title-1 Home
			.form-item(:class="{errorInput: v$.taskTitle.$error }")
				input(
					type="text"
					placeholder="What i will watch?"
					v-model="taskTitle"
					@keyup.enter="newTask"
					:class="{ error: v$.taskTitle.$error }"
					@change="v$.taskTitle.$touch()"
				)
				span.error-text(v-if="v$.taskTitle.required.$invalid ") {{ v$.taskTitle.required.$message }}
			textarea(
				type="text"
				v-model="taskDescription"
				@keyup.enter="newTask"
			)
			.option-list
				input.what-watch--radio(
					type="radio"
					id="radioFilm"
					value="Film"
					name="whatWatch"
					v-model="whatWatch"
				)
				label(
					for="radioFilm"
				) Film
				input.what-watch--radio(
					type="radio"
					id="radioSerial"
					value="Serial"
					name="whatWatch"
					v-model="whatWatch"
				)
				label(
					for="radioSerial"
				) Serial
			.total-time

				//Serial Time	
				.total-tiime__film(
					v-if="whatWatch === 'Film'"
				)
					span.time-title Hours
					input.time-input(
						type="number"
						v-model="filmHours"
					)
					span.time-title Minutes 
					input.time-input(
						type="number"
						v-model="filmMinutes"
					)

					p {{ filmTime }}

				//Serial Time	
				.total-tiime__serial(
					v-else
				)
					span.time-title How many seasons?
					input.time-input(
						type="number"
						v-model="serialSeasons"
					)
					span.time-title How many episodes? 
					input.time-input(
						type="number"
						v-model="serialEpisodes"
					)
					span.time-title How long is one episode? (minutes) 
					input.time-input(
						type="number"
						v-model="serialEpisodeDuration"
						min="0"
						max="60"
					)

					p {{ serialTime }}

			.tag-list.tag-list--add
				.ui-tag__wrapper(
					@click="tagMenuShow = !tagMenuShow"
				)
					.ui-tag
						span.tag-title Add tag
						span.button-close(
							:class="{active: !tagMenuShow}"
						)
			
			.tag-list.tag-list--menu(
				v-if="tagMenuShow"
			)
				input.tag-add--input(
					type="text"
					placeholder="New tag"
					v-model="tagTitle"
					@keyup.enter="newTag"
				)
				.button.button-default(
					@click="newTag"
				) Send

			.tag-list
				transition-group(
					enter-active-class="animated fadeInLeft"
					leave-active-class="animated fadeOutDown"
				)
					.ui-tag__wrapper(
						v-for="tag in tags"
						:key="tag.title"
					)
						.ui-tag(
							@click="addTagUsed(tag)"
							:class="{used: tag.used}"
						)
							span.tag-title {{ tag.title }}
							span.button-close
			.button.button--round.button-primary(
				@click="newTask"
			) Send
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
	setup () {
		return {v$: useVuelidate()}
	},
	data () {
		return {
			// Tags
			tagTitle: "",
			taskTitle: "",
			taskDescription: "",
			whatWatch: 'Film',
			taskId: 3,

			// Total time
			// Film
			filmHours: 1,
			filmMinutes: 30,
			// Serial
			serialSeasons: 1,
			serialEpisodes: 11,
			serialEpisodeDuration: 40,

			//Tags
			tagMenuShow: false,
			tagsUsed: [],
		}
	},
	methods: {
		newTag() {
			if(this.tagTitle === '') return
			
			const tag = {
				title: this.tagTitle,
				used: false
			}
			this.$store.dispatch('newTag', tag)
		},
		async newTask () {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid
				this.submitStatus = 'ERROR'
        return
      }
			let time;
			if (this.whatWatch === 'Film') {
				time = this.filmTime
			} else {
				time = this.serialTime
			}
			const task = {
				// id: this.taskId,
				title: this.taskTitle,
				description: this.taskDescription,
				whatWatch: this.whatWatch,
				time,
				tags: this.tagsUsed,
				completed: false,
				editing: false,
			}
			
			this.$store.dispatch('newTask', task)

			// this.taskId += 1
			this.taskTitle = ''
			this.taskDescription = ''
			this.tagUsed = []
			this.v$.$reset()
			for(let i = 0; i < this.tags.length; i++) {
				this.tags[i].used = false
			}
		},
		getHoursAndMinutes (minutes){
			let hours = Math.trunc(minutes / 60)
			let min = minutes % 60
			return hours + ' Hours ' + min + ' Minutes' 
		},
		addTagUsed(tag) {
			tag.used = !tag.used
			if(tag.used) {
				this.tagsUsed.push({title: tag.title})
			} else {
				this.tagsUsed
				.splice(this.tagsUsed.indexOf({title: tag.title}), 1)
			}
		}
	},
	computed: {
		filmTime () {
			let min = this.filmHours * 60 + this.filmMinutes
			return this.getHoursAndMinutes(min)
		},
		serialTime() {
			let min = this.serialSeasons * this.serialEpisodes * this.serialEpisodeDuration
			return this.getHoursAndMinutes(min)
		},
		tags() {
			return this.$store.getters.tags
		}		
	},
	validations() {
		return {
			taskTitle: {
				required
			},
		}
	}
}
</script>

<style lang="stylus" scoped>
.option-list
	display flex
	align-items center
	.what-watch--radio
		margin-right 12px
		margin-bottom 0
	label
		margin-right 20px
		margin-bottom 0
		&:last-child
			margin-right 0


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

.total-time
	margin-bottom 20px

.time-title
	display block
	margin-bottom 6px

.time-input
	max-width 80px
	margin-right 10px

.tag-list
	margin-bottom 20px

.ui-tag__wrapper
	position relative
	margin-right 18px
	margin-bottom 10px
	background-color #fff
	&:last-child
		margin-right 0

.ui-tag
	.button-close
		transform rotate(0deg)
		&.active 
			transform rotate(45deg)

	&.used
		background-color #444ce0
		color: #fff
		.button-close
			transform rotate(45deg)
			&::before
			&::after
				background-color #fff

.tag-list--menu
	display flex
	align-items center
	justify-content space-between

.tag-add--input
	margin-bottom 0
	margin-right 10px
	height 42px
</style>