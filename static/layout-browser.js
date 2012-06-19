Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.container.Viewport',
    'Ext.layout.*',
    'Ext.form.Panel',
    'Ext.form.Label',    
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.tree.*',
    'Ext.selection.*',
    'Ext.tab.Panel'
]);

Ext.onReady(function(){
    var viewport;
    var cPanel;    

    var layoutBase = [];
    Ext.Object.each(getBasicLayouts(), function(name, ly) {
        layoutBase.push(ly);
    });
    
    Ext.Object.each(getCustomLayouts(), function(name, ly){
        layoutBase.push(ly);
    });

    Ext.define('DefectoModel',{
        extend: 'Ext.data.Model',
        fields: [            
            {name: 'peticion', mapping: 'peticion.label'},            
            {name: 'usuario', mapping: 'usuario.label'},
            {name: 'tipo', mapping: 'tipo.label'},
            'nombre',
            'descripcion',
            'resumen',
            'gravedad',
            'fecha_creacion',
            'imagen',
            'estado'
        ]
    });

    Ext.define('PeticionModel',{
        extend: 'Ext.data.Model',
        fields: [            
            {name: 'aplicativo', mapping: 'aplicativo.label'},
            {name: 'canal', mapping: 'canal.label'},
            {name: 'usuario', mapping: 'usuario.label'},
            'nombre',
            'descripcion',
            'fecha_creacion',
            'imagen',
            'estado'
        ]
    }); 

    Ext.define('PruebaModel',{
        extend: 'Ext.data.Model',
        fields: [  
            'nombre',
            'ruta',
            'tipo',
            {name: 'usuario', mapping: 'usuario.label'},         
            'fecha_creacion',            
            'estado',
            'id'
        ]
    });  

    peticionStore = Ext.create('Ext.data.Store', {        
        model:'PeticionModel',
        proxy: {
            type: 'ajax',
            url: '/get_peticion'            
        }
    });
    peticionStore.load();    

    defectoStore = Ext.create('Ext.data.Store', { 
        model:'DefectoModel',
        proxy: {
            type: 'ajax',
            url: '/get_defecto'
        }
    });
    defectoStore.load();

    var pruebaStore = Ext.create('Ext.data.Store', {        
        model:'PruebaModel',
        proxy: {
            type: 'ajax',
            url: '/get_prueba'            
        }
    });

    /**
    * Grid para peticiones
    */
    var gridPe = Ext.create('Ext.grid.Panel', {
        id: 'grid-pe',
        title: 'Peticiones',
        store: peticionStore,
        columns: [
            { header: 'Nombre',  dataIndex: 'nombre' },
            { header: 'Descripcion', dataIndex: 'descripcion', flex: 1 },
            { header: 'Fecha de creación', dataIndex: 'fecha_creacion', flex: 1 },
            { header: 'Estado', dataIndex: 'estado', flex: 1 },
            { header: 'Usuario', dataIndex: 'usuario', flex: 1 },
            { header: 'Aplicativo', dataIndex: 'aplicativo', flex: 1 },            
            { header: 'Canal', dataIndex: 'canal' }
        ],
        height: '100%',
        width: '100%',
        tbar: ["Acciones:",{
            text:"Nuevo",
            handler: function() {                
                windows.nuevaPeticion.show();
            }
        },'-',{
            text:"Eliminar",
            handler: function() {
                if (gridPe.getSelectionModel().selected.length > 0) {
                    if (confirm("¿Desea eliminar el registro?")) {
                        var selected = gridPe.getSelectionModel().selected;
                        var id = selected.items[0].data.id;
                        Ext.Ajax.request({
                            url: '/delete_peticion',
                            params: {
                                id: id
                            },
                            success: function(response) {
                                peticionStore.load();
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
                peticionStore.load();
            }
        }],
        listeners : {
            itemdblclick: function(self, record, number, index, eOpts) {                
                var form = Ext.getCmp('peticionesFormEdit');
                form.loadRecord(record);                             

                var cmb = Ext.getCmp('cmbCanal');
                var record = cmb.findRecordByDisplay(cmb.getValue());
                cmb.select(record);

                cmb = Ext.getCmp('cmbAplicativo');
                record = cmb.findRecordByDisplay(cmb.getValue());                
                cmb.select(record);

                cmb = Ext.getCmp('cmbUsuario');
                record = cmb.findRecordByDisplay(cmb.getValue());                
                cmb.select(record);

                windows.peticiones.show();
                var selected = gridPe.getSelectionModel().selected;
                var id = selected.items[0].data.id;
                Ext.getCmp('form-peticion-id').setValue(id);
                Ext.getCmp('form-attach-id').setValue(id);
                gridPeAttach.store = peticionAttachStore;
                gridPeAttach.getStore().load({params: {
                    id: id
                }});

                gridDectosVinculados.getStore().load({params: {
                    pid: id
                }});               
            }
        }    
    });

    /**
    * Grid para Defectos
    */
    var gridDe = Ext.create('Ext.grid.Panel', {
        id: 'grid-de',
        title: 'Defectos',
        store: defectoStore,        
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
        height: '100%',
        width: '100%',
        tbar: ["Acciones:",{
            text:"Nuevo",
            handler: function() {                
                windows.nuevoDefecto.show();
            }
        },'-',{
            text:"Eliminar",
            handler: function() {
                if (gridDe.getSelectionModel().selected.length > 0) {
                    if (confirm("¿Desea eliminar el registro?")) {
                        var selected = gridDe.getSelectionModel().selected;
                        var id = selected.items[0].data.id;
                        Ext.Ajax.request({
                            url: '/delete_defecto',
                            params: {
                                id: id
                            },
                            success: function(response) {
                                defectoStore.load();
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
                defectoStore.load();
            }
        },'-',{
            text:"Info por tipos",
            handler: function() {
                windows.dfiltro.show();
            }
        }],
        listeners : {
            itemdblclick: function(self, record, number, index, eOpts) {                
                var form = Ext.getCmp('defectosFormEdit');
                form.loadRecord(record);                             

                var cmb = Ext.getCmp('cmbPeticionDefecto');
                var record = cmb.findRecordByDisplay(cmb.getValue());
                cmb.select(record);

                cmb = Ext.getCmp('cmbUsuarioDefecto');
                record = cmb.findRecordByDisplay(cmb.getValue());                
                cmb.select(record);

                cmb = Ext.getCmp('cmbTipoDefecto');
                record = cmb.findRecordByDisplay(cmb.getValue());                
                cmb.select(record);

                windows.defectos.show();
                var selected = gridDe.getSelectionModel().selected;
                var id = selected.items[0].data.id;
                Ext.getCmp('form-defecto-id').setValue(id);
            }
        }    
    });

    /*
    * Contenedor Central (CENTER).
    */
    var contentPanel = {
         id: 'content-panel',
         region: 'center',
         layout: 'card',
         margins: '2 5 5 0',
         activeItem: 0,
         border: false, 
         items: layoutBase
    };

    var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'ajax',
            url: 'static/tree-data.json'
        }
    });

    carpetaStore = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: false
        },        
        proxy: {
            type: 'ajax',            
            url: '/get_carpeta'
        }
    });

    var treePanel = Ext.create('Ext.tree.Panel', {
        id: 'tree-panel',
        title: 'Menu',
        region:'north',        
        split: true,
        height: 360,
        minSize: 150,
        rootVisible: false,
        autoScroll: true,
        listeners : {            
            itemclick: {
                fn: function(self, record, element, index, event) {                    
                    if (record.data.id) {
                        cPanel.layout.setActiveItem(record.data.id);
                    }
                }
            }
        },
        store: store
    });
    
    var tbPruebas = {
        xtype:'toolbar',
        width: '100%',
        items: ["Acciones:", {
            text:"Nueva Carpeta",
            handler: function() {                
                windows.carpeta.show();
            }
        },'-',{
            text:"Eliminar Carpeta",
            handler: function() {
                if (Ext.getCmp('form-carpeta-id').getValue()) {
                    if (confirm("¿Desea eliminar el registro?")) {
                        var id = Ext.getCmp('form-carpeta-id').getValue();
                        Ext.Ajax.request({
                            url: '/delete_carpeta',
                            params: {
                                id: id
                            },
                            success: function(response) {
                                carpetaStore.load();
                                Ext.getCmp('pbView').setVisible(false);
                            }
                        });
                    }
                } else {
                    alert('Debes seleccionar una carpeta');
                }
            }
        },'-',{
            text:"Agregar Prueba",
            handler: function() {
                if (Ext.getCmp('form-carpeta-id').getValue()) {
                    windows.prueba.show();
                } else {
                    alert('Debes seleccionar una carpeta');
                }
            }
        },'-',{
            text:"Eliminar Prueba",
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

    var pruebaPanel = {
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
 
    /**
    * Contenedor ViewPort
    */
    viewport = Ext.create('Ext.Viewport', {
        layout: 'border',
        autoRender: true,
        title: 'Proyecto :: Tesis',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1>Proyecto :: Tesis</h1>',
            height: 30
        },
        {
            layout: 'border',
            id: 'layout-browser',
            region:'west',
            border: false,
            split:true,
            margins: '2 0 5 5',
            width: 200,
            minSize: 100,
            maxSize: 500,
            items: [treePanel]
        }, 
            contentPanel
        ],
        renderTo: Ext.getBody()
    });

    /**
    * Agregamos las grillas y otros componentes que se visualizará.
    */
    cPanel = Ext.getCmp('content-panel');
    cPanel.add(gridPe);
    cPanel.add(gridDe);
    cPanel.add(pruebaPanel);
});
