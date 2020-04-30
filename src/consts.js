export const sources = {
  production: "",
  static: "https://localhost/mt/dist/maketutorial_lib.js",
  webpack: "https://localhost:9090/player/dist/maketutorial_lib.js",
  "webpack:9091": "https://localhost:9091/player/dist/maketutorial_lib.js"
}

export const snippetFiles = {
  "davidsu working snippet":
    "(function() {var walkme = document.createElement('script'); walkme.type = 'text/javascript'; walkme.async = true; walkme.src = 'https://cdn.walkme.com/users/edfaa0e48b4c41d3a567ff38ecd325c8/test/walkme_edfaa0e48b4c41d3a567ff38ecd325c8_https.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })();",
  "one resource only":
    "(function() { var walkme = document.createElement('script'); walkme.type = 'text/javascript'; walkme.async = true; walkme.src = 'https://cdn.walkme.com/users/c264518bbd75488f93a6bab1542e0ea8/walkme_c264518bbd75488f93a6bab1542e0ea8_https.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(walkme, s); window._walkmeConfig = { smartLoad: true }; })();",
  multilingual:
    "(function() {var walkme = document.createElement('script'); walkme.type = 'text/javascript'; walkme.async = true; walkme.src = 'https://cdn.walkme.com/users/45c7993c40a342aea3a52070ad52926b/test/walkme_45c7993c40a342aea3a52070ad52926b_https.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })();",
  "end user IDP":
    "(function() {var walkme = document.createElement('script'); walkme.type = 'text/javascript'; walkme.async = true; walkme.src = 'https://cdn.walkmeqa.com/users/81eaa8a0981f4497959fa62e1b9264f3/test/walkme_81eaa8a0981f4497959fa62e1b9264f3_https.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })();"
}

export const superScriptLoaderCode = `
(function injectSuperscript() {
    var superscript = document.createElement('script');
    superscript.type = 'text/javascript';
    superscript.async = true;
    superscript.src = 'https://cdn.walkme.com/devScripts/superscript.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(superscript, s);
})()
`

export const customLibStorageKey = "walkmeCustomeLibUrl"
export const customPublicPath = "walkmePublicPath"
export const qaFeaturesKey = "walkme_qa_features"
export const localPrelibKey = "wm-prelibjs"
export const localPrelibUrl = "https://localhost/lego/local_prelib.js"
