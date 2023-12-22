<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import logoLightUrl from "@/assets/logo_light.png";

import SignupFormAddress from "./SignupFormAddress.vue";
import SignupFormPersonnel from "./SignupFormPersonnel.vue";
import type { CredentialType } from "@/components/SignupFormCredential.vue";
import SignupFormCredential from "@/components/SignupFormCredential.vue";
// const currentStep = ref("
const currentStep = ref(1);

const formData = ref({ org: {}, address: {}, personnel: {} });

const updateCredential = (val: CredentialType) => {
	formData.value.org = val;
};
const updateAddress = (val: any) => {
	formData.value.address = val;
};
const updatePersonnels = (val: any) => {
	formData.value.personnel = val;
	formSubmit();
};

const handleStepIncrement = () => {
	currentStep.value += 1;
};
const handleStepDecrement = () => {
	currentStep.value -= 1;
};

const formSubmit = () => {
	console.log("formData", formData.value);
};
</script>

<template>
	<div class="flex justify-center items-center">
		<RouterLink to="/">
			<img :src="logoLightUrl" alt="" class="scale-75" />
		</RouterLink>
	</div>
	<div
		class="flex flex-col gap-2 justify-center items-start bg-white border border-gray-100 shadow-lg py-7 px-9"
	>
		<b class="text-lg">Create your account</b>
		<form class="flex flex-col gap-2" @submit.prevent="">
			<SignupFormCredential
				@credential-data="updateCredential"
				@next-step="handleStepIncrement"
				v-if="currentStep === 1"
			/>
			<SignupFormAddress
				@address-data="updateAddress"
				@prev-step="handleStepDecrement"
				@next-step="handleStepIncrement"
				v-if="currentStep === 2"
			/>
			<SignupFormPersonnel
				@personnel-data="updatePersonnels"
				@prev-step="handleStepDecrement"
				@submit-form="formSubmit"
				v-if="currentStep === 3"
			/>
		</form>

		<div class="flex">
			<p>Already have an account?</p>
			<RouterLink to="/login" class="text-primary mx-1">Login</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>
