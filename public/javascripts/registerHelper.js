console.log(latLng);
console.log(userLocation);

/*function registerSplit(e) {
  if (userLocation == e.target.baselocation.value) {
    console.log('same hat');
    axios.post('/auth/register/tracking', {
      username: e.target.username.value,
      password: e.target.password.value, // this feels insecure
      name: e.target.name.value,
      baselocation: e.target.baselocation.value,
      latLng: latLng
    }).then((res) => axios.get('/dashboard'));
  } else {
    axios.post('/auth/register/manual', {
      username: e.target.username.value,
      password: e.target.password.value, // this feels insecure
      name: e.target.name.value,
      baselocation: e.target.baselocation.value,
    }).then((res) => {
      axios.get('/dashboard');
    });
  }
}*/

// (() => {
//   let registrationForm = document.getElementById('register');
//   registrationForm.addEventListener('submit', (e) => registerSplit(e));
// })();

