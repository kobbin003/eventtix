<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { type TAddress, type TPersonnels } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";
import { baseUrl } from "@/utils/constants";
const { updateAddress, updatePersonnels } = useUserStore();
const { user } = storeToRefs(useUserStore());

const { isLoading } = storeToRefs(useAlertStore());

const route = useRoute();
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
	address: TAddress;
	personnels: TPersonnels;
};

const schoolDetails = ref<TSchoolDetails>({
	name: "",
	email: "",
	address: {
		addressLine1: "",
		addressLine2: "",
		state: "",
		pin: 0,
	},
	personnels: {
		principal: "",
		vicePrincipal: "",
		staffs: [],
	},
});
onMounted(async () => {
	// if own profile, set the ref-values from the user-store else fetch
	if (route.path.includes("/user/profile")) {
		schoolDetails.value.name = user.value.name;
		schoolDetails.value.email = user.value.email;
		// if address and personnels found, set the ref-values from the user-store else fetch
		if (user.value.address && user.value.personnels) {
			schoolDetails.value.address = user.value.address;
			schoolDetails.value.personnels = user.value.personnels;
		} else {
			if (props.orgId) {
				const url = `${baseUrl}/profile/org/${props.orgId}/addNpers`;
				const opts = { method: "get" };
				const { data, error } = await useFetch(url, opts);
				// console.log("data-school details", data);
				if (data) {
					const fetchedData = data as TSchoolDetails;
					schoolDetails.value.name = fetchedData.name;
					schoolDetails.value.email = fetchedData.email;
					schoolDetails.value.address = fetchedData.address;
					schoolDetails.value.personnels = fetchedData.personnels;

					// then update user-store's address and personnels

					// updateUser({
					// 	address: fetchedData.address,
					// 	personnels: fetchedData.personnels,
					// });
					if (fetchedData.address) {
						updateAddress({
							addressLine1: fetchedData.address?.addressLine1,
							addressLine2: fetchedData.address?.addressLine2,
							state: fetchedData.address?.state,
							pin: fetchedData.address?.pin,
						});
					}
					if (fetchedData.personnels) {
						updatePersonnels({
							principal: fetchedData.personnels.principal,
							vicePrincipal: fetchedData.personnels.vicePrincipal,
							staffs: fetchedData.personnels.staffs,
						});
					}
					// updateAddress(data.address);
					// updatePersonnels(data.personnels);
				}
			}
		}
	} else {
		if (props.orgId) {
			const url = `${baseUrl}/profile/org/${props.orgId}/addNpers`;
			const opts = { method: "get" };
			const { data, error } = await useFetch(url, opts);
			// console.log("data-school details", data);
			if (data) {
				const fetchedData = data as TSchoolDetails;
				schoolDetails.value.name = fetchedData.name;
				schoolDetails.value.email = fetchedData.email;
				schoolDetails.value.address = fetchedData.address;
				schoolDetails.value.personnels = fetchedData.personnels;

				// then update user-store's address and personnels

				// updateUser({
				// 	address: fetchedData.address,
				// 	personnels: fetchedData.personnels,
				// });
				if (fetchedData.address) {
					updateAddress({
						addressLine1: fetchedData.address?.addressLine1,
						addressLine2: fetchedData.address?.addressLine2,
						state: fetchedData.address?.state,
						pin: fetchedData.address?.pin,
					});
				}
				if (fetchedData.personnels) {
					updatePersonnels({
						principal: fetchedData.personnels.principal,
						vicePrincipal: fetchedData.personnels.vicePrincipal,
						staffs: fetchedData.personnels.staffs,
					});
				}
			}
		}
	}
});
</script>
<template>
	<div v-if="isLoading" class="w-full flex justify-center">
		<span class="loading loading-spinner loading-md"></span>
	</div>
	<div v-else>
		<div
			v-if="schoolDetails.name"
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
				<p>{{ schoolDetails.address.addressLine1 }}</p>
				<p>{{ schoolDetails.address.addressLine2 }}</p>
				<p>{{ schoolDetails.address.state }}</p>
				<p>{{ schoolDetails.address.pin }}</p>
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
						<AddressEditForm :close-modal="closeModal" />
					</div>
				</dialog>
			</div>
		</div>
		<Heirarchy
			v-if="schoolDetails.personnels"
			:principal="schoolDetails.personnels.principal"
			:vicePrincipal="schoolDetails.personnels.vicePrincipal"
			:staffs="schoolDetails.personnels.staffs"
		/>
	</div>
</template>

<style scoped></style>
