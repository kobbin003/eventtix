<script setup lang="ts">
import Header from "@/components/Header.vue";
import ExposeChild from "@/components/ExposeChild.vue";
import { onMounted, ref, watch } from "vue";
/** expose */
const child = ref<InstanceType<typeof ExposeChild>>();

onMounted(() => {
	const exposedValue = child?.value?.exposedValue;
	console.log("exposedValue-mount", exposedValue);
});

watch(child, (newValue) => {
	if (newValue) {
		const exposedValue = newValue.exposedValue;
		console.log("exposedValue-watch", exposedValue);
	}
});
/** */
</script>

<template>
	<main>
		<Header />
		<main class="px-2 sm:px-4 md:px-6 py-3 relative top-14">
			<RouterView />
		</main>
		<!-- <ExposeChild ref="child" /> -->
	</main>
</template>
