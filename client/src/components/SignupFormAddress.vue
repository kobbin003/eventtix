<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["addressData", "prevStep", "nextStep"]);

export type Address = {
	addressLine1: String;
	addressLine2: String;
	city: String;
	state: String;
	pin: String;
};

const address = ref<Address>({
	addressLine1: "",
	addressLine2: "",
	city: "",
	state: "",
	pin: "",
});
const validatePinInput = (e: Event) => {
	// !! move this to submit event instead of change event.
	const input = e.target as HTMLInputElement;
	const inputPattern = /^\d+$/;

	const isValidInput = inputPattern.test(input.value);
	if (!isValidInput) {
		input.setCustomValidity("please enter digits only");
	} else {
		input.setCustomValidity("");
	}
};
const next = () => {
	// send the basic info to parent
	emit("addressData", address.value);
	emit("nextStep");
};
</script>
<template>
	<form class="flex flex-col gap-2" @submit.prevent="next">
		<label for="addressLine1">AddressLine1 </label>
		<input
			v-model="address.addressLine1"
			type="text"
			name="addressLine1"
			id="addressLine1"
			placeholder="addressLine1"
			required
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<label for="addressLine2">AddressLine2 </label>
		<input
			v-model="address.addressLine2"
			type="text"
			name="addressLine2"
			id="addressLine2"
			placeholder="addressLine2"
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<label for="state">State</label>
		<input
			v-model="address.state"
			type="text"
			name="state"
			id="state"
			placeholder="State"
			required
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<label for="pin">Pin</label>
		<input
			v-model="address.pin"
			type="text"
			name="pin"
			id="pin"
			placeholder="Pin"
			required
			@input="validatePinInput"
			class="input input-sm input-bordered rounded-sm bg-#d8d8da"
		/>
		<div class="flex justify-between py-2">
			<button
				@click="$emit('prevStep')"
				type="button"
				class="btn btn-md rounded-sm btn-info my-4 self-end"
			>
				prev
			</button>
			<!-- <button
				@click="next"
				type="button"
				class="btn btn-md rounded-sm btn-info my-4 self-end"
			>
				next
			</button> -->
			<input
				type="submit"
				value="next"
				class="btn btn-md rounded-sm btn-info my-4 self-end"
			/>
		</div>
	</form>
</template>

<style scoped></style>
