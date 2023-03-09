APIHOST = (typeof(APIHOST) == 'undefined') ? "" : APIHOST;

let itemTable = null;

window.onload = function() {
    let apiList = {
        getitemlist: APIHOST + '/pim/itemlist',
        getitemdetail: APIHOST + '/pim/getitemdetail',
        updateitem: APIHOST + '/pim/updateitem',
        deleteitem: APIHOST + '/pim/deleteitem'
    }

    initNav(3);
    
    itemTable = new ItemTable('components', apiList);
    itemTable.initListTable(document.querySelector('#list_table tbody'));
};

/* global bootstrap: false */
(() => {
    'use strict'
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    document.querySelector('#modal_detail').addEventListener('show.bs.modal', event => {
        let target = event.relatedTarget;
        let uid = target.getAttribute('data-software-id');
        itemTable.getDetailData(uid).then(data => {
            if(data != null) itemTable.gen_subtable(data.modules);
            document.querySelector('#modal_title_detail').innerHTML = data.name;
            console.log(target);
        });
    });

    document.querySelector('#modal_edit').addEventListener('show.bs.modal', event => {
        if(event.relatedTarget.dataset.modeltype == "new") {
            itemTable.initEditModal("新建组件功能", document.querySelector('#modal_edit'));
        } else {
            let target = event.relatedTarget;
            let uid = target.getAttribute('data-software-id');
            itemTable.getDetailData(uid).then(data => {
                if(data != null) itemTable.initEditModal("编辑", document.querySelector('#modal_edit'), data);
            });
        }
    });

})();