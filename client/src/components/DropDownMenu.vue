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
						to="/user/dashboard/events"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">your events</span></RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/user/dashboard"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">Profile</span></RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/login"
						class="rounded-sm bg-transparent shadow-none border-none"
						><span class="">Logout</span></RouterLink
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
