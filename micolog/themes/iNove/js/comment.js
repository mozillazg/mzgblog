    function reloadCheckImage() {
        document.images["image"].src = "/checkimg/?check=" + Math.random();
    }
    commentuser=$.cookie('comment_user');
       if (commentuser)
       {
         //[user,email,url]=commentuser.split('#@#');
         var tuple=commentuser.split('#@#');
        var user,email,url;
        user=tuple[0];
        email=tuple[1];
        url=tuple[2];
         $('#author').val(user);
         $('#email').val(email);
         $('#url').val(url);
       }

   /**
    * @ 回复
    * @param authorId        评论者 ID
    * @param commentId        评论 ID
    * @param commentBox    评论输入框 ID
    */
    function reply(authorId, commentId, commentBox) {
        // 评论者名字
       // var author = document.getElementById(authorId).innerHTML;
       var author = authorId;
        // 拼接成 '@评论者名字' 链接
        var insertStr = '<a href="#' + commentId + '">@' + author + '</a> \n';

        // 追加到评论输入框
        appendReply(insertStr, commentBox);
    }
    
    
    function quote(authorId, commentId, commentBodyId, commentBox) {
        //var author = MGJS.$(authorId).innerHTML;
        var author = authorId;
        var comment = document.getElementById(commentBodyId).innerHTML;

        var insertStr = '<blockquote cite="#' + commentBodyId + '">';
        insertStr += '<strong><a href="#' + commentId + '">' + author + '</a> :</strong><br />';
        insertStr += comment.replace(/\t|\n/g, "");
        insertStr += '</blockquote>';

        insertQuote(insertStr, commentBox);
    }
    
    /**
     * 追加到输入框
     * @param insertStr        追加字符串
     * @param commentBox    评论输入框 ID
     */
    function appendReply(insertStr, commentBox) {
        // 如果指定的输入框存在, 将它设为目标区域
        if(document.getElementById(commentBox) && document.getElementById(commentBox).type == 'textarea') {
            field = document.getElementById(commentBox);
        // 否则提示不能追加, 并退出操作
        } else {
            alert("The comment box does not exist!");
            return false;
        }
     
        // 如果一次评论中重复回复, 提示并退出操作
        if (field.value.indexOf(insertStr) > -1) {
            alert("You've already appended this reply!");
            return false;
        }
     
        // 如果输入框内无内容 (忽略空格, 跳格和换行), 将输入框内容设置为需要追加的字符串
        if (field.value.replace(/\s|\t|\n/g, "") == '') {
            field.value = insertStr;
        // 否则清除多余换行, 并将字符串追加到输入框中
        } else {
            field.value = field.value.replace(/[\n]*$/g, "") + '\n\n' + insertStr;
        }
     
        // 聚焦评论输入框
        field.focus();
    }
    
    
    function insertQuote(insertStr, commentBox) {
        if(document.getElementById(commentBox) && document.getElementById(commentBox).type == 'textarea') {
            field = document.getElementById(commentBox);

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
            field.value = field.value.substring(0, startPos)
                        + insertStr
                        + field.value.substring(endPos, field.value.length);
            cursorPos += insertStr.length;
            field.focus();
            field.selectionStart = cursorPos;
            field.selectionEnd = cursorPos;

        } else {
            field.value += insertStr;
            field.focus();
        }
    }
    
  $('#commentform').submit(function(){
         var form = this;
           if (form.author)
             {

                   if (!form.author.value)
                   {
                    alert('Please input your name.');
                    form.author.focus();
                    return false;
                   }
                   if (!form.email.value)
                   {
                       alert('Please input the email address.');
                       form.email.focus();
                       return false;
                   }
           }

               if (!form.comment.value)
               {
                   alert('Please leave some reply message.');
                   form.comment.focus();
                   return false;
               }

               return true;
  });