var ecarpeta;
var ecarpetaForm;
var eprueba;
var epruebaForm;
var tbEPruebas;

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
                            windows.carpeta.hide();
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
    })

epruebaForm =  Ext.create('Ext.form.Panel', {
        title:'Vincular Petición',
        id:'epruebaForm',
        height: 120,
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
                width: 290,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        allowBlank:false
                    },
                    {
                        xtype: 'combobox',
                        name: 'estado',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Estado',
                        allowBlank:false,
                        store:estadoStore
                    }
                ]
            },{
                xtype: 'container',
                height: 80,
                width: 258,
                items: [
                    {
                        xtype: 'combobox',
                        name: 'usuario',
                        id:'cmbUsuarioPrueba',
                        fieldLabel: 'Usuario',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: usuarioStore
                    },                    
                    {
                        xtype: 'hiddenfield',
                        id:'form-ecarpeta-id',             
                        name: 'carpeta',                
                        allowBlank:false                         
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-epeticion-id',             
                        name: 'peticion',                
                        allowBlank:false                         
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('epruebaForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_ejepruebap',               
                        success: function(form,action) {                                                       
                            ecarpetaStore.load();
                        },
                        failure: function(form,action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        }]
    })

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

eprueba = Ext.create('widget.window', {        
        height: 295,
        width: 580,
        closeAction: 'hide',
        title: 'XXXX',
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
            items: [epruebaForm]
        }
        ]
    }),

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
                            Ext.getCmp('pbView').setVisible(false);
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
                eprueba.show();
            } else {
                alert('Debes seleccionar una carpeta');
            }
        }
    },'-',{
        text:"Eliminar Vinculo",
        handler: function() {
            if (pbID) {
                if (confirm("¿Desea eliminar el registro?")) {            
                    Ext.Ajax.request({
                        url: '/delete_prueba',
                        params: {
                            id: pbID
                        },
                        success: function(response) {
                            carpetaStore.load();
                            Ext.getCmp('pbView').setVisible(false);
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
    store: carpetaStore,
    listeners: {
        select: function(self, record, index, eOpts) {                                
            var id = record.internalId.toString();
            if (id.indexOf('p') == -1) {
                Ext.getCmp('form-carpeta-id').setValue(id);
                pbID = null;
                Ext.getCmp('pbView').setVisible(false);
            } else {
                Ext.getCmp('pbView').setActiveTab(0);
                pbID =  id.replace('p','');
                pruebaStore.load({params: {
                    id: pbID
                }, callback: function(record) {
                    Ext.getCmp('form-carpeta-id').setValue("");
                    Ext.getCmp('form-prueba-id').setValue(pbID);                        
                    Ext.getCmp('pbView').setVisible(true);
                    Ext.getCmp('pruebaFormEdit').loadRecord(record[0]);

                    var cmb = Ext.getCmp('cmbUsuarioPrueba');
                    var record = cmb.findRecordByDisplay(cmb.getValue());                
                    cmb.select(record);
                }});
                ppruebaStore.load({params: {
                    id: pbID
                }});
                Ext.getCmp('form-prueba-id-p').setValue(pbID);
                
            }
            
        }
    }
});




var pbView = Ext.create('Ext.tab.Panel', {
    id:'pbView',              
    width : '100%',
    border: 0,
    bodyBorder:false,
    items: [forms.pruebaForm, gridPasoPrueba]
});
pbView.setVisible(false);

var epruebaPanel = {
    id:"pruebas-panel",
    layout : "border",
    title: 'Pruebas',
    width : '100%',   
    items : [{
        region : "center",            
        width : '50%',
        border: 0,
        items: [pbView]
    },
    {
        region : "north",
        split : false,
        border: 0,
        height : 30,
        items:[tbPruebas]
    },
    treeCarpeta
    ]
}