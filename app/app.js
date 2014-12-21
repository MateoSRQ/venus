'use strict';
console.clear();

require([
    'marionette'
],
    function (Marionette) {
        window.App = new Backbone.Marionette.Application({
        });
        
        App.layers = null;

        App.addRegions({
            appRegion: '#app_region', 
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
                { id: 'window_1', class: 'class_1', options: { draggable: {   } } },
                { id: 'window_2', class: 'class_2', options: { draggable: {   } } }
            ]);
        });
        
        
        require([

        ], function() {
            App.start();

            require([
                
            ], function(){
                App.execute('load', 'window', 'WindowModule', {id: 'window', region: App.appRegion}); 
            })
        })
    }
);
