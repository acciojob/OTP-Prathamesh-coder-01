const codes = document.querySelectorAll(".code");

codes[0].focus();

codes.forEach((code, idx) => {
    code.addEventListener("input", (e) => {
        const value = e.target.value;

        // Allow only digits
        if (!/^[0-9]$/.test(value)) {
            e.target.value = "";
            return;
        }

        // Move to next box
        if (idx < codes.length - 1) {
            codes[idx + 1].focus();
        }
    });

    code.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
            e.target.value = "";
            
            // Move to previous box
            if (idx > 0) {
                codes[idx - 1].focus();
            }
        }
    });
});
