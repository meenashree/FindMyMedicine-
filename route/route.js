Router.route('/', function(){ 
    this.render('hello'); 
}); 
Router.route('/page2', function() { 
    this.render('tables'); 
}); 
Router.route('/page3', function() { 
    this.render('display'); 
});
Router.route('/page4', function() { 
    this.render('display1'); 
});