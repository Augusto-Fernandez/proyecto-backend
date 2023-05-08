import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class ProductManager {
  constructor(){
    this.dao = new ProductMongooseDao()
  }

  async getAll(limit){
    try{
      let limitInt = parseInt(limit)
      if(isNaN(limitInt)){
        return this.dao.getAll()
      }
      return this.dao.getLimited(limitInt)
    }catch{
      return this.dao.getAll()
    }
  }

  async getOne(id){
    try{
      const productById = await this.dao.getOne(id)
      if(productById === null){
          return{status: "error", error: "Id not found"};
      }
      return productById
    }catch{
      return {status: "error", error: "Id not found"};
    }
  }

  async create(data){
    if(!data.title || !data.description || !data.code || !data.price || !data.status || !data.stock || !data.thumbnail){
      return {status: "error", error: "Todos los campos son obligatorios"};
    }
    return this.dao.create(data)
  }

  async updatOne(id, data){
    try{
      const productById = await this.dao.getOne(id)
      if(productById===null){
        return {status: "error", error: "Id not found1"};
      }

      if(!data.title || !data.description || !data.code || !data.price || !data.status || !data.stock || !data.thumbnail){
        return {status: "error", error: "Todos los campos son obligatorios"};
      }

      return this.dao.updateOne(id, data)
    }catch{
      return {status: "error", error: "Id not found2"};
    }
  }

  async delete(id){
    try{
      const productById = await this.dao.getOne(id)
      if(productById===null){
          return {status: "error", error: "Id not found1"};
      }
      return this.dao.delete(id) 
    }catch{
      return {status: "error", error: "Id not found2"};
    }
  }
}

export default ProductManager;