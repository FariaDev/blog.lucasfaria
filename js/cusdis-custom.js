document.addEventListener("DOMContentLoaded", function () {
    let iframe = document.querySelector("iframe[src*='cusdis.com']");
    if (iframe) {
      iframe.onload = function () {
        let css = `
          body { font-family: Arial, sans-serif !important; }
          input, textarea { border-radius: 5px !important; padding: 8px !important; }
          button { background: #007bff !important; color: white !important; padding: 10px !important; border-radius: 5px !important; }
        `;
        let styleTag = document.createElement("style");
        styleTag.innerHTML = css;
        iframe.contentWindow.document.head.appendChild(styleTag);
      };
    }
  });
