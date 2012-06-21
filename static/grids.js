Ext.define('AdjuntoModel',{
    extend: 'Ext.data.Model',
    fields: [                        
        'tamano',
        'file',
        'fecha_creacion'          
    ]
});

Ext.define('DefectoVinModel',{
    extend: 'Ext.data.Model',
    fields: [            
        {name: 'peticion', mapping: 'peticion.label'},            
        {name: 'usuario', mapping: 'usuario.label'},
        'nombre',
        'descripcion',
        'resumen',        
        'tipo',
        'gravedad',
        'fecha_creacion',
        'imagen',
        'estado'
    ]
});

var peticionAttachStore = Ext.create('Ext.data.Store', {        
    model:'AdjuntoModel',
    proxy: {
        type: 'ajax',
        url: '/get_peticion_attach'
    }
});

var defectosVinculadosStore = Ext.create('Ext.data.Store', {        
    model:'DefectoVinModel',
    proxy: {
        type: 'ajax',
        url: '/get_defecto'
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
    height: 195,
    width: 565,       
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {
            
        }
    }    
});

var gridDectosVinculados = Ext.create('Ext.grid.Panel', {
    id: 'grid-pe-defectos',
    title: 'Defectos vinculados',
    border:0,
    store: defectosVinculadosStore,
    columns: [
            { header: 'Nombre',  dataIndex: 'nombre' },
            { header: 'Resumen', dataIndex: 'resumen', flex: 1 },
            { header: 'Descrición', dataIndex: 'descripcion', flex: 1 },
            { header: 'Fecha de Creación', dataIndex: 'fecha_creacion', flex: 1 },
            { header: 'Tipo', dataIndex: 'tipo', flex: 1 },
            { header: 'Estado', dataIndex: 'estado', flex: 1 },
            { header: 'Gravedad', dataIndex: 'gravedad', flex: 1 },
            { header: 'Petición', dataIndex: 'peticion', flex: 1 },
            { header: 'Usuario', dataIndex: 'usuario' }
    ],
    height: 295,
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