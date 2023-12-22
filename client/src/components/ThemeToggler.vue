<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import darkIconUrlBlack from "@/assets/dark_black.svg";
import darkIconUrlWhite from "@/assets/dark_white.svg";
import lightIconUrlBlack from "@/assets/light_black.svg";
import lightIconUrlWhite from "@/assets/light_white.svg";

const darken = ref(false);

const emit = defineEmits(["trackDarken"]);

// change theme
watchEffect(() => {
	if (darken.value) {
		document.querySelector("html")?.setAttribute("data-theme", "mytheme-dark");
	} else {
		document.querySelector("html")?.setAttribute("data-theme", "mytheme-light");
	}
});

// emit darken value on change
// watchEffect(() => {
// 	emit("trackDarken", darken.value);
// });

//* OR

watch(darken, (newValue) => {
	emit("trackDarken", newValue);
	// console.log("new value:", newValue);
});
</script>

<template>
	<div class="flex gap-1 justify-end items-center scale-75 md:scale-90 flex-1">
		<img
			:src="darken ? lightIconUrlWhite : lightIconUrlBlack"
			alt="light"
			srcset=""
			height="20"
			width="20"
		/>
		<input
			type="checkbox"
			class="toggle h-4 w-10"
			:class="{
				[` [--tglbg:black] bg-white hover:bg-white  border-white`]: darken,
				[` [--tglbg:white] bg-black hover:bg-black border-black`]: !darken,
			}"
			v-model="darken"
		/>
		<img
			:src="darken ? darkIconUrlWhite : darkIconUrlBlack"
			alt="dark"
			srcset=""
			height="20"
			width="20"
		/>
	</div>
</template>

<style scoped></style>
