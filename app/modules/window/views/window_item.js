'use strict';

define([
    'text!modules/window/templates/window_item.html',
    ],
    function(window_item){
        App.WindowModule.WindowItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class') + ' window_item_view');
            },
            events: {
                'click .icon_minimize': 'click_icon_minimize'
            },
            attributes : function () {
                return {
                };
            },
            template: function() {
                return _.template(window_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.WindowModule.WindowItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                console.log(_options);
                if (_options && _options.draggable && typeof(_options.draggable) !== undefined) {
                    this.$el.draggable(_options.draggable);
                }
                if (_options && _options.resizable && typeof(_options.resizable) !== undefined) {
                    _options.resizable.stop = function( event, ui ) {
                        App.WindowModule.vent.trigger('WindowItemView.resize.stop', {'event': event, 'ui': ui});
                    };

                    _options.resizable.resize = function( event, ui ) {
                        App.WindowModule.vent.trigger('WindowItemView.resize', {'event': event, 'ui': ui});
                    };
                    this.$el.resizable(_options.resizable);
                }
                App.WindowModule.vent.trigger('WindowItemView.render', this);
            },
            
            click_icon_minimize: function(i, e) {
                App.execute('debug', 'App.WindowModule.WindowItemView.onRender event called.', 0);
                this._width  =  this.$el.width();
                this._height =  this.$el.height();
                this.$el.velocity({
                    properties: { width: '80px', height: '80px' },
                    options:    { duration: 400, easing: "spring", mobileHA: true }
                });
                App.WindowModule.vent.trigger('App.WindowModule.WindowItemView.click_icon_minimize', this);
            }
        });
    }
);