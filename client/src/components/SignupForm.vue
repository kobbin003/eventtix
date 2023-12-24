<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import logoLightUrl from "@/assets/logo_light.png";

import SignupFormAddress from "./SignupFormAddress.vue";
import SignupFormPersonnel from "./SignupFormPersonnel.vue";
import type { CredentialType } from "@/components/SignupFormCredential.vue";
import SignupFormCredential from "@/components/SignupFormCredential.vue";
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import type { Address, Personnels } from "@/stores/user";
// const currentStep = ref("
const currentStep = ref(1);
const router = useRouter();

const formData = ref<{
	org: CredentialType | null;
	address: Address | null;
	personnels: Personnels | null;
}>({ org: null, address: null, personnels: null });

const updateCredential = (val: CredentialType) => {
	console.log("update credential");
	formData.value.org = val;
};
const updateAddress = (val: Address) => {
	console.log("update address");
	// transform pin string to number before request
	formData.value.address = { ...val, pin: Number(val.pin) };
};
const updatePersonnels = (val: Personnels) => {
	console.log("update personnel");
	formData.value.personnels = val;
	formSubmit();
};

// const triggerFormSubmit = computed(() => formData.value.personnels !== null);
// watch(triggerFormSubmit, () => {
// 	if (triggerFormSubmit.value) {
// 		formSubmit();
// 	}
// });
const handleStepIncrement = () => {
	currentStep.value += 1;
};
const handleStepDecrement = () => {
	currentStep.value -= 1;
};
const alertStore = useAlertStore();
const {
	setSuccessMsg,
	setErrorMsg,
	setErrorMsgArray,
	resetErrorMsg,
	setIsLoading,
} = alertStore;

const baseUrl = import.meta.env.VITE_BASE_URL;

const formSubmit = async () => {
	// console.log("formData", formData.value);
	const url = `${baseUrl}/auth/register`;
	const opts = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData.value),
	};

	try {
		const res = await fetch(url, opts);
		if (!res.ok) {
			const errorData = await res.json();
			console.log("errorData", errorData);
			const errMsg = errorData.error.msg;
			if (typeof errMsg == "string") {
				setErrorMsg(errMsg);
				throw new Error();
			} else {
				// errMsgs.map((msg) => setErrorMsg(msg));
				setErrorMsgArray(errMsg);
				throw new Error();
			}
		}
		const data = await res.json();
		if (data.account.id) {
			setSuccessMsg("Successfully registered!");
			setIsLoading(false);
			router.push({ path: "/login" });
		}
	} catch (error) {
	} finally {
		setIsLoading(false);
	}
};
</script>

<template>
	<div
		class="w-screen h-max flex items-center justify-center bg-signup bg-center"
	>
		<div class="bg-white border border-gray-100 shadow-lg">
			<div class="flex justify-center items-center">
				<RouterLink to="/">
					<img :src="logoLightUrl" alt="" class="scale-75" />
				</RouterLink>
			</div>
			<div class="flex flex-col gap-2 justify-center items-start py-7 px-9">
				<b class="text-lg">Create your account</b>
				<div>
					<!-- <form class="flex flex-col gap-2" @submit.prevent=""> -->
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
				</div>
				<!-- </form> -->

				<div class="flex">
					<p>Already have an account?</p>
					<RouterLink to="/login" class="text-primary mx-1">Login</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
