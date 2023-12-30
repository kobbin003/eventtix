document.addEventListener("DOMContentLoaded", function () {
	const stripeOnboardButtonEl = document.getElementById("stripeOnboardButton");

	console.log("stripeOnboardButtonEl", stripeOnboardButtonEl);

	console.log("hi");
	stripeOnboardButtonEl?.addEventListener("click", function () {
		// window.open(
		// 	"https://connect.stripe.com/setup/s/acct_1OSDqASFgWtgzdGK/QhOis9TJQakJ",
		// 	"_blank"
		// );
		console.log("hi");
	});
});
