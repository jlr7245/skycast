console.log('tryin to locate u');

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(patchPosition);
  } else {
    console.log('nope');
    /// some kind of logic in here to get the user to manually input their data
  }
}

function patchPosition(position) {
  console.log(position);
  axios.patch('/', {
    lat: position.coords.latitude,
    long: position.coords.longitude
  }).then((res) => console.log(res.data))
    .catch((err) => console.log(error));
}


getLocation();