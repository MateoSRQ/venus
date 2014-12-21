'use strict';

define([
    'text!modules/window/templates/window_collection.html',
    ],
    function(window_collection){
    
        App.WindowModule.WindowView  = Backbone.Marionette.CompositeView.extend({
            template: function() {
                return _.template(window_collection)({
                })
            },
            childView: App.WindowModule.WindowItemView
        });


    
    }
);