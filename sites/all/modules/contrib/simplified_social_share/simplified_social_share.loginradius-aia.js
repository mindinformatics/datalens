(function (q, r, m) { var s = { required: "%s is required.", matches: "%s does not match the %s.", "default": "%s is still set to default, please change.", valid_email: "%s must contain a valid email address.", valid_emails: "%s  must contain all valid email addresses.", min_length: "%s must be at least %s characters in length.", max_length: "%s must not exceed %s characters in length.", exact_length: "%s must be exactly %s characters in length.", greater_than: "%s must contain a number greater than %s.", less_than: "%s must contain a number less than %s.", alpha: "%s must only contain alphabetical characters.", alpha_numeric: "%s must only contain alpha-numeric characters.", alpha_dash: "%s must only contain alpha-numeric characters, underscores, and dashes.", numeric: "%s must contain only numbers.", integer: "%s must contain an integer.", decimal: "%s must contain a decimal number.", is_natural: "%s must contain only positive numbers.", is_natural_no_zero: "%s must contain a number greater than zero.", valid_ip: "%s must contain a valid IP.", valid_base64: "%s must contain a base64 string.", valid_credit_card: "%s must contain a valid credit card number.", is_file_type: "%s must contain only %s files.", valid_url: "%s must contain a valid URL." }, t = function (a) { }, u = /^(.+?)\[(.+)\]$/, h = /^[0-9]+$/, v = /^\-?[0-9]+$/, k = /^\-?[0-9]*\.?[0-9]+$/, p = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, w = /^[a-z]+$/i, x = /^[a-z0-9]+$/i, y = /^[a-z0-9_\-]+$/i, z = /^[0-9]+$/i, A = /^[1-9][0-9]*$/i, B = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i, C = /[^a-zA-Z0-9\/\+=]/i, D = /^[\d\-\s]+$/, E = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, e = function (a, b, c) { this.callback = c || t; this.errors = []; this.fields = {}; this.form = this._formByNameOrNode(a) || {}; this.messages = {}; this.handlers = {}; a = 0; for (c = b.length; a < c; a++) { var d = b[a]; if ((d.name || d.names) && d.rules) if (d.names) for (var l = 0; l < d.names.length; l++) this._addField(d, d.names[l]); else this._addField(d, d.name) } var g = this.form.onsubmit; this.form.onsubmit = function (a) { return function (b) { try { return a._validateForm(b) && (g === m || g()) } catch (c) { } } }(this) }, n = function (a, b) { var c; if (0 < a.length && ("radio" === a[0].type || "checkbox" === a[0].type)) for (c = 0; c < a.length; c++) { if (a[c].checked) return a[c][b] } else return a[b] }; e.prototype.setMessage = function (a, b) { this.messages[a] = b; return this }; e.prototype.registerCallback = function (a, b) { a && ("string" === typeof a && b && "function" === typeof b) && (this.handlers[a] = b); return this }; e.prototype._formByNameOrNode = function (a) { return "object" === typeof a ? a : r.forms[a] }; e.prototype._addField = function (a, b) { this.fields[b] = { name: b, display: a.display || b, rules: a.rules, id: null, type: null, value: null, checked: null } }; e.prototype._validateForm = function (a) { this.errors = []; for (var b in this.fields) if (this.fields.hasOwnProperty(b)) { var c = this.fields[b] || {}, d = this.form[c.name]; d && d !== m && (c.id = n(d, "id"), c.type = 0 < d.length ? d[0].type : d.type, c.value = n(d, "value"), c.checked = n(d, "checked"), this._validateField(c)) } "function" === typeof this.callback && this.callback(this.errors, a); 0 < this.errors.length && (a && a.preventDefault ? a.preventDefault() : event && (event.returnValue = !1)); return !0 }; e.prototype._validateField = function (a) { for (var b = a.rules.split("|"), c = a.rules.indexOf("required"), d = !a.value || "" === a.value || a.value === m, l = 0, g = b.length; l < g; l++) { var f = b[l], e = null, h = !1, k = u.exec(f); if (-1 !== c || -1 !== f.indexOf("!callback_") || !d) if (k && (f = k[1], e = k[2]), "!" === f.charAt(0) && (f = f.substring(1, f.length)), "function" === typeof this._hooks[f] ? this._hooks[f].apply(this, [a, e]) || (h = !0) : "callback_" === f.substring(0, 9) && (f = f.substring(9, f.length), "function" === typeof this.handlers[f] && !1 === this.handlers[f].apply(this, [a.value, e]) && (h = !0)), h) { b = this.messages[f] || s[f]; c = "An error has occurred with the " + a.display + " field."; b && (c = b.replace("%s", a.display), e && (c = c.replace("%s", this.fields[e] ? this.fields[e].display : e))); this.errors.push({ id: a.id, name: a.name, message: c, rule: f }); break } } }; e.prototype._hooks = { required: function (a) { var b = a.value; return "checkbox" === a.type || "radio" === a.type ? !0 === a.checked : null !== b && "" !== b }, "default": function (a, b) { return a.value !== b }, matches: function (a, b) { var c = this.form[b]; return c ? a.value === c.value : !1 }, valid_email: function (a) { return p.test(a.value) }, valid_emails: function (a) { a = a.value.split(","); for (var b = 0; b < a.length; b++) if (!p.test(a[b])) return !1; return !0 }, min_length: function (a, b) { return h.test(b) ? a.value.length >= parseInt(b, 10) : !1 }, max_length: function (a, b) { return h.test(b) ? a.value.length <= parseInt(b, 10) : !1 }, exact_length: function (a, b) { return h.test(b) ? a.value.length === parseInt(b, 10) : !1 }, greater_than: function (a, b) { return k.test(a.value) ? parseFloat(a.value) > parseFloat(b) : !1 }, less_than: function (a, b) { return k.test(a.value) ? parseFloat(a.value) < parseFloat(b) : !1 }, alpha: function (a) { return w.test(a.value) }, alpha_numeric: function (a) { return x.test(a.value) }, alpha_dash: function (a) { return y.test(a.value) }, numeric: function (a) { return h.test(a.value) }, integer: function (a) { return v.test(a.value) }, decimal: function (a) { return k.test(a.value) }, is_natural: function (a) { return z.test(a.value) }, is_natural_no_zero: function (a) { return A.test(a.value) }, valid_ip: function (a) { return B.test(a.value) }, valid_base64: function (a) { return C.test(a.value) }, valid_url: function (a) { return E.test(a.value) }, valid_credit_card: function (a) { if (!D.test(a.value)) return !1; var b = 0, c = 0, d = !1; a = a.value.replace(/\D/g, ""); for (var e = a.length - 1; 0 <= e; e--) c = a.charAt(e), c = parseInt(c, 10), d && 9 < (c *= 2) && (c -= 9), b += c, d = !d; return 0 === b % 10 }, is_file_type: function (a, b) { if ("file" !== a.type) return !0; var c = a.value.substr(a.value.lastIndexOf(".") + 1), d = b.split(","), e = !1, g = 0, f = d.length; for (g; g < f; g++) c == d[g] && (e = !0); return e } }; q.FormValidator = e })(window, document);

