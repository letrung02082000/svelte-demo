import { writable, derived } from 'svelte/store';
let token = localStorage.getItem('token');
export const user = writable(null);
export const loggedIn = writable(token ? true : false);
