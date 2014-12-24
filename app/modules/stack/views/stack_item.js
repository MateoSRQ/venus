'use strict';

define([
    'text!modules/stack/templates/stack_item.html',
    ],
    function(stack_item){
        App.StackModule.StackItemView  = Backbone.Marionette.ItemView.extend({
           
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class') + ' stack_item');
            },
            events: {
            },
            attributes : function () {
                return {
                };
            },
            template: function() {
                return _.template(stack_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.StackModule.StackItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                 App.WindowModule.vent.trigger('StackItemView.render', this);
            }
            
        });
    }
);