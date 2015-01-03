'use strict';

define([
    'text!modules/layout/templates/layout_item.html',
    ],
    function(layout_item){
        App.LayoutModule.LayoutItemView  = Backbone.Marionette.ItemView.extend({
           
            tagName: 'div',
            initialize: function(){
                console.log('xxx');
                console.log(this.options);
                this.$el.prop('id', this.options.layout_id);
                this.$el.prop('class', this.options.layout_class);
            },
            events: {
            },
            attributes : function () {
                return {
                };
            },
            template: function() {
                return _.template(layout_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.StackModule.LayoutItemView.onRender event called.', 0);
                App.LayoutModule.vent.trigger('LayoutItemView.render', this);
            }
            
        });
    }
);