import UserMongooseDao from "../daos/UserMongooseDao.js";

class UserManager{
  constructor(){
     this.userDao = new UserMongooseDao();
  }

  async paginate(criteria){
    return this.userDao.paginate(criteria);
  }

  async getOneByEmail(email){
    const validate = this.userDao.validateEmail(email);
    if(!validate){
      return 'User dont exist.';
    }
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id){
    const validate = this.userDao.validateId(id);
    if(!validate){
      return 'User dont exist.';
    }
    return this.userDao.getOne(id);
  }

  async create(data){
    const user = await this.userDao.create(data);
    return {...user, password: undefined};
  }

  async updateOne(id, data){
    const validate = this.userDao.validateId(id);
    if(!validate){
      return 'User dont exist.';
    }
    return this.userDao.updateOne(id, data);
  }

  async deleteOne(id){
    const validate = this.userDao.validateId(id);
    if(!validate){
      return 'User dont exist.';
    }
    return this.userDao.deleteOne(id);
  }
}

export default UserManager;