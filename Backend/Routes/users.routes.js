export function userRoutes(app){
    app.post("/signup",validateDetails,checkIfUserExists,signup);
    app.post("/login",checkIfDetailsAreAMatch,login);
    app.post("/adminLogin",validateAdminDetails,checkIfAdminDetailsAreAMatch,adminLogin);
    app.post("/cart",verifyJWT,displayCart);
    app.patch("/updateCart",verifyJWT,updateCart);
    app.get("/allUsers",verifyJWT,hasAuthority,sendAllUsers);
    app.post("/logout",logout);
    app.post("/adminLogout",adminLogout);
}