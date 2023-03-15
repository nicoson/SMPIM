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
    
    listTable = new ListTable('product_road_city', apiList, getRole());
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


function getRole() {
    let role = JSON.parse(sessionStorage.role);
    let subrole = role.find(e=>{return e.groupid == "road"});
    return subrole == 'undefined' ? null : subrole.edit;
}

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

function tableToExcel(tableid, name) {
    var template = `<html><head><meta charset="UTF-8"></head><body><table>${document.getElementById(tableid).innerHTML}</table></body></html>`
    var blob = new Blob([template], {
        type: "application/vnd.ms-excel;charset=charset=utf-8"
    });
    saveAs(blob, name);

    // let table = new TableExport(document.getElementById("list_table"));
    // TableExport(document.getElementById("list_table"), {
    //     headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    //     footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    //     formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
    //     filename: "id",                     // (id, String), filename for the downloaded file, (default: 'id')
    //     bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
    //     exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
    //     position: "bottom",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    //     ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    //     ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    //     trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
    //     RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
    //     sheetname: "id"                     // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    //   });
    //   var exportData = table.getExportData();

    //   var xlsxData = exportData.list_table.xlsx; // Replace with the kind of file you want from the exportData
    //   table.export2file(xlsxData.data, xlsxData.mimeType, xlsxData.filename, xlsxData.fileExtension, xlsxData.merges, xlsxData.RTL, xlsxData.sheetname)
}