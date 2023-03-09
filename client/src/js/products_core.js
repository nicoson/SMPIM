class ListTable {
    constructor(type='softwares', apiList={}, editable) {
        this.data = null;
        this.ele = null;
        this.editable = editable;
        this.type = type;
        this.type_name = null;
        switch(type) {
            case 'product_road_city': this.type_name = '城市交通'; break;
            case 'product_road_highway': this.type_name = '高速交通'; break;
            case 'product_road_pedestrian': this.type_name = '大客流'; break;
            case 'product_road_commonsoft': this.type_name = '公共软件'; break;
            case 'product_road_commonhard': this.type_name = '公共硬件'; break;
            default: break;
        }
        this.api = {
            get_item_list: apiList.getitemlist,
            get_item_detail: apiList.getitemdetail,
            update_item: apiList.updateitem,
            delete_item: apiList.deleteitem,
            get_drop_list: apiList.drop_list,
        };
        // this.init(title, ele, sw);
    }

    async initListTable(ele) {
        this.ele = ele;
        let items = await this.getItemList();
        this.mainTable_gen(ele, items);
    }

    async initNewModal() {
        this.data = {
            uid: `${this.type}_${new Date().getTime()}`,
            type: this.type,
            create: new Date(),
            info: {
                branch: this.type_name,
            }
        };
        document.getElementById('modal_title_new').innerHTML = "新增产品";
        document.getElementById('id_branch').value = this.type_name;
        document.getElementById('id_name').value = null;
        document.getElementById('id_model').value = null;
        document.getElementById('id_status').value = '量产';
        document.getElementById('id_year').value = new Date().toLocaleDateString();
        document.getElementById('id_order').value = 0;
        document.getElementById('id_delist_date').value = '在售';
        document.getElementById('id_prd_type').value = '软硬一体设备';
        document.getElementById('id_prd_branch').value = null;
        document.getElementById('id_hardware').value = null;
        document.getElementById('id_performance').value = null;
        document.getElementById('id_materials').value = null;
        document.getElementById('id_unit').value = '台';
        document.getElementById('id_refer').value = null;
        document.getElementById('id_refer_module').value = null;
        document.getElementById('id_brief').value = null;
        document.getElementById('id_specs').value = null;
        document.getElementById('id_certification').value = null;
        document.getElementById('id_price').value = null;
        document.getElementById('id_marketing_price').value = null;
        document.getElementById('id_business_offer').value = null;
        document.getElementById('id_notes').value = null;
        
        await this.arrangeDropList();
    }

    async initEditModal(data=null) {
        this.data = data;
        document.getElementById('modal_title_new').innerHTML = "编辑";
        document.getElementById('id_branch').value = this.type_name;
        document.getElementById('id_name').value = data.name;
        document.getElementById('id_model').value = data.info.model;
        document.getElementById('id_status').value = data.info.status;
        document.getElementById('id_year').value = data.year;
        document.getElementById('id_order').value = data.info.order;
        document.getElementById('id_delist_date').value = data.info.delist_date;
        document.getElementById('id_prd_type').value = data.info.prd_type
        document.getElementById('id_prd_branch').value = data.info.prd_branch;
        document.getElementById('id_performance').value = data.info.performance;
        document.getElementById('id_materials').value = data.info.materials;
        document.getElementById('id_unit').value = data.info.unit;
        document.getElementById('id_brief').value = data.info.brief;
        document.getElementById('id_specs').value = data.info.specs;
        document.getElementById('id_certification').value = data.info.certification;
        document.getElementById('id_price').value = data.info.price;
        document.getElementById('id_marketing_price').value = data.info.marketing_price;
        document.getElementById('id_business_offer').value = data.info.business_offer;
        document.getElementById('id_notes').value = data.info.notes;

        await this.arrangeDropList(data.info.refer);

        document.getElementById('id_hardware').value = data.info.hardware;
        document.getElementById('id_refer').value = data.info.refer;
        document.getElementById('id_refer_module').value = data.info.refer_module;

        this.updateImgInfo(data.info.hardware);
    }

    async arrangeDropList(uid=null) {
        let option_hardware = await this.getDropList(this.api.get_drop_list, 'hardwares');
        let option_software = await this.getDropList(this.api.get_drop_list, 'softwares');
        let option_component = await this.getDropList(this.api.get_drop_list, 'components');

        let tmp = '<option value="null">无</option>';
        for(let i=0; i<option_hardware.length; i++) {
            tmp += `<option value="${option_hardware[i].uid}">${option_hardware[i].brief}</option>`;
        }
        document.getElementById('id_hardware').innerHTML = tmp;

        tmp = '<option value="null">无</option>';
        for(let i=0; i<option_software.length; i++) {
            tmp += `<option value="${option_software[i].uid}">${option_software[i].name}</option>`;
        }
        for(let i=0; i<option_component.length; i++) {
            tmp += `<option value="${option_component[i].uid}">${option_component[i].name}</option>`;
        }
        document.getElementById('id_refer').innerHTML = tmp;

        await this.updateModuleDropList(uid);
    }

    getDropList(url, type) {
        return new Promise(function (resolve, reject) {
            fetch(`${url}/${type}`).then(e => e.json()).then(res => {
                if(res.code == 200) {
                    resolve(res.data);
                }
            });
        });
    }

    async updateModuleDropList(uid) {
        let tmp = '';
        if(uid == 'null') {
            document.getElementById('id_refer_module').innerHTML = '';
        } else if(uid) {
            let item = await this.getDetailData(uid);
            tmp += '<option value="all">全部</option>';
            this.data.info.catagory = item.name;
            if(item.modules.length > 1 || item.modules[0].name) {
                for(let i=0; i<item.modules.length; i++) {
                    tmp += `<option value="${item.modules[i].code}">${item.modules[i].name}(${item.modules[i].code})</option>`;
                }
            }
            document.getElementById('id_refer_module').innerHTML = tmp;
        }
    }

    updateData() {
        this.data.create = new Date();
        this.arrangeData();
        
        postBody.body = JSON.stringify({
            data: this.data
        });
        fetch(this.api.update_item, postBody).then(e => e.json()).then(res => {
            if(res.code == 200) {
                console.log(res);
                document.getElementById('module_edit_close').click();
                this.initListTable(this.ele);
            }
        });
    }

    // 从 DOM 变量转换为可以提交存储的数据格式
    arrangeData() {
        this.data.name = document.getElementById('id_name').value || null;
        this.data.info.model = document.getElementById('id_model').value || null;
        this.data.info.status = document.getElementById('id_status').value || null;
        this.data.year = document.getElementById('id_year').value || null;
        this.data.info.order = document.getElementById('id_order').value || null;
        this.data.info.delist_date = document.getElementById('id_delist_date').value || null;
        this.data.info.prd_type = document.getElementById('id_prd_type').value || null;
        this.data.info.prd_branch = document.getElementById('id_prd_branch').value || null;
        this.data.info.hardware = document.getElementById('id_hardware').value || null;
        this.data.info.performance = document.getElementById('id_performance').value || null;
        this.data.info.materials = document.getElementById('id_materials').value || null;
        this.data.info.unit = document.getElementById('id_unit').value || null;
        this.data.info.refer = document.getElementById('id_refer').value || null;
        this.data.info.refer_module = document.getElementById('id_refer_module').value || null;
        this.data.info.brief = document.getElementById('id_brief').value || null;
        this.data.info.specs = document.getElementById('id_specs').value || null;
        this.data.info.certification = document.getElementById('id_certification').value || null;
        this.data.info.price = document.getElementById('id_price').value || null;
        this.data.info.marketing_price = document.getElementById('id_marketing_price').value || null;
        this.data.info.business_offer = document.getElementById('id_business_offer').value || null;
        this.data.info.notes = document.getElementById('id_notes').value || null;
    }

    getItemList() {
        return new Promise(function (resolve, reject) {
            fetch(`${this.api.get_item_list}/${this.type}`).then(e => e.json()).then(res => {
                if(res.code == 200) {
                    resolve(res.data);
                }
            });
        }.bind(this));
    }
    
    getDetailData(uid) {
        return new Promise(function (resolve, reject) {
            postBody.body = JSON.stringify({
                uid: uid
            });
            fetch(this.api.get_item_detail, postBody).then(e => e.json()).then(res => {
                if(res.code == 200) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            }).catch(err => reject(res));
        }.bind(this));
    }

    async updateImgInfo(uid) {
        let item = await this.getDetailData(uid);
        if(item) {
            this.data.info.poster = item.info.poster;
            document.getElementById('id_img_poster').innerHTML = `<img src="${this.data.info.poster}" class="img-thumbnail" alt="...">`;
        } else {
            document.getElementById('id_img_poster').innerHTML = `<div><p>选择硬件配置后展示产品图片</p></div>`;
        }
    }
    
    // 生成主表
    mainTable_gen(ele, data) {
        // let tmp = this.mainTable_gen_core(data, {js_order: true,js_branch: true,js_prd_type: true,js_status: true,js_delist_date: true,js_catagory: true,js_name: true,js_prd_branch: true,js_model: true,js_brief: true,js_specs: true,js_materials: true,js_poster: true,js_poster_anyshare: true,js_packing_list: true,js_certification: true,js_performance: true,js_hardware: true,js_unit: true,js_price: true,js_marketing_price: true,js_business_offer: true,js_option: true,js_notes: true,js_update: true,js_operation: true});
        let tmp = this.mainTable_gen_core(data, {js_order: true,js_branch: true,js_prd_type: true,js_status: true,js_delist_date: true,js_catagory: true,js_name: true,js_prd_branch: true,js_model: true,js_brief: true,js_specs: false,js_materials: true,js_poster: true,js_poster_anyshare: true,js_packing_list: false,js_certification: true,js_performance: false,js_hardware: false,js_unit: true,js_price: true,js_marketing_price: true,js_business_offer: true,js_option: true,js_notes: true,js_update: true,js_operation: this.editable});
        // let tmp = this.mainTable_gen_core(data, {js_order: false,js_branch: false,js_prd_type: false,js_status: false,js_delist_date: false,js_catagory: false,js_name: true,js_prd_branch: true,js_model: true,js_brief: false,js_specs: false,js_materials: false,js_poster: true,js_poster_anyshare: false,js_packing_list: false,js_certification: false,js_performance: false,js_hardware: false,js_unit: false,js_price: true,js_marketing_price: true,js_business_offer: true,js_option: true,js_notes: true,js_update: true,js_operation: this.editable});
        ele.innerHTML = tmp;
        let btn = document.querySelectorAll('.js-btn-delete');
        for(let i=0; i<btn.length; i++) {
            btn[i].addEventListener('click', function(event) {
                this.deleteSoftware(event);
            }.bind(this));
        }
    }

    mainTable_gen_core(data,col={js_order: true,
                                js_branch: true,
                                js_prd_type: true,
                                js_status: true,
                                js_delist_date: true,
                                js_catagory: true,
                                js_name: true,
                                js_prd_branch: true,
                                js_model: true,
                                js_brief: true,
                                js_specs: true,
                                js_materials: true,
                                js_poster: true,
                                js_poster_anyshare: true,
                                js_packing_list: true,
                                js_certification: true,
                                js_performance: true,
                                js_hardware: true,
                                js_unit: true,
                                js_price: true,
                                js_marketing_price: true,
                                js_business_offer: true,
                                js_option: true,
                                js_notes: true,
                                js_update: true,
                                js_operation: true}) {
        let tmp = `<thead class="table-secondary"><tr>`;
        if(col.js_order)            tmp += `<th style="width: 50px;">序号</th>`;
        if(col.js_branch)           tmp += `<th style="width: 80px;">关联业务</th>`;
        if(col.js_prd_type)         tmp += `<th style="width: 100px;">产品形态</th>`;
        if(col.js_status)           tmp += `<th style="width: 50px;">状态</th>`;
        if(col.js_delist_date)      tmp += `<th style="width: 80px;">下架时间</th>`;
        if(col.js_catagory)         tmp += `<th style="width: 80px;">产品类别</th>`;
        if(col.js_name)             tmp += `<th style="width: 80px;">产品名称</th>`;
        if(col.js_prd_branch)       tmp += `<th style="width: 100px;">产品分支版本</th>`;
        if(col.js_model)            tmp += `<th style="width: 120px;">产品型号</th>`;
        if(col.js_brief)            tmp += `<th style="width: 200px;">产品简介</th>`;
        if(col.js_specs)            tmp += `<th style="width: 200px;">规格参数</th>`;
        if(col.js_materials)        tmp += `<th style="width: 120px;">产品彩页链接</th>`;
        if(col.js_poster)           tmp += `<th style="width: 150px;">产品图片</th>`;
        if(col.js_poster_anyshare)  tmp += `<th style="width: 80px;">图片链接</th>`;
        if(col.js_packing_list)     tmp += `<th style="width: 200px;">出货规范</th>`;
        if(col.js_certification)    tmp += `<th style="width: 200px;">国标/行标认证</th>`;
        if(col.js_performance)      tmp += `<th style="width: 80px;">性能规格</th>`;
        if(col.js_hardware)         tmp += `<th style="width: 80px;">配套硬件</th>`;
        if(col.js_unit)             tmp += `<th style="width: 80px;">产品销售单位</th>`;
        if(col.js_price)            tmp += `<th style="width: 120px;">产品目录价<br />（单位：元）</th>`;
        if(col.js_marketing_price)  tmp += `<th style="width: 120px;">销售底价<br />（单位：元）</th>`;
        if(col.js_business_offer)   tmp += `<th style="width: 120px;">商务低价<br />（单位：元）</th>`;
        if(col.js_option)           tmp += `<th style="width: 80px;">选配说明</th>`;
        if(col.js_notes)            tmp += `<th style="width: 200px;">其他说明</th>`;
        if(col.js_update)           tmp += `<th style="width: 80px;">更新时间</th>`;
        if(col.js_operation)        tmp += `<th style="width: 120px;">操作</th>`;
        tmp += `</tr></thead><tbody>`;

        for(let i=0; i<data.length; i++) {
            tmp += `<tr data-software-id = "${data[i].uid}" data-bs-toggle="modal" data-bs-target="#modal_detail">`;
            if(col.js_order)            tmp += `<td><p class="mb-0">${i+1}</p></td>`;
            if(col.js_branch)           tmp += `<td><p class="mb-0">${data[i].info.branch || '-'}</p></td>`;
            if(col.js_prd_type)         tmp += `<td><p class="mb-0">${data[i].info.prd_type || '-'}</p></td>`;
            if(col.js_status)           tmp += `<td><p class="mb-0">${data[i].info.status || '-'}</p></td>`;
            if(col.js_delist_date)      tmp += `<td><p class="mb-0">${data[i].info.delist_date || '-'}</p></td>`;
            if(col.js_catagory)         tmp += `<td><p class="mb-0">${data[i].info.catagory || '-'}</p></td>`;
            if(col.js_name)             tmp += `<td><p class="mb-0">${data[i].name || '-'}</p></td>`;
            if(col.js_prd_branch)       tmp += `<td><p class="mb-0">${data[i].info.prd_branch || '-'}</p></td>`;
            if(col.js_model)            tmp += `<td><p class="mb-0">${data[i].info.model || '-'}</p></td>`;
            if(col.js_brief)            tmp += `<td><p class="mb-0">${data[i].info.brief ? data[i].info.brief.replaceAll('\n', '<br />') : '-'}</p></td>`;
            if(col.js_specs)            tmp += `<td><p class="mb-0">${data[i].info.specs || '-'}</p></td>`;
            if(col.js_materials)        tmp += `<td><p class="mb-0">${data[i].info.materials || '-'}</p></td>`;
            if(col.js_poster)           tmp += `<td><img class="mb-0 img-thumbnail" src="${data[i].info.poster || '-'}"></td>`;
            if(col.js_poster_anyshare)  tmp += `<td><p class="mb-0">${data[i].info.poster_anyshare || '-'}</p></td>`;
            if(col.js_packing_list)     tmp += `<td><p class="mb-0">${data[i].info.packing_list ? data[i].info.packing_list.replaceAll('\n', '<br />') : '-'}</p></td>`;
            if(col.js_certification)    tmp += `<td><p class="mb-0">${data[i].info.certification ? data[i].info.certification.replaceAll('\n', '<br />') : '-'}</p></td>`;
            if(col.js_performance)      tmp += `<td><p class="mb-0">${data[i].info.performance ? data[i].info.performance.replaceAll('\n', '<br />') : '-'}</p></td>`;
            if(col.js_hardware)         tmp += `<td><p class="mb-0">${data[i].info.hardware || '-'}</p></td>`;
            if(col.js_unit)             tmp += `<td><p class="mb-0">${data[i].info.unit || '-'}</p></td>`;
            if(col.js_price)            tmp += `<td><p class="mb-0">${data[i].info.price || '-'}</p></td>`;
            if(col.js_marketing_price)  tmp += `<td><p class="mb-0">${data[i].info.marketing_price || '-'}</p></td>`;
            if(col.js_business_offer)   tmp += `<td><p class="mb-0">${data[i].info.business_offer || '-'}</p></td>`;
            if(col.js_option)           tmp += `<td><p class="mb-0">${data[i].info.option || '-'}</p></td>`;
            if(col.js_notes)            tmp += `<td><p class="mb-0">${data[i].info.notes ? data[i].info.notes.replaceAll('\n', '<br />') : '-'}</p></td>`;
            if(col.js_update)           tmp += `<td><p class="mb-0">${data[i].update ? new Date(data[i].update).toLocaleString().slice(0,18) : '-'}</p></td>`;
            if(col.js_operation)        tmp += `<td><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal_edit" data-software-id = "${data[i].uid}" data-modeltype="edit">编辑</button> <button class="btn btn-danger btn-sm js-btn-delete" data-bs-toggle="modal" data-bs-target="#" data-software-id="${data[i].uid}"">删除</button></td>`;
            tmp += `</tr>`;
        }
        
        tmp += `</tbody>`

        return tmp;
    }

    
    deleteSoftware(event) {
        // event.stopPropagation();
        // event.preventDefault();
        // console.log(event.relatedTarget);
        let uid = event.target.dataset.softwareId;
        let cf = confirm("是否确认删除该应用软件信息？删除后将无法恢复，请确认！");
        if (cf == true){
            postBody.body = JSON.stringify({
                uid: uid,
                type: this.type
            });
            fetch(this.api.delete_item, postBody).then(e => e.json()).then(res => {
                if(res.code == 200) {
                    // resolve(res.data);
                    this.initListTable(this.ele);
                } else {
                    reject(res);
                    console.log(res);
                }
            }).catch(err => console.log(err));
        }
    }
    
    // 查看应用软件的详细信息
    async gen_subtable(data) {
        let hardware = null;
        let hardware_brief = '';
        let hardware_img = '';
        let packing_list = '';
        let specs = '';
        let option = '';
        let title = ['一','二','三','四','五'];
        if(data.info.hardware != 'null') {
            hardware = await this.getDetailData(data.info.hardware);
            if(hardware) {
                hardware_brief = hardware.brief;
                hardware_img = hardware.info.poster;
                packing_list = hardware.info.package_size + '<br />' + hardware.info.shipping_list;
            }
        }

        if(data.info.refer != null && data.info.refer != 'null') {
            let software = await this.getDetailData(data.info.refer);
            specs += `${title.shift()}. 软件功能：<br />`;
            if(data.info.refer_module == 'all') {
                for(let i=0; i<software.modules.length; i++) {
                    specs += `${i+1}. ${software.modules[i].name} <br \>`;
                    for(let j=0; j<software.modules[i].component.length; j++) {
                        specs += `${i+1}.${j+1} ${software.modules[i].component[j].name}：<br \>`;
                        for(let k=0; k<software.modules[i].component[j].subcomponent.length; k++) {
                            specs += `${software.modules[i].component[j].subcomponent[k].description ? software.modules[i].component[j].subcomponent[k].description.replaceAll('\\n', '<br />') : '-'}<br \>`;
                        }
                    }
                }
            } else if(data.info.refer_module != 'null'){
                for(let i=0; i<software.modules.length; i++) {
                    if(software.modules[i].code == data.info.refer_module) {
                        option = software.modules[i].option == "1" ? "必选":"可选";
                        for(let j=0; j<software.modules[i].component.length; j++) {
                            specs += `${j+1} ${software.modules[i].component[j].name}：<br \>`;
                            for(let k=0; k<software.modules[i].component[j].subcomponent.length; k++) {
                                specs += `${software.modules[i].component[j].subcomponent[k].description}<br \>`;
                            }
                        }
                        break;
                    }
                }
            }
            specs += '<br \><br \>';
        }
        
        
        if(data.info.hardware != "null" && hardware != null) {
            specs += `${title.shift()}. 硬件参数：<br />`;
            specs += `
                CPU：${hardware.info.CPU_num} * ${hardware.info.CPU} <br />
                内存：${hardware.info.memory}, ${hardware.info.memory_model} <br />
                硬盘：${hardware.info.storage_sys}, ${hardware.info.storage_data} <br />
                网卡：${hardware.info.network_interface} <br />
                GPU：${hardware.info.GPU_num} * ${hardware.info.GPU} <br />
                机型：${hardware.info.server_size} <br />
                重量：${hardware.info.net_weight} <br />
                功率：${hardware.info.power} <br />
                电源：${hardware.info.power_supply} <br />
                `;

                specs += `<br \><br \>`;
        }

        if(data.info.performance != null) {
            specs += `${title.shift()}. 分析性能：<br />
                ${data.info.performance.replaceAll('\n', '<br />')} <br /><br />`;
        }

        if(data.info.specs != null) {
            specs += `${title.shift()}. 规格说明：<br />
            ${data.info.specs.replaceAll('\n', '<br />')}`;
        }
        
        let tmp = '';
        if(hardware_img != '') tmp += `<tr><td>产品图片</td><td><img src="${hardware_img}" class="img" alt="..."></td></tr>`;
        tmp += `
                <tr><td>关联业务</td><td>${data.info.branch || '-'}</td></tr>
                <tr><td>产品形态</td><td>${data.info.prd_type || '-'}</td></tr>
                <tr><td>状态</td><td>${data.info.status || '-'}</td></tr>
                <tr><td>下架时间</td><td>${data.info.delist_date || '-'}</td></tr>
                <tr><td>产品类别</td><td>${data.info.catagory || '-'}</td></tr>
                <tr><td>产品名称</td><td>${data.name || '-'}</td></tr>
                <tr><td>产品分支版本</td><td>${data.info.prd_branch || '-'}</td></tr>
                <tr><td>产品型号</td><td>${data.info.model || '-'}</td></tr>
                <tr><td>产品简介</td><td>${data.info.brief ? data.info.brief.replaceAll('\n', '<br />') : '-'}</td></tr>
                <tr><td>规格参数</td><td>${specs || '-'}</td></tr>
                <tr><td>产品彩页链接</td><td>${data.info.materials || '-'}</td></tr>
                <tr><td>图片链接</td><td>${data.info.poster_anyshare || '-'}</td></tr>
                <tr><td>出货规范</td><td>${packing_list || '-'}</td></tr>
                <tr><td>国标/行标认证</td><td>${data.info.certification ? data.info.certification.replaceAll('\n', '<br />') : '-'}</td></tr>
                <tr><td>性能规格</td><td>${data.info.performance ? data.info.performance.replaceAll('\n', '<br />') : '-'}</td></tr>
                <tr><td>配套硬件</td><td>${hardware_brief || '-'}</td></tr>
                <tr><td>产品销售单价</td><td>${data.info.unit || '-'}</td></tr>
                <tr><td>产品目录价<br />（单位：元）</td><td>${data.info.price || '-'}</td></tr>
                <tr><td>销售底价<br />（单位：元）</td><td>${data.info.marketing_price || '-'}</td></tr>
                <tr><td>商务低价<br />（单位：元）</td><td>${data.info.business_offer || '-'}</td></tr>
                <tr><td>选配说明</td><td>${option || '-'}</td></tr>
                <tr><td>其他说明</td><td>${data.info.notes ? data.info.notes.replaceAll('\n', '<br />') : '-'}</td></tr>
                <tr><td>更新时间</td><td>${data.update ? new Date(data.update).toLocaleString().slice(0,18) : '-'}</td></tr>
            `;
        
        document.querySelector("#detail_table tbody").innerHTML = tmp;
    }
}
