var estadoStore = Ext.create('Ext.data.Store', {
    fields: ['label', 'value'],
    data : [
        {"value":"nuevo", "label":"Nuevo"},
        {"value":"pendiente", "label":"Pendiente"},
        {"value":"cerrado", "label":"Cerrado"}        
    ]
});

var canalStore = Ext.create('Ext.data.Store', {
    fields: ['label', 'id'],    
    proxy: {
        type: 'ajax',
        url: '/get_canal'
    }
});

var aplicativoStore = Ext.create('Ext.data.Store', {
    fields: ['label', 'id'],    
    proxy: {
        type: 'ajax',
        url: '/get_aplicativo'
    }
});

var usuarioStore = Ext.create('Ext.data.Store', {
    fields: ['label', 'id'],    
    proxy: {
        type: 'ajax',
        url: '/get_usuario'
    }
});

var forms = {
    peticiones: Ext.create('Ext.form.Panel', {
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
                    }
                ]
            }
        ],
        buttons: [{
            text: 'Guardar',
            margin:'0 5 0 0',
            handler: function(){
                this.up('form').getForm().submit({
                    url: '/guarda_peticion',
                    submitEmptyText: false,
                    waitMsg: 'Guardando...'
                });
            }
        },{
            text: 'Cerrar',
            margin:'0 15 0 0',
            handler: function() {
                windows.nuevaPeticion.hide();
                this.up('form').getForm().reset();
            }
        }]
    })
}