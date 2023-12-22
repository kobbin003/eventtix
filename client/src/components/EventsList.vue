<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import image from "@/assets/zfm.jpeg";
</script>
<template>
	<div>
		<SearchForm />
		<ul class="py-2 md:py-4">
			<li v-for="item in [1, 2, 3]">
				<EventCard
					title="demo title"
					desc="demo description"
					:imgUrl="image"
					organiser="demo organise"
					location="demo location"
					:eventTime="new Date()"
					ticketType="free"
					:ticketPrice="20"
				/>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
