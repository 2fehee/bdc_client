
const BizUrl = "http://localhost";
const BizPort = ":6001";
//const Bizport = ":"+location.port
const BNFT = 4;

$(document).ready(function() {

    $("#createCertificate").on('click', function(event) {
        alert('11111');

        /*
        input_data = {};

        input_data.from = $("#createCertificate_addressFrom").val();
        input_data.privateKey = $("#createCertificate_privateKey").val();

        input_data.bID = $("#createCertificate_bID").val();
        input_data.cID = $("#createCertificate_cID").val();
        input_data.grade = $("#createCertificate_grade").val();
        input_data.evaluationDate = $("#createCertificate_evaluationDate").val();
        input_data.evaluationAgency = $("#createCertificate_evaluationAgency").val();
        input_data.certificateHash = $("#createCertificate_certificateHash").val();
        */

        //preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드이다. submit을 막음
        event.preventDefault();

        // Get form
        var form = $('#frmCreateCertificate')[0];

        // Create an FormData object
        var data = new FormData(form);


        $.ajax({
           // url : BizUrl + BizPort + '/signCreateCertificate',
            url : BizUrl + BizPort + '/upload2',
            type: 'POST',
            enctype: 'multipart/form-data',
            dataType: 'json',

            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#createCertificate_result").val(JSON.stringify(result.result));

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

    $("#certificateInfo").on('click', function(event) {

        var bID = $("#certificateInfo_bID").val();
        var cID = $("#certificateInfo_cID").val();

        $.ajax({
            url : BizUrl + BizPort + '/certificateInfo/bID/' + bID + '/cID/' + cID,
            crossDomain: true,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(result) {
                console.log("certificateInfo 결과 값: " + JSON.stringify(result));
                $("#certificateInfo_result").val(JSON.stringify(result.result));
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#checkLatestCertificate").on('click', function(event) {

        var bID = $("#checkLatestCertificate_bID").val();
        var cID = $("#checkLatestCertificate_cID").val();
        var certificateHash = $("#checkLatestCertificate_certificateHash").val();

        $.ajax({
            url : BizUrl + BizPort + '/checkLatestCertificate/bID/' + bID + '/cID/' + cID + '/certificateHash/' + certificateHash,
            crossDomain: true,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(result) {
                console.log("checkLatestCertificate 결과 값: " + JSON.stringify(result));
                $("#checkLatestCertificate_result").val(result.result);
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#createCertificate_clear").on('click', function(event) {

        $("#createCertificate_addressFrom").val('');
        $("#createCertificate_privateKey").val('');

        $("#createCertificate_bID").val('');
        $("#createCertificate_cID").val('');
        $("#createCertificate_grade").val('');
        $("#createCertificate_evaluationDate").val('');
        $("#createCertificate_evaluationAgency").val('');
        $("#createCertificate_certificateHash").val('');

        $("#createCertificate_result").val('');

    });


    $("#certificateInfo_clear").on('click', function(event) {

        $("#certificateInfo_bID").val('');
        $("#certificateInfo_cID").val('');

        $("#certificateInfo_result").val('');

    });

    $("#checkLatestCertificate_clear").on('click', function(event) {

        $("#checkLatestCertificate_bID").val('');
        $("#checkLatestCertificate_cID").val('');
        $("#checkLatestCertificate_certificateHash").val('');

        $("#checkLatestCertificate_result").val('');

    });

    $("#newBNFT").on('click', function(event) {

        input_data = {};

        //battery 소유자 생성 (판매자)
        input_data.from = "0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        input_data.privateKey = "8d60624a1f2c5eb805a5e6dc8aab9577e9edafa5d5ee867af88f1a7542f86919";

        // 소유할 battery에 할당 될 bID
        input_data.bID = BNFT;
        // 제조회사명
        input_data.manufacturerName = "SKI";
        // 모델명
        input_data.modelName = "No1";
        // 날짜
        input_data.manufacturerDate = "2010-11-14";

        $.ajax({
            url : BizUrl + BizPort + '/newBNFT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#newBNFT_result").val(JSON.stringify(result.result));

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

    $("#getBalanceOfBPT").on('click', function(event) {

        input_data = {};

        //구매자
        input_data.from = "0xd90DEC0025b43483c8087231768c35B1C70D5ED5";

        //판매자
        //input_data.from = "0xE0804701Fb5F86bE3fDa9977B590d7899933a278";

        $.ajax({
            url : BizUrl + BizPort + '/getBalanceOfBPT/from/' + input_data.from,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: input_data,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#getBalanceOfBPT_result").val(JSON.stringify(result.result));

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

    $("#transferBPT").on('click', function(event) {

        input_data = {};

        //구매자 주소
        input_data.from = "0xd90DEC0025b43483c8087231768c35B1C70D5ED5";
        input_data.privateKey = "41328176a9f1b9cca94e482f3f79d1877e8376d1290bf1efdea8f94381a4674d";

        // 판매자 주소
        input_data.recipient = "0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 보낼 token양
        input_data.amount = 10;

        $.ajax({
            url : BizUrl + BizPort + '/transferBPT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#transferBPT_result").val(JSON.stringify(result.result));

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

    $("#getOwnerOfBNFT").on('click', function(event) {

        input_data = {};

        //구매자
        input_data.bID = BNFT;

        //판매자
        //input_data.bID = BNFT;

        $.ajax({
            url : BizUrl + BizPort + '/getOwnerOfBNFT/bID/' + input_data.bID,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: input_data,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#getOwnerOfBNFT_result").val(JSON.stringify(result.result));

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

    $("#transferFromBNFT").on('click', function(event) {

        input_data = {};

        // 판매자 주소
        input_data.from = "0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 판매자 개인키
        input_data.privateKey = "8d60624a1f2c5eb805a5e6dc8aab9577e9edafa5d5ee867af88f1a7542f86919";

        // 소유권을 넘기는 주소
        input_data.transferFrom = "0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 소유권을 받는 주소
        input_data.transferTo = "0xd90DEC0025b43483c8087231768c35B1C70D5ED5";
        // 소유권이 이전 될 bID
        input_data.bID = BNFT;

        $.ajax({
            url : BizUrl + BizPort + '/TransferFromBNFT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#transferFromBNFT_result").val(JSON.stringify(result.result));

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
});
