'use strict';

App.module("LayoutModule", function (LayoutModule) {
    LayoutModule.startWithParent = false;
    LayoutModule.views = {};
    this.collection = {};
    LayoutModule.options = {};
    LayoutModule.handler = null;
    LayoutModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.LayoutModule.on('before:start', function(options){
    App.execute('debug', 'App.LayoutModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
    },
    paths: {
    }
});

require([
    'modules/layout/views/layout_item',
    //'modules/stack/models/stack_item',
    //'css!modules/stack/css/stack.css'
],
    function() {
        require([
            //'css!jquery-ui-css/jquery-ui.min.css'
        ],   
        function () {
            App.module('LayoutModule', function (LayoutModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.LayoutModule.addInitializer function called.', 0);
                    if (this.options.id && typeof(this.options.id) !== undefined ) {
                        App.LayoutModule.options = this.options;
                        this.views.LayoutView = new App.LayoutModule.LayoutItemView({ layout_id: this.options.id, layout_class: this.options.class });
    
                        this.options.region.show(this.views.LayoutView);
                    }
                    else {
                        App.execute('debug', 'App.LayoutModule.addInitializer: stack_id required.', -1);
                    }
                });
                
                LayoutModule.start = function() {
                    App.execute('debug', 'App.LayoutModule.start function called.', 0);

                };

            });
            /*
            
            App.LayoutModule.vent.on('App.LayoutModule.WindowItemView.click_icon_close', function(args) {
                App.execute('debug', 'App.LayoutModule.WindowItemView.click_icon_close.', 0);
                App.LayoutModule.remove({'id': args.model.get('id')})
                App.vent.trigger('App.LayoutModule.click_icon_close', args);
            });
            
            

            App.LayoutModule.vent.on('LayoutItemView.render', function(args){
                App.execute('debug', 'LayoutItemView.render event called.', 0);
                App.vent.trigger('LayoutItemView.render', args);
            });
            
            App.LayoutModule.vent.on('LayoutItemView.resize.stop', function(args){
                App.execute('debug', 'LayoutItemView.resize.stop event called.', 0);
                App.vent.trigger('LayoutItemView.resize.stop', args);
            })
            */
            
            App.vent.trigger('LayoutModule.start');
        }
        
    )}
)
