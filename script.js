const one = document.querySelector('#color-one');
const two = document.querySelector('#color-two');
const angle = document.querySelector('#angle');
const angleValue = document.querySelector('#angle-value');
const preview = document.querySelector('#preview');
const cssOutput = document.querySelector('#css-output');
const copyButton = document.querySelector('#copy-button');
const status = document.querySelector('#status');

function updateGradient() {
  const degrees = `${angle.value}deg`;
  preview.style.background = `linear-gradient(${degrees}, ${one.value}, ${two.value})`;
  angleValue.value = `${angle.value}°`;
  cssOutput.textContent = `background: linear-gradient(${degrees}, ${one.value}, ${two.value});`;
  status.textContent = '';
}

[one, two, angle].forEach((control) => control.addEventListener('input', updateGradient));

document.querySelectorAll('.preset').forEach((button) => {
  button.addEventListener('click', () => {
    one.value = button.dataset.one;
    two.value = button.dataset.two;
    angle.value = button.dataset.angle;
    updateGradient();
  });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    status.textContent = 'نُسخ سطر CSS.';
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = cssOutput.textContent;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.append(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    status.textContent = copied ? 'نُسخ سطر CSS.' : 'تعذّر النسخ؛ حدّد السطر وانسخه يدويًا.';
  }
});

updateGradient();
