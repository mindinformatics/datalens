/**
 * @file
 * handle JS functionality of social sharing module!
 */
// Get values from document element.
var selected_sharing_theme = jQuery('[name="socialsharing_selected_share_interface"]');
// Add script to get all networks enabled at LoginRadius.
document.write("<script type='text/javascript'>var islrsharing = true; var islrsocialcounter = true;</script>");
document.write("<script src='//cdn.loginradius.com/share/v1/LoginRadius.js' type='text/javascript'></script>");
window.onload = function () {
    //Show Horizontal sharing interface at admin.
    jQuery("#edit-socialsharing-horizontal-images-0,#edit-socialsharing-horizontal-images-1").click(function () {
        sharing_horizontal_show();
    });
    // Show Simple horizontal sharing interface at admin.
    jQuery("#edit-socialsharing-horizontal-images-2,#edit-socialsharing-horizontal-images-3").click(function () {
        sharing_horizontal_show();
        sharing_simple_horizontal_show();
    });
    // Show Counter  interface at admin.
    jQuery("#edit-socialsharing-horizontal-images-8,#edit-socialsharing-horizontal-images-9").click(function () {
        counter_horizontal_show();
    });
    // Show vertical sharing interface.
    jQuery("#edit-socialsharing-vertical-images-4,#edit-socialsharing-vertical-images-5").click(function () {
        sharing_vertical_show();
    });
    // show Counter vertical interface at admin.
    jQuery("#edit-socialsharing-vertical-images-6,#edit-socialsharing-vertical-images-7").click(function () {
        counter_vertical_show();
    });
    // Show all sharing networks at admin.
    sharingproviderlist();
    // Show all counter networks at admin.
    counterproviderlist();
    // Sort the horizontal sharing networks.
    jQuery("#socialsharing_rearrange_providers").sortable({
        revert: true
    });
    // Sort the vertical sharing networks.
    jQuery("#socialsharing_vertical_rearrange_providers").sortable({
        revert: true
    });
    // Show all interfaces when vertical tab selected.
    if (selected_sharing_theme)
        loginRadiusToggleShareTheme(selected_sharing_theme.val());
    jQuery(".socialsharing_rearrange_providers").find("li").unwrap();
    jQuery(".socialsharing_vertical_rearrange_providers").find("li").unwrap();
    jQuery("#socialsharing_veritical").click(function () {
        loginRadiusToggleShareTheme("vertical");
    });
    jQuery("#socialsharing_horizontal").click(function () {
        loginRadiusToggleShareTheme("horizontal");
    });
}
// Sharing Theme selected.

function loginRadiusToggleShareTheme(theme) {
    var verticalDisplay = 'none';
    var horizontalDisplay = 'block';
    if (theme == "vertical") {
        jQuery("#socialsharing_horizontal").removeClass("active");
        jQuery("#socialsharing_veritical").addClass("active");
        verticalDisplay = 'block';
        horizontalDisplay = 'none';
        jQuery(".form-item.form-type-radios.form-item-socialsharing-vertical-position").removeClass("element-invisible");
    } else {
        jQuery("#socialsharing_horizontal").addClass("active");
        jQuery("#socialsharing_veritical").removeClass("active");
        jQuery(".form-item.form-type-radios.form-item-socialsharing-vertical-position").addClass("element-invisible");
    }
    jQuery("#socialsharing_horizontal_images").css("display", horizontalDisplay);
    jQuery("#socialsharing_vertical_images").css("display", verticalDisplay);
}

/*
 * Show sharing Rearrange Providers.
 */
function loginRadiusRearrangeProviderList(elem) {
    var ul = jQuery('#socialsharing_rearrange_providers');
    var input = jQuery('#socialsharing_chnage_name');
    if (elem.checked) {
        var provider = jQuery("<li id='edit-lrshare-iconsprite32" + elem.value + "' title='" + elem.value + "' class='lrshare_iconsprite32 lrshare_" + elem.value + "'><input type='hidden' value='" + elem.value + "' name='socialsharing_rearrange_providers_list[]' id='input-lrshare-" + elem.value + "'></li>");
        ul.append(provider);
    } else {
        if (jQuery('#edit-lrshare-iconsprite32' + elem.value)) {
            jQuery('#edit-lrshare-iconsprite32' + elem.value).remove();
        }
    }
}
// vertical Sharing Rearrange counter

