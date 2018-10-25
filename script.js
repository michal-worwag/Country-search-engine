var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');
var countryName = document.getElementById('country-name');

document.getElementById('search').addEventListener('click', searchCountries);

countryName.addEventListener('change', function(){
    searchCountries();
});

countryName.addEventListener('keyup', function(){
    searchCountries();
});

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
    .then(function(resp) {
        if (resp.ok){
            return resp.json();
        } else {
            return Promise.reject(resp)
        }
    })
    .then (showCountriesList)
    .catch(function(error) {
        if (error.status === 404) {
            alert('Country not found');
        }
    });
}


function showCountriesList(resp) {
    countriesList.innerHTML = '';
    var liEl = document.createElement('li');
    resp.forEach(function(item) {
        var liEl = document.createElement('li');
        liEl.innerHTML = '<div>' + item.name + ':' + '<br>' + ' - Capital city: ' + item.capital + '<br>' + ' - Native name: ' + item.nativeName + '</div>';
        countriesList.appendChild(liEl);
    });
}