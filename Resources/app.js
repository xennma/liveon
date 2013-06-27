Titanium.UI.setBackgroundColor('#fff');
Titanium.include('feed.js','campaigns.js','artists.js', 'calendar.js','login.js');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
 
// create base UI tabs and  windows

var iconFeed = 'KS_nav_ui.png';
var iconCampaigns = 'KS_nav_ui.png';
var iconArtists = 'KS_nav_ui.png';
var iconCalendar = 'KS_nav_ui.png';
var iconLogin = 'KS_nav_ui.png';

if(Ti.Platform.osname != 'android')
{
	iconFeed = Ti.UI.iPhone.SystemIcon.MOST_VIEWED;
	iconArtists = Ti.UI.iPhone.SystemIcon.FAVORITES;
	iconCampaigns = Ti.UI.iPhone.SystemIcon.HISTORY;
}

var feed = feedWin();
var tab1 = Titanium.UI.createTab({  
    title:'Feed',
    window: feed, 
    icon: iconFeed,
});

var campaigns = campaignsWin();
var tab2 = Titanium.UI.createTab({  
    title:'Campaigns',
    window: campaigns,
    icon: iconCampaigns,
});
 
var artists = artistsWin();
var tab3 = Titanium.UI.createTab({  
    title:'Artists',
    window: artists,
    icon: iconArtists,
}); 
 
  
var calendar = calendarWin();

var tab4 = Titanium.UI.createTab({  
    title:'Calendar',
    window: calendar,
    icon: iconCalendar,
}); 
 
var login = loginWin();

var tab5 = Titanium.UI.createTab({  
    title:'Login',
    window: login,
    icon: iconLogin,
});  
 
 
 
//  add tab
 
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  
tabGroup.addTab(tab5); 
// open tab group
tabGroup.open();