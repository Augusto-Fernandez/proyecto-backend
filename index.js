class ProductManager {
    #products = [];
    title = 'producto prueba';
    description = 'Este es un producto de prueba';
    price = 200;
    thumbnail = 'Sin imagen';
    code = 'abc123';
    stock = 25;
    quantity = 1;
    id = 0

    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock =stock;
    }
    addProduct(prod) {
        if (!prod.title || !prod.description || !prod.price || !prod.img || !prod.code || !prod.stock) {
            throw new Error("Todos los campos son obligatorios")
        };
        const validateCode = this.#products.find(item => item.code === prod.code);
        if (validateCode) {
          validateCode.quantity++;
          throw new Error("Codigo repetido")
        } else {
          this.id = this.id + 1;
          return this.#products.push({...prod, id: this.id});
        }
    }
    getProducts(){
        console.log(this.#products)
    }
    getProductById(id) {
        const productFind = this.#products.find(prod => prod.id === id);

        if (!productFind){
            throw Error("Not Found");
        }
        return console.log(productFind);
    }
}

const producto1 = new ProductManager('Producto1', 'Instancia de producto 1', 300, 'Sin Imangen', 'adc124', 5);
const producto2 = new ProductManager('Producto2', 'Instancia de producto 2', 400, 'Sin Imangen', 'adc124', 9);
const producto3 = new ProductManager('Producto3', 'Instancia de producto 3', 500, 'Sin Imangen', 'adc125');
producto1.getProducts();
producto1.addProduct(producto1);
producto2.addProduct(producto2);
producto3.addProduct(producto3);
producto1.getProducts();
producto1.getProductById(1);
producto1.getProductById(2); 
