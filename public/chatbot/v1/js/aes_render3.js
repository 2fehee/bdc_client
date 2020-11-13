(function($) {
	$.fn.extend({
		achat_render : function(type, data){
			var elem = this;
			var render = {
					init : function(data){
						if(data.output != null || typeof(data.output) != 'undefined'){
							this.func.render_output(data);
						}else{
							var values = data.input.text;
							$(elem).append(this.func.input_result_text(values));
						}
					},
					func : {
						render_output : function(data){
							
							var values = data.output.text;
							
							if(data.context.achat_ui == null || data.context.achat_ui == undefined){
								if(values.length == 0){
									result = data.anythingMsg;
								}else{
									result = values;
								}
								$('#achat_output_text').tmpl({ result : values }).appendTo(elem);
							}else if (data.context.achat_ui.ui_type == "url"){
								return this.output_url(data);
							}else if (data.context.achat_ui.ui_type == "list"){
								
								$('#achat_output_list').tmpl({ result : values, content : data.context.achat_ui.content }).appendTo(elem);
								$(elem).find('a').unbind('click').bind('click',function(){
									
									if( $(this).attr('type') == 'L'){
										var open_url = $(this).attr('other');
										window.open(open_url, "_blank");
									}else{
										achat.func.fnSend(achat.options.api_key, $(this).attr('other'));
									}
								});
							}
						},
						output_url : function(data){
							var values = data.output.text;
							var result = '';
							for (var i in values){
								result += values[i];
							}
							var object = data.context.achat_ui.object;
							
							return this.output_result_url(result,object);
							
						},
						input_result_text : function(result){
							return "<p class='user'><span>"+result+"</span></p>";
						},
						output_result_url : function(result,object){
							return "<p class='aibril'><span class='box'><span>"+ result + "</span><a href='" + object + "' target='_blank'>링크바로가기</a></span></p>";
							// 나중에 예쁘게 하기 일단 구현만 해놈
						}
					}
			}
			render.init(type,data);
		}
	});
})(jQuery);








