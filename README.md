## Migrations
### Products
```shell
npx drizzle-kit generate:pg --config=./libs/microservices/catalog/schema/drizzle.config.json
```
### Orders
```shell
npx drizzle-kit generate:pg --config=./libs/microservices/orders/schema/drizzle.config.json
```


run multiple projects

```
npx nx run-many -t serve -p gateway-api catalog-microservice
```
