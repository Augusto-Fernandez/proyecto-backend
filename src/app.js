import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();

const item1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:25
}

const item2 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock:25
}

const item3 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc125",
    stock:25
}

const main = async () => {
    await manager.addProduct(item1);
    await manager.addProduct(item2);
    await manager.addProduct(item3);
}

main();

app.get("/products", async (req, res) => {
    const productsArray = await manager.getProducts();
    const limit = req.query.limit;
    
    if(typeof limit === 'number' && limit > 0){
        const limitedProducts = productsArray.splice(0,limit);
        res.send(limitedProducts);
    }
    if(limit === 0){
        res.send(null);
    }

    res.send(productsArray);
});

app.get("/products/:pid", async (req, res) => {
    const { productId } = req.params;
    
    if(typeof limit !== 'number' && limit === 0){
        res.send(null);
    }
    const productById = await manager.getProductById(productId);
    res.send(productById);
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
