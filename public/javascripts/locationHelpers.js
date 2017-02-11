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
  // function to get rid of the arrow
  console.log(position);
  axios.patch('/', {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }).then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}


getLocation();