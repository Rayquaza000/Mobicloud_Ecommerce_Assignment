import { categorywiseProduct, singleProduct } from "../Controller/products.controller.js";
import { verifyJWT} from "../Middlewear/commonMiddlewear.js";
import { hasAuthority } from "../Middlewear/admin.middlewear.js";
import { addProduct } from "../Controller/products.controller.js";
import { updateProduct } from "../Controller/products.controller.js";
import { deleteProduct } from "../Controller/products.controller.js";
import { getAllProducts } from "../Controller/products.controller.js";
export function productRoutes(app)
{
    app.get("/products/:category",categorywiseProduct);
    app.get("/product/:productId",singleProduct);
    app.get("/products",verifyJWT,hasAuthority,getAllProducts)
    app.post("/product",verifyJWT,hasAuthority,addProduct);
    app.put("/product/:productId",verifyJWT,hasAuthority,updateProduct);
    app.delete("/product/:productId",verifyJWT,hasAuthority,deleteProduct);

}