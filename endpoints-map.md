# Endpoints to Screens Map

- /auth/login -> SignInScreen (UserService.login)

Users
- GET /users -> UsersListScreen (`UserService.listUsers`)
- GET /users/{id} -> UserDetailScreen (`UserService.getUser`)
- POST /users -> UserFormScreen (`UserService.createUser`)
- PUT /users/{id} -> UserFormScreen (`UserService.updateUser`)

Cargas
- GET /cargas -> CargasListScreen (`CargaService.listCargas`)
- GET /cargas/{id} -> CargaDetailScreen (`CargaService.getCarga`)
- POST /cargas -> (Create screen can reuse a generic form)

Motoristas
- GET /motoristas -> MotoristasListScreen (`MotoristaService.listMotoristas`)
- GET /motoristas/{id} -> MotoristaDetailScreen (`MotoristaService.getMotorista`)

All services are under `src/api` and return typed models from `src/types`.
