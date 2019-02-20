exports.respond = (payload, res) => {
	res.send("Hello, " + payload.user_name + "!");
}