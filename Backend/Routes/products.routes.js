export function productRoutes(app)
{
    app.get("/products/:category",categorywiseProduct);
    app.get("/product/:productId",singleProduct);
    app.post("/product",verifyJWT,hasAuthority,addProduct);
    app.put("/product/:productId",verifyJWT,hasAuthority,updateProduct);
    app.delete("/product/:productId",verifyJWT,hasAuthority,deleteProduct);

}