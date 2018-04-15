![Spectragram](http://spectragram.js.org/i/logo.png)

**spectragram.js** is a jQuery plugin using the **Instagram API** to fetch and display user, popular or tags photo feeds inside a list or any container you define.

### [Visit Project Page](http://spectragram.js.org)

### [Download spectragram.js (minified 3kb)](https://raw.github.com/adrianengine/jquery-spectragram/master/spectragram.min.js)


---

# Platform Changees

On June 1 2015, Instagram, which is owned by Facebook, [will stop allowing many third parties to access the images in its feeds](http://techcrunch.com/2015/11/17/just-instagram/).

This means you will no longer be able to fetch photos form other users with spectragram after May 31.

Please follow this instructions to make it work with your own sandboxed feed:
[How to get Instagram API access token and fix your broken feed](https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed)

On April 4 2018, some endpoints this plugin use were deprecated:
[Instagram Platform Changelog](https://www.instagram.com/developer/changelog/)

**Please upgrade** in order to make your Instagram feed work again.

---

# Features

* Get the most recent or recently tagged media published by your user from Instagram API
* Display the results on list items or any other HTML tag you define
* Define the size of the pictures (small, medium, big)
* Use your own Instagram application AccessToken

# How to use

In order to use the plugin you need to register an application at [Instagram Developers](http://instagram.com/developer/), and [recieve an access_token](http://instagram.com/developer/authentication/).

### Simple usage

1. Be sure to have jQuery script included and then include the **spectragram.min.js** script right before the ``` </body>``` tag.

``` html
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 <script type="text/javascript" src="js/spectragram.min.js"></script>
```

1. Set your Instagram ```accessToken``` and the query (username or tag):

``` javascript
jQuery.fn.spectragram.accessData = {
	accessToken: 'your-instagram-access-token'
};
```

1. Call **spectagram** function on the container element and pass it your query:

``` javascript
$('ul').spectragram('getRecentTagged',{
	query: 'converse'
});
```

*This example will show 20 or less results for photos tagged "converse" in a list, "medium" sized.*

## Configuration

``` javascript
.spectragram( Method, [Options] )

Method: getUserFeed or getRecentTagged functions

Options: An array to configure the properties of spectragram
```

### Methods

**getUserFeed**

Get the most recent media published by the owner of the access_token.

``` javascript
$('.container').spectragram('getUserFeed',{
	complete : myCallbackFunc(),
	max: 10,
	size: "small",
	wrapEachWith: '<div class="photo">'
});
```

**getRecentTagged**

Get a list of recently tagged media by the owner of the access_token.

``` javascript
$('ul').spectragram('getRecentTagged',{
	complete : myCallbackFunc(),
	max: 20,
	query: "converse",
	size: "medium",
	wrapEachWith: "<li></li>"
});
```

### Options

**accessToken** (required)

*Type: String*

This is your Instagram Application AccessToken. *Default: Null*

**query** (required for getRecentTagged)

*Type: String*

The string to search. *Default: 'coffee'*

**max**

*Type: Number*

A number between 1 and 20 of photos to show. *Default: 20*

**size**

*Type: String*

The size of the photos. 'small', 'medium' or 'big'. *Default: 'medium'*

**wrapEachWith**

*Type: String*

The HTML tag to wrap every result. *Default: '\<li>\</li>'*

**complete**

*Type: Function*

A callback function to execute after the display of the photos. *Default: 'null'*

### Example

``` javascript
jQuery.fn.spectragram.accessData = {
	accessToken: 'your-instagram-access-token'
};

$('ul').spectragram('getRecentTagged',{
	complete : myCallbackFunc(),
	max: 20,
	query: "converse",
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

Developed by [Adrian Quevedo](http://adrianquevedo.com) in Bogotá - Colombia.

This code is provided with no warranty. While I strive to maintain backwards compatibility, the code is still under active development. As this is the case, some revisions may break compatibility with earlier versions of the library. Please keep this in mind when using the plugin.

This plugin uses the Instagram(tm) API and is not endorsed or certified by Instagram or Instagram, inc. All Instagram(tm) trademarks displayed on this plugin are property of Instagram, Inc.
