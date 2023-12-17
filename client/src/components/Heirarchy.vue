<template>
	<div class="flex flex-col items-center">
		<div>
			<h4>{{ principal }}</h4>
			<p>(Principal)</p>
		</div>
		<div class="border-l-2 border-txtColor h-6"></div>
		<div>
			<h5>{{ vicePrincipal }}</h5>
			<p>(Vice Principal)</p>
		</div>
		<div class="border-l-2 border-txtColor h-6"></div>
		<div class="flex flex-col items-center">
			<h6>Staffs</h6>
			<div class="border-l-2 border-txtColor h-4"></div>
			<ul class="flex gap-3 border-t-2 border-txtColor">
				<li v-for="(staff, index) in staffs">
					<div
						v-if="index == 0"
						class="flex flex-col items-center -translate-x-1/2"
					>
						<div class="border-l-2 h-4"></div>
						<div>
							<p>{{ staff }}</p>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
					<div
						v-else-if="index == staffs.length - 1"
						class="flex flex-col items-center translate-x-1/2"
					>
						<div class="border-l-2 h-4"></div>
						<div>
							<p>{{ staff }}</p>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
					<div v-else class="flex flex-col items-center">
						<div class="border-l-2 h-4"></div>
						<div>
							<p>{{ staff }}</p>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	principal: { type: String, required: true },
	vicePrincipal: { type: String, required: true },
	staffs: { type: Array, required: true },
});
</script>

<style scoped></style>
