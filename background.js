var dateObject = 0;
var timeStart = 0;
var start = 0;
var lastUpdate = 0;
var useTime = 0;
var pageTitle = "test";
var socialTime = 0;
var productiveTime = 0;
var readingTime = 0;
var setSocial = 0;
var pages = {
	Social: [".tv", "facebook", "twitter", "instagram", "youtube", "reddit", "messenger","twitch","snapchat", "netflix", "imgur", "vimeo", "vsco", "tumblr", "crunchyroll", "pinterest", "flickr", "vine"],

		Productivity: [".edu","stackoverflow", "mail", "outlook", "docs", "wolframalpha","chegg", "onQ", "Queen's University","Western University", "University of Waterloo", "github", "udemy", "udacity", "codecademy", "coursera", "lynda", "Education", "linkedin", "slack", "yahoo", "hotmail", "office365"],

		Reading:["sciencedirect",".info", "researchgate", "scholar", "wikipedia", "science","academic","worldwidescience", "books","journal", "research", "audible", "khanacademy", "encyclopedia", "edX",".org",".gov",".gc"]
};
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		chrome.storage.sync.set({Social: socialTime});
		chrome.storage.sync.set({Productivity: productiveTime});
		chrome.storage.sync.set({Reading: readingTime});
	}
});
chrome.alarms.create('Update', {periodInMinutes: 1});
chrome.alarms.create('screenAlarm', {periodInMinutes: 2});
chrome.tabs.onUpdated.addListener(tabUpdated);
chrome.tabs.onRemoved.addListener(tabClosed);
chrome.tabs.onHighlighted.addListener(tabSwitch);
chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == 'Update'){
		chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(tabs){
			update();
		});
	}else if(alarm.name == 'socialAlarm'){
		window.alert("You have been on Social Media for 10 minutes! You should probably take a break");
		setSocial = 0;
		setSocialAlarm();
	}else if(alarm.name == 'screenAlarm'){
		window.alert("You have been browsing for an hour. You should take a break to rest your eyes");
	}
});

function update(){
	data = { name: pageTitle };
	saveTime(data);
	startTime();
}
function tabUpdated(tab){
	chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(tabs){
		dateObject = new Date();
		if(dateObject.getTime() - lastUpdate > 10000){
			prev = pageTitle
			pageTitle = tabs[0].url;
			setSocialAlarm();
			if(pageTitle.localeCompare(prev) == 0 || start == 0){
				startTime();
			}else{
				var data = { name: prev};
				saveTime(data);
			}
			dateObject = new Date();
			lastUpdate = dateObject.getTime();
		}
	});
}
function tabSwitch(tab){
	data = { name: pageTitle };
	saveTime(data);
	chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(tabs){
		pageTitle = tabs[0].url;
		setSocialAlarm();
		startTime();
	});
}

function tabClosed(tab){
	var data = { name: pageTitle };
	saveTime(data);
}

function startTime(){
	dateObject = new Date();
	timeStart = dateObject.valueOf();
	start = 1;
}

function saveTime(data){
	dateObject = new Date();
	useTime = dateObject.valueOf() - timeStart;
	start = 0;
	tmp = data.name;
	for(var i in pages.Social){
		if(tmp.includes(pages.Social[i])){
			chrome.storage.sync.get(['Social'], function(result){
				socialTime = result.Social;
				socialTime = socialTime + useTime;
				chrome.storage.sync.set({Social: socialTime},function(){
					console.log("Social");
					console.log(data.name);
					console.log(socialTime);
				});
			});
		}
	}


	for(var i in pages.Productivity){
		if(tmp.includes(pages.Productivity[i])){
			chrome.storage.sync.get(['Productivity'], function(result){
				productiveTime = result.Productivity;
				console.log("loaded");
				console.log(result);
				console.log(useTime);
				productiveTime = productiveTime + useTime;
				chrome.storage.sync.set({Productivity: productiveTime},function(){
					console.log("Productivity");
					console.log(data.name);
					console.log(productiveTime);
				});
			});
		}
	}

	for(var i in pages.Reading){
		if(tmp.includes(pages.Reading[i])){
			chrome.storage.sync.get(['Reading'], function(result){
				readingTime = result.Reading;
				console.log("loaded");
				console.log(result);
				console.log(useTime);
				readingTime = readingTime + useTime;
				chrome.storage.sync.set({Reading: readingTime},function(){
					console.log("Reading");
					console.log(data.name);
					console.log(readingTime);
				});
			});
		}
	}
}

function setSocialAlarm(){
	var set = 0;
	console.log(setSocial);
	for(var i in pages.Social){
		if(pageTitle.toUpperCase().includes(pages.Social[i].toUpperCase())){
			if(setSocial == 1){
				set = 1;
			}else{
				chrome.alarms.create('socialAlarm', {delayInMinutes: 2});
				console.log("social alarm set");
				setSocial = 1;
				set = 1;
			}
		}
	}
	if(!set){
		setSocial = 0;
		chrome.alarms.clear("socialAlarm");
		console.log("alarm removed");
	}
}
