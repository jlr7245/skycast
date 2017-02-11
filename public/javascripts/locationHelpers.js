console.log('tryin to locate u');

(() => { 
  let testForm = document.getElementById('test');
  testForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(e.target.coords);
    axios.patch('/', {coords: e.target.coords.value})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  });
})();



function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('nope');
  }
}
function showPosition(position) {
  console.log(position);
  let appropriateInput = document.getElementById('coordinput');
  appropriateInput.value = position.coords.latitude;
}


getLocation();