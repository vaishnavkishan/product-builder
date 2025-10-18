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

## Learnings

1. React and MUI.
1. MUI custom theme using [Material-UI Theme Creator](https://bareynol.github.io/mui-theme-creator/).
1. Font and Color theory of [Materil Design - Rally](https://m2.material.io/design/material-studies/rally.html#color).
1. In memory state management using `Redux`.
1. Persisting state in Browser's IndexedDB using `Redux Persist` and `redux-persist-indexeddb-storage`.
1. Lazy loading components using `lazy`.

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
