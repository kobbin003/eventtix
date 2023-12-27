<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { useUserStore, type User } from "@/stores/user";
import { baseUrl } from "@/utils/constants";
import { onMounted, watchEffect } from "vue";

// !!fetch on mount current user profile and save it in pinia-store;
const { setUser, user } = useUserStore();
onMounted(async () => {
	const url = `${baseUrl}/profile`;
	const accessToken = localStorage.getItem("accessToken");
	const opts = {
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data, error } = await useFetch(url, opts);
	if (data) {
		const fetchedData = data as User;
		setUser(data);
	}
	console.log("user profile", data);
	console.log("user profile-error", error);
});
watchEffect(() => {
	console.log("user-watch", user);
});
</script>

<template>
	<EventsList />
</template>
