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

        // Move forward on input
        input.addEventListener("input", (e) => {
            const val = e.target.value.replace(/\D/g, "");
            e.target.value = val;

            if (val && idx < inputs.length - 1) {
                focusIndex(idx + 1);
            }
        });

        // Backspace logic
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
                e.preventDefault();

                // Case 1: current input has a value → clear it
                if (input.value !== "") {
                    input.value = "";
                    return;
                }

                // Case 2: current is empty → clear previous + focus previous
                if (idx > 0) {
                    inputs[idx - 1].value = "";   // THIS LINE FIXES THE FAILING TEST CASE
                    focusIndex(idx - 1);
                }
            }

            // Allow only numbers
            if (e.key.length === 1 && !/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Paste OTP
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
;
