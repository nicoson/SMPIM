if(sessionStorage.islogin != undefined && sessionStorage.islogin == 'true') {
    location.href = '/city.html';
} else {
    // document.querySelector('section').removeAttribute('class');
}


let role = {
    admin: [{
        group: "智慧公路产品线",
        groupid: "road",
        expanded: false,
        access: true,
        edit: true,
        pages: [{
            name: "城市交通",
            pageid: "city",
            page: "./city.html"
        },{
            name: "高速交通",
            pageid: "highway",
            page: "./highway.html"
        },{
            name: "大客流",
            pageid: "pedestrian",
            page: "./pedestrian.html"
        },{
            name: "公共软件",
            pageid: "commonsoft",
            page: "./commonsoft.html"
        },{
            name: "公共硬件",
            pageid: "commonhard",
            page: "./commonhard.html"
        }]
    }, {
        group: "智慧建造产品线",
        groupid: "building",
        expanded: false,
        access: true,
        edit: true,
        pages: []
    }, {
        group: "智慧轨交产品线",
        groupid: "rail",
        expanded: false,
        access: true,
        edit: true,
        pages: []
    }, {
        group: "产品模块",
        groupid: "modules",
        expanded: false,
        access: true,
        edit: true,
        pages: [{
            name: "应用软件",
            pageid: "softwares",
            page: "./softwares.html"
        },{
            name: "硬件目录",
            pageid: "hardwares",
            page: "./hardwares.html"
        },{
            name: "功能清单",
            pageid: "components",
            page: "./components.html"
        }]
    }],
    user: [{
        group: "智慧公路产品线",
        groupid: "road",
        expanded: false,
        access: true,
        edit: false,
        pages: [{
            name: "城市交通",
            pageid: "city",
            page: "./city.html"
        },{
            name: "高速交通",
            pageid: "highway",
            page: "./highway.html"
        },{
            name: "大客流",
            pageid: "pedestrian",
            page: "./pedestrian.html"
        },{
            name: "公共软件",
            pageid: "commonsoft",
            page: "./commonsoft.html"
        },{
            name: "公共硬件",
            pageid: "commonhard",
            page: "./commonhard.html"
        }]
    }, {
        group: "智慧建造产品线",
        groupid: "building",
        expanded: false,
        access: false,
        edit: false,
        pages: []
    }, {
        group: "智慧轨交产品线",
        groupid: "rail",
        expanded: false,
        access: false,
        edit: false,
        pages: []
    }, {
        group: "产品模块",
        groupid: "modules",
        expanded: false,
        access: false,
        edit: false,
        pages: [{
            name: "应用软件",
            pageid: "softwares",
            page: "./softwares.html"
        },{
            name: "硬件目录",
            pageid: "hardwares",
            page: "./hardwares.html"
        },{
            name: "功能清单",
            pageid: "components",
            page: "./components.html"
        }]
    }]
}

let userlist = {
    admin: {
        name: 'admin',
        psd: 'admin',
        role: role.admin
    },
    user01: {
        name: 'user01',
        psd: 'user01',
        role: role.user
    }
}

document.querySelector('#pim_submit').addEventListener('click', function(e) {
    let user = document.querySelector('#pim_username').value.trim();
    let psd = document.querySelector('#pim_psd').value.trim()
    if(userlist[user].psd == psd) {
        sessionStorage.setItem('islogin','true');
        sessionStorage.setItem('role', JSON.stringify(userlist[user].role));
        location.href = '/city.html';
    } else {
        document.querySelector('#pim_alert').removeAttribute('class');
    }
});

