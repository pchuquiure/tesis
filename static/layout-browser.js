Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', 'static/ux');

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
    'Ext.tab.Panel',
    'Ext.ux.layout.Center'  
]);

Ext.onReady(function(){
 
    Ext.tip.QuickTipManager.init();

    var detailEl;
    var viewport;

    var layoutBase = [];
    Ext.Object.each(getBasicLayouts(), function(name, ly) {
        layoutBase.push(ly);
    });
    
    Ext.Object.each(getCustomLayouts(), function(name, ly){
        layoutBase.push(ly);
    });    

    Ext.create('Ext.data.Store', {
        storeId:'simpsonsStore',
        fields:['name', 'email', 'phone'],
        data:{'items':[
            { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
            { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
            { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
            { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
        ]},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Simpsons',
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        columns: [
            { header: 'Name',  dataIndex: 'name' },
            { header: 'Email', dataIndex: 'email', flex: 1 },
            { header: 'Phone', dataIndex: 'phone' }
        ],
        height: 200,
        width: 400        
    });


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
        }
        ,
        proxy: {
            type: 'ajax',
            url: 'static/tree-data.json'
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
                fn: function(self, store_record, html_element, node_index, event) {
                    //contentPanel.add(grid);
                                 
                    viewport.layout.centerRegion.add(grid);                    
                    viewport.layout.centerRegion.doLayout();
                    //viewport.refresh();
                    
                    console.log(viewport.layout.centerRegion);
                    //contentPanel.items.append(grid);
                }
            }
        },
        store: store
    });
 
    viewport = Ext.create('Ext.Viewport', {
        layout: 'border',
        autoRender: true,
        title: 'Proyecto :: Tesis',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> Proyecto :: Tesis</h1>',
            height: 30
        },{
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
});
