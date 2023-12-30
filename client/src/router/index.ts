import { createRouter, createWebHistory } from "vue-router";
import PublicViewVue from "@/views/PublicView.vue";
import RootViewVue from "@/views/RootView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("../views/AuthView.vue"),
			meta: { requiresAuth: false },
		},
		{
			path: "/signup",
			name: "signup",
			component: () => import("../views/AuthView.vue"),
			meta: { requiresAuth: false },
		},
		{
			path: "/",
			name: "root",
			component: RootViewVue,
			meta: { requiresAuth: false },
			children: [
				{
					path: "",
					name: "public",
					component: PublicViewVue,
					props: { someProp: "someProp-xx" },
					meta: { requiresAuth: false },
				},
				// {
				// 	path: "/profile/:userId",
				// 	name: "profile-public",
				// 	component: () => import("../views/ProfileView.vue"),
				// 	meta: { requiresAuth: false },
				// },
				{
					path: "/event/:eventId",
					name: "event-public",
					component: () => import("../views/EventView.vue"),
					meta: { requiresAuth: false },
				},

				{
					path: "/user",
					name: "user",
					component: () => import("../views/HomeView.vue"),
					meta: { requiresAuth: true },
				},

				{
					path: "/user/event/create",
					name: "create-event",
					component: () => import("../views/CreateEditEventView.vue"),
					meta: { requiresAuth: true },
				},
				{
					path: "/user/event/edit/:eventId",
					name: "edit-event",
					component: () => import("../views/CreateEditEventView.vue"),
					meta: { requiresAuth: true },
				},
				{
					path: "/user/profile",
					name: "userprofile",
					component: () => import("../views/UserProfileView.vue"),
					meta: { requiresAuth: true },
					children: [
						{
							path: "",
							name: "userprofile-root",
							component: () => import("../views/ProfileView.vue"),
						},
						{
							path: "payment",
							name: "payment",
							component: () => import("../views/PaymentView.vue"),
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
			path: "/payment/success",
			name: "paymentSuccess",
			component: () => import("../views/PaymentSuccess.vue"),
			meta: { requiresAuth: true },
		},
		{
			path: "/payment/failure/:eventId",
			name: "paymentFailure",
			component: () => import("../views/PaymentFailure.vue"),
			meta: { requiresAuth: true },
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

// auth guard (globally)
router.beforeEach((to, from, next) => {
	// console.log("global guard- TO", to.path);
	// console.log("global guard- FROM", from.path);
	// to.matched.map((route) => console.log("matches", route.meta.requiresAuth));

	// check if any of the matches has "requiresAuth" meta
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

	if (requiresAuth && !isAuthenticated()) {
		// alert("unauthenticated");
		next("/login");
	} else {
		next();
	}
});

export function isAuthenticated() {
	/** is Auth code */
	const accessTokenFound = localStorage.getItem("accessToken");

	if (
		accessTokenFound &&
		accessTokenFound !== "null" &&
		accessTokenFound !== "undefined"
	) {
		return true;
	} else {
		return false;
	}
}

export default router;

/**
 * RouteLocationNormalized: GLOBAL
 * RouteRecordNormalized: ROUTE
 */
