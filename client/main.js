valueKind = null;

Template.btn.events({ 
  'click .btn' : function(e) { 
    var clickedButton = e.currentTarget; 
    var drugDetail = $(clickedButton).val();
	console.log("Fetching data for:  " + drugDetail);
    var splitDrugDetail = drugDetail.split("@@@");
    console.log(splitDrugDetail[0]);
    console.log(splitDrugDetail[1]);
	Meteor.subscribe('myConcepts', drugDetail); 
    Meteor.call('getDetail', drugDetail, function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('results', response);
	});
	
	Meteor.subscribe('myRxterms', splitDrugDetail[1]); 
    Meteor.call('getRxTerms', splitDrugDetail[1], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }   
    Session.set('rx', response);	
	});

    Meteor.subscribe('myReac', splitDrugDetail[0]); 
    Meteor.call('getReac', splitDrugDetail[0], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('reac', response);    
    });

    Meteor.subscribe('myOut', splitDrugDetail[0]); 
    Meteor.call('getOut', splitDrugDetail[0], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('out', response);    
    });

    Meteor.subscribe('myIndi', splitDrugDetail[0]); 
    Meteor.call('getIndi', splitDrugDetail[0], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('indi', response);    
    });

    Meteor.subscribe('myrpsr', splitDrugDetail[0]); 
    Meteor.call('getrpsr', splitDrugDetail[0], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('rpsr', response);    
    });

    Meteor.subscribe('myDrug', splitDrugDetail[0]); 
    Meteor.call('getDrug', splitDrugDetail[0], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        }  
    Session.set('drug', response);    
    });

    Meteor.subscribe('myConcepts', splitDrugDetail[1]); 
    Meteor.call('getConcept', splitDrugDetail[1], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        } 
    Session.set('concept', response);    
    });

    Meteor.subscribe('myNDF', splitDrugDetail[1]); 
    Meteor.call('getNDF', splitDrugDetail[1], function(err, response){  
        if(err){  
            console.log(err);  
            return;  
        } 
    Session.set('ndf', response);    
    });

    Router.go('/page4'); 
  }, 
}); 
 
Template.list.resolutions = function(){ 

    return Session.get('resolutions') || []; 
}

Template.hello.events({ 
    'keydown #drug' : function (event) { 
        console.log('submitted'); 
        drugname = $("#drug").val(); 
        myLength = drugname.length; 
        if (myLength > 0 && myLength % 3 == 0){ 
        drugname = $("#drug").val(); 
        console.log("Subscribe"); 
        Meteor.subscribe('myItems', drugname); 
        Meteor.call('getData', drugname, function(err, response){ 
            if(err){ 
                console.log(err); 
                return; 
            } 
            Session.set('resolutions', response); 
        }); 
        } 
    } 
}); 
 
Template.display1.res = function(){ 
    //console.log(Session.get('results.primaryid'));
    return Session.get('results') || ["No Data FOUND"];  
}

Template.display1.res1 = function(){
    return Session.get('rx') || ["No Data FOUND"];  
}

Template.display1.res2 = function(){  
    return Session.get('reac') || ["No Data FOUND"];  
}

Template.display1.res3 = function(){  
    return Session.get('out') || ["No Data FOUND"];  
}

Template.display1.res4 = function(){  
    return Session.get('indi') || ["No Data FOUND"];  
}

Template.display1.res5 = function(){  
    return Session.get('rpsr') || ["No Data FOUND"];  
}

Template.display1.res6 = function(){  
    return Session.get('drug') || ["No Data FOUND"];  
}

Template.display1.res7 = function(){
    return Session.get('concept') || ["No Data FOUND"];  
}

Template.display1.res8 = function(){
    return Session.get('ndf') || ["No Data FOUND"];  
}

Template.registerHelper("keyval",function(object){
  return _.map(object, function(value, key) {
    return {
      key: key,
      value: value
    };
  });
});