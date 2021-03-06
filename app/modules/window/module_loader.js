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
    App.execute('debug', 'App.WindowModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
        'jquery-ui': { deps:['jquery'] },
        'velocity':  { deps:['jquery'] }
    },
    paths: {
        'jquery-ui': '../../app/modules/window/libs/jquery-ui-1.11.2/jquery-ui.min',
        'jquery-ui-css': '../../app/modules/window/libs/jquery-ui-1.11.2',
        'velocity': '../../app/modules/window/libs/velocity/velocity-1.1.0-min'
    }
});

require([
    'modules/window/views/window_item',
    'modules/window/models/window_item',
    
    'css!modules/window/css/window.css'
],
    function() {
        require([
            'jquery-ui',
            'velocity',
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
                        this.options.region.show(this.views.WindowView);
                    }
                    else {
                        App.execute('debug', 'App.WindowModule.addInitializer: window_id required.', -1);
                    }
                    
                });
                
                WindowModule.add = function(models) {
                    App.execute('debug', 'App.WindowModule.add function called.', 0);
                    this.collection.add(models);
                    
                };
                
                WindowModule.remove = function(condition) {
                    App.execute('debug', 'App.WindowModule.remove function called.', 0);
                    this.collection.remove(this.collection.where(condition));
                };
            });
            
            App.WindowModule.vent.on('App.WindowModule.WindowItemView.click_icon_close', function(args) {
                App.execute('debug', 'App.WindowModule.WindowItemView.click_icon_close.', 0);
                App.WindowModule.remove({'id': args.model.get('id')})
                App.vent.trigger('App.WindowModule.click_icon_close', args);
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
