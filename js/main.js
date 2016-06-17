
///////////////////// pgturn plugin s /////////////////////
$(function pgturn() {

	//宣告與設定變數
	var $pgturn = $(this),
		$indicator = $pgturn.find(".pgt_indicator"),
		$pagebox = $pgturn.find(".pgt_container .pgt_pgbox"),
		$page = $pgturn.find(".pgt_container .pgt_page"),
		$pginner = $page.find(".pgt_pginner"),
		$navbtn = $pgturn.find(".pgt_navbtn"),
		$pgtctn = $pgturn.find(".pgt_container"),
		indicator_html = "",
		currentindex = 0,
		count = $page.length;

	// 設定指標
	$(document).ready(function() {
		// 為 HTML 新增指標
		for( i = 0; i < count; i++ ) {
			indicator_html += "<a href='#'></a>";
		}
		$indicator.html(indicator_html);
		// Click 指標，移到相對應頁面
		$indicator.on("click", "a", function(event) {
			event.preventDefault();
			currentindex = $indicator.find("a").index(this);
			gotopage();
		});
	});

	// 設定 $page 初始位置
	$(function pagePosition() {
		$page.each(function(i) {
			$(this).css({ left: 100 * i + "%" });
		});
	});

	// 移動到指定的 $page，同時改變指標樣式
	function gotopage() {
		setScroller();
		$pgtctn.animate({scrollTop: 0}, 300, "easeInOutQuart");
		$pagebox.stop(true).animate({ left: -100 * currentindex + "%" }, 900);
		$indicator.find("a").css({ backgroundImage: 'url("images/dot.png")' });
		$indicator.find("a").eq(currentindex).css({ backgroundImage: 'url("images/dot_active.png")' });
	}

	// 點右/左鍵：下/上一頁
	$navbtn.on("click", "a", function(event) {
		event.preventDefault();
		if( $(this).hasClass("pgt_nextpg") ) {
			currentindex = (currentindex + 1) % count;
			gotopage();
		} else {
			currentindex = currentindex - 1;
			if(currentindex < 0) {
				currentindex = count - 1;
			}
			gotopage();
		}
	});

	// 設定 pgbox 高度
	function setScroller() {
		var pageHeight = $pginner.eq(currentindex).height();
		console.log(currentindex + ": " + pageHeight);
		if( $(window).height() < pageHeight ){
			$page.eq(currentindex).css("overflow-y", "scroll");
		} else {
			$page.eq(currentindex).css("overflow-y", "hidden");
		}
	}

	// 開啟畫面設定
	$(document).ready(function() {
		gotopage();
	});
	
});
///////////////////// pgturn plugin e /////////////////////





