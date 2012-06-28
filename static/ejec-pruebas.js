var epeticionForm;
var ecarpeta;
var ecarpetaForm;
var tbEPruebas;
var pbEID;
var epeticion;
var epprueba;
var eppruebaEdit;
var tabViewPP;

Ext.define('PruebaPModel',{
    extend: 'Ext.data.Model',
    fields: [         
        'id',
        'pk',
        'nombre',                
        'tipo',
        'ruta',        
        'estado'
    ]
});

var ejePruebaAttach = Ext.create('Ext.data.Store', {        
    model:'AdjuntoModel',
    proxy: {
        type: 'ajax',
        url: '/get_ejeprueba_attach'
    }
});

var eppruebaStore = Ext.create('Ext.data.Store', {        
    model:'PpruebaModel',
    proxy: {
        type: 'ajax',
        url: '/get_pprueba'
    }
});

var peticionStoreCmb = Ext.create('Ext.data.Store', {        
    model:'GeneralModel', 
    proxy: {
        type: 'ajax',
        url: '/get_peticion_simple'
    }
});

var pruebasStoreEje = Ext.create('Ext.data.Store', {
    model:'PruebaPModel',        
    proxy: {
        type: 'ajax',            
        url: '/get_ejepruebap'
    }
});

var pruebasStoreEjeAll = Ext.create('Ext.data.Store', {    
    model:'PruebaPModel', 
    proxy: {
        type: 'ajax',            
        url: '/get_pruebas'
    }
});

var ecarpetaStore = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: false
    },        
    proxy: {
        type: 'ajax',            
        url: '/get_ejecarpeta'
    }
});

