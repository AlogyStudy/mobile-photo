
//显示大图的  layer 

define(function ( require ) {
	
	require('modules/view/layer/layer.css');

	// 大图视图
	var Layer = Backbone.View.extend({
		
		tpl: _.template( $('#layerMoban').html() ),
		
		modelId: 0, // 索引
		
		events: {
			'swipeLeft .img-container img': 'showNextImg',
			'swipeRight .img-container img': 'showPrveImg',
			'tap .back': 'goBack',
			'tap .img-container img': 'showTitle'
		},
		
		// 显示隐藏 头部
		showTitle: function () {
			
			$('.title').toggleClass('hide');
			
		},
		
		// 返回按钮
		goBack: function () {
			
			window.location.hash = '#';
//			$('.layer').remove();
			
		},
		
		// 后一张
		showNextImg: function () {
			
			var nextid = ++this.modelId;
			
			//获取 model 数据
			var model = this.collection.get(nextid);
			
			if ( model ) {
				
				// 更改 图片前后张
				this.changeModel(model,nextid);
				
			} else {
				
				alert('已经是最后一张了');
				this.modelId++;
				
			}
			
		},
		
		// 前一张
		showPrveImg: function () {
			
			var prveId = this.modelId--;
			
			//获取model 数据
			var model = this.collection.get(prveId);
			
			if ( model ) {
				
				// 更改 图片前后张
				this.changeModel(model,prveId);
				
			} else {
				
				alert('已经是第一张了');
				this.modelId--;
				
			}
			
		},
		
		// 渲染视图
		render: function ( leyarId ) {
			
			// 获取集合中模型
			var model = this.getModelById(leyarId);
			
			if ( model ) {  //
				
				// 获取json数据
				var data = model.pick('url','title'); 
				
				// 获取模板字符串
				var html = this.tpl(data);
				
				// 插入页面中
				this.$el.html(html);
				
				// 显示大图页面
				this.$el.show();
				
			} else {
				
				window.location.hash = '#';
				
			}
			
		},
		
		// 获取集合中的模型
		getModelById: function ( id ) {
			
			return this.collection.get(id);
			
		},
		
		// 更改 图片前后张
		changeModel: function ( model,nextId ) {
			
			// change url 
			this.$('.img-container img').attr('src', model.get('url'));
				
			// change title
			this.$('.title h1').html(model.get('title'));
			
			// 更改 url hash			
			this.changeUrlHash(nextId);
			
		},
		
		// 更改 url hash
		changeUrlHash: function ( hash ) {
			
			// layer/1
//			window.location.hash = '#/layer/' + hash;
			
		}
		
	});
	
	return Layer;
	
});