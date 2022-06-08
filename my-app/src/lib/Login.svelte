<script>
  import axios from 'axios';
  import { useNavigate } from 'svelte-navigator';
  import { loggedIn } from './store';
  let isSuccess = false;
  let errorMsg = '';
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    axios
      .post('http://localhost:5000/api/user/login', {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.status === 200) {
          isSuccess = true;
          errorMsg = '';
          localStorage.setItem('token', res.data.token);
          $loggedIn = true;
          navigate('/');
        }
      })
      .catch((e) => {
        errorMsg = e.response.data.message;
      });
  };
</script>

<form on:submit={handleSubmit} class="form-container">
  <h3 class="my-5 text-uppercase">Đăng nhập</h3>
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
  <button type="submit" class="btn btn-primary">Đăng nhập</button>
  {#if isSuccess}
    <p class="my-3">Đăng nhập thành công!</p>
  {/if}

  {#if errorMsg}
    <p class="my-3">{errorMsg}</p>
  {/if}
</form>

<style>
  .form-container {
    width: 30rem;
    margin: 0 auto;
  }
</style>
