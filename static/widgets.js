var menu = {
    peticiones: Ext.create('Ext.menu.Menu', {
        width: 200,
        height: 100,
        border:0,
        plain: true,
        frame:false,        
        floating: false,        
        items: [{
            text: 'Detalle',
            handler: function() {                                
                groupPeAttach.hide();
                forms.peticiones.show();
                gridDectosVinculados.hide();
            }
        },{
            text: 'Datos Adjuntos',
            handler: function() {                                            
                groupPeAttach.show();
                forms.peticiones.hide();
                gridDectosVinculados.hide();
            }

        },{
            text: 'Defectos Vinculados',
            handler: function() {
                gridDectosVinculados.show();
                forms.peticiones.hide();
                groupPeAttach.hide();
            }
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
        id:'win-peticiones',
        height: 330,
        width: 785,
        closeAction: 'hide',
        title: 'Detalle de petición',
        closable: true,
        plain: false,
        resizable:false,           
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
            items: [forms.peticiones, groupPeAttach, gridDectosVinculados]
        }
        ]
    }),
    nuevoDefecto: Ext.create('widget.window', {        
        height: 335,
        width: 580,
        closeAction: 'hide',
        title: 'Nuevo defecto',
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
            items: [forms.defectosForm]
        }
        ]
    }),
    defectos: Ext.create('widget.window', {        
        height: 385,
        width: 580,
        closeAction: 'hide',
        title: 'Detalle de defecto',
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
            items: [forms.defectos]
        }
        ]
    }),
    carpeta: Ext.create('widget.window', {        
        height: 125,
        width: 580,
        closeAction: 'hide',
        title: 'Nueva Carpeta',
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
            items: [forms.carpeta]
        }
        ]
    }),
    prueba: Ext.create('widget.window', {        
        height: 155,
        width: 580,
        closeAction: 'hide',
        title: 'Nueva Prueba',
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
            items: [forms.prueba]
        }
        ]
    }),
    pasoprueba: Ext.create('widget.window', {        
        height: 295,
        width: 580,
        closeAction: 'hide',
        title: 'Nuevo Paso de Prueba',
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
            items: [forms.pprueba]
        }
        ]
    }),
    pasopruebaEdit: Ext.create('widget.window', {        
        height: 295,
        width: 580,
        closeAction: 'hide',
        title: 'Detalle Paso de Prueba',
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
            items: [forms.ppruebaEdit]
        }
        ]
    }),
    dfiltro: Ext.create('widget.window', {
        id:'win-dfiltro',
        height: 300,
        width: 450,
        closeAction: 'hide',
        title: 'Detalle por tipo de defectos',
        closable: true,
        plain: false,
        resizable:false,           
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
            items: [forms.dfiltro]      
        },
        {
            region: 'center',            
            border:0,
            items: [resultFilterGrid]
        }
        ]
    }),
}
