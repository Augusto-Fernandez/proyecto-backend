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
    await manager.getProducts();
    await manager.addProduct(item1);
    await manager.addProduct(item2);
    await manager.addProduct(item3);
}

main();

app.get("/products", async (req, res) => {
    const productsArray = await manager.getProducts();
    let {limit} = req.query;
    let limitInt = parseInt(limit)
    
    if(typeof limitInt === "number" && limitInt > 0 && limitInt <= productsArray.length){
        const limitedProducts = productsArray.splice(0,limitInt);
        res.send(limitedProducts);
    }else{
        res.send(productsArray);
    }    
});

app.get("/products/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productsArray = await manager.getProducts()

    if(typeof productId !== 'number' || productId === 0 || isNaN(productId) || productId>productsArray.length){
        res.send({error: "Id not found"});
    }else{
        const productById = await manager.getProductById(parseInt(productId));
        res.send(productById);
    }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
