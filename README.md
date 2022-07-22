![Spectragram](http://spectragram.js.org/i/logo.png)

**spectragram.js** is a jQuery plugin using the **Instagram API** to fetch and display user, popular or tags photo feeds inside a list or any container you define.

### [Visit Project Page](http://spectragram.js.org)

### [Download spectragram.js (minified 3kb)](https://raw.github.com/adrianengine/jquery-spectragram/master/spectragram.min.js)


---

# Instagram Platform Changes

- On June 1 2015, Instagram, which is owned by Facebook, [will stop allowing many third parties to access the images in its feeds](http://techcrunch.com/2015/11/17/just-instagram/).

- This means you will no longer be able to fetch photos form other users with spectragram after May 31.

- ~~Please follow this instructions to make it work with your own sandboxed feed:
[How to get Instagram API access token and fix your broken feed](https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed)~~ **Update:** Not longer valid.

- On April 4 2018, some endpoints this plugin use were deprecated:
[Instagram Platform Changelog](https://www.instagram.com/developer/changelog/)

- Instagram Legacy API Will be disabled. [Facebook announced the API will work until March 31, 2020.](https://developers.facebook.com/blog/post/2020/03/10/final-reminder-Instagram-legacy-api-platform-disabled-mar-31/) **Update** will be deprecated on June 29, 2020.

- Spectragram.js has been updated to use the new Instagram Basic Display API, please follow the [new Token process](https://github.com/adrianengine/jquery-spectragram/wiki/Register-on-Instagram-Basic-Display-API-and-get-an-Access-Token).

**Please upgrade** in order to make your Instagram feed work again.

---

# Features

* Get the most recent media published by one user from the Instagram Basic Display API.
* Display the results on list items or any other HTML tag you define,
* Define the size of the pictures (small, medium, large).
* Use your own Instagram application AccessToken.

# Before You Start

In order to use the plugin you will need:
- A [Facebook Developer Account](https://developers.facebook.com/apps).
- A public [Instagram Account](https://www.instagram.com/?fbclid=IwAR2DQDyKisGKXB678NN4dqMYQJc9KzIrlYrfJrYFOYq2OmYn72DbG3i1PFE) with media, and its user login credentials.

## Register an app and get an Access Token

Please [follow the instructions](https://github.com/adrianengine/jquery-spectragram/wiki/Register-on-Instagram-Basic-Display-API-and-get-an-Access-Token) to get an Access Token from the Wiki.

# Plugin Simple Usage

1. Be sure to have jQuery script included and then include the **spectragram.min.js** script right before the ``` </body>``` tag.

``` html
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 <script type="text/javascript" src="js/spectragram.min.js"></script>
```

1. Set your Instagram ```accessToken```:

``` javascript
jQuery.fn.spectragram.accessData = {
	accessToken: 'your-instagram-access-token'
};
```

1. Call **spectagram** function on the container element and pass it your custom options:

``` javascript
$('ul').spectragram({
	size: 'small'
});
```

*This example will show 25 or less photos in a list, "small" sized.*

## Configuration

``` javascript
.spectragram( Options )
```

### Options

An object to configure the properties of spectragram:

| Name             	| Required 	| Type       	| Default       	| Description                                                     	|
|------------------	|----------	|------------	|---------------	|-----------------------------------------------------------------	|
| **accessToken**  	| Yes      	| *String*   	| `null`        	| This is your Instagram Application AccessToken.                 	|
| **max**          	| No       	| *Number*   	| `25`          	| A number between 1 and 25 of photos to show.                    	|
| **size**         	| No       	| *String*   	| `large`       	| The size of the photos. 'small', 'medium' or 'large'.           	|
| **wrapEachWith** 	| No       	| *String*   	| `'<li></li>'` 	| The HTML tag to wrap every result.                              	|
| **complete**     	| No       	| *Function* 	| `null`        	| A callback function to execute after the display of the photos. The function takes one argument - the `spectragram` object that called this function.	|

### Example

``` javascript
jQuery.fn.spectragram.accessData = {
	accessToken: 'your-instagram-access-token'
};

$('ul').spectragram({
	complete : myCallbackFunc,
	max: 4,
	size: "medium",
	wrapEachWith: "<li></li>"
});
```

# License

Licensed under the MIT license. You are free to use this plugin in commercial projects as long as the copyright header is left intact.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Further notes

Maintained by [Adrian Quevedo](https://github.com/adrianengine).

This code is provided with no warranty. While I strive to maintain backwards compatibility, the code is still under active development. As this is the case, some revisions may break compatibility with earlier versions of the library. Please keep this in mind when using the plugin.

This plugin uses the Instagram Basic Display API and is not endorsed or certified by Instagram or Facebook, inc. All Instagram© trademarks displayed on this plugin are property of Facebook, Inc.
