// Meteor.Router.add({
// 	 '/': function(){
// 		  return 'home'
// 	 },

//   	'/media_item/:id': function(id) {
//     	console.log('we are at ' + this.canonicalPath);
//     	console.log("our parameters: " + this.params);
//     	//Session.set('currentCustomerId', id);
//     	return 'media_item_view'
//   	},

//   	'*': 'not_found'
// });

Router.map(function() { 
  this.route('home', {
    path: '/',
    controller: 'MediaController',
    action: 'customAction'
  });
  this.route('media_item_view', {
    path: '/media_item/:_id',
    data: function() { return Media.findOne(this.params._id); }
  });
});

Router.configure({
    layout: 'defaultLayout',
    notFoundTemplate: 'defaultNotFound',
    loadingTemplate: 'defaultLoading'
  });

  Subscriptions = {
    media: Meteor.subscribe('media')
  };

  MediaController = RouteController.extend({
    template: 'media_items',

    /*
     * During rendering, wait on the items subscription and show the loading
     * template while the subscription is not ready. This can also be a function
     * that returns on subscription handle or an array of subscription handles.
     */

    waitOn: Subscriptions['media'],

    /*
     * The data function will be called after the subscrition is ready, at
     * render time.
     */

    data: function () {
      // we can return anything here, but since I don't want to use 'this' in
      // as the each parameter, I'm just returning an object here with a named
      // property.
      return {
        media_items: Media.find({}, {sort: {timestamp: -1}})
      };
    },

    /*
     * By default the router will call the *run* method which will render the
     * controller's template (or the template with the same name as the route)
     * to the main yield area {{yield}}. But you can provide your own action
     * methods as well.
     */
    customAction: function () {

      /* render customController into the main yield */
      this.render('media_items');

      /*
       * You can call render multiple times. You can even pass an object of
       * template names (keys) to render options (values). Typically, the
       * options object would include a *to* property specifiying the named
       * yield to render to.
       *
       */

      // this.render({
      //   itemsAside: { to: 'aside', waitOn: false, data: false },
      //   itemsFooter: { to: 'footer', waitOn: false, data: false }
      // });
    }
  });
