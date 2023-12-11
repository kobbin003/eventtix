import express from "express";
const app = express();
let PORT = process.env.PORT || 3000;
// if (process.env.NODE_ENV == "production") {
// }
app.get("/", (req, res) => {
    res.json({ msg: "Hello World!!!" });
});
app.listen(PORT, () => console.log(`app is running in port: ${PORT}`));
//# sourceMappingURL=index.js.map