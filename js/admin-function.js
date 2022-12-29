$(function() {
    //스크롤시
    $(window).scroll(function() {
        //헤더 가로 스크롤되도록 설정
        $("header.header").css("left", 0 - $(this).scrollLeft());
        
        //20221027 수정부분 start
        //위로가기 버튼 보이기&숨기기
        if ($(this).scrollTop() > 100) {
            $(".scrollup-area").fadeIn("slow");
        } else {
            $(".scrollup-area").fadeOut("slow");
        }
        //20221027 수정부분 end
    });
    
    //20220905 수정부분 start
    //datepicker 설정
    $(".c-date-input").each(function() {
        $(this).datepicker();
    });
    //20220905 수정부분 end
    
    //20220914 수정부분 start
    //sortable 설정
    $(".c-sortable-list").each(function() {
        $(this).sortable({
            update: function() {
                $(this).children("li").each(function(index) {
                    //드래그시 순서 넘버링도 변경됨
                    if ($(this).children(".sortable-num").length > 0) {
                        $(this).children(".sortable-num").text(index + 1);
                    }
                });
            },
            over: function() {
                console.log("over / " + $(this).find(".ui-sortable-helper").css("height") + " / " + $(this).find(".ui-sortable-placeholder").css("height"));
                var siHeight = $(this).find(".ui-sortable-helper").css("height");
                
                if (siHeight != undefined) {
                    $(this).find(".ui-sortable-placeholder").css("height",siHeight+"px");
                }
            },
            sort: function() {
                console.log("sort / " + $(this).find(".ui-sortable-helper").css("height") + " / " + $(this).find(".ui-sortable-placeholder").css("height"));
                var siHeight = $(this).find(".ui-sortable-helper").css("height");
                
                if (siHeight != undefined) {
                    $(this).find(".ui-sortable-placeholder").css("height",siHeight+"px");
                }
            }
        });
    });
    //20220914 수정부분 end
    
    //20221027 수정부분 start
    //위로가기 버튼 클릭시
    $(".scrollup-area").click(function() {
        $("html,body").stop().animate({scrollTop: 0}, 1000);
    });
    //20221027 수정부분 end
});

//20220905 수정부분 start
//분류코드 상세 항목 추가
function addCodeDetail(obj) {
    var tableAreaObj = $(obj).closest(".l-admin-table-top").next(".l-admin-table-area");
    
    if ($(tableAreaObj).length > 0) {
        var tbodyObj = $(tableAreaObj).find(".l-admin-table").find("tbody");
        var trNum = $(tbodyObj).find("tr").length;
        var trHtml = "";
        
        //20220907 수정부분 start
        trHtml += "<tr>";
        trHtml += "    <td>" + (trNum + 1) + "</td>";
        trHtml += "    <td><input type='text' id='' name=''></td>";
        trHtml += "    <td>";
        trHtml += "        <button type='button' class='delete-btn01' onclick='delCodeDetail(this);'>";
        trHtml += "            <span></span>";
        trHtml += "        </button>";
        trHtml += "    </td>";
        trHtml += "</tr>";
        //20220907 수정부분 end
        
        //20220915 수정부분 start
        $(tbodyObj).append(trHtml);
        //20220915 수정부분 end
    }
}

//분류코드 상세 항목 삭제
function delCodeDetail(obj) {
    var tableAreaObj = $(obj).closest(".l-admin-table-area");
    
    if ($(tableAreaObj).length > 0) {
        var tbodyObj = $(tableAreaObj).find(".l-admin-table").find("tbody");
        
        //20220915 수정부분 start
        var trNum = 0;
        
        $(obj).closest("tr").remove();
        
        $(tbodyObj).find("tr").each(function() {
            trNum++;
            $(this).find("td").eq(0).text(trNum);
        });
        //20220915 수정부분 end
    }
}
//20220905 수정부분 end

//20220915 수정부분 start
//체크박스 전체 체크&체크해제
function setAllCheck(obj, id) {
    if ($(obj).is(":checked")) {
        $("input[type='checkbox'][id^='" + id + "']").prop("checked",true);
    } else {
        $("input[type='checkbox'][id^='" + id + "']").prop("checked",false);
    }
}
//20220915 수정부분 end

//레이어창 열기
function openLayer(type, msg, fun) {
    $("#" + type + "-layer .l-box .l-con-area .l-default-con").html(msg);
    
    $("#" + type + "-layer .l-box .l-btn-area .confirm-btn").removeAttr("onclick");
    $("#" + type + "-layer .l-box .l-btn-area .confirm-btn").attr("onclick","closeLayer(this);" + fun);
    
    $("#" + type + "-layer").addClass("on");
    $("#" + type + "-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//알림창 열기
function openAlarmLayer(type) {
    var layerHtml = "";
    var layerBntHtml = "";
    
    $("#alarm-layer .l-box .l-con-area .l-con-btn-area").remove();
    
    $("#alarm-layer .l-box .l-con-area .l-default-con").html(layerHtml);
    $("#alarm-layer .l-box .l-con-area .l-default-con").after(layerBntHtml);
    
    $("#alarm-layer").addClass("on");
    $("#alarm-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//20220905 수정부분 start
//독립계정 등록창 열기
function openUserInsertLayer(obj) {
    $("#user-insert-layer").addClass("on");
    $("#user-insert-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//사용자계정 수정창 열기
function openUserModifyLayer(obj) {
    $("#user-modify-layer").addClass("on");
    $("#user-modify-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//분류코드 등록창 열기
function openCodeInsertLayer(obj) {
    $("#code-insert-layer").addClass("on");
    $("#code-insert-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//분류코드 수정창 열기
function openCodeModifyLayer(obj) {
    $("#code-modify-layer").addClass("on");
    $("#code-modify-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//분류코드 상세창 열기
function openCodeDetailLayer(obj) {
    $("#code-detail-layer").addClass("on");
    $("#code-detail-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220905 수정부분 end

//레이어창 닫기
function closeLayer(obj) {
    var layerId = $(obj).closest(".l-area").attr("id");
    
    $(obj).closest(".l-area").removeClass("on");
    $(obj).closest(".l-area").stop(true,true).slideUp(300);
    
    if ($(".l-area.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}
