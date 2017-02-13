
function getLocation() {
  if (navigator.geolocation) {
      document.getElementById('intro').classList.add('hdn');
      document.getElementById('loader').classList.remove('hdn');
      navigator.geolocation.getCurrentPosition(patchPosition);
  } else {
    console.log('no location');
  }
}

function patchPosition(position) {
  axios.patch('/', {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }).then((res) => {
    document.getElementById('loader').classList.add('hdn');
    document.getElementById('ifresults').innerHTML = res.data;
  }).catch((err) => console.log(err));
}


getLocation();