$SL.util.serialize = function (form) { if (!form || form.nodeName !== "FORM") { return } var i, j, q = []; for (i = form.elements.length - 1; i >= 0; i = i - 1) { if (form.elements[i].name === "") { continue } switch (form.elements[i].nodeName) { case "INPUT": switch (form.elements[i].type) { case "text": case "hidden": case "password": case "button": case "reset": case "submit": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "checkbox": case "radio": if (form.elements[i].checked) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)) } break; case "file": break } break; case "TEXTAREA": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "SELECT": switch (form.elements[i].type) { case "select-one": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "select-multiple": for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) { if (form.elements[i].options[j].selected) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value)) } } break } break; case "BUTTON": switch (form.elements[i].type) { case "reset": case "submit": case "button": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break } break } } return q.join("&") };

//server erro : description,errorCode,message,isProviderError,providerErrorResponse



LoginRadiusAIA = (function (lr, doc) {

    var idprefix = "loginradius-aia-";
    var classprefix = "loginradius-aia-";
    var apidomain = "https://secure.loginradius.com/";
    var lraia = {};
    var aiaOptions = {};

    //start hook model
    lraia.$hooks = {};
    lraia.$hooks.process = { startProcess: function () { }, endProcess: function () { } };
    lraia.$hooks.socialLogin = { onFormRender: function () { } };

    lraia.$hooks.setProcessHook = function (startProcess, endProcess) {
        lraia.$hooks.process.startProcess = startProcess;
        lraia.$hooks.process.endProcess = endProcess;
    };
    //end hook model

    //hookify jsonpCall method
    lr.util.jsonpCall = function (url, handle) {
        if (LoginRadiusAIA.$hooks.process.startProcess) {
            LoginRadiusAIA.$hooks.process.startProcess();
        }

        var func = 'Loginradius' + Math.floor((Math.random() * 1000000000000000000) + 1);
        window[func] = function (data) {
            handle(data);

            if (LoginRadiusAIA.$hooks.process.endProcess) {
                LoginRadiusAIA.$hooks.process.endProcess();
            }

            window[func] = undefined;
            try {
                delete window[func];
            } catch (e) {
            }
        };

        var endurl = url.indexOf('?') != -1 ? url + '&callback=' + func : url + '?callback=' + func;
        var js = lr.util.addJs(endurl);
    };
    function urlData(url) {
        // object for data that will be returned
        var redata = { protocol: '', domain: '', maindomain: '', port: 80, path: '', file: '', search: '', hash: '' };

        // creates an anchor element, and adds the url in "href" attribute
        var a_elm = document.createElement('a');
        a_elm.href = url;

        // adds URL data in redata object, and returns it
        redata.protocol = a_elm.protocol.replace(':', '');
        redata.domain = a_elm.hostname.replace('www.', '');

        var mdomain = redata.domain.split(".");
        redata.maindomain = mdomain[0];
        if (a_elm.port != '') redata.port = a_elm.port;
        redata.path = a_elm.pathname;
        if (a_elm.pathname.match(/[^\/]+[\.][a-z0-9]+$/i) != null) redata.file = a_elm.pathname.match(/[^\/]+[\.][a-z0-9]+$/i);
        redata.search = a_elm.search.replace('?', '');
        redata.hash = a_elm.hash.replace('#', '');
        return redata;
    }
    function isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };

    function loginRadiusErrorToJsError(lrerror) {
        var jserror = [];
        jserror.push(lrerror);
        return jserror;
    }

    function createForm(schema, name, containerId, buttonName, onSuccess, onError) {

        if (schema.length > 0) {
            var validationSchema = [];

            var form = doc.createElement('form');
            form.setAttribute("name", name);
            form.setAttribute("method", "POST");

            for (var i = 0; i < schema.length; i++) {
                if (schema[i]) {
                    validationSchema[i] = {};
                    validationSchema[i].name = schema[i].name;
                    validationSchema[i].display = schema[i].display;
                    validationSchema[i].rules = schema[i].rules;

                    var elem;
                    switch (schema[i].type) {
                        case 'text':
                        {
                            elem = doc.createElement('textarea');
                            break;
                        }
                        case 'html':
                        {
                            elem = doc.createElement('div');
                            break;
                        }
                        case 'captcha':
                        {
                            elem = doc.createElement('div');
                            break;
                        }
                        case 'password':
                        {
                            elem = doc.createElement('input');
                            elem.type = "password";
                            break;
                        }
                        case 'hidden':
                        {

                            elem = doc.createElement('input');
                            elem.type = "hidden";
                            elem.value = schema[i].value;


                            break;
                        }
                        case 'option':
                        {
                            elem = doc.createElement('select');
                            var selectLable = doc.createElement('option');
                            selectLable.appendChild(doc.createTextNode("-- select --"));
                            selectLable.setAttribute('value', '');
                            elem.appendChild(selectLable);

                            for (var j = 0; j < schema[i].options.length; j++) {
                                var option = doc.createElement('option');
                                option.setAttribute('value', schema[i].options[j].value);
                                option.appendChild(doc.createTextNode(schema[i].options[j].text));
                                elem.appendChild(option);
                            }
                            break;
                        }
                        case 'multi':
                        {
                            elem = doc.createElement('input');
                            elem.type = "checkbox";
                            break;
                        }
                        default:
                        {
                            elem = doc.createElement('input');
                            elem.type = "text";
                            if(typeof schema[i].value != 'undefined'){
                                elem.value=schema[i].value;
                                if(schema[i].name == 'emailid' && name != 'login'){
                                    elem.disabled = true;
                                }
                            }
                            break;
                        }
                    }



                    if (schema[i].type == 'html') {

                        var div = doc.createElement('div');
                        div.setAttribute("class", classprefix + '-form-element-content' + ' content-' + idprefix + schema[i].name);

                        div.innerHTML = schema[i].html;

                        form.appendChild(div);
                    } else if (schema[i].type == 'captcha') {
                        var div = doc.createElement('div');
                        div.setAttribute("class", classprefix + '-form-element-content' + ' content-' + idprefix + schema[i].name);

                        div.innerHTML = schema[i].html;

                        if (aiaOptions.inFormvalidationMessage) {
                            var validationdiv = doc.createElement('div');
                            validationdiv.setAttribute("id", "validation-" + idprefix + name + "-" + schema[i].name);
                            validationdiv.setAttribute("class", classprefix + "validation-message" + " validation-" + idprefix + schema[i].name);
                            div.appendChild(validationdiv);
                        }

                        form.appendChild(div);
                    }
                    else {
                        elem.setAttribute("name", schema[i].name);
                        elem.setAttribute("id", idprefix + name + "-" + schema[i].name);

                        if (schema[i].type == 'hidden') {
                            form.appendChild(elem);
                        } else {
                            var label = doc.createElement('label');
                            label.setAttribute("for", idprefix + name + "-" + schema[i].name);
                            label.innerHTML = schema[i].display;

                            elem.setAttribute("class", classprefix + schema[i].type + ' ' + idprefix + schema[i].name);
                             elem.setAttribute("placeholder",schema[i].placeholder);

                            var containerDiv = doc.createElement('div');
                            containerDiv.setAttribute("class", classprefix + '-form-element-content' + ' content-' + idprefix + schema[i].name);


                            containerDiv.appendChild(label);
                            containerDiv.appendChild(elem);

                            if (aiaOptions.inFormvalidationMessage) {
                                var validationdiv = doc.createElement('div');
                                validationdiv.setAttribute("id", "validation-" + idprefix + name + "-" + schema[i].name);
                                validationdiv.setAttribute("class", classprefix + "validation-message" + " validation-" + idprefix + schema[i].name);
                                containerDiv.appendChild(validationdiv);
                            }

                            form.appendChild(containerDiv);
                        }
                    }

                }
            }

            var submit = doc.createElement('input');

            submit.type = "submit";
            submit.value = buttonName;
            submit.id = idprefix + "submit-" + buttonName;
            submit.setAttribute("class", classprefix + "submit" + " submit-" + idprefix + buttonName);

            form.appendChild(submit);
            var containerElem = doc.getElementById(containerId);
            containerElem.innerHTML = '';
            containerElem.appendChild(form);



            var validator = new FormValidator(name, validationSchema, function (errors, evt) {
                var validationdivs = lr.util.elementsByClass(classprefix + "validation-message");
                for (var i = 0 ; i < validationdivs.length; i++) {
                    validationdivs[i].innerHTML = '';
                }

                if (errors.length > 0) {
                    if (aiaOptions.inFormvalidationMessage) {
                        for (var i = 0; i < errors.length; i++) {
                        //doc.getElementById("loginErrorMessage").innerHTML = errors[i].message;
                          var d = doc.getElementById("login_error_message");
                          d.innerHTML =  errors[i].message;
                          d.className = "messages error";
                          return false;
                        }
                    }
                    onError(errors);

                } else {
                    onSuccess(lr.util.serialize(form));
                }


                if (evt && evt.preventDefault) {
                    evt.preventDefault();
                } else if (event) {
                    event.returnValue = false;
                }
            });

            validator.registerCallback('valid_date', function (value) {
                return isValidDate(value);
            }).setMessage('valid_date', 'The %s field must contain a valid date (mm/dd/yyyy).');
        }
    }



    function login(containerId, onSuccess, onError) {
        if (typeof (aiaOptions.Emailid) != 'undefined') {
            lraia.LoginFormSchema[0].value = aiaOptions.Emailid;
        }
        createForm(lraia.LoginFormSchema, "login", containerId, 'Login', function (data) {
            lr.util.jsonpCall(apidomain + "api/v2/user/login?" + data, function (regResponse) {
                if (regResponse.errorCode) {
                    onError(loginRadiusErrorToJsError(regResponse));
                } else {
                    onSuccess(regResponse);
                }
            });
        }, function (errors) {
            onError(errors);
        });
    };

    function registration(containerId, onSuccess, onError) {
        lr.util.addJs("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js");

        if (typeof (aiaOptions.website) != "undefined") {
            lraia.RegistrationFormSchema[4].value = aiaOptions.website;
            var pathArray = aiaOptions.website.split('/');
            var urlOb = urlData(aiaOptions.website);
            lraia.RegistrationFormSchema[3].value = urlOb.maindomain;
        }

        if (typeof (aiaOptions.WebTechnology) != "undefined") {
            lraia.RegistrationFormSchema[5].value = aiaOptions.WebTechnology;
        }
        if (typeof (aiaOptions.Emailid) != 'undefined') {
            lraia.RegistrationFormSchema[0].value = aiaOptions.Emailid;
            lraia.RegistrationFormSchema[0].disabled=true;
        }

        createForm(lraia.RegistrationFormSchema, "registration", containerId, 'Register', function (data) {
            lr.util.jsonpCall(apidomain + "api/v2/user/registration?" + data, function (regResponse) {
                if (regResponse.errorCode) {
                    Recaptcha.reload();
                    onError(loginRadiusErrorToJsError(regResponse));
                } else {
                    onSuccess(regResponse);
                }
            });
        }, function (errors) {
            Recaptcha.reload();
            onError(errors);
        });

        var intval = setInterval(function () {
            if (typeof Recaptcha != 'undefined' && Recaptcha) {

                Recaptcha.create("6LcRA80SAAAAALXljvxXelk_pTASi0sjx8oBrL2H",
                    "loginradius-recaptcha",
                    {
                        theme: 'custom',
                        custom_theme_widget: 'recaptcha_widget',
                        callback: function () {
                            doc.getElementById('recaptcha_widget').style.display = 'block';
                        }
                    }
                );

                clearInterval(intval);
            }
        }, 1000);


    };


    lraia.init = function (options, action, onSuccess, onError, containerId) {
        aiaOptions = options || {};


        initModuleSelector(action, containerId, onSuccess, onError);




    };

    lraia.RegistrationFormSchema = [{
        type: "string",
        name: "emailid",
        display: "Email",
        rules: "required|valid_email|max_length[100]",
        permission: "r",
        placeholder:"Email"
    }, {
        type: "hidden",
        name: "password",
        display: "Password",
        rules: "",
        permission: "r",
        placeholder:"Password"
    }, {
        type: "hidden",
        name: "confirmpassword",
        display: "Confirm Password",
        rules: "",
        permission: "r",
        placeholder:"Confirm Password"
    }, {
        type: "string",
        name: "appname",
        display: "LoginRadius Site Name",
        rules: "required|min_length[4]|max_length[25]",
        permission: "w",
        placeholder:"[a-z][0-9] and [-] allowed. Minimum 4 characters"
    },
        {
            type: "hidden",
            name: "domain",
            display: "Domain",
            rules: "",
            permission: "r",
            placeholder:"domain"
        },
        {
            type: "hidden",
            name: "webtechnology",
            display: "Webtechnology",
            rules: "",
            permission: "r",
            placeholder:"WebTechnology"
        },
        {
            type: 'captcha',
            name: 'recaptcha_response_field',
            html: '<div id="recaptcha_widget" style="display:none;" class="recaptcha_widget"><div id="recaptcha_image"  style="margin-bottom: 5px;"></div><div class="recaptcha_only_if_incorrect_sol" style="color:red">Incorrect. Please try again.</div><div class="recaptcha_input"><label class="recaptcha_only_if_image" style = "width: 338px; !important; font-weight: bold;" for="recaptcha_response_field">Type the text:</label><label class="recaptcha_only_if_audio" for="recaptcha_response_field">Enter the numbers you hear:</label><input type="text" id="recaptcha_response_field" runat="server" clientidmode="Static" name="recaptcha_response_field" /></div><ul class="recaptcha_options"><li><a href="javascript:Recaptcha.reload()"><img id="recaptcha_reload" width="25" height="17" src="http://www.google.com/recaptcha/api/img/white/refresh.gif" alt="Get a new challenge"/><span class="captcha_hide">Get another CAPTCHA</span></a></li><li class="recaptcha_only_if_image"><a href="javascript:Recaptcha.switch_type(\'audio\')"><img id="Img1" width="25" height="17" alt="Get an audio challenge" src="http://www.google.com/recaptcha/api/img/white/audio.gif"></img><span class="captcha_hide"> Get an audio CAPTCHA</span></a></li><li class="recaptcha_only_if_audio"><a href="javascript:Recaptcha.switch_type(\'image\')"><img id="recaptcha_reload" width="25" height="17" src="http://www.google.com/recaptcha/api/img/white/text.gif" alt="Get a visual challenge"/><span class="captcha_hide"> Get an image CAPTCHA</span></a></li><li><a href="javascript:Recaptcha.showhelp()"><img id="recaptcha_whatsthis" width="25" height="17" src="http://www.google.com/recaptcha/api/img/white/help.gif" alt="Help"/><span class="captcha_hide"> Help</span></a></li></ul></div>',
            display: "Captcha",
            rules: "required",
            placeholder:"Captcha"
        }
    ];
    lraia.LoginFormSchema = [{
        type: "string",
        name: "emailid",
        display: "Email",
        rules: "required|valid_email|max_length[100]",
        permission: "r",
        placeholder:"Email"
    }, {
        type: "password",
        name: "password",
        display: "Password",
        rules: "required|min_length[6]|max_length[32]",
        permission: "w",
        placeholder:"Password"
    }];




    function initModuleSelector(action, containerId, onSuccess, onError) {

        switch (action) {
            case 'login':
            {
                login(containerId, onSuccess, onError);
                break;
            }
            case 'registration':
            {
                registration(containerId, onSuccess, onError);
                break;
            }
            default:
            {
                throw new Error("This action is not valid");
            }
        }

    }
    return lraia;
})(LoginRadius_SocialLogin, document);
