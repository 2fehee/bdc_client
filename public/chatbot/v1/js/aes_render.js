(function($) {

	const BizUrl = "http://localhost";
	const BizPort = ":6003";
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

							if(data.context.tmpl_id != null && typeof(data.context.tmpl_id) != "undefined"){
								console.log("remove1");
								if($('p[id="'+data.context.tmpl_id+'"]').size() > 0){
									console.log("remove2");
									$('p[id="'+data.context.tmpl_id+'"]').remove();
								}
							}


							var values = data.output.text;
							if(data.context.tmpl_id == null || typeof(data.context.tmpl_id) == "undefined"){
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

									this.callback_message();
								});
							}else if (data.context.tmpl_id == "sendTokenTmpl"){
								console.log("토큰 전송 템플릿");

								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

								$("#sendSignBySendTOken").unbind('click').click(function(){

									if($("#sendTokenTmpl_from").val() == "" || $("#sendTokenTmpl_from").val() == null){
										return;
									}

									if($("#sendTokenTmpl_privateKey").val() == "" || $("#sendTokenTmpl_privateKey").val() == null){
										return;
									}

									if($("#sendTokenTmpl_amount").val() == "" || $("#sendTokenTmpl_amount").val() == null){
										return;
									}

									if($("#sendTokenTmpl_receverId").val() == "" || $("#sendTokenTmpl_receverId").val() == null){
										return;
									}
									input_data = {};

					        //구매자 주소
					        input_data.from = $("#sendTokenTmpl_from").val();
					        input_data.privateKey = $("#sendTokenTmpl_privateKey").val();

					        // 판매자 주소
					        input_data.recipient = $("#sendTokenTmpl_receverId").val();
					        input_data.amount = $("#sendTokenTmpl_amount").val();

					        $.ajax({
					            url : BizUrl + BizPort + '/transferBPT',
					            cache: false,
					            type: 'POST',
					            dataType: 'json',
					            contentType: "application/json; charset=utf-8",
					            data: JSON.stringify(input_data),
					            success : function(data) {

					                console.log("토큰 전송 인터페이스 받아온 result : " + JSON.stringify(data));

													result = new Array();
													if(data.success){
															var result_text = $("#sendTokenTmpl_from").val()+"에게 "+$("#sendTokenTmpl_amount").val()+"BP 보냈습니다.";
															result_text = result_text + "<a href='https://bexplorer.chainz.network/tx/"+data.result.replaceAll('"', '')+"' target='_blank'><button class='btn-type01 btn-redpink'>블록체인에서 확인</button></a>";
															result.push(result_text);
															//$('#achat_output_text').tmpl({ result : result }).appendTo(elem);

															input_data = {};
											        input_data.from = $("#sendTokenTmpl_from").val();

											        $.ajax({
											            url : BizUrl + BizPort + '/getBalanceOfBPT/from/' + input_data.from,
											            cache: false,
											            type: 'GET',
											            dataType: 'json',
											            contentType: "application/json; charset=utf-8",
											            data: input_data,
											            success : function(data) {

											                console.log("잔액 확인 인터페이스 받아온 result : " + JSON.stringify(data));
																			result.push("고객님의 잔액은 "+data.result+"BP 입니다.");
																			$('#achat_output_text').tmpl({ result : result }).appendTo(elem);
											                //$("#getBalanceOfBPT_result").val(JSON.stringify(result.result));

											            },beforeSend:function(){
											                //(이미지 보여주기 처리)
											                $('.wrap-loading').removeClass('display-none');
											            }
											            ,complete:function(){
											                //(이미지 감추기 처리)
											                $('.wrap-loading').addClass('display-none');
																			$("#achat_talk_body").scrollTop(999999);
											            },
											            error : function(xhr, status, error){
											                console.log("xhr : " + xhr);
											                console.log(error);
											            }
											        });
														}else{
															result.push("토큰 전송을 실패 하였습니다.");
															$('#achat_output_text').tmpl({ result : result }).appendTo(elem);
														}
					            },beforeSend:function(){
					                //(이미지 보여주기 처리)
					                $('.wrap-loading').removeClass('display-none');
					            }
					            ,complete:function(){
					                //(이미지 감추기 처리)
					                $('.wrap-loading').addClass('display-none');
					            },
					            error : function(xhr, status, error){
					                console.log("xhr : " + xhr);
					                console.log(error);
					            }
					        });

								});

							}else if(data.context.tmpl_id == "updateOwnerTmpl"){

								console.log("소유자 변경 템플릿");

								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

								$("#sendSignByUpdateOwner").unbind('click').click(function(){

									if($("#updateOwnerTmpl_toId").val() == "" || $("#updateOwnerTmpl_toId").val() == null){
										return;
									}
									if($("#updateOwnerTmpl_BID").val() == "" || $("#updateOwnerTmpl_BID").val() == null){
										return;
									}
									if($("#updateOwnerTmpl_fromId").val() == "" || $("#updateOwnerTmpl_fromId").val() == null){
										return;
									}
									if($("#updateOwnerTmpl_fromKey").val() == "" || $("#updateOwnerTmpl_fromKey").val() == null){
										return;
									}

									input_data = {};

					        // 판매자 주소
					        input_data.from = $("#updateOwnerTmpl_fromId").val();
					        input_data.privateKey = $("#updateOwnerTmpl_fromKey").val();

					        // 구매자 주소
					        input_data.transferFrom = $("#updateOwnerTmpl_fromId").val();
					        input_data.transferTo = $("#updateOwnerTmpl_toId").val();
					        input_data.bID = $("#updateOwnerTmpl_BID").val();

					        $.ajax({
					            url : BizUrl + BizPort + '/TransferFromBNFT',
					            cache: false,
					            type: 'POST',
					            dataType: 'json',
					            contentType: "application/json; charset=utf-8",
					            data: JSON.stringify(input_data),
					            success : function(data) {

					                console.log("받아온 result : " + JSON.stringify(data));
													result = new Array();
													if(data.success){

														var result_text = "배터리 "+$("#updateOwnerTmpl_BID").val()+"의 소유권을 "+$("#updateOwnerTmpl_toId").val()+"에게 정상적으로 이전하였습니다.";
														result_text = result_text + "<a href='https://bexplorer.chainz.network/tx/"+data.result.replaceAll('"', '')+"' target='_blank'><button class='btn-type01 btn-redpink'>블록체인에서 확인</button></a>";
														result.push(result_text);
													}else{
														result.push("소유권 이전을 실패 하였습니다. 올바른 정보를 입력 해주세요. ");
													}
													$('#achat_output_text').tmpl({ result : result }).appendTo(elem);

					            },beforeSend:function(){
					                //(이미지 보여주기 처리)
					                $('.wrap-loading').removeClass('display-none');
					            }
					            ,complete:function(){
					                //(이미지 감추기 처리)
					                $('.wrap-loading').addClass('display-none');
													$("#achat_talk_body").scrollTop(999999);
					            },
					            error : function(xhr, status, error){
					                console.log("xhr : " + xhr);
					                console.log(error);
					            }
					        });
								});



							}else if(data.context.tmpl_id == "checkTokenTmpl"){

								console.log("잔액 확인 템플릿");

								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

								$("#checkTokenBtn").unbind('click').click(function(){

									if($("#checkTokenIdVal").val() == "" || $("#checkTokenIdVal").val() == null){
										return;
									}

									input_data = {};
					        input_data.from = $("#checkTokenIdVal").val();

					        $.ajax({
					            url : BizUrl + BizPort + '/getBalanceOfBPT/from/' + input_data.from,
					            cache: false,
					            type: 'GET',
					            dataType: 'json',
					            contentType: "application/json; charset=utf-8",
					            data: input_data,
					            success : function(data) {

					                console.log("받아온 result : " + JSON.stringify(data));
													result = new Array();
													result.push("고객님의 잔액은 "+data.result+"BP 입니다.");
													$('#achat_output_text').tmpl({ result : result }).appendTo(elem);
					                //$("#getBalanceOfBPT_result").val(JSON.stringify(result.result));

					            },beforeSend:function(){
					                //(이미지 보여주기 처리)
					                $('.wrap-loading').removeClass('display-none');
					            }
					            ,complete:function(){
					                //(이미지 감추기 처리)
					                $('.wrap-loading').addClass('display-none');
													$("#achat_talk_body").scrollTop(999999);
					            },
					            error : function(xhr, status, error){
					                console.log("xhr : " + xhr);
					                console.log(error);
					            }
					        });
								});

							}else if(data.context.tmpl_id == "checkOwnerTmpl"){
								console.log("소유권 확인 템플릿");

								$('#'+data.context.tmpl_id).tmpl({ result : result }).appendTo(elem);

								$("#checkOwnerBtn").unbind('click').click(function(){

									if($("#checkOwnerIdVal").val() == "" || $("#checkOwnerIdVal").val() == null){
										return;
									}

									input_data = {};

					        //구매자
					        input_data.bID = $("#checkOwnerIdVal").val();

					        //판매자
					        //input_data.bID = BNFT;

					        $.ajax({
					            url : BizUrl + BizPort + '/getOwnerOfBNFT/bID/' + input_data.bID,
					            cache: false,
					            type: 'GET',
					            dataType: 'json',
					            contentType: "application/json; charset=utf-8",
					            data: input_data,
					            success : function(data) {

					                console.log("받아온 result : " + JSON.stringify(result));
													result = new Array();
													if(data.success){
														result.push("검색하신 배터리(BID:"+$("#checkOwnerIdVal").val()+")의 소유자 계정은 "+data.result+"입니다.");
													}else{
														result.push("검색하신 배터리(BID:"+$("#checkOwnerIdVal").val()+")의 소유자 계정을 찾을 수 없습니다.");
													}

													$('#achat_output_text').tmpl({ result : result }).appendTo(elem);

					            },beforeSend:function(){
					                //(이미지 보여주기 처리)
					                $('.wrap-loading').removeClass('display-none');
					            }
					            ,complete:function(){
					                //(이미지 감추기 처리)
					                $('.wrap-loading').addClass('display-none');
					            },
					            error : function(xhr, status, error){
					                console.log("xhr : " + xhr);
					                console.log(error);
					            }
					        });


								});
							}
							this.callback_message();
						},

						callback_message : function(){
							$("#achat_talk_body").scrollTop(999999);
						}

					}
			}
			render.init(type,data);
		}
	});
})(jQuery);
