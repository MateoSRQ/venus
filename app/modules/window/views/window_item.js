'use strict';

define([
    'text!modules/window/templates/window_item.html',
    ],
    function(window_item){
        App.WindowModule.WindowItemView  = Backbone.Marionette.ItemView.extend({
            template: function() {
                return _.template(window_item)({
                })
            }
        });
    }
);