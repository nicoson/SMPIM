APIHOST = (typeof(APIHOST) == 'undefined') ? "" : APIHOST;

let itemTable = null;

window.onload = function() {
    let apiList = {
        getitemlist: APIHOST + '/pim/itemlist',
        getitemdetail: APIHOST + '/pim/getitemdetail',
        updateitem: APIHOST + '/pim/updatehardwares',
        deleteitem: APIHOST + '/pim/deleteitem'
    }

    initNav(3);

    // document.querySelector('#new_hardware').click();
    
    listTable = new ListTable('hardwares', apiList);
    listTable.initListTable(document.querySelector('#list_table tbody'));
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
            document.querySelector('#modal_title_detail').innerHTML = data.name;
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


function updatehardware(event) {
    console.log(event.target);
    listTable.updateData();
}