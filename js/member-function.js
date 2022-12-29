let mainTopSwiper;
let mainBusinessSwiper;
let adDetailSeriesSwiper;
let mainLatestSlick;
let mainIssueSlick;
let mainBrandSlick;

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
    
    //swiper 슬라이드 (메인 상단 배너 영상)
    if ($(".main-top-slide").length > 0) {
        mainTopSwiper = new Swiper('.main-top-slide', {
            observer: true,
            observeParents: true,
            slidesPerView : 1,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.main-top-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: '.main-top-prev-arrow',
                nextEl: '.main-top-next-arrow',
                clickable: true,
            },
            watchOverflow: true
        });
    }
    
    //swiper 슬라이드 (메인 업종별 포트폴리오)
    if ($(".main-business-slide").length > 0) {
        mainBusinessSwiper = new Swiper('.main-business-slide', {
            observer: true,
            observeParents: true,
            slidesPerView : 'auto',
            mousewheelControl: true,
            watchOverflow: true
        });
    }
    
    //swiper 슬라이드 (ad 상세 시리즈 영상)
    if ($(".ad-detail-series-slide").length > 0) {
        adDetailSeriesSwiper = new Swiper('.ad-detail-series-slide', {
            observer: true,
            observeParents: true,
            slidesPerView : 'auto',
            mousewheelControl: true,
            navigation: {
                prevEl: '.ad-detail-series-prev-arrow',
                nextEl: '.ad-detail-series-next-arrow',
                clickable: true,
            },
            watchOverflow: true
        });
    }
    
    //slick 슬라이드 (메인 최신 프로젝트)
    if ($(".main-latest-slide").length > 0) {
        mainLatestSlick = $('.main-latest-slide').slick({
            infinite: false,
            slidesPerRow: 3,
            rows: 2,
            arrows: true,
            dots: false,
            fade: false,
            prevArrow: '<div class="main-latest-prev-arrow"></div>',
            nextArrow: '<div class="main-latest-next-arrow"></div>'
        });
    }
    
    //slick 슬라이드 (메인 이슈 크리에이티브)
    if ($(".main-issue-slide").length > 0) {
        mainIssueSlick = $('.main-issue-slide').slick({
            infinite: false,
            slidesPerRow: 4,
            rows: 2,
            arrows: true,
            dots: false,
            fade: false,
            prevArrow: '<div class="main-issue-prev-arrow"></div>',
            nextArrow: '<div class="main-issue-next-arrow"></div>'
        });
    }
    
    //slick 슬라이드 (메인 브랜드 컨텐츠 영상)
    if ($(".main-brand-slide").length > 0) {
        mainBrandSlick = $('.main-brand-slide').slick({
            infinite: false,
            slidesPerRow: 6,
            rows: 2,
            speed: 400,
            arrows: true,
            dots: false,
            fade: true,
            prevArrow: '<div class="main-brand-prev-arrow"></div>',
            nextArrow: '<div class="main-brand-next-arrow"></div>'
        });
    }
    
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
    
    //20221007 수정부분 start
    //AD 라이브러리의 모델 입력폼 자동완성
    if ($(".ad-model-input").length > 0) {
        var adModelTags = ['롯데제과','롯데칠성음료','롯데백화점','롯데그룹','롯데미디어','롯데정보통신'];
        
        //20221110 수정부분 start
        $(".ad-model-input").each(function() {
            $(this).autocomplete({
                source: adModelTags,
                minLength: 1,
                open: function(event,ui) {
                    $(this).autocomplete("widget").css({
                        "min-width": $(this).innerWidth()
                    });
                },
                focus: function(event,ui) {
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function(ul,item) {
                var $a = $("<a></a>").text(item.label);
                highlightText(this.term, $a);
                return $("<li></li>").append($a).appendTo(ul);
            };
        });
        //20221110 수정부분 end
    }
    
    //AD 라이브러리의 해시태그 입력폼 자동완성
    if ($(".ad-hashtag-input").length > 0) {
        var adHashtagTags = ['롯데제과','롯데칠성음료','롯데백화점','롯데그룹','롯데미디어','롯데정보통신'];
        
        //20221110 수정부분 start
        $(".ad-hashtag-input").each(function() {
            $(this).autocomplete({
                source: adHashtagTags,
                minLength: 1,
                open: function(event,ui) {
                    $(this).autocomplete("widget").css({
                        "min-width": $(this).innerWidth()
                    });
                },
                focus: function(event,ui) {
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function(ul,item) {
                var $a = $("<a></a>").text(item.label);
                highlightText(this.term, $a);
                return $("<li></li>").append($a).appendTo(ul);
            };
        });
        //20221110 수정부분 end
    }
    //20221007 수정부분 end
    
    //20221110 수정부분 start
    //AD 라이브러리의 모델 입력시 자동완성 텍스트 설정
    $(".ad-model-input").keyup(function() {
        var adInputTags = ['롯데제과','롯데칠성음료','롯데백화점','롯데그룹','롯데미디어','롯데정보통신'];
        
        adInputTags.push("롯데모델" + adInputTags.length);
        
        $(this).autocomplete('option', 'source', adInputTags);
    });
    
    //AD 라이브러리의 해사시 입력시 자동완성 텍스트 설정
    $(".ad-hashtag-input").keyup(function() {
        var adInputTags = ['롯데제과','롯데칠성음료','롯데백화점','롯데그룹','롯데미디어','롯데정보통신'];
        
        adInputTags.push("롯데해시태그" + adInputTags.length);
        
        $(this).autocomplete('option', 'source', adInputTags);
    });
    //20221110 수정부분 end
    
    //동영상 이벤트
    if ($(".ad-video-play-area").length > 0) {
        $(".ad-video-play-area").each(function() {
            var videoObj = $(this).find(".ad-video-play").get(0);
            
            //동영상 재생시
            videoObj.addEventListener('play', function() {
                $(this).closest(".ad-video-play-area").addClass("play");
            });
            
            //동영상 중단시
            videoObj.addEventListener('pause', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
            
            //동영상 종료시
            videoObj.addEventListener('ended', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
        });
    }
    
    //20220907 수정부분 start
    //심사평가 질문이 객관식일 경우 옵션 최대선택 개수만큼 설정가능하도록 설정
    $(".objective-item .question-list-con input[type='checkbox']").click(function() {
        var itemObj = $(this).closest(".objective-item");
        var dataSelectCnt = parseInt($(itemObj).attr("data-select-cnt"));
        
        if (dataSelectCnt > 0) {
            var checkCnt = $(itemObj).find(".question-list-con").find("input[type='checkbox']:checked").length;
            
            if (dataSelectCnt < checkCnt) {
                $(this).prop("checked",false);
                openLayer("alert","최대 " + dataSelectCnt + "개까지 선택할 수 있습니다.","");
            }
        }
    });
    //20220907 수정부분 end
    
    //20220915 수정부분 start
    //심사평가 등록&수정에서 심사위원 선택시
    if ($(".judge-select-area").length > 0) {
        setJudgeType($(".judge-select-area").find(".judge-select1"));
    }
    
    if ($(".form-inquiry-list").length > 0) {
        $(".form-inquiry-list").children("li").each(function() {
            //심사평가 등록&수정에서 질문종류 선택시
            setInquiryType($(this).find(".c-table-area").find(".c-table").find("tbody").find(".inquiry-type"));
            
            //심사평가 등록&수정에서 질문 옵션설정 항목에 따라 옵션 최대선택 개수 설정
            setInquirySelectCnt($(this).find(".c-table-area").find(".c-table").find("tbody"));
        });
    }
    
    //심사평가 등록&수정에서 AD 리스트 존재여부 확인시
    if ($(".form-ad-list").length > 0) {
        setAdExist($(".form-ad-list").find(".c-sortable-list"));
    }
    //20220915 수정부분 end
    
    //20221007 수정부분 start
    //심사평가 결과에서 주관식일 경우 질문에 대한 답변 보이기&숨기기
    $(".form-result-subjective>li").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
    //20221007 수정부분 end
    
    //20221027 수정부분 start
    //위로가기 버튼 클릭시
    $(".scrollup-area").click(function() {
        $("html,body").stop().animate({scrollTop: 0}, 1000);
    });
    
    //심사평가 결과에서 주관식일 경우 질문에 대한 답변 보이기&숨기기
    $("li.subjective-item .answer-con").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
    //20221027 수정부분 end
    
    //20221202 수정부분 start
    //AD 목록에서 썸네일 크기 설정
    $(".c-ad-img").each(function(idx,el) {
        //기본 배경 사이즈
        var bgWidth = 202;
        var bgHeight = 114;
        var bgImgGap = 20;
        
        //이미지 경로 가져오기
        var $imgbox = $(el);
        var uri = $imgbox.css('background-image').match(/^url\("?(.+?)"?\)$/)[1];
        
        //AD 검색일 경우 배경 사이즈
        if ($(".c-ad-search").length > 0) {
            bgWidth = 262;
            bgHeight = 152;
            bgImgGap = 40;
        }
        
        $('<img>').attr('src',uri).one('load',function() {
            //이미지 사이즈
            var imgWidth = this.width;
            var imgHeight = this.height;
            
            //배경 사이즈 비율
            var bgRatio = bgWidth / bgHeight;
            //이미지 사이즈 비율
            var imgRatio = imgWidth / imgHeight;
            
            //배경 사이즈와 이미지 사이즈의 오차범위가 bgImgGap 이하일 경우 이미지 확대
            if (Math.abs(((imgWidth * bgHeight) / bgWidth) - imgHeight) < bgImgGap) {
                if (bgRatio > imgRatio) {
                    //이미지 사이즈가 배경 사이즈보다 세로가 더 길어서 세로 사이즈를 확대
                    $imgbox.css("background-size","auto 105%");
                } else if (bgRatio < imgRatio) {
                    //이미지 사이즈가 배경 사이즈보다 가로가 더 길어서 가로 사이즈를 확대
                    $imgbox.css("background-size","105% auto");
                }
            }
        });
    });
    //20221202 수정부분 end
});

//관심영상 체크&체크해제
function setAttention(obj) {
    //20220914 수정부분 start
    var itemObj = $(obj).closest(".c-ad-item");
    
    if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
        $(itemObj).find(".c-ad-txt").find(".attention").removeClass("on");
    } else {
        $(obj).addClass("on");
        $(itemObj).find(".c-ad-txt").find(".attention").addClass("on");
    }
    //20220914 수정부분 end
}

//영상 재생하기
function setVideoPlay(obj) {
    var adVideoObj = $(obj).closest(".ad-video-play-area");
    
    if ($(adVideoObj).length > 0) {
        var videoObj = $(adVideoObj).find(".ad-video-play").get(0);
        
        if ($(videoObj).length > 0) {
            if (videoObj.paused) {
                //동영상 중단시
                videoObj.play();
                $(adVideoObj).addClass("play");
            } else {
                //동영상 재생시
                videoObj.pause();
                $(adVideoObj).removeClass("play");
            }
        }
    }
}

//제작정보 보이기&숨기기
function setProductionInfo(obj) {
    var productionObj = $(obj).closest(".ad-detail-production-info");
    
    if ($(productionObj).length > 0) {
        if ($(productionObj).hasClass("on")) {
            $(productionObj).removeClass("on");
        } else {
            $(productionObj).addClass("on");
        }
    }
}

//시리즈 영상 재생하기
function setSeriesVideo(obj) {
    var adDetailObj = $(obj).closest(".ad-detail-area");
    var dataType = $(obj).attr("data-type");
    var dataHref = $(obj).attr("data-href");
    var seriesVideoHtml = "";
    
    if ($(adDetailObj).length > 0) {
        if (dataType == "image") {
            //20221104 수정부분 start
            //이미지일 경우
            seriesVideoHtml += "<img src='../img/" + dataHref + "' alt='동영상이미지' class='ad-img-play' data-type='image' data-href='video-img.png' onclick='openPlayLayer(this);'>";
            //20221104 수정부분 end
        } else if (dataType == "video") {
            //동영상일 경우
            seriesVideoHtml += "<div class='ad-video-play-area'>";
            seriesVideoHtml += "    <video playsinline controls class='ad-video-play' oncontextmenu='return false;'>";
            seriesVideoHtml += "        <source src='../img/" + dataHref + "' type='video/mp4' />";
            seriesVideoHtml += "    </video>";
            seriesVideoHtml += "    <button type='button' class='play-btn01' onclick='setVideoPlay(this);'>";
            seriesVideoHtml += "        <span></span>";
            seriesVideoHtml += "    </button>";
            seriesVideoHtml += "</div>";
        }
        
        $(adDetailObj).find(".ad-detail-main").find(".ad-detail-con1").find(".ad-detail-play").html(seriesVideoHtml);
    }
    
    //동영상 이벤트
    if ($(".ad-video-play-area").length > 0) {
        $(".ad-video-play-area").each(function() {
            var videoObj = $(this).find(".ad-video-play").get(0);
            
            //동영상 재생시
            videoObj.addEventListener('play', function() {
                $(this).closest(".ad-video-play-area").addClass("play");
            });
            
            //동영상 중단시
            videoObj.addEventListener('pause', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
            
            //동영상 종료시
            videoObj.addEventListener('ended', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
        });
    }
}

//영상 추가정보 보이기&숨기기
function setAddInfo(obj) {
    var addObj = $(obj).closest(".ad-detail-add-info");
    
    if ($(addObj).length > 0) {
        if ($(addObj).hasClass("on")) {
            $(addObj).removeClass("on");
        } else {
            $(addObj).addClass("on");
        }
    }
}

//20220907 수정부분 start
//ad검색리스트에서 초기화 버튼 클릭시 검색조건 초기화
function setAdSearchReset(obj) {
    var searchObj = $(obj).closest(".c-list-search-area");
    
    $(searchObj).find("input").each(function() {
        if ($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "email" || $(this).attr("type") == "tel" || $(this).attr("type") == "number") {
            $(this).val("");
        } else if ($(this).attr("type") == "checkbox" || $(this).attr("type") == "radio") {
            $(this).prop("checked",false);
        }
    });
    
    //20220915 수정부분 start
    $(searchObj).find("select").each(function() {
        $(this).children("option").eq(0).prop("selected",true);
    });
    //20220915 수정부분 end
}

//ad검색리스트에서 검색조건 상세보기&간략보기
function setAdSearchView(obj) {
    var searchObj = $(obj).closest(".c-list-search-area");
    
    //20220914 수정부분 start
    if ($(searchObj).hasClass("on")) {
        $(searchObj).find(".detail-search-item").find("input").each(function() {
            $(this).prop("disabled",true);
        });
        
        //20220915 수정부분 start
        $(searchObj).find(".detail-search-item").find("select").each(function() {
            $(this).prop("disabled",true);
        });
        //20220915 수정부분 end
        
        $(searchObj).removeClass("on");
    } else {
        $(searchObj).find(".detail-search-item").find("input").each(function() {
            $(this).prop("disabled",false);
        });
        
        //20220915 수정부분 start
        $(searchObj).find(".detail-search-item").find("select").each(function() {
            $(this).prop("disabled",false);
        });
        //20220915 수정부분 end
        
        $(searchObj).addClass("on");
    }
    //20220914 수정부분 end
}

//내정보에서 비밀번호 변경 체크시 새 비밀번호 항목 보이기&숨기기
function setPasswordChage(obj) {
    if ($(obj).is(":checked")) {
        $(".new-password-item").addClass("on");
    } else {
        $(".new-password-item").removeClass("on");
    }
}
//20220907 수정부분 end

//20220915 수정부분 start
//심사평가 등록&수정에서 심사위원 선택시
function setJudgeType(obj) {
    var dataJudgeType = $(obj).children("option:selected").attr("data-judge-type");
    var judgeSelectedObj = $(obj).closest(".judge-select-area").next(".judge-selected-area");
    var judgeSelectedArr = [];
    var judgeTypeHtml = "";
    
    //예시) 부서&직원 옵션값 (옵션값은 '.judge-selected-area>li' 태그 (선택한 심사위원 태그)의 'data-judge-val' 와 동일하게 설정해주세요)
    var judgeDepartment = ['부서명1111','부서명2222','부서명3333','부서명4444','부서명5555'];
    var judgeEmployee = ['관리자(test1111)','영상관리자(test2222)','임직원(test3333)','내부심사위원(test4444)','외부심사위원(test5555)'];
    
    //선택한 심사위원 값 가져오기
    $(judgeSelectedObj).children("li").each(function() {
        if ($(this).attr("data-judge-type") == dataJudgeType) {
            judgeSelectedArr.push($(this).attr("data-judge-val"));
        }
    });
    
    //20221219 수정부분 start
    $(obj).siblings("select").not(".judge-select-last").remove();
    //20221219 수정부분 end

    if (dataJudgeType == "부서선택") {
        //judge-select2 : 부서선택&직원선택일 경우에만 노출
        judgeTypeHtml += "<select id='' name='' class='judge-select2'>";
        
        for (var jd in judgeDepartment) {
            //이미 선택했을 경우 not-option 클래스 추가
            judgeTypeHtml += "    <option value='" + judgeDepartment[jd] + "'" + (judgeSelectedArr.indexOf(judgeDepartment[jd]) > -1 ? " class='not-option'" : "") + ">" + judgeDepartment[jd] + "</option>";
        }
        
        judgeTypeHtml += "</select>";
    } else if (dataJudgeType == "직원선택") {
        //judge-select2 : 부서선택&직원선택일 경우에만 노출
        judgeTypeHtml += "<select id='' name='' class='judge-select2'>";
        
        for (var je in judgeEmployee) {
            //이미 선택했을 경우 not-option 클래스 추가
            judgeTypeHtml += "    <option value='" + judgeEmployee[je] + "'" + (judgeSelectedArr.indexOf(judgeEmployee[je]) > -1 ? " class='not-option'" : "") + ">" + judgeEmployee[je] + "</option>";
        }
        
        judgeTypeHtml += "</select>";
        
        //judge-select3 : 직원선택일 경우에만 노출
        judgeTypeHtml += "<select id='' name='' class='judge-select3'>";
        judgeTypeHtml += "    <option value='A' selected>A그룹</option>";
        judgeTypeHtml += "    <option value='B' class='zzz'>B그룹</option>";
        judgeTypeHtml += "    <option value='C'>C그룹</option>";
        judgeTypeHtml += "    <option value='D'>D그룹</option>";
        judgeTypeHtml += "    <option value='E'>E그룹</option>";
        judgeTypeHtml += "    <option value='F'>F그룹</option>";
        judgeTypeHtml += "</select>";
    }
    
    $(obj).after(judgeTypeHtml);
    
    if ($(obj).siblings(".judge-select2").length > 0) {
        if ($(obj).siblings(".judge-select2").children("option[class!='not-option']").length > 0) {
            $(obj).siblings(".judge-select2").children("option[value='']").remove();
        } else {
            $(obj).siblings(".judge-select2").prepend("<option value=''>없음</option>");
        }
        
        $(obj).siblings(".judge-select2").children("option[class!='not-option']").eq(0).prop("selected",true);
    }
}

//심사평가 등록&수정에서 심사위원 추가시
function addEvaluationJudge(obj) {
    var judgeSelecteObj = $(obj).closest(".judge-select-area");
    var judgeSelectedObj = $(judgeSelecteObj).next(".judge-selected-area");
    var judgeSelect1Val = $(judgeSelecteObj).find(".judge-select1").children("option:selected").attr("data-judge-type");
    var judgeSelect2Val = "";
    var judgeSelect3Val = "";
    var judgeSelectedHtml = "";
    
    if (judgeSelect1Val == "전체") {
        if ($(judgeSelectedObj).children("li[data-judge-type='" + judgeSelect1Val + "']").length == 0) {
            //data-judge-type : 선택종류, data-judge-val : 선택값
            judgeSelectedHtml += "<li data-judge-type='" + judgeSelect1Val + "' data-judge-val='" + judgeSelect1Val + "'>";
            judgeSelectedHtml += "    <div class='judge-selected-txt'>" + judgeSelect1Val + "</div>";
            judgeSelectedHtml += "    <button type='button' class='judge-selected-btn' onclick='delEvaluationJudge(this);'>";
            judgeSelectedHtml += "        <span><img src='../img/close-btn5.png' alt='심사위원삭제'></span>";
            judgeSelectedHtml += "    </button>";
            judgeSelectedHtml += "</li>";
        }
    } else if (judgeSelect1Val == "부서선택") {
        judgeSelect2Val = $(judgeSelecteObj).find(".judge-select2").children("option:selected").val();
        
        if (judgeSelect2Val != "") {
            //data-judge-type : 선택종류, data-judge-val : 선택값
            judgeSelectedHtml += "<li data-judge-type='" + judgeSelect1Val + "' data-judge-val='" + judgeSelect2Val + "'>";
            judgeSelectedHtml += "    <div class='judge-selected-txt'>" + judgeSelect2Val + "</div>";
            judgeSelectedHtml += "    <button type='button' class='judge-selected-btn' onclick='delEvaluationJudge(this);'>";
            judgeSelectedHtml += "        <span><img src='../img/close-btn5.png' alt='심사위원삭제'></span>";
            judgeSelectedHtml += "    </button>";
            judgeSelectedHtml += "</li>";
        }
    } else if (judgeSelect1Val == "직원선택") {
        judgeSelect2Val = $(judgeSelecteObj).find(".judge-select2").children("option:selected").val();
        judgeSelect3Val = $(judgeSelecteObj).find(".judge-select3").children("option:selected").val();
        
        if (judgeSelect2Val != "") {
            //data-judge-type : 선택종류, data-judge-val : 선택값
            judgeSelectedHtml += "<li data-judge-type='" + judgeSelect1Val + "' data-judge-val='" + judgeSelect2Val + "'>";
            judgeSelectedHtml += "    <div class='judge-selected-txt'>(" + judgeSelect3Val + ")" + judgeSelect2Val + "</div>";
            judgeSelectedHtml += "    <button type='button' class='judge-selected-btn' onclick='delEvaluationJudge(this);'>";
            judgeSelectedHtml += "        <span><img src='../img/close-btn5.png' alt='심사위원삭제'></span>";
            judgeSelectedHtml += "    </button>";
            judgeSelectedHtml += "</li>";
        }
    }
    
    $(judgeSelectedObj).append(judgeSelectedHtml);
    
    if ($(judgeSelecteObj).find(".judge-select2").length > 0) {
        $(judgeSelecteObj).find(".judge-select2").children("option:selected").addClass("not-option");
        
        if ($(judgeSelecteObj).find(".judge-select2").children("option[class!='not-option']").length > 0) {
            $(judgeSelecteObj).find(".judge-select2").children("option[value='']").remove();
        } else {
            $(judgeSelecteObj).find(".judge-select2").prepend("<option value=''>없음</option>");
        }
        
        $(judgeSelecteObj).find(".judge-select2").children("option[class!='not-option']").eq(0).prop("selected",true);
    }
}

//심사평가 등록&수정에서 심사위원 삭제시
function delEvaluationJudge(obj) {
    var dataJudgeVal = $(obj).closest("li").attr("data-judge-val");
    var judgeSelectedObj = $(obj).closest(".judge-selected-area");
    var judgeSelecteObj = $(judgeSelectedObj).prev(".judge-select-area");
    
    $(obj).closest("li").remove();
    
    if ($(judgeSelecteObj).find(".judge-select2").length > 0) {
        $(judgeSelecteObj).find(".judge-select2").children("option[value='" + dataJudgeVal + "']").removeClass("not-option");
        
        if ($(judgeSelecteObj).find(".judge-select2").children("option[value='']").length > 0) {
            $(judgeSelecteObj).find(".judge-select2").children("option[value='']").remove();
            $(judgeSelecteObj).find(".judge-select2").children("option[class!='not-option']").eq(0).prop("selected",true);
        }
    }
}

//심사평가 등록&수정에서 질문 추가시
function addEvaluationInquiry(obj) {
    var inquiryObj = $(obj).closest(".form-inquiry-list");
    var inquiryHtml = "";
    
    inquiryHtml += "<li>";
    inquiryHtml += "    <div class='c-table-area'>";
    inquiryHtml += "        <table class='c-table'>";
    inquiryHtml += "            <colgroup>";
    inquiryHtml += "                <col width='120'>";
    inquiryHtml += "                <col width='*'>";
    inquiryHtml += "            </colgroup>";
    inquiryHtml += "            <tbody>";
    inquiryHtml += "                <tr>";
    inquiryHtml += "                    <th>질문종류</th>";
    inquiryHtml += "                    <td class='c-left'>";
    inquiryHtml += "                        <div class='c-inline-input'>";
    
    //data-inquiry-type : objective (객관식), subjective (주관식)
    inquiryHtml += "                            <select id='' name='' class='inquiry-type' onchange='setInquiryType(this);'>";
    inquiryHtml += "                                <option value='objective' data-inquiry-type='objective'>객관식</option>";
    inquiryHtml += "                                <option value='subjective' data-inquiry-type='subjective'>주관식</option>";
    inquiryHtml += "                            </select>";
    inquiryHtml += "                            <button type='button' class='c-default-btn17 delete-btn' onclick='delEvaluationInquiry(this);'>";
    inquiryHtml += "                                <span>질문삭제</span>";
    inquiryHtml += "                            </button>";
    inquiryHtml += "                        </div>";
    inquiryHtml += "                    </td>";
    inquiryHtml += "                </tr>";
    inquiryHtml += "                <tr>";
    inquiryHtml += "                    <th>질문내용</th>";
    inquiryHtml += "                    <td class='c-left'><input type='text' id='' name=''></td>";
    inquiryHtml += "                </tr>";
    
    //tr-objective : 객관식일 경우에만 노출
    inquiryHtml += "                <tr class='tr-objective'>";
    inquiryHtml += "                    <th>옵션설정</th>";
    inquiryHtml += "                    <td class='td-option-setting c-left'>";
    inquiryHtml += "                        <button type='button' class='c-default-btn16 insert-btn2' onclick='addEvaluationInquiryOption(this);'>";
    inquiryHtml += "                            <span>옵션추가</span>";
    inquiryHtml += "                        </button>";
    inquiryHtml += "                        <div class='c-table-area'>";
    inquiryHtml += "                            <table class='c-table'>";
    inquiryHtml += "                                <colgroup>";
    inquiryHtml += "                                    <col width='96'>";
    inquiryHtml += "                                    <col width='*'>";
    inquiryHtml += "                                    <col width='96'>";
    inquiryHtml += "                                    <col width='*'>";
    inquiryHtml += "                                </colgroup>";
    inquiryHtml += "                                <tbody></tbody>";
    inquiryHtml += "                            </table>";
    inquiryHtml += "                        </div>";
    inquiryHtml += "                    </td>";
    inquiryHtml += "                </tr>";
    
    //tr-objective : 객관식일 경우에만 노출
    inquiryHtml += "                <tr class='tr-objective'>";
    inquiryHtml += "                    <th>옵션 최대선택 개수</th>";
    inquiryHtml += "                    <td class='c-left'>";
    
    //inquiry-select-cnt : 객관식일 경우 옵션설정 항목에 따라 변경됨
    inquiryHtml += "                        <select id='' name='' class='inquiry-select-cnt'>";
    inquiryHtml += "                            <option value=''>선택</option>";
    inquiryHtml += "                        </select>";
    inquiryHtml += "                    </td>";
    inquiryHtml += "                </tr>";
    inquiryHtml += "            </tbody>";
    inquiryHtml += "        </table>";
    inquiryHtml += "    </div>";
    inquiryHtml += "    <button type='button' class='c-default-btn08 insert-btn' onclick='addEvaluationInquiry(this);'>";
    inquiryHtml += "        <span>질문 추가</span>";
    inquiryHtml += "    </button>";
    inquiryHtml += "</li>";
    
    $(inquiryObj).append(inquiryHtml);
}

//심사평가 등록&수정에서 질문 삭제시
function delEvaluationInquiry(obj) {
    $(obj).closest("li").remove();
}

//심사평가 등록&수정에서 질문종류 선택시
function setInquiryType(obj) {
    var dataInquiryType = $(obj).children("option:selected").attr("data-inquiry-type");
    var inquiryTbodyObj = $(obj).closest("tbody");
    
    if (dataInquiryType == "objective") {
        //객관식일 경우
        $(inquiryTbodyObj).children(".tr-objective").css("display","");
    } else if (dataInquiryType == "subjective") {
        //주관식일 경우
        $(inquiryTbodyObj).children(".tr-objective").css("display","none");
    }
}

//심사평가 등록&수정에서 질문 옵션설정 항목에 따라 옵션 최대선택 개수 설정
function setInquirySelectCnt(obj) {
    var inquiryOptionCnt = $(obj).find(".c-table-area").find(".c-table").find("tbody").find("tr").length;
    var inquirySelectCntVal = $(obj).find(".inquiry-select-cnt").find("option:selected").val();
    var inquirySelectCntHtml = "";
    
    $(obj).find(".inquiry-select-cnt").find("option").remove();
    
    inquirySelectCntHtml += "<option value=''>선택</option>"
    
    for (var i=1; i<=inquiryOptionCnt; i++) {
        inquirySelectCntHtml += "<option value='" + i + "'>" + i + "</option>";
    }
    
    $(obj).find(".inquiry-select-cnt").append(inquirySelectCntHtml);
    
    if ($(obj).find(".inquiry-select-cnt").find("option[value='" + inquirySelectCntVal + "']").length > 0) {
        $(obj).find(".inquiry-select-cnt").find("option[value='" + inquirySelectCntVal + "']").prop("selected",true);
    } else {
        $(obj).find(".inquiry-select-cnt").find("option").eq(0).prop("selected",true);
    }
}

//심사평가 등록&수정에서 질문 옵션 추가시
function addEvaluationInquiryOption(obj) {
    var inquiryOptionObj = $(obj).next(".c-table-area").find(".c-table").find("tbody");
    var inquiryOptionHtml = "";
    
    inquiryOptionHtml += "<tr>";
    inquiryOptionHtml += "   <th>옵션값</th>";
    inquiryOptionHtml += "   <td class='c-left'><input type='text' id='' name=''></td>";
    inquiryOptionHtml += "   <th>옵션내용</th>";
    inquiryOptionHtml += "   <td class='c-left'>";
    inquiryOptionHtml += "      <div class='c-inline-input'>";
    inquiryOptionHtml += "          <input type='text' id='' name=''>";
    inquiryOptionHtml += "          <button type='button' class='delete-btn01' onclick='delEvaluationInquiryOption(this);'>";
    inquiryOptionHtml += "              <span></span>";
    inquiryOptionHtml += "          </button>";
    inquiryOptionHtml += "      </div>";
    inquiryOptionHtml += "   </td>";
    inquiryOptionHtml += "</tr>";
    
    $(inquiryOptionObj).append(inquiryOptionHtml);
    
    setInquirySelectCnt($(obj).closest("tbody"));
}

//심사평가 등록&수정에서 질문 옵션 삭제시
function delEvaluationInquiryOption(obj) {
    var inquiryTbodyObj = $(obj).closest(".td-option-setting").closest("tbody");
    
    $(obj).closest("tr").remove();
    
    setInquirySelectCnt($(inquiryTbodyObj));
}

//심사평가 등록&수정에서 AD 리스트 존재여부 확인시
function setAdExist(obj) {
    var adExistHtml = "";
    
    $(obj).next(".c-sortable-empty").remove();
    
    if ($(obj).children("li").length == 0) {
        //c-sortable-empty : AD 목록이 없을 경우에만 노출
        adExistHtml += "<ul class='c-sortable-empty'>";
        adExistHtml += "    <li>드래그로 순서를 변경해주세요.</li>";
        adExistHtml += "</ul>";
        
        $(obj).after(adExistHtml);
    }
}

//심사평가 등록&수정에서 AD 삭제시
function delEvaluationAd(obj) {
    var adSelectedObj = $(obj).closest(".c-sortable-list");
    
    $(obj).closest("li").remove();
    
    setAdExist($(adSelectedObj));
}

//체크박스 전체 체크&체크해제
function setAllCheck(obj, id) {
    if ($(obj).is(":checked")) {
        $("input[type='checkbox'][id^='" + id + "']").prop("checked",true);
    } else {
        $("input[type='checkbox'][id^='" + id + "']").prop("checked",false);
    }
}
//20220915 수정부분 end

//20220921 수정부분 start
//AD 라이브러리 등록&수정에서 BGM 보이기&숨기기
function setAdBgm(obj) {
    var bgmObj = $(obj).closest(".bgm-tit-area");
    
    if ($(bgmObj).length > 0) {
        if ($(bgmObj).hasClass("on")) {
            $(bgmObj).removeClass("on");
        } else {
            $(bgmObj).addClass("on");
        }
    }
}

//AD 라이브러리 등록&수정에서 인사항목 삭제시
function delAdPersonnel(obj) {
    $(obj).closest("li").remove();
}

//AD 라이브러리 등록&수정에서 해시태그 추가시
function addAdHashtag(obj) {
    var hashtagInputObj = $(obj).closest(".hashtag-input-area");
    var hashtagListObj = $(hashtagInputObj).next(".hashtag-list-area");
    var hashtagInputVal = $(hashtagInputObj).find("input[type='text']").val();
    var hashtagListHtml = "";
    
    if (hashtagInputVal != "" && hashtagInputVal != undefined && hashtagInputVal != null) {
        hashtagListHtml += "<li>";
        hashtagListHtml += "    <div class='hashtag-list-txt'>" + hashtagInputVal + "</div>";        
        hashtagListHtml += "    <button type='button' class='hashtag-list-btn' onclick='delAdHashtag(this);'>";
        hashtagListHtml += "        <span><img src='../img/close-btn5.png' alt='해시태그삭제'></span>";
        hashtagListHtml += "    </button>";
        hashtagListHtml += "</li>";
    }
    
    $(hashtagListObj).append(hashtagListHtml);
    
    $(hashtagInputObj).find("input[type='text']").val("");
    $(hashtagInputObj).find("input[type='text']").focus();
}

//AD 라이브러리 등록&수정에서 해시태그 삭제시
function delAdHashtag(obj) {
    $(obj).closest("li").remove();
}

//AD 라이브러리 등록&수정에서 광고제 수상 보이기&숨기기
function setAdAward(obj) {
    var awardObj = $(obj).closest(".award-first-area");
    
    if ($(awardObj).length > 0) {
        if ($(awardObj).hasClass("on")) {
            $(awardObj).removeClass("on");
        } else {
            $(awardObj).addClass("on");
        }
    }
}
//20220921 수정부분 end

//20221007 수정부분 start
//자동완성 기능에서 일치하는 글자에 클래스 추가
function highlightText(text,$node) {
    var searchText = $.trim(text).toLowerCase(), currentNode = $node.get(0).firstChild, matchIndex, newTextNode, newSpanNode;
    while ((matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >= 0) {
        newTextNode = currentNode.splitText(matchIndex);
        currentNode = newTextNode.splitText(searchText.length);
        newSpanNode = document.createElement("span");
        newSpanNode.className = "highlight";
        currentNode.parentNode.insertBefore(newSpanNode, currentNode);
        newSpanNode.appendChild(newTextNode);
    }
}
//20221007 수정부분 end

//20221110 수정부분 start
//AD 라이브러리 등록&수정에서 모델 추가시
function addAdModel(obj) {
    var modelInputObj = $(obj).prev(".ad-model-input");
    var modelTxtObj = $(modelInputObj).closest("td").find(".ad-model-txt");
    var modelInputVal = $(modelInputObj).val();
    var modelTxtVal = $(modelTxtObj).val();
    var modelTxtHtml = "";
    
    if (modelInputVal != "" && modelInputVal != undefined && modelInputVal != null) {
        if (modelTxtVal != "" && modelTxtVal != undefined && modelTxtVal != null) {
            modelTxtHtml = modelTxtVal + ", ";
        }
        
        modelTxtHtml += modelInputVal;
        
        $(modelTxtObj).val(modelTxtHtml);
        $(modelInputObj).val("");
    }
}
//20221110 수정부분end

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
    
    //20220915 수정부분 start
    var layerBntHtml = "";
    
    //20220930 수정부분 start
    $("#alarm-layer .l-box .l-con-area .l-con-btn-area").remove();
    //20220930 수정부분 end
    
    if (type == "temporarySave") {
        layerHtml += "<div class='l-alarm-img' style='background-image: url(../img/temporary-save-bg.png);'></div>";
        layerHtml += "<div class='l-alarm-txt'><b>임시저장</b> 되었습니다.</div>";
    } else if (type == "examinationCompletion") {
        layerHtml += "<div class='l-alarm-img' style='background-image: url(../img/examination-completion-bg.png);'></div>";
        layerHtml += "<div class='l-alarm-txt'><b>심사완료</b> 되었습니다.</div>";
    } else if (type == "notTemporarySave") {
        //20220930 수정부분 start
        layerHtml += "<div class='l-alarm-img' style='background-image: url(../img/not-temporary-save-bg.png);'></div>";
        //20220930 수정부분 end
        
        layerHtml += "<div class='l-alarm-txt'>심사평가 내용이 <b>저장되지 않습니다.</b><br><b>임시저장</b> 해 주세요.<br>그래도 이동하시겠습니까?</div>";
        
        layerBntHtml += "<div class='l-con-btn-area'>";
        layerBntHtml += "    <button type='button' class='c-round-btn04 close-btn' onclick='closeLayer(this);'>";
        layerBntHtml += "        <span>취 소</span>";
        layerBntHtml += "    </button>";
        layerBntHtml += "    <button type='button' class='c-round-btn03 confirm-btn' onclick=''>";
        layerBntHtml += "        <span>확 인</span>";
        layerBntHtml += "    </button>";
        layerBntHtml += "</div>";
    }
    
    $("#alarm-layer .l-box .l-con-area .l-default-con").html(layerHtml);
    
    //20220930 수정부분 start
    $("#alarm-layer .l-box .l-con-area .l-default-con").after(layerBntHtml);
    //20220930 수정부분 end
    //20220915 수정부분 end
    
    $("#alarm-layer").addClass("on");
    $("#alarm-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//영상재생창 열기
function openPlayLayer(obj) {
    var dataType = $(obj).attr("data-type");
    var dataHref = $(obj).attr("data-href");
    var layerHtml = "";
    
    if (dataType == "image") {
        //이미지일 경우
        layerHtml += "<img src='../img/" + dataHref + "' alt='동영상이미지' class='ad-img-play'>";
    } else if (dataType == "video") {
        //동영상일 경우
        layerHtml += "<div class='ad-video-play-area'>";
        layerHtml += "    <video playsinline controls class='ad-video-play' oncontextmenu='return false;'>";
        layerHtml += "        <source src='../img/" + dataHref + "' type='video/mp4' />";
        layerHtml += "    </video>";
        layerHtml += "    <button type='button' class='play-btn01' onclick='setVideoPlay(this);'>";
        layerHtml += "        <span></span>";
        layerHtml += "    </button>";
        layerHtml += "</div>";
    }

    $("#play-layer .l-box .l-con-area .l-play-con").html(layerHtml);
    
    $("#play-layer").addClass("on");
    $("#play-layer").stop(true,true).slideDown(300);
    
    //메인 상단 배너 영상 슬라이드 중단
    if ($(".main-top-slide").length > 0) {
        mainTopSwiper.autoplay.stop();
    }
    
    //동영상일 경우 자동재생
    if (dataType == "video") {
        var adVideoObj = $("#play-layer").find(".ad-video-play-area");
        
        if ($(adVideoObj).length > 0) {
            var videoObj = $(adVideoObj).find(".ad-video-play").get(0);
            
            if ($(videoObj).length > 0) {
                videoObj.play();
                $(adVideoObj).addClass("play");
            }
        }
    }
    
    //동영상 이벤트
    if ($(".ad-video-play-area").length > 0) {
        $(".ad-video-play-area").each(function() {
            var videoObj = $(this).find(".ad-video-play").get(0);
            
            //동영상 재생시
            videoObj.addEventListener('play', function() {
                $(this).closest(".ad-video-play-area").addClass("play");
            });
            
            //동영상 중단시
            videoObj.addEventListener('pause', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
            
            //동영상 종료시
            videoObj.addEventListener('ended', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
        });
    }
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//제작정보 제작비창 열기
function openProductionCostLayer(obj) {
    $("#production-cost-layer").addClass("on");
    $("#production-cost-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//제작정보 BGM창 열기
function openBgmLayer(obj) {
    $("#bgm-layer").addClass("on");
    $("#bgm-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//제작정보 수상이력창 열기
function openAwardLayer(obj) {
    $("#award-layer").addClass("on");
    $("#award-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//20220907 수정부분 start
//AD상세창 열기
function openAdDetailLayer(obj) {
    $("#ad-detail-layer").addClass("on");
    $("#ad-detail-layer").stop(true,true).slideDown(300);
    
    //20220921 수정부분 start
    //동영상 이벤트
    if ($(".ad-video-play-area").length > 0) {
        $(".ad-video-play-area").each(function() {
            var videoObj = $(this).find(".ad-video-play").get(0);
            
            //동영상 재생시
            videoObj.addEventListener('play', function() {
                $(this).closest(".ad-video-play-area").addClass("play");
            });
            
            //동영상 중단시
            videoObj.addEventListener('pause', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
            
            //동영상 종료시
            videoObj.addEventListener('ended', function() {
                $(this).closest(".ad-video-play-area").removeClass("play");
            });
        });
    }
    //20220921 수정부분 end
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//심사평가 결과상세창 열기
function openEvaluationResultLayer(obj) {
    $("#evaluation-result-layer").addClass("on");
    $("#evaluation-result-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220907 수정부분 end

//20220914 수정부분 start
//순서설정창 열기
function openAdOrderLayer(obj) {
    $("#ad-order-layer").addClass("on");
    $("#ad-order-layer").stop(true,true).slideDown(300);
    
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
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220914 수정부분 end

//20220915 수정부분 start
//심사평가 관리현황창 열기
function openEvaluationConditionLayer(obj) {
    $("#evaluation-condition-layer").addClass("on");
    $("#evaluation-condition-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//심사평가 AD등록창 열기
function openEvaluationAdLayer(obj) {
    $("#evaluation-ad-layer").addClass("on");
    $("#evaluation-ad-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220915 수정부분 end

//20220921 수정부분 start
//AD 라이브러리 제작정보 연동창 열기
function openAdCreditsLayer(obj) {
    $("#ad-credits-layer").addClass("on");
    $("#ad-credits-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//AD 라이브러리 인사검색 연동창 열기
function openAdPersonnelLayer(obj) {
    $("#ad-personnel-layer").addClass("on");
    $("#ad-personnel-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220921 수정부분 end

//20221007 수정부분 start
//심사평가 결과 다운로드창 열기
function openEvaluationDownloadLayer(obj) {
    $("#evaluation-download-layer").addClass("on");
    $("#evaluation-download-layer").stop(true,true).slideDown(300);
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20221007 수정부분 end

//레이어창 닫기
function closeLayer(obj) {
    var layerId = $(obj).closest(".l-area").attr("id");
    
    $(obj).closest(".l-area").removeClass("on");
    $(obj).closest(".l-area").stop(true,true).slideUp(300, function() {
        if (layerId == "play-layer") {
            //메인 상단 배너 영상 슬라이드 재생
            if ($(".main-top-slide").length > 0) {
                mainTopSwiper.autoplay.start();
            }
        }
    });
    
    if ($(".l-area.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}
