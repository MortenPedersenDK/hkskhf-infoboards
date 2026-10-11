const feedbackScript = document.currentScript;
const individnr = feedbackScript
    ? new URL(feedbackScript.src, window.location.href).searchParams.get("individnr")
    : null;
const lang = feedbackScript
    ? new URL(feedbackScript.src, window.location.href).searchParams.get("lang")
    : null;


function submitFeedback(stars) {
    const fld_individnr = "entry.521155110";
    const fld_stars = "entry.1951285073";
    const fld_lang = "entry.537513158"

    const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeFEc_dC47pKr7AVonrI24QWq2PeaHaZaAarcdVp5jcSRRm_g/formResponse';

    if (individnr === undefined || individnr === null) {
        return;
    }

    const formData = new FormData();
    formData.append(fld_individnr, individnr);
    formData.append(fld_stars, stars);
    formData.append(fld_lang, lang);
    (async () => {
        try {
            await fetch(formURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            console.log('Form submitted with stars:', stars);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
        }
    })();
}

(function renderFeedbackForm(script) {
    if (!script || !script.parentNode) {
        return;
    }

    var form = document.createElement("div");
    form.setAttribute("role", "group");
    form.style.display = "inline-flex";
    form.style.gap = "0.25rem";

    var buttons = [];
    for (var stars = 1; stars <= 5; stars += 1) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = "\u2605";
        button.style.border = "0";
        button.style.background = "none";
        button.style.color = "#8a8a8a";
        button.style.cursor = "pointer";
        button.style.fontSize = "2rem";
        button.style.lineHeight = "1";
        button.style.padding = "0px";
        button.style.paddingLeft = "25px";

        (function (selectedStars) {
            button.addEventListener("click", function () {
                buttons.forEach(function (starButton, index) {
                    starButton.style.color = index < selectedStars ? "#f5c542" : "#8a8a8a";
                    starButton.disabled = true;
                });
                submitFeedback(selectedStars);
            });
        }(stars));

        buttons.push(button);
        form.appendChild(button);
    }

    script.parentNode.insertBefore(form, script);
}(feedbackScript));
