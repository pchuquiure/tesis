function getBasicLayouts() {

    var cardNav = function(incr){
        var l = Ext.getCmp('card-wizard-panel').getLayout();
        var i = l.activeItem.id.split('card-')[1];
        var next = parseInt(i, 10) + incr;
        l.setActiveItem(next);
        Ext.getCmp('card-prev').setDisabled(next===0);
        Ext.getCmp('card-next').setDisabled(next===2);
        
    };
    return {
        /*
         * ================  Start page config  =======================
         */
        start: {
            id: 'start-panel',
            title: 'Vista',
            layout: 'fit',
            bodyStyle: 'padding:25px',
            contentEl: 'start-div'
        }
    };
}
