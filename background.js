var dateObject = 0;
var timeStart = 0;
var start = 0;
var lastUpdate = 0;
var useTime = 0;
var pageTitle = "test";
var socialTime = 0;
var productiveTime = 0;
var readingTime = 0;
var pages = {
	Social: ["Facebook", "Twitter", "Instagram", "YouTube", "reddit", "Messenger"],
	Productivity: ["Gmail", "Outlook", "Google Docs"],
	Reading:["ScienceDirect", "ResearchGate"]
};

chrome.tabs.onUpdated.addListener(tabUpdated);
chrome.tabs.onRemoved.addListener(tabClosed);
chrome.tabs.onHighlighted.addListener(tabSwitch);

function tabUpdated(tab){
	chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(tabs){
		dateObject = new Date();
		if(dateObject.getTime() - lastUpdate > 10000){
			prev = pageTitle
			pageTitle = tabs[0].title;
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
		pageTitle = tabs[0].title;
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
				console.log("loaded");
				console.log(result);
				console.log(useTime);
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
