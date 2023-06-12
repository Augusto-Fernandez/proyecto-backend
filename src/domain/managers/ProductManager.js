import ProductMongooseDao from "../../data/daos/ProductMongooseDao.js";

class ProductManager {
  constructor(){
    this.dao = new ProductMongooseDao()
  }

  async getAll(sort, criteria){
    try{
      if(sort==="asc"){
        return this.dao.getAsc()
      }else if(sort==="desc"){
        return this.dao.getDesc()
      }
      return this.dao.getAll(criteria)
    }catch{
      return this.dao.getAll(criteria)
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