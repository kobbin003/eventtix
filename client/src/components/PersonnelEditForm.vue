<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import type { TPersonnels } from "@/stores/user";
import { accessToken, baseUrl } from "@/utils/constants";
import { onMounted, ref } from "vue";
import { useAlertStore } from "@/stores/alert";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { updatePersonnels } = useUserStore();
const { user } = storeToRefs(useUserStore());
const { setSuccessMsg } = useAlertStore();
const { isLoading } = storeToRefs(useAlertStore());

const props = defineProps({ closeModal: { type: Function, required: true } });
const personnels = ref<TPersonnels>({
	principal: "",
	vicePrincipal: "",
	staffs: [],
});

const newStaff = ref("");
const showStaffTooltip = ref(false);
const addStaff = () => {
	// update staff
	if (newStaff.value) {
		// remove staff required message if message was already there
		if (personnels.value.staffs.length == 0) {
			staffRequiredMsg.value = false;
		}
		// dont push if already 5 stuff added
		if (personnels.value.staffs.length == 5) {
			// return;
			staffRequiredMsg.value = true;
			return;
		}
		// push it in the Personnels.staff
		personnels.value.staffs.push(newStaff.value);
		// clear the input
		newStaff.value = "";
	} else {
		showStaffTooltip.value = true;
	}
};

const removeTooltip = () => {
	showStaffTooltip.value = false;
};

const removeStaff = (index: number) => {
	personnels.value.staffs.splice(index, 1);
};

const staffRequiredMsg = ref(false);
const submitPersonnelEdit = async () => {
	if (
		personnels.value.staffs.length == 0 ||
		personnels.value.staffs.length > 5
	) {
		// return;
		staffRequiredMsg.value = true;
	} else {
		// atleastOneStaffRequiredMsg.value = true;
		const url = `${baseUrl}/profile/personnels`;
		const opts = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(personnels.value),
		};
		console.log("personnels-data", personnels);
		const { data, error } = await useFetch(url, opts);
		if (data) {
			updatePersonnels({
				principal: data.personnels.principal,
				vicePrincipal: data.personnels.vicePrincipal,
				staffs: data.personnels.staffs,
			});

			//close the modal

			props.closeModal();
			setSuccessMsg("personnels updated!");
		}
	}
};
onMounted(() => {
	if (user.value.personnels) {
		personnels.value = user.value.personnels;
	}
});
</script>
<template>
	<div
		class="flex flex-col gap-2 justify-center items-start bg-white border border-gray-100 shadow-lg py-7 px-9 rounded-sm"
	>
		<b class="text-lg">Edit your personnels</b>
		<form
			action=""
			class="form-control gap-2"
			@submit.prevent="submitPersonnelEdit"
		>
			<label for="principal">Principal's name</label>
			<input
				v-model="personnels.principal"
				type="text"
				name="principal"
				id="principal"
				placeholder="Principal name"
				required
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<label for="principal">Vice-Principal's name</label>
			<input
				v-model="personnels.vicePrincipal"
				type="text"
				name="vicePrincipal"
				id="vicePrincipal"
				placeholder="Vice-Principal name"
				required
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<!-- <p>Staffs</p> -->
			<label for="staffs">Staffs:</label>
			<p v-if="staffRequiredMsg" class="text-xs text-red-600">
				*min 1 and max 5 staff allowed
			</p>
			<ul id="staffs">
				<li
					v-for="(staff, index) in personnels.staffs"
					:key="staff"
					class="flex justify-between items-center gap-2 bg-base-100 border"
				>
					<p class="p-2 rounded-sm">{{ staff }}</p>
					<button
						@click="removeStaff(index)"
						type="button"
						class="btn btn-xs border-none bg-transparent hover:bg-transparent hover:scale-110"
					>
						-
					</button>
				</li>
			</ul>
			<div class="flex items-center gap-2">
				<input
					v-model="newStaff"
					type="text"
					name="newStaff"
					id="newStaff"
					placeholder="add staff"
					class="input input-sm input-bordered rounded-sm bg-#d8d8da"
				/>
				<button
					@click="addStaff"
					@mouseleave="removeTooltip"
					type="button"
					class="btn btn-xs border-none"
					:class="{
						['tooltip tooltip-secondary tooltip-right cursor-default']:
							showStaffTooltip,
					}"
					data-tip="fill the input"
				>
					<span class="hover:scale-110">+</span>
				</button>
			</div>
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
