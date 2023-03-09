
let tb = document.querySelectorAll('table');

let DATA = [];
let project = {
    name: null,
    code: null,
    info: null
};

let table = tb[tb.length-1].querySelectorAll('tr');

for (let i=0; i<table.length; i++) {
    let td = [].slice.apply(table[i].querySelectorAll('td'));
    console.log(td);
    // if(table[i].style.display == 'none') continue;
    let datum = null;
    switch(td.length) {
        case 7: 
            datum = {
                "item": td[1].innerText.replaceAll('\n',''),
                "desc": td[2].innerText.replaceAll('\n',''),
                "model": td[3].innerText.replaceAll('\n',''),
                "amount": td[4].innerText.replaceAll('\n',''),
                "price": td[5].innerText.replaceAll('\n',''),
                "discount": td[6].innerText.replaceAll('\n',''),
                
                "winner": ""
            }
            DATA.push(datum);
            break;
        default:
            console.log('========> no data： ', td.length);
    };
}

