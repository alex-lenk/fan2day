Fun2Day.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'fun2day-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('fun2day') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('fun2day_items'),
                layout: 'anchor',
                items: [{
                    html: _('fun2day_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'fun2day-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    Fun2Day.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(Fun2Day.panel.Home, MODx.Panel);
Ext.reg('fun2day-panel-home', Fun2Day.panel.Home);
