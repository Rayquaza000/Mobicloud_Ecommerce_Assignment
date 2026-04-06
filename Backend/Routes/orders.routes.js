import { hasAuthority } from "../Middlewear/admin.middlewear.js";
import { verifyJWT } from "../Middlewear/commonMiddlewear.js";
import { getOrders } from "../Controller/orders.controllers.js";
import { placeOrder } from "../Controller/orders.controllers.js";
import { changeOrderStatus } from "../Controller/orders.controllers.js";
import { pastOrders } from "../Controller/orders.controllers.js";

export function orderRoutes(app){
    app.get("/orders/:filter",verifyJWT,hasAuthority,getOrders);
    app.post("/order",verifyJWT,placeOrder);
    app.patch("/orderStatus/:orderId",verifyJWT,hasAuthority,changeOrderStatus);
    app.get("/pastorders/:userID",verifyJWT,pastOrders);
}