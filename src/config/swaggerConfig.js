const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Proyecto-Backend Api Documentation',
            description: "Api Documentation with Swagger"
        }
    },
    apis: ['./docs/**/*.yaml']
}

export default swaggerOptions;
