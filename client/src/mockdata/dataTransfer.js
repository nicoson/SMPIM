//  应用软件数据获取
//  数据结构：
// [{
//     "module": "路况监测",
//     "moduleCode": "",
//     "info": "",
//     "option": "", 
//     "notes": "",
//     "price": "",
//     "component": [{
//         "name":"",
//         "subcomponent": [{
//             "name": "",
//             "description": ""
//         }]
//     }]
// }]
let table = document.querySelectorAll('tr');

let DATA = {
    name: null,
    data: []
};

for (let i=2; i<table.length; i++) {
    let td = [].slice.apply(table[i].querySelectorAll('td'));
    td.shift(); // remove empty cell
    console.log(td);
    if(table[i].style.display == 'none') continue;
    let datum = null;
    switch(td.length) {
        case 10: 
            DATA.name = td[0].innerText;
            datum = {
                "module": td[1].innerText,
                "moduleCode": td[2].innerText,
                "info": td[3].innerText,
                "option": td[7].innerText, 
                "notes": td[8].innerText,
                "price": td[9].innerText,
                "component": [{
                    "name":td[4].innerText,
                    "subcomponent": [{
                        "name": td[5].innerText,
                        "description": td[6].innerText
                    }]
                }]
            }
            DATA.data.push(datum);
            break;
        case 2:
            datum = {
                "name": td[0].innerText,
                "description": td[1].innerText
            };
            DATA.data.at(-1).component.at(-1).subcomponent.push(datum);
            break;
        case 3:
            datum = {
                "name":td[0].innerText,
                "subcomponent": [{
                    "name": td[1].innerText,
                    "description": td[2].innerText
                }]
            };
            DATA.data.at(-1).component.push(datum);
            break;
        case 9: 
            datum = {
                "module": td[0].innerText,
                "moduleCode": td[1].innerText,
                "info": td[2].innerText,
                "option": td[6].innerText, 
                "notes": td[7].innerText,
                "price": td[8].innerText,
                "component": [{
                    "name":td[3].innerText,
                    "subcomponent": [{
                        "name": td[4].innerText,
                        "description": td[5].innerText
                    }]
                }]
            }
            DATA.data.push(datum);
            break;
        default:
            console.log('!!!!!! error');
    };
}


//  硬件目录数据获取
//  数据结构：
// [{
//     "name": "",
//     "alias": "",
//     "brief": "",
//     "brief": "", 
//     "hardware_spec": "",
//     "pack_spec": "",
//     "info": "",
//     "price": "",
//     "sales_quote":"",
//     "business_quote": "",
//     "full_name": "",
//     "img": "",
//     "anyshare": ""
// }]

table = document.querySelectorAll('tr');

DATA = {
    name: null,
    data: []
};

for (let i=2; i<table.length; i++) {
    let td = [].slice.apply(table[i].querySelectorAll('td'));
    console.log(td);
    if(table[i].style.display == 'none') continue;
    
    DATA.data.push({
        "name": td[1].innerText,
        "alias": td[2].innerText,
        "brief": td[3].innerText,
        "brief": td[4].innerText, 
        "hardware_spec": td[5].innerText,
        "pack_spec": td[6].innerText,
        "info": td[7].innerText,
        "price": td[8].innerText,
        "sales_quote":td[9].innerText,
        "business_quote": td[10].innerText,
        "full_name": td[11].innerText,
        "img": "",
        "anyshare": td[13].innerText
    });
}



//  功能清单数据获取
//  数据结构：
// [{
//     "module": "",
//     "moduleCode": "",
//     "info": "",
//     "option": "", 
//     "notes": "",
//     "price": "",
//     "component": [{
//         "name":"",
//         "subcomponent": [{
//             "name": "",
//             "description": ""
//         }]
//     }]
// }]

table = document.querySelectorAll('tr');
DATA = {name: null,data: [{"module": "","moduleCode": "","info": "","option": "", "notes": "","price": "","component": []}]};

index = [4,30]; //[50,71]   [87,111]
item = 0;
for (let i=index[0]; i<index[1]; i++) {
    let td = [].slice.apply(table[i].querySelectorAll('td'));
    // td.shift(); // remove empty cell
    console.log(td);
    if(table[i].style.display == 'none') continue;
    let datum = null;
    switch(td.length) {
        case 12: 
            // DATA.name = td[0].innerText;
            datum = {
                "name":td[2+item*4].innerText,
                "subcomponent": [{
                    "name": td[2+item*4].innerText,
                    "description": td[3+item*4].innerText
                }]
            }
            DATA.data[0].component.push(datum);
            break;
        case 9:
            datum = {
                "name":td[2+item*4].innerText,
                "subcomponent": [{
                    "name": td[2+item*4].innerText,
                    "description": td[3+item*4].innerText
                }]
            }
            DATA.data[0].component.push(datum);
            break;
        default:
            console.log('!!!!!! error');
    };
}


//  车型识别功能清单数据获取
//  数据结构：
// [{
//     "module": "",
//     "moduleCode": "",
//     "info": "",
//     "option": "", 
//     "notes": "",
//     "price": "",
//     "component": [{
//         "name":"",
//         "subcomponent": [{
//             "name": "",
//             "description": ""
//         }]
//     }]
// }]

