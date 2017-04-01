/*!
 * Spectragram by Adrian Quevedo (http://adrianquevedo.com/)
 * http://spectragram.js.org/
 *
 * Licensed under the MIT license.
 * You are free to use this plugin in commercial projects as long as the copyright header is left intact.
 *
 * This plugin uses the Instagram(tm) API and is not endorsed or certified by Instagram, Inc.
 * All Instagram(tm) logos and trademarks displayed on this plugin are property of Instagram, Inc.
 *
 */

// Utility for older browsers
if ( typeof Object.create !== "function" ) {
    Object.create = function ( obj ) {
        function F () {}
        F.prototype = obj;
        return new F();
    };
}

( function ( $, window, document, undefined ) {

	var Instagram = {

		API_URL: "https://api.instagram.com/v1",

        // Initialize function
        initialize: function ( options, elem ) {
            this.elem = elem;
            this.$elem = $( elem );
			this.accessData = $.fn.spectragram.accessData,
			this.accessToken = this.accessData.accessToken,
			this.clientID = this.accessData.clientID,
			this.userCredentials = this.clientID + "&access_token=" + this.accessToken + "",
			this.options = $.extend( {}, $.fn.spectragram.options, options );

			this.messages = {
				defaultImageAltText: "Instagram Photo related with " + this.options.query,
				notFound: "This user account is private or doesn't have any photos."
			};
        },

        // Users
		// Get the most recent media published by a user.
        getRecentMedia: function ( userID ) {
			var self = this,
				getData = "/users/" + userID + "/media/recent/?" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
                    self.display( results );
                } );
		},

		// Search for a user by name.
        getUserFeed: function () {
			var self = this,
				getData = "/users/search?q=" + self.options.query + "&count=" + self.options.max + "&access_token=" + self.accessToken + "",
				isUsernameValid = false;

				self.fetch( getData ).done( function ( results ) {
					if ( results.data.length ) {
						// Only request media for exact match of username
						for ( var length = results.data.length, i = 0; i < length; i++ ) {
							if ( results.data[i].username === self.options.query ) {
								self.getRecentMedia( results.data[i].id );
								isUsernameValid = true;
							}
						}
					}

					if ( isUsernameValid === false ) {
						$.error( "Spectragram.js - Error: the username " + self.options.query + " does not exist." );
					}
                } );
		},
        // Media
        // Get a list of what media is most popular at the moment
        getPopular: function () {
            var self = this,
                getData = "/media/popular?client_id=" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
                    self.display( results );
                } );
        },

        // Tags
        // Get a list of recently tagged media
        getRecentTagged: function () {
            var self = this,
                getData = "/tags/" + self.options.query + "/media/recent?client_id=" + self.userCredentials;

                self.fetch( getData ).done( function ( results ) {
					if ( results.data.length ) {
						self.display( results );
					} else {
						$.error( "Spectragram.js - Error: the tag " + self.options.query + " does not have results." );
					}
                } );
        },

        fetch: function ( getData ) {
            var getUrl = this.API_URL + getData;

            return $.ajax( {
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: getUrl
            } );
        },

        display: function ( results ) {
            var $element,
            	$image,
		heightSetting,
                isWrapperEmpty,
            	imageGroup = [],
                imageCaption,
                imageHeight,
                imageWidth,
                max,
                setSize,
		size,
		widthSetting;

            isWrapperEmpty = $( this.options.wrapEachWith ).length === 0;

            if ( results.data === undefined || results.meta.code !== 200 || results.data.length === 0 ) {
            	if ( isWrapperEmpty ) {
            		this.$elem.append( this.messages.notFound );
            	} else {
                	this.$elem.append( $( this.options.wrapEachWith ).append( this.messages.notFound ) );
            	}
            } else {
            	max = ( this.options.max >= results.data.length ) ? results.data.length : this.options.max;
            	setSize = this.options.size;
		WidthSetting = this.options.width;
		HeightSetting = this.options.height;

				for ( var i = 0; i < max; i++ ) {
					if ( setSize === "small" ) {
						size = results.data[i].images.thumbnail.url;
						imageHeight = results.data[i].images.thumbnail.height;
						imageWidth = results.data[i].images.thumbnail.width;
					} else if ( setSize === "medium" ) {
						size = results.data[i].images.low_resolution.url;
						imageHeight = results.data[i].images.low_resolution.height;
						imageWidth = results.data[i].images.low_resolution.width;
					} else {
						size = results.data[i].images.standard_resolution.url;
						imageHeight = results.data[i].images.standard_resolution.height;
						imageWidth = results.data[i].images.standard_resolution.width;
					}

					imageCaption = ( results.data[i].caption !== null ) ?
									$( "<span>" ).text( results.data[i].caption.text ).html() :
									this.messages.defaultImageAltText;

					$image = $( "<img>", {
						alt: imageCaption,
						style: "width: " + (WidthSetting === null ? imageWidth + "px" : WidthSetting) + "; height: " + (HeightSetting === null ? imageHeight + "px": HeightSetting),
						src: size
					} );

					$element = $( "<a>", {
						href: results.data[i].link,
						target: "_blank",
						title: imageCaption
					} ).append( $image );

					if ( isWrapperEmpty ) {
						imageGroup.push( $element );
					} else {
						imageGroup.push( $( this.options.wrapEachWith ).append( $element ) );
					}
				}

				this.$elem.append( imageGroup );
            }

			if ( typeof this.options.complete === "function" ) {
				this.options.complete.call( this );
			}
        }
    };

	jQuery.fn.spectragram = function ( method, options ) {
		if ( jQuery.fn.spectragram.accessData.clientID ) {

			this.each( function () {
				var instagram = Object.create( Instagram );

				instagram.initialize( options, this );

				if ( instagram[method] ) {
					return instagram[method]( this );
				} else {
					$.error( "Method " + method + " does not exist on jQuery.spectragram" );
				}
			});

		} else {
			$.error( "You must define an accessToken and a clientID on jQuery.spectragram" );
		}
    };

    // Plugin Default Options
    jQuery.fn.spectragram.options = {
		complete : null,
	        height: null,
		max: 10,
		query: "instagram",
		size: "medium",
	    	width: null,
		wrapEachWith: "<li></li>"	    	
    };

	// Instagram Access Data
	jQuery.fn.spectragram.accessData = {
        accessToken: null,
		clientID: null
    };

} )( jQuery, window, document );
