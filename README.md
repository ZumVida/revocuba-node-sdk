# marketplace

## Config

Install axios

```sh
# Using NPM
npm i axios

# Using YARN
yarn add axios

# Using PNPM
pnpm add axios

```

```js
import useMarketplace, { initApi } from '@perlatec/marketplace'


export function useService() {
    // define base url
    const baseURL = 'BASE_URL'

    // Error handler
    const api = initApi({
        baseURL,
        errorHandler: {
            /**
             * Esta funcion se ejecuta cuando la API devuelve 401
             */
            logout: () => {
                console.log('logout');
            },
            /**
             * Esta funcion se ejecuta cuando la API devuelve un error 4xx o 5xx
             * @param error
             */
            handleError: (error) => {
                alert(error)
                console.log({ error })
            },
            // Conjunto de errores por defecto (opcional)
            defaultError: {
                // Error a mostrar si hay ERROR 401
                unauthorized: 'No tiene permisos suficientes'
            }
        },

        // Controlador del TOKEN de AUTHENTICACION
        tokenHandler: {
            // Obtener el token (Se ejecuta en cada pedido que necesite authenticacion)
            get: () => {
                const TOKEN = localStorage.getItem('authToken')
                return TOKEN
            },
            // Establecer token
            set: (token) => {
                localStorage.setItem('authToken', token)
            }
        }
    })

    // Devuelve la instancia de marketplace
    return useMarketplace(api)
}

```

## Examples

```js
import type {
    ProductRequestFilter,
    UserLoginRequest,
} from '@perlatec/marketplace';

import { useService } from './service'


const $service = useService()

/**
 * login
 * @param params
 */
async function login(params: UserLoginRequest) {
    const { data } = await $service.user.auth.login(params)

    console.log({
        user: data.data,
        token: data.auth_token
    })
}

/**
 * filterProducts
 * @param params
 */
async function filterProducts(params: ProductRequestFilter) {
    const { data } = await $service.marketplace.product.filter(params)

    console.log({
        products: data.data,
        pagination: data.meta
    })
}
```

## Changelog

### v0.2.6

- Pagos con Stripe
- Errores corregido

### v0.2.5

- Datos completos al obtener tienda
- Errores corregidos

### v0.2.4

- Permisos de usuario

### v0.2.3

- Orden al filtrar productos

### v0.2.2

- Exportar por defecto setup
- Errores corregidos

### v0.2.1

- Tokens puede ser obtenidos asincronos
- Mostrar logs de error en consola

### v0.2.0

- Administracion de Monedas
- Errores corregidos

### v0.1.6

- Administracion de Productos
- Errores corregidos

### v0.1.5

- Gestion de almacenes
- Errores corregidos

### v0.1.4

- Eliminar destinatarios
- Errores corregidos

### v0.1.3

- Gestion de ordenes

### v0.1.2

- Gestion de imagenes

### v0.1.1

- Correccion de errores

### v0.1.0

- Control de errores
- Gestión de Token de authenticacion
- Incluye inicializado de Axios

### v0.0.6

- User Recipients endpoints
- Create Order with items

"@typescript-eslint/eslint-plugin": "^6.16.0",
"@typescript-eslint/parser": "^6.16.0",
"eslint": "^8.56.0",
"eslint-config-prettier": "^9.1.0",
"eslint-plugin-prettier": "^5.1.2",
"prettier": "^3.1.1",
"ts-node": "^10.9.2",
"tsup": "^8.0.1",
"typescript": "^5.3.3"