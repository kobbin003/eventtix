<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { useAlertStore } from "@/stores/alert";
import { useUserStore, type TAddress } from "@/stores/user";
import {
	baseUrl,
	updateAddress,
	setSuccessMsg,
	isLoading,
	user,
} from "@/utils/constants";
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from "vue";
// const { updateAddress } = useUserStore();
// const { setSuccessMsg } = useAlertStore();
// const { isLoading } = storeToRefs(useAlertStore());
const address = ref<TAddress>({
	addressLine1: "",
	addressLine2: "",
	state: "",
	pin: 0,
});
const props = defineProps({ closeModal: { type: Function, required: true } });
// const { user } = useUserStore();
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

const editAddressSubmit = async (e: Event) => {
	const url = `${baseUrl}/profile/address`;
	const accessToken = localStorage.getItem("accessToken");

	const opts = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			addressLine1: address.value.addressLine1,
			addressLine2: address.value.addressLine2,
			state: address.value.state,
			pin: Number(address.value.pin),
		}),
	};
	const { data, error } = await useFetch(url, opts);
	if (data) {
		// console.log("add-edit", data);
		//! update store after success edit
		updateAddress({
			addressLine1: data.address.addressLine1,
			addressLine2: data.address.addressLine2,
			state: data.address.state,
			pin: Number(data.address.pin),
		});

		//close the modal

		props.closeModal();
		setSuccessMsg("address updated!");
	}
	if (error) {
		console.log("add-edit-error", error);
	}
};

onMounted(() => {
	if (user.value.address) {
		// Object.assign(address.value, user.address);
		address.value = user.value.address;
	}
});
</script>
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
				v-model="address.pin"
				type="text"
				name="pin"
				id="pin"
				placeholder="Pin"
				required
				@input="validatePinInput"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>

			<button type="submit" class="btn btn-md btn-primary rounded-sm mt-2">
				<span
					v-if="isLoading"
					class="loading loading-spinner loading-sm"
				></span>
				<span v-else>submit</span>
			</button>
		</form>
	</div>
</template>

<style scoped></style>
