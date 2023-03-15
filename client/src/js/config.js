// prod env
// let APIHOST = '';
let FILEHOST = '';

// test env
// let APIHOST = 'http://100.100.156.99:3000';   // dev env
let APIHOST = 'http://100.100.142.132:3333'; // prd env
// let FILEHOST = 'http://100.100.62.163:3333';

if(sessionStorage.islogin == undefined || sessionStorage.islogin != 'true') {
    location.href = '/index.html';
} else {
    // document.querySelector('section').removeAttribute('class');
}

// initiate navbar
function initNav(expandnum = 0) {
    // let nav = [{
    //     group: "智慧公路产品线",
    //     groupid: "road",
    //     expanded: false,
    //     pages: [{
    //         name: "城市交通",
    //         pageid: "city",
    //         page: "./city.html"
    //     },{
    //         name: "高速交通",
    //         pageid: "highway",
    //         page: "./highway.html"
    //     },{
    //         name: "大客流",
    //         pageid: "pedestrian",
    //         page: "./pedestrian.html"
    //     },{
    //         name: "公共软件",
    //         pageid: "commonsoft",
    //         page: "./commonsoft.html"
    //     },{
    //         name: "公共硬件",
    //         pageid: "commonhard",
    //         page: "./commonhard.html"
    //     }]
    // }, {
    //     group: "智慧建造产品线",
    //     groupid: "building",
    //     expanded: false,
    //     pages: []
    // }, {
    //     group: "智慧轨交产品线",
    //     groupid: "rail",
    //     expanded: false,
    //     pages: []
    // }, {
    //     group: "产品模块",
    //     groupid: "modules",
    //     expanded: false,
    //     pages: [{
    //         name: "应用软件",
    //         pageid: "softwares",
    //         page: "./softwares.html"
    //     },{
    //         name: "硬件目录",
    //         pageid: "hardwares",
    //         page: "./hardwares.html"
    //     },{
    //         name: "功能清单",
    //         pageid: "components",
    //         page: "./components.html"
    //     }]
    // }];

    let nav = JSON.parse(sessionStorage.getItem('role'));
    nav[expandnum].expanded = true;
    let navbartmp = `<a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#supremind"/></svg>
                        <span class="fs-5 fw-semibold">产品信息系统</span>
                    </a>
                    <ul class="list-unstyled ps-0">`;
    for(let group of nav) {
        if(group.access) {
            let tmp = '';
            tmp += `<li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#${group.groupid}-collapse" aria-expanded="${group.expanded}">
                            ${group.group}
                        </button>
                        <div class="collapse${group.expanded?' show':''}" id="${group.groupid}-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">`;
            for(let page of group.pages) {
                tmp += `<li><a href="${page.page}" class="link-dark d-inline-flex text-decoration-none rounded" target="_self">${page.name}</a></li>`
            }
        
            navbartmp += tmp + `</ul></div></li>`;
        }
    }
    navbartmp += `<li class="border-top my-3"></li>
                <li class="mb-1">
                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                    账户
                </button>
                <div class="collapse" id="account-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">账号信息</a></li>
                        <li><a href="/index.html" class="link-dark d-inline-flex text-decoration-none rounded" target="_self" onclick="(e=>{sessionStorage.clear();})()">退出登录</a></li>
                    </ul>
                </div>
            </li></ul>`
    document.querySelector("#navbar").innerHTML = navbartmp + document.querySelector("#navbar").innerHTML;
}




// common HTTP request tools
let headers = new Headers();
headers.append('Content-Type', 'application/json');
let postBody = {
    method: 'POST',
    headers: headers,
    body: null
};

function closeModal(event) {
    event.target.closest('.wa-modal-openfile').classList.toggle('component-hidden');
}