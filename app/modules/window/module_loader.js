'use strict';

App.module("WindowModule", function (WindowModule) {
    WindowModule.startWithParent = false;
    WindowModule.views = {};
    this.collection = {};
    WindowModule.options = {};
    WindowModule.handler = null;
    WindowModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.WindowModule.on('before:start', function(options){
    App.execute('debug', 'Module App::LayoutModule before:start event invoked [LOADER.JS]', 0); 
    this.options = options;
});

requirejs.config({
    shim: {
        'jquery-ui': { deps:['jquery'] }
    },
    paths: {
        'jquery-ui': '../../app/modules/window/libs/jquery-ui-1.11.2/jquery-ui.min',
        'jquery-ui-css': '../../app/modules/window/libs/jquery-ui-1.11.2',
    }
});

require([
    'modules/window/views/window_item',
    'modules/window/models/window_item'    
],
    function() {
        require([
            'jquery-ui',
            'modules/window/views/window_collection',
            'modules/window/models/window_collection',

            //'css!modules/window/css/layout.css',
            'css!jquery-ui-css/jquery-ui.min.css'
        ],   
        function () {
            App.module('WindowModule', function (WindowModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.WindowModule.addInitializer function called.', 0);

                    if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.WindowModule.WindowCollection();
                        App.WindowModule.options = this.options;
                        this.views.WindowView = new App.WindowModule.WindowView({collection: this.collection, window_id: this.options.id });
                        console.log(this.options.region);
                        console.log(this.views.WindowView);
                        this.options.region.show(this.views.WindowView);
                        //this.options.region.show();
                    }
                    else {
                        App.execute('debug', 'App.WindowModule.addInitializer: window_id required.', -1);
                    }
                    
                });
                
                WindowModule.add = function(models) {
                    App.execute('debug', 'App.WindowModule.add function called.', 0);
                    console.log(this.collection);
                    this.collection.add(models);
                    console.log(this.collection);
                }
                
                /*
                LayoutModule.add = function(layouts) {
                    App.execute('debug', 'App.LayoutModule add function called.', 0);
                    this.collection.add(layouts);
                    var self = this;
                    _.each(layouts, function(layout){
                        console.log(layout.id);
                        console.log("App.addRegions({" + layout.name + ": '#layout_" + layout.id + "' });");
                        eval("App.addRegions({" + layout.name + ": '#" + layout.id + "' });");
                    })
                    App.vent.trigger('LayoutModule:add', layouts);
                };
                */
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
            
            App.vent.trigger('WindowModule.start');
        }
        
    )}
)
