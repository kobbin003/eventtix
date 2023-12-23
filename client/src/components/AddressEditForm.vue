<template>
	<div
		class="flex flex-col gap-2 justify-center items-start bg-white border border-gray-100 shadow-lg py-7 px-9 rounded-sm"
	>
		<b class="text-lg">Edit your address</b>
		<form
			action=""
			class="form-control gap-2"
			@submit.prevent="editAddressSubmit"
		>
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
				type="text"
				name="pin"
				id="pin"
				placeholder="Pin"
				required
				:value="address.pin"
				@input="validatePinInput"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<input
				type="submit"
				value="Done"
				class="btn btn-sm btn-primary rounded-sm mt-2"
			/>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

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

const editAddressSubmit = (e: Event) => {};
</script>

<style scoped></style>
