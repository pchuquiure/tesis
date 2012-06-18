var menu = {
    peticiones: Ext.create('Ext.menu.Menu', {
        width: 200,
        height: 100,
        border:0,
        plain: true,
        frame:false,        
        floating: false,        
        items: [{
            text: 'Detalle'
        },{
            text: 'Datos Adjuntos'
        },{
            text: 'Defectos Vinculados',
            disabled:true
        }]
    })
}

var windows = {
    nuevaPeticion: Ext.create('widget.window', {        
        height: 290,
        width: 580,
        closeAction: 'hide',
        title: 'Nueva petición',
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
            items: [forms.peticionesForm]
        }
        ]
    }),
    peticiones: Ext.create('widget.window', {
        height: 290,
        width: 785,
        closeAction: 'hide',
        title: 'Detalle de petición',
        closable: true,
        plain: false,                
        border:0,
        layout: {
            type: 'border',
            padding: 2
        },
        items: [
        {
            region: 'west',            
            frameHeader: false,
            width: 200,
            split: true,
            collapsible: false,
            floatable: false,
            border:0,
            items: [menu.peticiones]         
        },
        {
            region: 'center',            
            border:0,
            items: [forms.peticiones]
        }
        ]
    })
}