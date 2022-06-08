<script>
  // import { onMount } from 'svelte';
  import axios from 'axios';
  let isSuccess = false;
  let errorMsg = '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    axios
      .post('http://localhost:5000/api/user/register', {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.status === 200) {
          isSuccess = true;
          errorMsg = '';
        }
      })
      .catch((e) => {
        errorMsg = e.response.data.message;
      });
  };
</script>

<form on:submit={handleSubmit} class="form-container">
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
  {#if isSuccess}
    <p class="my-3">Đăng ký tài khoản thành công!</p>
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
