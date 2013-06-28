var feedWin = function() {  
	Titanium.include('loading.js');
	var parameter = require('parameter');	
	var pageHome = 0;
	var win = Titanium.UI.createWindow({
		title : parameter.NAME_PAGE,
		backgroundColor : '#fff'
	});
	var view = Titanium.UI.createView({
   		top: '0dp',
   		left: '0dp',
   		width:'24%',
   		height:'30dp',
   		backgroundColor: '#f5f5f5'
	});	
	var view1 = Titanium.UI.createView({
   		top: '0dp',
   		left: '25%',
   		width:'24%',   
   		height:'30dp',
   		backgroundColor: '#f5f5f5'		
	});	
	var view2 = Titanium.UI.createView({
   		top: '0dp',
   		width:'24%',
   		left: '50%',
   		height:'30dp',
   		backgroundColor: '#f5f5f5'
	});
	
	var view3 = Titanium.UI.createView({
   		top: '0dp',
   		left: '75%',
   		width:'24%',   
   		height:'30dp',
   		backgroundColor: '#f5f5f5'		
	});
	
	var loading = loadingIndicator();
	win.add(loading);
	// load data
	
	var table = Ti.UI.createTableView({
		top: '35dp',
		separatorColor: "#fff",
	});
	var table = getDataFeed(loading,parameter,table,pageHome,pageHome);
	var style;

	var valueLabel = Ti.UI.createLabel({color:'#000000', text:"Search", font:{ fontWeight:'bold'}, left:'10dp',
	});
	var valueLabel1 = Ti.UI.createLabel({color:'#000000', text:"Upcoming", font:{ fontWeight:'bold'}, left:'10dp',
	});
	var valueLabel2 = Ti.UI.createLabel({color:'#000000', text:"Live", font:{ fontWeight:'bold'}, left:'10dp',
	});
	var valueLabel3 = Ti.UI.createLabel({color:'#000000', text:"Campaigns", font:{ fontWeight:'bold'}, left:'10dp',
	});	
	view.add(valueLabel);
	view1.add(valueLabel1);
	view2.add(valueLabel2);
	view3.add(valueLabel3);
	win.add(view);	
	win.add(view1);
	win.add(view2);	
	win.add(view3);
	win.add(table);
	return win;	
}

function getDataFeed(loading,parameter,table,offsetHome, pageHome)
{
	
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = parameter.DOMAIN + parameter.URL_FEED;
	client.open('POST',url);
	client.ondatastream = function(e){
     	loading.show(); 
	};
	
	client.onload = function(){		
		var button = Ti.UI.createButton({
					title: 'View more..',
					width: '120dp',					
				});
		var buttonBack = Ti.UI.createButton({
					title: 'Back Top',
					width: '120dp',					
				});
		var json = this.responseText;
		var responses = JSON.parse(json);
		table.setData([]);
		var band = true;
		for (var i=0; i < responses.length; i++) {			
			 
			 if (responses[i].title == 'more') 
			 {
			 	var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });			 	
				row.add(button); 
				band = false;
			 } else {
			 	
			 	var link = responses[i].id;
			 	var labelEnd = responses[i].confirmed;
			 	if(responses[i].video_id > 0)
			 	{
			 		link = responses[i].video_id;
			 		labelEnd = responses[i].watching;
			 	}
			 	var row = Ti.UI.createTableViewRow({
				 	height: '100dp',
				 	touchEnabled: true,
				 	rowIndex:i,
				 	link: link,
				 	hasChild: true,
			 	});
			 	
			 	var nameLabel = Ti.UI.createLabel({
	            text:responses[i].title,
	            font:{
	                fontSize:'14dp',
	            	fontWeight:'bold',
	    	        	},
		        height:'auto',
		        left:'110dp',
		        top:'5dp',
		        color: "#6cb1d5",
		        link: link,
		        });
		        
		        var userLabel = Ti.UI.createLabel({
		        text: responses[i].name,
		        font:{
		            fontSize:'12dp',
		            fontWeight:'bold',
		        },
		        height:'auto',
		        left:'110dp',
		        top:'40dp',
		        color:'#717777',
		        touchEnabled:false,
		        link: link,
		        });
		        
	        	var dateLabel = Ti.UI.createLabel({
		        text: responses[i].startdate,
		        font:{
		            fontSize:'12dp',
		        },
		        height:'auto',
		        left:'110dp',
		        top:'60dp',
		        color:'#717777',
		        touchEnabled:false,
		        link: link,
		        });
		        var imageLink = parameter.DOMAIN + parameter.IMAGE_EVENT_DEFAULT;
		        if(responses[i].video_thumb != null)
		        {
		        	imageLink = responses[i].video_thumb;
		        } else {
		        	if(responses[i].thumb != null)
		        	{
		        		imageLink = parameter.DOMAIN + responses[i].thumb;
		        	}
		        }
	        	var image = Ti.UI.createImageView({
	        		image: imageLink,
	        		width: '98dp',
	        		height: '80dp',
	        		left: '5dp',
	        		top: '10dp',
	        		link: link,
	        	});
	        	
	            var guestLabel = Ti.UI.createLabel({
	            text: labelEnd,
	            font:{
	                fontSize:'12dp',
	    	        	},
		        height:'auto',
		        left:'130dp',
		        bottom: '5dp',
		        color: "#6cb1d5",
		        link: link,
		        });
		        
		        var imageGuest = Ti.UI.createImageView({
	        		image: 'images/guest.png',
	        		left:'110dp',
		        	bottom: '5dp',
		        	width: '17dp',
	        		height: '17dp',
	        		link: link,
	        	});
	        	
	        	row.add(image);
	        	row.add(imageGuest);
		        row.add(nameLabel);
		        row.add(userLabel); 
		        row.add(dateLabel);  		        
		        row.add(guestLabel); 
			 }
			      
	        tableData.push(row);
		};
		
		if ((band) && ((offsetHome > 0)||(i == 0)))
		{
			var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });			 	
			
			if (offsetHome > 0)
			{
				row.add(buttonBack); 
			} else {
				var text = Ti.UI.createLabel({
			        text: 'No Find Videos',
			        font:{
			             fontSize:'20dp',
			    	     },
				        
				   color: "#717777",
				      });
				row.add(text);	
			}
				
			tableData.push(row);
		}
		table.setData(tableData);
		
	    button.addEventListener('click', function(){
			pageHome = pageHome + 1;
			var offset = pageHome * parameter.LIMIT;
			table = getDataFeed(loading,parameter,table,offset, pageHome);			
		});

		buttonBack.addEventListener('click', function(){
			pageHome = 0;			
			table = getDataFeed(loading,parameter,table,pageHome, pageHome);			
		}); 
		loading.hide();	
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        offset : offsetHome,
        limit: parameter.LIMIT,
        top: parameter.TOP_LIMIT,
    };
    table.addEventListener('click', function(e){
		alert(e.source.link);
	});
	client.send(params);	
	return table;
}
