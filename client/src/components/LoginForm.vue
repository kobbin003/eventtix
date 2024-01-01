<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import logoLightUrl from "@/assets/logo_light.png";
import { isAuthenticated } from "@/router";
import { useUserStore, type User } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";

const { setUser, updatePayment } = useUserStore();

const {
	setSuccessMsg,
	setErrorMsgArray,
	setErrorMsg,
	setIsLoading,
	resetErrorMsg,
} = useAlertStore();
const { isLoading } = storeToRefs(useAlertStore());
const router = useRouter();

const email = ref("");
const password = ref("");

const baseUrl = import.meta.env.VITE_BASE_URL;

const submit = async () => {
	// console.log("loggin");
	setSuccessMsg("");
	resetErrorMsg();
	const url = `${baseUrl}/auth/login`;
	setIsLoading(true);
	const opts = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email.value,
			password: password.value,
		}),
	};

	try {
		const res = await fetch(url, opts);
		if (!res.ok) {
			const errorData = await res.json();

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
		// console.log("login-data", data);
		const { accessToken, id, name, email, payment, address, personnels } =
			data as User;
		// console.log("login", accessToken, payment);
		if (accessToken) {
			localStorage.setItem("accessToken", accessToken);
			setSuccessMsg("logged in!");
			setUser({
				accessToken,
				id,
				name,
				email,
				address,
				personnels,
			});
		}
		if (payment) {
			updatePayment({
				connectedAccId: payment.connectedAccId,
				detailsSubmitted: payment.detailsSubmitted,
			});
		}
		setIsLoading(false);
		if (isAuthenticated()) {
			router.push({ path: "/user" });
		}
	} catch (error) {
		setErrorMsg("could not login. retry!");
	} finally {
		setIsLoading(false);
	}
};
</script>

<template>
	<div
		class="w-screen min-h-screen flex items-center justify-center bg-signup bg-center"
	>
		<div class="bg-white border border-gray-100 shadow-lg">
			<div class="flex justify-center items-center">
				<RouterLink to="/">
					<img :src="logoLightUrl" alt="" class="scale-75" />
				</RouterLink>
			</div>

			<div class="flex flex-col gap-2 justify-center items-start py-7 px-9">
				<b class="text-lg">Log in to your account</b>
				<form class="flex flex-col gap-2" @submit.prevent="submit">
					<label for="email">Email</label>
					<input
						v-model="email"
						type="email"
						name="email"
						id="email"
						required
						class="input input-sm input-bordered rounded-sm bg-#d8d8da"
					/>
					<label for="password">Password</label>
					<input
						v-model="password"
						type="password"
						name="password"
						id="password"
						required
						class="input input-sm input-bordered rounded-sm bg-#d8d8da"
					/>
					<button type="submit" class="btn btn-md btn-info my-5 rounded-sm">
						<span v-if="isLoading" class="loading loading-spinner"></span>
						<span v-else>Login</span>
					</button>
				</form>
				<div class="flex">
					<p>Dont' have an account?</p>
					<RouterLink to="/signup" class="text-primary mx-1">signup</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
