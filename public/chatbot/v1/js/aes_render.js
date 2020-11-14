(function($) {
	$.fn.extend({
		achat_render : function(type, data){
			var elem = this;
			var render = {
					init : function(data){
						if(data.output != null || typeof(data.output) != 'undefined'){
							$(elem).append(this.func.render_output(data));
						}else{
							var values = data.input.text;
							$('#achat_input_text').tmpl({ result : values }).appendTo(elem);
						}
					},
					func : {
						render_output : function(data){

							var values = data.output.text;
							if(data.context.tmpl_id == null || typeof(data.context.tmpl_id) == "undefined" || data.context.tmpl_id == null){
								if(values[0] == ""){
									result.push(data.anythingMsg);
								}else{
									result = values;
								}
								$('#achat_output_text').tmpl({ result : result }).appendTo(elem);
							}else if (data.context.tmpl_id == "checkCertTmpl"){
								console.log("배터리 검증 템플릿");

								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

								$("#sendCert").unbind('click').click(function(){
									alert('인증서 전송');
								});
							}else if (data.context.tmpl_id == "sendTokenTmpl"){
								console.log("토큰 전송 템플릿");
								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

							}else if(data.context.tmpl_id == "updateOwnerTmpl"){
								console.log("소유자 변경 템플릿");
								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

							}


						}
					}
			}
			render.init(type,data);
		}
	});
})(jQuery);
