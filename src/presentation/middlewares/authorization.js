import container from "../../container.js";

const authorization = (permission) => {
    return async (req, res, next) => {
        const { _doc } = req.user;

        const roleRepository = await container.resolve('RoleRepository');
        const validateRole = await roleRepository.validateId(_doc.role[0])

        if ( _doc.isAdmin!==true && !validateRole ) {
            return res.status(401).send({ message: 'Not authorized' });
        }

        const getRole = await roleRepository.getOne(_doc.role[0])
        const findRole = getRole.id.permissions.map(role => role === permission)

        if ( !findRole ) {
            return res.status(401).send({ message: 'Not authorized' });
        }

        next();
    }
}

export default authorization;