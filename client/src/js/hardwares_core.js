class ListTable {
    constructor(type='softwares', apiList={}) {
        this.data = null;
        this.ele = null;
        this.type = type;
        this.api = {
            get_item_list: apiList.getitemlist,
            get_item_detail: apiList.getitemdetail,
            update_item: apiList.updateitem,
            delete_item: apiList.deleteitem
        };
        // this.init(title, ele, sw);
    }

    async initListTable(ele) {
        this.ele = ele;
        let items = await this.getItemList();
        this.gen_listTable(ele, items);
    }

    initNewModal() {
        this.data = null;
        document.getElementById('modal_title_new').innerHTML = "新增硬件设备";
        document.getElementById('id_name').value = null;
        document.getElementById('id_model').value = null;
        document.getElementById('id_model_full').value = null;
        document.getElementById('id_year').value = null;
        document.getElementById('id_server_type').value = null;
        document.getElementById('id_server_size').value = null;
        document.getElementById('id_cpu').value = null;
        document.getElementById('id_cpu_num').value = null;
        document.getElementById('id_gpu').value = null;
        document.getElementById('id_gpu_num').value = null;
        document.getElementById('id_npu').value = null;
        document.getElementById('id_npu_num').value = null;
        document.getElementById('id_memory').value = null;
        document.getElementById('id_memory_modal').value = null;
        document.getElementById('id_storage_sys').value = null;
        document.getElementById('id_storage_data').value = null;
        document.getElementById('id_storage_notes').value = null;
        document.getElementById('id_network_interface').value = null;
        document.getElementById('id_display_interface').value = null;
        document.getElementById('id_other_interface').value = null;
        document.getElementById('id_usb').value = null;
        document.getElementById('id_power_supply').value = null;
        document.getElementById('id_power').value = null;
        document.getElementById('id_operation_temperature').value = null;
        document.getElementById('id_storage_temperature').value = null;
        document.getElementById('id_operation_humidity').value = null;
        document.getElementById('id_storage_humidity').value = null;
        document.getElementById('id_chassis_size').value = null;
        document.getElementById('id_package_size').value = null;
        document.getElementById('id_package').value = null;
        document.getElementById('id_shipping_list').value = '产品保修卡、合格证、产品标签、售后服务标签、服务器装箱单、产品快速使用手册';
        document.getElementById('id_net_weight').value = null;
        document.getElementById('id_accessory').value = null;
        document.getElementById('id_lead_time').value = null;
        document.getElementById('id_warranty').value = null;
        document.getElementById('id_poster').value = null;
    }

    initEditModal(data=null) {
        this.data = data;
        document.getElementById('modal_title_new').innerHTML = "编辑";
        document.getElementById('id_img_poster').src = data.info.poster;
        document.getElementById('id_name').value = data.name;
        document.getElementById('id_model').value = data.model;
        document.getElementById('id_model_full').value = data.info.model_full;
        document.getElementById('id_year').value = data.year;
        document.getElementById('id_server_type').value = data.info.server_type;
        document.getElementById('id_server_size').value = data.info.server_size;
        document.getElementById('id_cpu').value = data.info.CPU;
        document.getElementById('id_cpu_num').value = data.info.CPU_num;
        document.getElementById('id_gpu').value = data.info.GPU;
        document.getElementById('id_gpu_num').value = data.info.GPU_num;
        document.getElementById('id_npu').value = data.info.NPU;
        document.getElementById('id_npu_num').value = data.info.NPU_num;
        document.getElementById('id_memory').value = data.info.memory;
        document.getElementById('id_memory_modal').value = data.info.memory_modal;
        document.getElementById('id_storage_sys').value = data.info.storage_sys;
        document.getElementById('id_storage_data').value = data.info.storage_data;
        document.getElementById('id_storage_notes').value = data.info.storage_notes;
        document.getElementById('id_network_interface').value = data.info.network_interface;
        document.getElementById('id_display_interface').value = data.info.display_interface;
        document.getElementById('id_other_interface').value = data.info.other_interface;
        document.getElementById('id_usb').value = data.info.USB;
        document.getElementById('id_power_supply').value = data.info.power_supply;
        document.getElementById('id_power').value = data.info.power;
        document.getElementById('id_operation_temperature').value = data.info.operation_temperature;
        document.getElementById('id_storage_temperature').value = data.info.storage_temperature;
        document.getElementById('id_operation_humidity').value = data.info.operation_humidity;
        document.getElementById('id_storage_humidity').value = data.info.storage_humidity;
        document.getElementById('id_chassis_size').value = data.info.chassis_size;
        document.getElementById('id_package_size').value = data.info.package_size;
        document.getElementById('id_package').value = data.info.package;
        document.getElementById('id_shipping_list').value = data.info.shipping_list;
        document.getElementById('id_net_weight').value = data.info.net_weight;
        document.getElementById('id_accessory').value = data.info.accessory;
        document.getElementById('id_lead_time').value = data.info.lead_time;
        document.getElementById('id_warranty').value = data.info.warranty;
        document.getElementById('id_poster').value = data.info.poster;
        document.getElementById('id_img_poster').src = data.info.poster;
    }

    updateData() {
        if(this.data == null) {
            this.data = {
                uid: `${this.type}_${new Date().getTime()}`,
                type: this.type,
                create: new Date(),
                info: {}
            };
        }
        this.arrangeData();
        this.data.brief = `${parseInt(this.data.info.GPU_num) > 0 ? (this.data.info.GPU_num + '卡/'):''}${this.data.info.server_size}/${this.data.model}`;
        
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
        this.data.name = document.getElementById('id_name').value.trim() || null;
        this.data.model = document.getElementById('id_model').value || null;
        this.data.info.model_full = document.getElementById('id_model_full').value || null;
        this.data.year = document.getElementById('id_year').value || null;
        this.data.info.server_type = document.getElementById('id_server_type').value || null;
        this.data.info.server_size = document.getElementById('id_server_size').value || null;
        this.data.info.CPU = document.getElementById('id_cpu').value || null;
        this.data.info.CPU_num = document.getElementById('id_cpu_num').value || null;
        this.data.info.GPU = document.getElementById('id_gpu').value || null;
        this.data.info.GPU_num = document.getElementById('id_gpu_num').value || null;
        this.data.info.NPU = document.getElementById('id_npu').value || null;
        this.data.info.NPU_num = document.getElementById('id_npu_num').value || null;
        this.data.info.memory = document.getElementById('id_memory').value || null;
        this.data.info.memory_modal = document.getElementById('id_memory_modal').value || null;
        this.data.info.storage_sys = document.getElementById('id_storage_sys').value || null;
        this.data.info.storage_data = document.getElementById('id_storage_data').value || null;
        this.data.info.storage_notes = document.getElementById('id_storage_notes').value || null;
        this.data.info.network_interface = document.getElementById('id_network_interface').value || null;
        this.data.info.display_interface = document.getElementById('id_display_interface').value || null;
        this.data.info.other_interface = document.getElementById('id_other_interface').value || null;
        this.data.info.USB = document.getElementById('id_usb').value || null;
        this.data.info.power_supply = document.getElementById('id_power_supply').value || null;
        this.data.info.power = document.getElementById('id_power').value || null;
        this.data.info.operation_temperature = document.getElementById('id_operation_temperature').value || null;
        this.data.info.storage_temperature = document.getElementById('id_storage_temperature').value || null;
        this.data.info.operation_humidity = document.getElementById('id_operation_humidity').value || null;
        this.data.info.storage_humidity = document.getElementById('id_storage_humidity').value || null;
        this.data.info.chassis_size = document.getElementById('id_chassis_size').value || null;
        this.data.info.package_size = document.getElementById('id_package_size').value || null;
        this.data.info.package = document.getElementById('id_package').value || null;
        this.data.info.shipping_list = document.getElementById('id_shipping_list').value || null;
        this.data.info.net_weight = document.getElementById('id_net_weight').value || null;
        this.data.info.accessory = document.getElementById('id_accessory').value || null;
        this.data.info.lead_time = document.getElementById('id_lead_time').value || null;
        this.data.info.warranty = document.getElementById('id_warranty').value || null;
        this.data.info.poster = document.getElementById('id_poster').value || null;
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
                uid: uid,
                type: this.type
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
    
    // 生成主表
    gen_listTable(ele, data) {
        let tmp = '';
        for(let i=0; i<data.length; i++) {
            tmp += `<tr data-software-id = "${data[i].uid}" data-bs-toggle="modal" data-bs-target="#modal_detail">
                        <td style="width: 50px;"><p class="mb-0">${i+1}</p></td>
                        <td style="width: 100px;"><p class="mb-0">${data[i].name || '-'}</p></td>
                        <td style="width: 80px;"><p class="mb-0">${data[i].model || '-'}</p></td>
                        <td style="width: 150px;"><p class="mb-0">${data[i].brief || '-'}</p></td>
                        <td style="width: 200px; text-align:center;"><img src="${data[i].info.poster}" class="img-thumbnail" alt="..."></td>
                        <td style="width: 120px;"><p class="mb-0">${data[i].info.CPU || '-'}</p></td>
                        <td style="width: 120px;"><p class="mb-0">${data[i].info.memory || ''}，${data[i].info.memory_modal || ''}</p></td>
                        <td style="width: 200px;"><p class="mb-0">${data[i].info.storage_sys || '-'}，${data[i].info.storage_sys || '-'}</p></td>
                        <td style="width: 150px;"><p class="mb-0">${data[i].info.network_interface || '-'}</p></td>
                        <td style="width: 60px;"><p class="mb-0">${data[i].info.GPU || '-'}</p></td>
                        <td style="width: 100px;"><p class="mb-0">${data[i].update ? new Date(data[i].update).toLocaleString().slice(0,18) : '-'}</p></td>
                        <td style="width: 100px;"><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal_edit" data-software-id = "${data[i].uid}" data-modeltype="edit">编辑</button> <button class="btn btn-danger btn-sm js-btn-delete" data-bs-toggle="modal" data-bs-target="#" data-software-id="${data[i].uid}"">删除</button></td>
                    </tr>`
        }
        ele.innerHTML = tmp;
        let btn = document.querySelectorAll('.js-btn-delete');
        for(let i=0; i<btn.length; i++) {
            btn[i].addEventListener('click', function(event) {
                this.deleteSoftware(event);
            }.bind(this));
        }
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
    gen_subtable(data) {
        let tmp = `
            <tr><td>硬件设备名称</td><td>${data.name || ''}</td></tr>
            <tr><td>硬件型号</td><td>${data.model || ''}</td></tr>
            <tr><td>上市时间</td><td>${data.year || ''}</td></tr>
            <tr><td>内部硬件型号</td><td>${data.info.model_full || ''}</td></tr>
            <tr><td>整机类型</td><td>${data.info.server_type || ''}</td></tr>
            <tr><td>服务器尺寸</td><td>${data.info.server_size || ''}</td></tr>`;
        if(data.info.CPU != null) tmp += `<tr><td>CPU</td><td>${data.info.CPU_num || ''} × ${data.info.CPU || ''}</td></tr>`;
        if(data.info.GPU != null) tmp += `<tr><td>GPU</td><td>${data.info.GPU_num || ''} × ${data.info.GPU || ''}</td></tr>`;
        if(data.info.NPU != null) tmp += `<tr><td>NPU</td><td>${data.info.NPU_num || ''} × ${data.info.NPU || ''}</td></tr>`;
        tmp += `<tr><td>内存</td><td>${data.info.memory || ''}，${data.info.memory_modal || ''}</td></tr>
            <tr><td>系统硬盘</td><td>${data.info.storage_sys || ''}</td></tr>
            <tr><td>数据硬盘</td><td>${data.info.storage_data || ''}</td></tr>
            <tr><td>服务器硬盘说明</td><td>${data.info.storage_notes || ''}</td></tr>
            <tr><td>网络接口</td><td>${data.info.network_interface || ''}</td></tr>
            <tr><td>视频接口</td><td>${data.info.display_interface || ''}</td></tr>
            <tr><td>USB接口</td><td>${data.info.USB || ''}</td></tr>
            <tr><td>其他接口</td><td>${data.info.other_interface || ''}</td></tr>
            <tr><td>电源规格</td><td>${data.info.power_supply || ''}</td></tr>
            <tr><td>整机功率</td><td>${data.info.power || ''}</td></tr>
            <tr><td>工作温度</td><td>${data.info.operation_temperature || ''}</td></tr>
            <tr><td>贮存温度</td><td>${data.info.storage_temperature || ''}</td></tr>
            <tr><td>工作湿度</td><td>${data.info.operation_humidity || ''}</td></tr>
            <tr><td>贮存湿度</td><td>${data.info.storage_humidity || ''}</td></tr>
            <tr><td>机箱尺寸</td><td>${data.info.chassis_size || ''}</td></tr>
            <tr><td>外包装尺寸</td><td>${data.info.package_size || ''}</td></tr>
            <tr><td>包装规格</td><td>${data.info.package || ''}</td></tr>
            <tr><td>出货清单</td><td>${data.info.shipping_list || ''}</td></tr>
            <tr><td>设备重量</td><td>${data.info.net_weight || ''}</td></tr>
            <tr><td>配件</td><td>${data.info.accessory || ''}</td></tr>
            <tr><td>供货周期</td><td>${data.info.lead_time || ''}</td></tr>
            <tr><td>质保</td><td>${data.info.warranty || ''}</td></tr>
            <tr><td>图片</td><td>${data.info.poster || ''}</td></tr>`;
        
        document.querySelector("#detail_table tbody").innerHTML = tmp;
    }
}
