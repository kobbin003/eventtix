<script setup lang="ts">
import { ref } from "vue";

export type Personnel = {
	principal: String;
	viceprincipal: String;
	staffs: String[];
};

const personnel = ref<Personnel>({
	principal: "",
	viceprincipal: "",
	staffs: ["example"],
});

const newStaff = ref("");
const showStaffTooltip = ref(false);
const addStaff = () => {
	if (newStaff.value) {
		// push it in the personnel.staff
		personnel.value.staffs.push(newStaff.value);
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
	personnel.value.staffs.splice(index, 1);
};
</script>
<template>
	<div
		class="flex flex-col gap-2 justify-center items-start bg-white border border-gray-100 shadow-lg py-7 px-9 rounded-sm"
	>
		<b class="text-lg">Edit your personnels</b>
		<form action="" class="form-control gap-2">
			<label for="principal">Principal's name</label>
			<input
				v-model="personnel.principal"
				type="text"
				name="principal"
				id="principal"
				placeholder="Principal name"
				required
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<label for="principal">Vice-Principal's name</label>
			<input
				v-model="personnel.viceprincipal"
				type="text"
				name="vicePrincipal"
				id="vicePrincipal"
				placeholder="Vice-Principal name"
				required
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<!-- <p>Staffs</p> -->
			<label for="staffs">Staffs:</label>
			<ul id="staffs">
				<li
					v-for="(staff, index) in personnel.staffs"
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
			<input
				type="submit"
				value="Done"
				class="btn btn-sm btn-primary rounded-sm mt-2"
			/>
		</form>
	</div>
</template>

<style scoped></style>
