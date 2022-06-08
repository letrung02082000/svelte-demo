<script>
  import Login from './lib/Login.svelte';
  import Register from './lib/Register.svelte';
  import { Router, Route, Link } from 'svelte-navigator';
  import { user, loggedIn } from './lib/store';
  import axios from 'axios';

  let token = localStorage.getItem('token');
  if (token) {
    axios
      .get('http://localhost:5000/api/user', { headers: { token } })
      .then((res) => {
        $user = res.data.data;
      })
      .catch((e) => {
        console.log(e);
        localStorage.removeItem('token');
        $loggedIn = false;
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    $loggedIn = false;
  };
</script>

<main>
  <Router>
    {#if $loggedIn}
      <p>Đã đăng nhập</p>
      <p>{$user?.email || ''}</p>
      <button class="btn btn-danger" on:click={handleLogout}>Đăng xuất</button>
    {:else}
      <header>
        <Link to="/register" class="btn btn-primary">Đăng ký</Link>
        <Link to="/login" class="btn btn-primary">Đăng nhập</Link>
      </header>
    {/if}

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
