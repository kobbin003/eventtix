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

const next = () => {
	// send the basic info to parent
	emit("addressData", address.value);
	emit("nextStep");
};
</script>
<template>
	<!-- <form class="flex flex-col gap-2"> -->
	<label for="addressLine1">AddressLine1 </label>
	<input
		v-model="address.addressLine1"
		type="text"
		name="addressLine1"
		id="addressLine1"
		placeholder="addressLine1"
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
		class="input input-sm input-bordered rounded-sm bg-#d8d8da"
	/>
	<label for="pin">Pin</label>
	<input
		v-model="address.pin"
		type="text"
		name="pin"
		id="pin"
		placeholder="Pin"
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
		<button
			@click="next"
			type="button"
			class="btn btn-md rounded-sm btn-info my-4 self-end"
		>
			next
		</button>
	</div>
	<!-- </form> -->
</template>

<style scoped></style>
