var Fun2Day = function (config) {
    config = config || {};
    Fun2Day.superclass.constructor.call(this, config);
};
Ext.extend(Fun2Day, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('fun2day', Fun2Day);

Fun2Day = new Fun2Day();