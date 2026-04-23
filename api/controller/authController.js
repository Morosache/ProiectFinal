const EMAIL = "eliseimorosan@gmail.com";
const PASSWORD = "eli";

export function authController(email, password) {
    if (email === EMAIL && password === PASSWORD) {
        return { success: true, message: "Login successful" };
    } else {
        return { success: false, message: "Login failed" };
    }
}