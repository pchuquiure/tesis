var peticionStore;
var defectoStore;
var carpetaStore;
var pbID;
var resultFilterStore;

Ext.define('GeneralModel',{
    extend: 'Ext.data.Model',
    fields: [                        
        'label',
        'id'        
    ]
});

var estadoStore = Ext.create('Ext.data.Store', {
    fields: ['label','value'],     
    data : [
        {"value":"nuevo", "label":"Nuevo"},
        {"value":"pendiente", "label":"Pendiente"},
        {"value":"cerrado", "label":"Cerrado"}
    ]
});

var estadoDefectoStore = Ext.create('Ext.data.Store', {
    fields: ['label','value'],     
    data : [
        {"value":"abierto", "label":"Abierto"},
        {"value":"re-abierto", "label":"Re-Abierto"},
        {"value":"pendiente", "label":"Pendiente"},
        {"value":"cerrado", "label":"Cerrado"}
    ]
});

var tipoStore = Ext.create('Ext.data.Store', {
    fields: ['label','value'],     
    data : [
        {"value":"funcionalidad", "label":"Funcionalidad"},
        {"value":"diseño", "label":"Diseño"},
        {"value":"Otro", "label":"Otro"}
    ]
});

var tipoDefectoStore = Ext.create('Ext.data.Store', {
    fields: ['label','value'],     
    proxy: {
        type: 'ajax',
        url: '/get_tipo_defecto'
    }
});
tipoDefectoStore.load();

var gravedadStore = Ext.create('Ext.data.Store', {
    fields: ['label','value'],     
    data : [
        {"value":"Alta", "label":"Alta"},
        {"value":"Media", "label":"Media"},
        {"value":"Baja", "label":"Baja"}
    ]
});

var peticionSimpleStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',  
    proxy: {
        type: 'ajax',
        url: '/get_peticion_simple'
    }
});
peticionSimpleStore.load()

var canalStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',  
    proxy: {
        type: 'ajax',
        url: '/get_canal'
    }
});
canalStore.load();

var aplicativoStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',  
    proxy: {
        type: 'ajax',
        url: '/get_aplicativo'
    }
});
aplicativoStore.load();

var usuarioStore = Ext.create('Ext.data.Store', {
    model:'GeneralModel',
    proxy: {
        type: 'ajax',
        url: '/get_usuario'
    }
});
usuarioStore.load();