function loginRadiusverticalRearrangeProviderList(elem) {
    var ul = jQuery('#socialsharing_vertical_rearrange_providers');
    var input = jQuery('#socialsharing_chnage_name');
    if (elem.checked) {
        var provider = jQuery("<li id='edit-lrshare-iconsprite32_vertical" + elem.value + "' title='" + elem.value + "' class='lrshare_iconsprite32 lrshare_" + elem.value + "'><input type='hidden' value='" + elem.value + "' name='socialsharing_vertical_rearrange_providers_list[]' id='input-lrshare-vertical-" + elem.value + "'></li>");
        ul.append(provider);
    } else {
        if (jQuery('#edit-lrshare-iconsprite32_vertical' + elem.value)) {
            jQuery('#edit-lrshare-iconsprite32_vertical' + elem.value).remove();
        }
    }
}
/*
 * Show Counter Providers selected.
 */

function loginRadiuscounterProviderList(elem) {
    var ul = jQuery('#socialcounter_show_providers_list');
    var raw = elem.value;
    var value = elem.value.split(' ').join('');
    value = value.replace("++", "plusplus");
    value = value.replace("+", "plus");
    if (elem.checked) {
        var provider = jQuery("<input type='hidden' value='" + raw + "' name='socialsharingcounter_rearrange_providers_list[]' id='input-lrcounter-" + elem.value + "'>");
        ul.append(provider);
    } else {
        jQuery('#input-lrcounter-' + value).remove();
        jQuery('#edit-' + value).remove();
    }
}
// Provider list selcted in vertical counter.

function loginRadiuscounterverticalProviderList(elem) {
    var ul = jQuery('#socialcounter_vertical_show_providers_list');
    var raw = elem.value;
    var value = elem.value.split(' ').join('');
    value = value.replace("++", "plusplus");
    value = value.replace("+", "plus");
    if (elem.checked) {
        var provider = jQuery("<input type='hidden' value='" + raw + "' name='socialsharingcounter_vertical_rearrange_providers_list[]' id='input-lrcounter-vertical-" + value + "'>");
        ul.append(provider);
    } else {
        jQuery('#input-lrcounter-vertical-' + value).remove();
        jQuery('#edit-lrshare-vertical-' + value).remove();
    }
}
// check limit for horizontal Social sharing.

function loginRadiusSharingLimit(elem) {
    var checkCount = jQuery('input[name^="socialsharing_rearrange_providers_list"]').length;
    if (elem.checked) {
        // count checked providers
        checkCount++;
        if (checkCount >= 10) {
            elem.checked = false;
            jQuery("#loginRadiusSharingLimit").show('slow');
            setTimeout(function () {
                jQuery("#loginRadiusSharingLimit").hide('slow');
            }, 2000);
            return;
        }
    }
}
// check limit for vertical Social sharing.

function loginRadiusverticalSharingLimit(elem) {
    var checkCount = jQuery('input[name^="socialsharing_vertical_rearrange_providers_list"]').length;
    if (elem.checked) {
        // count checked providers
        checkCount++;
        if (checkCount >= 10) {
            elem.checked = false;
            jQuery("#loginRadiusSharingLimit_vertical").show('slow');
            setTimeout(function () {
                jQuery("#loginRadiusSharingLimit_vertical").hide('slow');
            }, 2000);
            return;
        }
    }
}
// show Provider List for horizontal Social Sharing.

function sharingproviderlist() {
    var sharing = $SS.Providers.More;
    var div = jQuery('#socialsharing_providers_list');
    var div_vertical = jQuery('#socialsharing_vetical_show_providers_list');
    if (div && div_vertical) {
        for (var i = 0; i < sharing.length; i++) {
            var listItem = jQuery("<div class= 'form-item form-type-checkbox form-item-socialsharing-show-providers-list-" + sharing[i].toLowerCase() + "'><input type='checkbox' id='edit-socialsharing-show-providers-list-" + sharing[i].toLowerCase() + "' onChange='loginRadiusSharingLimit(this),loginRadiusRearrangeProviderList(this)' name='socialsharing_show_providers_list[" + sharing[i].toLowerCase() + "]' value='" + sharing[i].toLowerCase() + "' class='form-checkbox' /><label for='edit-socialsharing-show-providers-list-" + sharing[i].toLowerCase() + "' class='option'>" + sharing[i] + "</label></div>");
            div.append(listItem);
            var listItem = jQuery("<div class= 'form-item form-type-checkbox form-item-socialsharing-vertical-show-providers-list-" + sharing[i].toLowerCase() + "'><input type='checkbox' id='edit-socialsharing-vertical-show-providers-list-" + sharing[i].toLowerCase() + "' onChange='loginRadiusverticalSharingLimit(this),loginRadiusverticalRearrangeProviderList(this)' name='socialsharing_vertical_show_providers_list[" + sharing[i].toLowerCase() + "]' value='" + sharing[i].toLowerCase() + "' class='form-checkbox' /><label for='edit-socialsharing-vertical-show-providers-list-" + sharing[i].toLowerCase() + "' class='option'>" + sharing[i] + "</label></div>");
            div_vertical.append(listItem);
        }
        jQuery('input[name^="socialsharing_rearrange_providers_list"]').each(function () {
            var elem = jQuery(this);
            if (!elem.checked) {
                jQuery('#edit-socialsharing-show-providers-list-' + elem.val()).attr('checked', 'checked');
            }
        });
        jQuery('input[name^="socialsharing_vertical_rearrange_providers_list"]').each(function () {
            var elem = jQuery(this);
            if (!elem.checked) {
                jQuery('#edit-socialsharing-vertical-show-providers-list-' + elem.val()).attr('checked', 'checked');
            }
        });
    }
}
// show Provider List for horizontal Social counter.

