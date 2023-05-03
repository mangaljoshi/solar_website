/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */
function generateLocationFields(e) {
    if (null == e) return $(".new-location").show(), !0;
    $("#pii_city").val(e.city),
        0 == $(".location").length
            ? ($(".new-location").before('<div class="form-group generated-location"><div class="location">' + e.city + ", " + e.state_code + ' <a id="change_location" href="#">Change</a></div></div>'), $(".new-location").hide())
            : $(".location").html(e.city + ", " + e.state_code + ' <a id="change_location" href="#">Change</a>'),
        $(document).on("click", "#change_location", function (e) {
            e.preventDefault(),
                $(this)
                    .closest(".form-group")
                    .hide(0, function () {
                        $(".new-location").show(0, function () {
                            var e = $(".step:visible").height();
                            jQuery().velocity && $(".steps").velocity({ height: e }, { duration: 350 });
                        });
                    });
        });
}
function selectState(e) {
    if (null == e) return !0;
    var t = $("#pii_state_code option[value='" + e.state_code + "']");
    "hidden" == $("#pii_state_code").attr("type")
        ? $("#pii_state_code").val(e.state_code)
        : 0 != t.length
        ? t.attr("selected", "selected")
        : $("#pii_state_code").append($("<option>", { value: e.state_code, text: e.state_name, selected: "selected" }));
}
function printOptions(e, t) {
    if (null == t || 0 == t.length) return !0;
    var n = $("#" + e);
    n.empty(),
        $.each(t, function () {
            $("<option>", { value: this, text: this }).appendTo(n);
        });
}
function validate(e) {
    var t = e.attr("name"),
        n = e.val();
    if ("pii[email]" == t && "" != n) {
        var i = { email: n };
        $.ajax({
            url: "/auto_correct_email",
            type: "POST",
            async: !1,
            data: i,
            success: function (e) {
                e.email != n && $('input[name="pii[email]"]').val(e.email), (n = e.email);
            },
        });
    }
    if ("undefined" != typeof fullLoad_domain && fullLoad_domain) i = { name: t, value: n, form_type: "full_load" };
    else i = { name: t, value: n };
    $.ajax({
        url: "/validations",
        type: "POST",
        data: i,
        async: !1,
        success: function (e) {
            "pii[phone_number]" != e.name && "pii[ssn]" != e.name && $('input[name="' + e.name + '"]').val(e.value),
                $('#hero input[name="' + e.name + '"], #hero_section input[name="' + e.name + '"]')
                    .parent()
                    .removeClass("has-error")
                    .find(".validation-msg")
                    .remove();
        },
        error: function (e) {
            var t = jQuery.parseJSON(e.responseText);
            $('#hero input[name="' + t.name + '"], #hero_section input[name="' + t.name + '"]')
                .parent()
                .removeClass("has-error")
                .find(".validation-msg")
                .remove(),
                $('#hero input[name="' + t.name + '"], #hero_section input[name="' + t.name + '"]')
                    .after('<div class="validation-msg">' + t.error + "</div>")
                    .parent()
                    .addClass("has-error");
        },
    });
}
function pixelLoader() {
    $.ajax({
        url: "/pixel_loader",
        type: "GET",
        dataType: "json",
        success: function (e) {
            pixels = e.pixels;
            var t = document.createElement("div");
            (t.id = "pixel-loader-div"),
                (t.style.display = "none"),
                pixels.forEach(function (e) {
                    t.innerHTML += e;
                }),
                $("form").append(t);
        },
        error: function (e, t, n) {
            console.log(n);
        },
    });
}
function createCookie(e, t, n) {
    var i;
    if (n) {
        var o = new Date();
        o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), (i = "; expires=" + o.toGMTString());
    } else i = "";
    document.cookie = e + "=" + t + i + "; path=/";
}
function readCookie(e) {
    for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
        for (var o = n[i]; " " == o.charAt(0); ) o = o.substring(1, o.length);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
    }
    return null;
}
function eraseCookie(e) {
    createCookie(e, "", -1);
}
function areCookiesEnabled() {
    var e = !1;
    return createCookie("testing", "Hello", 1), null != readCookie("testing") && ((e = !0), eraseCookie("testing")), e;
}
function render_script(e, t) {
    (script = document.createElement("script")), (script.type = "text/javascript"), (script.async = !1), (script.onload = function () {});
    var n = 1 == t ? "https://d1xbcrovq1eu45.cloudfront.net/" : "";
    (script.src = n + e), document.getElementsByTagName("head")[0].appendChild(script);
}
function updateProgress() {
    var e = window.location.hash.substr(1),
        t = (parseInt(e.substr(e.indexOf("-") + 1)), parseInt($(".step:visible").attr("data-step")), $(".steps").find(".step:visible")),
        n = 100 / $(".steps > .step").length,
        i = Math.round(t.attr("data-step") * n - n);
    $(".prog-bar")
        .attr("data-percentage", i)
        .outerWidth(i + "%"),
        $(".prog-bar")
            .children(".percentage")
            .text(i + "%");
}
function updateHash() {
    history.pushState && history.pushState(null, null, "#step-" + $(".steps").find(".step:visible").attr("data-step")), $(window).width() < 768 && $("html,body").animate({ scrollTop: $("#hero").offset().top }, 300);
}
function backButtonVisibility(e, t) {
    (e = window.location.hash.substr(1)), (t = parseInt(e.substr(e.indexOf("-") + 1)));
    e && 1 !== t ? $(".btn-back").show(0) : $(".btn-back").hide(0);
}
function skip_steps() {
    $(".form-control-wrapper").on("show", function () {
        $(this).closest(".form-step").removeClass("skip");
    }),
        $(".form-control-wrapper").on("hide", function () {
            $(this).closest(".form-step").addClass("skip");
        });
}
function goNext(e, t) {
    if (($("input").keydown(disableEnterKey), t)) var n = t.step_counter;
    else n = $(".step:visible").find("#step_counter").val();
    for (var i = $(".step-" + n), o = $(".step-" + (parseInt(n) + 1)); 0 !== o.length && o.hasClass("skip"); ) o.css({ left: "-100%", opacity: 0 }).hide(0), (o = o.next());
    "undefined" == typeof mortgage_domain || 1 != mortgage_domain || "pii" != o.data("questions-type") || mortgage_pii_start || ((mortgage_pii_start = !0), leadID(), TrustedForm()),
        0 !== o.length &&
            (nextStepsHeight(o),
            i.velocity({ left: "-100%", opacity: 0 }, { duration: 350 }).hide(0),
            o.show(0).velocity(
                { left: "0", opacity: 1 },
                {
                    duration: 350,
                    complete: function () {
                        $("input").unbind("keydown", disableEnterKey), updateStep($(this)), updateHash();
                        var e = $(this);
                        setTimeout(function () {
                            e.find('[name^="pii"]').first().focus();
                        }, 300);
                    },
                }
            )),
        0 === $("#pii_street_address:visible").length || street_address_pixel_loaded || (pixelLoader(), (street_address_pixel_loaded = !0));
}
function goBack(e) {
    e.preventDefault();
    var t = $(this).closest("#hero").find(".step:visible"),
        n = t;
    if (!inProgress) {
        for ($(".btn-back").unbind("click"); 0 !== n.prev().length && n.prev().hasClass("skip"); ) n.prev().css({ left: "100%", opacity: 0 }).hide(0), (n = n.prev());
        0 !== n.prev().length &&
            (prevStepsHeight(n.prev()),
            t
                .velocity(
                    { left: "100%", opacity: 0 },
                    {
                        duration: 350,
                        begin: function () {
                            inProgress = !0;
                        },
                    }
                )
                .hide(0),
            n
                .prev()
                .show(0)
                .velocity(
                    { left: "0", opacity: 1 },
                    {
                        duration: 350,
                        complete: function () {
                            setTimeout(function () {
                                inProgress = !1;
                            }, 50),
                                updateStep($(this)),
                                updateHash(),
                                $(".btn-back").bind("click", goBack);
                        },
                    }
                ));
    }
}
function updateStep() {
    var e = $(".steps").find(".step").first().attr("data-step");
    if ($(".step.skip").length && "undefined" == typeof mortgage_domain)
        var t = $(".steps .step").not(".skip").length,
            n = $(".steps").find(".step:visible").attr("visible-data-step");
    else (t = $(".steps .step").length), (n = $(".steps").find(".step:visible").attr("data-step"));
    var i = 100 / t,
        o = Math.round(n * i - i);
    t > 2
        ? ($(".prog-bar")
              .attr("data-percentage", o)
              .outerWidth(o + "%"),
          $(".prog-bar")
              .children(".percentage")
              .text(o + "%"))
        : ($(".prog-bar").attr("data-percentage", "7").outerWidth("7%"), $(".prog-bar").children(".percentage").text("7%")),
        n == e ? ($(".btn-back").hide(), hideProgBar()) : ($(".btn-back").show(), showProgBar()),
        $(document).trigger("updateProgress", n);
}
function showProgBar() {
    $(".prog-bar-wrapper").is(":visible") || $(".prog-bar-wrapper").show(0).addClass("can-hide");
}
function hideProgBar() {
    $(".prog-bar-wrapper").is(":visible") && $(".prog-bar-wrapper").hasClass("can-hide") && $(".prog-bar-wrapper").hide(0);
}
function nextStepsHeight() {
    var e = $(".step:visible").nextAll('.step:not(".skip")').height();
    $(".steps").velocity({ height: e }, { duration: 350 });
}
function prevStepsHeight(e) {
    var t = $(e).closest("#hero").find(".step:visible").prevAll('.step:not(".skip")').height();
    $(".steps").velocity({ height: t }, { duration: 350 });
}
function initStepsHeight() {
    var e = $(".step:visible").height();
    $(".steps").height(e);
}
function submit_service_questions(e) {
    e.param &&
        e.param.first_name &&
        ((inputs = $(".service-questions :input").not("#step_counter").not(":input:disabled").serialize()),
        $.ajax({
            url: "/submit/service",
            async: !1,
            type: "POST",
            dataType: "json",
            data: inputs,
            success: function () {},
            error: function (e) {
                setTimeout(function () {
                    formButton.removeAttr("disabled").html(buttonText);
                }, 750),
                    event.preventDefault();
                jQuery.parseJSON(e.responseText);
                window.location.href = "/";
            },
        }));
}
function newDataStep() {
    if ($(".step.skip").length) {
        $(".steps .step").not(".skip").length;
        var e = 0;
        $(".step.skip").each(function () {
            $(this).removeAttr("visible-data-step");
        }),
            $(".step")
                .not(".skip")
                .each(function () {
                    e++, $(this).attr("visible-data-step", e);
                });
        $(".steps").find(".step:visible").attr("visible-data-step");
    }
}
function emailAutoComplete() {
    var e = ["gmail.com", "yahoo.com", "hotmail.com", "live.com", "outlook.com", "msn.com", "icloud.com", "aol.com"];
    $("#hero [name='pii[email]']").autocomplete({
        minLength: 3,
        autoFocus: !0,
        source: function (t, n) {
            var i = t.term,
                o = i.indexOf("@"),
                r = i,
                s = "",
                a = [];
            if ((o && ((r = i.slice(0, o)), (s = i.slice(o + 1))), r)) {
                var l = s
                        ? $.grep(e, function (e) {
                              return e.indexOf(s) > -1;
                          })
                        : e,
                    u = $.map(l, function (e) {
                        return r + "@" + e;
                    });
                a = a.concat($.makeArray(u));
            }
            n(a);
        },
        close: function () {
            validate($("#hero [name='pii[email]']"));
        },
    });
}
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if (
    ((function (e, t) {
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = e.document
                  ? t(e, !0)
                  : function (e) {
                        if (!e.document) throw new Error("jQuery requires a window with a document");
                        return t(e);
                    })
            : t(e);
    })("undefined" != typeof window ? window : this, function (e, t) {
        function n(e) {
            var t = !!e && "length" in e && e.length,
                n = he.type(e);
            return "function" !== n && !he.isWindow(e) && ("array" === n || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e));
        }
        function i(e, t, n) {
            if (he.isFunction(t))
                return he.grep(e, function (e, i) {
                    return !!t.call(e, i, e) !== n;
                });
            if (t.nodeType)
                return he.grep(e, function (e) {
                    return (e === t) !== n;
                });
            if ("string" == typeof t) {
                if (_e.test(t)) return he.filter(t, e, n);
                t = he.filter(t, e);
            }
            return he.grep(e, function (e) {
                return he.inArray(e, t) > -1 !== n;
            });
        }
        function o(e, t) {
            do {
                e = e[t];
            } while (e && 1 !== e.nodeType);
            return e;
        }
        function r(e) {
            var t = {};
            return (
                he.each(e.match(je) || [], function (e, n) {
                    t[n] = !0;
                }),
                t
            );
        }
        function s() {
            ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a)) : (ie.detachEvent("onreadystatechange", a), e.detachEvent("onload", a));
        }
        function a() {
            (ie.addEventListener || "load" === e.event.type || "complete" === ie.readyState) && (s(), he.ready());
        }
        function l(e, t, n) {
            if (n === undefined && 1 === e.nodeType) {
                var i = "data-" + t.replace(Oe, "-$1").toLowerCase();
                if ("string" == typeof (n = e.getAttribute(i))) {
                    try {
                        n = "true" === n || ("false" !== n && ("null" === n ? null : +n + "" === n ? +n : Pe.test(n) ? he.parseJSON(n) : n));
                    } catch (o) {}
                    he.data(e, t, n);
                } else n = undefined;
            }
            return n;
        }
        function u(e) {
            var t;
            for (t in e) if (("data" !== t || !he.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0;
        }
        function c(e, t, n, i) {
            if (De(e)) {
                var o,
                    r,
                    s = he.expando,
                    a = e.nodeType,
                    l = a ? he.cache : e,
                    u = a ? e[s] : e[s] && s;
                if ((u && l[u] && (i || l[u].data)) || n !== undefined || "string" != typeof t)
                    return (
                        u || (u = a ? (e[s] = ne.pop() || he.guid++) : s),
                        l[u] || (l[u] = a ? {} : { toJSON: he.noop }),
                        ("object" != typeof t && "function" != typeof t) || (i ? (l[u] = he.extend(l[u], t)) : (l[u].data = he.extend(l[u].data, t))),
                        (r = l[u]),
                        i || (r.data || (r.data = {}), (r = r.data)),
                        n !== undefined && (r[he.camelCase(t)] = n),
                        "string" == typeof t ? null == (o = r[t]) && (o = r[he.camelCase(t)]) : (o = r),
                        o
                    );
            }
        }
        function d(e, t, n) {
            if (De(e)) {
                var i,
                    o,
                    r = e.nodeType,
                    s = r ? he.cache : e,
                    a = r ? e[he.expando] : he.expando;
                if (s[a]) {
                    if (t && (i = n ? s[a] : s[a].data)) {
                        o = (t = he.isArray(t) ? t.concat(he.map(t, he.camelCase)) : t in i ? [t] : (t = he.camelCase(t)) in i ? [t] : t.split(" ")).length;
                        for (; o--; ) delete i[t[o]];
                        if (n ? !u(i) : !he.isEmptyObject(i)) return;
                    }
                    (n || (delete s[a].data, u(s[a]))) && (r ? he.cleanData([e], !0) : de.deleteExpando || s != s.window ? delete s[a] : (s[a] = undefined));
                }
            }
        }
        function p(e, t, n, i) {
            var o,
                r = 1,
                s = 20,
                a = i
                    ? function () {
                          return i.cur();
                      }
                    : function () {
                          return he.css(e, t, "");
                      },
                l = a(),
                u = (n && n[3]) || (he.cssNumber[t] ? "" : "px"),
                c = (he.cssNumber[t] || ("px" !== u && +l)) && Me.exec(he.css(e, t));
            if (c && c[3] !== u) {
                (u = u || c[3]), (n = n || []), (c = +l || 1);
                do {
                    (c /= r = r || ".5"), he.style(e, t, c + u);
                } while (r !== (r = a() / l) && 1 !== r && --s);
            }
            return n && ((c = +c || +l || 0), (o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]), i && ((i.unit = u), (i.start = c), (i.end = o))), o;
        }
        function h(e) {
            var t = Ge.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement) for (; t.length; ) n.createElement(t.pop());
            return n;
        }
        function f(e, t) {
            var n,
                i,
                o = 0,
                r = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : undefined;
            if (!r) for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || he.nodeName(i, t) ? r.push(i) : he.merge(r, f(i, t));
            return t === undefined || (t && he.nodeName(e, t)) ? he.merge([e], r) : r;
        }
        function m(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) he._data(n, "globalEval", !t || he._data(t[i], "globalEval"));
        }
        function g(e) {
            ze.test(e.type) && (e.defaultChecked = e.checked);
        }
        function v(e, t, n, i, o) {
            for (var r, s, a, l, u, c, d, p = e.length, v = h(t), y = [], b = 0; b < p; b++)
                if ((s = e[b]) || 0 === s)
                    if ("object" === he.type(s)) he.merge(y, s.nodeType ? [s] : s);
                    else if (Xe.test(s)) {
                        for (l = l || v.appendChild(t.createElement("div")), u = (Be.exec(s) || ["", ""])[1].toLowerCase(), d = Qe[u] || Qe._default, l.innerHTML = d[1] + he.htmlPrefilter(s) + d[2], r = d[0]; r--; ) l = l.lastChild;
                        if ((!de.leadingWhitespace && Ue.test(s) && y.push(t.createTextNode(Ue.exec(s)[0])), !de.tbody))
                            for (r = (s = "table" !== u || Ye.test(s) ? ("<table>" !== d[1] || Ye.test(s) ? 0 : l) : l.firstChild) && s.childNodes.length; r--; )
                                he.nodeName((c = s.childNodes[r]), "tbody") && !c.childNodes.length && s.removeChild(c);
                        for (he.merge(y, l.childNodes), l.textContent = ""; l.firstChild; ) l.removeChild(l.firstChild);
                        l = v.lastChild;
                    } else y.push(t.createTextNode(s));
            for (l && v.removeChild(l), de.appendChecked || he.grep(f(y, "input"), g), b = 0; (s = y[b++]); )
                if (i && he.inArray(s, i) > -1) o && o.push(s);
                else if (((a = he.contains(s.ownerDocument, s)), (l = f(v.appendChild(s), "script")), a && m(l), n)) for (r = 0; (s = l[r++]); ) Ve.test(s.type || "") && n.push(s);
            return (l = null), v;
        }
        function y() {
            return !0;
        }
        function b() {
            return !1;
        }
        function w() {
            try {
                return ie.activeElement;
            } catch (e) {}
        }
        function x(e, t, n, i, o, r) {
            var s, a;
            if ("object" == typeof t) {
                for (a in ("string" != typeof n && ((i = i || n), (n = undefined)), t)) x(e, a, n, i, t[a], r);
                return e;
            }
            if ((null == i && null == o ? ((o = n), (i = n = undefined)) : null == o && ("string" == typeof n ? ((o = i), (i = undefined)) : ((o = i), (i = n), (n = undefined))), !1 === o)) o = b;
            else if (!o) return e;
            return (
                1 === r &&
                    ((s = o),
                    ((o = function (e) {
                        return he().off(e), s.apply(this, arguments);
                    }).guid = s.guid || (s.guid = he.guid++))),
                e.each(function () {
                    he.event.add(this, t, o, i, n);
                })
            );
        }
        function $(e, t) {
            return he.nodeName(e, "table") && he.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
        }
        function _(e) {
            return (e.type = (null !== he.find.attr(e, "type")) + "/" + e.type), e;
        }
        function C(e) {
            var t = at.exec(e.type);
            return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
        }
        function T(e, t) {
            if (1 === t.nodeType && he.hasData(e)) {
                var n,
                    i,
                    o,
                    r = he._data(e),
                    s = he._data(t, r),
                    a = r.events;
                if (a) for (n in (delete s.handle, (s.events = {}), a)) for (i = 0, o = a[n].length; i < o; i++) he.event.add(t, n, a[n][i]);
                s.data && (s.data = he.extend({}, s.data));
            }
        }
        function k(e, t) {
            var n, i, o;
            if (1 === t.nodeType) {
                if (((n = t.nodeName.toLowerCase()), !de.noCloneEvent && t[he.expando])) {
                    for (i in (o = he._data(t)).events) he.removeEvent(t, i, o.handle);
                    t.removeAttribute(he.expando);
                }
                "script" === n && t.text !== e.text
                    ? ((_(t).text = e.text), C(t))
                    : "object" === n
                    ? (t.parentNode && (t.outerHTML = e.outerHTML), de.html5Clone && e.innerHTML && !he.trim(t.innerHTML) && (t.innerHTML = e.innerHTML))
                    : "input" === n && ze.test(e.type)
                    ? ((t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value))
                    : "option" === n
                    ? (t.defaultSelected = t.selected = e.defaultSelected)
                    : ("input" !== n && "textarea" !== n) || (t.defaultValue = e.defaultValue);
            }
        }
        function S(e, t, n, i) {
            t = re.apply([], t);
            var o,
                r,
                s,
                a,
                l,
                u,
                c = 0,
                d = e.length,
                p = d - 1,
                h = t[0],
                m = he.isFunction(h);
            if (m || (d > 1 && "string" == typeof h && !de.checkClone && st.test(h)))
                return e.each(function (o) {
                    var r = e.eq(o);
                    m && (t[0] = h.call(this, o, r.html())), S(r, t, n, i);
                });
            if (d && ((o = (u = v(t, e[0].ownerDocument, !1, e, i)).firstChild), 1 === u.childNodes.length && (u = o), o || i)) {
                for (s = (a = he.map(f(u, "script"), _)).length; c < d; c++) (r = u), c !== p && ((r = he.clone(r, !0, !0)), s && he.merge(a, f(r, "script"))), n.call(e[c], r, c);
                if (s)
                    for (l = a[a.length - 1].ownerDocument, he.map(a, C), c = 0; c < s; c++)
                        (r = a[c]), Ve.test(r.type || "") && !he._data(r, "globalEval") && he.contains(l, r) && (r.src ? he._evalUrl && he._evalUrl(r.src) : he.globalEval((r.text || r.textContent || r.innerHTML || "").replace(lt, "")));
                u = o = null;
            }
            return e;
        }
        function E(e, t, n) {
            for (var i, o = t ? he.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || he.cleanData(f(i)), i.parentNode && (n && he.contains(i.ownerDocument, i) && m(f(i, "script")), i.parentNode.removeChild(i));
            return e;
        }
        function A(e, t) {
            var n = he(t.createElement(e)).appendTo(t.body),
                i = he.css(n[0], "display");
            return n.detach(), i;
        }
        function j(e) {
            var t = ie,
                n = dt[e];
            return (
                n ||
                    (("none" !== (n = A(e, t)) && n) ||
                        ((t = ((ct = (ct || he("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || ct[0].contentDocument).document).write(), t.close(), (n = A(e, t)), ct.detach()),
                    (dt[e] = n)),
                n
            );
        }
        function N(e, t) {
            return {
                get: function () {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get;
                },
            };
        }
        function D(e) {
            if (e in kt) return e;
            for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Tt.length; n--; ) if ((e = Tt[n] + t) in kt) return e;
        }
        function P(e, t) {
            for (var n, i, o, r = [], s = 0, a = e.length; s < a; s++)
                (i = e[s]).style &&
                    ((r[s] = he._data(i, "olddisplay")),
                    (n = i.style.display),
                    t
                        ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Fe(i) && (r[s] = he._data(i, "olddisplay", j(i.nodeName))))
                        : ((o = Fe(i)), ((n && "none" !== n) || !o) && he._data(i, "olddisplay", o ? n : he.css(i, "display"))));
            for (s = 0; s < a; s++) (i = e[s]).style && ((t && "none" !== i.style.display && "" !== i.style.display) || (i.style.display = t ? r[s] || "" : "none"));
            return e;
        }
        function O(e, t, n) {
            var i = $t.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
        }
        function L(e, t, n, i, o) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2)
                "margin" === n && (s += he.css(e, n + Re[r], !0, o)),
                    i
                        ? ("content" === n && (s -= he.css(e, "padding" + Re[r], !0, o)), "margin" !== n && (s -= he.css(e, "border" + Re[r] + "Width", !0, o)))
                        : ((s += he.css(e, "padding" + Re[r], !0, o)), "padding" !== n && (s += he.css(e, "border" + Re[r] + "Width", !0, o)));
            return s;
        }
        function I(t, n, i) {
            var o = !0,
                r = "width" === n ? t.offsetWidth : t.offsetHeight,
                s = gt(t),
                a = de.boxSizing && "border-box" === he.css(t, "boxSizing", !1, s);
            if ((ie.msFullscreenElement && e.top !== e && t.getClientRects().length && (r = Math.round(100 * t.getBoundingClientRect()[n])), r <= 0 || null == r)) {
                if ((((r = vt(t, n, s)) < 0 || null == r) && (r = t.style[n]), ht.test(r))) return r;
                (o = a && (de.boxSizingReliable() || r === t.style[n])), (r = parseFloat(r) || 0);
            }
            return r + L(t, n, i || (a ? "border" : "content"), o, s) + "px";
        }
        function q(e, t, n, i, o) {
            return new q.prototype.init(e, t, n, i, o);
        }
        function H() {
            return (
                e.setTimeout(function () {
                    St = undefined;
                }),
                (St = he.now())
            );
        }
        function M(e, t) {
            var n,
                i = { height: e },
                o = 0;
            for (t = t ? 1 : 0; o < 4; o += 2 - t) i["margin" + (n = Re[o])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i;
        }
        function R(e, t, n) {
            for (var i, o = (z.tweeners[t] || []).concat(z.tweeners["*"]), r = 0, s = o.length; r < s; r++) if ((i = o[r].call(n, t, e))) return i;
        }
        function F(e, t, n) {
            var i,
                o,
                r,
                s,
                a,
                l,
                u,
                c = this,
                d = {},
                p = e.style,
                h = e.nodeType && Fe(e),
                f = he._data(e, "fxshow");
            for (i in (n.queue ||
                (null == (a = he._queueHooks(e, "fx")).unqueued &&
                    ((a.unqueued = 0),
                    (l = a.empty.fire),
                    (a.empty.fire = function () {
                        a.unqueued || l();
                    })),
                a.unqueued++,
                c.always(function () {
                    c.always(function () {
                        a.unqueued--, he.queue(e, "fx").length || a.empty.fire();
                    });
                })),
            1 === e.nodeType &&
                ("height" in t || "width" in t) &&
                ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                "inline" === ("none" === (u = he.css(e, "display")) ? he._data(e, "olddisplay") || j(e.nodeName) : u) &&
                    "none" === he.css(e, "float") &&
                    (de.inlineBlockNeedsLayout && "inline" !== j(e.nodeName) ? (p.zoom = 1) : (p.display = "inline-block"))),
            n.overflow &&
                ((p.overflow = "hidden"),
                de.shrinkWrapBlocks() ||
                    c.always(function () {
                        (p.overflow = n.overflow[0]), (p.overflowX = n.overflow[1]), (p.overflowY = n.overflow[2]);
                    })),
            t))
                if (((o = t[i]), At.exec(o))) {
                    if ((delete t[i], (r = r || "toggle" === o), o === (h ? "hide" : "show"))) {
                        if ("show" !== o || !f || f[i] === undefined) continue;
                        h = !0;
                    }
                    d[i] = (f && f[i]) || he.style(e, i);
                } else u = undefined;
            if (he.isEmptyObject(d)) "inline" === ("none" === u ? j(e.nodeName) : u) && (p.display = u);
            else
                for (i in (f ? "hidden" in f && (h = f.hidden) : (f = he._data(e, "fxshow", {})),
                r && (f.hidden = !h),
                h
                    ? he(e).show()
                    : c.done(function () {
                          he(e).hide();
                      }),
                c.done(function () {
                    var t;
                    for (t in (he._removeData(e, "fxshow"), d)) he.style(e, t, d[t]);
                }),
                d))
                    (s = R(h ? f[i] : 0, i, c)), i in f || ((f[i] = s.start), h && ((s.end = s.start), (s.start = "width" === i || "height" === i ? 1 : 0)));
        }
        function W(e, t) {
            var n, i, o, r, s;
            for (n in e)
                if (((o = t[(i = he.camelCase(n))]), (r = e[n]), he.isArray(r) && ((o = r[1]), (r = e[n] = r[0])), n !== i && ((e[i] = r), delete e[n]), (s = he.cssHooks[i]) && "expand" in s))
                    for (n in ((r = s.expand(r)), delete e[i], r)) n in e || ((e[n] = r[n]), (t[n] = o));
                else t[i] = o;
        }
        function z(e, t, n) {
            var i,
                o,
                r = 0,
                s = z.prefilters.length,
                a = he.Deferred().always(function () {
                    delete l.elem;
                }),
                l = function () {
                    if (o) return !1;
                    for (var t = St || H(), n = Math.max(0, u.startTime + u.duration - t), i = 1 - (n / u.duration || 0), r = 0, s = u.tweens.length; r < s; r++) u.tweens[r].run(i);
                    return a.notifyWith(e, [u, i, n]), i < 1 && s ? n : (a.resolveWith(e, [u]), !1);
                },
                u = a.promise({
                    elem: e,
                    props: he.extend({}, t),
                    opts: he.extend(!0, { specialEasing: {}, easing: he.easing._default }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: St || H(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                        var i = he.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(i), i;
                    },
                    stop: function (t) {
                        var n = 0,
                            i = t ? u.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; n < i; n++) u.tweens[n].run(1);
                        return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this;
                    },
                }),
                c = u.props;
            for (W(c, u.opts.specialEasing); r < s; r++) if ((i = z.prefilters[r].call(u, e, c, u.opts))) return he.isFunction(i.stop) && (he._queueHooks(u.elem, u.opts.queue).stop = he.proxy(i.stop, i)), i;
            return (
                he.map(c, R, u),
                he.isFunction(u.opts.start) && u.opts.start.call(e, u),
                he.fx.timer(he.extend(l, { elem: e, anim: u, queue: u.opts.queue })),
                u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            );
        }
        function B(e) {
            return he.attr(e, "class") || "";
        }
        function V(e) {
            return function (t, n) {
                "string" != typeof t && ((n = t), (t = "*"));
                var i,
                    o = 0,
                    r = t.toLowerCase().match(je) || [];
                if (he.isFunction(n)) for (; (i = r[o++]); ) "+" === i.charAt(0) ? ((i = i.slice(1) || "*"), (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
            };
        }
        function U(e, t, n, i) {
            function o(a) {
                var l;
                return (
                    (r[a] = !0),
                    he.each(e[a] || [], function (e, a) {
                        var u = a(t, n, i);
                        return "string" != typeof u || s || r[u] ? (s ? !(l = u) : void 0) : (t.dataTypes.unshift(u), o(u), !1);
                    }),
                    l
                );
            }
            var r = {},
                s = e === Jt;
            return o(t.dataTypes[0]) || (!r["*"] && o("*"));
        }
        function G(e, t) {
            var n,
                i,
                o = he.ajaxSettings.flatOptions || {};
            for (i in t) t[i] !== undefined && ((o[i] ? e : n || (n = {}))[i] = t[i]);
            return n && he.extend(!0, e, n), e;
        }
        function Q(e, t, n) {
            for (var i, o, r, s, a = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), o === undefined && (o = e.mimeType || t.getResponseHeader("Content-Type"));
            if (o)
                for (s in a)
                    if (a[s] && a[s].test(o)) {
                        l.unshift(s);
                        break;
                    }
            if (l[0] in n) r = l[0];
            else {
                for (s in n) {
                    if (!l[0] || e.converters[s + " " + l[0]]) {
                        r = s;
                        break;
                    }
                    i || (i = s);
                }
                r = r || i;
            }
            if (r) return r !== l[0] && l.unshift(r), n[r];
        }
        function X(e, t, n, i) {
            var o,
                r,
                s,
                a,
                l,
                u = {},
                c = e.dataTypes.slice();
            if (c[1]) for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
            for (r = c.shift(); r; )
                if ((e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = r), (r = c.shift())))
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                        if (!(s = u[l + " " + r] || u["* " + r]))
                            for (o in u)
                                if ((a = o.split(" "))[1] === r && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                                    !0 === s ? (s = u[o]) : !0 !== u[o] && ((r = a[0]), c.unshift(a[1]));
                                    break;
                                }
                        if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else
                                try {
                                    t = s(t);
                                } catch (d) {
                                    return { state: "parsererror", error: s ? d : "No conversion from " + l + " to " + r };
                                }
                    }
            return { state: "success", data: t };
        }
        function Y(e) {
            return (e.style && e.style.display) || he.css(e, "display");
        }
        function K(e) {
            for (; e && 1 === e.nodeType; ) {
                if ("none" === Y(e) || "hidden" === e.type) return !0;
                e = e.parentNode;
            }
            return !1;
        }
        function Z(e, t, n, i) {
            var o;
            if (he.isArray(t))
                he.each(t, function (t, o) {
                    n || rn.test(e) ? i(e, o) : Z(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i);
                });
            else if (n || "object" !== he.type(t)) i(e, t);
            else for (o in t) Z(e + "[" + o + "]", t[o], n, i);
        }
        function J() {
            try {
                return new e.XMLHttpRequest();
            } catch (t) {}
        }
        function ee() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP");
            } catch (t) {}
        }
        function te(e) {
            return he.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow);
        }
        var ne = [],
            ie = e.document,
            oe = ne.slice,
            re = ne.concat,
            se = ne.push,
            ae = ne.indexOf,
            le = {},
            ue = le.toString,
            ce = le.hasOwnProperty,
            de = {},
            pe = "1.12.1",
            he = function (e, t) {
                return new he.fn.init(e, t);
            },
            fe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            me = /^-ms-/,
            ge = /-([\da-z])/gi,
            ve = function (e, t) {
                return t.toUpperCase();
            };
        (he.fn = he.prototype = {
            jquery: pe,
            constructor: he,
            selector: "",
            length: 0,
            toArray: function () {
                return oe.call(this);
            },
            get: function (e) {
                return null != e ? (e < 0 ? this[e + this.length] : this[e]) : oe.call(this);
            },
            pushStack: function (e) {
                var t = he.merge(this.constructor(), e);
                return (t.prevObject = this), (t.context = this.context), t;
            },
            each: function (e) {
                return he.each(this, e);
            },
            map: function (e) {
                return this.pushStack(
                    he.map(this, function (t, n) {
                        return e.call(t, n, t);
                    })
                );
            },
            slice: function () {
                return this.pushStack(oe.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: se,
            sort: ne.sort,
            splice: ne.splice,
        }),
            (he.extend = he.fn.extend = function () {
                var e,
                    t,
                    n,
                    i,
                    o,
                    r,
                    s = arguments[0] || {},
                    a = 1,
                    l = arguments.length,
                    u = !1;
                for ("boolean" == typeof s && ((u = s), (s = arguments[a] || {}), a++), "object" == typeof s || he.isFunction(s) || (s = {}), a === l && ((s = this), a--); a < l; a++)
                    if (null != (o = arguments[a]))
                        for (i in o)
                            (e = s[i]),
                                s !== (n = o[i]) &&
                                    (u && n && (he.isPlainObject(n) || (t = he.isArray(n)))
                                        ? (t ? ((t = !1), (r = e && he.isArray(e) ? e : [])) : (r = e && he.isPlainObject(e) ? e : {}), (s[i] = he.extend(u, r, n)))
                                        : n !== undefined && (s[i] = n));
                return s;
            }),
            he.extend({
                expando: "jQuery" + (pe + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (e) {
                    throw new Error(e);
                },
                noop: function () {},
                isFunction: function (e) {
                    return "function" === he.type(e);
                },
                isArray:
                    Array.isArray ||
                    function (e) {
                        return "array" === he.type(e);
                    },
                isWindow: function (e) {
                    return null != e && e == e.window;
                },
                isNumeric: function (e) {
                    var t = e && e.toString();
                    return !he.isArray(e) && t - parseFloat(t) + 1 >= 0;
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e) return !1;
                    return !0;
                },
                isPlainObject: function (e) {
                    var t;
                    if (!e || "object" !== he.type(e) || e.nodeType || he.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                    } catch (n) {
                        return !1;
                    }
                    if (!de.ownFirst) for (t in e) return ce.call(e, t);
                    for (t in e);
                    return t === undefined || ce.call(e, t);
                },
                type: function (e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e;
                },
                globalEval: function (t) {
                    t &&
                        he.trim(t) &&
                        (
                            e.execScript ||
                            function (t) {
                                e.eval.call(e, t);
                            }
                        )(t);
                },
                camelCase: function (e) {
                    return e.replace(me, "ms-").replace(ge, ve);
                },
                nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                },
                each: function (e, t) {
                    var i,
                        o = 0;
                    if (n(e)) for (i = e.length; o < i && !1 !== t.call(e[o], o, e[o]); o++);
                    else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
                    return e;
                },
                trim: function (e) {
                    return null == e ? "" : (e + "").replace(fe, "");
                },
                makeArray: function (e, t) {
                    var i = t || [];
                    return null != e && (n(Object(e)) ? he.merge(i, "string" == typeof e ? [e] : e) : se.call(i, e)), i;
                },
                inArray: function (e, t, n) {
                    var i;
                    if (t) {
                        if (ae) return ae.call(t, e, n);
                        for (i = t.length, n = n ? (n < 0 ? Math.max(0, i + n) : n) : 0; n < i; n++) if (n in t && t[n] === e) return n;
                    }
                    return -1;
                },
                merge: function (e, t) {
                    for (var n = +t.length, i = 0, o = e.length; i < n; ) e[o++] = t[i++];
                    if (n != n) for (; t[i] !== undefined; ) e[o++] = t[i++];
                    return (e.length = o), e;
                },
                grep: function (e, t, n) {
                    for (var i = [], o = 0, r = e.length, s = !n; o < r; o++) !t(e[o], o) !== s && i.push(e[o]);
                    return i;
                },
                map: function (e, t, i) {
                    var o,
                        r,
                        s = 0,
                        a = [];
                    if (n(e)) for (o = e.length; s < o; s++) null != (r = t(e[s], s, i)) && a.push(r);
                    else for (s in e) null != (r = t(e[s], s, i)) && a.push(r);
                    return re.apply([], a);
                },
                guid: 1,
                proxy: function (e, t) {
                    var n, i, o;
                    return (
                        "string" == typeof t && ((o = e[t]), (t = e), (e = o)),
                        he.isFunction(e)
                            ? ((n = oe.call(arguments, 2)),
                              ((i = function () {
                                  return e.apply(t || this, n.concat(oe.call(arguments)));
                              }).guid = e.guid = e.guid || he.guid++),
                              i)
                            : undefined
                    );
                },
                now: function () {
                    return +new Date();
                },
                support: de,
            }),
            "function" == typeof Symbol && (he.fn[Symbol.iterator] = ne[Symbol.iterator]),
            he.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                le["[object " + t + "]"] = t.toLowerCase();
            });
        var ye =
            /*!
             * Sizzle CSS Selector Engine v2.2.1
             * http://sizzlejs.com/
             *
             * Copyright jQuery Foundation and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2015-10-17
             */
            (function (e) {
                function t(e, t, n, i) {
                    var o,
                        r,
                        s,
                        a,
                        l,
                        u,
                        d,
                        h,
                        f = t && t.ownerDocument,
                        m = t ? t.nodeType : 9;
                    if (((n = n || []), "string" != typeof e || !e || (1 !== m && 9 !== m && 11 !== m))) return n;
                    if (!i && ((t ? t.ownerDocument || t : R) !== D && N(t), (t = t || D), O)) {
                        if (11 !== m && (u = ve.exec(e)))
                            if ((o = u[1])) {
                                if (9 === m) {
                                    if (!(s = t.getElementById(o))) return n;
                                    if (s.id === o) return n.push(s), n;
                                } else if (f && (s = f.getElementById(o)) && H(t, s) && s.id === o) return n.push(s), n;
                            } else {
                                if (u[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                                if ((o = u[3]) && x.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(o)), n;
                            }
                        if (x.qsa && !V[e + " "] && (!L || !L.test(e))) {
                            if (1 !== m) (f = t), (h = e);
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((a = t.getAttribute("id")) ? (a = a.replace(be, "\\$&")) : t.setAttribute("id", (a = M)), r = (d = T(e)).length, l = pe.test(a) ? "#" + a : "[id='" + a + "']"; r--; ) d[r] = l + " " + p(d[r]);
                                (h = d.join(",")), (f = (ye.test(e) && c(t.parentNode)) || t);
                            }
                            if (h)
                                try {
                                    return Z.apply(n, f.querySelectorAll(h)), n;
                                } catch (g) {
                                } finally {
                                    a === M && t.removeAttribute("id");
                                }
                        }
                    }
                    return S(e.replace(ae, "$1"), t, n, i);
                }
                function n() {
                    function e(n, i) {
                        return t.push(n + " ") > $.cacheLength && delete e[t.shift()], (e[n + " "] = i);
                    }
                    var t = [];
                    return e;
                }
                function i(e) {
                    return (e[M] = !0), e;
                }
                function o(e) {
                    var t = D.createElement("div");
                    try {
                        return !!e(t);
                    } catch (n) {
                        return !1;
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), (t = null);
                    }
                }
                function r(e, t) {
                    for (var n = e.split("|"), i = n.length; i--; ) $.attrHandle[n[i]] = t;
                }
                function s(e, t) {
                    var n = t && e,
                        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
                    if (i) return i;
                    if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                    return e ? 1 : -1;
                }
                function a(e) {
                    return function (t) {
                        return "input" === t.nodeName.toLowerCase() && t.type === e;
                    };
                }
                function l(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e;
                    };
                }
                function u(e) {
                    return i(function (t) {
                        return (
                            (t = +t),
                            i(function (n, i) {
                                for (var o, r = e([], n.length, t), s = r.length; s--; ) n[(o = r[s])] && (n[o] = !(i[o] = n[o]));
                            })
                        );
                    });
                }
                function c(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e;
                }
                function d() {}
                function p(e) {
                    for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                    return i;
                }
                function h(e, t, n) {
                    var i = t.dir,
                        o = n && "parentNode" === i,
                        r = W++;
                    return t.first
                        ? function (t, n, r) {
                              for (; (t = t[i]); ) if (1 === t.nodeType || o) return e(t, n, r);
                          }
                        : function (t, n, s) {
                              var a,
                                  l,
                                  u,
                                  c = [F, r];
                              if (s) {
                                  for (; (t = t[i]); ) if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
                              } else
                                  for (; (t = t[i]); )
                                      if (1 === t.nodeType || o) {
                                          if ((a = (l = (u = t[M] || (t[M] = {}))[t.uniqueID] || (u[t.uniqueID] = {}))[i]) && a[0] === F && a[1] === r) return (c[2] = a[2]);
                                          if (((l[i] = c), (c[2] = e(t, n, s)))) return !0;
                                      }
                          };
                }
                function f(e) {
                    return e.length > 1
                        ? function (t, n, i) {
                              for (var o = e.length; o--; ) if (!e[o](t, n, i)) return !1;
                              return !0;
                          }
                        : e[0];
                }
                function m(e, n, i) {
                    for (var o = 0, r = n.length; o < r; o++) t(e, n[o], i);
                    return i;
                }
                function g(e, t, n, i, o) {
                    for (var r, s = [], a = 0, l = e.length, u = null != t; a < l; a++) (r = e[a]) && ((n && !n(r, i, o)) || (s.push(r), u && t.push(a)));
                    return s;
                }
                function v(e, t, n, o, r, s) {
                    return (
                        o && !o[M] && (o = v(o)),
                        r && !r[M] && (r = v(r, s)),
                        i(function (i, s, a, l) {
                            var u,
                                c,
                                d,
                                p = [],
                                h = [],
                                f = s.length,
                                v = i || m(t || "*", a.nodeType ? [a] : a, []),
                                y = !e || (!i && t) ? v : g(v, p, e, a, l),
                                b = n ? (r || (i ? e : f || o) ? [] : s) : y;
                            if ((n && n(y, b, a, l), o)) for (u = g(b, h), o(u, [], a, l), c = u.length; c--; ) (d = u[c]) && (b[h[c]] = !(y[h[c]] = d));
                            if (i) {
                                if (r || e) {
                                    if (r) {
                                        for (u = [], c = b.length; c--; ) (d = b[c]) && u.push((y[c] = d));
                                        r(null, (b = []), u, l);
                                    }
                                    for (c = b.length; c--; ) (d = b[c]) && (u = r ? ee(i, d) : p[c]) > -1 && (i[u] = !(s[u] = d));
                                }
                            } else (b = g(b === s ? b.splice(f, b.length) : b)), r ? r(null, s, b, l) : Z.apply(s, b);
                        })
                    );
                }
                function y(e) {
                    for (
                        var t,
                            n,
                            i,
                            o = e.length,
                            r = $.relative[e[0].type],
                            s = r || $.relative[" "],
                            a = r ? 1 : 0,
                            l = h(
                                function (e) {
                                    return e === t;
                                },
                                s,
                                !0
                            ),
                            u = h(
                                function (e) {
                                    return ee(t, e) > -1;
                                },
                                s,
                                !0
                            ),
                            c = [
                                function (e, n, i) {
                                    var o = (!r && (i || n !== E)) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                                    return (t = null), o;
                                },
                            ];
                        a < o;
                        a++
                    )
                        if ((n = $.relative[e[a].type])) c = [h(f(c), n)];
                        else {
                            if ((n = $.filter[e[a].type].apply(null, e[a].matches))[M]) {
                                for (i = ++a; i < o && !$.relative[e[i].type]; i++);
                                return v(a > 1 && f(c), a > 1 && p(e.slice(0, a - 1).concat({ value: " " === e[a - 2].type ? "*" : "" })).replace(ae, "$1"), n, a < i && y(e.slice(a, i)), i < o && y((e = e.slice(i))), i < o && p(e));
                            }
                            c.push(n);
                        }
                    return f(c);
                }
                function b(e, n) {
                    var o = n.length > 0,
                        r = e.length > 0,
                        s = function (i, s, a, l, u) {
                            var c,
                                d,
                                p,
                                h = 0,
                                f = "0",
                                m = i && [],
                                v = [],
                                y = E,
                                b = i || (r && $.find.TAG("*", u)),
                                w = (F += null == y ? 1 : Math.random() || 0.1),
                                x = b.length;
                            for (u && (E = s === D || s || u); f !== x && null != (c = b[f]); f++) {
                                if (r && c) {
                                    for (d = 0, s || c.ownerDocument === D || (N(c), (a = !O)); (p = e[d++]); )
                                        if (p(c, s || D, a)) {
                                            l.push(c);
                                            break;
                                        }
                                    u && (F = w);
                                }
                                o && ((c = !p && c) && h--, i && m.push(c));
                            }
                            if (((h += f), o && f !== h)) {
                                for (d = 0; (p = n[d++]); ) p(m, v, s, a);
                                if (i) {
                                    if (h > 0) for (; f--; ) m[f] || v[f] || (v[f] = Y.call(l));
                                    v = g(v);
                                }
                                Z.apply(l, v), u && !i && v.length > 0 && h + n.length > 1 && t.uniqueSort(l);
                            }
                            return u && ((F = w), (E = y)), m;
                        };
                    return o ? i(s) : s;
                }
                var w,
                    x,
                    $,
                    _,
                    C,
                    T,
                    k,
                    S,
                    E,
                    A,
                    j,
                    N,
                    D,
                    P,
                    O,
                    L,
                    I,
                    q,
                    H,
                    M = "sizzle" + 1 * new Date(),
                    R = e.document,
                    F = 0,
                    W = 0,
                    z = n(),
                    B = n(),
                    V = n(),
                    U = function (e, t) {
                        return e === t && (j = !0), 0;
                    },
                    G = 1 << 31,
                    Q = {}.hasOwnProperty,
                    X = [],
                    Y = X.pop,
                    K = X.push,
                    Z = X.push,
                    J = X.slice,
                    ee = function (e, t) {
                        for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
                        return -1;
                    },
                    te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ne = "[\\x20\\t\\r\\n\\f]",
                    ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                    re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                    se = new RegExp(ne + "+", "g"),
                    ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                    le = new RegExp("^" + ne + "*," + ne + "*"),
                    ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                    ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                    de = new RegExp(re),
                    pe = new RegExp("^" + ie + "$"),
                    he = {
                        ID: new RegExp("^#(" + ie + ")"),
                        CLASS: new RegExp("^\\.(" + ie + ")"),
                        TAG: new RegExp("^(" + ie + "|[*])"),
                        ATTR: new RegExp("^" + oe),
                        PSEUDO: new RegExp("^" + re),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + te + ")$", "i"),
                        needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i"),
                    },
                    fe = /^(?:input|select|textarea|button)$/i,
                    me = /^h\d$/i,
                    ge = /^[^{]+\{\s*\[native \w/,
                    ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ye = /[+~]/,
                    be = /'|\\/g,
                    we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                    xe = function (e, t, n) {
                        var i = "0x" + t - 65536;
                        return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
                    },
                    $e = function () {
                        N();
                    };
                try {
                    Z.apply((X = J.call(R.childNodes)), R.childNodes), X[R.childNodes.length].nodeType;
                } catch (_e) {
                    Z = {
                        apply: X.length
                            ? function (e, t) {
                                  K.apply(e, J.call(t));
                              }
                            : function (e, t) {
                                  for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                                  e.length = n - 1;
                              },
                    };
                }
                for (w in ((x = t.support = {}),
                (C = t.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName;
                }),
                (N = t.setDocument = function (e) {
                    var t,
                        n,
                        i = e ? e.ownerDocument || e : R;
                    return i !== D && 9 === i.nodeType && i.documentElement
                        ? ((P = (D = i).documentElement),
                          (O = !C(D)),
                          (n = D.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", $e, !1) : n.attachEvent && n.attachEvent("onunload", $e)),
                          (x.attributes = o(function (e) {
                              return (e.className = "i"), !e.getAttribute("className");
                          })),
                          (x.getElementsByTagName = o(function (e) {
                              return e.appendChild(D.createComment("")), !e.getElementsByTagName("*").length;
                          })),
                          (x.getElementsByClassName = ge.test(D.getElementsByClassName)),
                          (x.getById = o(function (e) {
                              return (P.appendChild(e).id = M), !D.getElementsByName || !D.getElementsByName(M).length;
                          })),
                          x.getById
                              ? (($.find.ID = function (e, t) {
                                    if ("undefined" != typeof t.getElementById && O) {
                                        var n = t.getElementById(e);
                                        return n ? [n] : [];
                                    }
                                }),
                                ($.filter.ID = function (e) {
                                    var t = e.replace(we, xe);
                                    return function (e) {
                                        return e.getAttribute("id") === t;
                                    };
                                }))
                              : (delete $.find.ID,
                                ($.filter.ID = function (e) {
                                    var t = e.replace(we, xe);
                                    return function (e) {
                                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                        return n && n.value === t;
                                    };
                                })),
                          ($.find.TAG = x.getElementsByTagName
                              ? function (e, t) {
                                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0;
                                }
                              : function (e, t) {
                                    var n,
                                        i = [],
                                        o = 0,
                                        r = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        for (; (n = r[o++]); ) 1 === n.nodeType && i.push(n);
                                        return i;
                                    }
                                    return r;
                                }),
                          ($.find.CLASS =
                              x.getElementsByClassName &&
                              function (e, t) {
                                  if ("undefined" != typeof t.getElementsByClassName && O) return t.getElementsByClassName(e);
                              }),
                          (I = []),
                          (L = []),
                          (x.qsa = ge.test(D.querySelectorAll)) &&
                              (o(function (e) {
                                  (P.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                      e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"),
                                      e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"),
                                      e.querySelectorAll("[id~=" + M + "-]").length || L.push("~="),
                                      e.querySelectorAll(":checked").length || L.push(":checked"),
                                      e.querySelectorAll("a#" + M + "+*").length || L.push(".#.+[+~]");
                              }),
                              o(function (e) {
                                  var t = D.createElement("input");
                                  t.setAttribute("type", "hidden"),
                                      e.appendChild(t).setAttribute("name", "D"),
                                      e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="),
                                      e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"),
                                      e.querySelectorAll("*,:x"),
                                      L.push(",.*:");
                              })),
                          (x.matchesSelector = ge.test((q = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector))) &&
                              o(function (e) {
                                  (x.disconnectedMatch = q.call(e, "div")), q.call(e, "[s!='']:x"), I.push("!=", re);
                              }),
                          (L = L.length && new RegExp(L.join("|"))),
                          (I = I.length && new RegExp(I.join("|"))),
                          (t = ge.test(P.compareDocumentPosition)),
                          (H =
                              t || ge.test(P.contains)
                                  ? function (e, t) {
                                        var n = 9 === e.nodeType ? e.documentElement : e,
                                            i = t && t.parentNode;
                                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
                                    }
                                  : function (e, t) {
                                        if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                        return !1;
                                    }),
                          (U = t
                              ? function (e, t) {
                                    if (e === t) return (j = !0), 0;
                                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return (
                                        n ||
                                        (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || (!x.sortDetached && t.compareDocumentPosition(e) === n)
                                            ? e === D || (e.ownerDocument === R && H(R, e))
                                                ? -1
                                                : t === D || (t.ownerDocument === R && H(R, t))
                                                ? 1
                                                : A
                                                ? ee(A, e) - ee(A, t)
                                                : 0
                                            : 4 & n
                                            ? -1
                                            : 1)
                                    );
                                }
                              : function (e, t) {
                                    if (e === t) return (j = !0), 0;
                                    var n,
                                        i = 0,
                                        o = e.parentNode,
                                        r = t.parentNode,
                                        a = [e],
                                        l = [t];
                                    if (!o || !r) return e === D ? -1 : t === D ? 1 : o ? -1 : r ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                                    if (o === r) return s(e, t);
                                    for (n = e; (n = n.parentNode); ) a.unshift(n);
                                    for (n = t; (n = n.parentNode); ) l.unshift(n);
                                    for (; a[i] === l[i]; ) i++;
                                    return i ? s(a[i], l[i]) : a[i] === R ? -1 : l[i] === R ? 1 : 0;
                                }),
                          D)
                        : D;
                }),
                (t.matches = function (e, n) {
                    return t(e, null, null, n);
                }),
                (t.matchesSelector = function (e, n) {
                    if (((e.ownerDocument || e) !== D && N(e), (n = n.replace(ce, "='$1']")), x.matchesSelector && O && !V[n + " "] && (!I || !I.test(n)) && (!L || !L.test(n))))
                        try {
                            var i = q.call(e, n);
                            if (i || x.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return i;
                        } catch (_e) {}
                    return t(n, D, null, [e]).length > 0;
                }),
                (t.contains = function (e, t) {
                    return (e.ownerDocument || e) !== D && N(e), H(e, t);
                }),
                (t.attr = function (e, t) {
                    (e.ownerDocument || e) !== D && N(e);
                    var n = $.attrHandle[t.toLowerCase()],
                        i = n && Q.call($.attrHandle, t.toLowerCase()) ? n(e, t, !O) : undefined;
                    return i !== undefined ? i : x.attributes || !O ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                }),
                (t.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e);
                }),
                (t.uniqueSort = function (e) {
                    var t,
                        n = [],
                        i = 0,
                        o = 0;
                    if (((j = !x.detectDuplicates), (A = !x.sortStable && e.slice(0)), e.sort(U), j)) {
                        for (; (t = e[o++]); ) t === e[o] && (i = n.push(o));
                        for (; i--; ) e.splice(n[i], 1);
                    }
                    return (A = null), e;
                }),
                (_ = t.getText = function (e) {
                    var t,
                        n = "",
                        i = 0,
                        o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += _(e);
                        } else if (3 === o || 4 === o) return e.nodeValue;
                    } else for (; (t = e[i++]); ) n += _(t);
                    return n;
                }),
                (($ = t.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: he,
                    attrHandle: {},
                    find: {},
                    relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                    preFilter: {
                        ATTR: function (e) {
                            return (e[1] = e[1].replace(we, xe)), (e[3] = (e[3] || e[4] || e[5] || "").replace(we, xe)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                        },
                        CHILD: function (e) {
                            return (
                                (e[1] = e[1].toLowerCase()),
                                "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && t.error(e[0]),
                                e
                            );
                        },
                        PSEUDO: function (e) {
                            var t,
                                n = !e[6] && e[2];
                            return he.CHILD.test(e[0])
                                ? null
                                : (e[3] ? (e[2] = e[4] || e[5] || "") : n && de.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                        },
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(we, xe).toLowerCase();
                            return "*" === e
                                ? function () {
                                      return !0;
                                  }
                                : function (e) {
                                      return e.nodeName && e.nodeName.toLowerCase() === t;
                                  };
                        },
                        CLASS: function (e) {
                            var t = z[e + " "];
                            return (
                                t ||
                                ((t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) &&
                                    z(e, function (e) {
                                        return t.test(("string" == typeof e.className && e.className) || ("undefined" != typeof e.getAttribute && e.getAttribute("class")) || "");
                                    }))
                            );
                        },
                        ATTR: function (e, n, i) {
                            return function (o) {
                                var r = t.attr(o, e);
                                return null == r
                                    ? "!=" === n
                                    : !n ||
                                          ((r += ""),
                                          "=" === n
                                              ? r === i
                                              : "!=" === n
                                              ? r !== i
                                              : "^=" === n
                                              ? i && 0 === r.indexOf(i)
                                              : "*=" === n
                                              ? i && r.indexOf(i) > -1
                                              : "$=" === n
                                              ? i && r.slice(-i.length) === i
                                              : "~=" === n
                                              ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1
                                              : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"));
                            };
                        },
                        CHILD: function (e, t, n, i, o) {
                            var r = "nth" !== e.slice(0, 3),
                                s = "last" !== e.slice(-4),
                                a = "of-type" === t;
                            return 1 === i && 0 === o
                                ? function (e) {
                                      return !!e.parentNode;
                                  }
                                : function (t, n, l) {
                                      var u,
                                          c,
                                          d,
                                          p,
                                          h,
                                          f,
                                          m = r !== s ? "nextSibling" : "previousSibling",
                                          g = t.parentNode,
                                          v = a && t.nodeName.toLowerCase(),
                                          y = !l && !a,
                                          b = !1;
                                      if (g) {
                                          if (r) {
                                              for (; m; ) {
                                                  for (p = t; (p = p[m]); ) if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                                  f = m = "only" === e && !f && "nextSibling";
                                              }
                                              return !0;
                                          }
                                          if (((f = [s ? g.firstChild : g.lastChild]), s && y)) {
                                              for (
                                                  b = (h = (u = (c = (d = (p = g)[M] || (p[M] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === F && u[1]) && u[2], p = h && g.childNodes[h];
                                                  (p = (++h && p && p[m]) || (b = h = 0) || f.pop());

                                              )
                                                  if (1 === p.nodeType && ++b && p === t) {
                                                      c[e] = [F, h, b];
                                                      break;
                                                  }
                                          } else if ((y && (b = h = (u = (c = (d = (p = t)[M] || (p[M] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === F && u[1]), !1 === b))
                                              for (
                                                  ;
                                                  (p = (++h && p && p[m]) || (b = h = 0) || f.pop()) &&
                                                  ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && ((c = (d = p[M] || (p[M] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] = [F, b]), p !== t));

                                              );
                                          return (b -= o) === i || (b % i == 0 && b / i >= 0);
                                      }
                                  };
                        },
                        PSEUDO: function (e, n) {
                            var o,
                                r = $.pseudos[e] || $.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return r[M]
                                ? r(n)
                                : r.length > 1
                                ? ((o = [e, e, "", n]),
                                  $.setFilters.hasOwnProperty(e.toLowerCase())
                                      ? i(function (e, t) {
                                            for (var i, o = r(e, n), s = o.length; s--; ) e[(i = ee(e, o[s]))] = !(t[i] = o[s]);
                                        })
                                      : function (e) {
                                            return r(e, 0, o);
                                        })
                                : r;
                        },
                    },
                    pseudos: {
                        not: i(function (e) {
                            var t = [],
                                n = [],
                                o = k(e.replace(ae, "$1"));
                            return o[M]
                                ? i(function (e, t, n, i) {
                                      for (var r, s = o(e, null, i, []), a = e.length; a--; ) (r = s[a]) && (e[a] = !(t[a] = r));
                                  })
                                : function (e, i, r) {
                                      return (t[0] = e), o(t, null, r, n), (t[0] = null), !n.pop();
                                  };
                        }),
                        has: i(function (e) {
                            return function (n) {
                                return t(e, n).length > 0;
                            };
                        }),
                        contains: i(function (e) {
                            return (
                                (e = e.replace(we, xe)),
                                function (t) {
                                    return (t.textContent || t.innerText || _(t)).indexOf(e) > -1;
                                }
                            );
                        }),
                        lang: i(function (e) {
                            return (
                                pe.test(e || "") || t.error("unsupported lang: " + e),
                                (e = e.replace(we, xe).toLowerCase()),
                                function (t) {
                                    var n;
                                    do {
                                        if ((n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1;
                                }
                            );
                        }),
                        target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id;
                        },
                        root: function (e) {
                            return e === P;
                        },
                        focus: function (e) {
                            return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                        },
                        enabled: function (e) {
                            return !1 === e.disabled;
                        },
                        disabled: function (e) {
                            return !0 === e.disabled;
                        },
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function (e) {
                            return !$.pseudos.empty(e);
                        },
                        header: function (e) {
                            return me.test(e.nodeName);
                        },
                        input: function (e) {
                            return fe.test(e.nodeName);
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return ("input" === t && "button" === e.type) || "button" === t;
                        },
                        text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                        },
                        first: u(function () {
                            return [0];
                        }),
                        last: u(function (e, t) {
                            return [t - 1];
                        }),
                        eq: u(function (e, t, n) {
                            return [n < 0 ? n + t : n];
                        }),
                        even: u(function (e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e;
                        }),
                        odd: u(function (e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e;
                        }),
                        lt: u(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; --i >= 0; ) e.push(i);
                            return e;
                        }),
                        gt: u(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                            return e;
                        }),
                    },
                }).pseudos.nth = $.pseudos.eq),
                { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                    $.pseudos[w] = a(w);
                for (w in { submit: !0, reset: !0 }) $.pseudos[w] = l(w);
                return (
                    (d.prototype = $.filters = $.pseudos),
                    ($.setFilters = new d()),
                    (T = t.tokenize = function (e, n) {
                        var i,
                            o,
                            r,
                            s,
                            a,
                            l,
                            u,
                            c = B[e + " "];
                        if (c) return n ? 0 : c.slice(0);
                        for (a = e, l = [], u = $.preFilter; a; ) {
                            for (s in ((i && !(o = le.exec(a))) || (o && (a = a.slice(o[0].length) || a), l.push((r = []))),
                            (i = !1),
                            (o = ue.exec(a)) && ((i = o.shift()), r.push({ value: i, type: o[0].replace(ae, " ") }), (a = a.slice(i.length))),
                            $.filter))
                                !(o = he[s].exec(a)) || (u[s] && !(o = u[s](o))) || ((i = o.shift()), r.push({ value: i, type: s, matches: o }), (a = a.slice(i.length)));
                            if (!i) break;
                        }
                        return n ? a.length : a ? t.error(e) : B(e, l).slice(0);
                    }),
                    (k = t.compile = function (e, t) {
                        var n,
                            i = [],
                            o = [],
                            r = V[e + " "];
                        if (!r) {
                            for (t || (t = T(e)), n = t.length; n--; ) (r = y(t[n]))[M] ? i.push(r) : o.push(r);
                            (r = V(e, b(o, i))).selector = e;
                        }
                        return r;
                    }),
                    (S = t.select = function (e, t, n, i) {
                        var o,
                            r,
                            s,
                            a,
                            l,
                            u = "function" == typeof e && e,
                            d = !i && T((e = u.selector || e));
                        if (((n = n || []), 1 === d.length)) {
                            if ((r = d[0] = d[0].slice(0)).length > 2 && "ID" === (s = r[0]).type && x.getById && 9 === t.nodeType && O && $.relative[r[1].type]) {
                                if (!(t = ($.find.ID(s.matches[0].replace(we, xe), t) || [])[0])) return n;
                                u && (t = t.parentNode), (e = e.slice(r.shift().value.length));
                            }
                            for (o = he.needsContext.test(e) ? 0 : r.length; o-- && ((s = r[o]), !$.relative[(a = s.type)]); )
                                if ((l = $.find[a]) && (i = l(s.matches[0].replace(we, xe), (ye.test(r[0].type) && c(t.parentNode)) || t))) {
                                    if ((r.splice(o, 1), !(e = i.length && p(r)))) return Z.apply(n, i), n;
                                    break;
                                }
                        }
                        return (u || k(e, d))(i, t, !O, n, !t || (ye.test(e) && c(t.parentNode)) || t), n;
                    }),
                    (x.sortStable = M.split("").sort(U).join("") === M),
                    (x.detectDuplicates = !!j),
                    N(),
                    (x.sortDetached = o(function (e) {
                        return 1 & e.compareDocumentPosition(D.createElement("div"));
                    })),
                    o(function (e) {
                        return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
                    }) ||
                        r("type|href|height|width", function (e, t, n) {
                            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                        }),
                    (x.attributes &&
                        o(function (e) {
                            return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                        })) ||
                        r("value", function (e, t, n) {
                            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
                        }),
                    o(function (e) {
                        return null == e.getAttribute("disabled");
                    }) ||
                        r(te, function (e, t, n) {
                            var i;
                            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                        }),
                    t
                );
            })(e);
        (he.find = ye), (he.expr = ye.selectors), (he.expr[":"] = he.expr.pseudos), (he.uniqueSort = he.unique = ye.uniqueSort), (he.text = ye.getText), (he.isXMLDoc = ye.isXML), (he.contains = ye.contains);
        var be = function (e, t, n) {
                for (var i = [], o = n !== undefined; (e = e[t]) && 9 !== e.nodeType; )
                    if (1 === e.nodeType) {
                        if (o && he(e).is(n)) break;
                        i.push(e);
                    }
                return i;
            },
            we = function (e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n;
            },
            xe = he.expr.match.needsContext,
            $e = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            _e = /^.[^:#\[\.,]*$/;
        (he.filter = function (e, t, n) {
            var i = t[0];
            return (
                n && (e = ":not(" + e + ")"),
                1 === t.length && 1 === i.nodeType
                    ? he.find.matchesSelector(i, e)
                        ? [i]
                        : []
                    : he.find.matches(
                          e,
                          he.grep(t, function (e) {
                              return 1 === e.nodeType;
                          })
                      )
            );
        }),
            he.fn.extend({
                find: function (e) {
                    var t,
                        n = [],
                        i = this,
                        o = i.length;
                    if ("string" != typeof e)
                        return this.pushStack(
                            he(e).filter(function () {
                                for (t = 0; t < o; t++) if (he.contains(i[t], this)) return !0;
                            })
                        );
                    for (t = 0; t < o; t++) he.find(e, i[t], n);
                    return ((n = this.pushStack(o > 1 ? he.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e), n;
                },
                filter: function (e) {
                    return this.pushStack(i(this, e || [], !1));
                },
                not: function (e) {
                    return this.pushStack(i(this, e || [], !0));
                },
                is: function (e) {
                    return !!i(this, "string" == typeof e && xe.test(e) ? he(e) : e || [], !1).length;
                },
            });
        var Ce,
            Te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        ((he.fn.init = function (e, t, n) {
            var i, o;
            if (!e) return this;
            if (((n = n || Ce), "string" == typeof e)) {
                if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Te.exec(e)) || (!i[1] && t)) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (((t = t instanceof he ? t[0] : t), he.merge(this, he.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), $e.test(i[1]) && he.isPlainObject(t)))
                        for (i in t) he.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this;
                }
                if ((o = ie.getElementById(i[2])) && o.parentNode) {
                    if (o.id !== i[2]) return Ce.find(e);
                    (this.length = 1), (this[0] = o);
                }
                return (this.context = ie), (this.selector = e), this;
            }
            return e.nodeType
                ? ((this.context = this[0] = e), (this.length = 1), this)
                : he.isFunction(e)
                ? "undefined" != typeof n.ready
                    ? n.ready(e)
                    : e(he)
                : (e.selector !== undefined && ((this.selector = e.selector), (this.context = e.context)), he.makeArray(e, this));
        }).prototype = he.fn),
            (Ce = he(ie));
        var ke = /^(?:parents|prev(?:Until|All))/,
            Se = { children: !0, contents: !0, next: !0, prev: !0 };
        he.fn.extend({
            has: function (e) {
                var t,
                    n = he(e, this),
                    i = n.length;
                return this.filter(function () {
                    for (t = 0; t < i; t++) if (he.contains(this, n[t])) return !0;
                });
            },
            closest: function (e, t) {
                for (var n, i = 0, o = this.length, r = [], s = xe.test(e) || "string" != typeof e ? he(e, t || this.context) : 0; i < o; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && he.find.matchesSelector(n, e))) {
                            r.push(n);
                            break;
                        }
                return this.pushStack(r.length > 1 ? he.uniqueSort(r) : r);
            },
            index: function (e) {
                return e ? ("string" == typeof e ? he.inArray(this[0], he(e)) : he.inArray(e.jquery ? e[0] : e, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (e, t) {
                return this.pushStack(he.uniqueSort(he.merge(this.get(), he(e, t))));
            },
            addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
        }),
            he.each(
                {
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null;
                    },
                    parents: function (e) {
                        return be(e, "parentNode");
                    },
                    parentsUntil: function (e, t, n) {
                        return be(e, "parentNode", n);
                    },
                    next: function (e) {
                        return o(e, "nextSibling");
                    },
                    prev: function (e) {
                        return o(e, "previousSibling");
                    },
                    nextAll: function (e) {
                        return be(e, "nextSibling");
                    },
                    prevAll: function (e) {
                        return be(e, "previousSibling");
                    },
                    nextUntil: function (e, t, n) {
                        return be(e, "nextSibling", n);
                    },
                    prevUntil: function (e, t, n) {
                        return be(e, "previousSibling", n);
                    },
                    siblings: function (e) {
                        return we((e.parentNode || {}).firstChild, e);
                    },
                    children: function (e) {
                        return we(e.firstChild);
                    },
                    contents: function (e) {
                        return he.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : he.merge([], e.childNodes);
                    },
                },
                function (e, t) {
                    he.fn[e] = function (n, i) {
                        var o = he.map(this, t, n);
                        return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = he.filter(i, o)), this.length > 1 && (Se[e] || (o = he.uniqueSort(o)), ke.test(e) && (o = o.reverse())), this.pushStack(o);
                    };
                }
            );
        var Ee,
            Ae,
            je = /\S+/g;
        for (Ae in ((he.Callbacks = function (e) {
            e = "string" == typeof e ? r(e) : he.extend({}, e);
            var t,
                n,
                i,
                o,
                s = [],
                a = [],
                l = -1,
                u = function () {
                    for (o = e.once, i = t = !0; a.length; l = -1) for (n = a.shift(); ++l < s.length; ) !1 === s[l].apply(n[0], n[1]) && e.stopOnFalse && ((l = s.length), (n = !1));
                    e.memory || (n = !1), (t = !1), o && (s = n ? [] : "");
                },
                c = {
                    add: function () {
                        return (
                            s &&
                                (n && !t && ((l = s.length - 1), a.push(n)),
                                (function i(t) {
                                    he.each(t, function (t, n) {
                                        he.isFunction(n) ? (e.unique && c.has(n)) || s.push(n) : n && n.length && "string" !== he.type(n) && i(n);
                                    });
                                })(arguments),
                                n && !t && u()),
                            this
                        );
                    },
                    remove: function () {
                        return (
                            he.each(arguments, function (e, t) {
                                for (var n; (n = he.inArray(t, s, n)) > -1; ) s.splice(n, 1), n <= l && l--;
                            }),
                            this
                        );
                    },
                    has: function (e) {
                        return e ? he.inArray(e, s) > -1 : s.length > 0;
                    },
                    empty: function () {
                        return s && (s = []), this;
                    },
                    disable: function () {
                        return (o = a = []), (s = n = ""), this;
                    },
                    disabled: function () {
                        return !s;
                    },
                    lock: function () {
                        return (o = !0), n || c.disable(), this;
                    },
                    locked: function () {
                        return !!o;
                    },
                    fireWith: function (e, n) {
                        return o || ((n = [e, (n = n || []).slice ? n.slice() : n]), a.push(n), t || u()), this;
                    },
                    fire: function () {
                        return c.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!i;
                    },
                };
            return c;
        }),
        he.extend({
            Deferred: function (e) {
                var t = [
                        ["resolve", "done", he.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", he.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", he.Callbacks("memory")],
                    ],
                    n = "pending",
                    i = {
                        state: function () {
                            return n;
                        },
                        always: function () {
                            return o.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var e = arguments;
                            return he
                                .Deferred(function (n) {
                                    he.each(t, function (t, r) {
                                        var s = he.isFunction(e[t]) && e[t];
                                        o[r[1]](function () {
                                            var e = s && s.apply(this, arguments);
                                            e && he.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments);
                                        });
                                    }),
                                        (e = null);
                                })
                                .promise();
                        },
                        promise: function (e) {
                            return null != e ? he.extend(e, i) : i;
                        },
                    },
                    o = {};
                return (
                    (i.pipe = i.then),
                    he.each(t, function (e, r) {
                        var s = r[2],
                            a = r[3];
                        (i[r[1]] = s.add),
                            a &&
                                s.add(
                                    function () {
                                        n = a;
                                    },
                                    t[1 ^ e][2].disable,
                                    t[2][2].lock
                                ),
                            (o[r[0]] = function () {
                                return o[r[0] + "With"](this === o ? i : this, arguments), this;
                            }),
                            (o[r[0] + "With"] = s.fireWith);
                    }),
                    i.promise(o),
                    e && e.call(o, o),
                    o
                );
            },
            when: function (e) {
                var t,
                    n,
                    i,
                    o = 0,
                    r = oe.call(arguments),
                    s = r.length,
                    a = 1 !== s || (e && he.isFunction(e.promise)) ? s : 0,
                    l = 1 === a ? e : he.Deferred(),
                    u = function (e, n, i) {
                        return function (o) {
                            (n[e] = this), (i[e] = arguments.length > 1 ? oe.call(arguments) : o), i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i);
                        };
                    };
                if (s > 1) for (t = new Array(s), n = new Array(s), i = new Array(s); o < s; o++) r[o] && he.isFunction(r[o].promise) ? r[o].promise().progress(u(o, n, t)).done(u(o, i, r)).fail(l.reject) : --a;
                return a || l.resolveWith(i, r), l.promise();
            },
        }),
        (he.fn.ready = function (e) {
            return he.ready.promise().done(e), this;
        }),
        he.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? he.readyWait++ : he.ready(!0);
            },
            ready: function (e) {
                (!0 === e ? --he.readyWait : he.isReady) || ((he.isReady = !0), (!0 !== e && --he.readyWait > 0) || (Ee.resolveWith(ie, [he]), he.fn.triggerHandler && (he(ie).triggerHandler("ready"), he(ie).off("ready"))));
            },
        }),
        (he.ready.promise = function (t) {
            if (!Ee)
                if (((Ee = he.Deferred()), "complete" === ie.readyState || ("loading" !== ie.readyState && !ie.documentElement.doScroll))) e.setTimeout(he.ready);
                else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a);
                else {
                    ie.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
                    var n = !1;
                    try {
                        n = null == e.frameElement && ie.documentElement;
                    } catch (i) {}
                    n &&
                        n.doScroll &&
                        (function t() {
                            if (!he.isReady) {
                                try {
                                    n.doScroll("left");
                                } catch (i) {
                                    return e.setTimeout(t, 50);
                                }
                                s(), he.ready();
                            }
                        })();
                }
            return Ee.promise(t);
        }),
        he.ready.promise(),
        he(de)))
            break;
        (de.ownFirst = "0" === Ae),
            (de.inlineBlockNeedsLayout = !1),
            he(function () {
                var e, t, n, i;
                (n = ie.getElementsByTagName("body")[0]) &&
                    n.style &&
                    ((t = ie.createElement("div")),
                    ((i = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    n.appendChild(i).appendChild(t),
                    "undefined" != typeof t.style.zoom && ((t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth), e && (n.style.zoom = 1)),
                    n.removeChild(i));
            }),
            (function () {
                var e = ie.createElement("div");
                de.deleteExpando = !0;
                try {
                    delete e.test;
                } catch (t) {
                    de.deleteExpando = !1;
                }
                e = null;
            })();
        var Ne,
            De = function (e) {
                var t = he.noData[(e.nodeName + " ").toLowerCase()],
                    n = +e.nodeType || 1;
                return (1 === n || 9 === n) && (!t || (!0 !== t && e.getAttribute("classid") === t));
            },
            Pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Oe = /([A-Z])/g;
        he.extend({
            cache: {},
            noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
            hasData: function (e) {
                return !!(e = e.nodeType ? he.cache[e[he.expando]] : e[he.expando]) && !u(e);
            },
            data: function (e, t, n) {
                return c(e, t, n);
            },
            removeData: function (e, t) {
                return d(e, t);
            },
            _data: function (e, t, n) {
                return c(e, t, n, !0);
            },
            _removeData: function (e, t) {
                return d(e, t, !0);
            },
        }),
            he.fn.extend({
                data: function (e, t) {
                    var n,
                        i,
                        o,
                        r = this[0],
                        s = r && r.attributes;
                    if (e === undefined) {
                        if (this.length && ((o = he.data(r)), 1 === r.nodeType && !he._data(r, "parsedAttrs"))) {
                            for (n = s.length; n--; ) s[n] && 0 === (i = s[n].name).indexOf("data-") && l(r, (i = he.camelCase(i.slice(5))), o[i]);
                            he._data(r, "parsedAttrs", !0);
                        }
                        return o;
                    }
                    return "object" == typeof e
                        ? this.each(function () {
                              he.data(this, e);
                          })
                        : arguments.length > 1
                        ? this.each(function () {
                              he.data(this, e, t);
                          })
                        : r
                        ? l(r, e, he.data(r, e))
                        : undefined;
                },
                removeData: function (e) {
                    return this.each(function () {
                        he.removeData(this, e);
                    });
                },
            }),
            he.extend({
                queue: function (e, t, n) {
                    var i;
                    if (e) return (t = (t || "fx") + "queue"), (i = he._data(e, t)), n && (!i || he.isArray(n) ? (i = he._data(e, t, he.makeArray(n))) : i.push(n)), i || [];
                },
                dequeue: function (e, t) {
                    t = t || "fx";
                    var n = he.queue(e, t),
                        i = n.length,
                        o = n.shift(),
                        r = he._queueHooks(e, t),
                        s = function () {
                            he.dequeue(e, t);
                        };
                    "inprogress" === o && ((o = n.shift()), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire();
                },
                _queueHooks: function (e, t) {
                    var n = t + "queueHooks";
                    return (
                        he._data(e, n) ||
                        he._data(e, n, {
                            empty: he.Callbacks("once memory").add(function () {
                                he._removeData(e, t + "queue"), he._removeData(e, n);
                            }),
                        })
                    );
                },
            }),
            he.fn.extend({
                queue: function (e, t) {
                    var n = 2;
                    return (
                        "string" != typeof e && ((t = e), (e = "fx"), n--),
                        arguments.length < n
                            ? he.queue(this[0], e)
                            : t === undefined
                            ? this
                            : this.each(function () {
                                  var n = he.queue(this, e, t);
                                  he._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && he.dequeue(this, e);
                              })
                    );
                },
                dequeue: function (e) {
                    return this.each(function () {
                        he.dequeue(this, e);
                    });
                },
                clearQueue: function (e) {
                    return this.queue(e || "fx", []);
                },
                promise: function (e, t) {
                    var n,
                        i = 1,
                        o = he.Deferred(),
                        r = this,
                        s = this.length,
                        a = function () {
                            --i || o.resolveWith(r, [r]);
                        };
                    for ("string" != typeof e && ((t = e), (e = undefined)), e = e || "fx"; s--; ) (n = he._data(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                    return a(), o.promise(t);
                },
            }),
            (de.shrinkWrapBlocks = function () {
                return null != Ne
                    ? Ne
                    : ((Ne = !1),
                      (t = ie.getElementsByTagName("body")[0]) && t.style
                          ? ((e = ie.createElement("div")),
                            ((n = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                            t.appendChild(n).appendChild(e),
                            "undefined" != typeof e.style.zoom &&
                                ((e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                                (e.appendChild(ie.createElement("div")).style.width = "5px"),
                                (Ne = 3 !== e.offsetWidth)),
                            t.removeChild(n),
                            Ne)
                          : void 0);
                var e, t, n;
            });
        var Le,
            Ie,
            qe,
            He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Me = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
            Re = ["Top", "Right", "Bottom", "Left"],
            Fe = function (e, t) {
                return (e = t || e), "none" === he.css(e, "display") || !he.contains(e.ownerDocument, e);
            },
            We = function (e, t, n, i, o, r, s) {
                var a = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === he.type(n)) for (a in ((o = !0), n)) We(e, t, a, n[a], !0, r, s);
                else if (
                    i !== undefined &&
                    ((o = !0),
                    he.isFunction(i) || (s = !0),
                    u &&
                        (s
                            ? (t.call(e, i), (t = null))
                            : ((u = t),
                              (t = function (e, t, n) {
                                  return u.call(he(e), n);
                              }))),
                    t)
                )
                    for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
                return o ? e : u ? t.call(e) : l ? t(e[0], n) : r;
            },
            ze = /^(?:checkbox|radio)$/i,
            Be = /<([\w:-]+)/,
            Ve = /^$|\/(?:java|ecma)script/i,
            Ue = /^\s+/,
            Ge = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        (Le = ie.createElement("div")),
            (Ie = ie.createDocumentFragment()),
            (qe = ie.createElement("input")),
            (Le.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (de.leadingWhitespace = 3 === Le.firstChild.nodeType),
            (de.tbody = !Le.getElementsByTagName("tbody").length),
            (de.htmlSerialize = !!Le.getElementsByTagName("link").length),
            (de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML),
            (qe.type = "checkbox"),
            (qe.checked = !0),
            Ie.appendChild(qe),
            (de.appendChecked = qe.checked),
            (Le.innerHTML = "<textarea>x</textarea>"),
            (de.noCloneChecked = !!Le.cloneNode(!0).lastChild.defaultValue),
            Ie.appendChild(Le),
            (qe = ie.createElement("input")).setAttribute("type", "radio"),
            qe.setAttribute("checked", "checked"),
            qe.setAttribute("name", "t"),
            Le.appendChild(qe),
            (de.checkClone = Le.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (de.noCloneEvent = !!Le.addEventListener),
            (Le[he.expando] = 1),
            (de.attributes = !Le.getAttribute(he.expando));
        var Qe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
        };
        (Qe.optgroup = Qe.option), (Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead), (Qe.th = Qe.td);
        var Xe = /<|&#?\w+;/,
            Ye = /<tbody/i;
        !(function () {
            var t,
                n,
                i = ie.createElement("div");
            for (t in { submit: !0, change: !0, focusin: !0 }) (n = "on" + t), (de[t] = n in e) || (i.setAttribute(n, "t"), (de[t] = !1 === i.attributes[n].expando));
            i = null;
        })();
        var Ke = /^(?:input|select|textarea)$/i,
            Ze = /^key/,
            Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            et = /^(?:focusinfocus|focusoutblur)$/,
            tt = /^([^.]*)(?:\.(.+)|)/;
        (he.event = {
            global: {},
            add: function (e, t, n, i, o) {
                var r,
                    s,
                    a,
                    l,
                    u,
                    c,
                    d,
                    p,
                    h,
                    f,
                    m,
                    g = he._data(e);
                if (g) {
                    for (
                        n.handler && ((n = (l = n).handler), (o = l.selector)),
                            n.guid || (n.guid = he.guid++),
                            (s = g.events) || (s = g.events = {}),
                            (c = g.handle) ||
                                ((c = g.handle = function (e) {
                                    return void 0 === he || (e && he.event.triggered === e.type) ? undefined : he.event.dispatch.apply(c.elem, arguments);
                                }).elem = e),
                            a = (t = (t || "").match(je) || [""]).length;
                        a--;

                    )
                        (h = m = (r = tt.exec(t[a]) || [])[1]),
                            (f = (r[2] || "").split(".").sort()),
                            h &&
                                ((u = he.event.special[h] || {}),
                                (h = (o ? u.delegateType : u.bindType) || h),
                                (u = he.event.special[h] || {}),
                                (d = he.extend({ type: h, origType: m, data: i, handler: n, guid: n.guid, selector: o, needsContext: o && he.expr.match.needsContext.test(o), namespace: f.join(".") }, l)),
                                (p = s[h]) || (((p = s[h] = []).delegateCount = 0), (u.setup && !1 !== u.setup.call(e, i, f, c)) || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))),
                                u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)),
                                o ? p.splice(p.delegateCount++, 0, d) : p.push(d),
                                (he.event.global[h] = !0));
                    e = null;
                }
            },
            remove: function (e, t, n, i, o) {
                var r,
                    s,
                    a,
                    l,
                    u,
                    c,
                    d,
                    p,
                    h,
                    f,
                    m,
                    g = he.hasData(e) && he._data(e);
                if (g && (c = g.events)) {
                    for (u = (t = (t || "").match(je) || [""]).length; u--; )
                        if (((h = m = (a = tt.exec(t[u]) || [])[1]), (f = (a[2] || "").split(".").sort()), h)) {
                            for (d = he.event.special[h] || {}, p = c[(h = (i ? d.delegateType : d.bindType) || h)] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--; )
                                (s = p[r]),
                                    (!o && m !== s.origType) ||
                                        (n && n.guid !== s.guid) ||
                                        (a && !a.test(s.namespace)) ||
                                        (i && i !== s.selector && ("**" !== i || !s.selector)) ||
                                        (p.splice(r, 1), s.selector && p.delegateCount--, d.remove && d.remove.call(e, s));
                            l && !p.length && ((d.teardown && !1 !== d.teardown.call(e, f, g.handle)) || he.removeEvent(e, h, g.handle), delete c[h]);
                        } else for (h in c) he.event.remove(e, h + t[u], n, i, !0);
                    he.isEmptyObject(c) && (delete g.handle, he._removeData(e, "events"));
                }
            },
            trigger: function (t, n, i, o) {
                var r,
                    s,
                    a,
                    l,
                    u,
                    c,
                    d,
                    p = [i || ie],
                    h = ce.call(t, "type") ? t.type : t,
                    f = ce.call(t, "namespace") ? t.namespace.split(".") : [];
                if (
                    ((a = c = i = i || ie),
                    3 !== i.nodeType &&
                        8 !== i.nodeType &&
                        !et.test(h + he.event.triggered) &&
                        (h.indexOf(".") > -1 && ((h = (f = h.split(".")).shift()), f.sort()),
                        (s = h.indexOf(":") < 0 && "on" + h),
                        ((t = t[he.expando] ? t : new he.Event(h, "object" == typeof t && t)).isTrigger = o ? 2 : 3),
                        (t.namespace = f.join(".")),
                        (t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (t.result = undefined),
                        t.target || (t.target = i),
                        (n = null == n ? [t] : he.makeArray(n, [t])),
                        (u = he.event.special[h] || {}),
                        o || !u.trigger || !1 !== u.trigger.apply(i, n)))
                ) {
                    if (!o && !u.noBubble && !he.isWindow(i)) {
                        for (l = u.delegateType || h, et.test(l + h) || (a = a.parentNode); a; a = a.parentNode) p.push(a), (c = a);
                        c === (i.ownerDocument || ie) && p.push(c.defaultView || c.parentWindow || e);
                    }
                    for (d = 0; (a = p[d++]) && !t.isPropagationStopped(); )
                        (t.type = d > 1 ? l : u.bindType || h),
                            (r = (he._data(a, "events") || {})[t.type] && he._data(a, "handle")) && r.apply(a, n),
                            (r = s && a[s]) && r.apply && De(a) && ((t.result = r.apply(a, n)), !1 === t.result && t.preventDefault());
                    if (((t.type = h), !o && !t.isDefaultPrevented() && (!u._default || !1 === u._default.apply(p.pop(), n)) && De(i) && s && i[h] && !he.isWindow(i))) {
                        (c = i[s]) && (i[s] = null), (he.event.triggered = h);
                        try {
                            i[h]();
                        } catch (m) {}
                        (he.event.triggered = undefined), c && (i[s] = c);
                    }
                    return t.result;
                }
            },
            dispatch: function (e) {
                e = he.event.fix(e);
                var t,
                    n,
                    i,
                    o,
                    r,
                    s = [],
                    a = oe.call(arguments),
                    l = (he._data(this, "events") || {})[e.type] || [],
                    u = he.event.special[e.type] || {};
                if (((a[0] = e), (e.delegateTarget = this), !u.preDispatch || !1 !== u.preDispatch.call(this, e))) {
                    for (s = he.event.handlers.call(this, e, l), t = 0; (o = s[t++]) && !e.isPropagationStopped(); )
                        for (e.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                            (e.rnamespace && !e.rnamespace.test(r.namespace)) ||
                                ((e.handleObj = r), (e.data = r.data), (i = ((he.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) !== undefined && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result;
                }
            },
            handlers: function (e, t) {
                var n,
                    i,
                    o,
                    r,
                    s = [],
                    a = t.delegateCount,
                    l = e.target;
                if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                            for (i = [], n = 0; n < a; n++) i[(o = (r = t[n]).selector + " ")] === undefined && (i[o] = r.needsContext ? he(o, this).index(l) > -1 : he.find(o, this, null, [l]).length), i[o] && i.push(r);
                            i.length && s.push({ elem: l, handlers: i });
                        }
                return a < t.length && s.push({ elem: this, handlers: t.slice(a) }), s;
            },
            fix: function (e) {
                if (e[he.expando]) return e;
                var t,
                    n,
                    i,
                    o = e.type,
                    r = e,
                    s = this.fixHooks[o];
                for (s || (this.fixHooks[o] = s = Je.test(o) ? this.mouseHooks : Ze.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new he.Event(r), t = i.length; t--; ) e[(n = i[t])] = r[n];
                return e.target || (e.target = r.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), (e.metaKey = !!e.metaKey), s.filter ? s.filter(e, r) : e;
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
                },
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n,
                        i,
                        o,
                        r = t.button,
                        s = t.fromElement;
                    return (
                        null == e.pageX &&
                            null != t.clientX &&
                            ((o = (i = e.target.ownerDocument || ie).documentElement),
                            (n = i.body),
                            (e.pageX = t.clientX + ((o && o.scrollLeft) || (n && n.scrollLeft) || 0) - ((o && o.clientLeft) || (n && n.clientLeft) || 0)),
                            (e.pageY = t.clientY + ((o && o.scrollTop) || (n && n.scrollTop) || 0) - ((o && o.clientTop) || (n && n.clientTop) || 0))),
                        !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s),
                        e.which || r === undefined || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
                        e
                    );
                },
            },
            special: {
                load: { noBubble: !0 },
                focus: {
                    trigger: function () {
                        if (this !== w() && this.focus)
                            try {
                                return this.focus(), !1;
                            } catch (e) {}
                    },
                    delegateType: "focusin",
                },
                blur: {
                    trigger: function () {
                        if (this === w() && this.blur) return this.blur(), !1;
                    },
                    delegateType: "focusout",
                },
                click: {
                    trigger: function () {
                        if (he.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1;
                    },
                    _default: function (e) {
                        return he.nodeName(e.target, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (e) {
                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result);
                    },
                },
            },
            simulate: function (e, t, n) {
                var i = he.extend(new he.Event(), n, { type: e, isSimulated: !0 });
                he.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault();
            },
        }),
            (he.removeEvent = ie.removeEventListener
                ? function (e, t, n) {
                      e.removeEventListener && e.removeEventListener(t, n);
                  }
                : function (e, t, n) {
                      var i = "on" + t;
                      e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n));
                  }),
            (he.Event = function (e, t) {
                if (!(this instanceof he.Event)) return new he.Event(e, t);
                e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (e.defaultPrevented === undefined && !1 === e.returnValue) ? y : b)) : (this.type = e),
                    t && he.extend(this, t),
                    (this.timeStamp = (e && e.timeStamp) || he.now()),
                    (this[he.expando] = !0);
            }),
            (he.Event.prototype = {
                constructor: he.Event,
                isDefaultPrevented: b,
                isPropagationStopped: b,
                isImmediatePropagationStopped: b,
                preventDefault: function () {
                    var e = this.originalEvent;
                    (this.isDefaultPrevented = y), e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    (this.isPropagationStopped = y), e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    (this.isImmediatePropagationStopped = y), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
                },
            }),
            he.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
                he.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function (e) {
                        var n,
                            i = this,
                            o = e.relatedTarget,
                            r = e.handleObj;
                        return (o && (o === i || he.contains(i, o))) || ((e.type = r.origType), (n = r.handler.apply(this, arguments)), (e.type = t)), n;
                    },
                };
            }),
            de.submit ||
                (he.event.special.submit = {
                    setup: function () {
                        if (he.nodeName(this, "form")) return !1;
                        he.event.add(this, "click._submit keypress._submit", function (e) {
                            var t = e.target,
                                n = he.nodeName(t, "input") || he.nodeName(t, "button") ? he.prop(t, "form") : undefined;
                            n &&
                                !he._data(n, "submit") &&
                                (he.event.add(n, "submit._submit", function (e) {
                                    e._submitBubble = !0;
                                }),
                                he._data(n, "submit", !0));
                        });
                    },
                    postDispatch: function (e) {
                        e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && he.event.simulate("submit", this.parentNode, e));
                    },
                    teardown: function () {
                        if (he.nodeName(this, "form")) return !1;
                        he.event.remove(this, "._submit");
                    },
                }),
            de.change ||
                (he.event.special.change = {
                    setup: function () {
                        if (Ke.test(this.nodeName))
                            return (
                                ("checkbox" !== this.type && "radio" !== this.type) ||
                                    (he.event.add(this, "propertychange._change", function (e) {
                                        "checked" === e.originalEvent.propertyName && (this._justChanged = !0);
                                    }),
                                    he.event.add(this, "click._change", function (e) {
                                        this._justChanged && !e.isTrigger && (this._justChanged = !1), he.event.simulate("change", this, e);
                                    })),
                                !1
                            );
                        he.event.add(this, "beforeactivate._change", function (e) {
                            var t = e.target;
                            Ke.test(t.nodeName) &&
                                !he._data(t, "change") &&
                                (he.event.add(t, "change._change", function (e) {
                                    !this.parentNode || e.isSimulated || e.isTrigger || he.event.simulate("change", this.parentNode, e);
                                }),
                                he._data(t, "change", !0));
                        });
                    },
                    handle: function (e) {
                        var t = e.target;
                        if (this !== t || e.isSimulated || e.isTrigger || ("radio" !== t.type && "checkbox" !== t.type)) return e.handleObj.handler.apply(this, arguments);
                    },
                    teardown: function () {
                        return he.event.remove(this, "._change"), !Ke.test(this.nodeName);
                    },
                }),
            de.focusin ||
                he.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                    var n = function (e) {
                        he.event.simulate(t, e.target, he.event.fix(e));
                    };
                    he.event.special[t] = {
                        setup: function () {
                            var i = this.ownerDocument || this,
                                o = he._data(i, t);
                            o || i.addEventListener(e, n, !0), he._data(i, t, (o || 0) + 1);
                        },
                        teardown: function () {
                            var i = this.ownerDocument || this,
                                o = he._data(i, t) - 1;
                            o ? he._data(i, t, o) : (i.removeEventListener(e, n, !0), he._removeData(i, t));
                        },
                    };
                }),
            he.fn.extend({
                on: function (e, t, n, i) {
                    return x(this, e, t, n, i);
                },
                one: function (e, t, n, i) {
                    return x(this, e, t, n, i, 1);
                },
                off: function (e, t, n) {
                    var i, o;
                    if (e && e.preventDefault && e.handleObj) return (i = e.handleObj), he(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                    if ("object" == typeof e) {
                        for (o in e) this.off(o, t, e[o]);
                        return this;
                    }
                    return (
                        (!1 !== t && "function" != typeof t) || ((n = t), (t = undefined)),
                        !1 === n && (n = b),
                        this.each(function () {
                            he.event.remove(this, e, n, t);
                        })
                    );
                },
                trigger: function (e, t) {
                    return this.each(function () {
                        he.event.trigger(e, t, this);
                    });
                },
                triggerHandler: function (e, t) {
                    var n = this[0];
                    if (n) return he.event.trigger(e, t, n, !0);
                },
            });
        var nt = / jQuery\d+="(?:null|\d+)"/g,
            it = new RegExp("<(?:" + Ge + ")[\\s/>]", "i"),
            ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            rt = /<script|<style|<link/i,
            st = /checked\s*(?:[^=]|=\s*.checked.)/i,
            at = /^true\/(.*)/,
            lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ut = h(ie).appendChild(ie.createElement("div"));
        he.extend({
            htmlPrefilter: function (e) {
                return e.replace(ot, "<$1></$2>");
            },
            clone: function (e, t, n) {
                var i,
                    o,
                    r,
                    s,
                    a,
                    l = he.contains(e.ownerDocument, e);
                if (
                    (de.html5Clone || he.isXMLDoc(e) || !it.test("<" + e.nodeName + ">") ? (r = e.cloneNode(!0)) : ((ut.innerHTML = e.outerHTML), ut.removeChild((r = ut.firstChild))),
                    !((de.noCloneEvent && de.noCloneChecked) || (1 !== e.nodeType && 11 !== e.nodeType) || he.isXMLDoc(e)))
                )
                    for (i = f(r), a = f(e), s = 0; null != (o = a[s]); ++s) i[s] && k(o, i[s]);
                if (t)
                    if (n) for (a = a || f(e), i = i || f(r), s = 0; null != (o = a[s]); s++) T(o, i[s]);
                    else T(e, r);
                return (i = f(r, "script")).length > 0 && m(i, !l && f(e, "script")), (i = a = o = null), r;
            },
            cleanData: function (e, t) {
                for (var n, i, o, r, s = 0, a = he.expando, l = he.cache, u = de.attributes, c = he.event.special; null != (n = e[s]); s++)
                    if ((t || De(n)) && (r = (o = n[a]) && l[o])) {
                        if (r.events) for (i in r.events) c[i] ? he.event.remove(n, i) : he.removeEvent(n, i, r.handle);
                        l[o] && (delete l[o], u || "undefined" == typeof n.removeAttribute ? (n[a] = undefined) : n.removeAttribute(a), ne.push(o));
                    }
            },
        }),
            he.fn.extend({
                domManip: S,
                detach: function (e) {
                    return E(this, e, !0);
                },
                remove: function (e) {
                    return E(this, e);
                },
                text: function (e) {
                    return We(
                        this,
                        function (e) {
                            return e === undefined ? he.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || ie).createTextNode(e));
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                append: function () {
                    return S(this, arguments, function (e) {
                        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || $(this, e).appendChild(e);
                    });
                },
                prepend: function () {
                    return S(this, arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = $(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    });
                },
                before: function () {
                    return S(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    });
                },
                after: function () {
                    return S(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                    });
                },
                empty: function () {
                    for (var e, t = 0; null != (e = this[t]); t++) {
                        for (1 === e.nodeType && he.cleanData(f(e, !1)); e.firstChild; ) e.removeChild(e.firstChild);
                        e.options && he.nodeName(e, "select") && (e.options.length = 0);
                    }
                    return this;
                },
                clone: function (e, t) {
                    return (
                        (e = null != e && e),
                        (t = null == t ? e : t),
                        this.map(function () {
                            return he.clone(this, e, t);
                        })
                    );
                },
                html: function (e) {
                    return We(
                        this,
                        function (e) {
                            var t = this[0] || {},
                                n = 0,
                                i = this.length;
                            if (e === undefined) return 1 === t.nodeType ? t.innerHTML.replace(nt, "") : undefined;
                            if ("string" == typeof e && !rt.test(e) && (de.htmlSerialize || !it.test(e)) && (de.leadingWhitespace || !Ue.test(e)) && !Qe[(Be.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = he.htmlPrefilter(e);
                                try {
                                    for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (he.cleanData(f(t, !1)), (t.innerHTML = e));
                                    t = 0;
                                } catch (o) {}
                            }
                            t && this.empty().append(e);
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var e = [];
                    return S(
                        this,
                        arguments,
                        function (t) {
                            var n = this.parentNode;
                            he.inArray(this, e) < 0 && (he.cleanData(f(this)), n && n.replaceChild(t, this));
                        },
                        e
                    );
                },
            }),
            he.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
                he.fn[e] = function (e) {
                    for (var n, i = 0, o = [], r = he(e), s = r.length - 1; i <= s; i++) (n = i === s ? this : this.clone(!0)), he(r[i])[t](n), se.apply(o, n.get());
                    return this.pushStack(o);
                };
            });
        var ct,
            dt = { HTML: "block", BODY: "block" },
            pt = /^margin/,
            ht = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
            ft = function (e, t, n, i) {
                var o,
                    r,
                    s = {};
                for (r in t) (s[r] = e.style[r]), (e.style[r] = t[r]);
                for (r in ((o = n.apply(e, i || [])), t)) e.style[r] = s[r];
                return o;
            },
            mt = ie.documentElement;
        !(function () {
            function t() {
                var t,
                    c,
                    d = ie.documentElement;
                d.appendChild(l),
                    (u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
                    (n = o = a = !1),
                    (i = s = !0),
                    e.getComputedStyle &&
                        ((c = e.getComputedStyle(u)),
                        (n = "1%" !== (c || {}).top),
                        (a = "2px" === (c || {}).marginLeft),
                        (o = "4px" === (c || { width: "4px" }).width),
                        (u.style.marginRight = "50%"),
                        (i = "4px" === (c || { marginRight: "4px" }).marginRight),
                        ((t = u.appendChild(ie.createElement("div"))).style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                        (t.style.marginRight = t.style.width = "0"),
                        (u.style.width = "1px"),
                        (s = !parseFloat((e.getComputedStyle(t) || {}).marginRight)),
                        u.removeChild(t)),
                    (u.style.display = "none"),
                    (r = 0 === u.getClientRects().length) &&
                        ((u.style.display = ""),
                        (u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                        ((t = u.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                        (r = 0 === t[0].offsetHeight) && ((t[0].style.display = ""), (t[1].style.display = "none"), (r = 0 === t[0].offsetHeight))),
                    d.removeChild(l);
            }
            var n,
                i,
                o,
                r,
                s,
                a,
                l = ie.createElement("div"),
                u = ie.createElement("div");
            u.style &&
                ((u.style.cssText = "float:left;opacity:.5"),
                (de.opacity = "0.5" === u.style.opacity),
                (de.cssFloat = !!u.style.cssFloat),
                (u.style.backgroundClip = "content-box"),
                (u.cloneNode(!0).style.backgroundClip = ""),
                (de.clearCloneStyle = "content-box" === u.style.backgroundClip),
                ((l = ie.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                (u.innerHTML = ""),
                l.appendChild(u),
                (de.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing),
                he.extend(de, {
                    reliableHiddenOffsets: function () {
                        return null == n && t(), r;
                    },
                    boxSizingReliable: function () {
                        return null == n && t(), o;
                    },
                    pixelMarginRight: function () {
                        return null == n && t(), i;
                    },
                    pixelPosition: function () {
                        return null == n && t(), n;
                    },
                    reliableMarginRight: function () {
                        return null == n && t(), s;
                    },
                    reliableMarginLeft: function () {
                        return null == n && t(), a;
                    },
                }));
        })();
        var gt,
            vt,
            yt = /^(top|right|bottom|left)$/;
        e.getComputedStyle
            ? ((gt = function (t) {
                  var n = t.ownerDocument.defaultView;
                  return (n && n.opener) || (n = e), n.getComputedStyle(t);
              }),
              (vt = function (e, t, n) {
                  var i,
                      o,
                      r,
                      s,
                      a = e.style;
                  return (
                      ("" !== (s = (n = n || gt(e)) ? n.getPropertyValue(t) || n[t] : undefined) && s !== undefined) || he.contains(e.ownerDocument, e) || (s = he.style(e, t)),
                      n && !de.pixelMarginRight() && ht.test(s) && pt.test(t) && ((i = a.width), (o = a.minWidth), (r = a.maxWidth), (a.minWidth = a.maxWidth = a.width = s), (s = n.width), (a.width = i), (a.minWidth = o), (a.maxWidth = r)),
                      s === undefined ? s : s + ""
                  );
              }))
            : mt.currentStyle &&
              ((gt = function (e) {
                  return e.currentStyle;
              }),
              (vt = function (e, t, n) {
                  var i,
                      o,
                      r,
                      s,
                      a = e.style;
                  return (
                      null == (s = (n = n || gt(e)) ? n[t] : undefined) && a && a[t] && (s = a[t]),
                      ht.test(s) && !yt.test(t) && ((i = a.left), (r = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left), (a.left = "fontSize" === t ? "1em" : s), (s = a.pixelLeft + "px"), (a.left = i), r && (o.left = r)),
                      s === undefined ? s : s + "" || "auto"
                  );
              }));
        var bt = /alpha\([^)]*\)/i,
            wt = /opacity\s*=\s*([^)]*)/i,
            xt = /^(none|table(?!-c[ea]).+)/,
            $t = new RegExp("^(" + He + ")(.*)$", "i"),
            _t = { position: "absolute", visibility: "hidden", display: "block" },
            Ct = { letterSpacing: "0", fontWeight: "400" },
            Tt = ["Webkit", "O", "Moz", "ms"],
            kt = ie.createElement("div").style;
        he.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = vt(e, "opacity");
                            return "" === n ? "1" : n;
                        }
                    },
                },
            },
            cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { float: de.cssFloat ? "cssFloat" : "styleFloat" },
            style: function (e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o,
                        r,
                        s,
                        a = he.camelCase(t),
                        l = e.style;
                    if (((t = he.cssProps[a] || (he.cssProps[a] = D(a) || a)), (s = he.cssHooks[t] || he.cssHooks[a]), n === undefined)) return s && "get" in s && (o = s.get(e, !1, i)) !== undefined ? o : l[t];
                    if (
                        ("string" === (r = typeof n) && (o = Me.exec(n)) && o[1] && ((n = p(e, t, o)), (r = "number")),
                        null != n &&
                            n == n &&
                            ("number" === r && (n += (o && o[3]) || (he.cssNumber[a] ? "" : "px")),
                            de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                            !(s && "set" in s && (n = s.set(e, n, i)) === undefined)))
                    )
                        try {
                            l[t] = n;
                        } catch (u) {}
                }
            },
            css: function (e, t, n, i) {
                var o,
                    r,
                    s,
                    a = he.camelCase(t);
                return (
                    (t = he.cssProps[a] || (he.cssProps[a] = D(a) || a)),
                    (s = he.cssHooks[t] || he.cssHooks[a]) && "get" in s && (r = s.get(e, !0, n)),
                    r === undefined && (r = vt(e, t, i)),
                    "normal" === r && t in Ct && (r = Ct[t]),
                    "" === n || n ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r) : r
                );
            },
        }),
            he.each(["height", "width"], function (e, t) {
                he.cssHooks[t] = {
                    get: function (e, n, i) {
                        if (n)
                            return xt.test(he.css(e, "display")) && 0 === e.offsetWidth
                                ? ft(e, _t, function () {
                                      return I(e, t, i);
                                  })
                                : I(e, t, i);
                    },
                    set: function (e, n, i) {
                        var o = i && gt(e);
                        return O(e, n, i ? L(e, t, i, de.boxSizing && "border-box" === he.css(e, "boxSizing", !1, o), o) : 0);
                    },
                };
            }),
            de.opacity ||
                (he.cssHooks.opacity = {
                    get: function (e, t) {
                        return wt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
                    },
                    set: function (e, t) {
                        var n = e.style,
                            i = e.currentStyle,
                            o = he.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                            r = (i && i.filter) || n.filter || "";
                        (n.zoom = 1),
                            ((t >= 1 || "" === t) && "" === he.trim(r.replace(bt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || (i && !i.filter))) || (n.filter = bt.test(r) ? r.replace(bt, o) : r + " " + o);
                    },
                }),
            (he.cssHooks.marginRight = N(de.reliableMarginRight, function (e, t) {
                if (t) return ft(e, { display: "inline-block" }, vt, [e, "marginRight"]);
            })),
            (he.cssHooks.marginLeft = N(de.reliableMarginLeft, function (e, t) {
                if (t)
                    return (
                        (parseFloat(vt(e, "marginLeft")) ||
                            (he.contains(e.ownerDocument, e)
                                ? e.getBoundingClientRect().left -
                                  ft(e, { marginLeft: 0 }, function () {
                                      return e.getBoundingClientRect().left;
                                  })
                                : 0)) + "px"
                    );
            })),
            he.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
                (he.cssHooks[e + t] = {
                    expand: function (n) {
                        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + Re[i] + t] = r[i] || r[i - 2] || r[0];
                        return o;
                    },
                }),
                    pt.test(e) || (he.cssHooks[e + t].set = O);
            }),
            he.fn.extend({
                css: function (e, t) {
                    return We(
                        this,
                        function (e, t, n) {
                            var i,
                                o,
                                r = {},
                                s = 0;
                            if (he.isArray(t)) {
                                for (i = gt(e), o = t.length; s < o; s++) r[t[s]] = he.css(e, t[s], !1, i);
                                return r;
                            }
                            return n !== undefined ? he.style(e, t, n) : he.css(e, t);
                        },
                        e,
                        t,
                        arguments.length > 1
                    );
                },
                show: function () {
                    return P(this, !0);
                },
                hide: function () {
                    return P(this);
                },
                toggle: function (e) {
                    return "boolean" == typeof e
                        ? e
                            ? this.show()
                            : this.hide()
                        : this.each(function () {
                              Fe(this) ? he(this).show() : he(this).hide();
                          });
                },
            }),
            (he.Tween = q),
            (q.prototype = {
                constructor: q,
                init: function (e, t, n, i, o, r) {
                    (this.elem = e), (this.prop = n), (this.easing = o || he.easing._default), (this.options = t), (this.start = this.now = this.cur()), (this.end = i), (this.unit = r || (he.cssNumber[n] ? "" : "px"));
                },
                cur: function () {
                    var e = q.propHooks[this.prop];
                    return e && e.get ? e.get(this) : q.propHooks._default.get(this);
                },
                run: function (e) {
                    var t,
                        n = q.propHooks[this.prop];
                    return (
                        this.options.duration ? (this.pos = t = he.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e),
                        (this.now = (this.end - this.start) * t + this.start),
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        n && n.set ? n.set(this) : q.propHooks._default.set(this),
                        this
                    );
                },
            }),
            (q.prototype.init.prototype = q.prototype),
            (q.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        return 1 !== e.elem.nodeType || (null != e.elem[e.prop] && null == e.elem.style[e.prop]) ? e.elem[e.prop] : (t = he.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                    },
                    set: function (e) {
                        he.fx.step[e.prop] ? he.fx.step[e.prop](e) : 1 !== e.elem.nodeType || (null == e.elem.style[he.cssProps[e.prop]] && !he.cssHooks[e.prop]) ? (e.elem[e.prop] = e.now) : he.style(e.elem, e.prop, e.now + e.unit);
                    },
                },
            }),
            (q.propHooks.scrollTop = q.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                },
            }),
            (he.easing = {
                linear: function (e) {
                    return e;
                },
                swing: function (e) {
                    return 0.5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing",
            }),
            (he.fx = q.prototype.init),
            (he.fx.step = {});
        var St,
            Et,
            At = /^(?:toggle|show|hide)$/,
            jt = /queueHooks$/;
        (he.Animation = he.extend(z, {
            tweeners: {
                "*": [
                    function (e, t) {
                        var n = this.createTween(e, t);
                        return p(n.elem, e, Me.exec(t), n), n;
                    },
                ],
            },
            tweener: function (e, t) {
                he.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.match(je));
                for (var n, i = 0, o = e.length; i < o; i++) (n = e[i]), (z.tweeners[n] = z.tweeners[n] || []), z.tweeners[n].unshift(t);
            },
            prefilters: [F],
            prefilter: function (e, t) {
                t ? z.prefilters.unshift(e) : z.prefilters.push(e);
            },
        })),
            (he.speed = function (e, t, n) {
                var i = e && "object" == typeof e ? he.extend({}, e) : { complete: n || (!n && t) || (he.isFunction(e) && e), duration: e, easing: (n && t) || (t && !he.isFunction(t) && t) };
                return (
                    (i.duration = he.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in he.fx.speeds ? he.fx.speeds[i.duration] : he.fx.speeds._default),
                    (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
                    (i.old = i.complete),
                    (i.complete = function () {
                        he.isFunction(i.old) && i.old.call(this), i.queue && he.dequeue(this, i.queue);
                    }),
                    i
                );
            }),
            he.fn.extend({
                fadeTo: function (e, t, n, i) {
                    return this.filter(Fe).css("opacity", 0).show().end().animate({ opacity: t }, e, n, i);
                },
                animate: function (e, t, n, i) {
                    var o = he.isEmptyObject(e),
                        r = he.speed(t, n, i),
                        s = function () {
                            var t = z(this, he.extend({}, e), r);
                            (o || he._data(this, "finish")) && t.stop(!0);
                        };
                    return (s.finish = s), o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
                },
                stop: function (e, t, n) {
                    var i = function (e) {
                        var t = e.stop;
                        delete e.stop, t(n);
                    };
                    return (
                        "string" != typeof e && ((n = t), (t = e), (e = undefined)),
                        t && !1 !== e && this.queue(e || "fx", []),
                        this.each(function () {
                            var t = !0,
                                o = null != e && e + "queueHooks",
                                r = he.timers,
                                s = he._data(this);
                            if (o) s[o] && s[o].stop && i(s[o]);
                            else for (o in s) s[o] && s[o].stop && jt.test(o) && i(s[o]);
                            for (o = r.length; o--; ) r[o].elem !== this || (null != e && r[o].queue !== e) || (r[o].anim.stop(n), (t = !1), r.splice(o, 1));
                            (!t && n) || he.dequeue(this, e);
                        })
                    );
                },
                finish: function (e) {
                    return (
                        !1 !== e && (e = e || "fx"),
                        this.each(function () {
                            var t,
                                n = he._data(this),
                                i = n[e + "queue"],
                                o = n[e + "queueHooks"],
                                r = he.timers,
                                s = i ? i.length : 0;
                            for (n.finish = !0, he.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--; ) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                            for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
                            delete n.finish;
                        })
                    );
                },
            }),
            he.each(["toggle", "show", "hide"], function (e, t) {
                var n = he.fn[t];
                he.fn[t] = function (e, i, o) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, o);
                };
            }),
            he.each({ slideDown: M("show"), slideUp: M("hide"), slideToggle: M("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
                he.fn[e] = function (e, n, i) {
                    return this.animate(t, e, n, i);
                };
            }),
            (he.timers = []),
            (he.fx.tick = function () {
                var e,
                    t = he.timers,
                    n = 0;
                for (St = he.now(); n < t.length; n++) (e = t[n])() || t[n] !== e || t.splice(n--, 1);
                t.length || he.fx.stop(), (St = undefined);
            }),
            (he.fx.timer = function (e) {
                he.timers.push(e), e() ? he.fx.start() : he.timers.pop();
            }),
            (he.fx.interval = 13),
            (he.fx.start = function () {
                Et || (Et = e.setInterval(he.fx.tick, he.fx.interval));
            }),
            (he.fx.stop = function () {
                e.clearInterval(Et), (Et = null);
            }),
            (he.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (he.fn.delay = function (t, n) {
                return (
                    (t = (he.fx && he.fx.speeds[t]) || t),
                    (n = n || "fx"),
                    this.queue(n, function (n, i) {
                        var o = e.setTimeout(n, t);
                        i.stop = function () {
                            e.clearTimeout(o);
                        };
                    })
                );
            }),
            (function () {
                var e,
                    t = ie.createElement("input"),
                    n = ie.createElement("div"),
                    i = ie.createElement("select"),
                    o = i.appendChild(ie.createElement("option"));
                (n = ie.createElement("div")).setAttribute("className", "t"),
                    (n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                    (e = n.getElementsByTagName("a")[0]),
                    t.setAttribute("type", "checkbox"),
                    n.appendChild(t),
                    ((e = n.getElementsByTagName("a")[0]).style.cssText = "top:1px"),
                    (de.getSetAttribute = "t" !== n.className),
                    (de.style = /top/.test(e.getAttribute("style"))),
                    (de.hrefNormalized = "/a" === e.getAttribute("href")),
                    (de.checkOn = !!t.value),
                    (de.optSelected = o.selected),
                    (de.enctype = !!ie.createElement("form").enctype),
                    (i.disabled = !0),
                    (de.optDisabled = !o.disabled),
                    (t = ie.createElement("input")).setAttribute("value", ""),
                    (de.input = "" === t.getAttribute("value")),
                    (t.value = "t"),
                    t.setAttribute("type", "radio"),
                    (de.radioValue = "t" === t.value);
            })();
        var Nt = /\r/g;
        he.fn.extend({
            val: function (e) {
                var t,
                    n,
                    i,
                    o = this[0];
                return arguments.length
                    ? ((i = he.isFunction(e)),
                      this.each(function (n) {
                          var o;
                          1 === this.nodeType &&
                              (null == (o = i ? e.call(this, n, he(this).val()) : e)
                                  ? (o = "")
                                  : "number" == typeof o
                                  ? (o += "")
                                  : he.isArray(o) &&
                                    (o = he.map(o, function (e) {
                                        return null == e ? "" : e + "";
                                    })),
                              ((t = he.valHooks[this.type] || he.valHooks[this.nodeName.toLowerCase()]) && "set" in t && t.set(this, o, "value") !== undefined) || (this.value = o));
                      }))
                    : o
                    ? (t = he.valHooks[o.type] || he.valHooks[o.nodeName.toLowerCase()]) && "get" in t && (n = t.get(o, "value")) !== undefined
                        ? n
                        : "string" == typeof (n = o.value)
                        ? n.replace(Nt, "")
                        : null == n
                        ? ""
                        : n
                    : void 0;
            },
        }),
            he.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = he.find.attr(e, "value");
                            return null != t ? t : he.trim(he.text(e));
                        },
                    },
                    select: {
                        get: function (e) {
                            for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
                                if (((n = i[l]).selected || l === o) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !he.nodeName(n.parentNode, "optgroup"))) {
                                    if (((t = he(n).val()), r)) return t;
                                    s.push(t);
                                }
                            return s;
                        },
                        set: function (e, t) {
                            for (var n, i, o = e.options, r = he.makeArray(t), s = o.length; s--; )
                                if (((i = o[s]), he.inArray(he.valHooks.option.get(i), r) >= 0))
                                    try {
                                        i.selected = n = !0;
                                    } catch (a) {
                                        i.scrollHeight;
                                    }
                                else i.selected = !1;
                            return n || (e.selectedIndex = -1), o;
                        },
                    },
                },
            }),
            he.each(["radio", "checkbox"], function () {
                (he.valHooks[this] = {
                    set: function (e, t) {
                        if (he.isArray(t)) return (e.checked = he.inArray(he(e).val(), t) > -1);
                    },
                }),
                    de.checkOn ||
                        (he.valHooks[this].get = function (e) {
                            return null === e.getAttribute("value") ? "on" : e.value;
                        });
            });
        var Dt,
            Pt,
            Ot = he.expr.attrHandle,
            Lt = /^(?:checked|selected)$/i,
            It = de.getSetAttribute,
            qt = de.input;
        he.fn.extend({
            attr: function (e, t) {
                return We(this, he.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
                return this.each(function () {
                    he.removeAttr(this, e);
                });
            },
        }),
            he.extend({
                attr: function (e, t, n) {
                    var i,
                        o,
                        r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r)
                        return "undefined" == typeof e.getAttribute
                            ? he.prop(e, t, n)
                            : ((1 === r && he.isXMLDoc(e)) || ((t = t.toLowerCase()), (o = he.attrHooks[t] || (he.expr.match.bool.test(t) ? Pt : Dt))),
                              n !== undefined
                                  ? null === n
                                      ? void he.removeAttr(e, t)
                                      : o && "set" in o && (i = o.set(e, n, t)) !== undefined
                                      ? i
                                      : (e.setAttribute(t, n + ""), n)
                                  : o && "get" in o && null !== (i = o.get(e, t))
                                  ? i
                                  : null == (i = he.find.attr(e, t))
                                  ? undefined
                                  : i);
                },
                attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!de.radioValue && "radio" === t && he.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t;
                            }
                        },
                    },
                },
                removeAttr: function (e, t) {
                    var n,
                        i,
                        o = 0,
                        r = t && t.match(je);
                    if (r && 1 === e.nodeType)
                        for (; (n = r[o++]); )
                            (i = he.propFix[n] || n), he.expr.match.bool.test(n) ? ((qt && It) || !Lt.test(n) ? (e[i] = !1) : (e[he.camelCase("default-" + n)] = e[i] = !1)) : he.attr(e, n, ""), e.removeAttribute(It ? n : i);
                },
            }),
            (Pt = {
                set: function (e, t, n) {
                    return !1 === t ? he.removeAttr(e, n) : (qt && It) || !Lt.test(n) ? e.setAttribute((!It && he.propFix[n]) || n, n) : (e[he.camelCase("default-" + n)] = e[n] = !0), n;
                },
            }),
            he.each(he.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = Ot[t] || he.find.attr;
                (qt && It) || !Lt.test(t)
                    ? (Ot[t] = function (e, t, i) {
                          var o, r;
                          return i || ((r = Ot[t]), (Ot[t] = o), (o = null != n(e, t, i) ? t.toLowerCase() : null), (Ot[t] = r)), o;
                      })
                    : (Ot[t] = function (e, t, n) {
                          if (!n) return e[he.camelCase("default-" + t)] ? t.toLowerCase() : null;
                      });
            }),
            (qt && It) ||
                (he.attrHooks.value = {
                    set: function (e, t, n) {
                        if (!he.nodeName(e, "input")) return Dt && Dt.set(e, t, n);
                        e.defaultValue = t;
                    },
                }),
            It ||
                ((Dt = {
                    set: function (e, t, n) {
                        var i = e.getAttributeNode(n);
                        if ((i || e.setAttributeNode((i = e.ownerDocument.createAttribute(n))), (i.value = t += ""), "value" === n || t === e.getAttribute(n))) return t;
                    },
                }),
                (Ot.id = Ot.name = Ot.coords = function (e, t, n) {
                    var i;
                    if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null;
                }),
                (he.valHooks.button = {
                    get: function (e, t) {
                        var n = e.getAttributeNode(t);
                        if (n && n.specified) return n.value;
                    },
                    set: Dt.set,
                }),
                (he.attrHooks.contenteditable = {
                    set: function (e, t, n) {
                        Dt.set(e, "" !== t && t, n);
                    },
                }),
                he.each(["width", "height"], function (e, t) {
                    he.attrHooks[t] = {
                        set: function (e, n) {
                            if ("" === n) return e.setAttribute(t, "auto"), n;
                        },
                    };
                })),
            de.style ||
                (he.attrHooks.style = {
                    get: function (e) {
                        return e.style.cssText || undefined;
                    },
                    set: function (e, t) {
                        return (e.style.cssText = t + "");
                    },
                });
        var Ht = /^(?:input|select|textarea|button|object)$/i,
            Mt = /^(?:a|area)$/i;
        he.fn.extend({
            prop: function (e, t) {
                return We(this, he.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
                return (
                    (e = he.propFix[e] || e),
                    this.each(function () {
                        try {
                            (this[e] = undefined), delete this[e];
                        } catch (t) {}
                    })
                );
            },
        }),
            he.extend({
                prop: function (e, t, n) {
                    var i,
                        o,
                        r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r)
                        return (
                            (1 === r && he.isXMLDoc(e)) || ((t = he.propFix[t] || t), (o = he.propHooks[t])),
                            n !== undefined ? (o && "set" in o && (i = o.set(e, n, t)) !== undefined ? i : (e[t] = n)) : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
                        );
                },
                propHooks: {
                    tabIndex: {
                        get: function (e) {
                            var t = he.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : Ht.test(e.nodeName) || (Mt.test(e.nodeName) && e.href) ? 0 : -1;
                        },
                    },
                },
                propFix: { for: "htmlFor", class: "className" },
            }),
            de.hrefNormalized ||
                he.each(["href", "src"], function (e, t) {
                    he.propHooks[t] = {
                        get: function (e) {
                            return e.getAttribute(t, 4);
                        },
                    };
                }),
            de.optSelected ||
                (he.propHooks.selected = {
                    get: function (e) {
                        var t = e.parentNode;
                        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
                    },
                }),
            he.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                he.propFix[this.toLowerCase()] = this;
            }),
            de.enctype || (he.propFix.enctype = "encoding");
        var Rt = /[\t\r\n\f]/g;
        he.fn.extend({
            addClass: function (e) {
                var t,
                    n,
                    i,
                    o,
                    r,
                    s,
                    a,
                    l = 0;
                if (he.isFunction(e))
                    return this.each(function (t) {
                        he(this).addClass(e.call(this, t, B(this)));
                    });
                if ("string" == typeof e && e)
                    for (t = e.match(je) || []; (n = this[l++]); )
                        if (((o = B(n)), (i = 1 === n.nodeType && (" " + o + " ").replace(Rt, " ")))) {
                            for (s = 0; (r = t[s++]); ) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            o !== (a = he.trim(i)) && he.attr(n, "class", a);
                        }
                return this;
            },
            removeClass: function (e) {
                var t,
                    n,
                    i,
                    o,
                    r,
                    s,
                    a,
                    l = 0;
                if (he.isFunction(e))
                    return this.each(function (t) {
                        he(this).removeClass(e.call(this, t, B(this)));
                    });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(je) || []; (n = this[l++]); )
                        if (((o = B(n)), (i = 1 === n.nodeType && (" " + o + " ").replace(Rt, " ")))) {
                            for (s = 0; (r = t[s++]); ) for (; i.indexOf(" " + r + " ") > -1; ) i = i.replace(" " + r + " ", " ");
                            o !== (a = he.trim(i)) && he.attr(n, "class", a);
                        }
                return this;
            },
            toggleClass: function (e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n
                    ? t
                        ? this.addClass(e)
                        : this.removeClass(e)
                    : he.isFunction(e)
                    ? this.each(function (n) {
                          he(this).toggleClass(e.call(this, n, B(this), t), t);
                      })
                    : this.each(function () {
                          var t, i, o, r;
                          if ("string" === n) for (i = 0, o = he(this), r = e.match(je) || []; (t = r[i++]); ) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                          else (e !== undefined && "boolean" !== n) || ((t = B(this)) && he._data(this, "__className__", t), he.attr(this, "class", t || !1 === e ? "" : he._data(this, "__className__") || ""));
                      });
            },
            hasClass: function (e) {
                var t,
                    n,
                    i = 0;
                for (t = " " + e + " "; (n = this[i++]); ) if (1 === n.nodeType && (" " + B(n) + " ").replace(Rt, " ").indexOf(t) > -1) return !0;
                return !1;
            },
        }),
            he.each(
                "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                function (e, t) {
                    he.fn[t] = function (e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                    };
                }
            ),
            he.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                },
            });
        var Ft = e.location,
            Wt = he.now(),
            zt = /\?/,
            Bt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        (he.parseJSON = function (t) {
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
            var n,
                i = null,
                o = he.trim(t + "");
            return o &&
                !he.trim(
                    o.replace(Bt, function (e, t, o, r) {
                        return n && t && (i = 0), 0 === i ? e : ((n = o || t), (i += !r - !o), "");
                    })
                )
                ? Function("return " + o)()
                : he.error("Invalid JSON: " + t);
        }),
            (he.parseXML = function (t) {
                var n;
                if (!t || "string" != typeof t) return null;
                try {
                    e.DOMParser ? (n = new e.DOMParser().parseFromString(t, "text/xml")) : (((n = new e.ActiveXObject("Microsoft.XMLDOM")).async = "false"), n.loadXML(t));
                } catch (i) {
                    n = undefined;
                }
                return (n && n.documentElement && !n.getElementsByTagName("parsererror").length) || he.error("Invalid XML: " + t), n;
            });
        var Vt = /#.*$/,
            Ut = /([?&])_=[^&]*/,
            Gt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Xt = /^(?:GET|HEAD)$/,
            Yt = /^\/\//,
            Kt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Zt = {},
            Jt = {},
            en = "*/".concat("*"),
            tn = Ft.href,
            nn = Kt.exec(tn.toLowerCase()) || [];
        he.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: tn,
                type: "GET",
                isLocal: Qt.test(nn[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": en, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": he.parseJSON, "text xml": he.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (e, t) {
                return t ? G(G(e, he.ajaxSettings), t) : G(he.ajaxSettings, e);
            },
            ajaxPrefilter: V(Zt),
            ajaxTransport: V(Jt),
            ajax: function (t, n) {
                function i(t, n, i, o) {
                    var r,
                        d,
                        y,
                        b,
                        x,
                        _ = n;
                    2 !== w &&
                        ((w = 2),
                        l && e.clearTimeout(l),
                        (c = undefined),
                        (a = o || ""),
                        ($.readyState = t > 0 ? 4 : 0),
                        (r = (t >= 200 && t < 300) || 304 === t),
                        i && (b = Q(p, $, i)),
                        (b = X(p, b, $, r)),
                        r
                            ? (p.ifModified && ((x = $.getResponseHeader("Last-Modified")) && (he.lastModified[s] = x), (x = $.getResponseHeader("etag")) && (he.etag[s] = x)),
                              204 === t || "HEAD" === p.type ? (_ = "nocontent") : 304 === t ? (_ = "notmodified") : ((_ = b.state), (d = b.data), (r = !(y = b.error))))
                            : ((y = _), (!t && _) || ((_ = "error"), t < 0 && (t = 0))),
                        ($.status = t),
                        ($.statusText = (n || _) + ""),
                        r ? m.resolveWith(h, [d, _, $]) : m.rejectWith(h, [$, _, y]),
                        $.statusCode(v),
                        (v = undefined),
                        u && f.trigger(r ? "ajaxSuccess" : "ajaxError", [$, p, r ? d : y]),
                        g.fireWith(h, [$, _]),
                        u && (f.trigger("ajaxComplete", [$, p]), --he.active || he.event.trigger("ajaxStop")));
                }
                "object" == typeof t && ((n = t), (t = undefined)), (n = n || {});
                var o,
                    r,
                    s,
                    a,
                    l,
                    u,
                    c,
                    d,
                    p = he.ajaxSetup({}, n),
                    h = p.context || p,
                    f = p.context && (h.nodeType || h.jquery) ? he(h) : he.event,
                    m = he.Deferred(),
                    g = he.Callbacks("once memory"),
                    v = p.statusCode || {},
                    y = {},
                    b = {},
                    w = 0,
                    x = "canceled",
                    $ = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === w) {
                                if (!d) for (d = {}; (t = Gt.exec(a)); ) d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()];
                            }
                            return null == t ? null : t;
                        },
                        getAllResponseHeaders: function () {
                            return 2 === w ? a : null;
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return w || ((e = b[n] = b[n] || e), (y[e] = t)), this;
                        },
                        overrideMimeType: function (e) {
                            return w || (p.mimeType = e), this;
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)
                                if (w < 2) for (t in e) v[t] = [v[t], e[t]];
                                else $.always(e[$.status]);
                            return this;
                        },
                        abort: function (e) {
                            var t = e || x;
                            return c && c.abort(t), i(0, t), this;
                        },
                    };
                if (
                    ((m.promise($).complete = g.add),
                    ($.success = $.done),
                    ($.error = $.fail),
                    (p.url = ((t || p.url || tn) + "").replace(Vt, "").replace(Yt, nn[1] + "//")),
                    (p.type = n.method || n.type || p.method || p.type),
                    (p.dataTypes = he
                        .trim(p.dataType || "*")
                        .toLowerCase()
                        .match(je) || [""]),
                    null == p.crossDomain &&
                        ((o = Kt.exec(p.url.toLowerCase())), (p.crossDomain = !(!o || (o[1] === nn[1] && o[2] === nn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (nn[3] || ("http:" === nn[1] ? "80" : "443")))))),
                    p.data && p.processData && "string" != typeof p.data && (p.data = he.param(p.data, p.traditional)),
                    U(Zt, p, n, $),
                    2 === w)
                )
                    return $;
                for (r in ((u = he.event && p.global) && 0 == he.active++ && he.event.trigger("ajaxStart"),
                (p.type = p.type.toUpperCase()),
                (p.hasContent = !Xt.test(p.type)),
                (s = p.url),
                p.hasContent || (p.data && ((s = p.url += (zt.test(s) ? "&" : "?") + p.data), delete p.data), !1 === p.cache && (p.url = Ut.test(s) ? s.replace(Ut, "$1_=" + Wt++) : s + (zt.test(s) ? "&" : "?") + "_=" + Wt++)),
                p.ifModified && (he.lastModified[s] && $.setRequestHeader("If-Modified-Since", he.lastModified[s]), he.etag[s] && $.setRequestHeader("If-None-Match", he.etag[s])),
                ((p.data && p.hasContent && !1 !== p.contentType) || n.contentType) && $.setRequestHeader("Content-Type", p.contentType),
                $.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + en + "; q=0.01" : "") : p.accepts["*"]),
                p.headers))
                    $.setRequestHeader(r, p.headers[r]);
                if (p.beforeSend && (!1 === p.beforeSend.call(h, $, p) || 2 === w)) return $.abort();
                for (r in ((x = "abort"), { success: 1, error: 1, complete: 1 })) $[r](p[r]);
                if ((c = U(Jt, p, n, $))) {
                    if ((($.readyState = 1), u && f.trigger("ajaxSend", [$, p]), 2 === w)) return $;
                    p.async &&
                        p.timeout > 0 &&
                        (l = e.setTimeout(function () {
                            $.abort("timeout");
                        }, p.timeout));
                    try {
                        (w = 1), c.send(y, i);
                    } catch (_) {
                        if (!(w < 2)) throw _;
                        i(-1, _);
                    }
                } else i(-1, "No Transport");
                return $;
            },
            getJSON: function (e, t, n) {
                return he.get(e, t, n, "json");
            },
            getScript: function (e, t) {
                return he.get(e, undefined, t, "script");
            },
        }),
            he.each(["get", "post"], function (e, t) {
                he[t] = function (e, n, i, o) {
                    return he.isFunction(n) && ((o = o || i), (i = n), (n = undefined)), he.ajax(he.extend({ url: e, type: t, dataType: o, data: n, success: i }, he.isPlainObject(e) && e));
                };
            }),
            (he._evalUrl = function (e) {
                return he.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0 });
            }),
            he.fn.extend({
                wrapAll: function (e) {
                    if (he.isFunction(e))
                        return this.each(function (t) {
                            he(this).wrapAll(e.call(this, t));
                        });
                    if (this[0]) {
                        var t = he(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]),
                            t
                                .map(function () {
                                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; ) e = e.firstChild;
                                    return e;
                                })
                                .append(this);
                    }
                    return this;
                },
                wrapInner: function (e) {
                    return he.isFunction(e)
                        ? this.each(function (t) {
                              he(this).wrapInner(e.call(this, t));
                          })
                        : this.each(function () {
                              var t = he(this),
                                  n = t.contents();
                              n.length ? n.wrapAll(e) : t.append(e);
                          });
                },
                wrap: function (e) {
                    var t = he.isFunction(e);
                    return this.each(function (n) {
                        he(this).wrapAll(t ? e.call(this, n) : e);
                    });
                },
                unwrap: function () {
                    return this.parent()
                        .each(function () {
                            he.nodeName(this, "body") || he(this).replaceWith(this.childNodes);
                        })
                        .end();
                },
            }),
            (he.expr.filters.hidden = function (e) {
                return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : K(e);
            }),
            (he.expr.filters.visible = function (e) {
                return !he.expr.filters.hidden(e);
            });
        var on = /%20/g,
            rn = /\[\]$/,
            sn = /\r?\n/g,
            an = /^(?:submit|button|image|reset|file)$/i,
            ln = /^(?:input|select|textarea|keygen)/i;
        (he.param = function (e, t) {
            var n,
                i = [],
                o = function (e, t) {
                    (t = he.isFunction(t) ? t() : null == t ? "" : t), (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
                };
            if ((t === undefined && (t = he.ajaxSettings && he.ajaxSettings.traditional), he.isArray(e) || (e.jquery && !he.isPlainObject(e))))
                he.each(e, function () {
                    o(this.name, this.value);
                });
            else for (n in e) Z(n, e[n], t, o);
            return i.join("&").replace(on, "+");
        }),
            he.fn.extend({
                serialize: function () {
                    return he.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var e = he.prop(this, "elements");
                        return e ? he.makeArray(e) : this;
                    })
                        .filter(function () {
                            var e = this.type;
                            return this.name && !he(this).is(":disabled") && ln.test(this.nodeName) && !an.test(e) && (this.checked || !ze.test(e));
                        })
                        .map(function (e, t) {
                            var n = he(this).val();
                            return null == n
                                ? null
                                : he.isArray(n)
                                ? he.map(n, function (e) {
                                      return { name: t.name, value: e.replace(sn, "\r\n") };
                                  })
                                : { name: t.name, value: n.replace(sn, "\r\n") };
                        })
                        .get();
                },
            }),
            (he.ajaxSettings.xhr =
                e.ActiveXObject !== undefined
                    ? function () {
                          return this.isLocal ? ee() : ie.documentMode > 8 ? J() : (/^(get|post|head|put|delete|options)$/i.test(this.type) && J()) || ee();
                      }
                    : J);
        var un = 0,
            cn = {},
            dn = he.ajaxSettings.xhr();
        e.attachEvent &&
            e.attachEvent("onunload", function () {
                for (var e in cn) cn[e](undefined, !0);
            }),
            (de.cors = !!dn && "withCredentials" in dn),
            (dn = de.ajax = !!dn) &&
                he.ajaxTransport(function (t) {
                    var n;
                    if (!t.crossDomain || de.cors)
                        return {
                            send: function (i, o) {
                                var r,
                                    s = t.xhr(),
                                    a = ++un;
                                if ((s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)) for (r in t.xhrFields) s[r] = t.xhrFields[r];
                                for (r in (t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i))
                                    i[r] !== undefined && s.setRequestHeader(r, i[r] + "");
                                s.send((t.hasContent && t.data) || null),
                                    (n = function (e, i) {
                                        var r, l, u;
                                        if (n && (i || 4 === s.readyState))
                                            if ((delete cn[a], (n = undefined), (s.onreadystatechange = he.noop), i)) 4 !== s.readyState && s.abort();
                                            else {
                                                (u = {}), (r = s.status), "string" == typeof s.responseText && (u.text = s.responseText);
                                                try {
                                                    l = s.statusText;
                                                } catch (c) {
                                                    l = "";
                                                }
                                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : (r = u.text ? 200 : 404);
                                            }
                                        u && o(r, l, u, s.getAllResponseHeaders());
                                    }),
                                    t.async ? (4 === s.readyState ? e.setTimeout(n) : (s.onreadystatechange = cn[a] = n)) : n();
                            },
                            abort: function () {
                                n && n(undefined, !0);
                            },
                        };
                }),
            he.ajaxPrefilter(function (e) {
                e.crossDomain && (e.contents.script = !1);
            }),
            he.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (e) {
                        return he.globalEval(e), e;
                    },
                },
            }),
            he.ajaxPrefilter("script", function (e) {
                e.cache === undefined && (e.cache = !1), e.crossDomain && ((e.type = "GET"), (e.global = !1));
            }),
            he.ajaxTransport("script", function (e) {
                if (e.crossDomain) {
                    var t,
                        n = ie.head || he("head")[0] || ie.documentElement;
                    return {
                        send: function (i, o) {
                            ((t = ie.createElement("script")).async = !0),
                                e.scriptCharset && (t.charset = e.scriptCharset),
                                (t.src = e.url),
                                (t.onload = t.onreadystatechange = function (e, n) {
                                    (n || !t.readyState || /loaded|complete/.test(t.readyState)) && ((t.onload = t.onreadystatechange = null), t.parentNode && t.parentNode.removeChild(t), (t = null), n || o(200, "success"));
                                }),
                                n.insertBefore(t, n.firstChild);
                        },
                        abort: function () {
                            t && t.onload(undefined, !0);
                        },
                    };
                }
            });
        var pn = [],
            hn = /(=)\?(?=&|$)|\?\?/;
        he.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var e = pn.pop() || he.expando + "_" + Wt++;
                return (this[e] = !0), e;
            },
        }),
            he.ajaxPrefilter("json jsonp", function (t, n, i) {
                var o,
                    r,
                    s,
                    a = !1 !== t.jsonp && (hn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");
                if (a || "jsonp" === t.dataTypes[0])
                    return (
                        (o = t.jsonpCallback = he.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                        a ? (t[a] = t[a].replace(hn, "$1" + o)) : !1 !== t.jsonp && (t.url += (zt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
                        (t.converters["script json"] = function () {
                            return s || he.error(o + " was not called"), s[0];
                        }),
                        (t.dataTypes[0] = "json"),
                        (r = e[o]),
                        (e[o] = function () {
                            s = arguments;
                        }),
                        i.always(function () {
                            r === undefined ? he(e).removeProp(o) : (e[o] = r), t[o] && ((t.jsonpCallback = n.jsonpCallback), pn.push(o)), s && he.isFunction(r) && r(s[0]), (s = r = undefined);
                        }),
                        "script"
                    );
            }),
            (de.createHTMLDocument = (function () {
                if (!ie.implementation.createHTMLDocument) return !1;
                var e = ie.implementation.createHTMLDocument("");
                return (e.body.innerHTML = "<form></form><form></form>"), 2 === e.body.childNodes.length;
            })()),
            (he.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && ((n = t), (t = !1)), (t = t || (de.createHTMLDocument ? ie.implementation.createHTMLDocument("") : ie));
                var i = $e.exec(e),
                    o = !n && [];
                return i ? [t.createElement(i[1])] : ((i = v([e], t, o)), o && o.length && he(o).remove(), he.merge([], i.childNodes));
            });
        var fn = he.fn.load;
        (he.fn.load = function (e, t, n) {
            if ("string" != typeof e && fn) return fn.apply(this, arguments);
            var i,
                o,
                r,
                s = this,
                a = e.indexOf(" ");
            return (
                a > -1 && ((i = he.trim(e.slice(a, e.length))), (e = e.slice(0, a))),
                he.isFunction(t) ? ((n = t), (t = undefined)) : t && "object" == typeof t && (o = "POST"),
                s.length > 0 &&
                    he
                        .ajax({ url: e, type: o || "GET", dataType: "html", data: t })
                        .done(function (e) {
                            (r = arguments), s.html(i ? he("<div>").append(he.parseHTML(e)).find(i) : e);
                        })
                        .always(
                            n &&
                                function (e, t) {
                                    s.each(function () {
                                        n.apply(s, r || [e.responseText, t, e]);
                                    });
                                }
                        ),
                this
            );
        }),
            he.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                he.fn[t] = function (e) {
                    return this.on(t, e);
                };
            }),
            (he.expr.filters.animated = function (e) {
                return he.grep(he.timers, function (t) {
                    return e === t.elem;
                }).length;
            }),
            (he.offset = {
                setOffset: function (e, t, n) {
                    var i,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u = he.css(e, "position"),
                        c = he(e),
                        d = {};
                    "static" === u && (e.style.position = "relative"),
                        (a = c.offset()),
                        (r = he.css(e, "top")),
                        (l = he.css(e, "left")),
                        ("absolute" === u || "fixed" === u) && he.inArray("auto", [r, l]) > -1 ? ((s = (i = c.position()).top), (o = i.left)) : ((s = parseFloat(r) || 0), (o = parseFloat(l) || 0)),
                        he.isFunction(t) && (t = t.call(e, n, he.extend({}, a))),
                        null != t.top && (d.top = t.top - a.top + s),
                        null != t.left && (d.left = t.left - a.left + o),
                        "using" in t ? t.using.call(e, d) : c.css(d);
                },
            }),
            he.fn.extend({
                offset: function (e) {
                    if (arguments.length)
                        return e === undefined
                            ? this
                            : this.each(function (t) {
                                  he.offset.setOffset(this, e, t);
                              });
                    var t,
                        n,
                        i = { top: 0, left: 0 },
                        o = this[0],
                        r = o && o.ownerDocument;
                    return r
                        ? ((t = r.documentElement),
                          he.contains(t, o)
                              ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()),
                                (n = te(r)),
                                { top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0) })
                              : i)
                        : void 0;
                },
                position: function () {
                    if (this[0]) {
                        var e,
                            t,
                            n = { top: 0, left: 0 },
                            i = this[0];
                        return (
                            "fixed" === he.css(i, "position")
                                ? (t = i.getBoundingClientRect())
                                : ((e = this.offsetParent()), (t = this.offset()), he.nodeName(e[0], "html") || (n = e.offset()), (n.top += he.css(e[0], "borderTopWidth", !0)), (n.left += he.css(e[0], "borderLeftWidth", !0))),
                            { top: t.top - n.top - he.css(i, "marginTop", !0), left: t.left - n.left - he.css(i, "marginLeft", !0) }
                        );
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var e = this.offsetParent; e && !he.nodeName(e, "html") && "static" === he.css(e, "position"); ) e = e.offsetParent;
                        return e || mt;
                    });
                },
            }),
            he.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
                var n = /Y/.test(t);
                he.fn[e] = function (i) {
                    return We(
                        this,
                        function (e, i, o) {
                            var r = te(e);
                            if (o === undefined) return r ? (t in r ? r[t] : r.document.documentElement[i]) : e[i];
                            r ? r.scrollTo(n ? he(r).scrollLeft() : o, n ? o : he(r).scrollTop()) : (e[i] = o);
                        },
                        e,
                        i,
                        arguments.length,
                        null
                    );
                };
            }),
            he.each(["top", "left"], function (e, t) {
                he.cssHooks[t] = N(de.pixelPosition, function (e, n) {
                    if (n) return (n = vt(e, t)), ht.test(n) ? he(e).position()[t] + "px" : n;
                });
            }),
            he.each({ Height: "height", Width: "width" }, function (e, t) {
                he.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, i) {
                    he.fn[i] = function (i, o) {
                        var r = arguments.length && (n || "boolean" != typeof i),
                            s = n || (!0 === i || !0 === o ? "margin" : "border");
                        return We(
                            this,
                            function (t, n, i) {
                                var o;
                                return he.isWindow(t)
                                    ? t.document.documentElement["client" + e]
                                    : 9 === t.nodeType
                                    ? ((o = t.documentElement), Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e]))
                                    : i === undefined
                                    ? he.css(t, n, s)
                                    : he.style(t, n, i, s);
                            },
                            t,
                            r ? i : undefined,
                            r,
                            null
                        );
                    };
                });
            }),
            he.fn.extend({
                bind: function (e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function (e, t) {
                    return this.off(e, null, t);
                },
                delegate: function (e, t, n, i) {
                    return this.on(t, e, n, i);
                },
                undelegate: function (e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                },
            }),
            (he.fn.size = function () {
                return this.length;
            }),
            (he.fn.andSelf = he.fn.addBack),
            "function" == typeof define &&
                define.amd &&
                define("jquery", [], function () {
                    return he;
                });
        var mn = e.jQuery,
            gn = e.$;
        return (
            (he.noConflict = function (t) {
                return e.$ === he && (e.$ = gn), t && e.jQuery === he && (e.jQuery = mn), he;
            }),
            t || (e.jQuery = e.$ = he),
            he
        );
    }),
    (function (e, t) {
        "use strict";
        var n;
        e.rails !== t && e.error("jquery-ujs has already been loaded!");
        var i = e(document);
        (e.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector:
                "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function () {
                return e("meta[name=csrf-token]").attr("content");
            },
            csrfParam: function () {
                return e("meta[name=csrf-param]").attr("content");
            },
            CSRFProtection: function (e) {
                var t = n.csrfToken();
                t && e.setRequestHeader("X-CSRF-Token", t);
            },
            refreshCSRFTokens: function () {
                e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken());
            },
            fire: function (t, n, i) {
                var o = e.Event(n);
                return t.trigger(o, i), !1 !== o.result;
            },
            confirm: function (e) {
                return confirm(e);
            },
            ajax: function (t) {
                return e.ajax(t);
            },
            href: function (e) {
                return e[0].href;
            },
            isRemote: function (e) {
                return e.data("remote") !== t && !1 !== e.data("remote");
            },
            handleRemote: function (i) {
                var o, r, s, a, l, u;
                if (n.fire(i, "ajax:before")) {
                    if (((a = i.data("with-credentials") || null), (l = i.data("type") || (e.ajaxSettings && e.ajaxSettings.dataType)), i.is("form"))) {
                        (o = i.data("ujs:submit-button-formmethod") || i.attr("method")), (r = i.data("ujs:submit-button-formaction") || i.attr("action")), (s = e(i[0]).serializeArray());
                        var c = i.data("ujs:submit-button");
                        c && (s.push(c), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null);
                    } else
                        i.is(n.inputChangeSelector)
                            ? ((o = i.data("method")), (r = i.data("url")), (s = i.serialize()), i.data("params") && (s = s + "&" + i.data("params")))
                            : i.is(n.buttonClickSelector)
                            ? ((o = i.data("method") || "get"), (r = i.data("url")), (s = i.serialize()), i.data("params") && (s = s + "&" + i.data("params")))
                            : ((o = i.data("method")), (r = n.href(i)), (s = i.data("params") || null));
                    return (
                        (u = {
                            type: o || "GET",
                            data: s,
                            dataType: l,
                            beforeSend: function (e, o) {
                                if ((o.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), !n.fire(i, "ajax:beforeSend", [e, o]))) return !1;
                                i.trigger("ajax:send", e);
                            },
                            success: function (e, t, n) {
                                i.trigger("ajax:success", [e, t, n]);
                            },
                            complete: function (e, t) {
                                i.trigger("ajax:complete", [e, t]);
                            },
                            error: function (e, t, n) {
                                i.trigger("ajax:error", [e, t, n]);
                            },
                            crossDomain: n.isCrossDomain(r),
                        }),
                        a && (u.xhrFields = { withCredentials: a }),
                        r && (u.url = r),
                        n.ajax(u)
                    );
                }
                return !1;
            },
            isCrossDomain: function (e) {
                var t = document.createElement("a");
                t.href = location.href;
                var n = document.createElement("a");
                try {
                    return (n.href = e), (n.href = n.href), !(((!n.protocol || ":" === n.protocol) && !n.host) || t.protocol + "//" + t.host == n.protocol + "//" + n.host);
                } catch (i) {
                    return !0;
                }
            },
            handleMethod: function (i) {
                var o = n.href(i),
                    r = i.data("method"),
                    s = i.attr("target"),
                    a = n.csrfToken(),
                    l = n.csrfParam(),
                    u = e('<form method="post" action="' + o + '"></form>'),
                    c = '<input name="_method" value="' + r + '" type="hidden" />';
                l === t || a === t || n.isCrossDomain(o) || (c += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && u.attr("target", s), u.hide().append(c).appendTo("body"), u.submit();
            },
            formElements: function (t, n) {
                return t.is("form") ? e(t[0].elements).filter(n) : t.find(n);
            },
            disableFormElements: function (t) {
                n.formElements(t, n.disableSelector).each(function () {
                    n.disableFormElement(e(this));
                });
            },
            disableFormElement: function (e) {
                var n, i;
                (n = e.is("button") ? "html" : "val"), (i = e.data("disable-with")) !== t && (e.data("ujs:enable-with", e[n]()), e[n](i)), e.prop("disabled", !0), e.data("ujs:disabled", !0);
            },
            enableFormElements: function (t) {
                n.formElements(t, n.enableSelector).each(function () {
                    n.enableFormElement(e(this));
                });
            },
            enableFormElement: function (e) {
                var n = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled");
            },
            allowAction: function (e) {
                var t,
                    i = e.data("confirm"),
                    o = !1;
                if (!i) return !0;
                if (n.fire(e, "confirm")) {
                    try {
                        o = n.confirm(i);
                    } catch (r) {
                        (console.error || console.log).call(console, r.stack || r);
                    }
                    t = n.fire(e, "confirm:complete", [o]);
                }
                return o && t;
            },
            blankInputs: function (t, n, i) {
                var o,
                    r,
                    s,
                    a = e(),
                    l = n || "input,textarea",
                    u = t.find(l),
                    c = {};
                return (
                    u.each(function () {
                        (o = e(this)).is("input[type=radio]")
                            ? ((s = o.attr("name")), c[s] || (0 === t.find('input[type=radio]:checked[name="' + s + '"]').length && ((r = t.find('input[type=radio][name="' + s + '"]')), (a = a.add(r))), (c[s] = s)))
                            : (o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val()) === i && (a = a.add(o));
                    }),
                    !!a.length && a
                );
            },
            nonBlankInputs: function (e, t) {
                return n.blankInputs(e, t, !0);
            },
            stopEverything: function (t) {
                return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1;
            },
            disableElement: function (e) {
                var i = e.data("disable-with");
                i !== t && (e.data("ujs:enable-with", e.html()), e.html(i)),
                    e.bind("click.railsDisable", function (e) {
                        return n.stopEverything(e);
                    }),
                    e.data("ujs:disabled", !0);
            },
            enableElement: function (e) {
                e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled");
            },
        }),
            n.fire(i, "rails:attachBindings") &&
                (e.ajaxPrefilter(function (e, t, i) {
                    e.crossDomain || n.CSRFProtection(i);
                }),
                e(window).on("pageshow.rails", function () {
                    e(e.rails.enableSelector).each(function () {
                        var t = e(this);
                        t.data("ujs:disabled") && e.rails.enableFormElement(t);
                    }),
                        e(e.rails.linkDisableSelector).each(function () {
                            var t = e(this);
                            t.data("ujs:disabled") && e.rails.enableElement(t);
                        });
                }),
                i.delegate(n.linkDisableSelector, "ajax:complete", function () {
                    n.enableElement(e(this));
                }),
                i.delegate(n.buttonDisableSelector, "ajax:complete", function () {
                    n.enableFormElement(e(this));
                }),
                i.delegate(n.linkClickSelector, "click.rails", function (t) {
                    var i = e(this),
                        o = i.data("method"),
                        r = i.data("params"),
                        s = t.metaKey || t.ctrlKey;
                    if (!n.allowAction(i)) return n.stopEverything(t);
                    if ((!s && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i))) {
                        if (s && (!o || "GET" === o) && !r) return !0;
                        var a = n.handleRemote(i);
                        return (
                            !1 === a
                                ? n.enableElement(i)
                                : a.fail(function () {
                                      n.enableElement(i);
                                  }),
                            !1
                        );
                    }
                    return o ? (n.handleMethod(i), !1) : void 0;
                }),
                i.delegate(n.buttonClickSelector, "click.rails", function (t) {
                    var i = e(this);
                    if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(t);
                    i.is(n.buttonDisableSelector) && n.disableFormElement(i);
                    var o = n.handleRemote(i);
                    return (
                        !1 === o
                            ? n.enableFormElement(i)
                            : o.fail(function () {
                                  n.enableFormElement(i);
                              }),
                        !1
                    );
                }),
                i.delegate(n.inputChangeSelector, "change.rails", function (t) {
                    var i = e(this);
                    return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) : n.stopEverything(t);
                }),
                i.delegate(n.formSubmitSelector, "submit.rails", function (i) {
                    var o,
                        r,
                        s = e(this),
                        a = n.isRemote(s);
                    if (!n.allowAction(s)) return n.stopEverything(i);
                    if (s.attr("novalidate") === t)
                        if (s.data("ujs:formnovalidate-button") === t) {
                            if ((o = n.blankInputs(s, n.requiredInputSelector, !1)) && n.fire(s, "ajax:aborted:required", [o])) return n.stopEverything(i);
                        } else s.data("ujs:formnovalidate-button", t);
                    if (a) {
                        if ((r = n.nonBlankInputs(s, n.fileInputSelector))) {
                            setTimeout(function () {
                                n.disableFormElements(s);
                            }, 13);
                            var l = n.fire(s, "ajax:aborted:file", [r]);
                            return (
                                l ||
                                    setTimeout(function () {
                                        n.enableFormElements(s);
                                    }, 13),
                                l
                            );
                        }
                        return n.handleRemote(s), !1;
                    }
                    setTimeout(function () {
                        n.disableFormElements(s);
                    }, 13);
                }),
                i.delegate(n.formInputClickSelector, "click.rails", function (t) {
                    var i = e(this);
                    if (!n.allowAction(i)) return n.stopEverything(t);
                    var o = i.attr("name"),
                        r = o ? { name: o, value: i.val() } : null,
                        s = i.closest("form");
                    0 === s.length && (s = e("#" + i.attr("form"))),
                        s.data("ujs:submit-button", r),
                        s.data("ujs:formnovalidate-button", i.attr("formnovalidate")),
                        s.data("ujs:submit-button-formaction", i.attr("formaction")),
                        s.data("ujs:submit-button-formmethod", i.attr("formmethod"));
                }),
                i.delegate(n.formSubmitSelector, "ajax:send.rails", function (t) {
                    this === t.target && n.disableFormElements(e(this));
                }),
                i.delegate(n.formSubmitSelector, "ajax:complete.rails", function (t) {
                    this === t.target && n.enableFormElements(e(this));
                }),
                e(function () {
                    n.refreshCSRFTokens();
                }));
    })(jQuery),
    "undefined" == typeof jQuery)
)
    throw new Error("Bootstrap's JavaScript requires jQuery");
if (
    ((function () {
        "use strict";
        var e = jQuery.fn.jquery.split(" ")[0].split(".");
        if ((e[0] < 2 && e[1] < 9) || (1 == e[0] && 9 == e[1] && e[2] < 1)) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
    })(),
    (function (e) {
        "use strict";
        function t() {
            var e = document.createElement("bootstrap"),
                t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
            for (var n in t) if (e.style[n] !== undefined) return { end: t[n] };
            return !1;
        }
        (e.fn.emulateTransitionEnd = function (t) {
            var n = !1,
                i = this;
            return (
                e(this).one("bsTransitionEnd", function () {
                    n = !0;
                }),
                setTimeout(function () {
                    n || e(i).trigger(e.support.transition.end);
                }, t),
                this
            );
        }),
            e(function () {
                (e.support.transition = t()),
                    e.support.transition &&
                        (e.event.special.bsTransitionEnd = {
                            bindType: e.support.transition.end,
                            delegateType: e.support.transition.end,
                            handle: function (t) {
                                if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                            },
                        });
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var n = e(this),
                    o = n.data("bs.alert");
                o || n.data("bs.alert", (o = new i(this))), "string" == typeof t && o[t].call(n);
            });
        }
        var n = '[data-dismiss="alert"]',
            i = function (t) {
                e(t).on("click", n, this.close);
            };
        (i.VERSION = "3.3.5"),
            (i.TRANSITION_DURATION = 150),
            (i.prototype.close = function (t) {
                function n() {
                    s.detach().trigger("closed.bs.alert").remove();
                }
                var o = e(this),
                    r = o.attr("data-target");
                r || (r = (r = o.attr("href")) && r.replace(/.*(?=#[^\s]*$)/, ""));
                var s = e(r);
                t && t.preventDefault(),
                    s.length || (s = o.closest(".alert")),
                    s.trigger((t = e.Event("close.bs.alert"))),
                    t.isDefaultPrevented() || (s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n());
            });
        var o = e.fn.alert;
        (e.fn.alert = t),
            (e.fn.alert.Constructor = i),
            (e.fn.alert.noConflict = function () {
                return (e.fn.alert = o), this;
            }),
            e(document).on("click.bs.alert.data-api", n, i.prototype.close);
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.button"),
                    r = "object" == typeof t && t;
                o || i.data("bs.button", (o = new n(this, r))), "toggle" == t ? o.toggle() : t && o.setState(t);
            });
        }
        var n = function (t, i) {
            (this.$element = e(t)), (this.options = e.extend({}, n.DEFAULTS, i)), (this.isLoading = !1);
        };
        (n.VERSION = "3.3.5"),
            (n.DEFAULTS = { loadingText: "loading..." }),
            (n.prototype.setState = function (t) {
                var n = "disabled",
                    i = this.$element,
                    o = i.is("input") ? "val" : "html",
                    r = i.data();
                (t += "Text"),
                    null == r.resetText && i.data("resetText", i[o]()),
                    setTimeout(
                        e.proxy(function () {
                            i[o](null == r[t] ? this.options[t] : r[t]), "loadingText" == t ? ((this.isLoading = !0), i.addClass(n).attr(n, n)) : this.isLoading && ((this.isLoading = !1), i.removeClass(n).removeAttr(n));
                        }, this),
                        0
                    );
            }),
            (n.prototype.toggle = function () {
                var e = !0,
                    t = this.$element.closest('[data-toggle="buttons"]');
                if (t.length) {
                    var n = this.$element.find("input");
                    "radio" == n.prop("type")
                        ? (n.prop("checked") && (e = !1), t.find(".active").removeClass("active"), this.$element.addClass("active"))
                        : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")),
                        n.prop("checked", this.$element.hasClass("active")),
                        e && n.trigger("change");
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
            });
        var i = e.fn.button;
        (e.fn.button = t),
            (e.fn.button.Constructor = n),
            (e.fn.button.noConflict = function () {
                return (e.fn.button = i), this;
            }),
            e(document)
                .on("click.bs.button.data-api", '[data-toggle^="button"]', function (n) {
                    var i = e(n.target);
                    i.hasClass("btn") || (i = i.closest(".btn")), t.call(i, "toggle"), e(n.target).is('input[type="radio"]') || e(n.target).is('input[type="checkbox"]') || n.preventDefault();
                })
                .on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
                    e(t.target)
                        .closest(".btn")
                        .toggleClass("focus", /^focus(in)?$/.test(t.type));
                });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.carousel"),
                    r = e.extend({}, n.DEFAULTS, i.data(), "object" == typeof t && t),
                    s = "string" == typeof t ? t : r.slide;
                o || i.data("bs.carousel", (o = new n(this, r))), "number" == typeof t ? o.to(t) : s ? o[s]() : r.interval && o.pause().cycle();
            });
        }
        var n = function (t, n) {
            (this.$element = e(t)),
                (this.$indicators = this.$element.find(".carousel-indicators")),
                (this.options = n),
                (this.paused = null),
                (this.sliding = null),
                (this.interval = null),
                (this.$active = null),
                (this.$items = null),
                this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)),
                "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this));
        };
        (n.VERSION = "3.3.5"),
            (n.TRANSITION_DURATION = 600),
            (n.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
            (n.prototype.keydown = function (e) {
                if (!/input|textarea/i.test(e.target.tagName)) {
                    switch (e.which) {
                        case 37:
                            this.prev();
                            break;
                        case 39:
                            this.next();
                            break;
                        default:
                            return;
                    }
                    e.preventDefault();
                }
            }),
            (n.prototype.cycle = function (t) {
                return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this;
            }),
            (n.prototype.getItemIndex = function (e) {
                return (this.$items = e.parent().children(".item")), this.$items.index(e || this.$active);
            }),
            (n.prototype.getItemForDirection = function (e, t) {
                var n = this.getItemIndex(t);
                if ((("prev" == e && 0 === n) || ("next" == e && n == this.$items.length - 1)) && !this.options.wrap) return t;
                var i = (n + ("prev" == e ? -1 : 1)) % this.$items.length;
                return this.$items.eq(i);
            }),
            (n.prototype.to = function (e) {
                var t = this,
                    n = this.getItemIndex((this.$active = this.$element.find(".item.active")));
                if (!(e > this.$items.length - 1 || e < 0))
                    return this.sliding
                        ? this.$element.one("slid.bs.carousel", function () {
                              t.to(e);
                          })
                        : n == e
                        ? this.pause().cycle()
                        : this.slide(e > n ? "next" : "prev", this.$items.eq(e));
            }),
            (n.prototype.pause = function (t) {
                return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
            }),
            (n.prototype.next = function () {
                if (!this.sliding) return this.slide("next");
            }),
            (n.prototype.prev = function () {
                if (!this.sliding) return this.slide("prev");
            }),
            (n.prototype.slide = function (t, i) {
                var o = this.$element.find(".item.active"),
                    r = i || this.getItemForDirection(t, o),
                    s = this.interval,
                    a = "next" == t ? "left" : "right",
                    l = this;
                if (r.hasClass("active")) return (this.sliding = !1);
                var u = r[0],
                    c = e.Event("slide.bs.carousel", { relatedTarget: u, direction: a });
                if ((this.$element.trigger(c), !c.isDefaultPrevented())) {
                    if (((this.sliding = !0), s && this.pause(), this.$indicators.length)) {
                        this.$indicators.find(".active").removeClass("active");
                        var d = e(this.$indicators.children()[this.getItemIndex(r)]);
                        d && d.addClass("active");
                    }
                    var p = e.Event("slid.bs.carousel", { relatedTarget: u, direction: a });
                    return (
                        e.support.transition && this.$element.hasClass("slide")
                            ? (r.addClass(t),
                              r[0].offsetWidth,
                              o.addClass(a),
                              r.addClass(a),
                              o
                                  .one("bsTransitionEnd", function () {
                                      r.removeClass([t, a].join(" ")).addClass("active"),
                                          o.removeClass(["active", a].join(" ")),
                                          (l.sliding = !1),
                                          setTimeout(function () {
                                              l.$element.trigger(p);
                                          }, 0);
                                  })
                                  .emulateTransitionEnd(n.TRANSITION_DURATION))
                            : (o.removeClass("active"), r.addClass("active"), (this.sliding = !1), this.$element.trigger(p)),
                        s && this.cycle(),
                        this
                    );
                }
            });
        var i = e.fn.carousel;
        (e.fn.carousel = t),
            (e.fn.carousel.Constructor = n),
            (e.fn.carousel.noConflict = function () {
                return (e.fn.carousel = i), this;
            });
        var o = function (n) {
            var i,
                o = e(this),
                r = e(o.attr("data-target") || ((i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")));
            if (r.hasClass("carousel")) {
                var s = e.extend({}, r.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (s.interval = !1), t.call(r, s), a && r.data("bs.carousel").to(a), n.preventDefault();
            }
        };
        e(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o),
            e(window).on("load", function () {
                e('[data-ride="carousel"]').each(function () {
                    var n = e(this);
                    t.call(n, n.data());
                });
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            var n,
                i = t.attr("data-target") || ((n = t.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
            return e(i);
        }
        function n(t) {
            return this.each(function () {
                var n = e(this),
                    o = n.data("bs.collapse"),
                    r = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t);
                !o && r.toggle && /show|hide/.test(t) && (r.toggle = !1), o || n.data("bs.collapse", (o = new i(this, r))), "string" == typeof t && o[t]();
            });
        }
        var i = function (t, n) {
            (this.$element = e(t)),
                (this.options = e.extend({}, i.DEFAULTS, n)),
                (this.$trigger = e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')),
                (this.transitioning = null),
                this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
                this.options.toggle && this.toggle();
        };
        (i.VERSION = "3.3.5"),
            (i.TRANSITION_DURATION = 350),
            (i.DEFAULTS = { toggle: !0 }),
            (i.prototype.dimension = function () {
                return this.$element.hasClass("width") ? "width" : "height";
            }),
            (i.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var t,
                        o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(o && o.length && (t = o.data("bs.collapse")) && t.transitioning)) {
                        var r = e.Event("show.bs.collapse");
                        if ((this.$element.trigger(r), !r.isDefaultPrevented())) {
                            o && o.length && (n.call(o, "hide"), t || o.data("bs.collapse", null));
                            var s = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), (this.transitioning = 1);
                            var a = function () {
                                this.$element.removeClass("collapsing").addClass("collapse in")[s](""), (this.transitioning = 0), this.$element.trigger("shown.bs.collapse");
                            };
                            if (!e.support.transition) return a.call(this);
                            var l = e.camelCase(["scroll", s].join("-"));
                            this.$element.one("bsTransitionEnd", e.proxy(a, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[s](this.$element[0][l]);
                        }
                    }
                }
            }),
            (i.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var t = e.Event("hide.bs.collapse");
                    if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
                        var n = this.dimension();
                        this.$element[n](this.$element[n]())[0].offsetHeight,
                            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                            this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                            (this.transitioning = 1);
                        var o = function () {
                            (this.transitioning = 0), this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                        };
                        if (!e.support.transition) return o.call(this);
                        this.$element[n](0).one("bsTransitionEnd", e.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION);
                    }
                }
            }),
            (i.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            }),
            (i.prototype.getParent = function () {
                return e(this.options.parent)
                    .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
                    .each(
                        e.proxy(function (n, i) {
                            var o = e(i);
                            this.addAriaAndCollapsedClass(t(o), o);
                        }, this)
                    )
                    .end();
            }),
            (i.prototype.addAriaAndCollapsedClass = function (e, t) {
                var n = e.hasClass("in");
                e.attr("aria-expanded", n), t.toggleClass("collapsed", !n).attr("aria-expanded", n);
            });
        var o = e.fn.collapse;
        (e.fn.collapse = n),
            (e.fn.collapse.Constructor = i),
            (e.fn.collapse.noConflict = function () {
                return (e.fn.collapse = o), this;
            }),
            e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
                var o = e(this);
                o.attr("data-target") || i.preventDefault();
                var r = t(o),
                    s = r.data("bs.collapse") ? "toggle" : o.data();
                n.call(r, s);
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            var n = t.attr("data-target");
            n || (n = (n = t.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
            var i = n && e(n);
            return i && i.length ? i : t.parent();
        }
        function n(n) {
            (n && 3 === n.which) ||
                (e(o).remove(),
                e(r).each(function () {
                    var i = e(this),
                        o = t(i),
                        r = { relatedTarget: this };
                    o.hasClass("open") &&
                        ((n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && e.contains(o[0], n.target)) ||
                            (o.trigger((n = e.Event("hide.bs.dropdown", r))), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", r))));
                }));
        }
        function i(t) {
            return this.each(function () {
                var n = e(this),
                    i = n.data("bs.dropdown");
                i || n.data("bs.dropdown", (i = new s(this))), "string" == typeof t && i[t].call(n);
            });
        }
        var o = ".dropdown-backdrop",
            r = '[data-toggle="dropdown"]',
            s = function (t) {
                e(t).on("click.bs.dropdown", this.toggle);
            };
        (s.VERSION = "3.3.5"),
            (s.prototype.toggle = function (i) {
                var o = e(this);
                if (!o.is(".disabled, :disabled")) {
                    var r = t(o),
                        s = r.hasClass("open");
                    if ((n(), !s)) {
                        "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", n);
                        var a = { relatedTarget: this };
                        if ((r.trigger((i = e.Event("show.bs.dropdown", a))), i.isDefaultPrevented())) return;
                        o.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger("shown.bs.dropdown", a);
                    }
                    return !1;
                }
            }),
            (s.prototype.keydown = function (n) {
                if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
                    var i = e(this);
                    if ((n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled"))) {
                        var o = t(i),
                            s = o.hasClass("open");
                        if ((!s && 27 != n.which) || (s && 27 == n.which)) return 27 == n.which && o.find(r).trigger("focus"), i.trigger("click");
                        var a = " li:not(.disabled):visible a",
                            l = o.find(".dropdown-menu" + a);
                        if (l.length) {
                            var u = l.index(n.target);
                            38 == n.which && u > 0 && u--, 40 == n.which && u < l.length - 1 && u++, ~u || (u = 0), l.eq(u).trigger("focus");
                        }
                    }
                }
            });
        var a = e.fn.dropdown;
        (e.fn.dropdown = i),
            (e.fn.dropdown.Constructor = s),
            (e.fn.dropdown.noConflict = function () {
                return (e.fn.dropdown = a), this;
            }),
            e(document)
                .on("click.bs.dropdown.data-api", n)
                .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
                    e.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", r, s.prototype.toggle)
                .on("keydown.bs.dropdown.data-api", r, s.prototype.keydown)
                .on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown);
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t, i) {
            return this.each(function () {
                var o = e(this),
                    r = o.data("bs.modal"),
                    s = e.extend({}, n.DEFAULTS, o.data(), "object" == typeof t && t);
                r || o.data("bs.modal", (r = new n(this, s))), "string" == typeof t ? r[t](i) : s.show && r.show(i);
            });
        }
        var n = function (t, n) {
            (this.options = n),
                (this.$body = e(document.body)),
                (this.$element = e(t)),
                (this.$dialog = this.$element.find(".modal-dialog")),
                (this.$backdrop = null),
                (this.isShown = null),
                (this.originalBodyPad = null),
                (this.scrollbarWidth = 0),
                (this.ignoreBackdropClick = !1),
                this.options.remote &&
                    this.$element.find(".modal-content").load(
                        this.options.remote,
                        e.proxy(function () {
                            this.$element.trigger("loaded.bs.modal");
                        }, this)
                    );
        };
        (n.VERSION = "3.3.5"),
            (n.TRANSITION_DURATION = 300),
            (n.BACKDROP_TRANSITION_DURATION = 150),
            (n.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
            (n.prototype.toggle = function (e) {
                return this.isShown ? this.hide() : this.show(e);
            }),
            (n.prototype.show = function (t) {
                var i = this,
                    o = e.Event("show.bs.modal", { relatedTarget: t });
                this.$element.trigger(o),
                    this.isShown ||
                        o.isDefaultPrevented() ||
                        ((this.isShown = !0),
                        this.checkScrollbar(),
                        this.setScrollbar(),
                        this.$body.addClass("modal-open"),
                        this.escape(),
                        this.resize(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)),
                        this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                            i.$element.one("mouseup.dismiss.bs.modal", function (t) {
                                e(t.target).is(i.$element) && (i.ignoreBackdropClick = !0);
                            });
                        }),
                        this.backdrop(function () {
                            var o = e.support.transition && i.$element.hasClass("fade");
                            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), o && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
                            var r = e.Event("shown.bs.modal", { relatedTarget: t });
                            o
                                ? i.$dialog
                                      .one("bsTransitionEnd", function () {
                                          i.$element.trigger("focus").trigger(r);
                                      })
                                      .emulateTransitionEnd(n.TRANSITION_DURATION)
                                : i.$element.trigger("focus").trigger(r);
                        }));
            }),
            (n.prototype.hide = function (t) {
                t && t.preventDefault(),
                    (t = e.Event("hide.bs.modal")),
                    this.$element.trigger(t),
                    this.isShown &&
                        !t.isDefaultPrevented() &&
                        ((this.isShown = !1),
                        this.escape(),
                        this.resize(),
                        e(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
                        this.$dialog.off("mousedown.dismiss.bs.modal"),
                        e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal());
            }),
            (n.prototype.enforceFocus = function () {
                e(document)
                    .off("focusin.bs.modal")
                    .on(
                        "focusin.bs.modal",
                        e.proxy(function (e) {
                            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
                        }, this)
                    );
            }),
            (n.prototype.escape = function () {
                this.isShown && this.options.keyboard
                    ? this.$element.on(
                          "keydown.dismiss.bs.modal",
                          e.proxy(function (e) {
                              27 == e.which && this.hide();
                          }, this)
                      )
                    : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
            }),
            (n.prototype.resize = function () {
                this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal");
            }),
            (n.prototype.hideModal = function () {
                var e = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal");
                    });
            }),
            (n.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
            }),
            (n.prototype.backdrop = function (t) {
                var i = this,
                    o = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var r = e.support.transition && o;
                    if (
                        ((this.$backdrop = e(document.createElement("div"))
                            .addClass("modal-backdrop " + o)
                            .appendTo(this.$body)),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            e.proxy(function (e) {
                                this.ignoreBackdropClick ? (this.ignoreBackdropClick = !1) : e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide());
                            }, this)
                        ),
                        r && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !t)
                    )
                        return;
                    r ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : t();
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var s = function () {
                        i.removeBackdrop(), t && t();
                    };
                    e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : s();
                } else t && t();
            }),
            (n.prototype.handleUpdate = function () {
                this.adjustDialog();
            }),
            (n.prototype.adjustDialog = function () {
                var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({ paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : "" });
            }),
            (n.prototype.resetAdjustments = function () {
                this.$element.css({ paddingLeft: "", paddingRight: "" });
            }),
            (n.prototype.checkScrollbar = function () {
                var e = window.innerWidth;
                if (!e) {
                    var t = document.documentElement.getBoundingClientRect();
                    e = t.right - Math.abs(t.left);
                }
                (this.bodyIsOverflowing = document.body.clientWidth < e), (this.scrollbarWidth = this.measureScrollbar());
            }),
            (n.prototype.setScrollbar = function () {
                var e = parseInt(this.$body.css("padding-right") || 0, 10);
                (this.originalBodyPad = document.body.style.paddingRight || ""), this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth);
            }),
            (n.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", this.originalBodyPad);
            }),
            (n.prototype.measureScrollbar = function () {
                var e = document.createElement("div");
                (e.className = "modal-scrollbar-measure"), this.$body.append(e);
                var t = e.offsetWidth - e.clientWidth;
                return this.$body[0].removeChild(e), t;
            });
        var i = e.fn.modal;
        (e.fn.modal = t),
            (e.fn.modal.Constructor = n),
            (e.fn.modal.noConflict = function () {
                return (e.fn.modal = i), this;
            }),
            e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (n) {
                var i = e(this),
                    o = i.attr("href"),
                    r = e(i.attr("data-target") || (o && o.replace(/.*(?=#[^\s]+$)/, ""))),
                    s = r.data("bs.modal") ? "toggle" : e.extend({ remote: !/#/.test(o) && o }, r.data(), i.data());
                i.is("a") && n.preventDefault(),
                    r.one("show.bs.modal", function (e) {
                        e.isDefaultPrevented() ||
                            r.one("hidden.bs.modal", function () {
                                i.is(":visible") && i.trigger("focus");
                            });
                    }),
                    t.call(r, s, this);
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.tooltip"),
                    r = "object" == typeof t && t;
                (!o && /destroy|hide/.test(t)) || (o || i.data("bs.tooltip", (o = new n(this, r))), "string" == typeof t && o[t]());
            });
        }
        var n = function (e, t) {
            (this.type = null), (this.options = null), (this.enabled = null), (this.timeout = null), (this.hoverState = null), (this.$element = null), (this.inState = null), this.init("tooltip", e, t);
        };
        (n.VERSION = "3.3.5"),
            (n.TRANSITION_DURATION = 150),
            (n.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: { selector: "body", padding: 0 },
            }),
            (n.prototype.init = function (t, n, i) {
                if (
                    ((this.enabled = !0),
                    (this.type = t),
                    (this.$element = e(n)),
                    (this.options = this.getOptions(i)),
                    (this.$viewport = this.options.viewport && e(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport)),
                    (this.inState = { click: !1, hover: !1, focus: !1 }),
                    this.$element[0] instanceof document.constructor && !this.options.selector)
                )
                    throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var o = this.options.trigger.split(" "), r = o.length; r--; ) {
                    var s = o[r];
                    if ("click" == s) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
                    else if ("manual" != s) {
                        var a = "hover" == s ? "mouseenter" : "focusin",
                            l = "hover" == s ? "mouseleave" : "focusout";
                        this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
                    }
                }
                this.options.selector ? (this._options = e.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
            }),
            (n.prototype.getDefaults = function () {
                return n.DEFAULTS;
            }),
            (n.prototype.getOptions = function (t) {
                return (t = e.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t;
            }),
            (n.prototype.getDelegateOptions = function () {
                var t = {},
                    n = this.getDefaults();
                return (
                    this._options &&
                        e.each(this._options, function (e, i) {
                            n[e] != i && (t[e] = i);
                        }),
                    t
                );
            }),
            (n.prototype.enter = function (t) {
                var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
                if (
                    (n || ((n = new this.constructor(t.currentTarget, this.getDelegateOptions())), e(t.currentTarget).data("bs." + this.type, n)),
                    t instanceof e.Event && (n.inState["focusin" == t.type ? "focus" : "hover"] = !0),
                    n.tip().hasClass("in") || "in" == n.hoverState)
                )
                    n.hoverState = "in";
                else {
                    if ((clearTimeout(n.timeout), (n.hoverState = "in"), !n.options.delay || !n.options.delay.show)) return n.show();
                    n.timeout = setTimeout(function () {
                        "in" == n.hoverState && n.show();
                    }, n.options.delay.show);
                }
            }),
            (n.prototype.isInStateTrue = function () {
                for (var e in this.inState) if (this.inState[e]) return !0;
                return !1;
            }),
            (n.prototype.leave = function (t) {
                var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
                if (
                    (n || ((n = new this.constructor(t.currentTarget, this.getDelegateOptions())), e(t.currentTarget).data("bs." + this.type, n)),
                    t instanceof e.Event && (n.inState["focusout" == t.type ? "focus" : "hover"] = !1),
                    !n.isInStateTrue())
                ) {
                    if ((clearTimeout(n.timeout), (n.hoverState = "out"), !n.options.delay || !n.options.delay.hide)) return n.hide();
                    n.timeout = setTimeout(function () {
                        "out" == n.hoverState && n.hide();
                    }, n.options.delay.hide);
                }
            }),
            (n.prototype.show = function () {
                var t = e.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(t);
                    var i = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this,
                        r = this.tip(),
                        s = this.getUID(this.type);
                    this.setContent(), r.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && r.addClass("fade");
                    var a = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                        l = /\s?auto?\s?/i,
                        u = l.test(a);
                    u && (a = a.replace(l, "") || "top"),
                        r
                            .detach()
                            .css({ top: 0, left: 0, display: "block" })
                            .addClass(a)
                            .data("bs." + this.type, this),
                        this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element),
                        this.$element.trigger("inserted.bs." + this.type);
                    var c = this.getPosition(),
                        d = r[0].offsetWidth,
                        p = r[0].offsetHeight;
                    if (u) {
                        var h = a,
                            f = this.getPosition(this.$viewport);
                        (a = "bottom" == a && c.bottom + p > f.bottom ? "top" : "top" == a && c.top - p < f.top ? "bottom" : "right" == a && c.right + d > f.width ? "left" : "left" == a && c.left - d < f.left ? "right" : a),
                            r.removeClass(h).addClass(a);
                    }
                    var m = this.getCalculatedOffset(a, c, d, p);
                    this.applyPlacement(m, a);
                    var g = function () {
                        var e = o.hoverState;
                        o.$element.trigger("shown.bs." + o.type), (o.hoverState = null), "out" == e && o.leave(o);
                    };
                    e.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", g).emulateTransitionEnd(n.TRANSITION_DURATION) : g();
                }
            }),
            (n.prototype.applyPlacement = function (t, n) {
                var i = this.tip(),
                    o = i[0].offsetWidth,
                    r = i[0].offsetHeight,
                    s = parseInt(i.css("margin-top"), 10),
                    a = parseInt(i.css("margin-left"), 10);
                isNaN(s) && (s = 0),
                    isNaN(a) && (a = 0),
                    (t.top += s),
                    (t.left += a),
                    e.offset.setOffset(
                        i[0],
                        e.extend(
                            {
                                using: function (e) {
                                    i.css({ top: Math.round(e.top), left: Math.round(e.left) });
                                },
                            },
                            t
                        ),
                        0
                    ),
                    i.addClass("in");
                var l = i[0].offsetWidth,
                    u = i[0].offsetHeight;
                "top" == n && u != r && (t.top = t.top + r - u);
                var c = this.getViewportAdjustedDelta(n, t, l, u);
                c.left ? (t.left += c.left) : (t.top += c.top);
                var d = /top|bottom/.test(n),
                    p = d ? 2 * c.left - o + l : 2 * c.top - r + u,
                    h = d ? "offsetWidth" : "offsetHeight";
                i.offset(t), this.replaceArrow(p, i[0][h], d);
            }),
            (n.prototype.replaceArrow = function (e, t, n) {
                this.arrow()
                    .css(n ? "left" : "top", 50 * (1 - e / t) + "%")
                    .css(n ? "top" : "left", "");
            }),
            (n.prototype.setContent = function () {
                var e = this.tip(),
                    t = this.getTitle();
                e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right");
            }),
            (n.prototype.hide = function (t) {
                function i() {
                    "in" != o.hoverState && r.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), t && t();
                }
                var o = this,
                    r = e(this.$tip),
                    s = e.Event("hide.bs." + this.type);
                if ((this.$element.trigger(s), !s.isDefaultPrevented()))
                    return r.removeClass("in"), e.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), (this.hoverState = null), this;
            }),
            (n.prototype.fixTitle = function () {
                var e = this.$element;
                (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
            }),
            (n.prototype.hasContent = function () {
                return this.getTitle();
            }),
            (n.prototype.getPosition = function (t) {
                var n = (t = t || this.$element)[0],
                    i = "BODY" == n.tagName,
                    o = n.getBoundingClientRect();
                null == o.width && (o = e.extend({}, o, { width: o.right - o.left, height: o.bottom - o.top }));
                var r = i ? { top: 0, left: 0 } : t.offset(),
                    s = { scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
                    a = i ? { width: e(window).width(), height: e(window).height() } : null;
                return e.extend({}, o, s, a, r);
            }),
            (n.prototype.getCalculatedOffset = function (e, t, n, i) {
                return "bottom" == e
                    ? { top: t.top + t.height, left: t.left + t.width / 2 - n / 2 }
                    : "top" == e
                    ? { top: t.top - i, left: t.left + t.width / 2 - n / 2 }
                    : "left" == e
                    ? { top: t.top + t.height / 2 - i / 2, left: t.left - n }
                    : { top: t.top + t.height / 2 - i / 2, left: t.left + t.width };
            }),
            (n.prototype.getViewportAdjustedDelta = function (e, t, n, i) {
                var o = { top: 0, left: 0 };
                if (!this.$viewport) return o;
                var r = (this.options.viewport && this.options.viewport.padding) || 0,
                    s = this.getPosition(this.$viewport);
                if (/right|left/.test(e)) {
                    var a = t.top - r - s.scroll,
                        l = t.top + r - s.scroll + i;
                    a < s.top ? (o.top = s.top - a) : l > s.top + s.height && (o.top = s.top + s.height - l);
                } else {
                    var u = t.left - r,
                        c = t.left + r + n;
                    u < s.left ? (o.left = s.left - u) : c > s.right && (o.left = s.left + s.width - c);
                }
                return o;
            }),
            (n.prototype.getTitle = function () {
                var e = this.$element,
                    t = this.options;
                return e.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(e[0]) : t.title);
            }),
            (n.prototype.getUID = function (e) {
                do {
                    e += ~~(1e6 * Math.random());
                } while (document.getElementById(e));
                return e;
            }),
            (n.prototype.tip = function () {
                if (!this.$tip && ((this.$tip = e(this.options.template)), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip;
            }),
            (n.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
            }),
            (n.prototype.enable = function () {
                this.enabled = !0;
            }),
            (n.prototype.disable = function () {
                this.enabled = !1;
            }),
            (n.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled;
            }),
            (n.prototype.toggle = function (t) {
                var n = this;
                t && ((n = e(t.currentTarget).data("bs." + this.type)) || ((n = new this.constructor(t.currentTarget, this.getDelegateOptions())), e(t.currentTarget).data("bs." + this.type, n))),
                    t ? ((n.inState.click = !n.inState.click), n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n);
            }),
            (n.prototype.destroy = function () {
                var e = this;
                clearTimeout(this.timeout),
                    this.hide(function () {
                        e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), (e.$tip = null), (e.$arrow = null), (e.$viewport = null);
                    });
            });
        var i = e.fn.tooltip;
        (e.fn.tooltip = t),
            (e.fn.tooltip.Constructor = n),
            (e.fn.tooltip.noConflict = function () {
                return (e.fn.tooltip = i), this;
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.popover"),
                    r = "object" == typeof t && t;
                (!o && /destroy|hide/.test(t)) || (o || i.data("bs.popover", (o = new n(this, r))), "string" == typeof t && o[t]());
            });
        }
        var n = function (e, t) {
            this.init("popover", e, t);
        };
        if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
        (n.VERSION = "3.3.5"),
            (n.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            })),
            (n.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype)),
            (n.prototype.constructor = n),
            (n.prototype.getDefaults = function () {
                return n.DEFAULTS;
            }),
            (n.prototype.setContent = function () {
                var e = this.tip(),
                    t = this.getTitle(),
                    n = this.getContent();
                e.find(".popover-title")[this.options.html ? "html" : "text"](t),
                    e.find(".popover-content").children().detach().end()[this.options.html ? ("string" == typeof n ? "html" : "append") : "text"](n),
                    e.removeClass("fade top bottom left right in"),
                    e.find(".popover-title").html() || e.find(".popover-title").hide();
            }),
            (n.prototype.hasContent = function () {
                return this.getTitle() || this.getContent();
            }),
            (n.prototype.getContent = function () {
                var e = this.$element,
                    t = this.options;
                return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content);
            }),
            (n.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
            });
        var i = e.fn.popover;
        (e.fn.popover = t),
            (e.fn.popover.Constructor = n),
            (e.fn.popover.noConflict = function () {
                return (e.fn.popover = i), this;
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(n, i) {
            (this.$body = e(document.body)),
                (this.$scrollElement = e(n).is(document.body) ? e(window) : e(n)),
                (this.options = e.extend({}, t.DEFAULTS, i)),
                (this.selector = (this.options.target || "") + " .nav li > a"),
                (this.offsets = []),
                (this.targets = []),
                (this.activeTarget = null),
                (this.scrollHeight = 0),
                this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this)),
                this.refresh(),
                this.process();
        }
        function n(n) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.scrollspy"),
                    r = "object" == typeof n && n;
                o || i.data("bs.scrollspy", (o = new t(this, r))), "string" == typeof n && o[n]();
            });
        }
        (t.VERSION = "3.3.5"),
            (t.DEFAULTS = { offset: 10 }),
            (t.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
            }),
            (t.prototype.refresh = function () {
                var t = this,
                    n = "offset",
                    i = 0;
                (this.offsets = []),
                    (this.targets = []),
                    (this.scrollHeight = this.getScrollHeight()),
                    e.isWindow(this.$scrollElement[0]) || ((n = "position"), (i = this.$scrollElement.scrollTop())),
                    this.$body
                        .find(this.selector)
                        .map(function () {
                            var t = e(this),
                                o = t.data("target") || t.attr("href"),
                                r = /^#./.test(o) && e(o);
                            return (r && r.length && r.is(":visible") && [[r[n]().top + i, o]]) || null;
                        })
                        .sort(function (e, t) {
                            return e[0] - t[0];
                        })
                        .each(function () {
                            t.offsets.push(this[0]), t.targets.push(this[1]);
                        });
            }),
            (t.prototype.process = function () {
                var e,
                    t = this.$scrollElement.scrollTop() + this.options.offset,
                    n = this.getScrollHeight(),
                    i = this.options.offset + n - this.$scrollElement.height(),
                    o = this.offsets,
                    r = this.targets,
                    s = this.activeTarget;
                if ((this.scrollHeight != n && this.refresh(), t >= i)) return s != (e = r[r.length - 1]) && this.activate(e);
                if (s && t < o[0]) return (this.activeTarget = null), this.clear();
                for (e = o.length; e--; ) s != r[e] && t >= o[e] && (o[e + 1] === undefined || t < o[e + 1]) && this.activate(r[e]);
            }),
            (t.prototype.activate = function (t) {
                (this.activeTarget = t), this.clear();
                var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
                    i = e(n).parents("li").addClass("active");
                i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy");
            }),
            (t.prototype.clear = function () {
                e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
            });
        var i = e.fn.scrollspy;
        (e.fn.scrollspy = n),
            (e.fn.scrollspy.Constructor = t),
            (e.fn.scrollspy.noConflict = function () {
                return (e.fn.scrollspy = i), this;
            }),
            e(window).on("load.bs.scrollspy.data-api", function () {
                e('[data-spy="scroll"]').each(function () {
                    var t = e(this);
                    n.call(t, t.data());
                });
            });
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.tab");
                o || i.data("bs.tab", (o = new n(this))), "string" == typeof t && o[t]();
            });
        }
        var n = function (t) {
            this.element = e(t);
        };
        (n.VERSION = "3.3.5"),
            (n.TRANSITION_DURATION = 150),
            (n.prototype.show = function () {
                var t = this.element,
                    n = t.closest("ul:not(.dropdown-menu)"),
                    i = t.data("target");
                if ((i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active"))) {
                    var o = n.find(".active:last a"),
                        r = e.Event("hide.bs.tab", { relatedTarget: t[0] }),
                        s = e.Event("show.bs.tab", { relatedTarget: o[0] });
                    if ((o.trigger(r), t.trigger(s), !s.isDefaultPrevented() && !r.isDefaultPrevented())) {
                        var a = e(i);
                        this.activate(t.closest("li"), n),
                            this.activate(a, a.parent(), function () {
                                o.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }), t.trigger({ type: "shown.bs.tab", relatedTarget: o[0] });
                            });
                    }
                }
            }),
            (n.prototype.activate = function (t, i, o) {
                function r() {
                    s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
                        t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
                        t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        o && o();
                }
                var s = i.find("> .active"),
                    a = o && e.support.transition && ((s.length && s.hasClass("fade")) || !!i.find("> .fade").length);
                s.length && a ? s.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(), s.removeClass("in");
            });
        var i = e.fn.tab;
        (e.fn.tab = t),
            (e.fn.tab.Constructor = n),
            (e.fn.tab.noConflict = function () {
                return (e.fn.tab = i), this;
            });
        var o = function (n) {
            n.preventDefault(), t.call(e(this), "show");
        };
        e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o);
    })(jQuery),
    (function (e) {
        "use strict";
        function t(t) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.affix"),
                    r = "object" == typeof t && t;
                o || i.data("bs.affix", (o = new n(this, r))), "string" == typeof t && o[t]();
            });
        }
        var n = function (t, i) {
            (this.options = e.extend({}, n.DEFAULTS, i)),
                (this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this))),
                (this.$element = e(t)),
                (this.affixed = null),
                (this.unpin = null),
                (this.pinnedOffset = null),
                this.checkPosition();
        };
        (n.VERSION = "3.3.5"),
            (n.RESET = "affix affix-top affix-bottom"),
            (n.DEFAULTS = { offset: 0, target: window }),
            (n.prototype.getState = function (e, t, n, i) {
                var o = this.$target.scrollTop(),
                    r = this.$element.offset(),
                    s = this.$target.height();
                if (null != n && "top" == this.affixed) return o < n && "top";
                if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= r.top) && "bottom" : !(o + s <= e - i) && "bottom";
                var a = null == this.affixed,
                    l = a ? o : r.top;
                return null != n && o <= n ? "top" : null != i && l + (a ? s : t) >= e - i && "bottom";
            }),
            (n.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(n.RESET).addClass("affix");
                var e = this.$target.scrollTop(),
                    t = this.$element.offset();
                return (this.pinnedOffset = t.top - e);
            }),
            (n.prototype.checkPositionWithEventLoop = function () {
                setTimeout(e.proxy(this.checkPosition, this), 1);
            }),
            (n.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var t = this.$element.height(),
                        i = this.options.offset,
                        o = i.top,
                        r = i.bottom,
                        s = Math.max(e(document).height(), e(document.body).height());
                    "object" != typeof i && (r = o = i), "function" == typeof o && (o = i.top(this.$element)), "function" == typeof r && (r = i.bottom(this.$element));
                    var a = this.getState(s, t, o, r);
                    if (this.affixed != a) {
                        null != this.unpin && this.$element.css("top", "");
                        var l = "affix" + (a ? "-" + a : ""),
                            u = e.Event(l + ".bs.affix");
                        if ((this.$element.trigger(u), u.isDefaultPrevented())) return;
                        (this.affixed = a),
                            (this.unpin = "bottom" == a ? this.getPinnedOffset() : null),
                            this.$element
                                .removeClass(n.RESET)
                                .addClass(l)
                                .trigger(l.replace("affix", "affixed") + ".bs.affix");
                    }
                    "bottom" == a && this.$element.offset({ top: s - t - r });
                }
            });
        var i = e.fn.affix;
        (e.fn.affix = t),
            (e.fn.affix.Constructor = n),
            (e.fn.affix.noConflict = function () {
                return (e.fn.affix = i), this;
            }),
            e(window).on("load", function () {
                e('[data-spy="affix"]').each(function () {
                    var n = e(this),
                        i = n.data();
                    (i.offset = i.offset || {}), null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), t.call(n, i);
                });
            });
    })(jQuery),
    /*
     * jQuery appear plugin
     *
     * Copyright (c) 2012 Andrey Sidorov
     * licensed under MIT license.
     *
     * https://github.com/morr/jquery.appear/
     *
     * Version: 0.3.6
     */
    (function (e) {
        function t(t) {
            return e(t).filter(function () {
                return e(this).is(":appeared");
            });
        }
        function n() {
            s = !1;
            for (var e = 0, n = o.length; e < n; e++) {
                var i = t(o[e]);
                if ((i.trigger("appear", [i]), u[e])) {
                    var r = u[e].not(i);
                    r.trigger("disappear", [r]);
                }
                u[e] = i;
            }
        }
        function i(e) {
            o.push(e), u.push();
        }
        var o = [],
            r = !1,
            s = !1,
            a = { interval: 250, force_process: !1 },
            l = e(window),
            u = [];
        (e.expr[":"].appeared = function (t) {
            var n = e(t);
            if (!n.is(":visible")) return !1;
            var i = l.scrollLeft(),
                o = l.scrollTop(),
                r = n.offset(),
                s = r.left,
                a = r.top;
            return a + n.height() >= o && a - (n.data("appear-top-offset") || 0) <= o + l.height() && s + n.width() >= i && s - (n.data("appear-left-offset") || 0) <= i + l.width();
        }),
            e.fn.extend({
                appear: function (t) {
                    var o = e.extend({}, a, t || {}),
                        l = this.selector || this;
                    if (!r) {
                        var u = function () {
                            s || ((s = !0), setTimeout(n, o.interval));
                        };
                        e(window).scroll(u).resize(u).load(u), (r = !0);
                    }
                    return o.force_process && setTimeout(n, o.interval), i(l), e(l);
                },
            }),
            e.extend({
                force_appear: function () {
                    return !!r && (n(), !0);
                },
            });
    })("undefined" != typeof module ? require("jquery") : jQuery),
    (function () {
        function e(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                if ($(this).data("exitModal"))
                    if ("object" == typeof e) $.error("jQuery.exitModal already initialized");
                    else {
                        (i = $(this).data("exitModal"))[e] ? i[e].apply(i, t) : $.error("Method " + e + " does not exist on jQuery.exitModal");
                    }
                else {
                    var i = new n(this, e);
                    $(this).data("exitModal", i), i.init();
                }
            });
        }
        var t = 0,
            n = function (n, i) {
                (this.guid = t++),
                    (this.settings = $.extend({}, e.defaults, i)),
                    (this.$element = $(n)),
                    (this.showCounter = 0),
                    (this.eventPrefix = ".exitModal" + this.guid),
                    (this.modalShowEvent = "show.bs.modal" + this.eventPrefix),
                    (this.modalShownEvent = "shown.bs.modal" + this.eventPrefix),
                    (this.modalHideEvent = "hide.bs.modal" + this.eventPrefix),
                    (this.modalHiddenEvent = "hidden.bs.modal" + this.eventPrefix);
            };
        (n.prototype = {
            init: function () {
                var e = this;
                e.$element.modal({ backdrop: e.settings.modalBackdrop, keyboard: e.settings.modalKeyboard, show: !1 }),
                    e.$element.on(e.modalShowEvent, function () {
                        e.showCounter++, e.mouseOutEventUnbind(), e.settings.callbackOnModalShow.call(e);
                    }),
                    e.$element.on(e.modalShownEvent, function () {
                        e.settings.callbackOnModalShown.call(e);
                    }),
                    e.$element.on(e.modalHideEvent, function () {
                        e.settings.callbackOnModalHide.call(e);
                    }),
                    e.$element.on(e.modalHiddenEvent, function () {
                        e.settings.numberToShown ? e.showCounter < e.settings.numberToShown && e.mouseOutEventBind() : e.mouseOutEventBind(), e.settings.callbackOnModalHidden.call(e);
                    }),
                    e.mouseOutEventBind();
            },
            mouseOutEventBind: function () {
                var e = this,
                    t = 0;
                $(e.settings.viewportSelector).on("mousemove" + e.eventPrefix, function (n) {
                    n.clientY <= e.settings.pageYValueForEventFired && n.pageY < t && e.showModal(), (t = n.pageY);
                });
            },
            mouseOutEventUnbind: function () {
                var e = this;
                $(e.settings.viewportSelector).off("mousemove" + e.eventPrefix);
            },
            allEventsUnbind: function () {
                var e = this;
                $(e.settings.viewportSelector).off(e.eventPrefix), e.$element.off(e.eventPrefix);
            },
            showModal: function () {
                this.$element.modal("show");
            },
            hideModal: function () {
                this.$element.modal("hide");
            },
            destroy: function () {
                var e = this;
                e.allEventsUnbind(), e.$element.data("exitModal", null);
            },
        }),
            (e.defaults = {
                viewportSelector: document,
                showButtonClose: !0,
                showButtonCloseOnlyForMobile: !0,
                pageYValueForEventFired: 10,
                numberToShown: !1,
                modalBackdrop: !0,
                modalKeyboard: !0,
                modalShowEvent: "show.bs.modal",
                modalShownEvent: "shown.bs.modal",
                modalHideEvent: "hide.bs.modal",
                modalHiddenEvent: "hidden.bs.modal",
                callbackOnModalShow: function () {},
                callbackOnModalShown: function () {},
                callbackOnModalHide: function () {},
                callbackOnModalHidden: function () {},
            }),
            ($.fn.exitModal = e);
    })(),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? (module.exports = e(require("jquery"))) : e(jQuery || Zepto);
    })(function (e) {
        var t = function (t, n, i) {
            t = e(t);
            var o,
                r = this,
                s = t.val();
            n = "function" == typeof n ? n(t.val(), void 0, t, i) : n;
            var a = {
                invalid: [],
                getCaret: function () {
                    try {
                        var e,
                            n = 0,
                            o = t.get(0),
                            r = document.selection,
                            s = o.selectionStart;
                        return r && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((e = r.createRange()).moveStart("character", t.is("input") ? -t.val().length : -t.text().length), (n = e.text.length)) : (s || "0" === s) && (n = s), n;
                    } catch (i) {}
                },
                setCaret: function (e) {
                    try {
                        if (t.is(":focus")) {
                            var n,
                                i = t.get(0);
                            i.setSelectionRange ? i.setSelectionRange(e, e) : i.createTextRange && ((n = i.createTextRange()).collapse(!0), n.moveEnd("character", e), n.moveStart("character", e), n.select());
                        }
                    } catch (o) {}
                },
                events: function () {
                    t.on("input.mask keyup.mask", a.behaviour)
                        .on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                t.keydown().keyup();
                            }, 100);
                        })
                        .on("change.mask", function () {
                            t.data("changed", !0);
                        })
                        .on("blur.mask", function () {
                            s === t.val() || t.data("changed") || t.triggerHandler("change"), t.data("changed", !1);
                        })
                        .on("blur.mask", function () {
                            s = t.val();
                        })
                        .on("focus.mask", function (t) {
                            !0 === i.selectOnFocus && e(t.target).select();
                        })
                        .on("focusout.mask", function () {
                            i.clearIfNotMatch && !o.test(a.val()) && a.val("");
                        });
                },
                getRegexMask: function () {
                    for (var e, t, i, o, s = [], a = 0; a < n.length; a++)
                        (e = r.translation[n.charAt(a)])
                            ? ((t = e.pattern.toString().replace(/.{1}$|^.{1}/g, "")), (i = e.optional), (e = e.recursive) ? (s.push(n.charAt(a)), (o = { digit: n.charAt(a), pattern: t })) : s.push(i || e ? t + "?" : t))
                            : s.push(n.charAt(a).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    return (s = s.join("")), o && (s = s.replace(new RegExp("(" + o.digit + "(.*" + o.digit + ")?)"), "($1)?").replace(new RegExp(o.digit, "g"), o.pattern)), new RegExp(s);
                },
                destroyEvents: function () {
                    t.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "));
                },
                val: function (e) {
                    var n = t.is("input") ? "val" : "text";
                    return 0 < arguments.length ? (t[n]() !== e && t[n](e), (n = t)) : (n = t[n]()), n;
                },
                getMCharsBeforeCount: function (e, t) {
                    for (var i = 0, o = 0, s = n.length; o < s && o < e; o++) r.translation[n.charAt(o)] || ((e = t ? e + 1 : e), i++);
                    return i;
                },
                caretPos: function (e, t, i, o) {
                    return r.translation[n.charAt(Math.min(e - 1, n.length - 1))] ? Math.min(e + i - t - o, i) : a.caretPos(e + 1, t, i, o);
                },
                behaviour: function (t) {
                    (t = t || window.event), (a.invalid = []);
                    var n = t.keyCode || t.which;
                    if (-1 === e.inArray(n, r.byPassKeys)) {
                        var i = a.getCaret(),
                            o = a.val().length,
                            s = i < o,
                            l = a.getMasked(),
                            u = l.length,
                            c = a.getMCharsBeforeCount(u - 1) - a.getMCharsBeforeCount(o - 1);
                        return a.val(l), !s || (65 === n && t.ctrlKey) || (8 !== n && 46 !== n && (i = a.caretPos(i, o, u, c)), a.setCaret(i)), a.callbacks(t);
                    }
                },
                getMasked: function (e) {
                    var t,
                        o,
                        s = [],
                        l = a.val(),
                        u = 0,
                        c = n.length,
                        d = 0,
                        p = l.length,
                        h = 1,
                        f = "push",
                        m = -1;
                    for (
                        i.reverse
                            ? ((f = "unshift"),
                              (h = -1),
                              (t = 0),
                              (u = c - 1),
                              (d = p - 1),
                              (o = function () {
                                  return -1 < u && -1 < d;
                              }))
                            : ((t = c - 1),
                              (o = function () {
                                  return u < c && d < p;
                              }));
                        o();

                    ) {
                        var g = n.charAt(u),
                            v = l.charAt(d),
                            y = r.translation[g];
                        y
                            ? (v.match(y.pattern)
                                  ? (s[f](v), y.recursive && (-1 === m ? (m = u) : u === t && (u = m - h), t === m && (u -= h)), (u += h))
                                  : y.optional
                                  ? ((u += h), (d -= h))
                                  : y.fallback
                                  ? (s[f](y.fallback), (u += h), (d -= h))
                                  : a.invalid.push({ p: d, v: v, e: y.pattern }),
                              (d += h))
                            : (e || s[f](g), v === g && (d += h), (u += h));
                    }
                    return (e = n.charAt(t)), c !== p + 1 || r.translation[e] || s.push(e), s.join("");
                },
                callbacks: function (e) {
                    var o = a.val(),
                        r = o !== s,
                        l = [o, e, t, i],
                        u = function (e, t, n) {
                            "function" == typeof i[e] && t && i[e].apply(this, n);
                        };
                    u("onChange", !0 === r, l), u("onKeyPress", !0 === r, l), u("onComplete", o.length === n.length, l), u("onInvalid", 0 < a.invalid.length, [o, e, t, a.invalid, i]);
                },
            };
            (r.mask = n),
                (r.options = i),
                (r.remove = function () {
                    var e = a.getCaret();
                    return a.destroyEvents(), a.val(r.getCleanVal()), a.setCaret(e - a.getMCharsBeforeCount(e)), t;
                }),
                (r.getCleanVal = function () {
                    return a.getMasked(!0);
                }),
                (r.init = function (n) {
                    (n = n || !1),
                        (i = i || {}),
                        (r.byPassKeys = e.jMaskGlobals.byPassKeys),
                        (r.translation = e.jMaskGlobals.translation),
                        (r.translation = e.extend({}, r.translation, i.translation)),
                        (r = e.extend(!0, {}, r, i)),
                        (o = a.getRegexMask()),
                        !1 === n
                            ? (i.placeholder && t.attr("placeholder", i.placeholder),
                              e("input").length && !1 == "oninput" in e("input")[0] && "on" === t.attr("autocomplete") && t.attr("autocomplete", "off"),
                              a.destroyEvents(),
                              a.events(),
                              (n = a.getCaret()),
                              a.val(a.getMasked()),
                              a.setCaret(n + a.getMCharsBeforeCount(n, !0)))
                            : (a.events(), a.val(a.getMasked()));
                }),
                r.init(!t.is("input"));
        };
        e.maskWatchers = {};
        var n = function () {
                var n = e(this),
                    o = {},
                    r = n.attr("data-mask");
                if ((n.attr("data-mask-reverse") && (o.reverse = !0), n.attr("data-mask-clearifnotmatch") && (o.clearIfNotMatch = !0), "true" === n.attr("data-mask-selectonfocus") && (o.selectOnFocus = !0), i(n, r, o)))
                    return n.data("mask", new t(this, r, o));
            },
            i = function (t, n, i) {
                i = i || {};
                var o = e(t).data("mask"),
                    r = JSON.stringify;
                t = e(t).val() || e(t).text();
                try {
                    return "function" == typeof n && (n = n(t)), "object" != typeof o || r(o.options) !== r(i) || o.mask !== n;
                } catch (s) {}
            };
        (e.fn.mask = function (n, o) {
            o = o || {};
            var r = this.selector,
                s = e.jMaskGlobals,
                a = e.jMaskGlobals.watchInterval,
                l = function () {
                    if (i(this, n, o)) return e(this).data("mask", new t(this, n, o));
                };
            return (
                e(this).each(l),
                r &&
                    "" !== r &&
                    s.watchInputs &&
                    (clearInterval(e.maskWatchers[r]),
                    (e.maskWatchers[r] = setInterval(function () {
                        e(document).find(r).each(l);
                    }, a))),
                this
            );
        }),
            (e.fn.unmask = function () {
                return (
                    clearInterval(e.maskWatchers[this.selector]),
                    delete e.maskWatchers[this.selector],
                    this.each(function () {
                        var t = e(this).data("mask");
                        t && t.remove().removeData("mask");
                    })
                );
            }),
            (e.fn.cleanVal = function () {
                return this.data("mask").getCleanVal();
            }),
            (e.applyDataMask = function (t) {
                ((t = t || e.jMaskGlobals.maskElements) instanceof e ? t : e(t)).filter(e.jMaskGlobals.dataMaskAttr).each(n);
            });
        var o = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-mask]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            watchDataMask: !1,
            byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
            translation: { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } },
        };
        (e.jMaskGlobals = e.jMaskGlobals || {}),
            (o = e.jMaskGlobals = e.extend(!0, {}, o, e.jMaskGlobals)).dataMask && e.applyDataMask(),
            setInterval(function () {
                e.jMaskGlobals.watchDataMask && e.applyDataMask();
            }, o.watchInterval);
    }),
    $(document).ready(function () {
        $('[name*="zipcode"], [name="zc"]').mask("00000-0000"), $("#pii_ssn").mask("0000", { placeholder: "____" }), $("#person_loan_pii_ssn").mask("000-00-0000", { placeholder: "___-__-____" });
        var e = $("[name='pii[phone_number]']");
        "" !== e.val()
            ? e.mask("1 (000) 000-0000", { placeholder: "_ (___) ___-____" })
            : e.mask("(000) 000-0000", {
                  placeholder: "(___) ___-____",
                  onKeyPress: function () {
                      var e = $("[name='pii[phone_number]']");
                      "1" === e.val()[1] && (e.unmask(), e.mask("1 (000) 000-0000", { placeholder: "_ (___) ___-____" }));
                  },
              });
    }),
    $(window).load(function () {
        $(document).find('[name="zipcode"]:first').focus(), $(document).find('[name^="pii"]:first').focus();
    }),
    window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)
) {
    $(window).load(function () {
        observer.observe(document.documentElement, { childList: !0, subtree: !0 });
    });
    var observer = new MutationObserver(function (e) {
        e.forEach(function (e) {
            for (var t = e.addedNodes, n = 0, i = t.length; n < i; n++)
                if (
                    ((node = t[n]),
                    ("SCRIPT" !== node.tagName && "IFRAME" !== node.tagName && "LINK" !== node.tagName && "NOBR" !== node.tagName) ||
                        ($("nobr").contents().unwrap(),
                        $(".pxInta").contents().unwrap(),
                        $("[href*=chrome-extension],[src*=chrome-extension],[src*='pmmapads'],#FEEDS_FRAME,#pm-video-box,#pmo-dp-content-hook,#pmTextFrame,#mp_sys_flg,#mp_lp_flg").remove()),
                    "A" === node.tagName)
                ) {
                    var o = node.id,
                        r = node.className;
                    $(o).contents().unwrap(), $(r).contents().unwrap();
                }
        });
    });
}
$(function () {
    function e() {
        $('input[name*="pii"]').each(function () {
            var e = $(this).val();
            (e = e.replace(new RegExp(t.join("|"), "g"), "")), $(this).val(e);
        });
    }
    var t = [
        "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[#-9]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\xa9|\xae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26ff]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])",
    ];
    $('form[action="/submit/pii"]').on("submit", function () {
        e();
    }),
        $(document).on("blur", 'input[name*="pii"]', function () {
            e();
        });
}),
    $(function () {
        function e() {
            var e = $("#pii_street_address").val();
            1 == n ||
                $.trim(e).length <= 5 ||
                null == $.trim(e).match(/\d+\s+\w+\s+\w+/) ||
                ((n = !0),
                "undefined" != typeof goog_report_conversion && $.isFunction(goog_report_conversion)
                    ? goog_report_conversion()
                    : ("undefined" != typeof gtag_report_conversion && $.isFunction(gtag_report_conversion) && gtag_report_conversion(),
                      "undefined" != typeof uet_report_conversion && $.isFunction(uet_report_conversion) && uet_report_conversion()));
        }
        function t(e) {
            $("#edit_pii_modal").length &&
                ($('#edit_pii_modal input:not([name="pii[' + e + ']"])')
                    .closest(".form-group")
                    .hide()
                    .addClass("hidden"),
                $(".generated-location").hide().addClass("hidden"));
        }
        $('[name*="zipcode"]').one("change", function () {
            $(this).on("blur", function () {
                "" != $(this).val() && validate($(this));
            });
        }),
            $(document).on("blur", '[name^="pii["]:not([name="pii[zipcode]"], [name="pii[city]"])', function () {
                validate($(this));
            }),
            $(document).on("keyup", "#pii_street_address", function () {
                e();
            }),
            $(document).on("focus", "#pii_street_address", function () {
                e();
            });
        var n = !1;
        $(document).on("ajax:error", '[action="/submit/pii"]', function (e, n) {
            if (n.responseText.indexOf("The change you wanted was rejected") > 0) e.stopImmediatePropagation(), window.location.reload();
            else {
                var i = jQuery.parseJSON(n.responseText);
                if ($("#edit_pii_modal").length) submit_service_questions((n = { param: { first_name: "pii_loaded" } })), $("#edit_pii_modal").modal("show").find(".modal-title").text("Please correct the below field(s):");
                null != i.pii
                    ? $.each(i.pii, function (e, n) {
                          $('#hero input[name="pii[' + e + ']"]')
                              .parent()
                              .removeClass("has-error")
                              .find(".validation-msg")
                              .remove(),
                              $('#hero input[name="pii[' + e + ']"]')
                                  .after('<div class="validation-msg">' + n + "</div>")
                                  .parent()
                                  .addClass("has-error"),
                              t(e);
                      })
                    : ($('#hero input[name="' + i.name + '"]')
                          .parent()
                          .removeClass("has-error")
                          .find(".validation-msg")
                          .remove(),
                      $('#hero input[name="' + i.name + '"]')
                          .after('<div class="validation-msg">' + i.error + "</div>")
                          .parent()
                          .addClass("has-error"),
                      t(i.name));
            }
        }),
            $(document).on("ajax:error", '[action="/submit/zipcode"]', function (e, t) {
                var n = jQuery.parseJSON(t.responseText);
                $('#hero input[name="' + n.name + '"], #hero_section input[name="' + n.name + '"]')
                    .parent()
                    .removeClass("has-error")
                    .find(".validation-msg")
                    .remove(),
                    $('#hero input[name="' + n.name + '"], #hero_section input[name="' + n.name + '"]')
                        .after('<div class="validation-msg">' + n.error + "</div>")
                        .parent()
                        .addClass("has-error");
            });
    }),
    $(document).ready(function () {
        function e() {
            5 === ++t && clearInterval(n);
            $.ajax({
                type: "GET",
                url: "/state_name",
                dataType: "text",
                success: function (e) {
                    clearInterval(n), $(".state-name").html(e), $("p.view").css("visibility", "visible").hide().fadeIn("slow"), initStepsHeight();
                },
            });
        }
        var t = 0;
        if ($(".state-name").length) var n = setInterval(e, 3e3);
    }),
    (document_title = document.title),
    $(document).ready(function () {
        $("form").on("ajax:success", function (e, t) {
            if ("zipcode" == t.name && null != t.pii.city && null != t.pii.state_code) {
                var n = "";
                null != t.service_label && (n = t.service_label), (document.title = t.pii.city + ", " + t.pii.state_code + " " + n + " - " + document_title);
            }
        });
    }),
    $(function () {
        function e() {
            $('.second-service .service input[type="checkbox"]').each(function () {
                var e = $(this).val();
                $('input[value="' + e + '"]').is(":checked")
                    ? setTimeout(function () {
                          $("." + e + "-tcpa").slideDown(100);
                      }, 10)
                    : $(".second-service-tcpa").hide();
            });
        }
        e(),
            $('.second-service .service input[type="checkbox"]').on("change", function () {
                $(".second-service").find("input:checkbox:checked").length < 4 && e();
            });
    }),
    $(document).ajaxSend(function (e, t, n) {
        var i = $("meta[name=csrf-token]").attr("content");
        "/submit/pii" == n.url &&
            i !== undefined &&
            "" !== i &&
            (t.setRequestHeader("X-CSRF-Token", i), areCookiesEnabled() || (n.context ? (n.context.data = "cookies_disabled=1&" + n.context.data) : (n.data = "cookies_disabled=1&" + n.data)));
    }),
    $(function () {
        console.log("");
    }),
    $(function () {
        var e = document.referrer;
        window.history &&
            window.history.pushState &&
            "" !== e &&
            !document.referrer.includes(window.location.hostname) &&
            (history.pushState("", document.title, location.href),
            $(window).on("popstate", function () {
                history.pushState("", document.title, location.href);
            })),
            history.pushState && window.location.hash && history.pushState("", document.title, location.href.substr(0, location.href.indexOf("#")));
    }),
    String.prototype.includes ||
        (String.prototype.includes = function () {
            "use strict";
            return -1 !== !String.prototype.indexOf.apply(this, arguments);
        }),
    $(function () {
        $("button").on("click", function () {
            var e = $(this),
                t = e.html();
            setTimeout(function () {
                e.is("[disabled]") && e.removeAttr("disabled").html(t);
            }, 5e3);
        });
    }),
    $(function () {
        !$("#marCallAds")[0] ||
            ("/continue" != window.location.pathname && "/thank-you" != window.location.pathname) ||
            $.ajax({
                async: !0,
                url: "/marchex-listings",
                type: "GET",
                dataType: "script",
                success: function () {
                    $("#marCallAds").slideDown("300");
                },
            }),
            $("form").on("ajax:success", function (e, t) {
                "zipcode" == t.name &&
                    $("#marCallAds")[0] &&
                    $.ajax({
                        async: !0,
                        url: "/marchex-listings",
                        type: "GET",
                        dataType: "script",
                        data: { zipcode: $("#zipcode").val() },
                        success: function () {
                            $("#marCallAds").slideDown("300");
                        },
                    });
            });
    }),
    $(document).on("shown.bs.modal", "#terms, #privacy, #custom_privacy", function () {
        (path = $(this).attr("id")),
            console.log(path),
            $.get("/" + path, function (e) {
                $("#" + path + " .modal-body").html(e);
            });
    }),
    (isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)),
    isSafari ||
        (render_script("https://www.gstatic.com/firebasejs/6.0.4/firebase-app.js", !1),
        render_script("https://www.gstatic.com/firebasejs/6.0.4/firebase-messaging.js", !1),
        render_script("push.min.js", !0),
        render_script("push.fcm.js", !0),
        render_script("add_manifest.js", !0),
        render_script("push_notifications.js", !0)),
    (function (e) {
        function t(e) {
            var t = e.length,
                i = n.type(e);
            return "function" !== i && !n.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === i || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e));
        }
        if (!e.jQuery) {
            var n = function (e, t) {
                return new n.fn.init(e, t);
            };
            (n.isWindow = function (e) {
                return null != e && e == e.window;
            }),
                (n.type = function (e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? o[s.call(e)] || "object" : typeof e;
                }),
                (n.isArray =
                    Array.isArray ||
                    function (e) {
                        return "array" === n.type(e);
                    }),
                (n.isPlainObject = function (e) {
                    var t;
                    if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !r.call(e, "constructor") && !r.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                    } catch (i) {
                        return !1;
                    }
                    for (t in e);
                    return void 0 === t || r.call(e, t);
                }),
                (n.each = function (e, n, i) {
                    var o = 0,
                        r = e.length,
                        s = t(e);
                    if (i) {
                        if (s) for (; r > o && !1 !== n.apply(e[o], i); o++);
                        else for (o in e) if (!1 === n.apply(e[o], i)) break;
                    } else if (s) for (; r > o && !1 !== n.call(e[o], o, e[o]); o++);
                    else for (o in e) if (!1 === n.call(e[o], o, e[o])) break;
                    return e;
                }),
                (n.data = function (e, t, o) {
                    if (void 0 === o) {
                        var r = (s = e[n.expando]) && i[s];
                        if (void 0 === t) return r;
                        if (r && t in r) return r[t];
                    } else if (void 0 !== t) {
                        var s = e[n.expando] || (e[n.expando] = ++n.uuid);
                        return (i[s] = i[s] || {}), (i[s][t] = o), o;
                    }
                }),
                (n.removeData = function (e, t) {
                    var o = e[n.expando],
                        r = o && i[o];
                    r &&
                        n.each(t, function (e, t) {
                            delete r[t];
                        });
                }),
                (n.extend = function () {
                    var e,
                        t,
                        i,
                        o,
                        r,
                        s,
                        a = arguments[0] || {},
                        l = 1,
                        u = arguments.length,
                        c = !1;
                    for ("boolean" == typeof a && ((c = a), (a = arguments[l] || {}), l++), "object" != typeof a && "function" !== n.type(a) && (a = {}), l === u && ((a = this), l--); u > l; l++)
                        if (null != (r = arguments[l]))
                            for (o in r)
                                (e = a[o]),
                                    a !== (i = r[o]) &&
                                        (c && i && (n.isPlainObject(i) || (t = n.isArray(i)))
                                            ? (t ? ((t = !1), (s = e && n.isArray(e) ? e : [])) : (s = e && n.isPlainObject(e) ? e : {}), (a[o] = n.extend(c, s, i)))
                                            : void 0 !== i && (a[o] = i));
                    return a;
                }),
                (n.queue = function (e, i, o) {
                    function r(e, n) {
                        var i = n || [];
                        return (
                            null != e &&
                                (t(Object(e))
                                    ? (function (e, t) {
                                          for (var n = +t.length, i = 0, o = e.length; n > i; ) e[o++] = t[i++];
                                          if (n != n) for (; void 0 !== t[i]; ) e[o++] = t[i++];
                                          e.length = o;
                                      })(i, "string" == typeof e ? [e] : e)
                                    : [].push.call(i, e)),
                            i
                        );
                    }
                    if (e) {
                        i = (i || "fx") + "queue";
                        var s = n.data(e, i);
                        return o ? (!s || n.isArray(o) ? (s = n.data(e, i, r(o))) : s.push(o), s) : s || [];
                    }
                }),
                (n.dequeue = function (e, t) {
                    n.each(e.nodeType ? [e] : e, function (e, i) {
                        t = t || "fx";
                        var o = n.queue(i, t),
                            r = o.shift();
                        "inprogress" === r && (r = o.shift()),
                            r &&
                                ("fx" === t && o.unshift("inprogress"),
                                r.call(i, function () {
                                    n.dequeue(i, t);
                                }));
                    });
                }),
                (n.fn = n.prototype = {
                    init: function (e) {
                        if (e.nodeType) return (this[0] = e), this;
                        throw new Error("Not a DOM node.");
                    },
                    offset: function () {
                        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
                        return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
                    },
                    position: function () {
                        function e() {
                            for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position; ) e = e.offsetParent;
                            return e || document;
                        }
                        var t = this[0],
                            e = e.apply(t),
                            i = this.offset(),
                            o = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : n(e).offset();
                        return (
                            (i.top -= parseFloat(t.style.marginTop) || 0),
                            (i.left -= parseFloat(t.style.marginLeft) || 0),
                            e.style && ((o.top += parseFloat(e.style.borderTopWidth) || 0), (o.left += parseFloat(e.style.borderLeftWidth) || 0)),
                            { top: i.top - o.top, left: i.left - o.left }
                        );
                    },
                });
            var i = {};
            (n.expando = "velocity" + new Date().getTime()), (n.uuid = 0);
            for (var o = {}, r = o.hasOwnProperty, s = o.toString, a = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < a.length; l++) o["[object " + a[l] + "]"] = a[l].toLowerCase();
            (n.fn.init.prototype = n.fn), (e.Velocity = { Utilities: n });
        }
    })(window),
    (function (e) {
        "object" == typeof module && "object" == typeof module.exports ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : e();
    })(function () {
        return (function (e, t, n, i) {
            function o(e) {
                for (var t = -1, n = e ? e.length : 0, i = []; ++t < n; ) {
                    var o = e[t];
                    o && i.push(o);
                }
                return i;
            }
            function r(e) {
                return m.isWrapped(e) ? (e = [].slice.call(e)) : m.isNode(e) && (e = [e]), e;
            }
            function s(e) {
                var t = p.data(e, "velocity");
                return null === t ? i : t;
            }
            function a(e) {
                return function (t) {
                    return Math.round(t * e) * (1 / e);
                };
            }
            function l(e, n, i, o) {
                function r(e, t) {
                    return 1 - 3 * t + 3 * e;
                }
                function s(e, t) {
                    return 3 * t - 6 * e;
                }
                function a(e) {
                    return 3 * e;
                }
                function l(e, t, n) {
                    return ((r(t, n) * e + s(t, n)) * e + a(t)) * e;
                }
                function u(e, t, n) {
                    return 3 * r(t, n) * e * e + 2 * s(t, n) * e + a(t);
                }
                function c(t, n) {
                    for (var o = 0; m > o; ++o) {
                        var r = u(n, e, i);
                        if (0 === r) return n;
                        n -= (l(n, e, i) - t) / r;
                    }
                    return n;
                }
                function d() {
                    for (var t = 0; b > t; ++t) _[t] = l(t * w, e, i);
                }
                function p(t, n, o) {
                    var r,
                        s,
                        a = 0;
                    do {
                        (r = l((s = n + (o - n) / 2), e, i) - t) > 0 ? (o = s) : (n = s);
                    } while (Math.abs(r) > v && ++a < y);
                    return s;
                }
                function h(t) {
                    for (var n = 0, o = 1, r = b - 1; o != r && _[o] <= t; ++o) n += w;
                    var s = n + ((t - _[--o]) / (_[o + 1] - _[o])) * w,
                        a = u(s, e, i);
                    return a >= g ? c(t, s) : 0 == a ? s : p(t, n, n + w);
                }
                function f() {
                    (C = !0), (e != n || i != o) && d();
                }
                var m = 4,
                    g = 0.001,
                    v = 1e-7,
                    y = 10,
                    b = 11,
                    w = 1 / (b - 1),
                    x = "Float32Array" in t;
                if (4 !== arguments.length) return !1;
                for (var $ = 0; 4 > $; ++$) if ("number" != typeof arguments[$] || isNaN(arguments[$]) || !isFinite(arguments[$])) return !1;
                (e = Math.min(e, 1)), (i = Math.min(i, 1)), (e = Math.max(e, 0)), (i = Math.max(i, 0));
                var _ = x ? new Float32Array(b) : new Array(b),
                    C = !1,
                    T = function (t) {
                        return C || f(), e === n && i === o ? t : 0 === t ? 0 : 1 === t ? 1 : l(h(t), n, o);
                    };
                T.getControlPoints = function () {
                    return [
                        { x: e, y: n },
                        { x: i, y: o },
                    ];
                };
                var k = "generateBezier(" + [e, n, i, o] + ")";
                return (
                    (T.toString = function () {
                        return k;
                    }),
                    T
                );
            }
            function u(e, t) {
                var n = e;
                return (
                    m.isString(e) ? b.Easings[e] || (n = !1) : (n = m.isArray(e) && 1 === e.length ? a.apply(null, e) : m.isArray(e) && 2 === e.length ? w.apply(null, e.concat([t])) : !(!m.isArray(e) || 4 !== e.length) && l.apply(null, e)),
                    !1 === n && (n = b.Easings[b.defaults.easing] ? b.defaults.easing : y),
                    n
                );
            }
            function c(e) {
                if (e) {
                    var t = new Date().getTime(),
                        n = b.State.calls.length;
                    n > 1e4 && (b.State.calls = o(b.State.calls));
                    for (var r = 0; n > r; r++)
                        if (b.State.calls[r]) {
                            var a = b.State.calls[r],
                                l = a[0],
                                u = a[2],
                                h = a[3],
                                f = !!h,
                                g = null;
                            h || (h = b.State.calls[r][3] = t - 16);
                            for (var v = Math.min((t - h) / u.duration, 1), y = 0, w = l.length; w > y; y++) {
                                var $ = l[y],
                                    C = $.element;
                                if (s(C)) {
                                    var T = !1;
                                    if (u.display !== i && null !== u.display && "none" !== u.display) {
                                        if ("flex" === u.display) {
                                            var k = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            p.each(k, function (e, t) {
                                                x.setPropertyValue(C, "display", t);
                                            });
                                        }
                                        x.setPropertyValue(C, "display", u.display);
                                    }
                                    for (var S in (u.visibility !== i && "hidden" !== u.visibility && x.setPropertyValue(C, "visibility", u.visibility), $))
                                        if ("element" !== S) {
                                            var E,
                                                A = $[S],
                                                j = m.isString(A.easing) ? b.Easings[A.easing] : A.easing;
                                            if (1 === v) E = A.endValue;
                                            else {
                                                var N = A.endValue - A.startValue;
                                                if (((E = A.startValue + N * j(v, u, N)), !f && E === A.currentValue)) continue;
                                            }
                                            if (((A.currentValue = E), "tween" === S)) g = E;
                                            else {
                                                if (x.Hooks.registered[S]) {
                                                    var D = x.Hooks.getRoot(S),
                                                        P = s(C).rootPropertyValueCache[D];
                                                    P && (A.rootPropertyValue = P);
                                                }
                                                var O = x.setPropertyValue(C, S, A.currentValue + (0 === parseFloat(E) ? "" : A.unitType), A.rootPropertyValue, A.scrollData);
                                                x.Hooks.registered[S] && (s(C).rootPropertyValueCache[D] = x.Normalizations.registered[D] ? x.Normalizations.registered[D]("extract", null, O[1]) : O[1]), "transform" === O[0] && (T = !0);
                                            }
                                        }
                                    u.mobileHA && s(C).transformCache.translate3d === i && ((s(C).transformCache.translate3d = "(0px, 0px, 0px)"), (T = !0)), T && x.flushTransformCache(C);
                                }
                            }
                            u.display !== i && "none" !== u.display && (b.State.calls[r][2].display = !1),
                                u.visibility !== i && "hidden" !== u.visibility && (b.State.calls[r][2].visibility = !1),
                                u.progress && u.progress.call(a[1], a[1], v, Math.max(0, h + u.duration - t), h, g),
                                1 === v && d(r);
                        }
                }
                b.State.isTicking && _(c);
            }
            function d(e, t) {
                if (!b.State.calls[e]) return !1;
                for (var n = b.State.calls[e][0], o = b.State.calls[e][1], r = b.State.calls[e][2], a = b.State.calls[e][4], l = !1, u = 0, c = n.length; c > u; u++) {
                    var d = n[u].element;
                    if (
                        (t || r.loop || ("none" === r.display && x.setPropertyValue(d, "display", r.display), "hidden" === r.visibility && x.setPropertyValue(d, "visibility", r.visibility)),
                        !0 !== r.loop && (p.queue(d)[1] === i || !/\.velocityQueueEntryFlag/i.test(p.queue(d)[1])) && s(d))
                    ) {
                        (s(d).isAnimating = !1), (s(d).rootPropertyValueCache = {});
                        var h = !1;
                        p.each(x.Lists.transforms3D, function (e, t) {
                            var n = /^scale/.test(t) ? 1 : 0,
                                o = s(d).transformCache[t];
                            s(d).transformCache[t] !== i && new RegExp("^\\(" + n + "[^.]").test(o) && ((h = !0), delete s(d).transformCache[t]);
                        }),
                            r.mobileHA && ((h = !0), delete s(d).transformCache.translate3d),
                            h && x.flushTransformCache(d),
                            x.Values.removeClass(d, "velocity-animating");
                    }
                    if (!t && r.complete && !r.loop && u === c - 1)
                        try {
                            r.complete.call(o, o);
                        } catch (f) {
                            setTimeout(function () {
                                throw f;
                            }, 1);
                        }
                    a && !0 !== r.loop && a(o),
                        s(d) &&
                            !0 === r.loop &&
                            !t &&
                            (p.each(s(d).tweensContainer, function (e, t) {
                                /^rotate/.test(e) && 360 === parseFloat(t.endValue) && ((t.endValue = 0), (t.startValue = 360)),
                                    /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && ((t.endValue = 0), (t.startValue = 100));
                            }),
                            b(d, "reverse", { loop: !0, delay: r.delay })),
                        !1 !== r.queue && p.dequeue(d, r.queue);
                }
                b.State.calls[e] = !1;
                for (var m = 0, g = b.State.calls.length; g > m; m++)
                    if (!1 !== b.State.calls[m]) {
                        l = !0;
                        break;
                    }
                !1 === l && ((b.State.isTicking = !1), delete b.State.calls, (b.State.calls = []));
            }
            var p,
                h = (function () {
                    if (n.documentMode) return n.documentMode;
                    for (var e = 7; e > 4; e--) {
                        var t = n.createElement("div");
                        if (((t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->"), t.getElementsByTagName("span").length)) return (t = null), e;
                    }
                    return i;
                })(),
                f = (function () {
                    var e = 0;
                    return (
                        t.webkitRequestAnimationFrame ||
                        t.mozRequestAnimationFrame ||
                        function (t) {
                            var n,
                                i = new Date().getTime();
                            return (
                                (n = Math.max(0, 16 - (i - e))),
                                (e = i + n),
                                setTimeout(function () {
                                    t(i + n);
                                }, n)
                            );
                        }
                    );
                })(),
                m = {
                    isString: function (e) {
                        return "string" == typeof e;
                    },
                    isArray:
                        Array.isArray ||
                        function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e);
                        },
                    isFunction: function (e) {
                        return "[object Function]" === Object.prototype.toString.call(e);
                    },
                    isNode: function (e) {
                        return e && e.nodeType;
                    },
                    isNodeList: function (e) {
                        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== i && (0 === e.length || ("object" == typeof e[0] && e[0].nodeType > 0));
                    },
                    isWrapped: function (e) {
                        return e && (e.jquery || (t.Zepto && t.Zepto.zepto.isZ(e)));
                    },
                    isSVG: function (e) {
                        return t.SVGElement && e instanceof t.SVGElement;
                    },
                    isEmptyObject: function (e) {
                        for (var t in e) return !1;
                        return !0;
                    },
                },
                g = !1;
            if ((e.fn && e.fn.jquery ? ((p = e), (g = !0)) : (p = t.Velocity.Utilities), 8 >= h && !g)) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (!(7 >= h)) {
                var v = 400,
                    y = "swing",
                    b = {
                        State: {
                            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                            isAndroid: /Android/i.test(navigator.userAgent),
                            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                            isChrome: t.chrome,
                            isFirefox: /Firefox/i.test(navigator.userAgent),
                            prefixElement: n.createElement("div"),
                            prefixMatches: {},
                            scrollAnchor: null,
                            scrollPropertyLeft: null,
                            scrollPropertyTop: null,
                            isTicking: !1,
                            calls: [],
                        },
                        CSS: {},
                        Utilities: p,
                        Redirects: {},
                        Easings: {},
                        Promise: t.Promise,
                        defaults: { queue: "", duration: v, easing: y, begin: i, complete: i, progress: i, display: i, visibility: i, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 },
                        init: function (e) {
                            p.data(e, "velocity", { isSVG: m.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
                        },
                        hook: null,
                        mock: !1,
                        version: { major: 1, minor: 2, patch: 2 },
                        debug: !1,
                    };
                t.pageYOffset !== i
                    ? ((b.State.scrollAnchor = t), (b.State.scrollPropertyLeft = "pageXOffset"), (b.State.scrollPropertyTop = "pageYOffset"))
                    : ((b.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body), (b.State.scrollPropertyLeft = "scrollLeft"), (b.State.scrollPropertyTop = "scrollTop"));
                var w = (function () {
                    function e(e) {
                        return -e.tension * e.x - e.friction * e.v;
                    }
                    function t(t, n, i) {
                        var o = { x: t.x + i.dx * n, v: t.v + i.dv * n, tension: t.tension, friction: t.friction };
                        return { dx: o.v, dv: e(o) };
                    }
                    function n(n, i) {
                        var o = { dx: n.v, dv: e(n) },
                            r = t(n, 0.5 * i, o),
                            s = t(n, 0.5 * i, r),
                            a = t(n, i, s),
                            l = (1 / 6) * (o.dx + 2 * (r.dx + s.dx) + a.dx),
                            u = (1 / 6) * (o.dv + 2 * (r.dv + s.dv) + a.dv);
                        return (n.x = n.x + l * i), (n.v = n.v + u * i), n;
                    }
                    return function i(e, t, o) {
                        var r,
                            s,
                            a,
                            l = { x: -1, v: 0, tension: null, friction: null },
                            u = [0],
                            c = 0,
                            d = 1e-4,
                            p = 0.016;
                        for (
                            e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, l.tension = e, l.friction = t, (r = null !== o) ? (s = ((c = i(e, t)) / o) * p) : (s = p);
                            (a = n(a || l, s)), u.push(1 + a.x), (c += 16), Math.abs(a.x) > d && Math.abs(a.v) > d;

                        );
                        return r
                            ? function (e) {
                                  return u[(e * (u.length - 1)) | 0];
                              }
                            : c;
                    };
                })();
                (b.Easings = {
                    linear: function (e) {
                        return e;
                    },
                    swing: function (e) {
                        return 0.5 - Math.cos(e * Math.PI) / 2;
                    },
                    spring: function (e) {
                        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
                    },
                }),
                    p.each(
                        [
                            ["ease", [0.25, 0.1, 0.25, 1]],
                            ["ease-in", [0.42, 0, 1, 1]],
                            ["ease-out", [0, 0, 0.58, 1]],
                            ["ease-in-out", [0.42, 0, 0.58, 1]],
                            ["easeInSine", [0.47, 0, 0.745, 0.715]],
                            ["easeOutSine", [0.39, 0.575, 0.565, 1]],
                            ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
                            ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
                            ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
                            ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
                            ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
                            ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
                            ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
                            ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
                            ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
                            ["easeInOutQuart", [0.77, 0, 0.175, 1]],
                            ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
                            ["easeOutQuint", [0.23, 1, 0.32, 1]],
                            ["easeInOutQuint", [0.86, 0, 0.07, 1]],
                            ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
                            ["easeOutExpo", [0.19, 1, 0.22, 1]],
                            ["easeInOutExpo", [1, 0, 0, 1]],
                            ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
                            ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
                            ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]],
                        ],
                        function (e, t) {
                            b.Easings[t[0]] = l.apply(null, t[1]);
                        }
                    );
                var x = (b.CSS = {
                    RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi },
                    Lists: {
                        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                    },
                    Hooks: {
                        templates: {
                            textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                            boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                            clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                            backgroundPosition: ["X Y", "0% 0%"],
                            transformOrigin: ["X Y Z", "50% 50% 0px"],
                            perspectiveOrigin: ["X Y", "50% 50%"],
                        },
                        registered: {},
                        register: function () {
                            for (var e = 0; e < x.Lists.colors.length; e++) {
                                var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                                x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t];
                            }
                            var n, i, o;
                            if (h)
                                for (n in x.Hooks.templates) {
                                    o = (i = x.Hooks.templates[n])[0].split(" ");
                                    var r = i[1].match(x.RegEx.valueSplit);
                                    "Color" === o[0] && (o.push(o.shift()), r.push(r.shift()), (x.Hooks.templates[n] = [o.join(" "), r.join(" ")]));
                                }
                            for (n in x.Hooks.templates)
                                for (var e in (o = (i = x.Hooks.templates[n])[0].split(" "))) {
                                    var s = n + o[e],
                                        a = e;
                                    x.Hooks.registered[s] = [n, a];
                                }
                        },
                        getRoot: function (e) {
                            var t = x.Hooks.registered[e];
                            return t ? t[0] : e;
                        },
                        cleanRootPropertyValue: function (e, t) {
                            return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t;
                        },
                        extractValue: function (e, t) {
                            var n = x.Hooks.registered[e];
                            if (n) {
                                var i = n[0],
                                    o = n[1];
                                return (t = x.Hooks.cleanRootPropertyValue(i, t)).toString().match(x.RegEx.valueSplit)[o];
                            }
                            return t;
                        },
                        injectValue: function (e, t, n) {
                            var i = x.Hooks.registered[e];
                            if (i) {
                                var o,
                                    r = i[0],
                                    s = i[1];
                                return ((o = (n = x.Hooks.cleanRootPropertyValue(r, n)).toString().match(x.RegEx.valueSplit))[s] = t), o.join(" ");
                            }
                            return n;
                        },
                    },
                    Normalizations: {
                        registered: {
                            clip: function (e, t, n) {
                                switch (e) {
                                    case "name":
                                        return "clip";
                                    case "extract":
                                        var i;
                                        return x.RegEx.wrappedValueAlreadyExtracted.test(n) ? (i = n) : (i = (i = n.toString().match(x.RegEx.valueUnwrap)) ? i[1].replace(/,(\s+)?/g, " ") : n), i;
                                    case "inject":
                                        return "rect(" + n + ")";
                                }
                            },
                            blur: function (e, t, n) {
                                switch (e) {
                                    case "name":
                                        return b.State.isFirefox ? "filter" : "-webkit-filter";
                                    case "extract":
                                        var i = parseFloat(n);
                                        if (!i && 0 !== i) {
                                            var o = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                            i = o ? o[1] : 0;
                                        }
                                        return i;
                                    case "inject":
                                        return parseFloat(n) ? "blur(" + n + ")" : "none";
                                }
                            },
                            opacity: function (e, t, n) {
                                if (8 >= h)
                                    switch (e) {
                                        case "name":
                                            return "filter";
                                        case "extract":
                                            var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                            return i ? i[1] / 100 : 1;
                                        case "inject":
                                            return (t.style.zoom = 1), parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")";
                                    }
                                else
                                    switch (e) {
                                        case "name":
                                            return "opacity";
                                        case "extract":
                                        case "inject":
                                            return n;
                                    }
                            },
                        },
                        register: function () {
                            9 >= h || b.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                            for (var e = 0; e < x.Lists.transformsBase.length; e++)
                                !(function () {
                                    var t = x.Lists.transformsBase[e];
                                    x.Normalizations.registered[t] = function (e, n, o) {
                                        switch (e) {
                                            case "name":
                                                return "transform";
                                            case "extract":
                                                return s(n) === i || s(n).transformCache[t] === i ? (/^scale/i.test(t) ? 1 : 0) : s(n).transformCache[t].replace(/[()]/g, "");
                                            case "inject":
                                                var r = !1;
                                                switch (t.substr(0, t.length - 1)) {
                                                    case "translate":
                                                        r = !/(%|px|em|rem|vw|vh|\d)$/i.test(o);
                                                        break;
                                                    case "scal":
                                                    case "scale":
                                                        b.State.isAndroid && s(n).transformCache[t] === i && 1 > o && (o = 1), (r = !/(\d)$/i.test(o));
                                                        break;
                                                    case "skew":
                                                        r = !/(deg|\d)$/i.test(o);
                                                        break;
                                                    case "rotate":
                                                        r = !/(deg|\d)$/i.test(o);
                                                }
                                                return r || (s(n).transformCache[t] = "(" + o + ")"), s(n).transformCache[t];
                                        }
                                    };
                                })();
                            for (e = 0; e < x.Lists.colors.length; e++)
                                !(function () {
                                    var t = x.Lists.colors[e];
                                    x.Normalizations.registered[t] = function (e, n, o) {
                                        switch (e) {
                                            case "name":
                                                return t;
                                            case "extract":
                                                var r;
                                                if (x.RegEx.wrappedValueAlreadyExtracted.test(o)) r = o;
                                                else {
                                                    var s,
                                                        a = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };
                                                    /^[A-z]+$/i.test(o) ? (s = a[o] !== i ? a[o] : a.black) : x.RegEx.isHex.test(o) ? (s = "rgb(" + x.Values.hexToRgb(o).join(" ") + ")") : /^rgba?\(/i.test(o) || (s = a.black),
                                                        (r = (s || o)
                                                            .toString()
                                                            .match(x.RegEx.valueUnwrap)[1]
                                                            .replace(/,(\s+)?/g, " "));
                                                }
                                                return 8 >= h || 3 !== r.split(" ").length || (r += " 1"), r;
                                            case "inject":
                                                return (
                                                    8 >= h ? 4 === o.split(" ").length && (o = o.split(/\s+/).slice(0, 3).join(" ")) : 3 === o.split(" ").length && (o += " 1"),
                                                    (8 >= h ? "rgb" : "rgba") + "(" + o.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                                );
                                        }
                                    };
                                })();
                        },
                    },
                    Names: {
                        camelCase: function (e) {
                            return e.replace(/-(\w)/g, function (e, t) {
                                return t.toUpperCase();
                            });
                        },
                        SVGAttribute: function (e) {
                            var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                            return (h || (b.State.isAndroid && !b.State.isChrome)) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
                        },
                        prefixCheck: function (e) {
                            if (b.State.prefixMatches[e]) return [b.State.prefixMatches[e], !0];
                            for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = t.length; i > n; n++) {
                                var o;
                                if (
                                    ((o =
                                        0 === n
                                            ? e
                                            : t[n] +
                                              e.replace(/^\w/, function (e) {
                                                  return e.toUpperCase();
                                              })),
                                    m.isString(b.State.prefixElement.style[o]))
                                )
                                    return (b.State.prefixMatches[e] = o), [o, !0];
                            }
                            return [e, !1];
                        },
                    },
                    Values: {
                        hexToRgb: function (e) {
                            var t,
                                n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                                i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                            return (
                                (e = e.replace(n, function (e, t, n, i) {
                                    return t + t + n + n + i + i;
                                })),
                                (t = i.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                            );
                        },
                        isCSSNullValue: function (e) {
                            return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
                        },
                        getUnitType: function (e) {
                            return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px";
                        },
                        getDisplayType: function (e) {
                            var t = e && e.tagName.toString().toLowerCase();
                            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)
                                ? "inline"
                                : /^(li)$/i.test(t)
                                ? "list-item"
                                : /^(tr)$/i.test(t)
                                ? "table-row"
                                : /^(table)$/i.test(t)
                                ? "table"
                                : /^(tbody)$/i.test(t)
                                ? "table-row-group"
                                : "block";
                        },
                        addClass: function (e, t) {
                            e.classList ? e.classList.add(t) : (e.className += (e.className.length ? " " : "") + t);
                        },
                        removeClass: function (e, t) {
                            e.classList ? e.classList.remove(t) : (e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " "));
                        },
                    },
                    getPropertyValue: function (e, n, o, r) {
                        function a(e, n) {
                            function o() {
                                c && x.setPropertyValue(e, "display", "none");
                            }
                            var l = 0;
                            if (8 >= h) l = p.css(e, n);
                            else {
                                var u,
                                    c = !1;
                                if ((/^(width|height)$/.test(n) && 0 === x.getPropertyValue(e, "display") && ((c = !0), x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !r)) {
                                    if ("height" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var d =
                                            e.offsetHeight -
                                            (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                                        return o(), d;
                                    }
                                    if ("width" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var f =
                                            e.offsetWidth -
                                            (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) -
                                            (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                                        return o(), f;
                                    }
                                }
                                (u = s(e) === i ? t.getComputedStyle(e, null) : s(e).computedStyle ? s(e).computedStyle : (s(e).computedStyle = t.getComputedStyle(e, null))),
                                    "borderColor" === n && (n = "borderTopColor"),
                                    ("" === (l = 9 === h && "filter" === n ? u.getPropertyValue(n) : u[n]) || null === l) && (l = e.style[n]),
                                    o();
                            }
                            if ("auto" === l && /^(top|right|bottom|left)$/i.test(n)) {
                                var m = a(e, "position");
                                ("fixed" === m || ("absolute" === m && /top|left/i.test(n))) && (l = p(e).position()[n] + "px");
                            }
                            return l;
                        }
                        var l;
                        if (x.Hooks.registered[n]) {
                            var u = n,
                                c = x.Hooks.getRoot(u);
                            o === i && (o = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (o = x.Normalizations.registered[c]("extract", e, o)), (l = x.Hooks.extractValue(u, o));
                        } else if (x.Normalizations.registered[n]) {
                            var d, f;
                            "transform" !== (d = x.Normalizations.registered[n]("name", e)) && ((f = a(e, x.Names.prefixCheck(d)[0])), x.Values.isCSSNullValue(f) && x.Hooks.templates[n] && (f = x.Hooks.templates[n][1])),
                                (l = x.Normalizations.registered[n]("extract", e, f));
                        }
                        if (!/^[\d-]/.test(l))
                            if (s(e) && s(e).isSVG && x.Names.SVGAttribute(n))
                                if (/^(height|width)$/i.test(n))
                                    try {
                                        l = e.getBBox()[n];
                                    } catch (m) {
                                        l = 0;
                                    }
                                else l = e.getAttribute(n);
                            else l = a(e, x.Names.prefixCheck(n)[0]);
                        return x.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + n + ": " + l), l;
                    },
                    setPropertyValue: function (e, n, i, o, r) {
                        var a = n;
                        if ("scroll" === n) r.container ? (r.container["scroll" + r.direction] = i) : "Left" === r.direction ? t.scrollTo(i, r.alternateValue) : t.scrollTo(r.alternateValue, i);
                        else if (x.Normalizations.registered[n] && "transform" === x.Normalizations.registered[n]("name", e)) x.Normalizations.registered[n]("inject", e, i), (a = "transform"), (i = s(e).transformCache[n]);
                        else {
                            if (x.Hooks.registered[n]) {
                                var l = n,
                                    u = x.Hooks.getRoot(n);
                                (o = o || x.getPropertyValue(e, u)), (i = x.Hooks.injectValue(l, i, o)), (n = u);
                            }
                            if ((x.Normalizations.registered[n] && ((i = x.Normalizations.registered[n]("inject", e, i)), (n = x.Normalizations.registered[n]("name", e))), (a = x.Names.prefixCheck(n)[0]), 8 >= h))
                                try {
                                    e.style[a] = i;
                                } catch (c) {
                                    b.debug && console.log("Browser does not support [" + i + "] for [" + a + "]");
                                }
                            else s(e) && s(e).isSVG && x.Names.SVGAttribute(n) ? e.setAttribute(n, i) : (e.style[a] = i);
                            b.debug >= 2 && console.log("Set " + n + " (" + a + "): " + i);
                        }
                        return [a, i];
                    },
                    flushTransformCache: function (e) {
                        function t(t) {
                            return parseFloat(x.getPropertyValue(e, t));
                        }
                        var n = "";
                        if ((h || (b.State.isAndroid && !b.State.isChrome)) && s(e).isSVG) {
                            var i = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };
                            p.each(s(e).transformCache, function (e) {
                                /^translate/i.test(e) ? (e = "translate") : /^scale/i.test(e) ? (e = "scale") : /^rotate/i.test(e) && (e = "rotate"), i[e] && ((n += e + "(" + i[e].join(" ") + ") "), delete i[e]);
                            });
                        } else {
                            var o, r;
                            p.each(s(e).transformCache, function (t) {
                                return (o = s(e).transformCache[t]), "transformPerspective" === t ? ((r = o), !0) : (9 === h && "rotateZ" === t && (t = "rotate"), void (n += t + o + " "));
                            }),
                                r && (n = "perspective" + r + " " + n);
                        }
                        x.setPropertyValue(e, "transform", n);
                    },
                });
                x.Hooks.register(),
                    x.Normalizations.register(),
                    (b.hook = function (e, t, n) {
                        var o = i;
                        return (
                            (e = r(e)),
                            p.each(e, function (e, r) {
                                if ((s(r) === i && b.init(r), n === i)) o === i && (o = b.CSS.getPropertyValue(r, t));
                                else {
                                    var a = b.CSS.setPropertyValue(r, t, n);
                                    "transform" === a[0] && b.CSS.flushTransformCache(r), (o = a);
                                }
                            }),
                            o
                        );
                    });
                var $ = function () {
                    function e() {
                        return a ? S.promise || null : l;
                    }
                    function o() {
                        function e() {
                            function e(e, t) {
                                var n = i,
                                    o = i,
                                    s = i;
                                return (
                                    m.isArray(e)
                                        ? ((n = e[0]),
                                          (!m.isArray(e[1]) && /^[\d-]/.test(e[1])) || m.isFunction(e[1]) || x.RegEx.isHex.test(e[1])
                                              ? (s = e[1])
                                              : ((m.isString(e[1]) && !x.RegEx.isHex.test(e[1])) || m.isArray(e[1])) && ((o = t ? e[1] : u(e[1], a.duration)), e[2] !== i && (s = e[2])))
                                        : (n = e),
                                    t || (o = o || a.easing),
                                    m.isFunction(n) && (n = n.call(r, C, _)),
                                    m.isFunction(s) && (s = s.call(r, C, _)),
                                    [n || 0, o, s]
                                );
                            }
                            function d(e, t) {
                                var n, i;
                                return (
                                    (i = (t || "0")
                                        .toString()
                                        .toLowerCase()
                                        .replace(/[%A-z]+$/, function (e) {
                                            return (n = e), "";
                                        })),
                                    n || (n = x.Values.getUnitType(e)),
                                    [i, n]
                                );
                            }
                            function h() {
                                var e = { myParent: r.parentNode || n.body, position: x.getPropertyValue(r, "position"), fontSize: x.getPropertyValue(r, "fontSize") },
                                    i = e.position === O.lastPosition && e.myParent === O.lastParent,
                                    o = e.fontSize === O.lastFontSize;
                                (O.lastParent = e.myParent), (O.lastPosition = e.position), (O.lastFontSize = e.fontSize);
                                var a = 100,
                                    l = {};
                                if (o && i) (l.emToPx = O.lastEmToPx), (l.percentToPxWidth = O.lastPercentToPxWidth), (l.percentToPxHeight = O.lastPercentToPxHeight);
                                else {
                                    var u = s(r).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                    b.init(u),
                                        e.myParent.appendChild(u),
                                        p.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                            b.CSS.setPropertyValue(u, t, "hidden");
                                        }),
                                        b.CSS.setPropertyValue(u, "position", e.position),
                                        b.CSS.setPropertyValue(u, "fontSize", e.fontSize),
                                        b.CSS.setPropertyValue(u, "boxSizing", "content-box"),
                                        p.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                            b.CSS.setPropertyValue(u, t, a + "%");
                                        }),
                                        b.CSS.setPropertyValue(u, "paddingLeft", a + "em"),
                                        (l.percentToPxWidth = O.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / a),
                                        (l.percentToPxHeight = O.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / a),
                                        (l.emToPx = O.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / a),
                                        e.myParent.removeChild(u);
                                }
                                return (
                                    null === O.remToPx && (O.remToPx = parseFloat(x.getPropertyValue(n.body, "fontSize")) || 16),
                                    null === O.vwToPx && ((O.vwToPx = parseFloat(t.innerWidth) / 100), (O.vhToPx = parseFloat(t.innerHeight) / 100)),
                                    (l.remToPx = O.remToPx),
                                    (l.vwToPx = O.vwToPx),
                                    (l.vhToPx = O.vhToPx),
                                    b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), r),
                                    l
                                );
                            }
                            if (a.begin && 0 === C)
                                try {
                                    a.begin.call(f, f);
                                } catch (v) {
                                    setTimeout(function () {
                                        throw v;
                                    }, 1);
                                }
                            if ("scroll" === k) {
                                var w,
                                    $,
                                    T,
                                    E = /^x$/i.test(a.axis) ? "Left" : "Top",
                                    A = parseFloat(a.offset) || 0;
                                a.container
                                    ? m.isWrapped(a.container) || m.isNode(a.container)
                                        ? ((a.container = a.container[0] || a.container), (T = (w = a.container["scroll" + E]) + p(r).position()[E.toLowerCase()] + A))
                                        : (a.container = null)
                                    : ((w = b.State.scrollAnchor[b.State["scrollProperty" + E]]), ($ = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === E ? "Top" : "Left")]]), (T = p(r).offset()[E.toLowerCase()] + A)),
                                    (l = {
                                        scroll: { rootPropertyValue: !1, startValue: w, currentValue: w, endValue: T, unitType: "", easing: a.easing, scrollData: { container: a.container, direction: E, alternateValue: $ } },
                                        element: r,
                                    }),
                                    b.debug && console.log("tweensContainer (scroll): ", l.scroll, r);
                            } else if ("reverse" === k) {
                                if (!s(r).tweensContainer) return void p.dequeue(r, a.queue);
                                "none" === s(r).opts.display && (s(r).opts.display = "auto"),
                                    "hidden" === s(r).opts.visibility && (s(r).opts.visibility = "visible"),
                                    (s(r).opts.loop = !1),
                                    (s(r).opts.begin = null),
                                    (s(r).opts.complete = null),
                                    y.easing || delete a.easing,
                                    y.duration || delete a.duration,
                                    (a = p.extend({}, s(r).opts, a));
                                var j = p.extend(!0, {}, s(r).tweensContainer);
                                for (var N in j)
                                    if ("element" !== N) {
                                        var D = j[N].startValue;
                                        (j[N].startValue = j[N].currentValue = j[N].endValue),
                                            (j[N].endValue = D),
                                            m.isEmptyObject(y) || (j[N].easing = a.easing),
                                            b.debug && console.log("reverse tweensContainer (" + N + "): " + JSON.stringify(j[N]), r);
                                    }
                                l = j;
                            } else if ("start" === k) {
                                for (var P in (s(r).tweensContainer && !0 === s(r).isAnimating && (j = s(r).tweensContainer),
                                p.each(g, function (t, n) {
                                    if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(t)) {
                                        var o = e(n, !0),
                                            r = o[0],
                                            s = o[1],
                                            a = o[2];
                                        if (x.RegEx.isHex.test(r)) {
                                            for (var l = ["Red", "Green", "Blue"], u = x.Values.hexToRgb(r), c = a ? x.Values.hexToRgb(a) : i, d = 0; d < l.length; d++) {
                                                var p = [u[d]];
                                                s && p.push(s), c !== i && p.push(c[d]), (g[t + l[d]] = p);
                                            }
                                            delete g[t];
                                        }
                                    }
                                }),
                                g)) {
                                    var I = e(g[P]),
                                        q = I[0],
                                        H = I[1],
                                        M = I[2];
                                    P = x.Names.camelCase(P);
                                    var R = x.Hooks.getRoot(P),
                                        F = !1;
                                    if (s(r).isSVG || "tween" === R || !1 !== x.Names.prefixCheck(R)[1] || x.Normalizations.registered[R] !== i) {
                                        ((a.display !== i && null !== a.display && "none" !== a.display) || (a.visibility !== i && "hidden" !== a.visibility)) && /opacity|filter/.test(P) && !M && 0 !== q && (M = 0),
                                            a._cacheValues && j && j[P]
                                                ? (M === i && (M = j[P].endValue + j[P].unitType), (F = s(r).rootPropertyValueCache[R]))
                                                : x.Hooks.registered[P]
                                                ? M === i
                                                    ? ((F = x.getPropertyValue(r, R)), (M = x.getPropertyValue(r, P, F)))
                                                    : (F = x.Hooks.templates[R][1])
                                                : M === i && (M = x.getPropertyValue(r, P));
                                        var W,
                                            z,
                                            B,
                                            V = !1;
                                        if (
                                            ((M = (W = d(P, M))[0]),
                                            (B = W[1]),
                                            (q = (W = d(P, q))[0].replace(/^([+-\/*])=/, function (e, t) {
                                                return (V = t), "";
                                            })),
                                            (z = W[1]),
                                            (M = parseFloat(M) || 0),
                                            (q = parseFloat(q) || 0),
                                            "%" === z && (/^(fontSize|lineHeight)$/.test(P) ? ((q /= 100), (z = "em")) : /^scale/.test(P) ? ((q /= 100), (z = "")) : /(Red|Green|Blue)$/i.test(P) && ((q = (q / 100) * 255), (z = ""))),
                                            /[\/*]/.test(V))
                                        )
                                            z = B;
                                        else if (B !== z && 0 !== M)
                                            if (0 === q) z = B;
                                            else {
                                                o = o || h();
                                                var U = /margin|padding|left|right|width|text|word|letter/i.test(P) || /X$/.test(P) || "x" === P ? "x" : "y";
                                                switch (B) {
                                                    case "%":
                                                        M *= "x" === U ? o.percentToPxWidth : o.percentToPxHeight;
                                                        break;
                                                    case "px":
                                                        break;
                                                    default:
                                                        M *= o[B + "ToPx"];
                                                }
                                                switch (z) {
                                                    case "%":
                                                        M *= 1 / ("x" === U ? o.percentToPxWidth : o.percentToPxHeight);
                                                        break;
                                                    case "px":
                                                        break;
                                                    default:
                                                        M *= 1 / o[z + "ToPx"];
                                                }
                                            }
                                        switch (V) {
                                            case "+":
                                                q = M + q;
                                                break;
                                            case "-":
                                                q = M - q;
                                                break;
                                            case "*":
                                                q *= M;
                                                break;
                                            case "/":
                                                q = M / q;
                                        }
                                        (l[P] = { rootPropertyValue: F, startValue: M, currentValue: M, endValue: q, unitType: z, easing: H }), b.debug && console.log("tweensContainer (" + P + "): " + JSON.stringify(l[P]), r);
                                    } else b.debug && console.log("Skipping [" + R + "] due to a lack of browser support.");
                                }
                                l.element = r;
                            }
                            l.element &&
                                (x.Values.addClass(r, "velocity-animating"),
                                L.push(l),
                                "" === a.queue && ((s(r).tweensContainer = l), (s(r).opts = a)),
                                (s(r).isAnimating = !0),
                                C === _ - 1 ? (b.State.calls.push([L, f, a, null, S.resolver]), !1 === b.State.isTicking && ((b.State.isTicking = !0), c())) : C++);
                        }
                        var o,
                            r = this,
                            a = p.extend({}, b.defaults, y),
                            l = {};
                        switch (
                            (s(r) === i && b.init(r),
                            parseFloat(a.delay) &&
                                !1 !== a.queue &&
                                p.queue(r, a.queue, function (e) {
                                    (b.velocityQueueEntryFlag = !0), (s(r).delayTimer = { setTimeout: setTimeout(e, parseFloat(a.delay)), next: e });
                                }),
                            a.duration.toString().toLowerCase())
                        ) {
                            case "fast":
                                a.duration = 200;
                                break;
                            case "normal":
                                a.duration = v;
                                break;
                            case "slow":
                                a.duration = 600;
                                break;
                            default:
                                a.duration = parseFloat(a.duration) || 1;
                        }
                        !1 !== b.mock && (!0 === b.mock ? (a.duration = a.delay = 1) : ((a.duration *= parseFloat(b.mock) || 1), (a.delay *= parseFloat(b.mock) || 1))),
                            (a.easing = u(a.easing, a.duration)),
                            a.begin && !m.isFunction(a.begin) && (a.begin = null),
                            a.progress && !m.isFunction(a.progress) && (a.progress = null),
                            a.complete && !m.isFunction(a.complete) && (a.complete = null),
                            a.display !== i && null !== a.display && ((a.display = a.display.toString().toLowerCase()), "auto" === a.display && (a.display = b.CSS.Values.getDisplayType(r))),
                            a.visibility !== i && null !== a.visibility && (a.visibility = a.visibility.toString().toLowerCase()),
                            (a.mobileHA = a.mobileHA && b.State.isMobile && !b.State.isGingerbread),
                            !1 === a.queue
                                ? a.delay
                                    ? setTimeout(e, a.delay)
                                    : e()
                                : p.queue(r, a.queue, function (t, n) {
                                      return !0 === n ? (S.promise && S.resolver(f), !0) : ((b.velocityQueueEntryFlag = !0), void e(t));
                                  }),
                            ("" !== a.queue && "fx" !== a.queue) || "inprogress" === p.queue(r)[0] || p.dequeue(r);
                    }
                    var a,
                        l,
                        h,
                        f,
                        g,
                        y,
                        w = arguments[0] && (arguments[0].p || (p.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || m.isString(arguments[0].properties));
                    if ((m.isWrapped(this) ? ((a = !1), (h = 0), (f = this), (l = this)) : ((a = !0), (h = 1), (f = w ? arguments[0].elements || arguments[0].e : arguments[0])), (f = r(f)))) {
                        w ? ((g = arguments[0].properties || arguments[0].p), (y = arguments[0].options || arguments[0].o)) : ((g = arguments[h]), (y = arguments[h + 1]));
                        var _ = f.length,
                            C = 0;
                        if (!/^(stop|finish|finishAll)$/i.test(g) && !p.isPlainObject(y)) {
                            y = {};
                            for (var T = h + 1; T < arguments.length; T++)
                                m.isArray(arguments[T]) || (!/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]))
                                    ? m.isString(arguments[T]) || m.isArray(arguments[T])
                                        ? (y.easing = arguments[T])
                                        : m.isFunction(arguments[T]) && (y.complete = arguments[T])
                                    : (y.duration = arguments[T]);
                        }
                        var k,
                            S = { promise: null, resolver: null, rejecter: null };
                        switch (
                            (a &&
                                b.Promise &&
                                (S.promise = new b.Promise(function (e, t) {
                                    (S.resolver = e), (S.rejecter = t);
                                })),
                            g)
                        ) {
                            case "scroll":
                                k = "scroll";
                                break;
                            case "reverse":
                                k = "reverse";
                                break;
                            case "finish":
                            case "finishAll":
                            case "stop":
                                p.each(f, function (e, t) {
                                    s(t) && s(t).delayTimer && (clearTimeout(s(t).delayTimer.setTimeout), s(t).delayTimer.next && s(t).delayTimer.next(), delete s(t).delayTimer),
                                        "finishAll" !== g ||
                                            (!0 !== y && !m.isString(y)) ||
                                            (p.each(p.queue(t, m.isString(y) ? y : ""), function (e, t) {
                                                m.isFunction(t) && t();
                                            }),
                                            p.queue(t, m.isString(y) ? y : "", []));
                                });
                                var E = [];
                                return (
                                    p.each(b.State.calls, function (e, t) {
                                        t &&
                                            p.each(t[1], function (n, o) {
                                                var r = y === i ? "" : y;
                                                return (
                                                    (!0 !== r && t[2].queue !== r && (y !== i || !1 !== t[2].queue)) ||
                                                    void p.each(f, function (n, i) {
                                                        i === o &&
                                                            ((!0 === y || m.isString(y)) &&
                                                                (p.each(p.queue(i, m.isString(y) ? y : ""), function (e, t) {
                                                                    m.isFunction(t) && t(null, !0);
                                                                }),
                                                                p.queue(i, m.isString(y) ? y : "", [])),
                                                            "stop" === g
                                                                ? (s(i) &&
                                                                      s(i).tweensContainer &&
                                                                      !1 !== r &&
                                                                      p.each(s(i).tweensContainer, function (e, t) {
                                                                          t.endValue = t.currentValue;
                                                                      }),
                                                                  E.push(e))
                                                                : ("finish" === g || "finishAll" === g) && (t[2].duration = 1));
                                                    })
                                                );
                                            });
                                    }),
                                    "stop" === g &&
                                        (p.each(E, function (e, t) {
                                            d(t, !0);
                                        }),
                                        S.promise && S.resolver(f)),
                                    e()
                                );
                            default:
                                if (!p.isPlainObject(g) || m.isEmptyObject(g)) {
                                    if (m.isString(g) && b.Redirects[g]) {
                                        var A = (P = p.extend({}, y)).duration,
                                            j = P.delay || 0;
                                        return (
                                            !0 === P.backwards && (f = p.extend(!0, [], f).reverse()),
                                            p.each(f, function (e, t) {
                                                parseFloat(P.stagger) ? (P.delay = j + parseFloat(P.stagger) * e) : m.isFunction(P.stagger) && (P.delay = j + P.stagger.call(t, e, _)),
                                                    P.drag &&
                                                        ((P.duration = parseFloat(A) || (/^(callout|transition)/.test(g) ? 1e3 : v)), (P.duration = Math.max(P.duration * (P.backwards ? 1 - e / _ : (e + 1) / _), 0.75 * P.duration, 200))),
                                                    b.Redirects[g].call(t, t, P || {}, e, _, f, S.promise ? S : i);
                                            }),
                                            e()
                                        );
                                    }
                                    var N = "Velocity: First argument (" + g + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                    return S.promise ? S.rejecter(new Error(N)) : console.log(N), e();
                                }
                                k = "start";
                        }
                        var D,
                            P,
                            O = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
                            L = [];
                        if (
                            (p.each(f, function (e, t) {
                                m.isNode(t) && o.call(t);
                            }),
                            ((P = p.extend({}, b.defaults, y)).loop = parseInt(P.loop)),
                            (D = 2 * P.loop - 1),
                            P.loop)
                        )
                            for (var I = 0; D > I; I++) {
                                var q = { delay: P.delay, progress: P.progress };
                                I === D - 1 && ((q.display = P.display), (q.visibility = P.visibility), (q.complete = P.complete)), $(f, "reverse", q);
                            }
                        return e();
                    }
                };
                (b = p.extend($, b)).animate = $;
                var _ = t.requestAnimationFrame || f;
                return (
                    b.State.isMobile ||
                        n.hidden === i ||
                        n.addEventListener("visibilitychange", function () {
                            n.hidden
                                ? ((_ = function (e) {
                                      return setTimeout(function () {
                                          e(!0);
                                      }, 16);
                                  }),
                                  c())
                                : (_ = t.requestAnimationFrame || f);
                        }),
                    (e.Velocity = b),
                    e !== t && ((e.fn.velocity = $), (e.fn.velocity.defaults = b.defaults)),
                    p.each(["Down", "Up"], function (e, t) {
                        b.Redirects["slide" + t] = function (e, n, o, r, s, a) {
                            var l = p.extend({}, n),
                                u = l.begin,
                                c = l.complete,
                                d = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                                h = {};
                            l.display === i && (l.display = "Down" === t ? ("inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block") : "none"),
                                (l.begin = function () {
                                    for (var n in (u && u.call(s, s), d)) {
                                        h[n] = e.style[n];
                                        var i = b.CSS.getPropertyValue(e, n);
                                        d[n] = "Down" === t ? [i, 0] : [0, i];
                                    }
                                    (h.overflow = e.style.overflow), (e.style.overflow = "hidden");
                                }),
                                (l.complete = function () {
                                    for (var t in h) e.style[t] = h[t];
                                    c && c.call(s, s), a && a.resolver(s);
                                }),
                                b(e, d, l);
                        };
                    }),
                    p.each(["In", "Out"], function (e, t) {
                        b.Redirects["fade" + t] = function (e, n, o, r, s, a) {
                            var l = p.extend({}, n),
                                u = { opacity: "In" === t ? 1 : 0 },
                                c = l.complete;
                            (l.complete =
                                o !== r - 1
                                    ? (l.begin = null)
                                    : function () {
                                          c && c.call(s, s), a && a.resolver(s);
                                      }),
                                l.display === i && (l.display = "In" === t ? "auto" : "none"),
                                b(this, u, l);
                        };
                    }),
                    b
                );
            }
            jQuery.fn.velocity = jQuery.fn.animate;
        })(window.jQuery || window.Zepto || window, window, document);
    }),
    $(document).ready(function () {
        $(window).on("hashchange", function () {
            var e = window.location.hash.substr(1),
                t = parseInt(e.substr(e.indexOf("-") + 1)),
                n = parseInt($(".step:visible").attr("data-step")),
                i = $(".steps").find(".step:visible"),
                o = i;
            if (t < n) {
                for (; 0 !== o.prev().length && o.prev().hasClass("skip"); ) o.prev().css({ left: "100%", opacity: 0 }).hide(0), (o = o.prev());
                0 !== o.prev().length && ($(".steps").css({ height: o.prev().height() }), i.hide(0).css({ left: "100%", opacity: 0 }), o.prev().show(0).css({ left: "0", opacity: 1 }), backButtonVisibility(), updateProgress());
            }
        }),
            updateProgress();
    }),
    (function (e) {
        e.each(["show", "hide"], function (t, n) {
            var i = e.fn[n];
            e.fn[n] = function () {
                return this.trigger(n), i.apply(this, arguments);
            };
        });
    })(jQuery),
    $(document).ready(function () {
        $(".btn-back").bind("click", goBack);
    });
var mortgage_pii_start = !1,
    disableEnterKey = function (e) {
        e.preventDefault();
    },
    inProgress = !1,
    street_address_pixel_loaded = !1;
$(window).load(function () {
    initStepsHeight();
}),
    $(function () {
        $(document).on("click", ".btn-services", function (e) {
            goNext(e);
        }),
            $(document).on("click", ".btn-answer, .answer-btn", function () {
                var e = $(this).val(),
                    t = $(this).attr("name");
                $(".service-questions")
                    .find("input[name='" + t + "']")
                    .remove(),
                    "button" != t &&
                        $(".service-questions")
                            .first()
                            .append('<input type="hidden" name="' + t + '" value="' + e + '"/>');
            });
    }),
    $(document).ready(function () {
        function e(e) {
            $("#final_validation .form-control").prop("disabled", !0).closest(".form-group").parent().hide(),
                (fields = e.fields),
                $("#service_vertical").length && "financial" == $("#service_vertical").val() && t(),
                (neustart_error = !0),
                $.each(fields, function (e, t) {
                    var n = $('#hero [name="pii[' + t + ']"]').val();
                    $('[name="pii[' + t + ']"]').prop("disabled", !1),
                        $('#final_validation [name="pii[' + t + ']"]')
                            .closest(".form-group")
                            .removeClass("has-error")
                            .parent()
                            .show()
                            .find(".validation-msg")
                            .remove(),
                        "" === $('#final_validation input[name="pii[' + t + ']"]').val() && $('#final_validation input[name="pii[' + t + ']"]').val(n),
                        $('#final_validation select[name="pii[' + t + ']"]').val(n);
                }),
                $("#error_message").text(e.pii_error.message);
        }
        function t() {
            $('.steps .step:not(".step:last")').velocity({ left: "-100%", opacity: 0 }, { duration: 350 }).hide(0), $(".step:last").show(0).velocity({ left: "0", opacity: 1 }, { duration: 350 });
        }
        function n() {
            $('.steps .step:not(".step:last")').css({ left: "-100%", opacity: 0, display: "none" }), $(".step:last").prev().css({ left: "0", opacity: 1, display: "block" }), $(".step:last").prev().find("button").click();
        }
        $("#final_validation").on("shown.bs.modal hidden.bs.modal", function () {
            $("body").toggleClass("final_validation_modal_open"), $(this).find(".form-group:visible:first .form-control").focus();
        }),
            (neustart_error = !1),
            $(document).on("ajax:error", '#hero form:not("#final_validation form")', function (t, n) {
                var i = jQuery.parseJSON(n.responseText);
                $("#service_vertical").length && "financial" == $("#service_vertical").val() && i.pii_error ? e(i) : i.pii_error && (e(i), $("#final_validation").modal("show"));
            }),
            $(document).on("ajax:error", "#final_validation form", function (t, n) {
                e(jQuery.parseJSON(n.responseText));
            }),
            $(document).on("ajax:success", "#final_validation form", function (e, t) {
                $("#final_validation").modal("hide"),
                    $("#final_validation").on("hidden.bs.modal", function () {
                        0 !== $('[name="pii[ssn]"]').length ? n() : 1 == t.need_to_verify ? $("#send_code_modal").modal("show") : (window.location.href = "/second-service");
                    });
            });
    }),
    $(function () {
        var e = !1;
        $(document).on("click", ".step .btn", function () {
            $(".steps").find(".step:visible").attr("data-step") != $(".steps").find('.step.service-questions:not(".skip")').last().attr("data-step") || e || "undefined" != typeof mortgage_domain || ((e = !0), leadID());
        });
    }),
    $(function () {
        var e = !1;
        $(document).on("click", ".step .btn", function () {
            var t = $(".steps .step").length,
                n = $(".steps").find(".step:visible").attr("data-step"),
                i = $(".steps").find('.step.service-questions:not(".skip")').last().attr("data-step"),
                o = $(".steps .step").last().attr("data-step") - 1;
            n == i && "undefined" == typeof mortgage_domain && TrustedForm(),
                $(document).on("ajax:success", '[action="/submit/pii"]', function () {
                    n == o && !e && 0 == $("#exclude_trustedformStop").length && t > 2 && ((e = !0), trustedFormStopRecording(), $("#exit_form").exitModal("hideModal"), $("#exit_form").exitModal("destroy"));
                });
        });
    }),
    $(function () {
        function e(e) {
            var t = $(e).find("option:selected").attr("id");
            t &&
                $(".service-questions .grouped, .service-questions .multiple").each(function () {
                    var e = $(this).attr("data-group");
                    e != undefined && e.split(",").includes(t) ? $(this).closest(".form-control-wrapper").show(1) : $(this).closest(".form-control-wrapper").hide(1);
                });
        }
        $(".service-questions select")
            .not(".service-questions select.grouped")
            .on("change", function () {
                e($(this));
            }),
            e($(".service-questions select").not(".service-questions select.grouped")),
            skip_steps(),
            $(".form-control-wrapper").on("show", function () {
                $(this).find("select").prop("disabled", !1);
            }),
            $(".form-control-wrapper").on("hide", function () {
                $(this).find("select").prop("disabled", "disabled");
            }),
            $(".form-control-wrapper").on("show, hide", function () {
                newDataStep();
            });
    }),
    Array.prototype.includes ||
        Object.defineProperty(Array.prototype, "includes", {
            value: function (e, t) {
                function n(e, t) {
                    return e === t || ("number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t));
                }
                if (null == this) throw new TypeError('"this" is null or not defined');
                var i = Object(this),
                    o = i.length >>> 0;
                if (0 === o) return !1;
                for (var r = 0 | t, s = Math.max(r >= 0 ? r : o - Math.abs(r), 0); s < o; ) {
                    if (n(i[s], e)) return !0;
                    s++;
                }
                return !1;
            },
        }),
    /*!
     * jQuery UI Core 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
    })(function (e) {
        function t(t, i) {
            var o,
                r,
                s,
                a = t.nodeName.toLowerCase();
            return "area" === a
                ? ((r = (o = t.parentNode).name), !(!t.href || !r || "map" !== o.nodeName.toLowerCase()) && !!(s = e("img[usemap='#" + r + "']")[0]) && n(s))
                : (/^(input|select|textarea|button|object)$/.test(a) ? !t.disabled : ("a" === a && t.href) || i) && n(t);
        }
        function n(t) {
            return (
                e.expr.filters.visible(t) &&
                !e(t)
                    .parents()
                    .addBack()
                    .filter(function () {
                        return "hidden" === e.css(this, "visibility");
                    }).length
            );
        }
        var i, o, r, s;
        (e.ui = e.ui || {}),
            e.extend(e.ui, {
                version: "1.11.4",
                keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 },
            }),
            e.fn.extend({
                scrollParent: function (t) {
                    var n = this.css("position"),
                        i = "absolute" === n,
                        o = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                        r = this.parents()
                            .filter(function () {
                                var t = e(this);
                                return (!i || "static" !== t.css("position")) && o.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
                            })
                            .eq(0);
                    return "fixed" !== n && r.length ? r : e(this[0].ownerDocument || document);
                },
                uniqueId:
                    ((i = 0),
                    function () {
                        return this.each(function () {
                            this.id || (this.id = "ui-id-" + ++i);
                        });
                    }),
                removeUniqueId: function () {
                    return this.each(function () {
                        /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
                    });
                },
            }),
            e.extend(e.expr[":"], {
                data: e.expr.createPseudo
                    ? e.expr.createPseudo(function (t) {
                          return function (n) {
                              return !!e.data(n, t);
                          };
                      })
                    : function (t, n, i) {
                          return !!e.data(t, i[3]);
                      },
                focusable: function (n) {
                    return t(n, !isNaN(e.attr(n, "tabindex")));
                },
                tabbable: function (n) {
                    var i = e.attr(n, "tabindex"),
                        o = isNaN(i);
                    return (o || i >= 0) && t(n, !o);
                },
            }),
            e("<a>").outerWidth(1).jquery ||
                e.each(["Width", "Height"], function (t, n) {
                    function i(t, n, i, r) {
                        return (
                            e.each(o, function () {
                                (n -= parseFloat(e.css(t, "padding" + this)) || 0), i && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (n -= parseFloat(e.css(t, "margin" + this)) || 0);
                            }),
                            n
                        );
                    }
                    var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                        r = n.toLowerCase(),
                        s = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight };
                    (e.fn["inner" + n] = function (t) {
                        return t === undefined
                            ? s["inner" + n].call(this)
                            : this.each(function () {
                                  e(this).css(r, i(this, t) + "px");
                              });
                    }),
                        (e.fn["outer" + n] = function (t, o) {
                            return "number" != typeof t
                                ? s["outer" + n].call(this, t)
                                : this.each(function () {
                                      e(this).css(r, i(this, t, !0, o) + "px");
                                  });
                        });
                }),
            e.fn.addBack ||
                (e.fn.addBack = function (e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                }),
            e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
                (e.fn.removeData =
                    ((o = e.fn.removeData),
                    function (t) {
                        return arguments.length ? o.call(this, e.camelCase(t)) : o.call(this);
                    })),
            (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
            e.fn.extend({
                focus:
                    ((s = e.fn.focus),
                    function (t, n) {
                        return "number" == typeof t
                            ? this.each(function () {
                                  var i = this;
                                  setTimeout(function () {
                                      e(i).focus(), n && n.call(i);
                                  }, t);
                              })
                            : s.apply(this, arguments);
                    }),
                disableSelection:
                    ((r = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"),
                    function () {
                        return this.bind(r + ".ui-disableSelection", function (e) {
                            e.preventDefault();
                        });
                    }),
                enableSelection: function () {
                    return this.unbind(".ui-disableSelection");
                },
                zIndex: function (t) {
                    if (t !== undefined) return this.css("zIndex", t);
                    if (this.length)
                        for (var n, i, o = e(this[0]); o.length && o[0] !== document; ) {
                            if (("absolute" === (n = o.css("position")) || "relative" === n || "fixed" === n) && ((i = parseInt(o.css("zIndex"), 10)), !isNaN(i) && 0 !== i)) return i;
                            o = o.parent();
                        }
                    return 0;
                },
            }),
            (e.ui.plugin = {
                add: function (t, n, i) {
                    var o,
                        r = e.ui[t].prototype;
                    for (o in i) (r.plugins[o] = r.plugins[o] || []), r.plugins[o].push([n, i[o]]);
                },
                call: function (e, t, n, i) {
                    var o,
                        r = e.plugins[t];
                    if (r && (i || (e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))) for (o = 0; o < r.length; o++) e.options[r[o][0]] && r[o][1].apply(e.element, n);
                },
            });
    }),
    /*!
     * jQuery UI Widget 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
    })(function (e) {
        var t,
            n = 0,
            i = Array.prototype.slice;
        return (
            (e.cleanData =
                ((t = e.cleanData),
                function (n) {
                    var i, o, r;
                    for (r = 0; null != (o = n[r]); r++)
                        try {
                            (i = e._data(o, "events")) && i.remove && e(o).triggerHandler("remove");
                        } catch (s) {}
                    t(n);
                })),
            (e.widget = function (t, n, i) {
                var o,
                    r,
                    s,
                    a,
                    l = {},
                    u = t.split(".")[0];
                return (
                    (t = t.split(".")[1]),
                    (o = u + "-" + t),
                    i || ((i = n), (n = e.Widget)),
                    (e.expr[":"][o.toLowerCase()] = function (t) {
                        return !!e.data(t, o);
                    }),
                    (e[u] = e[u] || {}),
                    (r = e[u][t]),
                    (s = e[u][t] = function (e, t) {
                        if (!this._createWidget) return new s(e, t);
                        arguments.length && this._createWidget(e, t);
                    }),
                    e.extend(s, r, { version: i.version, _proto: e.extend({}, i), _childConstructors: [] }),
                    ((a = new n()).options = e.widget.extend({}, a.options)),
                    e.each(i, function (t, i) {
                        var o, r;
                        e.isFunction(i)
                            ? (l[t] =
                                  ((o = function () {
                                      return n.prototype[t].apply(this, arguments);
                                  }),
                                  (r = function (e) {
                                      return n.prototype[t].apply(this, e);
                                  }),
                                  function () {
                                      var e,
                                          t = this._super,
                                          n = this._superApply;
                                      return (this._super = o), (this._superApply = r), (e = i.apply(this, arguments)), (this._super = t), (this._superApply = n), e;
                                  }))
                            : (l[t] = i);
                    }),
                    (s.prototype = e.widget.extend(a, { widgetEventPrefix: (r && a.widgetEventPrefix) || t }, l, { constructor: s, namespace: u, widgetName: t, widgetFullName: o })),
                    r
                        ? (e.each(r._childConstructors, function (t, n) {
                              var i = n.prototype;
                              e.widget(i.namespace + "." + i.widgetName, s, n._proto);
                          }),
                          delete r._childConstructors)
                        : n._childConstructors.push(s),
                    e.widget.bridge(t, s),
                    s
                );
            }),
            (e.widget.extend = function (t) {
                for (var n, o, r = i.call(arguments, 1), s = 0, a = r.length; s < a; s++)
                    for (n in r[s]) (o = r[s][n]), r[s].hasOwnProperty(n) && o !== undefined && (e.isPlainObject(o) ? (t[n] = e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], o) : e.widget.extend({}, o)) : (t[n] = o));
                return t;
            }),
            (e.widget.bridge = function (t, n) {
                var o = n.prototype.widgetFullName || t;
                e.fn[t] = function (r) {
                    var s = "string" == typeof r,
                        a = i.call(arguments, 1),
                        l = this;
                    return (
                        s
                            ? this.each(function () {
                                  var n,
                                      i = e.data(this, o);
                                  return "instance" === r
                                      ? ((l = i), !1)
                                      : i
                                      ? e.isFunction(i[r]) && "_" !== r.charAt(0)
                                          ? (n = i[r].apply(i, a)) !== i && n !== undefined
                                              ? ((l = n && n.jquery ? l.pushStack(n.get()) : n), !1)
                                              : void 0
                                          : e.error("no such method '" + r + "' for " + t + " widget instance")
                                      : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + r + "'");
                              })
                            : (a.length && (r = e.widget.extend.apply(null, [r].concat(a))),
                              this.each(function () {
                                  var t = e.data(this, o);
                                  t ? (t.option(r || {}), t._init && t._init()) : e.data(this, o, new n(r, this));
                              })),
                        l
                    );
                };
            }),
            (e.Widget = function () {}),
            (e.Widget._childConstructors = []),
            (e.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { disabled: !1, create: null },
                _createWidget: function (t, i) {
                    (i = e(i || this.defaultElement || this)[0]),
                        (this.element = e(i)),
                        (this.uuid = n++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = e()),
                        (this.hoverable = e()),
                        (this.focusable = e()),
                        i !== this &&
                            (e.data(i, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (e) {
                                    e.target === i && this.destroy();
                                },
                            }),
                            (this.document = e(i.style ? i.ownerDocument : i.document || i)),
                            (this.window = e(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t)),
                        this._create(),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: e.noop,
                _getCreateEventData: e.noop,
                _create: e.noop,
                _init: e.noop,
                destroy: function () {
                    this._destroy(),
                        this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
                        this.widget()
                            .unbind(this.eventNamespace)
                            .removeAttr("aria-disabled")
                            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                        this.bindings.unbind(this.eventNamespace),
                        this.hoverable.removeClass("ui-state-hover"),
                        this.focusable.removeClass("ui-state-focus");
                },
                _destroy: e.noop,
                widget: function () {
                    return this.element;
                },
                option: function (t, n) {
                    var i,
                        o,
                        r,
                        s = t;
                    if (0 === arguments.length) return e.widget.extend({}, this.options);
                    if ("string" == typeof t)
                        if (((s = {}), (t = (i = t.split(".")).shift()), i.length)) {
                            for (o = s[t] = e.widget.extend({}, this.options[t]), r = 0; r < i.length - 1; r++) (o[i[r]] = o[i[r]] || {}), (o = o[i[r]]);
                            if (((t = i.pop()), 1 === arguments.length)) return o[t] === undefined ? null : o[t];
                            o[t] = n;
                        } else {
                            if (1 === arguments.length) return this.options[t] === undefined ? null : this.options[t];
                            s[t] = n;
                        }
                    return this._setOptions(s), this;
                },
                _setOptions: function (e) {
                    var t;
                    for (t in e) this._setOption(t, e[t]);
                    return this;
                },
                _setOption: function (e, t) {
                    return (
                        (this.options[e] = t), "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
                    );
                },
                enable: function () {
                    return this._setOptions({ disabled: !1 });
                },
                disable: function () {
                    return this._setOptions({ disabled: !0 });
                },
                _on: function (t, n, i) {
                    var o,
                        r = this;
                    "boolean" != typeof t && ((i = n), (n = t), (t = !1)),
                        i ? ((n = o = e(n)), (this.bindings = this.bindings.add(n))) : ((i = n), (n = this.element), (o = this.widget())),
                        e.each(i, function (i, s) {
                            function a() {
                                if (t || (!0 !== r.options.disabled && !e(this).hasClass("ui-state-disabled"))) return ("string" == typeof s ? r[s] : s).apply(r, arguments);
                            }
                            "string" != typeof s && (a.guid = s.guid = s.guid || a.guid || e.guid++);
                            var l = i.match(/^([\w:-]*)\s*(.*)$/),
                                u = l[1] + r.eventNamespace,
                                c = l[2];
                            c ? o.delegate(c, u, a) : n.bind(u, a);
                        });
                },
                _off: function (t, n) {
                    (n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        t.unbind(n).undelegate(n),
                        (this.bindings = e(this.bindings.not(t).get())),
                        (this.focusable = e(this.focusable.not(t).get())),
                        (this.hoverable = e(this.hoverable.not(t).get()));
                },
                _delay: function (e, t) {
                    function n() {
                        return ("string" == typeof e ? i[e] : e).apply(i, arguments);
                    }
                    var i = this;
                    return setTimeout(n, t || 0);
                },
                _hoverable: function (t) {
                    (this.hoverable = this.hoverable.add(t)),
                        this._on(t, {
                            mouseenter: function (t) {
                                e(t.currentTarget).addClass("ui-state-hover");
                            },
                            mouseleave: function (t) {
                                e(t.currentTarget).removeClass("ui-state-hover");
                            },
                        });
                },
                _focusable: function (t) {
                    (this.focusable = this.focusable.add(t)),
                        this._on(t, {
                            focusin: function (t) {
                                e(t.currentTarget).addClass("ui-state-focus");
                            },
                            focusout: function (t) {
                                e(t.currentTarget).removeClass("ui-state-focus");
                            },
                        });
                },
                _trigger: function (t, n, i) {
                    var o,
                        r,
                        s = this.options[t];
                    if (((i = i || {}), ((n = e.Event(n)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase()), (n.target = this.element[0]), (r = n.originalEvent))) for (o in r) o in n || (n[o] = r[o]);
                    return this.element.trigger(n, i), !((e.isFunction(s) && !1 === s.apply(this.element[0], [n].concat(i))) || n.isDefaultPrevented());
                },
            }),
            e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, n) {
                e.Widget.prototype["_" + t] = function (i, o, r) {
                    "string" == typeof o && (o = { effect: o });
                    var s,
                        a = o ? (!0 === o || "number" == typeof o ? n : o.effect || n) : t;
                    "number" == typeof (o = o || {}) && (o = { duration: o }),
                        (s = !e.isEmptyObject(o)),
                        (o.complete = r),
                        o.delay && i.delay(o.delay),
                        s && e.effects && e.effects.effect[a]
                            ? i[t](o)
                            : a !== t && i[a]
                            ? i[a](o.duration, o.easing, r)
                            : i.queue(function (n) {
                                  e(this)[t](), r && r.call(i[0]), n();
                              });
                };
            }),
            e.widget
        );
    }),
    /*!
     * jQuery UI Position 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
    })(function (e) {
        return (
            (function () {
                function t(e, t, n) {
                    return [parseFloat(e[0]) * (h.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (h.test(e[1]) ? n / 100 : 1)];
                }
                function n(t, n) {
                    return parseInt(e.css(t, n), 10) || 0;
                }
                function i(t) {
                    var n = t[0];
                    return 9 === n.nodeType
                        ? { width: t.width(), height: t.height(), offset: { top: 0, left: 0 } }
                        : e.isWindow(n)
                        ? { width: t.width(), height: t.height(), offset: { top: t.scrollTop(), left: t.scrollLeft() } }
                        : n.preventDefault
                        ? { width: 0, height: 0, offset: { top: n.pageY, left: n.pageX } }
                        : { width: t.outerWidth(), height: t.outerHeight(), offset: t.offset() };
                }
                e.ui = e.ui || {};
                var o,
                    r,
                    s = Math.max,
                    a = Math.abs,
                    l = Math.round,
                    u = /left|center|right/,
                    c = /top|center|bottom/,
                    d = /[\+\-]\d+(\.[\d]+)?%?/,
                    p = /^\w+/,
                    h = /%$/,
                    f = e.fn.position;
                (e.position = {
                    scrollbarWidth: function () {
                        if (o !== undefined) return o;
                        var t,
                            n,
                            i = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                            r = i.children()[0];
                        return e("body").append(i), (t = r.offsetWidth), i.css("overflow", "scroll"), t === (n = r.offsetWidth) && (n = i[0].clientWidth), i.remove(), (o = t - n);
                    },
                    getScrollInfo: function (t) {
                        var n = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                            i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                            o = "scroll" === n || ("auto" === n && t.width < t.element[0].scrollWidth);
                        return { width: "scroll" === i || ("auto" === i && t.height < t.element[0].scrollHeight) ? e.position.scrollbarWidth() : 0, height: o ? e.position.scrollbarWidth() : 0 };
                    },
                    getWithinInfo: function (t) {
                        var n = e(t || window),
                            i = e.isWindow(n[0]),
                            o = !!n[0] && 9 === n[0].nodeType;
                        return {
                            element: n,
                            isWindow: i,
                            isDocument: o,
                            offset: n.offset() || { left: 0, top: 0 },
                            scrollLeft: n.scrollLeft(),
                            scrollTop: n.scrollTop(),
                            width: i || o ? n.width() : n.outerWidth(),
                            height: i || o ? n.height() : n.outerHeight(),
                        };
                    },
                }),
                    (e.fn.position = function (o) {
                        if (!o || !o.of) return f.apply(this, arguments);
                        o = e.extend({}, o);
                        var h,
                            m,
                            g,
                            v,
                            y,
                            b,
                            w = e(o.of),
                            x = e.position.getWithinInfo(o.within),
                            $ = e.position.getScrollInfo(x),
                            _ = (o.collision || "flip").split(" "),
                            C = {};
                        return (
                            (b = i(w)),
                            w[0].preventDefault && (o.at = "left top"),
                            (m = b.width),
                            (g = b.height),
                            (v = b.offset),
                            (y = e.extend({}, v)),
                            e.each(["my", "at"], function () {
                                var e,
                                    t,
                                    n = (o[this] || "").split(" ");
                                1 === n.length && (n = u.test(n[0]) ? n.concat(["center"]) : c.test(n[0]) ? ["center"].concat(n) : ["center", "center"]),
                                    (n[0] = u.test(n[0]) ? n[0] : "center"),
                                    (n[1] = c.test(n[1]) ? n[1] : "center"),
                                    (e = d.exec(n[0])),
                                    (t = d.exec(n[1])),
                                    (C[this] = [e ? e[0] : 0, t ? t[0] : 0]),
                                    (o[this] = [p.exec(n[0])[0], p.exec(n[1])[0]]);
                            }),
                            1 === _.length && (_[1] = _[0]),
                            "right" === o.at[0] ? (y.left += m) : "center" === o.at[0] && (y.left += m / 2),
                            "bottom" === o.at[1] ? (y.top += g) : "center" === o.at[1] && (y.top += g / 2),
                            (h = t(C.at, m, g)),
                            (y.left += h[0]),
                            (y.top += h[1]),
                            this.each(function () {
                                var i,
                                    u,
                                    c = e(this),
                                    d = c.outerWidth(),
                                    p = c.outerHeight(),
                                    f = n(this, "marginLeft"),
                                    b = n(this, "marginTop"),
                                    T = d + f + n(this, "marginRight") + $.width,
                                    k = p + b + n(this, "marginBottom") + $.height,
                                    S = e.extend({}, y),
                                    E = t(C.my, c.outerWidth(), c.outerHeight());
                                "right" === o.my[0] ? (S.left -= d) : "center" === o.my[0] && (S.left -= d / 2),
                                    "bottom" === o.my[1] ? (S.top -= p) : "center" === o.my[1] && (S.top -= p / 2),
                                    (S.left += E[0]),
                                    (S.top += E[1]),
                                    r || ((S.left = l(S.left)), (S.top = l(S.top))),
                                    (i = { marginLeft: f, marginTop: b }),
                                    e.each(["left", "top"], function (t, n) {
                                        e.ui.position[_[t]] &&
                                            e.ui.position[_[t]][n](S, {
                                                targetWidth: m,
                                                targetHeight: g,
                                                elemWidth: d,
                                                elemHeight: p,
                                                collisionPosition: i,
                                                collisionWidth: T,
                                                collisionHeight: k,
                                                offset: [h[0] + E[0], h[1] + E[1]],
                                                my: o.my,
                                                at: o.at,
                                                within: x,
                                                elem: c,
                                            });
                                    }),
                                    o.using &&
                                        (u = function (e) {
                                            var t = v.left - S.left,
                                                n = t + m - d,
                                                i = v.top - S.top,
                                                r = i + g - p,
                                                l = {
                                                    target: { element: w, left: v.left, top: v.top, width: m, height: g },
                                                    element: { element: c, left: S.left, top: S.top, width: d, height: p },
                                                    horizontal: n < 0 ? "left" : t > 0 ? "right" : "center",
                                                    vertical: r < 0 ? "top" : i > 0 ? "bottom" : "middle",
                                                };
                                            m < d && a(t + n) < m && (l.horizontal = "center"),
                                                g < p && a(i + r) < g && (l.vertical = "middle"),
                                                s(a(t), a(n)) > s(a(i), a(r)) ? (l.important = "horizontal") : (l.important = "vertical"),
                                                o.using.call(this, e, l);
                                        }),
                                    c.offset(e.extend(S, { using: u }));
                            })
                        );
                    }),
                    (e.ui.position = {
                        fit: {
                            left: function (e, t) {
                                var n,
                                    i = t.within,
                                    o = i.isWindow ? i.scrollLeft : i.offset.left,
                                    r = i.width,
                                    a = e.left - t.collisionPosition.marginLeft,
                                    l = o - a,
                                    u = a + t.collisionWidth - r - o;
                                t.collisionWidth > r
                                    ? l > 0 && u <= 0
                                        ? ((n = e.left + l + t.collisionWidth - r - o), (e.left += l - n))
                                        : (e.left = u > 0 && l <= 0 ? o : l > u ? o + r - t.collisionWidth : o)
                                    : l > 0
                                    ? (e.left += l)
                                    : u > 0
                                    ? (e.left -= u)
                                    : (e.left = s(e.left - a, e.left));
                            },
                            top: function (e, t) {
                                var n,
                                    i = t.within,
                                    o = i.isWindow ? i.scrollTop : i.offset.top,
                                    r = t.within.height,
                                    a = e.top - t.collisionPosition.marginTop,
                                    l = o - a,
                                    u = a + t.collisionHeight - r - o;
                                t.collisionHeight > r
                                    ? l > 0 && u <= 0
                                        ? ((n = e.top + l + t.collisionHeight - r - o), (e.top += l - n))
                                        : (e.top = u > 0 && l <= 0 ? o : l > u ? o + r - t.collisionHeight : o)
                                    : l > 0
                                    ? (e.top += l)
                                    : u > 0
                                    ? (e.top -= u)
                                    : (e.top = s(e.top - a, e.top));
                            },
                        },
                        flip: {
                            left: function (e, t) {
                                var n,
                                    i,
                                    o = t.within,
                                    r = o.offset.left + o.scrollLeft,
                                    s = o.width,
                                    l = o.isWindow ? o.scrollLeft : o.offset.left,
                                    u = e.left - t.collisionPosition.marginLeft,
                                    c = u - l,
                                    d = u + t.collisionWidth - s - l,
                                    p = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                                    h = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                                    f = -2 * t.offset[0];
                                c < 0
                                    ? ((n = e.left + p + h + f + t.collisionWidth - s - r) < 0 || n < a(c)) && (e.left += p + h + f)
                                    : d > 0 && ((i = e.left - t.collisionPosition.marginLeft + p + h + f - l) > 0 || a(i) < d) && (e.left += p + h + f);
                            },
                            top: function (e, t) {
                                var n,
                                    i,
                                    o = t.within,
                                    r = o.offset.top + o.scrollTop,
                                    s = o.height,
                                    l = o.isWindow ? o.scrollTop : o.offset.top,
                                    u = e.top - t.collisionPosition.marginTop,
                                    c = u - l,
                                    d = u + t.collisionHeight - s - l,
                                    p = "top" === t.my[1] ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                                    h = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                                    f = -2 * t.offset[1];
                                c < 0
                                    ? ((i = e.top + p + h + f + t.collisionHeight - s - r) < 0 || i < a(c)) && (e.top += p + h + f)
                                    : d > 0 && ((n = e.top - t.collisionPosition.marginTop + p + h + f - l) > 0 || a(n) < d) && (e.top += p + h + f);
                            },
                        },
                        flipfit: {
                            left: function () {
                                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments);
                            },
                            top: function () {
                                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments);
                            },
                        },
                    }),
                    (function () {
                        var t,
                            n,
                            i,
                            o,
                            s,
                            a = document.getElementsByTagName("body")[0],
                            l = document.createElement("div");
                        for (s in ((t = document.createElement(a ? "div" : "body")),
                        (i = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }),
                        a && e.extend(i, { position: "absolute", left: "-1000px", top: "-1000px" }),
                        i))
                            t.style[s] = i[s];
                        t.appendChild(l),
                            (n = a || document.documentElement).insertBefore(t, n.firstChild),
                            (l.style.cssText = "position: absolute; left: 10.7432222px;"),
                            (o = e(l).offset().left),
                            (r = o > 10 && o < 11),
                            (t.innerHTML = ""),
                            n.removeChild(t);
                    })();
            })(),
            e.ui.position
        );
    }),
    /*!
     * jQuery UI Menu 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/menu/
     */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./position"], e) : e(jQuery);
    })(function (e) {
        return e.widget("ui.menu", {
            version: "1.11.4",
            defaultElement: "<ul>",
            delay: 300,
            options: { icons: { submenu: "ui-icon-carat-1-e" }, items: "> *", menus: "ul", position: { my: "left-1 top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
            _create: function () {
                (this.activeMenu = this.element),
                    (this.mouseHandled = !1),
                    this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }),
                    this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
                    this._on({
                        "mousedown .ui-menu-item": function (e) {
                            e.preventDefault();
                        },
                        "click .ui-menu-item": function (t) {
                            var n = e(t.target);
                            !this.mouseHandled &&
                                n.not(".ui-state-disabled").length &&
                                (this.select(t),
                                t.isPropagationStopped() || (this.mouseHandled = !0),
                                n.has(".ui-menu").length
                                    ? this.expand(t)
                                    : !this.element.is(":focus") &&
                                      e(this.document[0].activeElement).closest(".ui-menu").length &&
                                      (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                        },
                        "mouseenter .ui-menu-item": function (t) {
                            if (!this.previousFilter) {
                                var n = e(t.currentTarget);
                                n.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, n);
                            }
                        },
                        mouseleave: "collapseAll",
                        "mouseleave .ui-menu": "collapseAll",
                        focus: function (e, t) {
                            var n = this.active || this.element.find(this.options.items).eq(0);
                            t || this.focus(e, n);
                        },
                        blur: function (t) {
                            this._delay(function () {
                                e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t);
                            });
                        },
                        keydown: "_keydown",
                    }),
                    this.refresh(),
                    this._on(this.document, {
                        click: function (e) {
                            this._closeOnDocumentClick(e) && this.collapseAll(e), (this.mouseHandled = !1);
                        },
                    });
            },
            _destroy: function () {
                this.element
                    .removeAttr("aria-activedescendant")
                    .find(".ui-menu")
                    .addBack()
                    .removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front")
                    .removeAttr("role")
                    .removeAttr("tabIndex")
                    .removeAttr("aria-labelledby")
                    .removeAttr("aria-expanded")
                    .removeAttr("aria-hidden")
                    .removeAttr("aria-disabled")
                    .removeUniqueId()
                    .show(),
                    this.element
                        .find(".ui-menu-item")
                        .removeClass("ui-menu-item")
                        .removeAttr("role")
                        .removeAttr("aria-disabled")
                        .removeUniqueId()
                        .removeClass("ui-state-hover")
                        .removeAttr("tabIndex")
                        .removeAttr("role")
                        .removeAttr("aria-haspopup")
                        .children()
                        .each(function () {
                            var t = e(this);
                            t.data("ui-menu-submenu-carat") && t.remove();
                        }),
                    this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
            },
            _keydown: function (t) {
                var n,
                    i,
                    o,
                    r,
                    s = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case e.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case e.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case e.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case e.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case e.ui.keyCode.ENTER:
                    case e.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case e.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        (s = !1),
                            (i = this.previousFilter || ""),
                            (o = String.fromCharCode(t.keyCode)),
                            (r = !1),
                            clearTimeout(this.filterTimer),
                            o === i ? (r = !0) : (o = i + o),
                            (n = this._filterMenuItems(o)),
                            (n = r && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n).length || ((o = String.fromCharCode(t.keyCode)), (n = this._filterMenuItems(o))),
                            n.length
                                ? (this.focus(t, n),
                                  (this.previousFilter = o),
                                  (this.filterTimer = this._delay(function () {
                                      delete this.previousFilter;
                                  }, 1e3)))
                                : delete this.previousFilter;
                }
                s && t.preventDefault();
            },
            _activate: function (e) {
                this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e));
            },
            refresh: function () {
                var t,
                    n = this,
                    i = this.options.icons.submenu,
                    o = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
                    o
                        .filter(":not(.ui-menu)")
                        .addClass("ui-menu ui-widget ui-widget-content ui-front")
                        .hide()
                        .attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" })
                        .each(function () {
                            var t = e(this),
                                n = t.parent(),
                                o = e("<span>")
                                    .addClass("ui-menu-icon ui-icon " + i)
                                    .data("ui-menu-submenu-carat", !0);
                            n.attr("aria-haspopup", "true").prepend(o), t.attr("aria-labelledby", n.attr("id"));
                        }),
                    (t = o.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function () {
                        var t = e(this);
                        n._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider");
                    }),
                    t.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }),
                    t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                    this.active && !e.contains(this.element[0], this.active[0]) && this.blur();
            },
            _itemRole: function () {
                return { menu: "menuitem", listbox: "option" }[this.options.role];
            },
            _setOption: function (e, t) {
                "icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),
                    "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t),
                    this._super(e, t);
            },
            focus: function (e, t) {
                var n, i;
                this.blur(e, e && "focus" === e.type),
                    this._scrollIntoView(t),
                    (this.active = t.first()),
                    (i = this.active.addClass("ui-state-focus").removeClass("ui-state-active")),
                    this.options.role && this.element.attr("aria-activedescendant", i.attr("id")),
                    this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),
                    e && "keydown" === e.type
                        ? this._close()
                        : (this.timer = this._delay(function () {
                              this._close();
                          }, this.delay)),
                    (n = t.children(".ui-menu")).length && e && /^mouse/.test(e.type) && this._startOpening(n),
                    (this.activeMenu = t.parent()),
                    this._trigger("focus", e, { item: t });
            },
            _scrollIntoView: function (t) {
                var n, i, o, r, s, a;
                this._hasScroll() &&
                    ((n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0),
                    (i = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0),
                    (o = t.offset().top - this.activeMenu.offset().top - n - i),
                    (r = this.activeMenu.scrollTop()),
                    (s = this.activeMenu.height()),
                    (a = t.outerHeight()),
                    o < 0 ? this.activeMenu.scrollTop(r + o) : o + a > s && this.activeMenu.scrollTop(r + o - s + a));
            },
            blur: function (e, t) {
                t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), (this.active = null), this._trigger("blur", e, { item: this.active }));
            },
            _startOpening: function (e) {
                clearTimeout(this.timer),
                    "true" === e.attr("aria-hidden") &&
                        (this.timer = this._delay(function () {
                            this._close(), this._open(e);
                        }, this.delay));
            },
            _open: function (t) {
                var n = e.extend({ of: this.active }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n);
            },
            collapseAll: function (t, n) {
                clearTimeout(this.timer),
                    (this.timer = this._delay(function () {
                        var i = n ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                        i.length || (i = this.element), this._close(i), this.blur(t), (this.activeMenu = i);
                    }, this.delay));
            },
            _close: function (e) {
                e || (e = this.active ? this.active.parent() : this.element),
                    e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");
            },
            _closeOnDocumentClick: function (t) {
                return !e(t.target).closest(".ui-menu").length;
            },
            _isDivider: function (e) {
                return !/[^\-\u2014\u2013\s]/.test(e.text());
            },
            collapse: function (e) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(e, t));
            },
            expand: function (e) {
                var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                t &&
                    t.length &&
                    (this._open(t.parent()),
                    this._delay(function () {
                        this.focus(e, t);
                    }));
            },
            next: function (e) {
                this._move("next", "first", e);
            },
            previous: function (e) {
                this._move("prev", "last", e);
            },
            isFirstItem: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length;
            },
            isLastItem: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length;
            },
            _move: function (e, t, n) {
                var i;
                this.active && (i = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)),
                    (i && i.length && this.active) || (i = this.activeMenu.find(this.options.items)[t]()),
                    this.focus(n, i);
            },
            nextPage: function (t) {
                var n, i, o;
                this.active
                    ? this.isLastItem() ||
                      (this._hasScroll()
                          ? ((i = this.active.offset().top),
                            (o = this.element.height()),
                            this.active.nextAll(".ui-menu-item").each(function () {
                                return (n = e(this)).offset().top - i - o < 0;
                            }),
                            this.focus(t, n))
                          : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
                    : this.next(t);
            },
            previousPage: function (t) {
                var n, i, o;
                this.active
                    ? this.isFirstItem() ||
                      (this._hasScroll()
                          ? ((i = this.active.offset().top),
                            (o = this.element.height()),
                            this.active.prevAll(".ui-menu-item").each(function () {
                                return (n = e(this)).offset().top - i + o > 0;
                            }),
                            this.focus(t, n))
                          : this.focus(t, this.activeMenu.find(this.options.items).first()))
                    : this.next(t);
            },
            _hasScroll: function () {
                return this.element.outerHeight() < this.element.prop("scrollHeight");
            },
            select: function (t) {
                this.active = this.active || e(t.target).closest(".ui-menu-item");
                var n = { item: this.active };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, n);
            },
            _filterMenuItems: function (t) {
                var n = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    i = new RegExp("^" + n, "i");
                return this.activeMenu
                    .find(this.options.items)
                    .filter(".ui-menu-item")
                    .filter(function () {
                        return i.test(e.trim(e(this).text()));
                    });
            },
        });
    }),
    /*!
     * jQuery UI Autocomplete 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/autocomplete/
     */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./position", "./menu"], e) : e(jQuery);
    })(function (e) {
        return (
            e.widget("ui.autocomplete", {
                version: "1.11.4",
                defaultElement: "<input>",
                options: {
                    appendTo: null,
                    autoFocus: !1,
                    delay: 300,
                    minLength: 1,
                    position: { my: "left top", at: "left bottom", collision: "none" },
                    source: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    response: null,
                    search: null,
                    select: null,
                },
                requestIndex: 0,
                pending: 0,
                _create: function () {
                    var t,
                        n,
                        i,
                        o = this.element[0].nodeName.toLowerCase(),
                        r = "textarea" === o,
                        s = "input" === o;
                    (this.isMultiLine = !!r || (!s && this.element.prop("isContentEditable"))),
                        (this.valueMethod = this.element[r || s ? "val" : "text"]),
                        (this.isNewMenu = !0),
                        this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
                        this._on(this.element, {
                            keydown: function (o) {
                                if (this.element.prop("readOnly")) return (t = !0), (i = !0), void (n = !0);
                                (t = !1), (i = !1), (n = !1);
                                var r = e.ui.keyCode;
                                switch (o.keyCode) {
                                    case r.PAGE_UP:
                                        (t = !0), this._move("previousPage", o);
                                        break;
                                    case r.PAGE_DOWN:
                                        (t = !0), this._move("nextPage", o);
                                        break;
                                    case r.UP:
                                        (t = !0), this._keyEvent("previous", o);
                                        break;
                                    case r.DOWN:
                                        (t = !0), this._keyEvent("next", o);
                                        break;
                                    case r.ENTER:
                                        this.menu.active && ((t = !0), o.preventDefault(), this.menu.select(o));
                                        break;
                                    case r.TAB:
                                        this.menu.active && this.menu.select(o);
                                        break;
                                    case r.ESCAPE:
                                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(o), o.preventDefault());
                                        break;
                                    default:
                                        (n = !0), this._searchTimeout(o);
                                }
                            },
                            keypress: function (i) {
                                if (t) return (t = !1), void ((this.isMultiLine && !this.menu.element.is(":visible")) || i.preventDefault());
                                if (!n) {
                                    var o = e.ui.keyCode;
                                    switch (i.keyCode) {
                                        case o.PAGE_UP:
                                            this._move("previousPage", i);
                                            break;
                                        case o.PAGE_DOWN:
                                            this._move("nextPage", i);
                                            break;
                                        case o.UP:
                                            this._keyEvent("previous", i);
                                            break;
                                        case o.DOWN:
                                            this._keyEvent("next", i);
                                    }
                                }
                            },
                            input: function (e) {
                                if (i) return (i = !1), void e.preventDefault();
                                this._searchTimeout(e);
                            },
                            focus: function () {
                                (this.selectedItem = null), (this.previous = this._value());
                            },
                            blur: function (e) {
                                this.cancelBlur ? delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), this._change(e));
                            },
                        }),
                        this._initSource(),
                        (this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance")),
                        this._on(this.menu.element, {
                            mousedown: function (t) {
                                t.preventDefault(),
                                    (this.cancelBlur = !0),
                                    this._delay(function () {
                                        delete this.cancelBlur;
                                    });
                                var n = this.menu.element[0];
                                e(t.target).closest(".ui-menu-item").length ||
                                    this._delay(function () {
                                        var t = this;
                                        this.document.one("mousedown", function (i) {
                                            i.target === t.element[0] || i.target === n || e.contains(n, i.target) || t.close();
                                        });
                                    });
                            },
                            menufocus: function (t, n) {
                                var i, o;
                                if (this.isNewMenu && ((this.isNewMenu = !1), t.originalEvent && /^mouse/.test(t.originalEvent.type)))
                                    return (
                                        this.menu.blur(),
                                        void this.document.one("mousemove", function () {
                                            e(t.target).trigger(t.originalEvent);
                                        })
                                    );
                                (o = n.item.data("ui-autocomplete-item")),
                                    !1 !== this._trigger("focus", t, { item: o }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(o.value),
                                    (i = n.item.attr("aria-label") || o.value) && e.trim(i).length && (this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion));
                            },
                            menuselect: function (e, t) {
                                var n = t.item.data("ui-autocomplete-item"),
                                    i = this.previous;
                                this.element[0] !== this.document[0].activeElement &&
                                    (this.element.focus(),
                                    (this.previous = i),
                                    this._delay(function () {
                                        (this.previous = i), (this.selectedItem = n);
                                    })),
                                    !1 !== this._trigger("select", e, { item: n }) && this._value(n.value),
                                    (this.term = this._value()),
                                    this.close(e),
                                    (this.selectedItem = n);
                            },
                        }),
                        (this.liveRegion = e("<span>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _destroy: function () {
                    clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
                },
                _setOption: function (e, t) {
                    this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort();
                },
                _appendTo: function () {
                    var t = this.options.appendTo;
                    return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), (t && t[0]) || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t;
                },
                _initSource: function () {
                    var t,
                        n,
                        i = this;
                    e.isArray(this.options.source)
                        ? ((t = this.options.source),
                          (this.source = function (n, i) {
                              i(e.ui.autocomplete.filter(t, n.term));
                          }))
                        : "string" == typeof this.options.source
                        ? ((n = this.options.source),
                          (this.source = function (t, o) {
                              i.xhr && i.xhr.abort(),
                                  (i.xhr = e.ajax({
                                      url: n,
                                      data: t,
                                      dataType: "json",
                                      success: function (e) {
                                          o(e);
                                      },
                                      error: function () {
                                          o([]);
                                      },
                                  }));
                          }))
                        : (this.source = this.options.source);
                },
                _searchTimeout: function (e) {
                    clearTimeout(this.searching),
                        (this.searching = this._delay(function () {
                            var t = this.term === this._value(),
                                n = this.menu.element.is(":visible"),
                                i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
                            (t && (!t || n || i)) || ((this.selectedItem = null), this.search(null, e));
                        }, this.options.delay));
                },
                search: function (e, t) {
                    return (e = null != e ? e : this._value()), (this.term = this._value()), e.length < this.options.minLength ? this.close(t) : !1 !== this._trigger("search", t) ? this._search(e) : void 0;
                },
                _search: function (e) {
                    this.pending++, this.element.addClass("ui-autocomplete-loading"), (this.cancelSearch = !1), this.source({ term: e }, this._response());
                },
                _response: function () {
                    var t = ++this.requestIndex;
                    return e.proxy(function (e) {
                        t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading");
                    }, this);
                },
                __response: function (e) {
                    e && (e = this._normalize(e)), this._trigger("response", null, { content: e }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close();
                },
                close: function (e) {
                    (this.cancelSearch = !0), this._close(e);
                },
                _close: function (e) {
                    this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), (this.isNewMenu = !0), this._trigger("close", e));
                },
                _change: function (e) {
                    this.previous !== this._value() && this._trigger("change", e, { item: this.selectedItem });
                },
                _normalize: function (t) {
                    return t.length && t[0].label && t[0].value
                        ? t
                        : e.map(t, function (t) {
                              return "string" == typeof t ? { label: t, value: t } : e.extend({}, t, { label: t.label || t.value, value: t.value || t.label });
                          });
                },
                _suggest: function (t) {
                    var n = this.menu.element.empty();
                    this._renderMenu(n, t), (this.isNewMenu = !0), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next();
                },
                _resizeMenu: function () {
                    var e = this.menu.element;
                    e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()));
                },
                _renderMenu: function (t, n) {
                    var i = this;
                    e.each(n, function (e, n) {
                        i._renderItemData(t, n);
                    });
                },
                _renderItemData: function (e, t) {
                    return this._renderItem(e, t).data("ui-autocomplete-item", t);
                },
                _renderItem: function (t, n) {
                    return e("<li>").text(n.label).appendTo(t);
                },
                _move: function (e, t) {
                    if (this.menu.element.is(":visible"))
                        return (this.menu.isFirstItem() && /^previous/.test(e)) || (this.menu.isLastItem() && /^next/.test(e)) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[e](t);
                    this.search(null, t);
                },
                widget: function () {
                    return this.menu.element;
                },
                _value: function () {
                    return this.valueMethod.apply(this.element, arguments);
                },
                _keyEvent: function (e, t) {
                    (this.isMultiLine && !this.menu.element.is(":visible")) || (this._move(e, t), t.preventDefault());
                },
            }),
            e.extend(e.ui.autocomplete, {
                escapeRegex: function (e) {
                    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (t, n) {
                    var i = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
                    return e.grep(t, function (e) {
                        return i.test(e.label || e.value || e);
                    });
                },
            }),
            e.widget("ui.autocomplete", e.ui.autocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (e) {
                            return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                        },
                    },
                },
                __response: function (t) {
                    var n;
                    this._superApply(arguments),
                        this.options.disabled ||
                            this.cancelSearch ||
                            ((n = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults), this.liveRegion.children().hide(), e("<div>").text(n).appendTo(this.liveRegion));
                },
            }),
            e.ui.autocomplete
        );
    }),
    $(function () {
        $("#service-type").on("submit", function () {
            $(this).on("ajax:success", function () {
                setTimeout(function () {
                    emailAutoComplete();
                }, 500);
            });
        }),
            ($('.step [name="pii[email]"]')[0] || $('.input-wrapper [name="pii[email]"]')) && emailAutoComplete();
    }),
    $(function () {
        $(document).on("click", ".btn-services", function () {
            var e = $(".step:visible").find("#step_counter").val();
            $(".steps").find(".step").last().attr("data-step") == parseInt(e) + 1 &&
                ((lead_id = $("#email_lead_visited").val()), $.ajax({ type: "post", url: "/lead_visited", data: { lead_id: lead_id }, success: function () {}, error: function () {} }));
        }),
            $(document).on("click", "#update_pii", function () {
                $("form.pii-submit-form").find("div.has-error").length <= 0 &&
                    ($("#edit_pii_modal").modal("toggle"),
                    $("#visitor_email").text($("#edit_pii_email").val()),
                    $("#visitor_phone").text($("#edit_pii_phone_number").val()),
                    $("#visitor_street").text($("#edit_pii_street_address").val()),
                    $("#visitor_zipcode").text($("#edit_pii_zipcode").val()),
                    $("#visitor_city").text($("#edit_pii_city").val()),
                    $("#visitor_state").text($("#edit_pii_state_code").val()));
            }),
            $('[data-target="#edit_pii_modal"]').on("click", function () {
                $("#edit_pii_modal .hidden").show().removeClass("hidden"), $("#edit_pii_modal .modal-title").text("Edit Personal Info");
            }),
            $("#edit_pii_modal").on("hide show", function () {
                $("form.pii-submit-form").find("div.has-error").length > 0 &&
                    ($("#edit_pii_email").val($("#visitor_email").text()),
                    $("#edit_pii_phone_number").val($("#visitor_phone").text()),
                    $("#edit_pii_street_address").val($("#visitor_street").text()),
                    $("#edit_pii_zipcode").val($("#visitor_zipcode").text()),
                    $("#edit_pii_city").val($("#visitor_city").text()),
                    $("#edit_pii_state_code").val($("#visitor_state").text()));
            });
    }),
    (function (e) {
        "function" == typeof define && define.amd
            ? define(["jquery"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = function (t, n) {
                  return void 0 === n && (n = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), e(n), n;
              })
            : e(jQuery);
    })(function (e) {
        var t = (function () {
                if (e && e.fn && e.fn.select2 && e.fn.select2.amd) var t = e.fn.select2.amd;
                return (
                    (function () {
                        var e, n, i;
                        (t && t.requirejs) ||
                            (t ? (n = t) : (t = {}),
                            (function (t) {
                                function o(e, t) {
                                    return x.call(e, t);
                                }
                                function r(e, t) {
                                    var n,
                                        i,
                                        o,
                                        r,
                                        s,
                                        a,
                                        l,
                                        u,
                                        c,
                                        d,
                                        p,
                                        h = t && t.split("/"),
                                        f = b.map,
                                        m = (f && f["*"]) || {};
                                    if (e) {
                                        for (
                                            s = (e = e.split("/")).length - 1, b.nodeIdCompat && _.test(e[s]) && (e[s] = e[s].replace(_, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), c = 0;
                                            c < e.length;
                                            c++
                                        )
                                            if ("." === (p = e[c])) e.splice(c, 1), (c -= 1);
                                            else if (".." === p) {
                                                if (0 === c || (1 === c && ".." === e[2]) || ".." === e[c - 1]) continue;
                                                c > 0 && (e.splice(c - 1, 2), (c -= 2));
                                            }
                                        e = e.join("/");
                                    }
                                    if ((h || m) && f) {
                                        for (c = (n = e.split("/")).length; c > 0; c -= 1) {
                                            if (((i = n.slice(0, c).join("/")), h))
                                                for (d = h.length; d > 0; d -= 1)
                                                    if ((o = f[h.slice(0, d).join("/")]) && (o = o[i])) {
                                                        (r = o), (a = c);
                                                        break;
                                                    }
                                            if (r) break;
                                            !l && m && m[i] && ((l = m[i]), (u = c));
                                        }
                                        !r && l && ((r = l), (a = u)), r && (n.splice(0, a, r), (e = n.join("/")));
                                    }
                                    return e;
                                }
                                function s(e, n) {
                                    return function () {
                                        var i = $.call(arguments, 0);
                                        return "string" != typeof i[0] && 1 === i.length && i.push(null), f.apply(t, i.concat([e, n]));
                                    };
                                }
                                function a(e) {
                                    return function (t) {
                                        return r(t, e);
                                    };
                                }
                                function l(e) {
                                    return function (t) {
                                        v[e] = t;
                                    };
                                }
                                function u(e) {
                                    if (o(y, e)) {
                                        var n = y[e];
                                        delete y[e], (w[e] = !0), h.apply(t, n);
                                    }
                                    if (!o(v, e) && !o(w, e)) throw new Error("No " + e);
                                    return v[e];
                                }
                                function c(e) {
                                    var t,
                                        n = e ? e.indexOf("!") : -1;
                                    return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
                                }
                                function d(e) {
                                    return e ? c(e) : [];
                                }
                                function p(e) {
                                    return function () {
                                        return (b && b.config && b.config[e]) || {};
                                    };
                                }
                                var h,
                                    f,
                                    m,
                                    g,
                                    v = {},
                                    y = {},
                                    b = {},
                                    w = {},
                                    x = Object.prototype.hasOwnProperty,
                                    $ = [].slice,
                                    _ = /\.js$/;
                                (m = function (e, t) {
                                    var n,
                                        i = c(e),
                                        o = i[0],
                                        s = t[1];
                                    return (
                                        (e = i[1]),
                                        o && (n = u((o = r(o, s)))),
                                        o ? (e = n && n.normalize ? n.normalize(e, a(s)) : r(e, s)) : ((o = (i = c((e = r(e, s))))[0]), (e = i[1]), o && (n = u(o))),
                                        { f: o ? o + "!" + e : e, n: e, pr: o, p: n }
                                    );
                                }),
                                    (g = {
                                        require: function (e) {
                                            return s(e);
                                        },
                                        exports: function (e) {
                                            var t = v[e];
                                            return void 0 !== t ? t : (v[e] = {});
                                        },
                                        module: function (e) {
                                            return { id: e, uri: "", exports: v[e], config: p(e) };
                                        },
                                    }),
                                    (h = function (e, n, i, r) {
                                        var a,
                                            c,
                                            p,
                                            h,
                                            f,
                                            b,
                                            x,
                                            $ = [],
                                            _ = typeof i;
                                        if (((b = d((r = r || e))), "undefined" === _ || "function" === _)) {
                                            for (n = !n.length && i.length ? ["require", "exports", "module"] : n, f = 0; f < n.length; f += 1)
                                                if ("require" === (c = (h = m(n[f], b)).f)) $[f] = g.require(e);
                                                else if ("exports" === c) ($[f] = g.exports(e)), (x = !0);
                                                else if ("module" === c) a = $[f] = g.module(e);
                                                else if (o(v, c) || o(y, c) || o(w, c)) $[f] = u(c);
                                                else {
                                                    if (!h.p) throw new Error(e + " missing " + c);
                                                    h.p.load(h.n, s(r, !0), l(c), {}), ($[f] = v[c]);
                                                }
                                            (p = i ? i.apply(v[e], $) : void 0), e && (a && a.exports !== t && a.exports !== v[e] ? (v[e] = a.exports) : (p === t && x) || (v[e] = p));
                                        } else e && (v[e] = i);
                                    }),
                                    (e = n = f = function (e, n, i, o, r) {
                                        if ("string" == typeof e) return g[e] ? g[e](n) : u(m(e, d(n)).f);
                                        if (!e.splice) {
                                            if (((b = e).deps && f(b.deps, b.callback), !n)) return;
                                            n.splice ? ((e = n), (n = i), (i = null)) : (e = t);
                                        }
                                        return (
                                            (n = n || function () {}),
                                            "function" == typeof i && ((i = o), (o = r)),
                                            o
                                                ? h(t, e, n, i)
                                                : setTimeout(function () {
                                                      h(t, e, n, i);
                                                  }, 4),
                                            f
                                        );
                                    }),
                                    (f.config = function (e) {
                                        return f(e);
                                    }),
                                    (e._defined = v),
                                    ((i = function (e, t, n) {
                                        if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                                        t.splice || ((n = t), (t = [])), o(v, e) || o(y, e) || (y[e] = [e, t, n]);
                                    }).amd = { jQuery: !0 });
                            })(),
                            (t.requirejs = e),
                            (t.require = n),
                            (t.define = i));
                    })(),
                    t.define("almond", function () {}),
                    t.define("jquery", [], function () {
                        var t = e || $;
                        return (
                            null == t && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), t
                        );
                    }),
                    t.define("select2/utils", ["jquery"], function (e) {
                        function t(e) {
                            var t = e.prototype,
                                n = [];
                            for (var i in t) "function" == typeof t[i] && "constructor" !== i && n.push(i);
                            return n;
                        }
                        var n = {
                                Extend: function (e, t) {
                                    function n() {
                                        this.constructor = e;
                                    }
                                    var i = {}.hasOwnProperty;
                                    for (var o in t) i.call(t, o) && (e[o] = t[o]);
                                    return (n.prototype = t.prototype), (e.prototype = new n()), (e.__super__ = t.prototype), e;
                                },
                                Decorate: function (e, n) {
                                    function i() {
                                        var t = Array.prototype.unshift,
                                            i = n.prototype.constructor.length,
                                            o = e.prototype.constructor;
                                        i > 0 && (t.call(arguments, e.prototype.constructor), (o = n.prototype.constructor)), o.apply(this, arguments);
                                    }
                                    function o() {
                                        this.constructor = i;
                                    }
                                    var r = t(n),
                                        s = t(e);
                                    (n.displayName = e.displayName), (i.prototype = new o());
                                    for (var a = 0; a < s.length; a++) {
                                        var l = s[a];
                                        i.prototype[l] = e.prototype[l];
                                    }
                                    for (
                                        var u = function (e) {
                                                var t = function () {};
                                                (e in i.prototype) && (t = i.prototype[e]);
                                                var o = n.prototype[e];
                                                return function () {
                                                    return Array.prototype.unshift.call(arguments, t), o.apply(this, arguments);
                                                };
                                            },
                                            c = 0;
                                        c < r.length;
                                        c++
                                    ) {
                                        var d = r[c];
                                        i.prototype[d] = u(d);
                                    }
                                    return i;
                                },
                            },
                            i = function () {
                                this.listeners = {};
                            };
                        return (
                            (i.prototype.on = function (e, t) {
                                (this.listeners = this.listeners || {}), e in this.listeners ? this.listeners[e].push(t) : (this.listeners[e] = [t]);
                            }),
                            (i.prototype.trigger = function (e) {
                                var t = Array.prototype.slice,
                                    n = t.call(arguments, 1);
                                (this.listeners = this.listeners || {}),
                                    null == n && (n = []),
                                    0 === n.length && n.push({}),
                                    (n[0]._type = e),
                                    e in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)),
                                    "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
                            }),
                            (i.prototype.invoke = function (e, t) {
                                for (var n = 0, i = e.length; n < i; n++) e[n].apply(this, t);
                            }),
                            (n.Observable = i),
                            (n.generateChars = function (e) {
                                for (var t = "", n = 0; n < e; n++) t += Math.floor(36 * Math.random()).toString(36);
                                return t;
                            }),
                            (n.bind = function (e, t) {
                                return function () {
                                    e.apply(t, arguments);
                                };
                            }),
                            (n._convertData = function (e) {
                                for (var t in e) {
                                    var n = t.split("-"),
                                        i = e;
                                    if (1 !== n.length) {
                                        for (var o = 0; o < n.length; o++) {
                                            var r = n[o];
                                            (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in i || (i[r] = {}), o == n.length - 1 && (i[r] = e[t]), (i = i[r]);
                                        }
                                        delete e[t];
                                    }
                                }
                                return e;
                            }),
                            (n.hasScroll = function (t, n) {
                                var i = e(n),
                                    o = n.style.overflowX,
                                    r = n.style.overflowY;
                                return (o !== r || ("hidden" !== r && "visible" !== r)) && ("scroll" === o || "scroll" === r || i.innerHeight() < n.scrollHeight || i.innerWidth() < n.scrollWidth);
                            }),
                            (n.escapeMarkup = function (e) {
                                var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                                return "string" != typeof e
                                    ? e
                                    : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                                          return t[e];
                                      });
                            }),
                            (n.appendMany = function (t, n) {
                                if ("1.7" === e.fn.jquery.substr(0, 3)) {
                                    var i = e();
                                    e.map(n, function (e) {
                                        i = i.add(e);
                                    }),
                                        (n = i);
                                }
                                t.append(n);
                            }),
                            n
                        );
                    }),
                    t.define("select2/results", ["jquery", "./utils"], function (e, t) {
                        function n(e, t, i) {
                            (this.$element = e), (this.data = i), (this.options = t), n.__super__.constructor.call(this);
                        }
                        return (
                            t.Extend(n, t.Observable),
                            (n.prototype.render = function () {
                                var t = e('<ul class="select2-results__options" role="tree"></ul>');
                                return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), (this.$results = t), t;
                            }),
                            (n.prototype.clear = function () {
                                this.$results.empty();
                            }),
                            (n.prototype.displayMessage = function (t) {
                                var n = this.options.get("escapeMarkup");
                                this.clear(), this.hideLoading();
                                var i = e('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                                    o = this.options.get("translations").get(t.message);
                                i.append(n(o(t.args))), (i[0].className += " select2-results__message"), this.$results.append(i);
                            }),
                            (n.prototype.hideMessages = function () {
                                this.$results.find(".select2-results__message").remove();
                            }),
                            (n.prototype.append = function (e) {
                                this.hideLoading();
                                var t = [];
                                if (null != e.results && 0 !== e.results.length) {
                                    e.results = this.sort(e.results);
                                    for (var n = 0; n < e.results.length; n++) {
                                        var i = e.results[n],
                                            o = this.option(i);
                                        t.push(o);
                                    }
                                    this.$results.append(t);
                                } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" });
                            }),
                            (n.prototype.position = function (e, t) {
                                t.find(".select2-results").append(e);
                            }),
                            (n.prototype.sort = function (e) {
                                return this.options.get("sorter")(e);
                            }),
                            (n.prototype.highlightFirstItem = function () {
                                var e = this.$results.find(".select2-results__option[aria-selected]"),
                                    t = e.filter("[aria-selected=true]");
                                t.length > 0 ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible();
                            }),
                            (n.prototype.setClasses = function () {
                                var t = this;
                                this.data.current(function (n) {
                                    var i = e.map(n, function (e) {
                                        return e.id.toString();
                                    });
                                    t.$results.find(".select2-results__option[aria-selected]").each(function () {
                                        var t = e(this),
                                            n = e.data(this, "data"),
                                            o = "" + n.id;
                                        (null != n.element && n.element.selected) || (null == n.element && e.inArray(o, i) > -1) ? t.attr("aria-selected", "true") : t.attr("aria-selected", "false");
                                    });
                                });
                            }),
                            (n.prototype.showLoading = function (e) {
                                this.hideLoading();
                                var t = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(e) },
                                    n = this.option(t);
                                (n.className += " loading-results"), this.$results.prepend(n);
                            }),
                            (n.prototype.hideLoading = function () {
                                this.$results.find(".loading-results").remove();
                            }),
                            (n.prototype.option = function (t) {
                                var n = document.createElement("li");
                                n.className = "select2-results__option";
                                var i = { role: "treeitem", "aria-selected": "false" };
                                for (var o in (t.disabled && (delete i["aria-selected"], (i["aria-disabled"] = "true")),
                                null == t.id && delete i["aria-selected"],
                                null != t._resultId && (n.id = t._resultId),
                                t.title && (n.title = t.title),
                                t.children && ((i.role = "group"), (i["aria-label"] = t.text), delete i["aria-selected"]),
                                i)) {
                                    var r = i[o];
                                    n.setAttribute(o, r);
                                }
                                if (t.children) {
                                    var s = e(n),
                                        a = document.createElement("strong");
                                    (a.className = "select2-results__group"), e(a), this.template(t, a);
                                    for (var l = [], u = 0; u < t.children.length; u++) {
                                        var c = t.children[u],
                                            d = this.option(c);
                                        l.push(d);
                                    }
                                    var p = e("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                                    p.append(l), s.append(a), s.append(p);
                                } else this.template(t, n);
                                return e.data(n, "data", t), n;
                            }),
                            (n.prototype.bind = function (t) {
                                var n = this,
                                    i = t.id + "-results";
                                this.$results.attr("id", i),
                                    t.on("results:all", function (e) {
                                        n.clear(), n.append(e.data), t.isOpen() && (n.setClasses(), n.highlightFirstItem());
                                    }),
                                    t.on("results:append", function (e) {
                                        n.append(e.data), t.isOpen() && n.setClasses();
                                    }),
                                    t.on("query", function (e) {
                                        n.hideMessages(), n.showLoading(e);
                                    }),
                                    t.on("select", function () {
                                        t.isOpen() && (n.setClasses(), n.highlightFirstItem());
                                    }),
                                    t.on("unselect", function () {
                                        t.isOpen() && (n.setClasses(), n.highlightFirstItem());
                                    }),
                                    t.on("open", function () {
                                        n.$results.attr("aria-expanded", "true"), n.$results.attr("aria-hidden", "false"), n.setClasses(), n.ensureHighlightVisible();
                                    }),
                                    t.on("close", function () {
                                        n.$results.attr("aria-expanded", "false"), n.$results.attr("aria-hidden", "true"), n.$results.removeAttr("aria-activedescendant");
                                    }),
                                    t.on("results:toggle", function () {
                                        var e = n.getHighlightedResults();
                                        0 !== e.length && e.trigger("mouseup");
                                    }),
                                    t.on("results:select", function () {
                                        var e = n.getHighlightedResults();
                                        if (0 !== e.length) {
                                            var t = e.data("data");
                                            "true" == e.attr("aria-selected") ? n.trigger("close", {}) : n.trigger("select", { data: t });
                                        }
                                    }),
                                    t.on("results:previous", function () {
                                        var e = n.getHighlightedResults(),
                                            t = n.$results.find("[aria-selected]"),
                                            i = t.index(e);
                                        if (0 !== i) {
                                            var o = i - 1;
                                            0 === e.length && (o = 0);
                                            var r = t.eq(o);
                                            r.trigger("mouseenter");
                                            var s = n.$results.offset().top,
                                                a = r.offset().top,
                                                l = n.$results.scrollTop() + (a - s);
                                            0 === o ? n.$results.scrollTop(0) : a - s < 0 && n.$results.scrollTop(l);
                                        }
                                    }),
                                    t.on("results:next", function () {
                                        var e = n.getHighlightedResults(),
                                            t = n.$results.find("[aria-selected]"),
                                            i = t.index(e) + 1;
                                        if (!(i >= t.length)) {
                                            var o = t.eq(i);
                                            o.trigger("mouseenter");
                                            var r = n.$results.offset().top + n.$results.outerHeight(!1),
                                                s = o.offset().top + o.outerHeight(!1),
                                                a = n.$results.scrollTop() + s - r;
                                            0 === i ? n.$results.scrollTop(0) : s > r && n.$results.scrollTop(a);
                                        }
                                    }),
                                    t.on("results:focus", function (e) {
                                        e.element.addClass("select2-results__option--highlighted");
                                    }),
                                    t.on("results:message", function (e) {
                                        n.displayMessage(e);
                                    }),
                                    e.fn.mousewheel &&
                                        this.$results.on("mousewheel", function (e) {
                                            var t = n.$results.scrollTop(),
                                                i = n.$results.get(0).scrollHeight - t + e.deltaY,
                                                o = e.deltaY > 0 && t - e.deltaY <= 0,
                                                r = e.deltaY < 0 && i <= n.$results.height();
                                            o ? (n.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : r && (n.$results.scrollTop(n.$results.get(0).scrollHeight - n.$results.height()), e.preventDefault(), e.stopPropagation());
                                        }),
                                    this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (t) {
                                        var i = e(this),
                                            o = i.data("data");
                                        "true" !== i.attr("aria-selected") ? n.trigger("select", { originalEvent: t, data: o }) : n.options.get("multiple") ? n.trigger("unselect", { originalEvent: t, data: o }) : n.trigger("close", {});
                                    }),
                                    this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function () {
                                        var t = e(this).data("data");
                                        n.getHighlightedResults().removeClass("select2-results__option--highlighted"), n.trigger("results:focus", { data: t, element: e(this) });
                                    });
                            }),
                            (n.prototype.getHighlightedResults = function () {
                                return this.$results.find(".select2-results__option--highlighted");
                            }),
                            (n.prototype.destroy = function () {
                                this.$results.remove();
                            }),
                            (n.prototype.ensureHighlightVisible = function () {
                                var e = this.getHighlightedResults();
                                if (0 !== e.length) {
                                    var t = this.$results.find("[aria-selected]").index(e),
                                        n = this.$results.offset().top,
                                        i = e.offset().top,
                                        o = this.$results.scrollTop() + (i - n),
                                        r = i - n;
                                    (o -= 2 * e.outerHeight(!1)), t <= 2 ? this.$results.scrollTop(0) : (r > this.$results.outerHeight() || r < 0) && this.$results.scrollTop(o);
                                }
                            }),
                            (n.prototype.template = function (t, n) {
                                var i = this.options.get("templateResult"),
                                    o = this.options.get("escapeMarkup"),
                                    r = i(t, n);
                                null == r ? (n.style.display = "none") : "string" == typeof r ? (n.innerHTML = o(r)) : e(n).append(r);
                            }),
                            n
                        );
                    }),
                    t.define("select2/keys", [], function () {
                        return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
                    }),
                    t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (e, t, n) {
                        function i(e, t) {
                            (this.$element = e), (this.options = t), i.__super__.constructor.call(this);
                        }
                        return (
                            t.Extend(i, t.Observable),
                            (i.prototype.render = function () {
                                var t = e('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                                return (
                                    (this._tabindex = 0),
                                    null != this.$element.data("old-tabindex") ? (this._tabindex = this.$element.data("old-tabindex")) : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")),
                                    t.attr("title", this.$element.attr("title")),
                                    t.attr("tabindex", this._tabindex),
                                    (this.$selection = t),
                                    t
                                );
                            }),
                            (i.prototype.bind = function (e) {
                                var t = this,
                                    i = (e.id, e.id + "-results");
                                (this.container = e),
                                    this.$selection.on("focus", function (e) {
                                        t.trigger("focus", e);
                                    }),
                                    this.$selection.on("blur", function (e) {
                                        t._handleBlur(e);
                                    }),
                                    this.$selection.on("keydown", function (e) {
                                        t.trigger("keypress", e), e.which === n.SPACE && e.preventDefault();
                                    }),
                                    e.on("results:focus", function (e) {
                                        t.$selection.attr("aria-activedescendant", e.data._resultId);
                                    }),
                                    e.on("selection:update", function (e) {
                                        t.update(e.data);
                                    }),
                                    e.on("open", function () {
                                        t.$selection.attr("aria-expanded", "true"), t.$selection.attr("aria-owns", i), t._attachCloseHandler(e);
                                    }),
                                    e.on("close", function () {
                                        t.$selection.attr("aria-expanded", "false"), t.$selection.removeAttr("aria-activedescendant"), t.$selection.removeAttr("aria-owns"), t.$selection.focus(), t._detachCloseHandler(e);
                                    }),
                                    e.on("enable", function () {
                                        t.$selection.attr("tabindex", t._tabindex);
                                    }),
                                    e.on("disable", function () {
                                        t.$selection.attr("tabindex", "-1");
                                    });
                            }),
                            (i.prototype._handleBlur = function (t) {
                                var n = this;
                                window.setTimeout(function () {
                                    document.activeElement == n.$selection[0] || e.contains(n.$selection[0], document.activeElement) || n.trigger("blur", t);
                                }, 1);
                            }),
                            (i.prototype._attachCloseHandler = function (t) {
                                e(document.body).on("mousedown.select2." + t.id, function (t) {
                                    var n = e(t.target).closest(".select2");
                                    e(".select2.select2-container--open").each(function () {
                                        var t = e(this);
                                        this != n[0] && t.data("element").select2("close");
                                    });
                                });
                            }),
                            (i.prototype._detachCloseHandler = function (t) {
                                e(document.body).off("mousedown.select2." + t.id);
                            }),
                            (i.prototype.position = function (e, t) {
                                t.find(".selection").append(e);
                            }),
                            (i.prototype.destroy = function () {
                                this._detachCloseHandler(this.container);
                            }),
                            (i.prototype.update = function () {
                                throw new Error("The `update` method must be defined in child classes.");
                            }),
                            i
                        );
                    }),
                    t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (e, t, n) {
                        function i() {
                            i.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            n.Extend(i, t),
                            (i.prototype.render = function () {
                                var e = i.__super__.render.call(this);
                                return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e;
                            }),
                            (i.prototype.bind = function (e) {
                                var t = this;
                                i.__super__.bind.apply(this, arguments);
                                var n = e.id + "-container";
                                this.$selection.find(".select2-selection__rendered").attr("id", n),
                                    this.$selection.attr("aria-labelledby", n),
                                    this.$selection.on("mousedown", function (e) {
                                        1 === e.which && t.trigger("toggle", { originalEvent: e });
                                    }),
                                    this.$selection.on("focus", function () {}),
                                    this.$selection.on("blur", function () {}),
                                    e.on("focus", function () {
                                        e.isOpen() || t.$selection.focus();
                                    }),
                                    e.on("selection:update", function (e) {
                                        t.update(e.data);
                                    });
                            }),
                            (i.prototype.clear = function () {
                                this.$selection.find(".select2-selection__rendered").empty();
                            }),
                            (i.prototype.display = function (e, t) {
                                var n = this.options.get("templateSelection");
                                return this.options.get("escapeMarkup")(n(e, t));
                            }),
                            (i.prototype.selectionContainer = function () {
                                return e("<span></span>");
                            }),
                            (i.prototype.update = function (e) {
                                if (0 !== e.length) {
                                    var t = e[0],
                                        n = this.$selection.find(".select2-selection__rendered"),
                                        i = this.display(t, n);
                                    n.empty().append(i), n.prop("title", t.title || t.text);
                                } else this.clear();
                            }),
                            i
                        );
                    }),
                    t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (e, t, n) {
                        function i() {
                            i.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            n.Extend(i, t),
                            (i.prototype.render = function () {
                                var e = i.__super__.render.call(this);
                                return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e;
                            }),
                            (i.prototype.bind = function () {
                                var t = this;
                                i.__super__.bind.apply(this, arguments),
                                    this.$selection.on("click", function (e) {
                                        t.trigger("toggle", { originalEvent: e });
                                    }),
                                    this.$selection.on("click", ".select2-selection__choice__remove", function (n) {
                                        if (!t.options.get("disabled")) {
                                            var i = e(this).parent().data("data");
                                            t.trigger("unselect", { originalEvent: n, data: i });
                                        }
                                    });
                            }),
                            (i.prototype.clear = function () {
                                this.$selection.find(".select2-selection__rendered").empty();
                            }),
                            (i.prototype.display = function (e, t) {
                                var n = this.options.get("templateSelection");
                                return this.options.get("escapeMarkup")(n(e, t));
                            }),
                            (i.prototype.selectionContainer = function () {
                                return e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                            }),
                            (i.prototype.update = function (e) {
                                if ((this.clear(), 0 !== e.length)) {
                                    for (var t = [], i = 0; i < e.length; i++) {
                                        var o = e[i],
                                            r = this.selectionContainer(),
                                            s = this.display(o, r);
                                        r.append(s), r.prop("title", o.title || o.text), r.data("data", o), t.push(r);
                                    }
                                    var a = this.$selection.find(".select2-selection__rendered");
                                    n.appendMany(a, t);
                                }
                            }),
                            i
                        );
                    }),
                    t.define("select2/selection/placeholder", ["../utils"], function () {
                        function e(e, t, n) {
                            (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))), e.call(this, t, n);
                        }
                        return (
                            (e.prototype.normalizePlaceholder = function (e, t) {
                                return "string" == typeof t && (t = { id: "", text: t }), t;
                            }),
                            (e.prototype.createPlaceholder = function (e, t) {
                                var n = this.selectionContainer();
                                return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n;
                            }),
                            (e.prototype.update = function (e, t) {
                                var n = 1 == t.length && t[0].id != this.placeholder.id;
                                if (t.length > 1 || n) return e.call(this, t);
                                this.clear();
                                var i = this.createPlaceholder(this.placeholder);
                                this.$selection.find(".select2-selection__rendered").append(i);
                            }),
                            e
                        );
                    }),
                    t.define("select2/selection/allowClear", ["jquery", "../keys"], function (e, t) {
                        function n() {}
                        return (
                            (n.prototype.bind = function (e, t, n) {
                                var i = this;
                                e.call(this, t, n),
                                    null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                                    this.$selection.on("mousedown", ".select2-selection__clear", function (e) {
                                        i._handleClear(e);
                                    }),
                                    t.on("keypress", function (e) {
                                        i._handleKeyboardClear(e, t);
                                    });
                            }),
                            (n.prototype._handleClear = function (e, t) {
                                if (!this.options.get("disabled")) {
                                    var n = this.$selection.find(".select2-selection__clear");
                                    if (0 !== n.length) {
                                        t.stopPropagation();
                                        for (var i = n.data("data"), o = 0; o < i.length; o++) {
                                            var r = { data: i[o] };
                                            if ((this.trigger("unselect", r), r.prevented)) return;
                                        }
                                        this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
                                    }
                                }
                            }),
                            (n.prototype._handleKeyboardClear = function (e, n, i) {
                                i.isOpen() || (n.which != t.DELETE && n.which != t.BACKSPACE) || this._handleClear(n);
                            }),
                            (n.prototype.update = function (t, n) {
                                if ((t.call(this, n), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === n.length))) {
                                    var i = e('<span class="select2-selection__clear">&times;</span>');
                                    i.data("data", n), this.$selection.find(".select2-selection__rendered").prepend(i);
                                }
                            }),
                            n
                        );
                    }),
                    t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (e, t, n) {
                        function i(e, t, n) {
                            e.call(this, t, n);
                        }
                        return (
                            (i.prototype.render = function (t) {
                                var n = e(
                                    '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                                );
                                (this.$searchContainer = n), (this.$search = n.find("input"));
                                var i = t.call(this);
                                return this._transferTabIndex(), i;
                            }),
                            (i.prototype.bind = function (e, t, i) {
                                var o = this;
                                e.call(this, t, i),
                                    t.on("open", function () {
                                        o.$search.trigger("focus");
                                    }),
                                    t.on("close", function () {
                                        o.$search.val(""), o.$search.removeAttr("aria-activedescendant"), o.$search.trigger("focus");
                                    }),
                                    t.on("enable", function () {
                                        o.$search.prop("disabled", !1), o._transferTabIndex();
                                    }),
                                    t.on("disable", function () {
                                        o.$search.prop("disabled", !0);
                                    }),
                                    t.on("focus", function () {
                                        o.$search.trigger("focus");
                                    }),
                                    t.on("results:focus", function (e) {
                                        o.$search.attr("aria-activedescendant", e.id);
                                    }),
                                    this.$selection.on("focusin", ".select2-search--inline", function (e) {
                                        o.trigger("focus", e);
                                    }),
                                    this.$selection.on("focusout", ".select2-search--inline", function (e) {
                                        o._handleBlur(e);
                                    }),
                                    this.$selection.on("keydown", ".select2-search--inline", function (e) {
                                        if ((e.stopPropagation(), o.trigger("keypress", e), (o._keyUpPrevented = e.isDefaultPrevented()), e.which === n.BACKSPACE && "" === o.$search.val())) {
                                            var t = o.$searchContainer.prev(".select2-selection__choice");
                                            if (t.length > 0) {
                                                var i = t.data("data");
                                                o.searchRemoveChoice(i), e.preventDefault();
                                            }
                                        }
                                    });
                                var r = document.documentMode,
                                    s = r && r <= 11;
                                this.$selection.on("input.searchcheck", ".select2-search--inline", function () {
                                    s ? o.$selection.off("input.search input.searchcheck") : o.$selection.off("keyup.search");
                                }),
                                    this.$selection.on("keyup.search input.search", ".select2-search--inline", function (e) {
                                        if (s && "input" === e.type) o.$selection.off("input.search input.searchcheck");
                                        else {
                                            var t = e.which;
                                            t != n.SHIFT && t != n.CTRL && t != n.ALT && t != n.TAB && o.handleSearch(e);
                                        }
                                    });
                            }),
                            (i.prototype._transferTabIndex = function () {
                                this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
                            }),
                            (i.prototype.createPlaceholder = function (e, t) {
                                this.$search.attr("placeholder", t.text);
                            }),
                            (i.prototype.update = function (e, t) {
                                var n = this.$search[0] == document.activeElement;
                                this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.focus();
                            }),
                            (i.prototype.handleSearch = function () {
                                if ((this.resizeSearch(), !this._keyUpPrevented)) {
                                    var e = this.$search.val();
                                    this.trigger("query", { term: e });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (i.prototype.searchRemoveChoice = function (e, t) {
                                this.trigger("unselect", { data: t }), this.$search.val(t.text), this.handleSearch();
                            }),
                            (i.prototype.resizeSearch = function () {
                                this.$search.css("width", "25px");
                                var e = "";
                                (e = "" !== this.$search.attr("placeholder") ? this.$selection.find(".select2-selection__rendered").innerWidth() : 0.75 * (this.$search.val().length + 1) + "em"), this.$search.css("width", e);
                            }),
                            i
                        );
                    }),
                    t.define("select2/selection/eventRelay", ["jquery"], function (e) {
                        function t() {}
                        return (
                            (t.prototype.bind = function (t, n, i) {
                                var o = this,
                                    r = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                                    s = ["opening", "closing", "selecting", "unselecting"];
                                t.call(this, n, i),
                                    n.on("*", function (t, n) {
                                        if (-1 !== e.inArray(t, r)) {
                                            n = n || {};
                                            var i = e.Event("select2:" + t, { params: n });
                                            o.$element.trigger(i), -1 !== e.inArray(t, s) && (n.prevented = i.isDefaultPrevented());
                                        }
                                    });
                            }),
                            t
                        );
                    }),
                    t.define("select2/translation", ["jquery", "require"], function (e, t) {
                        function n(e) {
                            this.dict = e || {};
                        }
                        return (
                            (n.prototype.all = function () {
                                return this.dict;
                            }),
                            (n.prototype.get = function (e) {
                                return this.dict[e];
                            }),
                            (n.prototype.extend = function (t) {
                                this.dict = e.extend({}, t.all(), this.dict);
                            }),
                            (n._cache = {}),
                            (n.loadPath = function (e) {
                                if (!(e in n._cache)) {
                                    var i = t(e);
                                    n._cache[e] = i;
                                }
                                return new n(n._cache[e]);
                            }),
                            n
                        );
                    }),
                    t.define("select2/diacritics", [], function () {
                        return {
                            "\u24b6": "A",
                            Ａ: "A",
                            À: "A",
                            Á: "A",
                            Â: "A",
                            Ầ: "A",
                            Ấ: "A",
                            Ẫ: "A",
                            Ẩ: "A",
                            Ã: "A",
                            Ā: "A",
                            Ă: "A",
                            Ằ: "A",
                            Ắ: "A",
                            Ẵ: "A",
                            Ẳ: "A",
                            Ȧ: "A",
                            Ǡ: "A",
                            Ä: "A",
                            Ǟ: "A",
                            Ả: "A",
                            Å: "A",
                            Ǻ: "A",
                            Ǎ: "A",
                            Ȁ: "A",
                            Ȃ: "A",
                            Ạ: "A",
                            Ậ: "A",
                            Ặ: "A",
                            Ḁ: "A",
                            Ą: "A",
                            Ⱥ: "A",
                            Ɐ: "A",
                            Ꜳ: "AA",
                            Æ: "AE",
                            Ǽ: "AE",
                            Ǣ: "AE",
                            Ꜵ: "AO",
                            Ꜷ: "AU",
                            Ꜹ: "AV",
                            Ꜻ: "AV",
                            Ꜽ: "AY",
                            "\u24b7": "B",
                            Ｂ: "B",
                            Ḃ: "B",
                            Ḅ: "B",
                            Ḇ: "B",
                            Ƀ: "B",
                            Ƃ: "B",
                            Ɓ: "B",
                            "\u24b8": "C",
                            Ｃ: "C",
                            Ć: "C",
                            Ĉ: "C",
                            Ċ: "C",
                            Č: "C",
                            Ç: "C",
                            Ḉ: "C",
                            Ƈ: "C",
                            Ȼ: "C",
                            Ꜿ: "C",
                            "\u24b9": "D",
                            Ｄ: "D",
                            Ḋ: "D",
                            Ď: "D",
                            Ḍ: "D",
                            Ḑ: "D",
                            Ḓ: "D",
                            Ḏ: "D",
                            Đ: "D",
                            Ƌ: "D",
                            Ɗ: "D",
                            Ɖ: "D",
                            Ꝺ: "D",
                            Ǳ: "DZ",
                            Ǆ: "DZ",
                            ǲ: "Dz",
                            ǅ: "Dz",
                            "\u24ba": "E",
                            Ｅ: "E",
                            È: "E",
                            É: "E",
                            Ê: "E",
                            Ề: "E",
                            Ế: "E",
                            Ễ: "E",
                            Ể: "E",
                            Ẽ: "E",
                            Ē: "E",
                            Ḕ: "E",
                            Ḗ: "E",
                            Ĕ: "E",
                            Ė: "E",
                            Ë: "E",
                            Ẻ: "E",
                            Ě: "E",
                            Ȅ: "E",
                            Ȇ: "E",
                            Ẹ: "E",
                            Ệ: "E",
                            Ȩ: "E",
                            Ḝ: "E",
                            Ę: "E",
                            Ḙ: "E",
                            Ḛ: "E",
                            Ɛ: "E",
                            Ǝ: "E",
                            "\u24bb": "F",
                            Ｆ: "F",
                            Ḟ: "F",
                            Ƒ: "F",
                            Ꝼ: "F",
                            "\u24bc": "G",
                            Ｇ: "G",
                            Ǵ: "G",
                            Ĝ: "G",
                            Ḡ: "G",
                            Ğ: "G",
                            Ġ: "G",
                            Ǧ: "G",
                            Ģ: "G",
                            Ǥ: "G",
                            Ɠ: "G",
                            Ꞡ: "G",
                            Ᵹ: "G",
                            Ꝿ: "G",
                            "\u24bd": "H",
                            Ｈ: "H",
                            Ĥ: "H",
                            Ḣ: "H",
                            Ḧ: "H",
                            Ȟ: "H",
                            Ḥ: "H",
                            Ḩ: "H",
                            Ḫ: "H",
                            Ħ: "H",
                            Ⱨ: "H",
                            Ⱶ: "H",
                            Ɥ: "H",
                            "\u24be": "I",
                            Ｉ: "I",
                            Ì: "I",
                            Í: "I",
                            Î: "I",
                            Ĩ: "I",
                            Ī: "I",
                            Ĭ: "I",
                            İ: "I",
                            Ï: "I",
                            Ḯ: "I",
                            Ỉ: "I",
                            Ǐ: "I",
                            Ȉ: "I",
                            Ȋ: "I",
                            Ị: "I",
                            Į: "I",
                            Ḭ: "I",
                            Ɨ: "I",
                            "\u24bf": "J",
                            Ｊ: "J",
                            Ĵ: "J",
                            Ɉ: "J",
                            "\u24c0": "K",
                            Ｋ: "K",
                            Ḱ: "K",
                            Ǩ: "K",
                            Ḳ: "K",
                            Ķ: "K",
                            Ḵ: "K",
                            Ƙ: "K",
                            Ⱪ: "K",
                            Ꝁ: "K",
                            Ꝃ: "K",
                            Ꝅ: "K",
                            Ꞣ: "K",
                            "\u24c1": "L",
                            Ｌ: "L",
                            Ŀ: "L",
                            Ĺ: "L",
                            Ľ: "L",
                            Ḷ: "L",
                            Ḹ: "L",
                            Ļ: "L",
                            Ḽ: "L",
                            Ḻ: "L",
                            Ł: "L",
                            Ƚ: "L",
                            Ɫ: "L",
                            Ⱡ: "L",
                            Ꝉ: "L",
                            Ꝇ: "L",
                            Ꞁ: "L",
                            Ǉ: "LJ",
                            ǈ: "Lj",
                            "\u24c2": "M",
                            Ｍ: "M",
                            Ḿ: "M",
                            Ṁ: "M",
                            Ṃ: "M",
                            Ɱ: "M",
                            Ɯ: "M",
                            "\u24c3": "N",
                            Ｎ: "N",
                            Ǹ: "N",
                            Ń: "N",
                            Ñ: "N",
                            Ṅ: "N",
                            Ň: "N",
                            Ṇ: "N",
                            Ņ: "N",
                            Ṋ: "N",
                            Ṉ: "N",
                            Ƞ: "N",
                            Ɲ: "N",
                            Ꞑ: "N",
                            Ꞥ: "N",
                            Ǌ: "NJ",
                            ǋ: "Nj",
                            "\u24c4": "O",
                            Ｏ: "O",
                            Ò: "O",
                            Ó: "O",
                            Ô: "O",
                            Ồ: "O",
                            Ố: "O",
                            Ỗ: "O",
                            Ổ: "O",
                            Õ: "O",
                            Ṍ: "O",
                            Ȭ: "O",
                            Ṏ: "O",
                            Ō: "O",
                            Ṑ: "O",
                            Ṓ: "O",
                            Ŏ: "O",
                            Ȯ: "O",
                            Ȱ: "O",
                            Ö: "O",
                            Ȫ: "O",
                            Ỏ: "O",
                            Ő: "O",
                            Ǒ: "O",
                            Ȍ: "O",
                            Ȏ: "O",
                            Ơ: "O",
                            Ờ: "O",
                            Ớ: "O",
                            Ỡ: "O",
                            Ở: "O",
                            Ợ: "O",
                            Ọ: "O",
                            Ộ: "O",
                            Ǫ: "O",
                            Ǭ: "O",
                            Ø: "O",
                            Ǿ: "O",
                            Ɔ: "O",
                            Ɵ: "O",
                            Ꝋ: "O",
                            Ꝍ: "O",
                            Ƣ: "OI",
                            Ꝏ: "OO",
                            Ȣ: "OU",
                            "\u24c5": "P",
                            Ｐ: "P",
                            Ṕ: "P",
                            Ṗ: "P",
                            Ƥ: "P",
                            Ᵽ: "P",
                            Ꝑ: "P",
                            Ꝓ: "P",
                            Ꝕ: "P",
                            "\u24c6": "Q",
                            Ｑ: "Q",
                            Ꝗ: "Q",
                            Ꝙ: "Q",
                            Ɋ: "Q",
                            "\u24c7": "R",
                            Ｒ: "R",
                            Ŕ: "R",
                            Ṙ: "R",
                            Ř: "R",
                            Ȑ: "R",
                            Ȓ: "R",
                            Ṛ: "R",
                            Ṝ: "R",
                            Ŗ: "R",
                            Ṟ: "R",
                            Ɍ: "R",
                            Ɽ: "R",
                            Ꝛ: "R",
                            Ꞧ: "R",
                            Ꞃ: "R",
                            "\u24c8": "S",
                            Ｓ: "S",
                            ẞ: "S",
                            Ś: "S",
                            Ṥ: "S",
                            Ŝ: "S",
                            Ṡ: "S",
                            Š: "S",
                            Ṧ: "S",
                            Ṣ: "S",
                            Ṩ: "S",
                            Ș: "S",
                            Ş: "S",
                            Ȿ: "S",
                            Ꞩ: "S",
                            Ꞅ: "S",
                            "\u24c9": "T",
                            Ｔ: "T",
                            Ṫ: "T",
                            Ť: "T",
                            Ṭ: "T",
                            Ț: "T",
                            Ţ: "T",
                            Ṱ: "T",
                            Ṯ: "T",
                            Ŧ: "T",
                            Ƭ: "T",
                            Ʈ: "T",
                            Ⱦ: "T",
                            Ꞇ: "T",
                            Ꜩ: "TZ",
                            "\u24ca": "U",
                            Ｕ: "U",
                            Ù: "U",
                            Ú: "U",
                            Û: "U",
                            Ũ: "U",
                            Ṹ: "U",
                            Ū: "U",
                            Ṻ: "U",
                            Ŭ: "U",
                            Ü: "U",
                            Ǜ: "U",
                            Ǘ: "U",
                            Ǖ: "U",
                            Ǚ: "U",
                            Ủ: "U",
                            Ů: "U",
                            Ű: "U",
                            Ǔ: "U",
                            Ȕ: "U",
                            Ȗ: "U",
                            Ư: "U",
                            Ừ: "U",
                            Ứ: "U",
                            Ữ: "U",
                            Ử: "U",
                            Ự: "U",
                            Ụ: "U",
                            Ṳ: "U",
                            Ų: "U",
                            Ṷ: "U",
                            Ṵ: "U",
                            Ʉ: "U",
                            "\u24cb": "V",
                            Ｖ: "V",
                            Ṽ: "V",
                            Ṿ: "V",
                            Ʋ: "V",
                            Ꝟ: "V",
                            Ʌ: "V",
                            Ꝡ: "VY",
                            "\u24cc": "W",
                            Ｗ: "W",
                            Ẁ: "W",
                            Ẃ: "W",
                            Ŵ: "W",
                            Ẇ: "W",
                            Ẅ: "W",
                            Ẉ: "W",
                            Ⱳ: "W",
                            "\u24cd": "X",
                            Ｘ: "X",
                            Ẋ: "X",
                            Ẍ: "X",
                            "\u24ce": "Y",
                            Ｙ: "Y",
                            Ỳ: "Y",
                            Ý: "Y",
                            Ŷ: "Y",
                            Ỹ: "Y",
                            Ȳ: "Y",
                            Ẏ: "Y",
                            Ÿ: "Y",
                            Ỷ: "Y",
                            Ỵ: "Y",
                            Ƴ: "Y",
                            Ɏ: "Y",
                            Ỿ: "Y",
                            "\u24cf": "Z",
                            Ｚ: "Z",
                            Ź: "Z",
                            Ẑ: "Z",
                            Ż: "Z",
                            Ž: "Z",
                            Ẓ: "Z",
                            Ẕ: "Z",
                            Ƶ: "Z",
                            Ȥ: "Z",
                            Ɀ: "Z",
                            Ⱬ: "Z",
                            Ꝣ: "Z",
                            "\u24d0": "a",
                            ａ: "a",
                            ẚ: "a",
                            à: "a",
                            á: "a",
                            â: "a",
                            ầ: "a",
                            ấ: "a",
                            ẫ: "a",
                            ẩ: "a",
                            ã: "a",
                            ā: "a",
                            ă: "a",
                            ằ: "a",
                            ắ: "a",
                            ẵ: "a",
                            ẳ: "a",
                            ȧ: "a",
                            ǡ: "a",
                            ä: "a",
                            ǟ: "a",
                            ả: "a",
                            å: "a",
                            ǻ: "a",
                            ǎ: "a",
                            ȁ: "a",
                            ȃ: "a",
                            ạ: "a",
                            ậ: "a",
                            ặ: "a",
                            ḁ: "a",
                            ą: "a",
                            ⱥ: "a",
                            ɐ: "a",
                            ꜳ: "aa",
                            æ: "ae",
                            ǽ: "ae",
                            ǣ: "ae",
                            ꜵ: "ao",
                            ꜷ: "au",
                            ꜹ: "av",
                            ꜻ: "av",
                            ꜽ: "ay",
                            "\u24d1": "b",
                            ｂ: "b",
                            ḃ: "b",
                            ḅ: "b",
                            ḇ: "b",
                            ƀ: "b",
                            ƃ: "b",
                            ɓ: "b",
                            "\u24d2": "c",
                            ｃ: "c",
                            ć: "c",
                            ĉ: "c",
                            ċ: "c",
                            č: "c",
                            ç: "c",
                            ḉ: "c",
                            ƈ: "c",
                            ȼ: "c",
                            ꜿ: "c",
                            ↄ: "c",
                            "\u24d3": "d",
                            ｄ: "d",
                            ḋ: "d",
                            ď: "d",
                            ḍ: "d",
                            ḑ: "d",
                            ḓ: "d",
                            ḏ: "d",
                            đ: "d",
                            ƌ: "d",
                            ɖ: "d",
                            ɗ: "d",
                            ꝺ: "d",
                            ǳ: "dz",
                            ǆ: "dz",
                            "\u24d4": "e",
                            ｅ: "e",
                            è: "e",
                            é: "e",
                            ê: "e",
                            ề: "e",
                            ế: "e",
                            ễ: "e",
                            ể: "e",
                            ẽ: "e",
                            ē: "e",
                            ḕ: "e",
                            ḗ: "e",
                            ĕ: "e",
                            ė: "e",
                            ë: "e",
                            ẻ: "e",
                            ě: "e",
                            ȅ: "e",
                            ȇ: "e",
                            ẹ: "e",
                            ệ: "e",
                            ȩ: "e",
                            ḝ: "e",
                            ę: "e",
                            ḙ: "e",
                            ḛ: "e",
                            ɇ: "e",
                            ɛ: "e",
                            ǝ: "e",
                            "\u24d5": "f",
                            ｆ: "f",
                            ḟ: "f",
                            ƒ: "f",
                            ꝼ: "f",
                            "\u24d6": "g",
                            ｇ: "g",
                            ǵ: "g",
                            ĝ: "g",
                            ḡ: "g",
                            ğ: "g",
                            ġ: "g",
                            ǧ: "g",
                            ģ: "g",
                            ǥ: "g",
                            ɠ: "g",
                            ꞡ: "g",
                            ᵹ: "g",
                            ꝿ: "g",
                            "\u24d7": "h",
                            ｈ: "h",
                            ĥ: "h",
                            ḣ: "h",
                            ḧ: "h",
                            ȟ: "h",
                            ḥ: "h",
                            ḩ: "h",
                            ḫ: "h",
                            ẖ: "h",
                            ħ: "h",
                            ⱨ: "h",
                            ⱶ: "h",
                            ɥ: "h",
                            ƕ: "hv",
                            "\u24d8": "i",
                            ｉ: "i",
                            ì: "i",
                            í: "i",
                            î: "i",
                            ĩ: "i",
                            ī: "i",
                            ĭ: "i",
                            ï: "i",
                            ḯ: "i",
                            ỉ: "i",
                            ǐ: "i",
                            ȉ: "i",
                            ȋ: "i",
                            ị: "i",
                            į: "i",
                            ḭ: "i",
                            ɨ: "i",
                            ı: "i",
                            "\u24d9": "j",
                            ｊ: "j",
                            ĵ: "j",
                            ǰ: "j",
                            ɉ: "j",
                            "\u24da": "k",
                            ｋ: "k",
                            ḱ: "k",
                            ǩ: "k",
                            ḳ: "k",
                            ķ: "k",
                            ḵ: "k",
                            ƙ: "k",
                            ⱪ: "k",
                            ꝁ: "k",
                            ꝃ: "k",
                            ꝅ: "k",
                            ꞣ: "k",
                            "\u24db": "l",
                            ｌ: "l",
                            ŀ: "l",
                            ĺ: "l",
                            ľ: "l",
                            ḷ: "l",
                            ḹ: "l",
                            ļ: "l",
                            ḽ: "l",
                            ḻ: "l",
                            ſ: "l",
                            ł: "l",
                            ƚ: "l",
                            ɫ: "l",
                            ⱡ: "l",
                            ꝉ: "l",
                            ꞁ: "l",
                            ꝇ: "l",
                            ǉ: "lj",
                            "\u24dc": "m",
                            ｍ: "m",
                            ḿ: "m",
                            ṁ: "m",
                            ṃ: "m",
                            ɱ: "m",
                            ɯ: "m",
                            "\u24dd": "n",
                            ｎ: "n",
                            ǹ: "n",
                            ń: "n",
                            ñ: "n",
                            ṅ: "n",
                            ň: "n",
                            ṇ: "n",
                            ņ: "n",
                            ṋ: "n",
                            ṉ: "n",
                            ƞ: "n",
                            ɲ: "n",
                            ŉ: "n",
                            ꞑ: "n",
                            ꞥ: "n",
                            ǌ: "nj",
                            "\u24de": "o",
                            ｏ: "o",
                            ò: "o",
                            ó: "o",
                            ô: "o",
                            ồ: "o",
                            ố: "o",
                            ỗ: "o",
                            ổ: "o",
                            õ: "o",
                            ṍ: "o",
                            ȭ: "o",
                            ṏ: "o",
                            ō: "o",
                            ṑ: "o",
                            ṓ: "o",
                            ŏ: "o",
                            ȯ: "o",
                            ȱ: "o",
                            ö: "o",
                            ȫ: "o",
                            ỏ: "o",
                            ő: "o",
                            ǒ: "o",
                            ȍ: "o",
                            ȏ: "o",
                            ơ: "o",
                            ờ: "o",
                            ớ: "o",
                            ỡ: "o",
                            ở: "o",
                            ợ: "o",
                            ọ: "o",
                            ộ: "o",
                            ǫ: "o",
                            ǭ: "o",
                            ø: "o",
                            ǿ: "o",
                            ɔ: "o",
                            ꝋ: "o",
                            ꝍ: "o",
                            ɵ: "o",
                            ƣ: "oi",
                            ȣ: "ou",
                            ꝏ: "oo",
                            "\u24df": "p",
                            ｐ: "p",
                            ṕ: "p",
                            ṗ: "p",
                            ƥ: "p",
                            ᵽ: "p",
                            ꝑ: "p",
                            ꝓ: "p",
                            ꝕ: "p",
                            "\u24e0": "q",
                            ｑ: "q",
                            ɋ: "q",
                            ꝗ: "q",
                            ꝙ: "q",
                            "\u24e1": "r",
                            ｒ: "r",
                            ŕ: "r",
                            ṙ: "r",
                            ř: "r",
                            ȑ: "r",
                            ȓ: "r",
                            ṛ: "r",
                            ṝ: "r",
                            ŗ: "r",
                            ṟ: "r",
                            ɍ: "r",
                            ɽ: "r",
                            ꝛ: "r",
                            ꞧ: "r",
                            ꞃ: "r",
                            "\u24e2": "s",
                            ｓ: "s",
                            ß: "s",
                            ś: "s",
                            ṥ: "s",
                            ŝ: "s",
                            ṡ: "s",
                            š: "s",
                            ṧ: "s",
                            ṣ: "s",
                            ṩ: "s",
                            ș: "s",
                            ş: "s",
                            ȿ: "s",
                            ꞩ: "s",
                            ꞅ: "s",
                            ẛ: "s",
                            "\u24e3": "t",
                            ｔ: "t",
                            ṫ: "t",
                            ẗ: "t",
                            ť: "t",
                            ṭ: "t",
                            ț: "t",
                            ţ: "t",
                            ṱ: "t",
                            ṯ: "t",
                            ŧ: "t",
                            ƭ: "t",
                            ʈ: "t",
                            ⱦ: "t",
                            ꞇ: "t",
                            ꜩ: "tz",
                            "\u24e4": "u",
                            ｕ: "u",
                            ù: "u",
                            ú: "u",
                            û: "u",
                            ũ: "u",
                            ṹ: "u",
                            ū: "u",
                            ṻ: "u",
                            ŭ: "u",
                            ü: "u",
                            ǜ: "u",
                            ǘ: "u",
                            ǖ: "u",
                            ǚ: "u",
                            ủ: "u",
                            ů: "u",
                            ű: "u",
                            ǔ: "u",
                            ȕ: "u",
                            ȗ: "u",
                            ư: "u",
                            ừ: "u",
                            ứ: "u",
                            ữ: "u",
                            ử: "u",
                            ự: "u",
                            ụ: "u",
                            ṳ: "u",
                            ų: "u",
                            ṷ: "u",
                            ṵ: "u",
                            ʉ: "u",
                            "\u24e5": "v",
                            ｖ: "v",
                            ṽ: "v",
                            ṿ: "v",
                            ʋ: "v",
                            ꝟ: "v",
                            ʌ: "v",
                            ꝡ: "vy",
                            "\u24e6": "w",
                            ｗ: "w",
                            ẁ: "w",
                            ẃ: "w",
                            ŵ: "w",
                            ẇ: "w",
                            ẅ: "w",
                            ẘ: "w",
                            ẉ: "w",
                            ⱳ: "w",
                            "\u24e7": "x",
                            ｘ: "x",
                            ẋ: "x",
                            ẍ: "x",
                            "\u24e8": "y",
                            ｙ: "y",
                            ỳ: "y",
                            ý: "y",
                            ŷ: "y",
                            ỹ: "y",
                            ȳ: "y",
                            ẏ: "y",
                            ÿ: "y",
                            ỷ: "y",
                            ẙ: "y",
                            ỵ: "y",
                            ƴ: "y",
                            ɏ: "y",
                            ỿ: "y",
                            "\u24e9": "z",
                            ｚ: "z",
                            ź: "z",
                            ẑ: "z",
                            ż: "z",
                            ž: "z",
                            ẓ: "z",
                            ẕ: "z",
                            ƶ: "z",
                            ȥ: "z",
                            ɀ: "z",
                            ⱬ: "z",
                            ꝣ: "z",
                            Ά: "\u0391",
                            Έ: "\u0395",
                            Ή: "\u0397",
                            Ί: "\u0399",
                            Ϊ: "\u0399",
                            Ό: "\u039f",
                            Ύ: "\u03a5",
                            Ϋ: "\u03a5",
                            Ώ: "\u03a9",
                            ά: "\u03b1",
                            έ: "\u03b5",
                            ή: "\u03b7",
                            ί: "\u03b9",
                            ϊ: "\u03b9",
                            ΐ: "\u03b9",
                            ό: "\u03bf",
                            ύ: "\u03c5",
                            ϋ: "\u03c5",
                            ΰ: "\u03c5",
                            ω: "\u03c9",
                            ς: "\u03c3",
                        };
                    }),
                    t.define("select2/data/base", ["../utils"], function (e) {
                        function t() {
                            t.__super__.constructor.call(this);
                        }
                        return (
                            e.Extend(t, e.Observable),
                            (t.prototype.current = function () {
                                throw new Error("The `current` method must be defined in child classes.");
                            }),
                            (t.prototype.query = function () {
                                throw new Error("The `query` method must be defined in child classes.");
                            }),
                            (t.prototype.bind = function () {}),
                            (t.prototype.destroy = function () {}),
                            (t.prototype.generateResultId = function (t, n) {
                                var i = t.id + "-result-";
                                return (i += e.generateChars(4)), null != n.id ? (i += "-" + n.id.toString()) : (i += "-" + e.generateChars(4)), i;
                            }),
                            t
                        );
                    }),
                    t.define("select2/data/select", ["./base", "../utils", "jquery"], function (e, t, n) {
                        function i(e, t) {
                            (this.$element = e), (this.options = t), i.__super__.constructor.call(this);
                        }
                        return (
                            t.Extend(i, e),
                            (i.prototype.current = function (e) {
                                var t = [],
                                    i = this;
                                this.$element.find(":selected").each(function () {
                                    var e = n(this),
                                        o = i.item(e);
                                    t.push(o);
                                }),
                                    e(t);
                            }),
                            (i.prototype.select = function (e) {
                                var t = this;
                                if (((e.selected = !0), n(e.element).is("option"))) return (e.element.selected = !0), void this.$element.trigger("change");
                                if (this.$element.prop("multiple"))
                                    this.current(function (i) {
                                        var o = [];
                                        (e = [e]).push.apply(e, i);
                                        for (var r = 0; r < e.length; r++) {
                                            var s = e[r].id;
                                            -1 === n.inArray(s, o) && o.push(s);
                                        }
                                        t.$element.val(o), t.$element.trigger("change");
                                    });
                                else {
                                    var i = e.id;
                                    this.$element.val(i), this.$element.trigger("change");
                                }
                            }),
                            (i.prototype.unselect = function (e) {
                                var t = this;
                                if (this.$element.prop("multiple")) {
                                    if (((e.selected = !1), n(e.element).is("option"))) return (e.element.selected = !1), void this.$element.trigger("change");
                                    this.current(function (i) {
                                        for (var o = [], r = 0; r < i.length; r++) {
                                            var s = i[r].id;
                                            s !== e.id && -1 === n.inArray(s, o) && o.push(s);
                                        }
                                        t.$element.val(o), t.$element.trigger("change");
                                    });
                                }
                            }),
                            (i.prototype.bind = function (e) {
                                var t = this;
                                (this.container = e),
                                    e.on("select", function (e) {
                                        t.select(e.data);
                                    }),
                                    e.on("unselect", function (e) {
                                        t.unselect(e.data);
                                    });
                            }),
                            (i.prototype.destroy = function () {
                                this.$element.find("*").each(function () {
                                    n.removeData(this, "data");
                                });
                            }),
                            (i.prototype.query = function (e, t) {
                                var i = [],
                                    o = this;
                                this.$element.children().each(function () {
                                    var t = n(this);
                                    if (t.is("option") || t.is("optgroup")) {
                                        var r = o.item(t),
                                            s = o.matches(e, r);
                                        null !== s && i.push(s);
                                    }
                                }),
                                    t({ results: i });
                            }),
                            (i.prototype.addOptions = function (e) {
                                t.appendMany(this.$element, e);
                            }),
                            (i.prototype.option = function (e) {
                                var t;
                                e.children ? ((t = document.createElement("optgroup")).label = e.text) : void 0 !== (t = document.createElement("option")).textContent ? (t.textContent = e.text) : (t.innerText = e.text),
                                    void 0 !== e.id && (t.value = e.id),
                                    e.disabled && (t.disabled = !0),
                                    e.selected && (t.selected = !0),
                                    e.title && (t.title = e.title);
                                var i = n(t),
                                    o = this._normalizeItem(e);
                                return (o.element = t), n.data(t, "data", o), i;
                            }),
                            (i.prototype.item = function (e) {
                                var t = {};
                                if (null != (t = n.data(e[0], "data"))) return t;
                                if (e.is("option")) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                                else if (e.is("optgroup")) {
                                    t = { text: e.prop("label"), children: [], title: e.prop("title") };
                                    for (var i = e.children("option"), o = [], r = 0; r < i.length; r++) {
                                        var s = n(i[r]),
                                            a = this.item(s);
                                        o.push(a);
                                    }
                                    t.children = o;
                                }
                                return ((t = this._normalizeItem(t)).element = e[0]), n.data(e[0], "data", t), t;
                            }),
                            (i.prototype._normalizeItem = function (e) {
                                n.isPlainObject(e) || (e = { id: e, text: e });
                                var t = { selected: !1, disabled: !1 };
                                return (
                                    null != (e = n.extend({}, { text: "" }, e)).id && (e.id = e.id.toString()),
                                    null != e.text && (e.text = e.text.toString()),
                                    null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)),
                                    n.extend({}, t, e)
                                );
                            }),
                            (i.prototype.matches = function (e, t) {
                                return this.options.get("matcher")(e, t);
                            }),
                            i
                        );
                    }),
                    t.define("select2/data/array", ["./select", "../utils", "jquery"], function (e, t, n) {
                        function i(e, t) {
                            var n = t.get("data") || [];
                            i.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(n));
                        }
                        return (
                            t.Extend(i, e),
                            (i.prototype.select = function (e) {
                                var t = this.$element.find("option").filter(function (t, n) {
                                    return n.value == e.id.toString();
                                });
                                0 === t.length && ((t = this.option(e)), this.addOptions(t)), i.__super__.select.call(this, e);
                            }),
                            (i.prototype.convertToOptions = function (e) {
                                function i(e) {
                                    return function () {
                                        return n(this).val() == e.id;
                                    };
                                }
                                for (
                                    var o = this,
                                        r = this.$element.find("option"),
                                        s = r
                                            .map(function () {
                                                return o.item(n(this)).id;
                                            })
                                            .get(),
                                        a = [],
                                        l = 0;
                                    l < e.length;
                                    l++
                                ) {
                                    var u = this._normalizeItem(e[l]);
                                    if (n.inArray(u.id, s) >= 0) {
                                        var c = r.filter(i(u)),
                                            d = this.item(c),
                                            p = n.extend(!0, {}, u, d),
                                            h = this.option(p);
                                        c.replaceWith(h);
                                    } else {
                                        var f = this.option(u);
                                        if (u.children) {
                                            var m = this.convertToOptions(u.children);
                                            t.appendMany(f, m);
                                        }
                                        a.push(f);
                                    }
                                }
                                return a;
                            }),
                            i
                        );
                    }),
                    t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (e, t, n) {
                        function i(e, t) {
                            (this.ajaxOptions = this._applyDefaults(t.get("ajax"))), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), i.__super__.constructor.call(this, e, t);
                        }
                        return (
                            t.Extend(i, e),
                            (i.prototype._applyDefaults = function (e) {
                                var t = {
                                    data: function (e) {
                                        return n.extend({}, e, { q: e.term });
                                    },
                                    transport: function (e, t, i) {
                                        var o = n.ajax(e);
                                        return o.then(t), o.fail(i), o;
                                    },
                                };
                                return n.extend({}, t, e, !0);
                            }),
                            (i.prototype.processResults = function (e) {
                                return e;
                            }),
                            (i.prototype.query = function (e, t) {
                                function i() {
                                    var i = r.transport(
                                        r,
                                        function (i) {
                                            var r = o.processResults(i, e);
                                            o.options.get("debug") &&
                                                window.console &&
                                                console.error &&
                                                ((r && r.results && n.isArray(r.results)) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),
                                                t(r);
                                        },
                                        function () {
                                            (i.status && "0" === i.status) || o.trigger("results:message", { message: "errorLoading" });
                                        }
                                    );
                                    o._request = i;
                                }
                                var o = this;
                                null != this._request && (n.isFunction(this._request.abort) && this._request.abort(), (this._request = null));
                                var r = n.extend({ type: "GET" }, this.ajaxOptions);
                                "function" == typeof r.url && (r.url = r.url.call(this.$element, e)),
                                    "function" == typeof r.data && (r.data = r.data.call(this.$element, e)),
                                    this.ajaxOptions.delay && null != e.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), (this._queryTimeout = window.setTimeout(i, this.ajaxOptions.delay))) : i();
                            }),
                            i
                        );
                    }),
                    t.define("select2/data/tags", ["jquery"], function (e) {
                        function t(t, n, i) {
                            var o = i.get("tags"),
                                r = i.get("createTag");
                            void 0 !== r && (this.createTag = r);
                            var s = i.get("insertTag");
                            if ((void 0 !== s && (this.insertTag = s), t.call(this, n, i), e.isArray(o)))
                                for (var a = 0; a < o.length; a++) {
                                    var l = o[a],
                                        u = this._normalizeItem(l),
                                        c = this.option(u);
                                    this.$element.append(c);
                                }
                        }
                        return (
                            (t.prototype.query = function (e, t, n) {
                                function i(e, r) {
                                    for (var s = e.results, a = 0; a < s.length; a++) {
                                        var l = s[a],
                                            u = null != l.children && !i({ results: l.children }, !0);
                                        if ((l.text || "").toUpperCase() === (t.term || "").toUpperCase() || u) return !r && ((e.data = s), void n(e));
                                    }
                                    if (r) return !0;
                                    var c = o.createTag(t);
                                    if (null != c) {
                                        var d = o.option(c);
                                        d.attr("data-select2-tag", !0), o.addOptions([d]), o.insertTag(s, c);
                                    }
                                    (e.results = s), n(e);
                                }
                                var o = this;
                                this._removeOldTags(), null != t.term && null == t.page ? e.call(this, t, i) : e.call(this, t, n);
                            }),
                            (t.prototype.createTag = function (t, n) {
                                var i = e.trim(n.term);
                                return "" === i ? null : { id: i, text: i };
                            }),
                            (t.prototype.insertTag = function (e, t, n) {
                                t.unshift(n);
                            }),
                            (t.prototype._removeOldTags = function () {
                                this._lastTag,
                                    this.$element.find("option[data-select2-tag]").each(function () {
                                        this.selected || e(this).remove();
                                    });
                            }),
                            t
                        );
                    }),
                    t.define("select2/data/tokenizer", ["jquery"], function (e) {
                        function t(e, t, n) {
                            var i = n.get("tokenizer");
                            void 0 !== i && (this.tokenizer = i), e.call(this, t, n);
                        }
                        return (
                            (t.prototype.bind = function (e, t, n) {
                                e.call(this, t, n), (this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field"));
                            }),
                            (t.prototype.query = function (t, n, i) {
                                function o(t) {
                                    var n = s._normalizeItem(t);
                                    if (
                                        !s.$element.find("option").filter(function () {
                                            return e(this).val() === n.id;
                                        }).length
                                    ) {
                                        var i = s.option(n);
                                        i.attr("data-select2-tag", !0), s._removeOldTags(), s.addOptions([i]);
                                    }
                                    r(n);
                                }
                                function r(e) {
                                    s.trigger("select", { data: e });
                                }
                                var s = this;
                                n.term = n.term || "";
                                var a = this.tokenizer(n, this.options, o);
                                a.term !== n.term && (this.$search.length && (this.$search.val(a.term), this.$search.focus()), (n.term = a.term)), t.call(this, n, i);
                            }),
                            (t.prototype.tokenizer = function (t, n, i, o) {
                                for (
                                    var r = i.get("tokenSeparators") || [],
                                        s = n.term,
                                        a = 0,
                                        l =
                                            this.createTag ||
                                            function (e) {
                                                return { id: e.term, text: e.term };
                                            };
                                    a < s.length;

                                ) {
                                    var u = s[a];
                                    if (-1 !== e.inArray(u, r)) {
                                        var c = s.substr(0, a),
                                            d = l(e.extend({}, n, { term: c }));
                                        null != d ? (o(d), (s = s.substr(a + 1) || ""), (a = 0)) : a++;
                                    } else a++;
                                }
                                return { term: s };
                            }),
                            t
                        );
                    }),
                    t.define("select2/data/minimumInputLength", [], function () {
                        function e(e, t, n) {
                            (this.minimumInputLength = n.get("minimumInputLength")), e.call(this, t, n);
                        }
                        return (
                            (e.prototype.query = function (e, t, n) {
                                (t.term = t.term || ""),
                                    t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : e.call(this, t, n);
                            }),
                            e
                        );
                    }),
                    t.define("select2/data/maximumInputLength", [], function () {
                        function e(e, t, n) {
                            (this.maximumInputLength = n.get("maximumInputLength")), e.call(this, t, n);
                        }
                        return (
                            (e.prototype.query = function (e, t, n) {
                                (t.term = t.term || ""),
                                    this.maximumInputLength > 0 && t.term.length > this.maximumInputLength
                                        ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } })
                                        : e.call(this, t, n);
                            }),
                            e
                        );
                    }),
                    t.define("select2/data/maximumSelectionLength", [], function () {
                        function e(e, t, n) {
                            (this.maximumSelectionLength = n.get("maximumSelectionLength")), e.call(this, t, n);
                        }
                        return (
                            (e.prototype.query = function (e, t, n) {
                                var i = this;
                                this.current(function (o) {
                                    var r = null != o ? o.length : 0;
                                    i.maximumSelectionLength > 0 && r >= i.maximumSelectionLength ? i.trigger("results:message", { message: "maximumSelected", args: { maximum: i.maximumSelectionLength } }) : e.call(i, t, n);
                                });
                            }),
                            e
                        );
                    }),
                    t.define("select2/dropdown", ["jquery", "./utils"], function (e, t) {
                        function n(e, t) {
                            (this.$element = e), (this.options = t), n.__super__.constructor.call(this);
                        }
                        return (
                            t.Extend(n, t.Observable),
                            (n.prototype.render = function () {
                                var t = e('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                                return t.attr("dir", this.options.get("dir")), (this.$dropdown = t), t;
                            }),
                            (n.prototype.bind = function () {}),
                            (n.prototype.position = function () {}),
                            (n.prototype.destroy = function () {
                                this.$dropdown.remove();
                            }),
                            n
                        );
                    }),
                    t.define("select2/dropdown/search", ["jquery", "../utils"], function (e) {
                        function t() {}
                        return (
                            (t.prototype.render = function (t) {
                                var n = t.call(this),
                                    i = e(
                                        '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>'
                                    );
                                return (this.$searchContainer = i), (this.$search = i.find("input")), n.prepend(i), n;
                            }),
                            (t.prototype.bind = function (t, n, i) {
                                var o = this;
                                t.call(this, n, i),
                                    this.$search.on("keydown", function (e) {
                                        o.trigger("keypress", e), (o._keyUpPrevented = e.isDefaultPrevented());
                                    }),
                                    this.$search.on("input", function () {
                                        e(this).off("keyup");
                                    }),
                                    this.$search.on("keyup input", function (e) {
                                        o.handleSearch(e);
                                    }),
                                    n.on("open", function () {
                                        o.$search.attr("tabindex", 0),
                                            o.$search.focus(),
                                            window.setTimeout(function () {
                                                o.$search.focus();
                                            }, 0);
                                    }),
                                    n.on("close", function () {
                                        o.$search.attr("tabindex", -1), o.$search.val("");
                                    }),
                                    n.on("focus", function () {
                                        n.isOpen() || o.$search.focus();
                                    }),
                                    n.on("results:all", function (e) {
                                        (null != e.query.term && "" !== e.query.term) || (o.showSearch(e) ? o.$searchContainer.removeClass("select2-search--hide") : o.$searchContainer.addClass("select2-search--hide"));
                                    });
                            }),
                            (t.prototype.handleSearch = function () {
                                if (!this._keyUpPrevented) {
                                    var e = this.$search.val();
                                    this.trigger("query", { term: e });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (t.prototype.showSearch = function () {
                                return !0;
                            }),
                            t
                        );
                    }),
                    t.define("select2/dropdown/hidePlaceholder", [], function () {
                        function e(e, t, n, i) {
                            (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))), e.call(this, t, n, i);
                        }
                        return (
                            (e.prototype.append = function (e, t) {
                                (t.results = this.removePlaceholder(t.results)), e.call(this, t);
                            }),
                            (e.prototype.normalizePlaceholder = function (e, t) {
                                return "string" == typeof t && (t = { id: "", text: t }), t;
                            }),
                            (e.prototype.removePlaceholder = function (e, t) {
                                for (var n = t.slice(0), i = t.length - 1; i >= 0; i--) {
                                    var o = t[i];
                                    this.placeholder.id === o.id && n.splice(i, 1);
                                }
                                return n;
                            }),
                            e
                        );
                    }),
                    t.define("select2/dropdown/infiniteScroll", ["jquery"], function (e) {
                        function t(e, t, n, i) {
                            (this.lastParams = {}), e.call(this, t, n, i), (this.$loadingMore = this.createLoadingMore()), (this.loading = !1);
                        }
                        return (
                            (t.prototype.append = function (e, t) {
                                this.$loadingMore.remove(), (this.loading = !1), e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore);
                            }),
                            (t.prototype.bind = function (t, n, i) {
                                var o = this;
                                t.call(this, n, i),
                                    n.on("query", function (e) {
                                        (o.lastParams = e), (o.loading = !0);
                                    }),
                                    n.on("query:append", function (e) {
                                        (o.lastParams = e), (o.loading = !0);
                                    }),
                                    this.$results.on("scroll", function () {
                                        var t = e.contains(document.documentElement, o.$loadingMore[0]);
                                        !o.loading && t && o.$results.offset().top + o.$results.outerHeight(!1) + 50 >= o.$loadingMore.offset().top + o.$loadingMore.outerHeight(!1) && o.loadMore();
                                    });
                            }),
                            (t.prototype.loadMore = function () {
                                this.loading = !0;
                                var t = e.extend({}, { page: 1 }, this.lastParams);
                                t.page++, this.trigger("query:append", t);
                            }),
                            (t.prototype.showLoadingMore = function (e, t) {
                                return t.pagination && t.pagination.more;
                            }),
                            (t.prototype.createLoadingMore = function () {
                                var t = e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                                    n = this.options.get("translations").get("loadingMore");
                                return t.html(n(this.lastParams)), t;
                            }),
                            t
                        );
                    }),
                    t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (e, t) {
                        function n(t, n, i) {
                            (this.$dropdownParent = i.get("dropdownParent") || e(document.body)), t.call(this, n, i);
                        }
                        return (
                            (n.prototype.bind = function (e, t, n) {
                                var i = this,
                                    o = !1;
                                e.call(this, t, n),
                                    t.on("open", function () {
                                        i._showDropdown(),
                                            i._attachPositioningHandler(t),
                                            o ||
                                                ((o = !0),
                                                t.on("results:all", function () {
                                                    i._positionDropdown(), i._resizeDropdown();
                                                }),
                                                t.on("results:append", function () {
                                                    i._positionDropdown(), i._resizeDropdown();
                                                }));
                                    }),
                                    t.on("close", function () {
                                        i._hideDropdown(), i._detachPositioningHandler(t);
                                    }),
                                    this.$dropdownContainer.on("mousedown", function (e) {
                                        e.stopPropagation();
                                    });
                            }),
                            (n.prototype.destroy = function (e) {
                                e.call(this), this.$dropdownContainer.remove();
                            }),
                            (n.prototype.position = function (e, t, n) {
                                t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({ position: "absolute", top: -999999 }), (this.$container = n);
                            }),
                            (n.prototype.render = function (t) {
                                var n = e("<span></span>"),
                                    i = t.call(this);
                                return n.append(i), (this.$dropdownContainer = n), n;
                            }),
                            (n.prototype._hideDropdown = function () {
                                this.$dropdownContainer.detach();
                            }),
                            (n.prototype._attachPositioningHandler = function (n, i) {
                                var o = this,
                                    r = "scroll.select2." + i.id,
                                    s = "resize.select2." + i.id,
                                    a = "orientationchange.select2." + i.id,
                                    l = this.$container.parents().filter(t.hasScroll);
                                l.each(function () {
                                    e(this).data("select2-scroll-position", { x: e(this).scrollLeft(), y: e(this).scrollTop() });
                                }),
                                    l.on(r, function () {
                                        var t = e(this).data("select2-scroll-position");
                                        e(this).scrollTop(t.y);
                                    }),
                                    e(window).on(r + " " + s + " " + a, function () {
                                        o._positionDropdown(), o._resizeDropdown();
                                    });
                            }),
                            (n.prototype._detachPositioningHandler = function (n, i) {
                                var o = "scroll.select2." + i.id,
                                    r = "resize.select2." + i.id,
                                    s = "orientationchange.select2." + i.id;
                                this.$container.parents().filter(t.hasScroll).off(o), e(window).off(o + " " + r + " " + s);
                            }),
                            (n.prototype._positionDropdown = function () {
                                var t = e(window),
                                    n = this.$dropdown.hasClass("select2-dropdown--above"),
                                    i = this.$dropdown.hasClass("select2-dropdown--below"),
                                    o = null,
                                    r = this.$container.offset();
                                r.bottom = r.top + this.$container.outerHeight(!1);
                                var s = { height: this.$container.outerHeight(!1) };
                                (s.top = r.top), (s.bottom = r.top + s.height);
                                var a = { height: this.$dropdown.outerHeight(!1) },
                                    l = { top: t.scrollTop(), bottom: t.scrollTop() + t.height() },
                                    u = l.top < r.top - a.height,
                                    c = l.bottom > r.bottom + a.height,
                                    d = { left: r.left, top: s.bottom },
                                    p = this.$dropdownParent;
                                "static" === p.css("position") && (p = p.offsetParent());
                                var h = p.offset();
                                (d.top -= h.top),
                                    (d.left -= h.left),
                                    n || i || (o = "below"),
                                    c || !u || n ? !u && c && n && (o = "below") : (o = "above"),
                                    ("above" == o || (n && "below" !== o)) && (d.top = s.top - h.top - a.height),
                                    null != o &&
                                        (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + o),
                                        this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + o)),
                                    this.$dropdownContainer.css(d);
                            }),
                            (n.prototype._resizeDropdown = function () {
                                var e = { width: this.$container.outerWidth(!1) + "px" };
                                this.options.get("dropdownAutoWidth") && ((e.minWidth = e.width), (e.position = "relative"), (e.width = "auto")), this.$dropdown.css(e);
                            }),
                            (n.prototype._showDropdown = function () {
                                this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
                            }),
                            n
                        );
                    }),
                    t.define("select2/dropdown/minimumResultsForSearch", [], function () {
                        function e(t) {
                            for (var n = 0, i = 0; i < t.length; i++) {
                                var o = t[i];
                                o.children ? (n += e(o.children)) : n++;
                            }
                            return n;
                        }
                        function t(e, t, n, i) {
                            (this.minimumResultsForSearch = n.get("minimumResultsForSearch")), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, i);
                        }
                        return (
                            (t.prototype.showSearch = function (t, n) {
                                return !(e(n.data.results) < this.minimumResultsForSearch) && t.call(this, n);
                            }),
                            t
                        );
                    }),
                    t.define("select2/dropdown/selectOnClose", [], function () {
                        function e() {}
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this;
                                e.call(this, t, n),
                                    t.on("close", function (e) {
                                        i._handleSelectOnClose(e);
                                    });
                            }),
                            (e.prototype._handleSelectOnClose = function (e, t) {
                                if (t && null != t.originalSelect2Event) {
                                    var n = t.originalSelect2Event;
                                    if ("select" === n._type || "unselect" === n._type) return;
                                }
                                var i = this.getHighlightedResults();
                                if (!(i.length < 1)) {
                                    var o = i.data("data");
                                    (null != o.element && o.element.selected) || (null == o.element && o.selected) || this.trigger("select", { data: o });
                                }
                            }),
                            e
                        );
                    }),
                    t.define("select2/dropdown/closeOnSelect", [], function () {
                        function e() {}
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this;
                                e.call(this, t, n),
                                    t.on("select", function (e) {
                                        i._selectTriggered(e);
                                    }),
                                    t.on("unselect", function (e) {
                                        i._selectTriggered(e);
                                    });
                            }),
                            (e.prototype._selectTriggered = function (e, t) {
                                var n = t.originalEvent;
                                (n && n.ctrlKey) || this.trigger("close", { originalEvent: n, originalSelect2Event: t });
                            }),
                            e
                        );
                    }),
                    t.define("select2/i18n/en", [], function () {
                        return {
                            errorLoading: function () {
                                return "The results could not be loaded.";
                            },
                            inputTooLong: function (e) {
                                var t = e.input.length - e.maximum,
                                    n = "Please delete " + t + " character";
                                return 1 != t && (n += "s"), n;
                            },
                            inputTooShort: function (e) {
                                return "Please enter " + (e.minimum - e.input.length) + " or more characters";
                            },
                            loadingMore: function () {
                                return "Loading more results\u2026";
                            },
                            maximumSelected: function (e) {
                                var t = "You can only select " + e.maximum + " item";
                                return 1 != e.maximum && (t += "s"), t;
                            },
                            noResults: function () {
                                return "No results found";
                            },
                            searching: function () {
                                return "Searching\u2026";
                            },
                        };
                    }),
                    t.define(
                        "select2/defaults",
                        [
                            "jquery",
                            "require",
                            "./results",
                            "./selection/single",
                            "./selection/multiple",
                            "./selection/placeholder",
                            "./selection/allowClear",
                            "./selection/search",
                            "./selection/eventRelay",
                            "./utils",
                            "./translation",
                            "./diacritics",
                            "./data/select",
                            "./data/array",
                            "./data/ajax",
                            "./data/tags",
                            "./data/tokenizer",
                            "./data/minimumInputLength",
                            "./data/maximumInputLength",
                            "./data/maximumSelectionLength",
                            "./dropdown",
                            "./dropdown/search",
                            "./dropdown/hidePlaceholder",
                            "./dropdown/infiniteScroll",
                            "./dropdown/attachBody",
                            "./dropdown/minimumResultsForSearch",
                            "./dropdown/selectOnClose",
                            "./dropdown/closeOnSelect",
                            "./i18n/en",
                        ],
                        function (e, t, n, i, o, r, s, a, l, u, c, d, p, h, f, m, g, v, y, b, w, x, $, _, C, T, k, S, E) {
                            function A() {
                                this.reset();
                            }
                            return (
                                (A.prototype.apply = function (d) {
                                    if (null == (d = e.extend(!0, {}, this.defaults, d)).dataAdapter) {
                                        if (
                                            (null != d.ajax ? (d.dataAdapter = f) : null != d.data ? (d.dataAdapter = h) : (d.dataAdapter = p),
                                            d.minimumInputLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, v)),
                                            d.maximumInputLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, y)),
                                            d.maximumSelectionLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, b)),
                                            d.tags && (d.dataAdapter = u.Decorate(d.dataAdapter, m)),
                                            (null == d.tokenSeparators && null == d.tokenizer) || (d.dataAdapter = u.Decorate(d.dataAdapter, g)),
                                            null != d.query)
                                        ) {
                                            var E = t(d.amdBase + "compat/query");
                                            d.dataAdapter = u.Decorate(d.dataAdapter, E);
                                        }
                                        if (null != d.initSelection) {
                                            var A = t(d.amdBase + "compat/initSelection");
                                            d.dataAdapter = u.Decorate(d.dataAdapter, A);
                                        }
                                    }
                                    if (
                                        (null == d.resultsAdapter &&
                                            ((d.resultsAdapter = n),
                                            null != d.ajax && (d.resultsAdapter = u.Decorate(d.resultsAdapter, _)),
                                            null != d.placeholder && (d.resultsAdapter = u.Decorate(d.resultsAdapter, $)),
                                            d.selectOnClose && (d.resultsAdapter = u.Decorate(d.resultsAdapter, k))),
                                        null == d.dropdownAdapter)
                                    ) {
                                        if (d.multiple) d.dropdownAdapter = w;
                                        else {
                                            var j = u.Decorate(w, x);
                                            d.dropdownAdapter = j;
                                        }
                                        if (
                                            (0 !== d.minimumResultsForSearch && (d.dropdownAdapter = u.Decorate(d.dropdownAdapter, T)),
                                            d.closeOnSelect && (d.dropdownAdapter = u.Decorate(d.dropdownAdapter, S)),
                                            null != d.dropdownCssClass || null != d.dropdownCss || null != d.adaptDropdownCssClass)
                                        ) {
                                            var N = t(d.amdBase + "compat/dropdownCss");
                                            d.dropdownAdapter = u.Decorate(d.dropdownAdapter, N);
                                        }
                                        d.dropdownAdapter = u.Decorate(d.dropdownAdapter, C);
                                    }
                                    if (null == d.selectionAdapter) {
                                        if (
                                            (d.multiple ? (d.selectionAdapter = o) : (d.selectionAdapter = i),
                                            null != d.placeholder && (d.selectionAdapter = u.Decorate(d.selectionAdapter, r)),
                                            d.allowClear && (d.selectionAdapter = u.Decorate(d.selectionAdapter, s)),
                                            d.multiple && (d.selectionAdapter = u.Decorate(d.selectionAdapter, a)),
                                            null != d.containerCssClass || null != d.containerCss || null != d.adaptContainerCssClass)
                                        ) {
                                            var D = t(d.amdBase + "compat/containerCss");
                                            d.selectionAdapter = u.Decorate(d.selectionAdapter, D);
                                        }
                                        d.selectionAdapter = u.Decorate(d.selectionAdapter, l);
                                    }
                                    if ("string" == typeof d.language)
                                        if (d.language.indexOf("-") > 0) {
                                            var P = d.language.split("-")[0];
                                            d.language = [d.language, P];
                                        } else d.language = [d.language];
                                    if (e.isArray(d.language)) {
                                        var O = new c();
                                        d.language.push("en");
                                        for (var L = d.language, I = 0; I < L.length; I++) {
                                            var q = L[I],
                                                H = {};
                                            try {
                                                H = c.loadPath(q);
                                            } catch (e) {
                                                try {
                                                    (q = this.defaults.amdLanguageBase + q), (H = c.loadPath(q));
                                                } catch (e) {
                                                    d.debug && window.console && console.warn && console.warn('Select2: The language file for "' + q + '" could not be automatically loaded. A fallback will be used instead.');
                                                    continue;
                                                }
                                            }
                                            O.extend(H);
                                        }
                                        d.translations = O;
                                    } else {
                                        var M = c.loadPath(this.defaults.amdLanguageBase + "en"),
                                            R = new c(d.language);
                                        R.extend(M), (d.translations = R);
                                    }
                                    return d;
                                }),
                                (A.prototype.reset = function () {
                                    function t(e) {
                                        function t(e) {
                                            return d[e] || e;
                                        }
                                        return e.replace(/[^\u0000-\u007E]/g, t);
                                    }
                                    function n(i, o) {
                                        if ("" === e.trim(i.term)) return o;
                                        if (o.children && o.children.length > 0) {
                                            for (var r = e.extend(!0, {}, o), s = o.children.length - 1; s >= 0; s--) null == n(i, o.children[s]) && r.children.splice(s, 1);
                                            return r.children.length > 0 ? r : n(i, r);
                                        }
                                        var a = t(o.text).toUpperCase(),
                                            l = t(i.term).toUpperCase();
                                        return a.indexOf(l) > -1 ? o : null;
                                    }
                                    this.defaults = {
                                        amdBase: "./",
                                        amdLanguageBase: "./i18n/",
                                        closeOnSelect: !0,
                                        debug: !1,
                                        dropdownAutoWidth: !1,
                                        escapeMarkup: u.escapeMarkup,
                                        language: E,
                                        matcher: n,
                                        minimumInputLength: 0,
                                        maximumInputLength: 0,
                                        maximumSelectionLength: 0,
                                        minimumResultsForSearch: 0,
                                        selectOnClose: !1,
                                        sorter: function (e) {
                                            return e;
                                        },
                                        templateResult: function (e) {
                                            return e.text;
                                        },
                                        templateSelection: function (e) {
                                            return e.text;
                                        },
                                        theme: "default",
                                        width: "resolve",
                                    };
                                }),
                                (A.prototype.set = function (t, n) {
                                    var i = {};
                                    i[e.camelCase(t)] = n;
                                    var o = u._convertData(i);
                                    e.extend(this.defaults, o);
                                }),
                                new A()
                            );
                        }
                    ),
                    t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (e, t, n, i) {
                        function o(t, o) {
                            if (((this.options = t), null != o && this.fromElement(o), (this.options = n.apply(this.options)), o && o.is("input"))) {
                                var r = e(this.get("amdBase") + "compat/inputData");
                                this.options.dataAdapter = i.Decorate(this.options.dataAdapter, r);
                            }
                        }
                        return (
                            (o.prototype.fromElement = function (e) {
                                var n = ["select2"];
                                null == this.options.multiple && (this.options.multiple = e.prop("multiple")),
                                    null == this.options.disabled && (this.options.disabled = e.prop("disabled")),
                                    null == this.options.language && (e.prop("lang") ? (this.options.language = e.prop("lang").toLowerCase()) : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))),
                                    null == this.options.dir && (e.prop("dir") ? (this.options.dir = e.prop("dir")) : e.closest("[dir]").prop("dir") ? (this.options.dir = e.closest("[dir]").prop("dir")) : (this.options.dir = "ltr")),
                                    e.prop("disabled", this.options.disabled),
                                    e.prop("multiple", this.options.multiple),
                                    e.data("select2Tags") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                                        e.data("data", e.data("select2Tags")),
                                        e.data("tags", !0)),
                                    e.data("ajaxUrl") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                                        e.attr("ajax--url", e.data("ajaxUrl")),
                                        e.data("ajax--url", e.data("ajaxUrl")));
                                var o = {};
                                o = t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset ? t.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                                var r = t.extend(!0, {}, o);
                                for (var s in (r = i._convertData(r))) t.inArray(s, n) > -1 || (t.isPlainObject(this.options[s]) ? t.extend(this.options[s], r[s]) : (this.options[s] = r[s]));
                                return this;
                            }),
                            (o.prototype.get = function (e) {
                                return this.options[e];
                            }),
                            (o.prototype.set = function (e, t) {
                                this.options[e] = t;
                            }),
                            o
                        );
                    }),
                    t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (e, t, n, i) {
                        var o = function (e, n) {
                            null != e.data("select2") && e.data("select2").destroy(), (this.$element = e), (this.id = this._generateId(e)), (n = n || {}), (this.options = new t(n, e)), o.__super__.constructor.call(this);
                            var i = e.attr("tabindex") || 0;
                            e.data("old-tabindex", i), e.attr("tabindex", "-1");
                            var r = this.options.get("dataAdapter");
                            this.dataAdapter = new r(e, this.options);
                            var s = this.render();
                            this._placeContainer(s);
                            var a = this.options.get("selectionAdapter");
                            (this.selection = new a(e, this.options)), (this.$selection = this.selection.render()), this.selection.position(this.$selection, s);
                            var l = this.options.get("dropdownAdapter");
                            (this.dropdown = new l(e, this.options)), (this.$dropdown = this.dropdown.render()), this.dropdown.position(this.$dropdown, s);
                            var u = this.options.get("resultsAdapter");
                            (this.results = new u(e, this.options, this.dataAdapter)), (this.$results = this.results.render()), this.results.position(this.$results, this.$dropdown);
                            var c = this;
                            this._bindAdapters(),
                                this._registerDomEvents(),
                                this._registerDataEvents(),
                                this._registerSelectionEvents(),
                                this._registerDropdownEvents(),
                                this._registerResultsEvents(),
                                this._registerEvents(),
                                this.dataAdapter.current(function (e) {
                                    c.trigger("selection:update", { data: e });
                                }),
                                e.addClass("select2-hidden-accessible"),
                                e.attr("aria-hidden", "true"),
                                this._syncAttributes(),
                                e.data("select2", this);
                        };
                        return (
                            n.Extend(o, n.Observable),
                            (o.prototype._generateId = function (e) {
                                return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + n.generateChars(2) : n.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "");
                            }),
                            (o.prototype._placeContainer = function (e) {
                                e.insertAfter(this.$element);
                                var t = this._resolveWidth(this.$element, this.options.get("width"));
                                null != t && e.css("width", t);
                            }),
                            (o.prototype._resolveWidth = function (e, t) {
                                var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                                if ("resolve" == t) {
                                    var i = this._resolveWidth(e, "style");
                                    return null != i ? i : this._resolveWidth(e, "element");
                                }
                                if ("element" == t) {
                                    var o = e.outerWidth(!1);
                                    return o <= 0 ? "auto" : o + "px";
                                }
                                if ("style" == t) {
                                    var r = e.attr("style");
                                    if ("string" != typeof r) return null;
                                    for (var s = r.split(";"), a = 0, l = s.length; a < l; a += 1) {
                                        var u = s[a].replace(/\s/g, "").match(n);
                                        if (null !== u && u.length >= 1) return u[1];
                                    }
                                    return null;
                                }
                                return t;
                            }),
                            (o.prototype._bindAdapters = function () {
                                this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
                            }),
                            (o.prototype._registerDomEvents = function () {
                                var t = this;
                                this.$element.on("change.select2", function () {
                                    t.dataAdapter.current(function (e) {
                                        t.trigger("selection:update", { data: e });
                                    });
                                }),
                                    this.$element.on("focus.select2", function (e) {
                                        t.trigger("focus", e);
                                    }),
                                    (this._syncA = n.bind(this._syncAttributes, this)),
                                    (this._syncS = n.bind(this._syncSubtree, this)),
                                    this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                                var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                                null != i
                                    ? ((this._observer = new i(function (n) {
                                          e.each(n, t._syncA), e.each(n, t._syncS);
                                      })),
                                      this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 }))
                                    : this.$element[0].addEventListener &&
                                      (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1),
                                      this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1),
                                      this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1));
                            }),
                            (o.prototype._registerDataEvents = function () {
                                var e = this;
                                this.dataAdapter.on("*", function (t, n) {
                                    e.trigger(t, n);
                                });
                            }),
                            (o.prototype._registerSelectionEvents = function () {
                                var t = this,
                                    n = ["toggle", "focus"];
                                this.selection.on("toggle", function () {
                                    t.toggleDropdown();
                                }),
                                    this.selection.on("focus", function (e) {
                                        t.focus(e);
                                    }),
                                    this.selection.on("*", function (i, o) {
                                        -1 === e.inArray(i, n) && t.trigger(i, o);
                                    });
                            }),
                            (o.prototype._registerDropdownEvents = function () {
                                var e = this;
                                this.dropdown.on("*", function (t, n) {
                                    e.trigger(t, n);
                                });
                            }),
                            (o.prototype._registerResultsEvents = function () {
                                var e = this;
                                this.results.on("*", function (t, n) {
                                    e.trigger(t, n);
                                });
                            }),
                            (o.prototype._registerEvents = function () {
                                var e = this;
                                this.on("open", function () {
                                    e.$container.addClass("select2-container--open");
                                }),
                                    this.on("close", function () {
                                        e.$container.removeClass("select2-container--open");
                                    }),
                                    this.on("enable", function () {
                                        e.$container.removeClass("select2-container--disabled");
                                    }),
                                    this.on("disable", function () {
                                        e.$container.addClass("select2-container--disabled");
                                    }),
                                    this.on("blur", function () {
                                        e.$container.removeClass("select2-container--focus");
                                    }),
                                    this.on("query", function (t) {
                                        e.isOpen() || e.trigger("open", {}),
                                            this.dataAdapter.query(t, function (n) {
                                                e.trigger("results:all", { data: n, query: t });
                                            });
                                    }),
                                    this.on("query:append", function (t) {
                                        this.dataAdapter.query(t, function (n) {
                                            e.trigger("results:append", { data: n, query: t });
                                        });
                                    }),
                                    this.on("keypress", function (t) {
                                        var n = t.which;
                                        e.isOpen()
                                            ? n === i.ESC || n === i.TAB || (n === i.UP && t.altKey)
                                                ? (e.close(), t.preventDefault())
                                                : n === i.ENTER
                                                ? (e.trigger("results:select", {}), t.preventDefault())
                                                : n === i.SPACE && t.ctrlKey
                                                ? (e.trigger("results:toggle", {}), t.preventDefault())
                                                : n === i.UP
                                                ? (e.trigger("results:previous", {}), t.preventDefault())
                                                : n === i.DOWN && (e.trigger("results:next", {}), t.preventDefault())
                                            : (n === i.ENTER || n === i.SPACE || (n === i.DOWN && t.altKey)) && (e.open(), t.preventDefault());
                                    });
                            }),
                            (o.prototype._syncAttributes = function () {
                                this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
                            }),
                            (o.prototype._syncSubtree = function (e, t) {
                                var n = !1,
                                    i = this;
                                if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                                    if (t)
                                        if (t.addedNodes && t.addedNodes.length > 0)
                                            for (var o = 0; o < t.addedNodes.length; o++) {
                                                t.addedNodes[o].selected && (n = !0);
                                            }
                                        else t.removedNodes && t.removedNodes.length > 0 && (n = !0);
                                    else n = !0;
                                    n &&
                                        this.dataAdapter.current(function (e) {
                                            i.trigger("selection:update", { data: e });
                                        });
                                }
                            }),
                            (o.prototype.trigger = function (e, t) {
                                var n = o.__super__.trigger,
                                    i = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                                if ((void 0 === t && (t = {}), e in i)) {
                                    var r = i[e],
                                        s = { prevented: !1, name: e, args: t };
                                    if ((n.call(this, r, s), s.prevented)) return void (t.prevented = !0);
                                }
                                n.call(this, e, t);
                            }),
                            (o.prototype.toggleDropdown = function () {
                                this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
                            }),
                            (o.prototype.open = function () {
                                this.isOpen() || this.trigger("query", {});
                            }),
                            (o.prototype.close = function () {
                                this.isOpen() && this.trigger("close", {});
                            }),
                            (o.prototype.isOpen = function () {
                                return this.$container.hasClass("select2-container--open");
                            }),
                            (o.prototype.hasFocus = function () {
                                return this.$container.hasClass("select2-container--focus");
                            }),
                            (o.prototype.focus = function () {
                                this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
                            }),
                            (o.prototype.enable = function (e) {
                                this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),
                                    (null != e && 0 !== e.length) || (e = [!0]);
                                var t = !e[0];
                                this.$element.prop("disabled", t);
                            }),
                            (o.prototype.data = function () {
                                this.options.get("debug") &&
                                    arguments.length > 0 &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                                var e = [];
                                return (
                                    this.dataAdapter.current(function (t) {
                                        e = t;
                                    }),
                                    e
                                );
                            }),
                            (o.prototype.val = function (t) {
                                if (
                                    (this.options.get("debug") &&
                                        window.console &&
                                        console.warn &&
                                        console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                                    null == t || 0 === t.length)
                                )
                                    return this.$element.val();
                                var n = t[0];
                                e.isArray(n) &&
                                    (n = e.map(n, function (e) {
                                        return e.toString();
                                    })),
                                    this.$element.val(n).trigger("change");
                            }),
                            (o.prototype.destroy = function () {
                                this.$container.remove(),
                                    this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA),
                                    null != this._observer
                                        ? (this._observer.disconnect(), (this._observer = null))
                                        : this.$element[0].removeEventListener &&
                                          (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1),
                                          this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1),
                                          this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)),
                                    (this._syncA = null),
                                    (this._syncS = null),
                                    this.$element.off(".select2"),
                                    this.$element.attr("tabindex", this.$element.data("old-tabindex")),
                                    this.$element.removeClass("select2-hidden-accessible"),
                                    this.$element.attr("aria-hidden", "false"),
                                    this.$element.removeData("select2"),
                                    this.dataAdapter.destroy(),
                                    this.selection.destroy(),
                                    this.dropdown.destroy(),
                                    this.results.destroy(),
                                    (this.dataAdapter = null),
                                    (this.selection = null),
                                    (this.dropdown = null),
                                    (this.results = null);
                            }),
                            (o.prototype.render = function () {
                                var t = e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                                return t.attr("dir", this.options.get("dir")), (this.$container = t), this.$container.addClass("select2-container--" + this.options.get("theme")), t.data("element", this.$element), t;
                            }),
                            o
                        );
                    }),
                    t.define("jquery-mousewheel", ["jquery"], function (e) {
                        return e;
                    }),
                    t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (e, t, n, i) {
                        if (null == e.fn.select2) {
                            var o = ["open", "close", "destroy"];
                            e.fn.select2 = function (t) {
                                if ("object" == typeof (t = t || {}))
                                    return (
                                        this.each(function () {
                                            var i = e.extend(!0, {}, t);
                                            new n(e(this), i);
                                        }),
                                        this
                                    );
                                if ("string" == typeof t) {
                                    var i,
                                        r = Array.prototype.slice.call(arguments, 1);
                                    return (
                                        this.each(function () {
                                            var n = e(this).data("select2");
                                            null == n && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), (i = n[t].apply(n, r));
                                        }),
                                        e.inArray(t, o) > -1 ? this : i
                                    );
                                }
                                throw new Error("Invalid arguments for Select2: " + t);
                            };
                        }
                        return null == e.fn.select2.defaults && (e.fn.select2.defaults = i), n;
                    }),
                    { define: t.define, require: t.require }
                );
            })(),
            n = t.require("jquery.select2");
        return (e.fn.select2.amd = t), n;
    }),
    $(function () {
        function e(e) {
            (value = $(".step.service-questions:visible [name^='questions']").val()),
                "" == value
                    ? ($(e).parent().removeClass("has-error").find(".validation-msg").remove(), $(e).after('<div class="validation-msg">This field is required</div>').parent().addClass("has-error"))
                    : $(e).parent().removeClass("has-error").find(".validation-msg").remove();
        }
        $(".select2")[0] && $(".select2").select2({ theme: "bootstrap", width: "100%", placeholder: "Click here for options" }),
            $(document).on("ajax:success", "#zipcode_form, #open-modal", function () {
                $("#hero_form").fadeIn(300), updateStep(), initStepsHeight(), $("body").addClass("no-scroll");
            }),
            $(".radio-wrapper input").click(function () {
                $(".radio-wrapper input:not(:checked)").parent().removeClass("answer-selected"), $(".radio-wrapper input:checked").parent().addClass("answer-selected");
            }),
            $(".radio-wrapper input:checked").parent().addClass("answer-selected"),
            $("#close-hero").on("click", function (e) {
                e.preventDefault(), location.reload();
            }),
            $(".step.service-questions .step-button .btn").on("click", function () {
                if ("" == $(this).closest(".service-questions").find("[name^='questions']").val()) return e($("#questions_company_name")), !1;
            }),
            $("#questions_company_name").on("blur", function () {
                e(this);
            }),
            $("#questions_company_name").on("keypress", function (e) {
                13 == e.which && $(this).closest(".answers").find(".btn-services").trigger("click");
            }),
            $(document).on("ajax:success", 'form:not("#final_validation form")', function (e, t) {
                goNext(e, t), submit_service_questions(t);
                var n = $(".steps").find(".step:visible").attr("data-step"),
                    i = $(".steps").find(".step").last().attr("data-step");
                if (
                    ("zipcode" == t.name &&
                        ($("#zipcode").parent().removeClass("has-error").find(".validation-msg").remove(),
                        $("#pii_zipcode").val($("#zipcode").val()),
                        null != t.pii.city ? (generateLocationFields(t.pii), $("#visitor_city").text(t.pii.city)) : $(".new-location").show(),
                        null != t.pii.state_code && selectState(t.pii)),
                    n == i)
                ) {
                    var o = 100;
                    $(".prog-bar")
                        .attr("data-percentage", o)
                        .outerWidth(o + "%"),
                        $(".prog-bar")
                            .children(".percentage")
                            .text(o + "%"),
                        setTimeout(() => {
                            $(this).find("button:submit").text("Submitted");
                        }),
                        setTimeout(() => {
                            window.location.href = "/second-service";
                        }, 1500);
                }
            }),
            $('.service input[type="checkbox"]').on("change", function () {
                var e = $(".second-service").find("input:checkbox:checked").length,
                    t = $(this),
                    n = t.closest(".service").find(".second-service-questions");
                t.is(":checked") && e <= 3 ? (t.prop("checked", !0), n.find(".form-control").prop("disabled", !1), n.slideDown()) : (t.prop("checked", !1), n.find(".form-control").prop("disabled", !0), n.slideUp()),
                    e > 3 && $("#maxServices").modal("show");
            }),
            $('[action="/submit/pii"]').on("submit", function () {
                $(this).find('[name="pii[first_name]"]').length &&
                    ("" != $('[name="pii[first_name]"]').val()
                        ? $("#phone_mail").html($('[name="pii[first_name]"]').val() + ", your quote is ready.<br> Where can we send the quote to? ")
                        : $("#phone_mail").html("Your quote is ready.<br> Where can we send the quote to? "));
            }),
            $("#second_service_questions").on("submit", function (e) {
                e.preventDefault();
                var t = $(this).find("button:submit"),
                    n = t.html(),
                    i = e;
                $.ajax({
                    url: "/submit/services",
                    async: !1,
                    type: "POST",
                    dataType: "json",
                    data: $(this).serialize(),
                    success: function () {
                        setTimeout(() => {
                            t.removeAttr("disabled").html(n),
                                t.attr("disabled", "disabled").text("Submitted"),
                                setTimeout(() => {
                                    window.location.href = "/thank-you";
                                }, 1500);
                        }, 500);
                    },
                    error: function (e) {
                        setTimeout(function () {
                            t.removeAttr("disabled").html(n);
                        }, 750),
                            i.preventDefault(),
                            "redirect" == e.responseJSON.error ? (window.location.href = "/") : $("#seconde_service_validation").fadeIn().html('<i class="fa fa-arrow-up"></i> Select at least one project!');
                    },
                });
            });
    });