var forms = {
    peticiones: Ext.create('Ext.form.Panel', {
        id:'peticionesFormEdit',
        height: 295,
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
                        id: 'cmbCanal',
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
                        id: 'cmbUsuario',
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
                        id: 'cmbAplicativo',
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
                        xtype: 'textfield',
                        width: 545,
                        name: 'imagen',
                        fieldLabel: 'Imagen',
                        allowBlank:true,
                        readOnly:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'filefield',
                        width: 545,
                        name: 'imagenFile',
                        fieldLabel: 'Cambiar Imagen',
                        allowBlank:true,
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
            handler: function() {
                var form = Ext.getCmp('peticionesFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_peticion',               
                        success: function(form,action) {                            
                            peticionStore.load();                      
                            windows.peticiones.hide();
                        },
                        failure: function(form,action){ 
                            console.log(form);
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
                        name: 'imagenFile',
                        fieldLabel: 'Imagen',
                        allowBlank:true,
                        labelAlign: 'top'
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
                            windows.nuevaPeticion.hide();
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
    }),
    defectosForm: Ext.create('Ext.form.Panel', {
        name:'defectosForm',
        id:'defectosForm',
        height: 300,
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
                        id:'cmbTipoDefecto',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Estado',
                        allowBlank:false,
                        store:estadoDefectoStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'tipo',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Tipo',
                        allowBlank:false,
                        store:tipoDefectoStore
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
                        name: 'peticion',
                        fieldLabel: 'Petición',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: peticionSimpleStore
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
                        name: 'gravedad',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Gravedad',
                        allowBlank:false,
                        store:gravedadStore
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
                        height: 70,
                        width: 545,
                        name: 'resumen',
                        fieldLabel: 'Resumen',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 55,
                        width: 545,
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'filefield',
                        width: 545,
                        name: 'imagenFile',
                        fieldLabel: 'Imagen',
                        allowBlank:true,
                        labelAlign: 'top'
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('defectosForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_defecto',               
                        success: function(form,action) {
                            form.reset();                            
                            defectoStore.load();                                                
                            windows.nuevoDefecto.hide();
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
                windows.nuevoDefecto.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    defectos: Ext.create('Ext.form.Panel', {
        id:'defectosFormEdit',        
        height: 350,
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
                        store:estadoDefectoStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'tipo',
                        id:'cmbTipoDefecto',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Tipo',
                        allowBlank:false,
                        store:tipoDefectoStore
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
                        name: 'peticion',
                        id:'cmbPeticionDefecto',
                        fieldLabel: 'Petición',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: peticionSimpleStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'usuario',
                        id:'cmbUsuarioDefecto',
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
                        name: 'gravedad',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Gravedad',
                        allowBlank:false,
                        store:gravedadStore
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
                        height: 70,
                        width: 545,
                        name: 'resumen',
                        fieldLabel: 'Resumen',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 55,
                        width: 545,
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textfield',
                        width: 545,
                        name: 'imagen',
                        fieldLabel: 'Imagen',
                        allowBlank:true,
                        readOnly:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'filefield',
                        width: 545,
                        name: 'imagenFile',
                        fieldLabel: 'Cambiar Imagen',
                        allowBlank:true,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-defecto-id',             
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
                var form = Ext.getCmp('defectosFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_defecto',               
                        success: function(form,action) {
                            form.reset();                            
                            defectoStore.load();                            
                            windows.defectos.hide();
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
                windows.defectos.hide();                
                this.up('form').getForm().reset();
            }
        }]
    }),
    carpeta: Ext.create('Ext.form.Panel', { 
        id:'carpetaForm',      
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
                var form = Ext.getCmp('carpetaForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_carpeta',               
                        success: function(form,action) {
                            form.reset();                            
                            carpetaStore.load();                                                
                            windows.carpeta.hide();
                            Ext.getCmp('form-carpeta-id').setValue("");
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
                windows.carpeta.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    prueba: Ext.create('Ext.form.Panel', { 
        id:'pruebaForm',      
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
                        fieldLabel: 'Usuario',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        store: usuarioStore
                    },
                    {
                        xtype: 'combobox',
                        name: 'tipo',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Tipo',
                        allowBlank:false,
                        store:tipoStore
                    },
                    {
                        xtype: 'textfield',
                        name: 'ruta',                        
                        fieldLabel: 'Ruta',
                        allowBlank:false                        
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-carpeta-id',             
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
                var form = Ext.getCmp('pruebaForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_prueba',               
                        success: function(form,action) {
                            form.reset();                            
                            carpetaStore.load();                                              
                            windows.prueba.hide();
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
                windows.prueba.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    pruebaForm: Ext.create('Ext.form.Panel', {
        title:'Prueba',
        id:'pruebaFormEdit',      
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
                        xtype: 'combobox',
                        name: 'tipo',
                        displayField: 'label',
                        valueField: 'value',
                        editable:false,
                        fieldLabel: 'Tipo',
                        allowBlank:false,
                        store:tipoStore
                    },
                    {
                        xtype: 'textfield',
                        name: 'ruta',                        
                        fieldLabel: 'Ruta',
                        allowBlank:false                        
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-prueba-id',             
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
                var form = Ext.getCmp('pruebaFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_prueba',               
                        success: function(form,action) {                                                       
                            //carpetaStore.load();
                        },
                        failure: function(form,action){
                            this.up('form').getForm().reset();
                        }
                    });
                }                
            }
        }]
    }),
    pprueba: Ext.create('Ext.form.Panel', { 
        id:'ppruebaForm',      
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
                        allowBlank:false
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
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'observaciones',
                        fieldLabel: 'Observaciones',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'esperado',
                        fieldLabel: 'Esperado',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-prueba-id-p',      
                        name: 'pid',                
                        allowBlank:false
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                var form = Ext.getCmp('ppruebaForm').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_pprueba',               
                        success: function(form, action) {
                            form.reset();                            
                            ppruebaStore.load({params: {
                                id: pbID
                            }});
                            Ext.getCmp('form-prueba-id-p').setValue(pbID);                                            
                            windows.pasoprueba.hide();
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
                windows.pasoprueba.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    ppruebaEdit: Ext.create('Ext.form.Panel', { 
        id:'ppruebaFormEdit',      
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
                        allowBlank:false
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
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'observaciones',
                        fieldLabel: 'Observaciones',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'textareafield',
                        height: 59,
                        width: 545,
                        name: 'esperado',
                        fieldLabel: 'Esperado',
                        allowBlank:false,
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'hiddenfield',
                        id:'form-pprueba-id',      
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
                var form = Ext.getCmp('ppruebaFormEdit').getForm();
                if(form.isValid()) {                    
                    form.submit({
                        formBind: true,
                        waitMsg:'Guardando...',
                        url: '/guarda_pprueba',               
                        success: function(form, action) {
                            //form.reset();                            
                            ppruebaStore.load({params: {
                                id: pbID
                            }});                                                                        
                            windows.pasopruebaEdit.hide();
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
                windows.pasopruebaEdit.hide();
                this.up('form').getForm().reset();
            }
        }]
    }),
    dfiltro: Ext.create('Ext.form.Panel', { 
        id:'dfiltro-form',      
        height: 250,
        width: 200,
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
                width: 180,
                items: [
                    {
                        xtype: 'combobox',
                        name: 'canal',
                        id: 'cmbCanalDFiltro',
                        fieldLabel: 'Canal',
                        displayField: 'label',
                        valueField: 'id',
                        editable:false,
                        blankText:'Elige',
                        allowBlank:false,
                        labelAlign: 'top',
                        store: canalStore,
                        listeners: {
                            change: function(self, value, oldValue, eOpts) {
                                resultFilterStore.load({params: {
                                    cid: value
                                }});
                            }
                        }
                    }
                ]
            }            
        ]        
    })

}