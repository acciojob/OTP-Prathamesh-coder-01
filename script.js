const codes = document.querySelectorAll(".code");

codes[0].focus();

codes.forEach((code, idx) => {

    code.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // keep only digit
        e.target.value = value;

        // If user pastes multiple digits
        if (value.length > 1) {
            const digits = value.split("");
            let pos = idx;

            digits.forEach((d) => {
                if (pos < codes.length) {
                    codes[pos].value = d;
                    pos++;
                }
            });

            if (pos < codes.length) codes[pos].focus();
            else codes[codes.length - 1].blur();

            return;
        }

        // Move to next box if 1 digit
        if (value && idx < codes.length - 1) {
            codes[idx + 1].focus();
        }
    });

    code.addEventListener("keydown", (e) => {

        // Only digits allowed
        if (e.key.length === 1 && !/^\d$/.test(e.key)) {
            e.preventDefault();
            return;
        }

        // Backspace behavior
        if (e.key === "Backspace") {
            e.preventDefault();

            if (code.value !== "") {
                code.value = "";
                return;
            }

            if (idx > 0) {
                codes[idx - 1].value = "";
                codes[idx - 1].focus();
            }
        }
    });

    // Handle paste event properly
    code.addEventListener("paste", (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\D/g, "");
        let pos = idx;

        for (const digit of text) {
            if (pos >= codes.length) break;
            codes[pos].value = digit;
            pos++;
        }

        if (pos < codes.length) codes[pos].focus();
        else codes[codes.length - 1].blur();
    });

});
