# Commando de inicio

```shell
npm run command -- addUser -e admin@admin.com -fn admin -ln admin -p 12345678 -a 18 -ia true
```

## Docker Commands

Construir imagen
* docker build -t proyecto-backend:1.0 .

Listar las imágenes de docker
* docker images

Mostrar los procesos (contenedores) que se están ejecutando
* docker ps -a

Crear contendor y correrlo en el puerto 8081 con el nombre proyecto_backend
* docker run -p 8081:8081 --name proyecto_backend -d proyecto-backend:1.0

Destruir el contenedor
* docker rm proyecto_backend

Parar la ejecución del contenedor
* docker stop proyecto_backend

Comenzar la ejecución del contenedor ya creado previamente
* docker start proyecto_backend

Mostrar los logs del contenedor, para salir presionar Ctrl + C
* docker logs -f proyecto_backend

## Docker Compose

Levantar los contenedores
* docker-compose up

Parar los contenedores
* docker-compose stop

Remover los contenedores
* docker-compose down