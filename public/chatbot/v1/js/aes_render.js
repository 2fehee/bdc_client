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

							// 치환 entity 색 변경
							if(data.entities != undefined && data.entities.length > 0){
								var outputArray = new Array();
								for(var i in data.entities){
									var entity = data.entities[i];
									var entityWord = entity.value;
									var spanWord = "<span class='entity_red'>"+entityWord+"</span>";

									outputArray = data.output.text;

									for(var j in outputArray){
										var output = outputArray[j];
										output = output.replace(entityWord, spanWord);
										outputArray[j] = output;
									}
								}
								data.output.text = outputArray;
							}
							var values = data.output.text;
							var result = new Array();
							
							if(data.context.achat_ui == null || typeof(data.context.achat_ui) == "undefined" || data.context.achat_ui == null){
								if(values[0] == ""){
									result.push(data.anythingMsg);
								}else{
									result = values;
								}
								$('#achat_output_text').tmpl({ result : result }).appendTo(elem);
							}else if (data.context.achat_ui.ui_type == "url"){
								$('#achat_output_url').tmpl({ result : values, content : data.context.achat_ui.content, img : data.context.achat_ui.img }).appendTo(elem);
							}else if (data.context.achat_ui.ui_type == "list"){
								$('#achat_output_list').tmpl({ result : values, content: data.context.achat_ui.content, img : data.context.achat_ui.img }).appendTo(elem);
								$(elem).find('a[name="lists"]').unbind('click').bind('click',function(){
									achat.func.fnSend(achat.options.api_key, $(this).attr('response'));
								});
							}else if(data.context.achat_ui.ui_type == "button"){
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								elem.parents().find('#achat_button').html('');
								$('#achat_output_button').tmpl({content: data.context.achat_ui.content}).appendTo(elem.parents().find('#achat_button'));
								$(elem.parents().find('#achat_button')).find('.tagBox').parent().bxSlider({
									speed: 650,
									prevSelector : ".tagControl",
									nextSelector : ".tagControl",
									minSlides:2,
									maxSlides:4,
									slideWidth : 400,
									slideMargin: 20,
									pager:false,
									infiniteLoop: false,
									touchEnabled : false
								});
								
								var h_d = Number($(elem).css('height').replace('px', ''));
								var h_m = 60;
								var height = (h_d + 10) / (h_d + h_m) * 100;
								var height2 = 100 - height;
								$(elem).css('height', height+'%');
								$('.converArea2').css('height', height2+'%');
								$(elem.parents().find('#achat_button')).find('a[name="tagbox"]').unbind('click').bind('click',function(){
									achat.func.fnSend(achat.options.api_key, $(this).attr('response'));
									$(elem).css('height', '100%');
								}); 
							}else if(data.context.achat_ui.ui_type == "img_slider"){
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								$('#achat_output_img_slider').tmpl({ content : data.context.achat_ui.content}).appendTo(elem);
								$(elem).find( '.slider-pro' ).sliderPro(); //add choi
								
							/* add. 2019.08.01 */
							}else if(data.context.achat_ui.ui_type == "card_slider"){
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								$('#achat_output_card_slider').tmpl({ content : data.context.achat_ui.content.INFO.STAT_INFO_LIST}).appendTo(elem); //content.groupList 까지 받아온다. 
								$("#owl-card").owlCarousel(); 

							
							/* add. 2019.08.12 */
							}else if(data.context.achat_ui.ui_type == "age_card"){
								console.log('----------------------------------');
								console.log(data.context.achat_ui.content.INFO);
								console.log('----------------------------------');
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								$('#achat_output_card').tmpl({ content : data.context.achat_ui.content.INFO.STAT_INFO_LIST}).appendTo(elem); 
								
								/* add. 2019.08.12 */
							}else if(data.context.achat_ui.ui_type == "cardtype2"){
								console.log('----------------------------------');
								console.log(data.context.achat_ui.content.INFO);
								console.log('----------------------------------');
								//template 입힐 json 타입. 
								var cntInfo = [{ content0 : data.context.achat_ui.content.INFO.STAT_INFO_LIST[0] ,
									             content1 : data.context.achat_ui.content.INFO.STAT_INFO_LIST
								}];
								
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								$('#achat_output_card2').tmpl(cntInfo).appendTo(elem); 
								
							}else if(data.context.achat_ui.ui_type == "init"){
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
								elem.parents().find('#achat_init').html('');
								$('#achat_output_init').tmpl({content: data.context.achat_ui.content}).appendTo(elem.parents().find('#achat_init'));
								$(elem.parents().find('#achat_init')).find('.tagBox').parent().bxSlider({
									speed: 650,
									prevSelector : ".tagControl",
									nextSelector : ".tagControl",
									minSlides:2,
									maxSlides:4,
									slideWidth : 400,
									slideMargin: 20,
									pager:false,
									infiniteLoop: false,
									touchEnabled : false,
									oneToOneTouch : false
								});
								
								var h_d = Number($(elem).css('height').replace('px', ''));
								var h_m = 60;
								var height = (h_d + 10) / (h_d + h_m) * 100;
								$(elem).css('height', height+'%');
								$(elem.parents().find('#achat_init')).find('a[name="tagbox"]').unbind('click').bind('click',function(){
									achat.options.workspaceId = $(this).attr('response');
									achat.func.fnSend(achat.options.api_key, '', true);
//									$(elem).css('height', '100%');
								});
							}else{
								$('#achat_output_text').tmpl({ result : values, img : data.context.achat_ui.img }).appendTo(elem);
							}
							
							this.render_callback(data.context.achat_ui);
							
						},
						render_callback : function(achat_ui){
							if((typeof(achat_ui) == 'undefined' && $.trim($('#achat_button').html() != "")) 
									|| (typeof(achat_ui) != 'undefined' && (achat_ui.ui_type != "button" && achat_ui.ui_type != "init") && $.trim($('#achat_button').html() != ""))
									){
								$('#achat_button').html('');
								if(!$('#achat_init').hasClass('tagArea3')){
									$(elem).css('height', '100%');
								}
								
							}
						} 
					}
			}
			render.init(type,data);
		}
	});
})(jQuery);








