// Check social sharing settings added into setting script.
if (typeof LoginRadius != 'undefined') {
  if (Drupal.settings.lrsimplifiedsocialshare != undefined) {
    // Added horizontal sharing options script to page.
    if (Drupal.settings.lrsimplifiedsocialshare.sharing != undefined && Drupal.settings.lrsimplifiedsocialshare.sharing) {
      LoginRadius.util.ready(function () {
        var lr_interface = Drupal.settings.lrsimplifiedsocialshare.lr_interface;
        $i = $SS.Interface[lr_interface];
        var string = Drupal.settings.lrsimplifiedsocialshare.providers;
        var providers = string.split(',');
        $SS.Providers.Top = providers;
        $u = LoginRadius.user_settings;
        if (Drupal.settings.lrsimplifiedsocialshare.apikey != '') {
            $u.apikey = Drupal.settings.lrsimplifiedsocialshare.apikey;
        }
        $u.sharecounttype = 'url';
        $u.isMobileFriendly = true;
        $i.size = Drupal.settings.lrsimplifiedsocialshare.size;
        $i.top = '0px';
        $i.left = '0px';
        $i.show(Drupal.settings.lrsimplifiedsocialshare.divwidget);
      });
    }
    // Added Horizontal counter options script to page.
    if (Drupal.settings.lrsimplifiedsocialshare.counter != undefined && Drupal.settings.lrsimplifiedsocialshare.counter) {
      LoginRadius.util.ready(function () {
        var string = Drupal.settings.lrsimplifiedsocialshare.providers;
        var providers = string.split(',');
        var lr_interface = Drupal.settings.lrsimplifiedsocialshare.lr_interface;
        $SC.Providers.Selected = providers;
        $S = $SC.Interface[lr_interface];
        $S.isHorizontal = true;
        $S.countertype = Drupal.settings.lrsimplifiedsocialshare.countertype;
        $S.show(Drupal.settings.lrsimplifiedsocialshare.divwidget);
      });
    }
    // Added Vertical sharing options script to page.
    if (Drupal.settings.lrsimplifiedsocialshare.verticalsharing != undefined && Drupal.settings.lrsimplifiedsocialshare.verticalsharing) {
      LoginRadius.util.ready(function () {
        var lr_interface = Drupal.settings.lrsimplifiedsocialshare.lr_vertical_interface;
        $i = $SS.Interface[lr_interface];
        var string = Drupal.settings.lrsimplifiedsocialshare.vertical_providers;
        var providers = string.split(',');
        $SS.Providers.Top = providers;
        $u = LoginRadius.user_settings;
        if (Drupal.settings.lrsimplifiedsocialshare.vertical_apikey != '') {
            $u.apikey = Drupal.settings.lrsimplifiedsocialshare.vertical_apikey;
        }
        $u.sharecounttype = 'url';
        $u.isMobileFriendly = true;
        $i.size = Drupal.settings.lrsimplifiedsocialshare.vertical_size;
        $i[Drupal.settings.lrsimplifiedsocialshare.vertical_position1] = '0px';
        $i[Drupal.settings.lrsimplifiedsocialshare.vertical_position2] = '0px';
        $i.show(Drupal.settings.lrsimplifiedsocialshare.vertical_divwidget);
      });
    }
    // Added vertical counter options script to page.
    if (Drupal.settings.lrsimplifiedsocialshare.verticalcounter != undefined && Drupal.settings.lrsimplifiedsocialshare.verticalcounter) {
      LoginRadius.util.ready(function () {
        var string = Drupal.settings.lrsimplifiedsocialshare.vertical_providers;
        var providers = string.split(',');
        $SC.Providers.Selected = providers;
        $S = $SC.Interface.simple;
        $S.isHorizontal = false;
        $S.countertype = Drupal.settings.lrsimplifiedsocialshare.vertical_countertype;
        $S[Drupal.settings.lrsimplifiedsocialshare.vertical_position1] = '0px';
        $S[Drupal.settings.lrsimplifiedsocialshare.vertical_position2] = '0px';
        $S.show(Drupal.settings.lrsimplifiedsocialshare.vertical_divwidget);
      });
    }
  }
}