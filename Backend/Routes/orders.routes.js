export function orderRoutes(app){
    app.get("/orders/:filter",verifyJWT,hasAuthority,getOrders);
    app.post("/order",verifyJWT,placeOrder);
    app.patch("/orderStatus/:orderId",verifyJWT,hasAuthority,changeOrderStatus);
    app.get("/pastorders/:userID",verifyJWT,pastorders);
}