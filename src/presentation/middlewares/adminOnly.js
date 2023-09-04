const adminOnly = () =>{
    return async(req, res, next) =>{
        const {_doc} = req.user;

        if( _doc.isAdmin!==true)
        {
            return res.status(401).send({message: 'Not authorized'});
        }

        next();
    }
}

export default adminOnly;
