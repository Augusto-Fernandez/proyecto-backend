const authorization = (permission) =>{
    return async(req, res, next) =>{
        const {_doc} = req.user;

        if(!_doc.isAdmin && !_doc.role?.permissions.includes(permission))
        {
            return res.status(401).send({message: 'Not authorized'});
        }

        next();
    }
}

export default authorization;