function counterproviderlist() {
    var counter = $SC.Providers.All;
    var div = jQuery('#socialcounter_show_providers_list');
    var div_vertical = jQuery('#socialcounter_vertical_show_providers_list');
    if (div && div_vertical) {
        for (var i = 0; i < counter.length; i++) {
            var value = counter[i].split(' ').join('');
            value = value.replace("++", "plusplus");
            value = value.replace("+", "plus");
            var listItem = jQuery("<div class= 'form-item form-type-checkbox form-item-socialsharing_counter_show_providers_list-" + counter[i] + "'><input type='checkbox' id='edit-socialsharing-counter-show-providers-list-" + value + "' onChange='loginRadiuscounterProviderList(this)' name='socialcounter_providers_list[]' value='" + counter[i] + "' class='form-checkbox' /><label for='edit-socialsharing-counter-show-providers-list-" + value + "' class='option'>" + counter[i] + "</label></div>");
            div.append(listItem);
            var listItem = jQuery("<div class= 'form-item form-type-checkbox form-item-socialsharing_counter_vertical_show_providers_list-" + counter[i] + "'><input type='checkbox' id='edit-socialsharing-counter-vertical-show-providers-list-" + value + "' onChange='loginRadiuscounterverticalProviderList(this)' name='socialcounter_new_vertical_providers_list[]' value='" + counter[i] + "' class='form-checkbox' /><label for='edit-socialsharing-counter-vertical-show-providers-list-" + value + "' class='option'>" + counter[i] + "</label></div>");
            div_vertical.append(listItem);
        }
        jQuery('input[name^="socialsharingcounter_rearrange_providers_list"]').each(function () {
            var elem = jQuery(this);
            if (!elem.checked) {
                var value = elem.val().split(' ').join('');
                value = value.replace("++", "plusplus");
                value = value.replace("+", "plus");
                jQuery('#edit-socialsharing-counter-show-providers-list-' + value).attr('checked', 'checked');
            }
        });
        jQuery('input[name^="socialsharingcounter_vertical_rearrange_providers_list"]').each(function () {
            var elem = jQuery(this);
            if (!elem.checked) {
                var value = elem.val().split(' ').join('');
                value = value.replace("++", "plusplus");
                value = value.replace("+", "plus");
                jQuery('#edit-socialsharing-counter-vertical-show-providers-list-' + value).attr('checked', 'checked');
            }
        });
    }
}
// show Sharing Horizontal

function sharing_horizontal_show() {
    toggle_sharing_counter(true);
}
// show Counter Horizontal .

function counter_horizontal_show() {
    toggle_sharing_counter(false);
}

function toggle_sharing_counter(is_social_share, is_social_counter) {
    var simple_sharing = is_social_share ? "addClass" : "removeClass";
    var simple_counter = is_social_share ? "removeClass" : "addClass";
    if (is_social_counter) {
        simple_counter = "addClass";
    }
    jQuery("#socialsharing_providers_list")[simple_counter]("element-invisible");
    jQuery("#socialcounter_show_providers_list")[simple_sharing]("element-invisible");
    jQuery("#rearrange_sharing_text")[simple_counter]("element-invisible");
    jQuery("#socialsharing_rearrange_providers")[simple_counter]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-horizontal-location")[simple_counter]("addtopmargin");
}
// Add Js to show simple horizontal sharing widget at admin.

