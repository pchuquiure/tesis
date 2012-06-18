Ext.define('AdjuntoModel',{
    extend: 'Ext.data.Model',
    fields: [                        
        'tamano',
        'file',
        'fecha_creacion'          
    ]
});
var peticionAttachStore = Ext.create('Ext.data.Store', {        
    model:'AdjuntoModel',
    proxy: {
        type: 'ajax',
        url: '/get_peticion_attach'                   
    }
});

var gridPeAttach = Ext.create('Ext.grid.Panel', {
    id: 'grid-pe-attach',
    title: 'Datos Adjuntos',
    border:0,
    store: peticionAttachStore,
    columns: [
        { header: 'Nombre',  dataIndex: 'file', flex: 1 },
        { header: 'Tamaño', dataIndex: 'tamano', flex: 1 },
        { header: 'Fecha de creación', dataIndex: 'fecha_creacion', flex: 1 }          
    ],
    height: 150,
    width: 565,       
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {
            
        }
    }    
});

var groupPeAttach = Ext.create('Ext.Panel', {
    frameHead:false,
    border:0,
    items: [gridPeAttach, forms.peticionesFormAttach]
});