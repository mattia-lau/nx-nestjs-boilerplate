# NX NestJs Boilerplate

🔎 **Smart, Fast and Extensible Build System**

This project is an monorepo(nx) boilerplate for NestJs application.
The project is included `husky`, `prettier`, `eslint`, `lint-staged`

<p style="text-align: center;">
<img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" style="padding-right: 20px;" /><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"  width="180" alt="Nx Logo"></p>

## Generate an NestJs application

Run `nx workspace-generator app-generator <project-name>` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Develop (Hot reload)

```bash
yarn start
```

### Build

```bash
yarn build
```

### Unit Test

```bash
yarn test
```

### e2e Test

```bash
yarn test-e2e
```

### Run specify project and command

```bash
nx run <project-name>:<command>

```
