import {validateDetails, checkIfUserExists} from "../Middlewear/signup.middlewear.js";
import {signup} from "../Controller/users.controller.js";
import { checkIfDetailsAreAMatch } from "../Middlewear/login.middlewear.js";
import { login } from "../Controller/users.controller.js";
import { adminLogin } from "../Controller/admin.controller.js";
import {checkIfAdminDetailsAreAMatch} from "../Middlewear/admin.middlewear.js"
import { verifyJWT } from "../Middlewear/commonMiddlewear.js";
import { displayCart } from "../Controller/users.controller.js";
import { updateCart } from "../Controller/users.controller.js";
import { hasAuthority } from "../Middlewear/admin.middlewear.js";
import { sendAllUsers } from "../Controller/admin.controller.js";
import { logout } from "../Controller/users.controller.js";
import { adminLogout } from "../Controller/admin.controller.js";

export function userRoutes(app){
    app.post("/signup",validateDetails,checkIfUserExists,signup);
    app.post("/login",checkIfDetailsAreAMatch,login);
    app.post("/adminLogin",checkIfAdminDetailsAreAMatch,adminLogin);
    app.post("/cart",verifyJWT,displayCart);
    app.patch("/updateCart",verifyJWT,updateCart);
    app.get("/allUsers",verifyJWT,hasAuthority,sendAllUsers);
    app.post("/logout",logout);
    app.post("/adminLogout",adminLogout);
}