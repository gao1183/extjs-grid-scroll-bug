Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.define('Row', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'row'
    }],
    idField: 'row'
});

Ext.onReady(function() {
    
    // Create the Data Store.
    // Because it is buffered, the automatic load will be directed
    // through the prefetch mechanism, and be read through the page cache
    var store = Ext.create('Ext.data.Store', {
        model: 'Row',
        buffered: true,
        pageSize: 200,
        proxy: {
            type: 'rest',
            url: 'list',
            reader: {
                type: 'json',
                root: 'results',
                successProperty: 'success'
            }
        }
    });
    

    var grid = Ext.create('Ext.grid.Panel', {
        width: 300,
        height: 500,
        title: 'Buffered Grid of 10,000,000 rows',
        store: store,
        loadMask: true,
        selModel: {
            pruneRemoved: false
        },
        viewConfig: {
            trackOver: false
        },
        // grid columns
        columns:[
        {   text: 'Row Number',
            dataIndex: 'row',
            xtype: 'numbercolumn', 
            sortable: true,
            groupable: false,
            width:300,
            format:'0,000'
        }],
        renderTo: Ext.getBody()
    });

    store.load();    
});
