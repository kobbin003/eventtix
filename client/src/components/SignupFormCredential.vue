<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["credentialData", "nextStep"]);

export type CredentialType = {
	name: String;
	email: String;
	password: String;
};

const credentials = ref<CredentialType>({
	name: "",
	email: "",
	password: "",
});

const next = () => {
	emit("credentialData", credentials.value);
	emit("nextStep");
};
const validateNameLength = (e: Event) => {
	// !! move this to submit event instead of change event.
	const input = e.target as HTMLInputElement;
	// const inputPattern = /^\d+$/;

	const isValidInput = input.value.length >= 5;
	console.log("val", input.value);
	if (!isValidInput) {
		input.setCustomValidity("school name should have atleast 5 characters");
	} else {
		input.setCustomValidity("");
	}
};
</script>

<template>
	<form class="flex flex-col gap-2" @submit.prevent="next">
		<label for="email">School Name </label>
		<input
			@click="validateNameLength"
			v-model="credentials.name"
			type="text"
			name="name"
			id="name"
			minlength="5"
			placeholder="School name"
			required
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<label for="email">Email</label>
		<input
			v-model="credentials.email"
			type="email"
			name="email"
			id="email"
			placeholder="Email"
			required
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<label for="password">Password</label>
		<input
			v-model="credentials.password"
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			required
			minlength="6"
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>

		<input
			type="submit"
			value="next"
			class="btn btn-md rounded-sm btn-info my-4 self-end"
		/>
	</form>
</template>

<style scoped></style>
