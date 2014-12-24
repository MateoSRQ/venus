'use strict';

define([
    'text!modules/window/templates/window_item.html',
    ],
    function(window_item){
        App.WindowModule.WindowItemView  = Backbone.Marionette.ItemView.extend({
            _width: null,
            _height: null,
            
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class') + ' window_item_view');
            },
            events: {
                'click .icon_minimize': 'click_icon_minimize',
                'click .icon_restore': 'click_icon_restore',
                'click .icon_close': 'click_icon_close'
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
                App.execute('debug', 'App.WindowModule.WindowItemView.click_icon_minimize event called.', 0);
                this._width  =  this.$el.width();
                this._height =  this.$el.height();
                this.$el.velocity({
                    properties: { width: '80px', height: '80px' },
                    options:    { duration: 400, easing: "spring", mobileHA: true }
                });
                console.log(i);
                this.$el.addClass('minimized');
                this.$el.find('.icon_minimize').hide();
                this.$el.find('.icon_restore').show();
                this.$el.find('.ui-resizable-handle').hide();
            
                App.WindowModule.vent.trigger('App.WindowModule.WindowItemView.click_icon_minimize', this);
            },

            click_icon_restore: function(i, e) {
                App.execute('debug', 'App.WindowModule.WindowItemView.click_icon_restore event called.', 0);
                this.$el.velocity({
                    properties: { width: this._width + 'px', height: this._height + 'px' },
                    options:    { duration: 400, easing: "spring", mobileHA: true }
                });
                console.log(i);
                this.$el.removeClass('minimized');
                this.$el.find('.icon_restore').hide();
                this.$el.find('.icon_minimize').show();
                this.$el.find('.ui-resizable-handle').show();
                
                App.WindowModule.vent.trigger('App.WindowModule.WindowItemView.click_icon_restore', this);
            },            

            click_icon_close: function(i, e) {
                App.execute('debug', 'App.WindowModule.WindowItemView.click_icon_close event called.', 0);
                App.WindowModule.vent.trigger('App.WindowModule.WindowItemView.click_icon_close', this);
            }
            
        });
    }
);