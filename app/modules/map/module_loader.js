'use strict';

App.module("MapModule", function (MapModule) {
    MapModule.startWithParent = false;
    MapModule.views = {};
    this.collection = {};
    MapModule.options = {};
    MapModule.handler = null;
    MapModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.MapModule.on('before:start', function(options){
    App.execute('debug', 'App.MapModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
        'ol3': { deps:[] }
    },
    paths: {
        'ol3': '../../app/modules/map/libs/ol3/ol-debug',
        'ol3-css' : '../../app/modules/map/libs/css'
    }
});

require([
    'modules/map/views/map_item',
    'css!ol3-css/ol.css',
    
    //'css!modules/window/css/window.css'
],
    function() {
        require([
            'ol3',

            'modules/map/views/map_collection',
            'modules/map/models/map_collection',

            //'css!modules/window/css/layout.css',
            //'css!jquery-ui-css/jquery-ui.min.css'
        ],   
        function () {
            App.module('MapModule', function (MapModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.MapModule.addInitializer function called.', 0);

                    if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.MapModule.MapCollection();
                        App.MapModule.options = this.options;
                        this.views.MapView = new App.MapModule.MapView({collection: this.collection, map_id: this.options.id });
                        this.options.region.show(this.views.MapView);
                    }
                    else {
                        App.execute('debug', 'App.MapModule.addInitializer: map_id required.', -1);
                    }
                    
                });
                
                MapModule.add = function(models) {
                    App.execute('debug', 'App.MapModule.add function called.', 0);
                    this.collection.add(models);
                    
                };
                
                MapModule.remove = function(condition) {
                    App.execute('debug', 'App.MapModule.remove function called.', 0);
                    this.collection.remove(this.collection.where(condition));
                };
            });
            
            App.MapModule.vent.on('App.MapModule.MapItemView.click_icon_close', function(args) {
                App.execute('debug', 'App.MapModule.MapItemView.click_icon_close.', 0);
                App.MapModule.remove({'id': args.model.get('id')})
                App.vent.trigger('App.MapModule.click_icon_close', args);
            });
            
            
            /*
            App.LayoutModule.vent.on('LayoutItemView.render', function(args){
                App.execute('debug', 'LayoutItemView.render event called.', 0);
                App.vent.trigger('LayoutItemView.render', args);
            });
            
            App.LayoutModule.vent.on('LayoutItemView.resize.stop', function(args){
                App.execute('debug', 'LayoutItemView.resize.stop event called.', 0);
                App.vent.trigger('LayoutItemView.resize.stop', args);
            })
            */
            
            App.vent.trigger('MapModule.start');
        }
        
    )}
)
