var epeticionForm;
var ecarpeta;
var ecarpetaForm;
var tbEPruebas;
var pbEID;
var epeticion;

var peticionStoreCmb = Ext.create('Ext.data.Store', {        
    fields:['label', 'id'],
    proxy: {
        type: 'ajax',
        url: '/get_peticion_simple'
    }
});

var pruebasStoreEje = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: false
    },        
    proxy: {
        type: 'ajax',            
        url: '/get_ejepruebap'
    }
});

var pruebasStoreEjeAll = Ext.create('Ext.data.Store', {
    fields:['label', 'id'],
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
                ecarpeta.hide();
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
            Ext.getCmp('ejeCmb').getStore().load();                             
            var id = record.internalId.toString();
            if (id.indexOf('pp') == -1) {
                Ext.getCmp('form-ecarpeta-id').setValue(id);
                pbEID = null;
                Ext.getCmp('pbEView').setVisible(false);
            } else {
                Ext.getCmp('pbEView').setActiveTab(0);
                pbEID =  id.replace('pp','');
                Ext.getCmp('ejeCmb').getStore().load({params: {
                        ep: pbEID
                }});
                Ext.getCmp('form-epp-id').setValue(pbEID); 
                pruebasStoreEje.load({params: {
                    ep: pbEID
                }, callback: function(record) {
                    Ext.getCmp('form-ecarpeta-id').setValue("");
                    Ext.getCmp('pbEView').setVisible(true);                                                        
                }});
            }
            
        }
    }
});


var treePanelPruebas = Ext.create('Ext.tree.Panel', {        
        title: 'Ejecución de pruebas',               
        split: false,
        height: 360,
        minSize: 150,
        rootVisible: false,
        autoScroll: true,
        store: pruebasStoreEje
    });

var selectPanelPruebas = Ext.create('Ext.form.Panel', {   
        title:'Seleccionar Prueba',     
        id:'selectPanelPruebas',
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
                        name: 'prueba',
                        id:'ejeCmb',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        fieldLabel: 'Elige Prueba',
                        allowBlank:false,
                        store:pruebasStoreEjeAll
                    }
                ]
            },{
                xtype: 'container',
                height: 80,
                width: 265,
                items: [                    
                    {
                        xtype: 'hiddenfield',
                        id:'form-epp-id',             
                        name: 'epprueba',                
                        allowBlank:false                         
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('selectPanelPruebas').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_ejepruebap',               
                        success: function(form,action) {                                                       
                            pruebasStoreEje.load({params: {
                                ep: pbEID
                            }});
                            pruebasStoreEjeAll.load({params: {
                                ep: pbEID
                            }});                            
                            Ext.getCmp('pbEView').setActiveTab(0);
                            form.reset();
                            Ext.getCmp('form-epp-id').setValue(pbEID);
                        },
                        failure: function(form,action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        }]
    });



var pbEView = Ext.create('Ext.tab.Panel', {
    id:'pbEView',              
    width : '100%',
    border: 0,
    bodyBorder:false,
    items: [treePanelPruebas, selectPanelPruebas]
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