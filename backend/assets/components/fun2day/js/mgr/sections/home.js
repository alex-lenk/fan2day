Fun2Day.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'fun2day-panel-home',
            renderTo: 'fun2day-panel-home-div'
        }]
    });
    Fun2Day.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(Fun2Day.page.Home, MODx.Component);
Ext.reg('fun2day-page-home', Fun2Day.page.Home);