table = document.querySelectorAll('tr');

DATA = {
    name: null,
    data: [{
        "module": "",
        "moduleCode": "",
        "info": "",
        "option": "", 
        "notes": "",
        "price": "",
        "component": []
    }]
};

index = [3,16];
for (let i=index[0]; i<index[1]; i++) {
    let td = [].slice.apply(table[i].querySelectorAll('td'));
    // td.shift(); // remove empty cell
    console.log(td);
    if(table[i].style.display == 'none') continue;
    let datum = null;
    switch(td.length) {
        case 4: 
            datum = {
                "name":td[1].innerText,
                "subcomponent": [{
                    "name": td[2].innerText,
                    "description": td[3].innerText
                }]
            };
            DATA.data.at(-1).component.push(datum);
            break;
        case 3:
            datum = {
                "name": td[1].innerText,
                "description": td[2].innerText
            };
            DATA.data.at(-1).component.at(-1).subcomponent.push(datum);
            break;
        
        default:
            console.log('!!!!!! error');
    };
}


// products
table = document.querySelectorAll('tr');
DATA = [];

for (let i=2; i<table.length; i++) {
    if(table[i].style.display == 'none') continue;
    let td = table[i].querySelectorAll('td');
    if(td.length < 20) continue;
    console.log(td);
    let timestamp = new Date().getTime();
    let datum = {
        uid: 'product_road_city_' + (timestamp + i),
        type: 'product_road_city',
        name: td[6].innerText,
        year: '2023-01',
        create: new Date(),
        info: {
            order: i,
            branch: td[1].innerText,
            prd_type: td[2].innerText,
            status: td[3].innerText,
            delist_date: td[4].innerText,
            catagory: td[5].innerText, 
            prd_branch: td[7].innerText,
            model: td[8].innerText,
            brief: td[9].innerText,
            // specs: td[10].innerText,
            refer: null,
            specs: null,
            materials: td[11].innerText,
            poster: td[12].innerText,
            poster_anyshare: td[13].innerText,
            packing_list: td[14].innerText,
            certification: td[15].innerText,
            performance: td[16].innerText ? (td[16].innerText + '\n可靠性：MTBF>50000h，MTTR<2h，\n可用性>99.99%'):'',
            hardware: td[17].innerText,
            unit: td[18].innerText,
            price: td[19].innerText,
            marketing_price: td[20].innerText,
            business_offer: td[21].innerText,
            option: td[22].innerText,
            notes: td[23].innerText
        }
    }
    DATA.push(datum);
}

console.log(JSON.stringify(DATA));



// 硬件信息
let info = {
    uid: 'hardwares_1677747915491',
    type: 'hardwares',
    name: '超聚变1卡GPU服务器（2023款）',   // 硬件名称
    model: 'SMG-2012-A',  // 硬件型号
    brief: '1卡/2U/SMG-2012-A',
    year: '2023-04',
    create: '2023-03-02T09:05:06.525Z',
    info: {
        model_full: 'SMG-2012-0064SSD004000-4310-R50', // 内部硬件型号
        server_size: '2U',
        server_type: '机架式服务器',   // 整机类型
        CPU: 'Intel Xeon Silver 4310 处理器，12核/24线程，主频2.1GHz，功耗120W',    //
        CPU_num: 2,
        GPU: 'NVIDIA Tesla T4',
        GPU_num: 2,
        NPU: 'NPU处理器，40 TOPS',
        NPU_num: 1,
        memory: '64GB',
        memory_modal: 'DDR4 3200MHz RDIMM',
        storage_sys: '2块480GB SSD，支持RAID1（系统盘）',
        storage_data: '2块1.92TB SSD，支持RAID1（数据盘）',
        storage_notes: '整机最大可配置12块2.5寸或3.5寸热插拔硬盘，支持直通、RAID 0/1/10/5/50/6/60等多种存储方案',
        network_interface: '标配2个千兆以太网电口 \n标配1个千兆RJ45管理网口，支持IPMI设备远程控制管理',
        display_interface: '标配1个VGA接口',
        other_interface: 'TF卡接口 1个，RS-485接口 1个，串口 1个',
        USB: '标配4个USB接口，两个前置，两个后置',
        power_supply: '2个900W高效白金热插拔电源，支持1+1冗余，电压范围100-240V/50Hz',
        power: '≤800W',
        operation_temperature: '5℃～45℃',
        storage_temperature: '-10℃~55℃',
        operation_humidity: '10%~90%无冷凝',
        storage_humidity: '25%~50%无冷凝',
        chassis_size: '86.1mm(高)×447mm(宽)×790mm(深)',
        package_size: '1035mm(长)×642mm(宽)×255mm(高)',
        package: '双层纸质中性包装',
        net_weight: '38kg(满配，不含导轨)',
        accessory: '1副免工具安装上架导轨',
        lead_time: '4周',
        warranty: '3年',
        poster: 'http://....'
    }
}