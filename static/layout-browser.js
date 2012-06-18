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

    var peticionStore = Ext.create('Ext.data.Store', {        
        model:'PeticionModel',
        proxy: {
            type: 'ajax',
            url: '/get_peticion'            
        }
    });
    peticionStore.load();
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
                alert('Selecciona a item');
            }
        },'-',{
            text:"Actualizar",
            handler: function() {
                peticionStore.load();
            }
        }],
        listeners : {
            itemdblclick: function(self, record, number, index, eOpts) {                          
                windows.peticiones.show();
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

    var storePr = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'ajax',
            url: 'static/tree-pr.json'
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

    var treePr = Ext.create('Ext.tree.Panel', {
        id: 'tree-pr',
        title: 'Pruebas',
        region:'north',
        split: true,
        height: 360,
        minSize: 150,
        rootVisible: false,
        autoScroll: true,        
        store: storePr
    });    
 
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
    cPanel.add(treePr);
});