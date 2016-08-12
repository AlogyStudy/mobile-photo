
define(function () {
	
	var wWidth = parseInt( ($(window).width() - 6 * 3) / 2 );
	
	var imgId = 0;
	
	var ListModel = Backbone.Model.extend({
		
//		imgId: 0,  //添加索引
		
		initialize: function () {
			
			var self = this;
			
			this.on('add', function ( model ) {
				
				var h = model.get('height') * wWidth/model.get('width');
				
				//修正所需要的 w ，h.
				model.set({
					showWidth: wWidth,
					showHeight: h,
					id: imgId++
				});
				
			});
			
		}
		
	});
	
	return ListModel;
	
});
