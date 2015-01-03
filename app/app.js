'use strict';
console.clear();

require([
    'marionette',
    'material_design',
    'css!css_bootstrap/bootstrap.min.css',
    'css!css_material_design/material.min.css'
],
    function (Marionette) {
        window.App = new Backbone.Marionette.Application({
        });
        
        App.layers = null;

        App.addRegions({
            //appRegion: '#app_region',
            stackRegion: '#stack_region',
            layoutRegion: '#layout_region'
        });

        App.commands.setHandler('debug', function(text, level){
            if (level == -1) {
                console.error('debug: ' + text);
            }
            else {
                if (level >=  window.debug){
                    console.log('debug: ' + text);
                }
            }
        });
        
        App.commands.setHandler('load', function(dirname, module, options){
            App.execute('debug', 'App.commands.setHandler() called.', 0);
            if (!eval('App.' + module)) {
                require([
                    'modules/' + dirname + '/module_loader',
                ], function() {
                    eval('App.' + module + '.start(options);');
                });    
            }
        });
        
        App.on('before:start', function(options){
            App.execute('debug', 'App before:start event called.', 0);
        });
        
        App.on('start', function(options){
            App.execute('debug', 'App.start event called.', 0); 
            if (Backbone.history){
                Backbone.history.start();
                App.execute('debug', 'App.history started', 0); 
            }
        });
        
        App.vent.on('WindowModule.start', function(options){
            App.execute('debug', 'WindowModule.start event called.', 0); 
            App.WindowModule.add([
                { id: 'window_1', class: 'class_1', options: { draggable: {}, resizable: {} } },
                { id: 'window_2', class: 'class_2', options: { draggable: {}, resizable: {} } },
                { id: 'window_3', class: 'class_3', options: { draggable: {}, resizable: {} } },
                { id: 'window_4', class: 'class_4', options: { draggable: {}, resizable: {} } }
            ]);
            App.WindowModule.remove({
                id: 'window_3'
            })
        });
        
        App.vent.on('StackModule.start', function(options){
            App.execute('debug', 'StackModule.start event called.', 0); 
            App.StackModule.add([
                { id: 'stack_1', class: 'stack_item well', options: {  } },
                { id: 'stack_2', class: 'stack_item well', options: {  } },
                { id: 'stack_3', class: 'stack_item well', options: {  } },
                { id: 'stack_4', class: 'stack_item well', options: {  } },
                { id: 'stack_5', class: 'stack_item well', options: {  } },
                { id: 'stack_6', class: 'stack_item well', options: {  } },
                { id: 'stack_7', class: 'stack_item well', options: {  } },
                { id: 'stack_8', class: 'stack_item well', options: {  } }
            ]);
            App.StackModule.remove({
                id: 'stack_3'
            })
            App.StackModule.start();
        });
        
        
        require([

        ], function() {
            App.start();

            require([
                
            ], function(){
                //App.execute('load', 'window', 'WindowModule', {id: 'window', region: App.appRegion});
                App.execute('load', 'stack', 'StackModule', {id: 'stack', region: App.stackRegion});
                //App.execute('load', 'map', 'MapModule', {id: 'map', region: App.mapRegion});
                App.execute('load', 'layout', 'LayoutModule', {id: 'layout', region: App.layoutRegion, class: 'layout'});
                
            })
        })
    }
);
