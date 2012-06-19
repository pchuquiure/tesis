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

Ext.define('PpruebaModel',{
    extend: 'Ext.data.Model',
    fields: [ 
        'num_paso',
        'descripcion',
        'esperado',        
        'observaciones'        
    ]
});

Ext.define('ResultFilterModel',{
    extend: 'Ext.data.Model',
    fields: [ 
        'tipo',
        'cantidad'        
    ]
});

var peticionAttachStore = Ext.create('Ext.data.Store', {        
    model:'AdjuntoModel',
    proxy: {
        type: 'ajax',
        url: '/get_peticion_attach'
    }
});

var ppruebaStore = Ext.create('Ext.data.Store', {        
    model:'PpruebaModel',
    proxy: {
        type: 'ajax',
        url: '/get_pprueba'
    }
});

resultFilterStore = Ext.create('Ext.data.Store', {        
    model:'ResultFilterModel',
    proxy: {
        type: 'ajax',
        url: '/get_dfilter'
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

var gridPasoPrueba = Ext.create('Ext.grid.Panel', {
    id: 'grid-paso-prueba',
    title: 'Paso prueba',
    border:0,
    store: ppruebaStore,
    columns: [
        { header: 'N° paso',  dataIndex: 'num_paso', flex: 1 },
        { header: 'Descrición', dataIndex: 'descripcion', flex: 1 },
        { header: 'Observaciones', dataIndex: 'observaciones', flex: 1 },
        { header: 'Esperado', dataIndex: 'esperado', flex: 1 }        
    ],
    height: '100%',
    width: '100%',
    tbar: ["Acciones:",{
        text:"Nuevo",
        handler: function() {                
            windows.pasoprueba.show();
        }
    },'-',{
        text:"Eliminar",
        handler: function() {
            var gridPP = Ext.getCmp('grid-paso-prueba');
            if (gridPP.getSelectionModel().selected.length > 0) {
                if (confirm("¿Desea eliminar el registro?")) {
                    var selected = gridPP.getSelectionModel().selected;
                    var id = selected.items[0].data.id;
                    Ext.Ajax.request({
                        url: '/delete_pprueba',
                        params: {
                            id: id
                        },
                        success: function(response) {
                            ppruebaStore.load({params: {
                                id: pbID
                            }});
                        }
                    });
                }
            }  else {
                alert('Selecciona el item a eliminar');
            }
        }
    },'-',{
        text:"Actualizar",
        handler: function() {
            ppruebaStore.load({params: {
                id: pbID
            }});
        }
    }],       
    listeners : {
        itemdblclick: function(self, record, number, index, eOpts) {
            var form = Ext.getCmp('ppruebaFormEdit');
            form.loadRecord(record);

            windows.pasopruebaEdit.show();
            var selected = self.getSelectionModel().selected;
            var id = selected.items[0].data.id;
            Ext.getCmp('form-pprueba-id').setValue(id);
        }
    }    
});

var resultFilterGrid = Ext.create('Ext.grid.Panel', {
    id: 'grid-filter-result',
    frameHeader:false,
    border:0,
    store: resultFilterStore,
    columns: [
        { header: 'Tipo',  dataIndex: 'tipo', flex: 1 },
        { header: 'Cantidad', dataIndex: 'cantidad', flex: 1 }          
    ],
    height: 200,
    width: 300
});