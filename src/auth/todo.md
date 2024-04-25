<!-- AccessToken and RefreshToken -->

Đầu tiên: khi người dùng sử dụng username và password đăng nhập vào hệ thống và xác thực thành công.
Tại AuthService chạy hàm getTokens() để tạo ra accessToken, refreshToken và đăng ký vào jwtService(accessToken có thời hạn là 1h và refreshToken có thời hạn là 1d).
Trả response body về bao gồm accessToken, refreshToken,
Tạo ra các đường truy cập yêu cầu bảo mật với chìa khóa là Authorization Bearer <accessToken>
Khi accessToken hết hạn. Người dùng có thể sử dụng refreshToken để xin cấp lại accessToken trong thời hạn refreshToken vẫn còn hiệu lực.
gửi một api với method: GET, endpoint: /api/refresh-token
headers :{Authorization: Bearer <refreshToken>}

Tại server xác thực refreshToken này, nếu xác thực thành công, tiếp tục getTokens() và ghi lại accessToken, refreshToken với thời hạn mới.

<!-- AccessToken and RefreshToken -->

ent "UserModel" at index [0] is available in the UserModule context.
Potential solutions:

- Is UserModule a valid NestJS module?
- If "UserModel" is a provider, is it part of the current UserModule?
- If "UserModel" is exported from a separate @Module, is that module imported within UserModule?
  @Module({
  imports: [ /* the Module containing "UserModel" */ ]
  })
  at Injector.lookupComponentInParentModules (/var/task/node_modules/@nestjs/core/injector/injector.js:254:19)
  at processTicksAndRejections (node:internal/process/task_queues:95:5)
  at Injector.resolveComponentInstance (/var/task/node_modules/@nestjs/core/injector/injector.js:207:33)
  at resolveParam (/var/task/node_modules/@nestjs/core/injector/injector.js:128:38)
  at async Promise.all (index 0)
  at Injector.resolveConstructorParams (/var/task/node_modules/@nestjs/core/injector/injector.js:143:27)
  at Injector.loadInstance (/var/task/node_modules/@nestjs/core/injector/injector.js:70:13)
  at Injector.loadProvider (/var/task/node_modules/@nestjs/core/injector/injector.js:97:9)
  at /var/task/node_modules/@nestjs/core/injector/instance-loader.js:56:13
  at async Promise.all (index 3)
  Node.js process exited with exit status: 1. The logs above can help with debugging the issue.
  INIT_REPORT Init Duration: 1490.33 ms Phase: init Status: error Error Type: Runtime.ExitError
  [32m[Nest] 10 - [39m04/25/2024, 7:53:14 AM [32m LOG[39m [38;5;3m[NestFactory] [39m[32mStarting Nest application...[39m
  [32m[Nest] 10 - [39m04/25/2024, 7:53:14 AM [32m LOG[39m [38;5;3m[InstanceLoader] [39m[32mMongodbModule dependencies initialized[39m[38;5;3m +62ms[39m
  [32m[Nest] 10 - [39m04/25/2024, 7:53:14 AM [32m LOG[39m [38;5;3m[InstanceLoader] [39m[32mMongooseModule dependencies initialized[39m[38;5;3m +0ms[39m
  [31m[Nest] 10 - [39m04/25/2024, 7:53:14 AM [31m ERROR[39m [38;5;3m[ExceptionHandler] [39m[31mNest can't resolve dependencies of the UserService (?). Please make sure that the argument "UserModel" at index [0] is available in the UserModule context.
  Potential solutions:
- Is UserModule a valid NestJS module?
- If "UserModel" is a provider, is it part of the current UserModule?
- If "UserModel" is exported from a separate @Module, is that module imported within UserModule?
  @Module({
  imports: [ /* the Module containing "UserModel" */ ]
  })
  [39m
  Error: Nest can't resolve dependencies of the UserService (?). Please make sure that the argument "UserModel" at index [0] is available in the UserModule context.
  Potential solutions:
- Is UserModule a valid NestJS module?
- If "UserModel" is a provider, is it part of the current UserModule?
- If "UserModel" is exported from a separate @Module, is that module imported within UserModule?
  @Module({
  imports: [ /* the Module containing "UserModel" */ ]
  })
  at Injector.lookupComponentInParentModules (/var/task/node_modules/@nestjs/core/injector/injector.js:254:19)
  at processTicksAndRejections (node:internal/process/task_queues:95:5)
  at Injector.resolveComponentInstance (/var/task/node_modules/@nestjs/core/injector/injector.js:207:33)
  at resolveParam (/var/task/node_modules/@nestjs/core/injector/injector.js:128:38)
  at async Promise.all (index 0)
  at Injector.resolveConstructorParams (/var/task/node_modules/@nestjs/core/injector/injector.js:143:27)
  at Injector.loadInstance (/var/task/node_modules/@nestjs/core/injector/injector.js:70:13)
  at Injector.loadProvider (/var/task/node_modules/@nestjs/core/injector/injector.js:97:9)
  at /var/task/node_modules/@nestjs/core/injector/instance-loader.js:56:13
  at async Promise.all (index 3)
  Node.js process exited with exit status: 1. The logs above can help with debugging the issue.
  INIT_REPORT Init Duration: 2580.44 ms Phase: invoke Status: error Error Type: Runtime.ExitError
  Unknown application error occurred
