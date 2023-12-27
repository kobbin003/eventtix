<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import type { TAddress, TPersonnels } from "@/stores/user";
import { onMounted, ref } from "vue";

const modalOpen = ref(false);

const showModal = () => {
	modalOpen.value = true;
};
const closeModal = () => {
	modalOpen.value = false;
};

const props = defineProps({ orgId: { type: String, required: true } });
type TSchoolDetails = {
	name: string;
	email: string;
	address: TAddress | null;
	personnels: TPersonnels | null;
};

const schoolDetails = ref<TSchoolDetails>({
	name: "",
	email: "",
	address: null,
	personnels: null,
});
onMounted(async () => {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	if (props.orgId) {
		const url = `${baseUrl}/profile/org/${props.orgId}/addNpers`;
		const opts = { method: "get" };
		const { data, error } = await useFetch(url, fetch);
		console.log("data-school details", data);
		if (data) {
			const fetchedData = data as TSchoolDetails;
			schoolDetails.value.name = fetchedData.name;
			schoolDetails.value.email = fetchedData.email;
			schoolDetails.value.address = fetchedData.address;
			schoolDetails.value.personnels = fetchedData.personnels;
		}
	}
});
</script>
<template>
	<div
		class="w-full p-2 flex flex-col gap-2 border-2 border-primary-content/50 rounded-sm"
	>
		<p>
			School name&nbsp;:&nbsp;<span>{{ schoolDetails.name }}</span>
		</p>
		<p>
			Email&nbsp;:&nbsp;<span>{{ schoolDetails.email }}</span>
		</p>
		<fieldset class="border border-primary-content/50 p-2">
			<legend>Address</legend>
			<p>{{ schoolDetails.address?.addressLine1 }}</p>
			<p>{{ schoolDetails.address?.addressLine2 }}</p>
			<p>{{ schoolDetails.address?.state }}</p>
			<p>{{ schoolDetails.address?.pin }}</p>
		</fieldset>
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
	</div>
	<Heirarchy
		v-if="schoolDetails.personnels"
		:principal="schoolDetails.personnels?.principal"
		:vicePrincipal="schoolDetails.personnels?.vicePrincipal"
		:staffs="schoolDetails.personnels?.staffs"
	/>
</template>

<style scoped></style>
