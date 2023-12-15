import { createRouter, createWebHistory } from "vue-router";
import PublicViewVue from "@/views/PublicView.vue";
import HomeViewVue from "@/views/HomeView.vue";
import RootViewVue from "@/views/RootView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("../views/AuthView.vue"),
		},
		{
			path: "/signup",
			name: "signup",
			component: () => import("../views/AuthView.vue"),
		},
		{
			path: "/",
			name: "root",
			component: RootViewVue,
			children: [
				{ path: "", name: "public", component: PublicViewVue },
				{
					path: "/event/:eventId",
					name: "event",
					component: () => import("../views/EventView.vue"),
				},

				{
					path: "/event/create",
					name: "create-event",
					component: () => import("../views/CreateEditEventView.vue"),
				},
				{
					path: "/event/edit",
					name: "edit-event",
					component: () => import("../views/CreateEditEventView.vue"),
				},
				{
					path: "/user",
					name: "user",
					component: () => import("../views/HomeView.vue"),
				},
				{
					path: "/user/dashboard",
					name: "dashboard",
					component: () => import("../views/UserDashboardView.vue"),
					children: [
						{
							path: "",
							name: "profile",
							component: () => import("../views/ProfileView.vue"),
						},
						{
							path: "events",
							name: "userEvents",
							// the event li should have edit button
							component: () => import("../views/UserEventsView.vue"),
						},
					],
				},
			],
		},

		{
			path: "/:catchAll(.*)",
			name: "notfound",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/NotFoundView.vue"),
		},
	],
});

export default router;
