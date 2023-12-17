<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["personnelData", "prevStep", "submitForm"]);

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

const addStaff = () => {
	// push it in the personnel.staff
	personnel.value.staffs.push(newStaff.value);
	// clear the input
	newStaff.value = "";
};

const removeStaff = (index: number) => {
	personnel.value.staffs.splice(index, 1);
};

const next = () => {
	// send the basic info to parent
	emit("personnelData", personnel.value);
	emit("submitForm");
};
</script>
<template>
	<!-- <form class="flex flex-col gap-2"> -->
	<label for="principal">Principal's name</label>
	<input
		v-model="personnel.principal"
		type="text"
		name="principal"
		id="principal"
		placeholder="Principal name"
		class="input input-sm input-bordered rounded-sm bg-#d8d8da"
	/>
	<label for="principal">Vice-Principal's name</label>
	<input
		v-model="personnel.viceprincipal"
		type="text"
		name="vicePrincipal"
		id="vicePrincipal"
		placeholder="Vice-Principal name"
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
		<button @click="addStaff" type="button" class="btn btn-xs border-none">
			<span class="hover:scale-110">+</span>
		</button>
	</div>
	<div class="flex justify-between py-2">
		<button
			@click="$emit('prevStep')"
			type="button"
			class="btn btn-md rounded-sm btn-info my-4 self-end"
		>
			prev
		</button>
		<button
			@click="next"
			type="button"
			class="btn btn-md rounded-sm btn-info my-4 self-end"
		>
			Submit
		</button>
	</div>
	<!-- </form> -->
</template>

<style scoped></style>
