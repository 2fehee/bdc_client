/*
Title:		OEngine: a SK Conversation Chatbot Plugin
Author:		Choi jaecheol
Version:	0.2.0
Website:
License: 	the MIT and GPL licenses.
*/

(function($) {
	$.fn.extend({
        aesSDK : function(options) {
        	var elem = this;
        	var defaults =  {
    			'width' : '25%',
    			'height' : '100%',
    			'bgColor' : '#2e3951',
    			'ctitle' : 'Aibril Chatbot',
    			'firstMsg' : '안녕하세요. block Chatbot 입니다.',
    			'anythingMsg'  :  '죄송합니다. 알아듣기 쉽게 다시 말씀해주시면 좋겠어요.',
    			'api_key' : '',
    			'user_info' : null,
    			'url' : 'http://52.79.205.160:8080/ais'

    		}
            if (options && typeof(options) == 'object') {
                options = $.extend( {}, defaults, options );
            }
        	achat.init(elem, options);
            return;
        }
    });

})(jQuery);
var achat = {
		variable : {
			conText : {},
			messagesendFlag : true
		},
		check_auth : function(){
			console.log("this.options.api_key : " + this.options.api_key);
			if(this.options.api_key == '' || this.options.api_key == null){

				if(achat.options.channel === 'WEB'){
					alert('권한이 없습니다. api key를 확인 해 주세요.');
					self.close();
					return;
				}
				else{
					alert('권한이 없습니다. api key를 확인 해 주세요.');
					parent.postMessage('{"method" : "CLOSE"}', '*');     // 화면닫기
					return;
				}
			}
		},
		target : null,
		options : {},
		init : function(target, options){
			this.target = target;
			this.options = options;
			//this.check_auth();  // 중복, func.init에서 체크함
			this.event();
			if(achat.options.wrkMode == 'OP'){
				if(achat.options.workspaceId){
					this.func.fnSend(achat.options.api_key, '', true);
				}else{
					this.func.init(achat.options.api_key);
				}
			}else{
				this.func.fnSend(achat.options.api_key, '', true);
			}
//			this.func.fnSend(achat.options.api_key, '', true);
			$(this.target).find('#achat_date').html('Today , ' + this.func.convertDate(new Date()));
		},
		event : function(){
			$(this.target).find("#achat_input_message").unbind('keypress').keypress(function(e){
				//크로스도메인허용
		        $.support.cors = true;

				//key 초기화
				var result = "";
				//크롬 계열
				if(typeof(e) != "undefined") {
					result = e.which;
				}else {
					result = event.keyCode;
				}
				if (result == 13){
					//엔터 입력시 실행 함수
					var msg = $(achat.target).find("#achat_input_message").val();
					achat.func.fnSend(achat.options.api_key, msg);
				}
			});
			$(this.target).find("#achat_send_message").unbind('click').click(function(){
				var msg = $(achat.target).find("#achat_input_message").val();
				achat.func.fnSend(achat.options.api_key, msg);
			});
		},
		func : {
			convertDate : function(date){
				var yyyy = date.getFullYear().toString();
				var mm = (date.getMonth()+1).toString();
				var dd  = date.getDate().toString();
				var mmChars = mm.split('');
				var ddChars = dd.split('');
				return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
			},
			init : function(api_key){
				console.log("##init api_key : " + api_key);
				achat.check_auth();
				var _url = achat.options.url;
				$.ajax({
						type : 'GET',
						crossDomain: true,
						cache: false,
						url : _url + '/api/message/'+api_key,
						dataType : 'json',
						beforeSend:function(){
			            },
						success : function(result){
							result.anythingMsg = achat.options.anythingMsg;
							if(typeof(result.context) != 'undefined' && typeof(result.context.achat_ui) != 'undefined' && result.context.achat_ui.ui_type == 'init'){
								if(result.context.achat_ui.content.length == 1){
									result.output.text = '';
									var msg = '';
									$('#achat_init').css('display','none');
									achat.options.workspaceId = result.context.achat_ui.content[0].response;
									achat.func.fnSend(achat.options.api_key, msg, true);

								}else{
									$('#achat_init').addClass('tagArea3');
									$(achat.target).find('#achat_talk_body').achat_render(result);
								}
							}else{
								$(achat.target).find('#achat_talk_body').achat_render(result);
							}
							delete result.context.achat_ui;
						},
						complete:function(){
							$(achat.target).find("#achat_input_message").val("");
							$(achat.target).find('#achat_input_message').attr('readonly', false);
							$(achat.target).find("#achat_talk_body").scrollTop(999999);  //scroll Y 재조정.
							achat.variable.messagesendFlag = true;
			            },
						error : function(xhr, status, error){
							alert('error' + JSON.stringify(xhr) );
							console.log(error);
						}
				});
			},
			fnSend : function(api_key, msg, init_flag){
				achat.check_auth();
				if(!achat.variable.messagesendFlag){
					return false;
				}
				achat.variable.messagesendFlag = false;

				if(!init_flag){
					if(msg.trim() == null ){
						achat.variable.messagesendFlag = true;
						return false;
					}

					if(msg.trim() == '' ){
						achat.variable.messagesendFlag = true;
						return false;
					}
				}else{
					achat.variable.conText = {};
				}

				var data ={
						api_key : achat.options.api_key,
						//channel : achat.options.user_info,
						channel : achat.options.channel,
						chatUserId : achat.options.chatUserId,
						text : msg,
						workspaceId : achat.options.workspaceId,
						context : achat.variable.conText
				};

				var _url = achat.options.url;
				var endUrl = _url + '/api/message/'+api_key;
//
//				if(typeof(achat.options.workspaceId) == 'undefined' || achat.options.workspaceId == ""){
//					alert("프로젝트 설정에 워크스페이스를 추가 해주세요.");
//					return false;
//				}

				$.ajax({
						type : 'POST',
						crossDomain: true,
						cache: false,
//						url : _url + '/chatbot/'+api_key,
//						url : _url + '/api/message/'+api_key,
						url : endUrl,
						dataType : 'json',
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify(data),
						beforeSend:function(){
							//사용자 메시지 출력창.
							if(!init_flag){
								var param = {
										input : {
											text : msg
										}
								};

								$(achat.target).find("#achat_talk_body").achat_render(param);
								$(achat.target).find("#achat_input_message").val("Loading...");
								$(achat.target).find('#achat_input_message').attr('readonly', true);
							}
			            },
						success : function(result){
							console.log("result : " + JSON.stringify(result));

							console.log("result.resultCode : " + result.resultCode);
							if(result.resultCode === '500'){
								console.log("this.options.channel : " + achat.options.channel);
								console.log("result.resultText : " + result.resultText);
								 alert(result.resultText);
								if(achat.options.channel === 'WEB'){
									self.close();
									return;
								}
								else{
									console.log("this.options.channel3 : " + achat.options.channel);
									parent.postMessage('{"method" : "CLOSE"}', '*');     // 화면닫기
									return;
								}
							}


							// 학습 필요 시 의도 추천
							if(achat.options.wrkMode === 'OP'){
								if(result.context.askAgainFields != undefined){
									var contentArr = new Array();
									result.context.achat_ui = new Object();
									result.context.achat_ui.ui_type = "list";
									var askAgainFields = result.context.askAgainFields;
									for(var i=0;i<askAgainFields.length;i++) {
										if(askAgainFields[i] != null){
											var jsonItem = new Object();
											jsonItem["title"] = askAgainFields[i];
											jsonItem["response"]   = askAgainFields[i];
											contentArr.push(jsonItem);
										}
									}

									result.context.achat_ui.content = contentArr;
									delete result.context.askAgainFields;
								}
							}


							if(achat.options.workspaceId == undefined){
								achat.options.workspaceId = result.workspaceId;
								delete result.workspaceId;
							}

							result.anythingMsg = achat.options.anythingMsg;
							$(achat.target).find('#achat_talk_body').achat_render(result);
							delete result.context.achat_ui;
							achat.variable.conText = result.context;
						},
						complete:function(){
							$(achat.target).find("#achat_input_message").val("");
							$(achat.target).find('#achat_input_message').attr('readonly', false);
							$(achat.target).find("#achat_talk_body").scrollTop(999999);  //scroll Y 재조정.
							achat.variable.messagesendFlag = true;
							if( (achat.options && achat.options.wrkMode != 'OP') || (achat.options && achat.options.workspaceId) ){
								$("#achat_input_message").removeAttr('disabled');
							}
			            },
						error : function(xhr, status, error){
							//alert('error' + JSON.stringify(xhr) );
							console.log("xhr : " + xhr);
							console.log(error);
						}
				});
			}
		}
}
