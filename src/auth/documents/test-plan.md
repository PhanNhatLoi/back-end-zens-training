Test plan

- module: Auth;

* Chức năng: Đăng nhâp, đăng ký, lấy thông tin user.

Kịch bản Test:

- Đăng ký:
  (TC_REGISTER_01): Đăng ký với dữ liệu đầy đủ
  (TC_REGISTER_02): Đăng ký với email đã tồn tại
  (TC_REGISTER_03): Đăng ký với username đã tồn tại
  (TC_REGISTER_04): Đăng ký với dữ liệu thiếu một trong nhứng field require: (username, email, password)
  (TC_REGISTER_05): Đăng ký với password yếu
- Đăng nhập:
  (TC_LOGIN_01): Đăng nhập với tài khoản đúng
  (TC_LOGIN_02): Đăng nhập với username không tồn tại
  (TC_LOGIN_03): Đăng nhập với password sai
  (TC_LOGIN_04): Đăng nhập với dữ liệu thiếu username/password

- Lấy thông tin user
  (TC_PROFILE_01): Lấy thông tin với token đúng,
  (TC_PROFILE_02): Lấy thông tin với token sai,
  (TC_PROFILE_03): Lấy thông tin với token đã hết hạn