ecarpetaForm = Ext.create('Ext.form.Panel', { 
        id:'ecarpetaForm',      
        height: 90,
        width: 570,
        bodyBorder:false,        
        border:0,
        layout: {
            type: 'column'
        },
        bodyPadding: 10,
        frameHeader: false,
        titleCollapse: false,
        items: [
            {
                xtype: 'container',
                height: 80,                
                items: [
                    {
                        xtype: 'textfield',
                        name: 'nombre',
                        width: '100%',
                        fieldLabel: 'Nombre',
                        allowBlank:false,
                        labelAlign: 'top'
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('ecarpetaForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_ejecarpeta',               
                        success: function(form,action) {
                            form.reset();                            
                            ecarpetaStore.load();                                                
                            ecarpeta.hide();
                            Ext.getCmp('form-ecarpeta-id').setValue("");
                        },
                        failure: function(form,action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        },{
            text: 'Cerrar',
            margin:'0 15 0 0',
            handler: function() {
                ecarpeta.hide();
                this.up('form').getForm().reset();
            }
        }]
    });

epeticionForm =  Ext.create('Ext.form.Panel', {        
        id:'epeticionForm',
        height: 70,
        width: 580,
        bodyBorder:false,        
        border:0,
        layout: {
            type: 'column'
        },
        bodyPadding: 10,
        frameHeader: false,
        titleCollapse: false,
        items: [
            {
                xtype: 'container',
                height: 80,
                width: 290,
                items: [
                    {
                        xtype: 'combobox',
                        name: 'peticion',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        fieldLabel: 'Petición',
                        allowBlank:false,
                        store:peticionStoreCmb
                    }
                ]
            },{
                xtype: 'container',
                height: 80,
                width: 265,
                items: [                    
                    {
                        xtype: 'hiddenfield',
                        id:'form-ecarpeta-id',             
                        name: 'carpeta',                
                        allowBlank:false                         
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('epeticionForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_ejeprueba',               
                        success: function(form,action) {                                                       
                            ecarpetaStore.load();
                            epeticion.hide();
                        },
                        failure: function(form,action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        },{
            text: 'Cerrar',
            margin:'0 15 0 0',
            handler: function() {
                epeticion.hide();
                this.up('form').getForm().reset();
            }
        }]
    });



ecarpeta = Ext.create('widget.window', {        
        height: 125,
        width: 580,
        closeAction: 'hide',
        title: 'Nueva Carpeta',
        closable: true,
        plain: false,                
        border:0,
        layout: {
            type: 'border',
            padding: 2
        },
        items: [
        {
            region: 'center',            
            border:0,
            items: [ecarpetaForm]
        }
        ]
    }),

epeticion = Ext.create('widget.window', {        
        height: 110,
        width: 585,
        closeAction: 'hide',
        title: 'Vincular Peticion',
        closable: true,
        plain: false,                
        border:0,
        layout: {
            type: 'border',
            padding: 2
        },
        items: [
        {
            region: 'center',            
            border:0,
            items: [epeticionForm]
        }
        ]
    });



tbEPruebas = {
    xtype:'toolbar',
    width: '100%',
    items: ["Acciones:", {
        text:"Nueva Carpeta",
        handler: function() {                
            ecarpeta.show();
        }
    },'-',{
        text:"Eliminar Carpeta",
        handler: function() {
            if (Ext.getCmp('form-ecarpeta-id').getValue()) {
                if (confirm("¿Desea eliminar el registro?")) {
                    var id = Ext.getCmp('form-ecarpeta-id').getValue();
                    Ext.Ajax.request({
                        url: '/delete_ejecarpeta',
                        params: {
                            id: id
                        },
                        success: function(response) {
                            ecarpetaStore.load();
                            Ext.getCmp('form-ecarpeta-id').setValue("");
                            Ext.getCmp('pbEView').setVisible(false);
                        }
                    });
                }
            } else {
                alert('Debes seleccionar una carpeta');
            }
        }
    },'-',{
        text:"Agregar Vinculo",
        handler: function() {
            if (Ext.getCmp('form-ecarpeta-id').getValue()) {
                epeticion.show();
            } else {
                alert('Debes seleccionar una carpeta');
            }
        }
    },'-',{
        text:"Eliminar Vinculo",
        handler: function() {
            if (pbEID) {
                if (confirm("¿Desea eliminar el registro?")) {            
                    Ext.Ajax.request({
                        url: '/delete_ejeprueba',
                        params: {
                            id: pbEID
                        },
                        success: function(response) {
                            ecarpetaStore.load();
                            Ext.getCmp('pbEView').setVisible(false);
                        }
                    });
                }   
            } else {
                alert('Debes seleccionar una prueba');
            }
        }
    }
    ]
}

var treeCarpeta = Ext.create('Ext.tree.Panel', { 
    region : "west",
    width : '50%',
    border: 0,
    useArrows: true,     
    bodyBorder:false,
    autoHeight: true,
    minSize: 150,
    rootVisible: false,
    autoScroll: true,        
    store: ecarpetaStore,
    listeners: {
        select: function(self, record, index, eOpts) {
            
            var id = record.internalId.toString();
            
            if (id.indexOf('pp') == -1) {
                Ext.getCmp('form-ecarpeta-id').setValue(id);
                pbEID = null;
                Ext.getCmp('pbEView').setVisible(false);
            } else {                
                pbEID =  id.replace('pp','');                
                
                pruebasStoreEje.load({params: {
                    ep: pbEID
                }, callback: function(record) {
                    Ext.getCmp('pbEView').setActiveTab(0);
                    Ext.getCmp('form-ecarpeta-id').setValue("");
                    Ext.getCmp('pbEView').setVisible(true);
                    pruebasStoreEjeAll.load({params: {
                        ep: pbEID
                    }});
                }});
            }
            
        }
    }
});


var gridPanelPruebas = Ext.create('Ext.grid.Panel', {
    id: 'grid-prueba-pruebas',
    title: 'Ejecución de pruebas',
    border:0,
    multiSelect: true,
    store: pruebasStoreEje,
    columns: [
        { header: 'Nombre',  dataIndex: 'nombre', flex: 1 },
        { header: 'Ruta', dataIndex: 'ruta', flex: 1 },
        { header: 'Tipo', dataIndex: 'tipo', flex: 1 },
        { header: 'Estado', dataIndex: 'estado', flex: 1 }        
    ],
    height: '100%',
    width: '100%',         
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {            
            tabViewPP.setDisabled(true);
            Ext.getCmp('eppruebaFormEdit').getForm().reset();
            eppruebaStore.load({params: {
                id: record.internalId
            }, callback: function(data){                
                if (data.length > 0) {
                    epprueba.show();                    
                    Ext.getCmp('ejeform-attach-id').setValue(record.data.pk);
                    ejePruebaAttach.load({params: {
                        id: record.data.pk
                    }});  
                } else {
                    alert('La prueba seleccionada no tiene Pasos de prueba.');                    
                }
            }});
            
        }
    }    
});

var gridEPPruebas = Ext.create('Ext.grid.Panel', {
    id: 'grid-eppruebas',    
    border:0,
    multiSelect: true,
    store: eppruebaStore,
    columns: [
        { header: 'N° paso',  dataIndex: 'num_paso', flex: 1 },
        { header: 'Descrición', dataIndex: 'descripcion', flex: 1 },
        { header: 'Observaciones', dataIndex: 'observaciones', flex: 1 },
        { header: 'Esperado', dataIndex: 'esperado', flex: 1 }        
    ],
    height: '100%',
    width: '100%',         
    listeners : {
        itemclick: function(self, record, number, index, eOpts) {            
            eppruebaEdit.loadRecord(record);
            Ext.getCmp('eform-pprueba-id').setValue(record.internalId);            
            tabViewPP.setDisabled(false);
            tabViewPP.setActiveTab(0);
        }
    }    
});

eppruebaEdit = Ext.create('Ext.form.Panel', { 
        id:'eppruebaFormEdit',
        title:'Detalle',     
        height: 260,
        width: 570,
        bodyBorder:false,        
        border:0,
        layout: {
            type: 'column'
        },
        bodyPadding: 10,
        frameHeader: false,
        titleCollapse: false,
        items: [
            {
                xtype: 'container',
                height: 30,
                width: 290,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'num_paso',
                        fieldLabel: 'N° Paso',
                        readOnly:true,
                        allowBlank:true
                    }
                ]
            },
            {
                xtype: 'container',
                height: 139,
                width: 548,
                items: [
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank:true,
                        readOnly:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'observaciones',
                        fieldLabel: 'Observaciones',
                        allowBlank:true,
                        readOnly:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        id:'field-sperado',
                        name: 'esperado',
                        fieldLabel: 'Esperado',
                        allowBlank:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'eform-pprueba-id',
                        name: 'id',                
                        allowBlank:false
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('eppruebaFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_pprueba',               
                        success: function(form, action) {
                            form.reset();                                   
                            ppruebaStore.load({params: {
                                id: pbEID
                            }});                                                                        
                            epprueba.hide();
                            tabViewPP.disabled = true;
                        },
                        failure: function(form, action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        },{
            text: 'Cerrar',
            margin:'0 15 0 0',
            handler: function() {
                epprueba.hide();
                this.up('form').getForm().reset();
                tabViewPP.disabled = true;
            }
        }]
    });

var gridAttachEPP = Ext.create('Ext.grid.Panel', {
    id: 'gridAttachEPP',    
    border:0,    
    store: ejePruebaAttach,
    columns: [
        { header: 'Nombre',  dataIndex: 'file', flex: 1 },
        { header: 'Tamaño', dataIndex: 'tamano', flex: 1 },
        { header: 'Fecha de creación', dataIndex: 'fecha_creacion', flex: 1 }          
    ],
    height: 168,
    width: 565,       
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {
            
        }
    }    
});

var eAttachPP =  Ext.create('Ext.form.Panel', {        
        id:'eAttachPP',             
        bodyBorder:false,        
        layout: {
            type: 'column'
        },
        bodyPadding: 10,
        frameHeader: false,
        titleCollapse: false,
        items: [
            {
                xtype: 'filefield',
                width: 545,
                name: 'File',
                fieldLabel: 'Agregar otro',
                allowBlank:false,
                labelAlign: 'top',

            },
            {
                xtype: 'hiddenfield',
                id:'ejeform-attach-id',
                name: 'id',                
                allowBlank:false                            
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('eAttachPP').getForm();
                if(form.isValid()) {        
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_ejeprueba_attach',               
                        success: function(form,action) {
                            form.reset();
                            var selected = Ext.getCmp('grid-prueba-pruebas').getSelectionModel().selected;
                            var id = selected.items[0].data.pk;
                            Ext.getCmp('ejeform-attach-id').setValue(id);
                            ejePruebaAttach.load({params: {
                                id: id
                            }});                            
                        },
                        failure: function(form,action){
                            form.reset();
                        }
                    });
                }                
            }
        }]
    });

var ePanelAttach = Ext.create('Ext.Panel', {
    frameHead:false,
    title:'Adjuntos',
    border:0,
    items: [gridAttachEPP,  eAttachPP]
});

var ePanelWin = Ext.create('Ext.Panel', {
    frameHead:false,
    border:0,
    height:130,
    items: [gridEPPruebas]
});

tabViewPP = Ext.create('Ext.tab.Panel', {
    id:'tabViewPP',              
    width : '100%',
    border: 0,
    bodyBorder:false,
    items: [eppruebaEdit, ePanelAttach]
});

epprueba =  Ext.create('widget.window', {        
        height: 450,
        width: 580,
        closeAction: 'hide',
        title: 'Ejecución Prueba',
        closable: true,
        plain: false,                
        border:0,
        layout: {
            type: 'border',
            padding: 2
        },
        items: [
        {
            region: 'center',            
            border:0,
            items: [ePanelWin, tabViewPP]
        }
        ]
    });

var gridSelectPrueba = Ext.create('Ext.grid.Panel', {
    id: 'grid-select-prueba',
    title: 'Seleccion de pruebas',
    border:0,
    multiSelect: true,
    store: pruebasStoreEjeAll,
    columns: [
        { header: 'Nombre',  dataIndex: 'nombre', flex: 1 },
        { header: 'Ruta', dataIndex: 'ruta', flex: 1 },
        { header: 'Tipo', dataIndex: 'tipo', flex: 1 },
        { header: 'Estado', dataIndex: 'estado', flex: 1 }        
    ],
    height: '100%',
    width: '100%',
    tbar: ["Acciones:",{
        text:"Agregar seleccionados",
        handler: function() {
            if (pbEID != null) {
                var smodel = gridSelectPrueba.getSelectionModel();
                for (var i=0;i<smodel.selected.items.length;i++) {
                    var model = smodel.selected.items[i];                    
                    Ext.Ajax.request({
                        method: "POST",
                        url: '/guarda_ejepruebap',
                        params: {
                            epprueba: pbEID,
                            prueba:model.internalId
                        },
                        success: function(response) {
                            
                        }
                    });
                }
                if (smodel.selected.items.length > 0) {
                    pruebasStoreEje.load({params: {
                        ep: pbEID
                    }});
                    pruebasStoreEjeAll.load({params: {
                        ep: pbEID
                    }});
                    Ext.getCmp('pbEView').setActiveTab(0);                    
                }
            }
        }
    }],       
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {
            
        }
    }    
});

var pbEView = Ext.create('Ext.tab.Panel', {
    id:'pbEView',              
    width : '100%',
    border: 0,
    bodyBorder:false,
    items: [gridPanelPruebas, gridSelectPrueba]
});
pbEView.setVisible(false);

var epruebaPanel = {
    id:"epruebas-panel",
    layout : "border",
    title: 'Pruebas',
    width : '100%',   
    items : [{
        region : "center",            
        width : '50%',
        border: 0,
        items: [pbEView]
    },
    {
        region : "north",
        split : false,
        border: 0,
        height : 30,
        items:[tbEPruebas]
    },
    treeCarpeta
    ]
}