<script setup lang="ts">
import { ref } from "vue";

const emitValue = ref(false);
</script>
<template>
	<div>
		<input
			type="checkbox"
			name=""
			id=""
			@click="$emit('inline-emit', emitValue)"
			v-model="emitValue"
		/>
	</div>
</template>

<style scoped></style>
