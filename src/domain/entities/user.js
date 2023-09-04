class User{
    constructor(props){
        this.id=props.id,
        this.firstName=props.firstName,
        this.lastName=props.lastName,
        this.email=props.email,
        this.age=props.age,
        this.cart=props.cart,
        this.password=props.password,
        this.isAdmin=props.isAdmin,
        this.role=props.role,
        this.premium=props.premium,
        this.documents=props.documents,
        this.last_connection=props.last_connection
    }
}

export default User;
