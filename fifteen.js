$(document).ready(function()
{
		//call on sub-elements of the main element with the Id: puzzlearea
		var puzArea = $("#puzzlearea");
		var puzArea_Kids = $(puzArea).children("div");
		puzArea_Kids.addClass("puzzlepiece");		
		
		//Help in positioning divs
		var y = parseInt($(puzArea).css("top"));
		var x = parseInt($(puzArea).css("left"));
		
		//Position the image on the backgroud of divs
		var backX = -400;
		var backY = 0;
		
		//Blank spaces position
		var blankX = 300;
		var blankY = 300;
		
		var puzPiece = document.getElementsByClassName("puzzlepiece");
		
		for(var i = 0; i < puzPiece.length; i++)
		{
			$(puzPiece[i]).css("top", y);
			$(puzPiece[i]).css("left", x);
			$(puzPiece[i]).css("background-position", backX+"px"+" "+backY+"px");
			
			backX -= 100;
			
			x += 100;
			
			if((i+1) % 4 == 0 && i != 0)
			{
				y += 100;
				backY -= 100;
				x = parseInt($(puzArea).css("left"));
			}
			
			
			
			//highlight pieces if hovered
			$(puzPiece[i]).on("mouseover", function()
			{
				if(check(this))
				{
					$(this).addClass("movablepiece");
				}
			});
		
			//If mouse moves dont move class
			$(puzPiece[i]).on("mouseleave", function()
			{
				$(this).removeClass("movablepiece");
			});
		
			//switches piece with blank spaces
			$(puzPiece[i]).on("click", function()
			{
				if(check(this))
				{
					changeTile(this);
				}
			});
			
			//validates for divs they are close to blank spaces
			var check = function(puzPiece)
			
			{
				if(parseInt($(puzPiece).css("top")) - blankY == -100 && parseInt($(puzPiece).css("left")) - blankX == 0)
				{
					return true;
				}
				else if(parseInt($(puzPiece).css("top")) - blankY == 100 && parseInt($(puzPiece).css("left")) - blankX == 0)
				{
					return true;
				}
				
				else if(parseInt($(puzPiece).css("left")) - blankX ==100 && parseInt($(puzPiece).css("top")) - blankY == 0)
				{
					return true;
				}
				else if(parseInt($(puzPiece).css("left")) - blankX == -100 && parseInt($(puzPiece).css("top")) - blankY == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			
			
			//function changeTile
			var changeTile = function(change)
			{
				var tempX = blankX;
				var tempY = blankY;
				
				blankX = parseInt($(change).css("top"));
				blankY = parseInt($(change).css("left"));
				
				//
				$(change).css("top", tempX);
				$(change).css("left", tempY);
			};
			
			var changePiece = function()
			{
				var arr = [];
				
				for(var i = 0; puzPiece.length; i++)
				{
					if(check(puzPiece[i]) == true)
					{
						arr.push(puzPiece[i]);
					}
				}
				
				swap = arr[Math.random() * puzPiece.length];
			
				changeTile(swap);
			};
			
			$("#shufflebutton").on("click", function()
			{
				
				t = Math.floor(Math.random() * 100);
				
				for(var i = 0; i < t; i++)
				{
					changePiece();
				}
			});	
		}
});

//dervaldally@gmail.com 