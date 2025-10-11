# Product Builder

Application to build products.

Developed using:

## Tools used

1. React + TypeScript + Vite
1. Material UI - customized branding
1. Redux
   - Redux Persistence
   - IndexedDB browser API

## Features

1.  Local DB storage, the data stays in the browser
1.  Show logo when the app is lazy loaded

## Deployment

[Vaiki product builder](https://stproductbuilderreact.z13.web.core.windows.net/)

1. `az login --tenant 348db05a-6454-401f-a262-88a9c511d485`
1. `yarn build`
1. `cd dist`
1. ```
   az storage blob upload-batch \
       --account-name stproductbuilderreact \
       --destination '$web' \
       --source . \
       --overwrite
   ```
