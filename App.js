Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        this.add({
            xtype: 'rallyreleasecombobox',
            listeners: {
                ready: this._onReleasesLoaded,
                select: this._onReleaseChanged,
                scope: this
            }
        });
    },
    _onReleasesLoaded:function(){
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['userstory', 'defect'],
            autoLoad: true,
            enableHierarchy: false,
            filters: [this._getReleseFilter()]
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });

    },
    
    _onStoreBuilt: function(store) {
        this.add({
            margin: '10px 0 0 0',
            xtype: 'rallytreegrid',
            store: store,
            context: this.getContext(),
            columnCfgs: [
                'FormattedID',
                'Name',
                'ScheduleState',
                'Owner',
                'Feature'
            ]
        });
    },
    
    _onReleaseChanged:function(){
        var treeGrid = this.down('rallytreegrid'),
        treeStore = treeGrid.getStore();
            
        treeStore.clearFilter(true);
        treeStore.filter(this._getReleseFilter());
    },
    
    _getReleseFilter:function(){
        return this.down('rallyreleasecombobox').getQueryFromSelected();
    }
});
