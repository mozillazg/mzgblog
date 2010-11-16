function switchTab(showPanels, hidePanels, activeTab, activeClass, fadeTab, fadeClass) {
	
	//看其原来方法，无非就是给他换个类名
	//用jQuery的方法，先把原类名删了，再增加一个新类名，搞定
	$("#"+activeTab).removeClass().addClass(activeClass);
	$("#"+fadeTab).removeClass().addClass(fadeClass);

	var panel, panelList;
	panelList = showPanels.split(',');
	for (var i = 0; i < panelList.length; i++) {
		var panel = panelList[i];
		//我感觉这个显示的效果会比display block更人性一些吧？
		$("#"+panel).fadeIn(250);
	}
	panelList = hidePanels.split(',');
	for (var i = 0; i < panelList.length; i++) {
		panel = panelList[i];
		//同样，隐藏的时候也用这个特效好了，我比较喜欢乱改
		$("#"+panel).fadeOut(250);
	}
}

function reply(authorId, commentId, commentBox) {
	//通过元素id，来取这个作者名
	//在jQuery中html()就相当于innerHtml
	var author = $('#'+authorId).html();
	//里面内容不变，正则学的真好啊。。
	var insertStr = '<a href="#' + commentId + '">@' + author.replace(/\t|\n|\r\n/g, "") + ' </a> \n';

	appendReply(insertStr, commentBox);
}

function appendReply(insertStr, commentBox) {
	//判断这个对象存在，并且它是textarea类型
	//就是下面的那个评论框
	if($("#"+commentBox) && $("#"+commentBox).attr('type') == 'textarea') {
		//借助私有变量field
		field = $("#"+commentBox);

	} else {
		//没有评论框，弹窗，告诉你丫的这个评论框居然不存在
		//敢晃点我就弹窗，哼
		alert("The comment box does not exist!");
		return false;
	}

	if (field.val().indexOf(insertStr) > -1) {
		//判断你要发的内容是否已经写一遍了，即你点了一个人两次回复
		alert("You've already appended this reply!");
		return false;
	}

	//还是正则，我不解释，不懂
	if (field.val().replace(/\s|\t|\n/g, "") == '') {
		field.val(insertStr);
	} else {
		//同样，是把内容换成什么什么乱七八糟的
		replay_val  = field.val().replace(/[\n]*$/g, "") + '\n\n' + insertStr;
		field.val(replay_val);
	}
	//这里没说的了，一定要使评论框获得焦点，嗯。
	field.focus();
}

function quote(authorId, commentId, commentBodyId, commentBox) {
	//同样，获取其作者innerhtml内容
	var author = $("#"+authorId).html();
	//同样，获取其innerhtml内容
	var comment = $("#"+commentBodyId).html();

	//加上了些blockquote 标签，给你引用的内容包起来
	var insertStr = '<blockquote cite="#' + commentBodyId + '">';
	insertStr += '\n<strong><a href="#' + commentId + '">' + author.replace(/\t|\n|\r\n/g, "") + '</a> :</strong>';
	insertStr += comment.replace(/\t/g, "");
	insertStr += '</blockquote>\n';

	insertQuote(insertStr, commentBox);
}

function insertQuote(insertStr, commentBox) {
	//同样，得到评论框，和上面评论的代码相同，不解释
	if($("#"+commentBox) && $("#"+commentBox).attr('type') == 'textarea') {
		field = $("#"+commentBox);

	} else {
		alert("The comment box does not exist!");
		return false;
	}

	if(document.selection) {
		field.focus();
		sel = document.selection.createRange();
		sel.text = insertStr;
		field.focus();

	} else if (field.selectionStart || field.selectionStart == '0') {
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		var cursorPos = startPos;
		//这里面仍然借助私有变量(临时变量)replay_value
		replay_value = field.val().substring(0, startPos)
					+ insertStr
					+ field.val().substring(endPos, field.value.length);
		//因为在这里我要给field也就是评论框赋值
		field.value(replay_value);
		cursorPos += insertStr.length;
		//获取焦点
		field.focus();
		field.selectionStart = cursorPos;
		field.selectionEnd = cursorPos;

	} else {
		//还是这个临时变量，重新赋值啊，哈
		replay_value = field.val();
		field.val(replay_value+insertStr);
		field.focus();
	}
}