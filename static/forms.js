var peticionStore;

Ext.define('EstadoModel',{
    extend: 'Ext.data.Model',
    fields: [                        
        'tamano',
        'file',
        'fecha_creacion'          
    ]
});

Ext.define('GeneralModel',{
    extend: 'Ext.data.Model',
    fields: [                        
        'label',
        'id'        
    ]
});

var estadoStore = Ext.create('Ext.data.Store', {    
    model:'EstadoModel',
    data : [
        {"value":"nuevo", "label":"Nuevo"},
        {"value":"pendiente", "label":"Pendiente"},
        {"value":"cerrado", "label":"Cerrado"}
    ]
});

var canalStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',  
    proxy: {
        type: 'ajax',
        url: '/get_canal'
    }
});

var aplicativoStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',  
    proxy: {
        type: 'ajax',
        url: '/get_aplicativo'
    }
});

var usuarioStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',
    proxy: {
        type: 'ajax',
        url: '/get_usuario'
    }
});

var forms = {
    peticiones: Ext.create('Ext.form.Panel', {
        id:'peticionesFormEdit',
        height: 255,
        width: 570,
        bodyBorder:false,
        border:0,
        layout: {
            type: 'column'
        },
        bodyPadding: 10,
        frameHeader: false,
        model:'PeticionModel',
        titleCollapse: false,
        fieldDefaults: {
            bindToModel: true
        },
        items: [
            {
                xtype: 'container',
                height: 80,
                width: 290,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'nombre',
                        allowBlank:false,
                        fieldLabel: 'Nombre'
                    },
                    {
                        xtype: 'combobox',
                        name: 'estado',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        allowBlank:false,
                        fieldLabel: 'Estado',
                        store:estadoStore
                    }
                ]
            },
            {
                xtype: 'container',
                height: 80,
                width: 258,
                items: [
                    {
                        xtype: 'combobox',
                        name: 'canal',
                        fieldLabel: 'Canal',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: canalStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'usuario',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        fieldLabel: 'Usuario',
                        allowBlank:false,
                        store:usuarioStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'aplicativo',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        fieldLabel: 'Aplicativo',
                        allowBlank:false,
                        store:aplicativoStore
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
                        height: 79,
                        width: 545,
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'filefield',
                        width: 545,
                        name: 'imagen',
                        fieldLabel: 'Imagen',
                        allowBlank:false,
                        labelAlign: 'top'
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function() {
                var form = Ext.getCmp('peticionesFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_peticion',               
                        success: function(form,action) {
                            //form.reset();                            
                            peticionStore.load();                          
                            windows.nuevaPeticion.hide();
                        },
                        failure: function(form,action){
                            //this.up('form').getForm().reset();
                        }
                    });
                }
            }
        },{
            text: 'Cerrar',
            margin:'0 15 0 0',
            handler: function() {
                windows.peticiones.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    peticionesForm: Ext.create('Ext.form.Panel', {
        name:'peticionesForm',
        id:'peticionesForm',
        height: 255,
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
            },
            {
                xtype: 'container',
                height: 80,
                width: 258,
                items: [
                    {
                        xtype: 'combobox',
                        name: 'canal',
                        fieldLabel: 'Canal',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: canalStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'usuario',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        fieldLabel: 'Usuario',
                        allowBlank:false,
                        store:usuarioStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'aplicativo',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        fieldLabel: 'Aplicativo',
                        allowBlank:false,
                        store:aplicativoStore
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
                        height: 79,
                        width: 545,
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'filefield',
                        width: 545,
                        name: 'imagen',
                        fieldLabel: 'Imagen',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-peticion-id',             
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
                var form = Ext.getCmp('peticionesForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_peticion',               
                        success: function(form,action) {
                            form.reset();                            
                            peticionStore.load();
                            var selected = Ext.getCmp('grid-pe').getSelectionModel().selected;
                            var id = selected.items[0].data.id;
                            Ext.getCmp('form-peticion-id').setValue(id);                            
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
                windows.nuevaPeticion.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    peticionesFormAttach: Ext.create('Ext.form.Panel', {        
        id:'peticionesFormAttach',
        height: 100,
        width: 565,
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
                id:'form-attach-id',             
                name: 'id',                
                allowBlank:false                            
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('peticionesFormAttach').getForm();
                if(form.isValid()) {        
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_peticion_attach',               
                        success: function(form,action) {
                            form.reset();
                            var selected = Ext.getCmp('grid-pe').getSelectionModel().selected;
                            var id = selected.items[0].data.id;
                            Ext.getCmp('form-attach-id').setValue(id);
                            peticionAttachStore.load({params: {
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
    })

}