function sharing_simple_horizontal_show() {
    toggle_sharing_counter(true, true);
}
// Show sharing vertical.

function sharing_vertical_show() {
    toggle_sharing_vertical_show(true);
}
// show Counter Vertical.

function counter_vertical_show() {
    toggle_sharing_vertical_show(false);
}

function toggle_sharing_vertical_show(is_social_share) {
    var simple_vertical_sharing = is_social_share ? "addClass" : "removeClass";
    var simple_vertical_counter = is_social_share ? "removeClass" : "addClass";
    jQuery("#socialcounter_vertical_show_providers_list")[simple_vertical_sharing]("element-invisible");
    jQuery("#socialsharing_vetical_show_providers_list")[simple_vertical_counter]("element-invisible");
    jQuery("#rearrange_sharing_text_vertical")[simple_vertical_counter]("element-invisible");
    jQuery("#socialsharing_vertical_rearrange_providers")[simple_vertical_counter]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-vertical-show-pages")[simple_vertical_counter]("addtopmargin");
}
//set horizontal widget tab.

function toggle_horizontal_widget(is_horizontal) {
    var horizontal_sharing = is_horizontal ? "addClass" : "removeClass";
    var vertical_sharing = is_horizontal ? "removeClass" : "addClass";
    jQuery("#socialsharing_show_horizotal_widget")[horizontal_sharing]("element-invisible");
    jQuery("#socialsharing_show_veritcal_widget")[vertical_sharing]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-show-pages")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-textarea.form-item-socialsharing-show-exceptpages")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-vertical-show-pages")[vertical_sharing]("element-invisible");
    jQuery(".form-item.form-type-textarea.form-item-socialsharing-vertical-show-exceptpages")[vertical_sharing]("element-invisible");
    jQuery(".form-item.form-type-textfield.form-item-socialsharing-label-string")[horizontal_sharing]("element-invisible");
    jQuery("#horizontal_sharing_show")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-enable-horizontal-share")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-select.form-item-socialsharing-top-weight")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-select.form-item-socialsharing-bottom-weight")[horizontal_sharing]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-enable-vertical-share")[vertical_sharing]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-horizontal-location")[horizontal_sharing]("element-invisible");
}
// Show only vertical widget options.

function hidden_horizontal_widget() {
    toggle_horizontal_widget(true);
}
// Show only Horizontal widget options.

function display_horizontal_widget() {
    toggle_horizontal_widget(false);
    if (jQuery("#edit-socialsharing-horizontal-location-links")[0]) {
        var isChecked = jQuery("#edit-socialsharing-horizontal-location-links")[0].checked;
        if (isChecked)
            display_block_horizontal("1");
        else
            display_block_horizontal("0");
    }
}


// Check to horizontal display Block or content.
function display_block_horizontal(value) {
    if (value == "1") {
        display_block_horizontal_submit(true);
    } else {
        display_block_horizontal_submit(false);
    }
}
// Check to horizontal display Block or content.

function display_block_horizontal_submit(is_content) {
    var links = is_content ? "addClass" : "removeClass";
    jQuery(".form-item.form-type-select.form-item-socialsharing-bottom-weight")[links]("element-invisible");
    jQuery("#horizontal_sharing_show")[links]("element-invisible");
    jQuery(".form-item.form-type-select.form-item-socialsharing-top-weight")[links]("element-invisible");
    jQuery(".form-item.form-type-radios.form-item-socialsharing-show-pages").removeClass("element-invisible");
    jQuery(".form-item.form-type-textarea.form-item-socialsharing-show-exceptpages").removeClass("element-invisible");
}
/*
 * toggle login/register interface.
 */

function lr_toggle_form(val) {
    jQuery("#login_error_message").removeClass("messages error");
    if (val == 'login') {
        lr_toggle_form_submit('Create a LoginRadius Account', true);
    } else {
        lr_toggle_form_submit('Login with your LoginRadius Account to change settings as per your requirements!', false);
    }
}
/*
 * submit toggle login/register interface.
 */

function lr_toggle_form_submit(msg, islogin) {
    jQuery('#login_error_message').html('');
    jQuery('#dynamic_form_heading').html(msg);
    jQuery("#registeration-container").css("display", islogin ? "block" : "none");
    jQuery("#login-container").css("display", islogin ? "none" : "block");
    jQuery("#login_form_link").css("display", islogin ? "block" : "none");
    jQuery("#register_form_link").css("display", islogin ? "none" : "block");
}