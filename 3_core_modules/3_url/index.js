const url = require('url');
const address = 'https://www.murilorusso.com.br?id=10';
const parseUrl = new  url.URL(address);


console.log(parseUrl.host);
console.log(parseUrl.pathname);
console.log(parseUrl.search);
console.log(parseUrl.searchParams);
console.log(parseUrl.searchParams.get('id'));




