
define(function ( require, exports, moduel ) {

	var ImgEvent = _.extend({},Backbone.Events);

	// view 模块
	var Layer = require('view/layer/layer.view');
	var List = require('view/list/list.view');
	
	var ListCollection = require('modules/collections/img.collection');
	
	var colectionList = new ListCollection();
	
	
	// 实例化 大图页  添加 collections
	var layer = new Layer({
		collection: colectionList,
		el: $('#layer')
	});
	
	// 实例化 列表页  添加 collections
	var list = new List({
		collection: colectionList,
		el: $('#photo-wrap')
	});
	
	//路由
	var Router = Backbone.Router.extend({
		
		//配置路由
		routes: {
			
			'layer/:id': 'showLayer', // 显示大图的路由
			
			'*other': 'showList'
			
		},
		
		// 大图 页
		showLayer: function ( layerId ) {
		
			// 点击事件
//			this.events();
			
			// 渲染
			layer.render(layerId);	
			
			// 显示 隐藏
			$('#photo-wrap').hide();
			$('#layer').show();

			
		},
		
		// 列表页
		showList: function () {
			
			// 渲染文本
//			list.render();
			
			// 显示 隐藏
			$('#photo-wrap').show();
			$('#layer').hide();
			
		},
		
	});
	
	
	return {
	
		showApp: function () {
			
			// 实例化 路由
			var router = new Router();
			
			// 开启路由
			Backbone.history.start();
			
		}
	
	}
	
});
