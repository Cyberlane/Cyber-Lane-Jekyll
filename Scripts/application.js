; (function (window, $) {
    var cyberlane = {
    	resize: function () {
        	$("#main-row").css("height", ($("body").height() - $("footer").height() - $(".masterhead").height()) + "px");
    	}
	};

    window.onresize = function (event) {
        cyberlane.resize();
    };

    var getParam = function(param){
    	var queryString = window.location.search.substring(1),
    		queries = queryString.split('&');
		for (var i in queries){
			var pair = queries[i].split('=');
			if (pair[0] == param){
				return pair[1];
			}
		}
		return null;
    };

    var majusculeFirst = function(str){
    	var temp = str.charAt(0).toUpperCase();
    	for (var i = 1; i < str.length; i++){
    		temp += str.charAt(i).toLowerCase();
    	}
    	return temp;
    };

    var filterPostsByPropertyValue = function(posts, property, value){
    	var filteredPosts = [];
    	posts.pop();
    	for (var i in posts){
    		var post = posts[i],
    			prop = post[property];
    		
    		post.tags.pop();

    		if (prop.constructor == String){
    			if (prop.toLowerCase() == value.toLowerCase()){
    				filteredPosts.push(post);
    			}
    		} else if (prop.constructor == Array){
    			for (var j in prop){
    				if (prop[j].toLowerCase() == value.toLowerCase()){
    					filteredPosts.push(post);
    				}
    			}
    		}
    	}
    	return filteredPosts;
    };

    var replaceERBTags = function(elements){
    	elements.each(function(){
    		var $this = $(this),
    			txt = $this.html();

    		// Replace <%=  %>with {{ }}
		    txt = txt.replace(new RegExp("&lt;%=(.+?)%&gt;", "g"), "{{$1}}");
		    // Replace <% %> with {% %}
		    txt = txt.replace(new RegExp("&lt;%(.+?)%&gt;", "g"), "{%$1%}");

		    $this.html(txt);
    	});
    };

    var layoutResultsPage = function(property, value, posts){
    	var $container = $('#results');
    	if ($container.length == 0) return;

    	var str = majusculeFirst(property) + " Listing for ‘" + majusculeFirst(value) + "’";
    	$container.find('h1').text(str);

    	for (var i in posts){
    		var tagsList = '<ul class="tags cf">',
    			post = posts[i],
    			tags = post.tags;

			for (var j in tags){
				tagsList += '<li><a href="/search.html?tags=' + tags[j] + '">' + tags[j].toLowerCase() + '</a></li>';
			}
			tagsList += '</ul>';

			$container.find('ul.results').append(
				'<li>'
				+ '<a href="' + post.href + '">'
				+ posts[i].title
				+ '</a>'
				+ ' <span class="date">- '
				+ posts[i].date.day + ' ' + posts[i].date.month + ' ' + posts[i].date.year
				+ '</span>'
				+ tagsList
				+ '</li>'
			);
    	}
    };

    var noResultsPage = function(property, value){
    	var $container = $('#results');
    	if ($container.length == 0) return;

    	$container.find('h1').text('No Results Found.').after('<p class="nadda"></p>');
    	var txt = "We couldn't find anything associated with '" + value +"' here.";
    	$container.find('p.nadda').text(txt);
    };

    var map = {
    	'category': getParam('category'),
    	'tags': getParam('tags'),
    	'search': getParam('search')
    };

    $.each(map, function(type, value){
    	if (value !== null){
    		$.getJSON('/search.json', function(data){
    			posts = filterPostsByPropertyValue(data, type, value);
    			if (posts.length === 0){
    				noResultsPage(type, value);
    			} else {
    				layoutResultsPage(type, value, posts);
    			}
    		});
    	}
    });

    cyberlane.resize();
    replaceERBTags($('div.highlight').find('code.text'));
    replaceERBTags($('p code'));
})(window, jQuery);