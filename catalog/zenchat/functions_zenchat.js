function zen_chat(){var t,e,a=$("<audio></audio>");get_chat_status(),get_unique_id("form_1"),get_unique_id("form_2"),check_audio()&&a.attr("id","audio").append('<source src="catalog/zenchat/musichetta/alert_1.ogg" type="audio/ogg">').append('<source src="catalog/zenchat/musichetta/alert_1.mp3" type="audio/mpeg">').append('<source src="catalog/zenchat/musichetta/alert_1.wav" type="audio/wav">').appendTo("body"),$(document).ajaxStart(function(){$("#client_content .loading").show()}).ajaxStop(function(){$("#client_content .loading").fadeOut()}),$("body").on("keyup","#message",function(){if($(this).parents("form").attr("id")==form_2){clearTimeout(t);var e;e=""==$(this).val()?0:1,t=setTimeout(function(){data="azione=visitor_typing&visitor_typing="+e,$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1})},200)}}),$("body").on("keydown","#message",function(t){13==t.keyCode&&(t.preventDefault(),$(this).parents("form").attr("id")==form_2&&send_message($(this).parents("form")))}),$("body").on("click","#send_message",function(t){t.preventDefault(),$(this).parents("form").attr("id")==form_2&&send_message($(this).parents("form"))}),$("body").on("click","#client_testata",function(){data="azione=visitor_contact_operator",$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1,success:function(t){t.success?$("#client_content").is(":hidden")?$("#client_content").show(0,function(){$("#client_content #"+form_1).hide(0,function(){$("#client_content #"+form_2).show(0,function(){get_chat(),e=setInterval(get_chat,2e3),$("#client_testata .pull_right").empty().html("&#x25BC;"),$(this).html(t.content),check_audio()||$(".musichetta").remove()})})}):$("#client_content").hide(0,function(){$("#client_testata .pull_right").empty().html("&#x25B2;")}):$("#client_content").is(":hidden")?$("#client_content").slideToggle(400,function(){$("#client_testata .pull_right").empty().html("&#x25BC;"),$("#client_content #"+form_2).hide(0,function(){$("#client_content #"+form_1).fadeIn(300,function(){}).html(t.content)})}):$("#client_content").slideToggle(400,function(){$("#client_content #"+form_1).hide().empty(),$("#client_testata .pull_right").empty().html("&#x25B2;")})}})}),$("body").on("click","#start_chat",function(){var t=!0,a=$(".zen_username"),o=$(".zen_email"),n=$(".zen_nachricht"),s=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return 0===$.trim(a.val()).length?(t=!1,a.addClass("field_vuoto").prev("label").addClass("label_vuoto")):a.removeClass("field_vuoto").prev("label").removeClass("label_vuoto"),0!==$.trim(o.val()).length&&s.test(o.val())?o.removeClass("field_vuoto").prev("label").removeClass("label_vuoto"):(t=!1,o.addClass("field_vuoto").prev("label").addClass("label_vuoto")),0===$.trim(n.val()).length?(t=!1,n.addClass("field_vuoto").prev("label").addClass("label_vuoto")):n.removeClass("field_vuoto").prev("label").removeClass("label_vuoto"),0==t?!1:(data=$(this).parents("form").serialize()+"&azione=visitor_start_chat",void $.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,success:function(t){t.success?$("#client_content #"+form_1).fadeOut(function(){$("#client_content #"+form_2).fadeIn(function(){get_chat_status(),get_chat(),e=setInterval(get_chat,2e3),$(this).html(t.content),check_audio()||$(".musichetta").remove()})}).empty():$("#client_content #"+form_1).fadeOut().empty().fadeIn("slow",function(){get_chat_status(),$(this).html(t.content)})}}))}),$("body").on("click","#stop_chat",function(t){t.preventDefault(),data="azione=visitor_stop_chat",$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,success:function(){$("#client_content").slideUp("slow",function(){get_chat_status(),$("#client_content #"+form_2).empty(),clearInterval(e)})}})}),$("body").on("click","a.musichetta",function(t){t.preventDefault(),$("a.musichetta i").hasClass("fa-volume-up")?($("a.musichetta i").removeClass("fa-volume-up").addClass("fa-volume-off"),$("#audio").prop("muted",!0)):($("a.musichetta i").removeClass("fa-volume-off").addClass("fa-volume-up"),$("#audio").prop("muted",!1))})}function get_chat_status(){var t=$.cookie("zenchat");"undefined"!=typeof t&&"hidden"==t&&$("#client_chat").hide(),data="azione=visitor_get_chat_status",$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1,success:function(t){t.success?($.cookie("zenchat","visible",{expires:30}),$("#client_chat").fadeIn(300),$("#client_testata .pull_left").html(t.content)):($.cookie("zenchat","hidden",{expires:30}),$("#client_chat").fadeOut(300))}})}function send_message(t){var e=$("#send_message");e.on("click",function(){$("#message").removeClass("field_vuoto"),0===$("#message").val().length&&$("#message").addClass("field_vuoto")}),0!==$("#message").val().length&&(e.prop("disabled",!1),data=t.serialize()+"&azione=visitor_send_message",$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1,success:function(t){t.success?(get_chat(),$("#"+form_2)[0].reset()):alert(t.content)}}))}function get_chat(){data="azione=visitor_get_chat",$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1,success:function(t){t.success?($(".message_content").html(t.content),t.new_message&&($("#audio").trigger("play"),$(".message_content").scrollTop($(".message_content")[0].scrollHeight)),t.operator_typing?$(".operator_typing span").show():$(".operator_typing span").hide(),t.queue?(get_chat_status(),$(".queue span").hide()):$(".queue span").show()):location.reload()}})}function get_unique_id(t){data="azione=get_unique_id&prefix="+t,$.ajax({type:"POST",url:"catalog/zenchat/process.php",dataType:"json",data:data,global:!1,success:function(e){e.success&&unique_id(t,e.unique_id)}})}function unique_id(t,e){"form_1"==t?form_1=e:(t="form_2")&&(form_2=e)}function check_audio(){var t=$("<audio></audio>");return t.get(0).canPlayType?!0:!1}var form_1,form_2,relative_url;$("#send_message").prop("disabled",!0);