import productsSchema from "../models/productsSchema.js";

class ProductMongooseDao {
  async getAll(){
    const productDocument = await productsSchema.find()

    return productDocument.map(product => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      status: product.status
    }))
  }

  async getOne(id){
    const productDocument = await productsSchema.findOne({_id: id})

    return{
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }
  }

  async create(data){
    const productDocument = await productsSchema.create(data)

    return{
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }
  }

  async updateOne(id, data){
    const productDocument = await productsSchema.updateOne({_id: id}, data, {new:true})
    
    return{
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }  
  }

  async delete(id){
    return productsSchema.deleteOne({_id: id}) 
  }
}

export default ProductMongooseDao;