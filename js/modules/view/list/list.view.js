
// 列表页视图

define(function ( require ) {
	
	require('view/list/list.css');
	
	var throttle = require('tools/throttle.js');
	
	var List = Backbone.View.extend({
		
		// {id: 1, style: 'width: 100px; height: 100px;', url: 'img/01.jpg' }
		tpl: _.template( $('#moban').html() ),
		
		leftHeight: 0,
		rightHeight: 0,
		
		// 交互事件
		events: {
			
			'click .search-btn': 'showSearch',
			'tap .nav-wrap': 'showType',
//			'tap .go-top': 'goTop'
//			'click .go-top': 'goTop'

		},
		
		initialize: function () {
			
			var _this = this;
			
			// 获取数据
			this.getDate();
			
			// 获取容器
			this.getDom();
			
			//监听是否添加，如果有数据添加， 渲染视图
			this.collection.on('add', function ( model ) {
				
				_this.render( model );
				
			});
			
			//window 添加事件
			$(window).on('scroll', function () {
				
//				_.throttle('loadModeData', 500, {trailing: false});

					throttle(_this.loadModeData,{
						context: _this
					});
				
			});
			
			// 返回顶部  //evnets 不能触发， 放入initialize 执行
			$('.go-top').on('tap', this.goTop);
			
		},
		
		loadModeData: function () {
			
			// body高度要 = window高度+ window.scrollTop高度+ 200
			
			var isH = $('body').height() - $(window).height() - $(window).scrollTop() - 200 <= 0;
			
			if ( isH ) {
					
				// 获取数据
				this.getDate();
				
			}
			
			// 返回顶部
			this.dealGoTop();
			
		},
		
		// 返回顶部
		dealGoTop: function () {
			
			if ( $(window).scrollTop() >= 20 ) {
				
				$('.go-top').show();
				
			} else {
				
				$('.go-top').hide();
				
			}
			
		},
		
		// 获取数据
		getDate: function () {
			
			this.collection.feachData();
			
		},
		
		// 获取dom
		getDom: function () {
			
			this.leftContainer = this.$('.left-list');
			this.rightContainer = this.$('.right-list');
			
		},
		
		// 渲染视图
		render: function ( model ) {
			
			// {id: 1, style: 'width: 100px; height: 100px;', url: 'img/01.jpg' }
			// 获取json数据
			var data = {
				id: model.get('id'),
				style: 'width:  ' + model.get('showWidth') + 'px; height: ' + model.get('showHeight') + 'px',
				url: model.get('url')
			}
			
			// 格式化模板
			var html = this.tpl(data);
			
			// 插入dom  // 那边容器 比较矮就插入那边
			if ( this.leftHeight > this.rightHeight ) {
				
				this.rederRight(html, model.get('showHeight'));	
				
			} else {
				
				this.renderLeft(html, model.get('showHeight'));
				
			}
			
		},
		
		renderLeft: function ( html,height ) {
			
			this.leftHeight += height + 6;
			
			this.leftContainer.append($(html));
			
		},
		
		rederRight: function ( html,height ) {
			
			this.rightHeight += height + 6;
			
			this.rightContainer.append($(html));
			
		},
		
		
		// 匹配规则
		showType: function ( ev ) {
			
			// 获取typeId 
			var typeId = this.getTypeId( ev );
			
			// 获取集合中相关模型
			var reslut = this.getModelFormCollection(typeId,'type');
			
			// 渲染视图
			this.renderSearchView(reslut);
			
		},
		
		// 显示 搜索
		showSearch: function () {
			
			// 获取val值
			var val = this.getSearchVal();
			
			if ( val ) {
				
				// 在集合中搜索数据   filter
				var reslut = this.searchCollectionsVal(val);
				
				if ( reslut.length > 0 ) {
					
					// 显示视图
					this.renderSearchView( reslut );
					
					$('.tips') && $('.tips').remove();
					
				} else {
					
					$('.left-list').html('');
					$('.right-list').html('');
					
					$('#listItem').append('<div class="tips">未搜索到图片</div>');
					
				}
				
			}

		},
		
		// 获取val值
		getSearchVal: function () {
			
			var val = $('.search-txt').val();
			
			return this.serachVal(val);
			
		},
		
		// 判断 val 条件
		serachVal: function ( val ) {
			
			// 判断是否为空
			if ( /^\s*$/.test(val) ) {
				
				alert('请输入搜索条件');
				
				return ;
				
			}
			
			return $.trim(val);
			
		},
		
		// 在集合中搜索
		searchCollectionsVal: function ( val,keyword ) {
			
			keyword = keyword || 'title';
			
			return this.collection.filter(function ( model ) {
				
				return model.get(keyword).indexOf(val) >= 0; 
				
			});
			
		},
		
		// 显示视图
		renderSearchView: function ( result ) {
			
			var _this = this;
			
			// 清空容器
			this.clearMain();
			
			//遍历数据
			$.each( result, function ( i,val ) {
				
				// 渲染搜索数据视图
				_this.render(val);
				
			} );
			
		},
		
		// 清空容器
		clearMain: function () {

			// 清空容器 视图
			this.leftContainer.html('');
			this.rightContainer.html('');
			
			// 清楚计算宽高
			this.leftHeight = 0;
			this.rightHeight = 0;
			
		},
		
		
		// 获取 匹配id
		getTypeId: function ( ev ) {
			
			return $(ev.target).attr('data-id');
			
		},
		
		// 获取集合中相关模型
		getModelFormCollection: function ( id, key ) {
			
			return this.collection.filter(function ( model ) {
				
				return model.get(key) == id;
				
			});
			
		},
		
		// 回到顶部
		goTop: function () {
			
			window.scrollTo(0, 0);
			
		}
		
	});
	
	return List;
	
});
