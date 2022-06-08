#Init Svelte

yarn init vite my-app -- --template svelte
yarn add axios

#Add bootstrap

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


#Form

<form>
  <h3 class="my-5 text-uppercase">Đăng ký tài khoản</h3>
  <div class="mb-3">
    <label for="formEmail" class="form-label">Địa chỉ email</label>
    <input type="email" class="form-control" id="formEmail" name="email" />
  </div>
  <div class="mb-3">
    <label for="formPassword" class="form-label">Mật khẩu</label>
    <input
      type="password"
      class="form-control"
      id="formPassword"
      name="password"
    />
  </div>
  <button type="submit" class="btn btn-primary">Đăng ký tài khoản</button>
</form>
