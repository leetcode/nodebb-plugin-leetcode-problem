(function(module) {
	"use strict";
	var Category = module.parent.require('./categories');
	var _ = module.parent.require('underscore');
	var	async = module.parent.require('async');

	var _OJ_CATEGORY_ID = 1;
	var _INTERVIEW_QUESTION_CID = 240;
	var Leetcode = {};
	Leetcode.createCategory = function (data, next) {
		if ('_imported_parentCid' in data['data']) {
			data['category']['_imported_parentCid'] = data['data']['_imported_parentCid'];
		}

		if ('_imported_slug' in data['data']) {
			data['category']['_imported_slug'] = data['data']['_imported_slug'];
		}

		next(null, data);
	}

	Leetcode.getCategoryTopic = function (data, next) {
		console.log(data.data);
		var cids = _.uniq(_.map(data.topics, function (obj, index){
			return obj.category.cid;
		}));

		Category.getCategoriesFields(cids, ['cid', 'parentCid', 'image'], function (err, categories){
			var cid_parentCid_map = {};
			for (var i = 0; i < categories.length; ++i) {
				cid_parentCid_map[categories[i].cid] = categories[i];
			}

			for (i = 0; i < data.topics.length; ++i){
				var topic = data.topics[i];
				topic.showCategoryIconForTopics = false;
				if (cid_parentCid_map[topic.category.cid].parentCid == _INTERVIEW_QUESTION_CID
				&& data.data.cid == _INTERVIEW_QUESTION_CID) {
					topic.showCategoryIconForTopics = true;
					topic.category.parentCid = cid_parentCid_map[topic.category.cid].parentCid;
					topic.category.image = cid_parentCid_map[topic.category.cid].image;
				}
			}

			next(null, data);
		});
	}

	module.exports = Leetcode;
}(module));
