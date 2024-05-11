<template lang="pug">
.content-wrapper
	section
		.container
			h1.ui-title-1 Home
			input(
				type="text"
				placeholder="What i will watch?"
				v-model="taskTitle"
				@keyup.enter="newTask"
			)
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
			p.tag-used {{ tagsUsed.join(', ') }}
			.button.button--round.button-primary(
				@click="newTask"
			) Send
</template>

<script>
export default {
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
			tags: [
				{
					title: "Comedy",
					used: false
				},
				{
					title: "Westerns",
					used: false
				},
				{
					title: "Adventure",
					used: false
				},
			],
		}
	},
	methods: {
		newTag() {
			if(this.tagTitle === '') return
			this.tags.push({
				title: this.tagTitle,
				used: false
			})
			// const tag ={
			// 	title: this.tagTitle
			// }
		},
		newTask () {
			if(this.taskTitle === '') return
			let time;
			if (this.whatWatch === 'Film') {
				time = this.filmTime
			} else {
				time = this.serialTime
			}
			const task = {
				id: this.taskId,
				title: this.taskTitle,
				description: this.taskDescription,
				whatWatch: this.whatWatch,
				time,
				tags: this.tags,
				completed: false,
				editing: false
			}
			console.log(task);
			

			this.taskId += 1
			this.taskTitle = ''
			this.taskDescription = ''
		},
		getHoursAndMinutes (minutes){
			let hours = Math.trunc(minutes / 60)
			let min = minutes % 60
			return hours + ' Hours ' + min + ' Minutes' 
		},
		addTagUsed(tag) {
			tag.used = !tag.used
			if(tag.used) {
				this.tagsUsed.push(tag.title)
			} else {
				this.tagsUsed.splice(this.tagsUsed.indexOf(tag.title), 1)
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
	margin-right 18px
	margin-bottom 10px
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