(function() {
    tinymce.create('tinymce.plugins.youtube_embed_shortcode', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            ed.addButton('youtube_embed', {
                title : 'YouTube Embed',
                cmd : 'youtube_embed_command',
                image : url + '/../img/editor_icon.png'
            });

            ed.addCommand('youtube_embed_command', function() {
                var selectedText = ed.selection.getContent(),
                    shortcodeDefaults = {
                        url: "",
                        width: "300",
                        height: "400",
                        autoplay: true
                    };

                if (selectedText.trim().length > 0) {
                    var parsedShortcode = wp.shortcode.next('youtube-embed', selectedText);

                    if (parsedShortcode) {
                        shortcodeDefaults = jQuery.extend(
                            shortcodeDefaults,
                            parsedShortcode.shortcode.attrs.named
                        );
                    }
                }
                // convert string to boolean
                shortcodeDefaults.autoplay = shortcodeDefaults.autoplay === true || shortcodeDefaults.autoplay === "true";

                ed.windowManager.open({
                    title: 'YouTube embed shortcode',
                    width: 500,
                    height: 400,
                    id: 'youtube-embed-shortcode',
                    body: [
                        {
                            type: 'textbox',
                            size: 40,
                            name: 'url',
                            label: 'Video URL',
                            value: shortcodeDefaults.url
                        },
                        {
                            type: 'textbox',
                            size: 15,
                            name: 'width',
                            label: 'Width',
                            value: shortcodeDefaults.width
                        },
                        {
                            type: 'textbox',
                            size: 15,
                            name: 'height',
                            label: 'Height',
                            value: shortcodeDefaults.height
                        },
                        {
                            type: 'checkbox',
                            name: 'autoplay',
                            label: 'Auto play',
                            checked: shortcodeDefaults.autoplay
                        }
                    ],
                    onSubmit: function(e) {
                        var shortcode = new wp.shortcode({
                            tag: 'youtube-embed',
                            attrs: {
                                url: e.data.url,
                                width: e.data.width,
                                height: e.data.height,
                                autoplay: e.data.autoplay
                            },
                            type: "single"
                        });

                        ed.execCommand('mceInsertContent', 0, shortcode.string());
                    }
                });
            });
        },

        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'YouTube Embed',
                author : 'RAFIE Younes',
                version : "0.1"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add( 'youtube_embed_shortcode', tinymce.plugins.youtube_embed_shortcode );
})();
