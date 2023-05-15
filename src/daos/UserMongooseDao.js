import userSchema from "../models/userSchema.js";

class UserMongooseDao{
  async validateId(id){
    return await userSchema.findOne({_id: id});
  }

  async validateEmail(email){
    return await userSchema.findOne({email})
  }

  async paginate(criteria){
    const {limit, page} = criteria;
    const userDocuments = await userSchema.paginate({}, {page});/* ({}, {limit, page}) */
    userDocuments.docs = userDocuments.docs.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age
    }));

    return userDocuments;
  }

  async getOne(id){
    const userDocument = await userSchema.findOne({_id: id});

    return{
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password
    }
  }

  async getOneByEmail(email){
    const userDocument = await userSchema.findOne({email});

    return{
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password
    }
  }

  async create(data){
    const userDocument = await userSchema.create(data);

    return{
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
    }
  }

  async updateOne(id,data){
    const userDocument = await userSchema.findOneAndUpdate({_id: id}, data, {new: true});

    return{
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age
    }
  }

  async deleteOne(id){
    return userSchema.deleteOne({_id: id});
  }
}

export default UserMongooseDao;