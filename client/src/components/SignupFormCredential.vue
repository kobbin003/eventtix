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
	// send the basic info to parent
	emit("credentialData", credentials.value);
	emit("nextStep");
};
</script>
<template>
	<div>
		<form class="flex flex-col gap-2">
			<!-- <label for="email">School Name </label> -->
			<input
				v-model="credentials.name"
				type="text"
				name="name"
				id="name"
				placeholder="School name"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<!-- <label for="email">Email</label> -->
			<input
				v-model="credentials.email"
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<!-- <label for="password">Password</label> -->
			<input
				v-model="credentials.password"
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<button type="button" @click="next" class="btn btn-md btn-info my-4">
				next
			</button>
		</form>
	</div>
</template>

<style scoped></style>
