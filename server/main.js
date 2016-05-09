Meteor.publish('myItems', function(drugname){ 
    //return Items.find({}); 
    return Items.find({ drugname: { $regex: '.*'+drugname+'.*', "$options": "i" } }); 
}); 
 
Meteor.publish('myConcepts', function(drugname){ 
    return conceptdef.find({name: {$regex: '.*'+drugname+'.*', "$options": "i"}}); 
});

Meteor.publish('myRxterms', function(drugname){ 
    return rxTerms.find({FULL_NAME: {$regex: '.*'+drugname+'.*', "$options": "i"}}); 
}); 

Meteor.publish('myReac', function(primaryid){ 
    return reac.find({primaryid: {$regex: primaryid, "$options": "i"}}); 
});

Meteor.publish('myOut', function(primaryid){ 
    return out.find({primaryid: {$regex: primaryid, "$options": "i"}}); 
});

Meteor.publish('myIndi', function(primaryid){ 
    return Indi.find({primaryid: {$regex: primaryid, "$options": "i"}}); 
});

Meteor.publish('myrpsr', function(primaryid){ 
    return rpsr.find({primaryid: {$regex: primaryid, "$options": "i"}}); 
});

Meteor.publish('myDrug', function(primaryid){ 
    return Items.find({primaryid: {$regex: primaryid, "$options": "i"}}); 
});

Meteor.publish('myConcept', function(drugname){ 
    return conceptdef.find({name: {$regex: '.*'+drugname+'.*', "$options": "i"}}); 
});

Meteor.publish('myNDF', function(drugname){ 
    return ndf.find({name: {$regex: '.*'+drugname+'.*', "$options": "i"}}); 
});

/*Meteor.publish('myKind', function(code){ 
    return kind.find({code: {$regex: code, "$options": "i"}}); 
});*/
 
if (Meteor.isServer) {
  Meteor.startup(function () { 
    Meteor.methods({ 
    getData: function(drugname){ 
        console.log("Calling get data"); 
        var data = Items.find({ drugname: { $regex: '.*'+drugname+'.*', "$options": "i" } }).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid}); 
        console.log("Template body helper 2") 
        return distinctData
    }, 
 
    getDetail : function(drug){ 
        console.log("calling details"); 
        console.log(drug);
        var data = conceptdef.find({name: {$regex: '.*'+drug+'.*', "$options": "i"}}).fetch();
        var distinctData = _.uniq(data, false, function(d) {return d.name}); 
        console.log("Template body helper 2") 
        return _.pluck(distinctData, "name"); 
        console.log("Set session"); 
    },

    getRxTerms : function(drug){ 
        console.log("calling details");
        console.log(drug); 
        var data = rxTerms.find({FULL_NAME: {$regex: '.*'+drug+'.*', "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.FULL_NAME});
        console.log(distinctData);
        return distinctData; 
    },

    getReac : function(primaryid){ 
        console.log("calling details");
        console.log(primaryid); 
        var data = reac.find({primaryid: {$regex: primaryid, "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid});
        console.log(distinctData);
        return distinctData; 
    },

    getOut : function(primaryid){ 
        console.log("calling details");
        console.log(primaryid); 
        var data = out.find({primaryid: {$regex: primaryid, "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid});
        console.log(distinctData);
        return distinctData; 
    },

    getIndi : function(primaryid){ 
        console.log("calling details");
        console.log(primaryid); 
        var data = Indi.find({primaryid: {$regex: primaryid, "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid});
        console.log(distinctData);
        return distinctData; 
    },

    getrpsr : function(primaryid){ 
        console.log("calling details");
        console.log(primaryid); 
        var data = rpsr.find({primaryid: {$regex: primaryid, "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid});
        console.log(distinctData);
        return distinctData; 
    },

    getDrug : function(primaryid){ 
        console.log("calling details");
        console.log(primaryid); 
        var data = Items.find({primaryid: {$regex: primaryid, "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.primaryid});
        console.log(distinctData);
        return distinctData; 
    },

    getConcept : function(drug){ 
        console.log("calling details");
        console.log("__________________________"+drug); 
        var data = conceptdef.find({name: {$regex: '.*'+drug+'.*', "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.name});
        console.log(distinctData);
        return distinctData; 
    },

    getNDF : function(drug){ 
        console.log("calling details");
        console.log("__________________________"+drug); 
        var data = ndf.find({name: {$regex: '.*'+drug+'.*', "$options": "i"}}).fetch(); 
        var distinctData = _.uniq(data, false, function(d) {return d.name});
        console.log(distinctData);
        return distinctData; 
    }
}); 
  });
}