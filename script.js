//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const inputs = Array.from(document.querySelectorAll(".code"));

    if (inputs.length === 0) return;

    inputs[0].focus();

    function focusIndex(i) {
        if (i >= 0 && i < inputs.length) {
            inputs[i].focus();
            inputs[i].select?.();
        }
    }

    inputs.forEach((input, idx) => {

        // Typing
        input.addEventListener("input", (e) => {
            const val = e.target.value.replace(/\D/g, "");
            e.target.value = val;

            if (val && idx < inputs.length - 1) {
                focusIndex(idx + 1);
            }
        });

        // Backspace
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
                e.preventDefault();

                // If box has a number → just clear
                if (input.value !== "") {
                    input.value = "";
                    return;
                }

                // If empty → go to previous WITHOUT clearing it
                if (idx > 0) {
                    focusIndex(idx - 1);
                }
            }

            // Prevent letters
            if (e.key.length === 1 && !/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Paste entire OTP
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text").replace(/\D/g, "");
            let pos = idx;

            for (const digit of text) {
                if (pos >= inputs.length) break;
                inputs[pos].value = digit;
                pos++;
            }

            if (pos < inputs.length) focusIndex(pos);
            else inputs[inputs.length - 1].blur();
        });

    });
});
