import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1d", // Token expires in 1 day
	});

	res.cookie("jwt", token, {
		maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
		httpOnly: true, // Prevents XSS attacks
		sameSite: "strict", // Protects against CSRF attacks
		secure: process.env.NODE_ENV === "production", // Set to true in production
	});

	// Optionally, you might want to set the token in the response body as well
	return token; // If you want to return the token for further use
};

export default generateTokenAndSetCookie;
