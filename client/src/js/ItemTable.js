class ItemTable {
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

    initEditModal(title, ele, sw=null) {
        // let title = '新建应用';
        this.data = sw;
        let add_module = 'add_module_' + new Date().getTime() + Math.round(Math.random()*100);

        this.data = {
            uid: sw==null?`${this.type}_${new Date().getTime()}`:sw.uid,
            // uid: `software_${new Date().getTime()}`,
            name: sw==null?null:sw.name,
            nameid: 'id_item_name',
            module: {}
        }

        let tmp =
        `<div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal_title_new">${title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="">
                        <div class="row g-3 p-3">
                            <div class="col-md-6">
                            <label for="${this.data.nameid}" class="form-label">应用软件名称</label>
                            <input type="text" class="form-control" id="${this.data.nameid}" value="${this.data.name || ''}">
                            </div>
                        </div>
                        
                        <!-- insert module here -->
                        <div class="row d-grid gap-2 col-3 mx-auto">
                            <button id="${add_module}" type="button" class="col btn btn-outline-primary" type="width: 100px">新增模块</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="module_edit_close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button id="module_edit_submit" type="button" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>`;

        ele.innerHTML = tmp;
        if(sw == null) {
            this.addModule(document.getElementById(add_module).parentElement);
        } else {
            for(let i=0; i<sw.modules.length; i++) {
                this.addModule(document.getElementById(add_module).parentElement, sw.modules[i]);
            }
        }

        document.getElementById(add_module).addEventListener('click', e => {
            this.addModule(e.target.parentElement, e.target.dataset.moduleid, e.target.dataset.componentid);
        });

        document.getElementById('module_edit_submit').addEventListener('click', e => {
            e.target;
            console.log(this.data);
            let postData = this.arrangeData();
            console.log(postData);
            
            postBody.body = JSON.stringify({
                data: postData
            });
            fetch(this.api.update_item, postBody).then(e => e.json()).then(res => {
                if(res.code == 200) {
                    console.log(res);
                    document.getElementById('module_edit_close').click();
                    if(sw == null) this.initListTable(this.ele);
                }
            });
        });

        document.getElementById(this.data.nameid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.name = e.target.value;
        });
    }

    addModule(ele, mod_data=null) {
        let module_id = 'module_' + new Date().getTime() + Math.round(Math.random()*100);
        let add_component = 'add_component_' + new Date().getTime() + Math.round(Math.random()*100);
        let del_module = 'del_module_' + new Date().getTime() + Math.round(Math.random()*100);

        this.data.module[module_id] = {
            name: mod_data==null?null:mod_data.name,
            nameid: module_id + '_module_name',
            code: mod_data==null?null:mod_data.code,
            codeid: module_id + '_module_code',
            option: mod_data==null?null:mod_data.option,
            optionid: module_id + '_module_option',
            note: mod_data==null?null:mod_data.note,
            noteid: module_id + '_module_note',
            info: mod_data==null?null:mod_data.info,
            infoid: module_id + '_module_info',
            component: {}
        };

        let tmp = 
            `<div id="${module_id}" class="row g-2 p-3">
                <div class="card p-0">
                    <div class="card-header">
                        <div class="row g-2">
                            <div class="col-12 text-end">
                                <button id="${del_module}" type="button" class="btn-close" aria-label="Close"></button>
                            </div>
                            <div class="col-md-8 p-0 pe-2">
                                <div class="row g-2">
                                    <div class="col-md-6 form-floating">
                                        <input type="text" class="form-control" id="${this.data.module[module_id].nameid}" data-moduleid="${module_id}" data-item="name" value="${this.data.module[module_id].name || ''}">
                                        <label for="${this.data.module[module_id].nameid}" class="form-label">模块名称</label>
                                    </div>
                
                                    <div class="col-md-6 form-floating">
                                        <input type="text" class="form-control" id="${this.data.module[module_id].codeid}" data-moduleid="${module_id}" data-item="code" value="${this.data.module[module_id].code || ''}">
                                        <label for="${this.data.module[module_id].codeid}" class="form-label">模块型号</label>
                                    </div>
                
                                    <div class="col-md-6 form-floating">
                                        <select class="form-control" id="${this.data.module[module_id].optionid}" data-moduleid="${module_id}" data-item="option">
                                            <option value="1" selected>必选</option>
                                            <option value="0">可选</option>
                                        </select>
                                        <label for="${this.data.module[module_id].optionid}" class="form-label">选配</label>
                                    </div>
                
                                    <div class="col-md-6 form-floating">
                                        <input type="text" class="form-control" id="${this.data.module[module_id].noteid}" data-moduleid="${module_id}" data-item="note" value="${this.data.module[module_id].note || ''}">
                                        <label for="${this.data.module[module_id].noteid}" class="form-label">备注</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-4 form-floating p-0">
                                <textarea  id="${this.data.module[module_id].infoid}" class="form-control" style="height: 100%;" aria-label="With textarea"></textarea>
                                <label for="${this.data.module[module_id].infoid}" class="form-label">模块简介</label>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <!-- insert component here -->
                        <div class="row">
                            <div class="col mb-3 me-3 text-end">
                                <button id="${add_component}" data-moduleid="${module_id}" type="button" class="col btn btn-outline-primary" type="width: 100px">新增功能</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        ele.insertAdjacentHTML('beforebegin', tmp);
        document.getElementById(this.data.module[module_id].infoid).value = this.data.module[module_id].info;
        document.getElementById(this.data.module[module_id].optionid).value = this.data.module[module_id].option;

        if(mod_data == null) {
            this.addComponent(document.getElementById(add_component).parentElement.parentElement, module_id);
        } else {
            for(let i=0; i<mod_data.component.length; i++) {
                this.addComponent(document.getElementById(add_component).parentElement.parentElement, module_id, mod_data.component[i]);
            }
        }
        
        document.getElementById(add_component).addEventListener('click', e => {
            e.target;
            this.addComponent(e.target.parentElement.parentElement, e.target.dataset.moduleid);
        });

        document.getElementById(this.data.module[module_id].nameid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].name = e.target.value;
        });

        document.getElementById(this.data.module[module_id].codeid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].code = e.target.value;
        });

        document.getElementById(this.data.module[module_id].optionid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].option = e.target.value;
        });

        document.getElementById(this.data.module[module_id].noteid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].note = e.target.value;
        });

        document.getElementById(this.data.module[module_id].infoid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].info = e.target.value;
        });
        
        document.getElementById(del_module).addEventListener('click', function(event) {
            let cf = confirm("是否确认删除？");
            if (cf == true){
                document.getElementById(module_id).remove();
                delete this.data.module[module_id];
            }
        }.bind(this));
    }

    addComponent(ele, module_id, comp_data=null) {
        let component_id = 'component_' + new Date().getTime() + Math.round(Math.random()*100);
        let add_subcomponent = 'add_subcomponent_' + new Date().getTime() + Math.round(Math.random()*100);
        let del_component = 'del_component_' + new Date().getTime() + Math.round(Math.random()*100);
        this.data.module[module_id].component[component_id] = {
            name: comp_data==null?null:comp_data.name,
            nameid: module_id + '_' + component_id + '_name',
            subcomponent: {}
        }

        let tmp = 
            `<div id="${component_id}" class="row m-3">
                <div class="card p-0">
                    <div class="card-body">
                        <div class="col text-end mb-2">
                            <button id="${del_component}" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                        <div class="row g-2">
                            <div class="col-md-3 form-floating">
                                <input type="text" class="form-control" id="${this.data.module[module_id].component[component_id].nameid}" data-moduleid="${module_id}" data-componentid="${component_id}" data-item="name" value="${this.data.module[module_id].component[component_id].name || ''}">
                                <label for="${this.data.module[module_id].component[component_id].nameid}" class="form-label">功能名称</label>
                            </div>
        
                            <div class="col-md-9">
                                <!-- insert subcomponent here -->
                                <div class="row text">
                                    <div class="col text-start">
                                        <button id="${add_subcomponent}" data-componentid="${component_id}" data-moduleid="${module_id}" type="button" class="col btn btn-outline-primary" type="width: 100px">新增子功能</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        ele.insertAdjacentHTML('beforebegin', tmp);
        
        if(comp_data == null) {
            this.addSubcomponent(document.getElementById(add_subcomponent).parentElement.parentElement, module_id, component_id);
        } else {
            for(let i=0; i<comp_data.subcomponent.length; i++) {
                this.addSubcomponent(document.getElementById(add_subcomponent).parentElement.parentElement, module_id, component_id, comp_data.subcomponent[i]);
            }
        }

        document.getElementById(add_subcomponent).addEventListener('click', e => {
            e.target;
            this.addSubcomponent(e.target.parentElement.parentElement, e.target.dataset.moduleid, e.target.dataset.componentid);
        });

        document.getElementById(this.data.module[module_id].component[component_id].nameid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].component[component_id].name = e.target.value;
        });
        
        document.getElementById(del_component).addEventListener('click', function(event) {
            let cf = confirm("是否确认删除？");
            if (cf == true){
                document.getElementById(component_id).remove();
                delete this.data.module[module_id].component[component_id];
            }
        }.bind(this));
    }

    addSubcomponent(ele, module_id, component_id, subcomp_data=null) {
        let subcomponent_id = 'subcomponent_' + new Date().getTime() + Math.round(Math.random()*10000);
        let del_subcomponent_id = 'del_subcomponent_' + new Date().getTime() + Math.round(Math.random()*10000);
        this.data.module[module_id].component[component_id].subcomponent[subcomponent_id] = {
            name: subcomp_data==null?null:subcomp_data.name,
            nameid: module_id + '_' + component_id + '_' + subcomponent_id + '_name',
            description: subcomp_data==null?null:subcomp_data.description,
            descriptionid: module_id + '_' + component_id + '_' + subcomponent_id + '_description'
        }

        let tmp = 
            `<div id="${subcomponent_id}" class="row mb-2 g-2">
                <div class="col-md-4 form-floating">
                    <input type="text" class="form-control" id="${this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].nameid}" data-moduleid="${module_id}" data-componentid="${component_id}" data-subcomponentid="${subcomponent_id}" data-item="name" value="${this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].name || ''}">
                    <label for="${this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].nameid}" class="form-label">子功能名称</label>
                </div>
                <div class="col-md-7 form-floating">
                    <textarea id="${this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].descriptionid}" class="form-control" aria-label="With textarea" data-moduleid="${module_id}" data-componentid="${component_id}" data-subcomponentid="${subcomponent_id}" data-item="name"></textarea>
                    <label for="${this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].descriptionid}" class="form-label">子功能说明</label>
                </div>
                <button id="${del_subcomponent_id}" type="button" class="col-md-1 btn btn-outline-danger btn-sm">删除</button>
            </div>`;

        ele.insertAdjacentHTML('beforebegin', tmp);
        document.getElementById(this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].descriptionid).value = this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].description;

        document.getElementById(this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].nameid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].name = e.target.value;
        });

        document.getElementById(this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].descriptionid).addEventListener('change', e => {
            console.log(e.target.value);
            this.data.module[module_id].component[component_id].subcomponent[subcomponent_id].description = e.target.value;
        });

        document.getElementById(del_subcomponent_id).addEventListener('click', function(event) {
            let cf = confirm("是否确认删除？");
            if (cf == true){
                document.getElementById(subcomponent_id).remove();
                delete this.data.module[module_id].component[component_id].subcomponent[subcomponent_id];
            }
        }.bind(this));
    }

    // 从 DOM 变量转换为可以提交存储的数据格式
    arrangeData() {
        let res = {
            uid: this.data.uid,
            name: this.data.name,
            type: this.type,
            create: new Date(),
            modules: []
        }

        for(let mod_item of Object.keys(this.data.module)) {
            let module = {
                "name": this.data.module[mod_item].name,
                "code": this.data.module[mod_item].code,
                "info": this.data.module[mod_item].info,
                "option": this.data.module[mod_item].option, 
                "note": this.data.module[mod_item].note,
                "option": this.data.module[mod_item].option,
                "component": []
            }
            for(let comp_item of Object.keys(this.data.module[mod_item].component)) {
                let component = {
                    name: this.data.module[mod_item].component[comp_item].name,
                    subcomponent: []
                }
                for(let subcomp_item of Object.keys(this.data.module[mod_item].component[comp_item].subcomponent)) {
                    let subcomponent = {
                        name: this.data.module[mod_item].component[comp_item].subcomponent[subcomp_item].name,
                        description: this.data.module[mod_item].component[comp_item].subcomponent[subcomp_item].description
                    }
                    component.subcomponent.push(subcomponent);
                }
                module.component.push(component);
            }
            res.modules.push(module);
        }
        console.log(res);
        return res;
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
    
    // 生成应用软件主表
    gen_listTable(ele, data) {
        let tmp = '';
        for(let i=0; i<data.length; i++) {
            tmp += `<tr data-software-id = "${data[i].uid}" data-bs-toggle="modal" data-bs-target="#modal_detail"><td><p class="mb-0">${data[i].name}</p></td><td><p class="mb-0">${data[i].create.slice(0,10)}</p></td><td><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal_edit" data-software-id = "${data[i].uid}" data-modeltype="edit">编辑</button> <button class="btn btn-danger btn-sm js-btn-delete" data-bs-toggle="modal" data-bs-target="#" data-software-id="${data[i].uid}"">删除</button></td></tr>`
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
        // let data = getList()[0].data;
        let tmp = "";
        let rowSpan = 0;
        for(let i=0; i<data.length; i++) {
            rowSpan = this.getRowSpan(data[i], "module");
            tmp += `<tr>
                    <td rowspan="${rowSpan}">${data[i].name || '-'}</td>
                    <td rowspan="${rowSpan}">${data[i].code || '-'}</td>
                    <td rowspan="${rowSpan}">${data[i].info || '-'}</td>
                    <td rowspan="${this.getRowSpan(data[i].component[0], "component")}">${data[i].component[0].name || '-'}</td>
                    <td>${data[i].component[0].subcomponent[0].name || '-'}</td>
                    <td>${data[i].component[0].subcomponent[0].description == null?'-':data[i].component[0].subcomponent[0].description.replaceAll('\\n','<br />')}</td>
                    <td rowspan="${rowSpan}">${data[i].option == 1 ? "必选":"可选"}</td>
                    <td rowspan="${rowSpan}">${data[i].note || '-'}</td>
                    <td rowspan="${rowSpan}">${data[i].price || '-'}</td>
                </tr>`;
    
            for(let k=1; k<data[i].component[0].subcomponent.length; k++) {
                tmp += `<tr>
                            <td>${data[i].component[0].subcomponent[k].name}</td>
                            <td>${data[i].component[0].subcomponent[k].description == null?'-':data[i].component[0].subcomponent[0].description.replaceAll('\\n','<br />')}</td>
                        </tr>`;
            }
    
            for(let j=1; j<data[i].component.length; j++) {
                tmp += `<tr>
                            <td rowspan="${this.getRowSpan(data[i].component[j], "component")}">${data[i].component[j].name}</td>
                            <td>${data[i].component[j].subcomponent[0].name}</td>
                            <td>${data[i].component[j].subcomponent[0].description == null?'-':data[i].component[0].subcomponent[0].description.replaceAll('\\n','<br />')}</td>
                        </tr>`;
    
                for(let k=1; k<data[i].component[j].subcomponent.length; k++) {
                    tmp += `<tr>
                                <td>${data[i].component[j].subcomponent[k].name}</td>
                                <td>${data[i].component[j].subcomponent[k].description == null?'-':data[i].component[0].subcomponent[0].description.replaceAll('\\n','<br />')}</td>
                            </tr>`;
                }
            }
        }
        document.querySelector("#detail_table tbody").innerHTML = tmp;
    }
    
    // 工具函数，获取每一个合并单元格的row-span参数
    getRowSpan(obj, level) {
        let len = 0;
        switch(level) {
            case "module":
                for(let i=0; i<obj.component.length; i++) {
                    len += obj.component[i].subcomponent.length;
                }
                break;
            case "component":
                len = obj.subcomponent.length;
                break;
            default:
                break;
        }
        return len;
    }
}
