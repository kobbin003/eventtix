<template>
	<div>
		<div class="dropdown dropdown-end">
			<div
				tabindex="0"
				role="button"
				class="btn btn-sm rounded-sm m-1 border border-white font-normal"
			>
				account
			</div>
			<ul
				tabindex="0"
				class="dropdown-content z-[1] menu shadow bg-base-100 w-max rounded-sm border border-gray-100/5"
			>
				<li>
					<RouterLink
						to="/user/profile/events"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">your events</span></RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/user/profile"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">Profile</span></RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/user/profile/payment"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">Payment</span></RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="" @click="removeAuth">Logout</span></RouterLink
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
const removeAuth = () => {
	// trial
	localStorage.removeItem("accessToken");

	// user store, gets stored on persist
	localStorage.removeItem("user");
};
</script>

<style scoped></style>
