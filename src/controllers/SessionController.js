import SessionManager from "../managers/SessionManager.js";

export const login = async  (req, res) =>{
  try{
    const {email, password} = req.body;
    const manager = new SessionManager();
    const sessionLogin = await manager.login({email, password})
    res.send({sessionLogin, message: 'Login success!'});
  }catch(e){
    next(e)
  }
};

export const logout = async (req, res) =>{
  req.session.destroy( err =>{
    if(!err){
      return res.send({ message: 'Logout ok!' });
    }
    res.send({ message: 'Logout error!', body: err })
  });
};

export const current = async  (req, res) =>{
  res.status(200).send({status: 'Success',payload: req.user });
};

export const signup = async (req, res) =>{
  try{
    let data = req.body
    const manager = new SessionManager()
    const signup = await manager.signup(data)
    res.status(201).send({ status: 'success', signup, message: 'User created.' });
  }catch(e){
    next(e)
  }
};

export const forgetPassword = async (req, res) =>{
  try{
    const { email, password } = req.body;
    const manager = new SessionManager();
    const forgetPassword = await manager.forgetPassword({email, password})
    res.status(200).send({ status: 'success', forgetPassword, message: 'User change password.' });
  }catch(e){
    next(e)
  }
};