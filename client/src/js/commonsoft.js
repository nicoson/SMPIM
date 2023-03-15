APIHOST = (typeof(APIHOST) == 'undefined') ? "" : APIHOST;

let listTable = null;

window.onload = function() {
    let apiList = {
        getitemlist: APIHOST + '/pim/itemlist',
        getitemdetail: APIHOST + '/pim/getitemdetail',
        updateitem: APIHOST + '/pim/updatehardwares',
        deleteitem: APIHOST + '/pim/deleteitem',
        drop_list: APIHOST + '/pim/droplist'
    }
    initNav(0);
    
    listTable = new ListTable('product_road_commonsoft', apiList, getRole());
    listTable.initListTable(document.querySelector('#list_table'));
};

/* global bootstrap: false */
(() => {
    'use strict'
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    document.querySelector('#modal_detail').addEventListener('show.bs.modal', event => {
        let target = event.relatedTarget;
        let uid = target.getAttribute('data-software-id');
        listTable.getDetailData(uid).then(data => {
            if(data != null) listTable.gen_subtable(data);
            document.querySelector('#modal_title_detail').innerHTML = `${data.name} - ${data.info.prd_branch}`;
            console.log(target);
        });
    });

    document.querySelector('#modal_edit').addEventListener('show.bs.modal', event => {
        if(event.relatedTarget.dataset.modeltype == "new") {
            listTable.initNewModal();
        } else {
            let target = event.relatedTarget;
            let uid = target.getAttribute('data-software-id');
            listTable.getDetailData(uid).then(data => {
                if(data != null) listTable.initEditModal(data);
            });
        }
    });

})();


function updateModal(event) {
    console.log(event.target);
    listTable.updateData();
}

function update_module_list(event) {
    console.log(event.target.value);
    listTable.updateModuleDropList(event.target.value);
}

function updatehardware(event) {
    console.log(event.target.value);
    listTable.updateImgInfo(event.target.value);
}

function downloadxlsx(event) {
    listTable.exportXlsx();
}

function getRole() {
    let role = JSON.parse(sessionStorage.role);
    let subrole = role.find(e=>{return e.groupid == "road"});
    return subrole == 'undefined' ? null : subrole.edit;
}