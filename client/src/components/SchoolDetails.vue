<template>
	<div class="w-full bg-green-400">
		<p>School name</p>
		<p>Email</p>
		<p>Address</p>
		<p></p>
		<p></p>
	</div>
	<div v-if="$route.path.includes('user/profile')">
		<button class="btn btn-sm btn-primary rounded-sm" @click="showModal">
			Edit Address
		</button>
		<dialog
			id="address_edit_modal"
			class="modal"
			:class="{ 'modal-open': modalOpen }"
		>
			<div class="flex flex-col items-end">
				<button
					class="btn-xs btn-circle bg-white border-2 border-gray-400 shadow-lg relative top-3 left-1"
					@click="closeModal"
				>
					x
				</button>
				<AddressEditForm />
			</div>
		</dialog>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modalOpen = ref(false);

const showModal = () => {
	modalOpen.value = true;
};
const closeModal = () => {
	modalOpen.value = false;
};
</script>

<style scoped></style>
