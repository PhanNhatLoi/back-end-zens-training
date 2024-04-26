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

<!-- forgot password -->

client call api có body là email đăng ký.
Tại server generate 1 otp 6 số và ghi vào cookie. // thời hạn 3p
soạn một email forgot password gửi về email được điền.
Client gửi api change password có body gồm: email, password, otp code
Từ Server kiểm tra email và otp đó có tương ứng hay không và tiến hành thay đổi mật khẩu

<!-- forgot password -->
