console.log('helpin you search');

function patchSearch(e) {
    e.preventDefault();
    axios.patch('/dashboard/search', {
        address: e.target.address.value,
    }).then((res) => addToPage(res.data))
    .catch((err) => console.log(err));
}

function addToPage(res) {
    console.log(res);
    let resultHolder = document.getElementById('resultholder');
    resultHolder.innerHTML = res;
}

(() => {
    let searchForm = document.getElementById('searchform');
    searchForm.addEventListener('submit', (e) => patchSearch(e));
})();