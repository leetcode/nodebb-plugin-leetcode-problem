(function(module) {
	"use strict";

	var _OJ_CATEGORY_ID = 1;
	var Leetcode = {};
	Leetcode.createCategory = function (data, next){
		if ('_imported_parentCid' in data['data']) {
			data['category']['_imported_parentCid'] = data['data']['_imported_parentCid'];
		}

		if ('_imported_slug' in data['data']) {
			data['category']['_imported_slug'] = data['data']['_imported_slug'];
		}

		next(null, data);
	}

	module.exports = Leetcode;
}(module));
