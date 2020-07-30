const btn = document.querySelector('#btn');
const contentResult = document.querySelector('.contentResult');

function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function luminance(r, g, b) {
    let a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateRatio() {
    const color1 = document.querySelector('.color1').value;
    const color2 = document.querySelector('.color2').value;

    const color1Rgb = hexToRgb(color1);
    const color2Rgb = hexToRgb(color2);

    const color1Luminance = luminance(color1Rgb.r, color1Rgb.g, color1Rgb.b);
    const color2Luminance = luminance(color2Rgb.r, color2Rgb.g, color2Rgb.b);

    const ratio = color1Luminance > color2Luminance
        ? ((color2Luminance + 0.05)) / (color1Luminance + 0.05)
        : ((color1Luminance + 0.05)) / (color2Luminance + 0.05);

    return ratio;
}

btn.addEventListener('click', () => {
    const ratio = calculateRatio();

    const result = `
        <li>
            <h2>AA</h2> Nivel de texto grande
            ${ratio < 1 / 3
            ? `<p class="green">✔ PASS</p>`
            : `<p class="red">✖ FAIL</p>`}
        </li>
        <li>
            <h2>AA</h2> Nivel de texto pequeño
            ${ratio < 1 / 4.5
            ? `<p class="green">✔ PASS</p>`
            : `<p class="red">✖ FAIL </p>`}
        </li>
        <li>
            <h2>AAA</h2> Nivel de texto grande
            ${ratio < 1 / 4.5
            ? `<p class="green">✔ PASS</p>`
            : `<p class="red">✖ FAIL </p>`}
        </li>
        <li>
            <h2>AAA</h2> Nivel de texto pequeño
            ${ratio < 1 / 7
            ? `<p class="green">✔ PASS</p>`
            : `<p class="red">✖ FAIL </p>`}
        </li>
    `;
    contentResult.innerHTML = result;
});