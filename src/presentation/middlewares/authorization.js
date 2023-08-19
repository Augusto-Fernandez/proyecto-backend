import container from "../../container.js";

const authorization = (permission) => {
    return async (req, res, next) => {
        const { _doc } = req.user;

        const roleRepository = await container.resolve('RoleRepository');
        const validatePermission = await roleRepository.validatePermission(_doc.role[0], permission);

        if ( _doc.isAdmin!==true && !validatePermission ) {
            return res.status(401).send({ message: 'Not authorized' });
        }

        next();
    }
}

export default authorization;