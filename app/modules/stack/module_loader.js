'use strict';

App.module("StackModule", function (StackModule) {
    StackModule.startWithParent = false;
    StackModule.views = {};
    this.collection = {};
    StackModule.options = {};
    StackModule.handler = null;
    StackModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.StackModule.on('before:start', function(options){
    App.execute('debug', 'App.StackModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
        'bespoke':  { deps:[] }
    },
    paths: {
        'bespoke': '../../app/modules/stack/libs/bespoke/dist/bespoke.min',
    }
});

require([
    
    'modules/stack/views/stack_item',
    'modules/stack/models/stack_item',
    'css!modules/stack/css/stack.css'
    
],
    function() {
        require([
            'bespoke',
            'modules/stack/views/stack_collection',
            'modules/stack/models/stack_collection',            
            
            //'css!jquery-ui-css/jquery-ui.min.css'
        ],   
        function () {
            App.module('StackModule', function (StackModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.StackModule.addInitializer function called.', 0);
                    
                    this.collection = new App.StackModule.StackCollection();
                    App.StackModule.options = this.options;
                    this.views.StackView = new App.StackModule.StackView({collection: this.collection, window_id: this.options.id });

                    this.options.region.show(this.views.StackView);
                    
                });
                
                StackModule.add = function(models) {
                    App.execute('debug', 'App.StackModule.add function called.', 0);
                    this.collection.add(models);
                };
                
                StackModule.remove = function(condition) {
                    App.execute('debug', 'App.StackModule.remove function called.', 0);
                    this.collection.remove(this.collection.where(condition));
                };
            });
            
            App.StackModule.vent.on('App.StackModule.WindowItemView.click_icon_close', function(args) {
                App.execute('debug', 'App.StackModule.WindowItemView.click_icon_close.', 0);
                App.StackModule.remove({'id': args.model.get('id')})
                App.vent.trigger('App.StackModule.click_icon_close', args);
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
            
            App.vent.trigger('StackModule.start');
        }
        
    )}
)
