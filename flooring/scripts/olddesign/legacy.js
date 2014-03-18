
/***************** legacy code *************************/ 

$(document).ready(function () {
		/*code*/
		
		$('.main-navigation > ul > li').hover(
			function () { 
				$(this).find('ul').stop(true, true).slideDown('fast');
				$(this).addClass('hovr');
			},
			function() {
				$(this).find('ul').stop(true, true).slideUp('fast');
				$(this).removeClass('hovr');
			}	
		);

		
		//var hacc = $('.mainwrappbig .jscrollpanecontainer  div.accelerate_body').innerHeight();
		//$('.mainwrappbig .jscrollpanecontainer  div.accelerate_body').css('height',hacc + 'px');
		
		$('#member_login .usagerating').hover(function() {
		//$('body').append('<div class="ui-widget-overlay" style="position:fixed;"></div>');
		$('.usrateinfo').appendTo('body').show();
	
		});
		$('.nodel').live("click", function(){ $('.usrateinfo').hide(); $('.ui-widget-overlay').remove();});
		$('#sc_nav ul li.apps a').click(function() {
			$(this).parent().toggleClass('show');
			
		});
		
		$('#sc_nav ul li.sust a').click(function() {
			$(this).parent().toggleClass('show');
			$('#sc_nav ul li.altdes').removeClass('show');
		});
		
		$('#sc_nav ul li.altdes a').click(function() {
			$(this).parent().toggleClass('show');
			$('#sc_nav ul li.sust').removeClass('show');
		});
		
		$('body.sust #sc_nav ul > li.sust').addClass('show');
		
		$('.sc_alt_designs #sc_nav ul > li.altdes').addClass('show');
		$('.sc_alt_designs #sc_nav ul li.altdes a').removeAttr('href').css('cursor','pointer');
		
		
		$('.main-navigation ul li ul li a.submit').click(function() {
			if($(this).parent().find('input.postcode').attr("value") == 'Enter Postcode')  
    {  
        alert("Enter Postcode!"); 
$(this).parent().find('input.postcode').focus();		
        return false;  
    }
			else {
		$(this).parent().submit();
				}	
		});
		$('.main-navigation ul li ul li a.close').click(function () {
		
			$(this).parent().parent().hide('fast');
		
		});
		$('.first-time-user h2 a').hover(function () {
			$(this).find('img.gr').animate({opacity:"show"}, 200);
		},
		function () {
			$(this).find('img.gr').animate({opacity:"hide"}, 200);
		});
		$('.guidance a').hover(function () {
			$('.guidance .disclaimer').fadeIn('fast');
		},
		function() {
			$('.guidance .disclaimer').fadeOut('fast');
		});
		
		$('.main-navigation ul li:first').addClass('first-child');
$('.dtc ul li').prepend('<span>&#149;</span>');

$('#files_layer table tr:even').addClass('treven');

		/*Begin animation slider*/
		if (($('.js-slide1').size())>0) {
				$('.light-black-block').animate({height:"show"}, 500, function () {
					$('#slider-welcome .contact').animate({opacity:"show"}, 500);
					$('.icon-people-menu a').animate({opacity:"show"}, 500);
					reset_people();
					$('.light-black-block img').animate({opacity:"show"}, 500, function () {
						$('.blue-block').animate({height:"show"}, 500, function () {
							$('.welcome-text').animate({opacity:"show"}, 500);
						});
					});
				});
		}
		if (($('.js-slide2').size())>0) {
			$('.light-black-block').animate({height:"show"}, 900, function () {
				$('#slider-welcome .contact').animate({opacity:"show"}, 500);
				 
				$('.light-black-block #swiffycontainer').animate({height:"show"}, 500, function () {
					$('#resurse-navigation, .first-time-user, .form-post-code').animate({opacity:"show"}, 500, function(){
						$('.icon-new-img').animate({opacity:"show"}, 400);
					});
					
					$('.transparent-block').animate({height:"show"}, 10, function () {
						$('.welcome-text').animate({opacity:"show"}, 500);
						$('.icon-new-img').animate({opacity:"show"}, 400);
						
					});
				});
			});
		}
		
			
							 
				$('#slider-tech .light-black-block').animate({height:"show"}, 500, function () {
					$('.slider-welcome-img').animate({opacity:"show"}, 500);
					 
					$('.transparent-block').animate({height:"show"}, 10, function () {
						$('.welcome-text').animate({opacity:"show"}, 500);
						
						
					});
				
			});
		
		if (($('.js-slide3').size())>0) {
			$('.light-black-block').animate({height:"show"}, 900, function () {
				$('#slider-welcome .contact').animate({opacity:"show"}, 500);
				
				$('.light-black-block #swiffycontainer').animate({opacity:"show"}, 500, function () {
					$('#resurse-navigation, .first-time-user, .form-post-code').animate({opacity:"show"}, 500);
					$('#f-navigation ul').animate({opacity:"show"}, 900);
					$('.transparent-block').animate({height:"show"}, 10, function () {
						$('.welcome-text').animate({opacity:"show"}, 500);
						$('.icon-new-img').animate({opacity:"show"}, 400);
						
					});
				});
			});
		}
$('#f-navigation ul').animate({opacity:"show"}, 900);

$('.cadassistmain, .thredhardiecontnt').hover(function() {
	$(this).addClass('cahover');
},
function() {
	$(this).removeClass('cahover');
});
$('.caddetails  a.close').click(function() {
	$(this).parent().fadeOut();
});
$('.caddetails .level2  a.close').click(function() {
	$('.cadterms').show();
});

$('.caddetails .level1 > ul > li > a').click(function() {
	$(this).next('.level2').fadeIn();
	$(this).parent().siblings('.caddetails .level1 > ul > li').find('.level2').fadeOut();
	$('.cadterms').hide();
});

$('.cadassistmain').click(function() {
	$('.level1').fadeIn();
}); 

$('.advisorlayers > div').hide();

$('.prodadv area#advisorlayers').click(function() {
	$('.advisorlayers > div').hide();
	$('img.advisorclose').hide();
	});
	
	
$('.mainimg area').each(function() {
	var vfre = $(this).attr('id');

	$(this).hover(function() {
		$('.highlightingimgs img.' + vfre).show();
	}, function() {
		$('.highlightingimgs img.' + vfre).hide();
	});

	$(this).click(function() {
		$('.advisorlayers > div').hide();
		$('.advisorlayers > div.' + vfre).show();
		$('.advisorlayers').css('top','20px');
		$('img.advisorclose').show();
	});
});

$('.sc_main map#sc_bushfire_mainimg area').each(function() {

	var sc_bush = $(this).attr('id')
	$(this).hover(function() {
	$('.sc_bushfire_highlights img.' + sc_bush).show();
	//$('.sc_bushfire_highlights img.' + sc_bush).parent().css('z-index','12');

},function() {
	$('.sc_bushfire_highlights img.' + sc_bush).hide();
}); 
	$(this).click(function() {
	$('.sc_bush_layers > div').hide();
	$('.sc_bush_layers > div.' + sc_bush).slideDown();
	//$('.sc_bush_layers').css('top','20px');
	//$('img.sc_bush_close').show();
});
});
$('.sc_main map#solution area').each(function() {

	var sc_solut = $(this).attr('id')
	$(this).click(function() {
	$('.solutt > div').hide();
	$('.solutt div.' + sc_solut).show();

});
});
$('a.sc_bush_close').click(function() {
	$(this).parent().hide();
	$(this).parent().find('div.sc_bush_lsub').hide();
	$('.solutt div').hide();
});
$('a.sc_bush_lsub').click(function() {
	$(this).next('div.sc_bush_lsub').show();
});

$('.extcladicons h3 a').each(function() {
	var extcllink = $(this).attr('id');

	if ( $(this).parents('.int').hasClass('internallining') )			var e = 'internallining';
	else if ( $(this).parents('.int').hasClass('eavesnsoffits') )		var e = 'eavesnsoffits';
	else																var e = 'externalcladding';

	$(this).click(function(){
		$('.' + e + '2').show();
		$('.' + e + '2 > div').hide();
		$('.' + e + '2 div.' + extcllink).show();
		$('.' + e).hide();	
		$('.advisorback').attr('data-parent',e).show();
	});
});

$('.advisorback').click(function(){
	$('.advisorlayers > div').hide();
	$('.advisorlayers > .' + $(this).attr('data-parent')).show();
	$(this).hide();
});


$('a.moreinfox').click(function() {
	var e = $(this).attr('id');

	$('.eavesnsoffits2 > div').hide();
	$('.eavesnsoffits2 > .' + e).show();
});

$('a.sc_bush_solutt_close').click(function() {
	$(this).parent().hide();
});
$('.advisorlayer').hide();

		/*End animation slider*/

		/*BEGIN MAIN-MENU*/
		$(".distributor a").hover(function(){
			$(".icon-people-menu .wrp-img, .icon-people-menu img").stop();
			$('.distributor .wrp-img').animate({left:'-73px',width:'330px'},500);
			$('.distributor img').animate({width:'330px', marginTop:'6px'},500);
			$('.designer .wrp-img').animate({left:'25px', width:'264px'},500);
			$('.designer img').animate({width:'264px', marginTop:'12px'},500);
			$('.builder .wrp-img').animate({left:'-22px'},500);
			$('.builder img').animate({marginTop:'37px'},500);

		},function(){reset_people()}  );
		$(".designer a").hover(function(){
			$(".icon-people-menu .wrp-img, .icon-people-menu img").stop();
			$('.distributor .wrp-img').animate({left:'-58px',width:'306px'},500);
			$('.distributor img').animate({width:'306px', marginTop:'34px'},500);
			$('.designer .wrp-img').animate({left:'23px', width:'288px'},500);
			$('.designer img').animate({width:'288px', marginTop:'4px'},500);
			$('.builder .wrp-img').animate({left:'-12px', width:'217px'},500);
			$('.builder img').animate({width:'217px', marginTop:'44px'},500);


		},function(){reset_people()}  );
		$(".builder a").hover(function(){
			$(".icon-people-menu .wrp-img, .icon-people-menu img").stop();
			$('.distributor .wrp-img').animate({left:'-58px',width:'300px'},500);
			$('.distributor img').animate({width:'300px', marginTop:'42px'},500);
			$('.designer .wrp-img').animate({left:'30px',width:'266px'},500);
			$('.designer img').animate({width:'266px', marginTop:'20px'},500);
			$('.builder .wrp-img').animate({left:'-26px',width:'247px'},500);
			$('.builder img').animate({width:'247px', marginTop:'12px'},500);
		},function(){reset_people()} );

		function reset_people() {
			$(".icon-people-menu .wrp-img, .icon-people-menu img").stop();
			$('.distributor .wrp-img').animate({left:'-45px',width:'300px'},500);
			$('.distributor img').animate({width:'300px', marginTop:'28px'},500);
			$('.designer .wrp-img').animate({left:'54px',width:'251px'},500);
			$('.designer img').animate({width:'251px', marginTop:'20px'},500);
			$('.builder .wrp-img').animate({left:'-14px',width:'224px'},500);
			$('.builder img').animate({width:'224px', marginTop:'37px'},500);
		}

		/*END MAIN-MENU*/

		/*f-navigation*/
		$('#f-navigation li').each(function(){
		$(this).hover(function(){
			$(this).find('.f-items-top').animate({marginLeft:'-40px',width:'80px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'-10px',width:'80px',marginLeft:'-40px'},100);
		},
		function () {
			$(this).find(".f-items-top, .f-items-bottom").stop();
			$(this).find('.f-items-top').animate({marginLeft:'-37px',width:'75px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'0px',width:'75px',marginLeft:'-37px'},100);

		});
		});
		
		/*f-navigation*/
		$('#f-navigation td div').each(function(){
		$(this).hover(function(){
			$(this).find('.f-items-top').animate({marginLeft:'-40px',width:'80px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'-10px',width:'80px',marginLeft:'-40px'},100);
		},
		function () {
			$(this).find(".f-items-top, .f-items-bottom").stop();
			$(this).find('.f-items-top').animate({marginLeft:'-37px',width:'75px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'0px',width:'75px',marginLeft:'-37px'},100);

		});
		});

		/*End f-navigation*/

		// $('.techlit-det > div').each( function() {
			// var h = $(this).height() / 2;
			// $(this).css('margin-top','-' + h + 'px');
		// });
		
		$('.techlit-choose .desman a').each( function() {
			var a = $(this).attr('class');
			$(this).click( function() {
				
				$('.techlit-det > div#' + a + '').fadeIn('fast').siblings('.techlit-det > div').fadeOut('fast');
				
			});
		
		});
$('.techlit-choose .prodman a').each( function() {
			var a = $(this).attr('class');
			$(this).click( function() {
				
				$('.techlit-det > div#' + a + '').fadeIn('fast').siblings('.techlit-det > div').fadeOut('fast');
			
			});
		
		});
});
/*End code*/



function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
	obj.visibility=v; }  
	}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}