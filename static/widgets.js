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

var storeChartOne = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],    
    proxy: {
        type: 'ajax',
        url: '/get_chart_one'            
    }    
});
storeChartOne.load();

var chart2axes = {
    type:"Numeric",
    id:"axesTwo",
    position:"left",            
    grid:true,
    decimals:1,
    minimum:0    
}

var storeChartTwo = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data', 'total'],    
    proxy: {
        type: 'ajax',
        url: '/get_chart_two'            
    },
    listeners: {
        datachanged: function(self, eOpts) {
            try {
                console.log("change");             
                chart2axes.maximum = self.data.items[0].data.total;
            } catch(e) {};
        }
    }
});
storeChartTwo.load();

var chart1 = Ext.create('Ext.chart.Chart', {    
    width: 450,
    height: 300,
    margin: 30,
    animate: true,
    store: storeChartOne,    
    theme: 'Base:gradients',
    legend: {
        position: 'right'
    },
    series: [{
        type: 'pie',
        field: 'data',
        showInLegend: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {                
                this.setTitle(storeItem.get('data') + ' peticiones');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});

var chart2 = Ext.create('Ext.chart.Chart', {
    id: 'chartCmp',
    width: 480,
    height: 350,
    animate: true,    
    store: storeChartTwo,
    axes: [
        chart2axes,
        {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'N° Casos de prueba por usuario'
        }
    ],
    series: [
        {
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('data') + ' casos de prueba');
              }
            },
            label: {
              display: 'insideEnd',
              'text-anchor': 'middle',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'name',
            yField: 'data'
        }
    ]
});

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
    grafico_up: Ext.create('widget.window', {
        id:'win-grafico-up',
        height: 400,
        width: 500,
        closeAction: 'hide',
        title: 'N° Peticiones por usuario',
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
            region: 'center',            
            border:0,
            items: [chart1]
        }
        ]
    }),
    grafico_ucp: Ext.create('widget.window', {
        id:'win-grafico-ucp',
        height: 400,
        width: 500,
        closeAction: 'hide',
        title: 'N° Casos de prueba por usuario',
        closable: true,
        plain: false,
        resizable:false,           
        border:0,
        layout: {
            type:"fit",
            padding: 2
        },
        items: [        
        {
            region: 'center',            
            border:0,
            items: [chart2]
        }
        ]
    })
}
