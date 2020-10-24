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

		API_URL: "https://graph.instagram.com/me/media?fields=",
		API_FIELDS: "caption,media_url,media_type,permalink,timestamp,username",

		/**
		 * Initializes the plugin.
		 * @param {object} options
		 * @param {jQuery Object} elem
		 */
        initialize: function ( options, elem ) {
            this.elem = elem;
            this.$elem = $( elem );
			this.accessToken = $.fn.spectragram.accessData.accessToken,
			this.options = $.extend( {}, $.fn.spectragram.options, options );

			this.messages = {
				defaultImageAltText: "Instagram Photo",
				notFound: "This user account is private or doesn't have any photos."
			};

			this.getPhotos();
		},

		/**
		 * Calls the fetch function and work with the response.
		 */
		getPhotos: function () {
			var self = this;

			self.fetch().done( function ( results ) {
				if ( results.data && results.data.length ) {
					self.displayPhotos( results );
				} else if ( results.error.message ) {
					$.error( "Spectragram.js - Error: " + results.error.message );
				} else {
					$.error( "Spectragram.js - Error: user does not have photos." );
				}
			} );
		},

		/**
		 * Makes the ajax call and returns the result.
		 */
        fetch: function () {
			var getUrl = this.API_URL + this.API_FIELDS + "&access_token=" + this.accessToken;

            return $.ajax( {
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: getUrl
            } );
        },

		/**
		 * Appends the markup to the DOM with the images.
		 * @param {object} results
		 */
        displayPhotos: function ( results ) {
            var $element,
            	$image,
				hasCaption,
				isWrapperEmpty,
				isImage,
            	imageGroup = [],
                imageCaption,
                max,
				size;

			var sizeChart = {
				"small": 160,
				"medium": 320,
				"large": 640
			};

            isWrapperEmpty = $( this.options.wrapEachWith ).length === 0;
			max = ( this.options.max >= results.data.length ) ? results.data.length : this.options.max;
			size = sizeChart[this.options.size];

            if ( results.data === undefined || results.data.length === 0 ) {
            	if ( isWrapperEmpty ) {
            		this.$elem.append( this.messages.notFound );
            	} else {
                	this.$elem.append( $( this.options.wrapEachWith ).append( this.messages.notFound ) );
				}

				return;
			}

			for ( var i = 0; i < max; i++ ) {

				isImage = results.data[i].media_type === "IMAGE";

				if (isImage) {
					hasCaption = results.data[i].caption !== null || results.data[i].caption !== undefined;

					imageCaption = ( hasCaption ) ?
									$( "<span>" ).text( results.data[i].caption ).html() :
									this.messages.defaultImageAltText;

					$image = $( "<img>", {
						alt: imageCaption,
						attr: {
							height: size,
							width: size
						},
						src: results.data[i].media_url
					} );

					$element = $( "<a>", {
						href: results.data[i].permalink,
						target: "_blank",
						title: imageCaption
					} ).append( $image );

					if ( isWrapperEmpty ) {
						imageGroup.push( $element );
					} else {
						imageGroup.push( $( this.options.wrapEachWith ).append( $element ) );
					}

				}
			}

			var t = this;
			this.$elem.append(imageGroup).append(function () {
				/**
				 * Nested appends makes sure that we fire the callback function after the DOM has been actually updated
				 */
				if (typeof t.options.complete === "function") {
					t.options.complete.call(t);
				}
			});
        }
    };

	/**
	 * Spectragram Plugin Definition.
	 */
	jQuery.fn.spectragram = function ( options ) {
		if ( jQuery.fn.spectragram.accessData.accessToken ) {

			this.each( function () {
				var instagram = Object.create( Instagram );

				instagram.initialize( options, this );
			});

		} else {
			$.error( "You must define an accessToken on jQuery.spectragram" );
		}
    };

    // Plugin Default Options.
    jQuery.fn.spectragram.options = {
		complete : null,
		max: 25,
		size: "large",
		wrapEachWith: "<li></li>"
    };

	// Instagram Access Data.
	jQuery.fn.spectragram.accessData = {
        accessToken: null
    };

} )( jQuery, window, document );
