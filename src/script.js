let results, drug, dose;

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') document.getElementById("btn").click();
    if (e.key === '/') document.getElementById("dose").select();
});

document.addEventListener('DOMContentLoaded', () => {
    results = document.getElementById('results');
});
function getFormula() {
    results.style = 'color: red';
    drug = document.getElementById('drug').value;
    switch (drug) {
        case 'caffeine': {
            //volume of distribution for caffeine is 0.7 L/kg, so divide mg/kg by 0.7 to get mg/L
            results.innerText = `Dopamine: mg/kg * 15 (max=150%)\nSerotonin: mg/kg * 7 (max=30%)\nGlutamate: mg/kg * 10 (max=100%)\nAdenosine: -((mg/L) / (IC50=13 + mg/L)) (max=-50%)\nEpinephrine: (mg/kg - 1) * 12.5 (max=100%)`;
            break
        }
        case 'nicotine': {
            results.textContent = `Dopamine: mg/kg * 1,000 (max=125%)`;
            break
        }
        case 'dexmethylphenidate': {
            results.innerText = `Dopamine: mg/kg * 200 (max=200%)\nNorepinephrine: mg/kg * 400 (max=400%)`;
            break
        }
        case 'thc': {
            results.textContent = `Dopamine: mg/kg * 50 (max=50%)`;
            break
        }
        case 'levoamphetamine': {
            results.innerText = `Dopamine: mg/kg * 250 (max=3,500%)\nNorepinephrine: (mg/kg - 1) * 200 (max=1,500%)`;
            break
        }
        case 'dextroamphetamine': {
            results.innerText = `Dopamine: mg/kg * 2,000 (max=6,000%)\nNorepinephrine: mg/kg * 500 (max=1,500%)`;
            break
        }
        case 'ethanol': {
            results.textContent = `Dopamine: mg/kg / 10 OR g/kg * 100 (max=100%)`;
            break
        }
        case 'methamphetamine': {
            results.innerText = `Dopamine: mg/kg * 500 (max=8,000%)\nGlutamate: mg/kg * 250 (max=500%)`;
            break
        }
        case 'mdma': {
            results.innerText = `Dopamine: (mg/kg starting after 1.5 mg/kg) * 100 (max=500%)\nSerotonin: mg/kg * 400 (max=3,000%)\nOxytocin: mg/kg * 400 (max=500%)`;
            break
        }
        case 'cocaine': {
            results.textContent = `Dopamine: mg/kg * 30 (max=1,500%)`;
            break
        }
        case 'heroin': {
            results.textContent = `Dopamine: mg/kg * 2,000 (max=200%)`;
            break
        }
        case 'morphine': {
            results.textContent = `Dopamine: mg/kg * 100 (max=100%)`;
            break
        }
        case 'pea': {
            results.textContent = `Dopamine: mg/kg * 14 (max=169%)`;
            break
        }
        case 'atomoxetine': {
            results.innerText = `Norepinephrine: mg/kg * 1,000 (max=250%)\nDopamine: mg/kg * 250 (max=250%)\nSerotonin: mg/mg * 25 (max=75%)`;
            break;
        }
        default: {
            return
        }
    }
}
function calculate() {
    results.style = 'color: #ccc';
    results = document.getElementById("results");
    drug = document.getElementById("drug").value;
    dose = document.getElementById("dose").value;
    let dopamine, serotonin, adenosine, oxytocin, epinephrine, glutamate, norepinephrine;
    if (dose < 0 || dose == null) dose = 0;
    switch (drug) {
        case "caffeine": {
            let IC50 = 13;
            let mg_L = dose / 0.7;
            dopamine = dose * 15; if (dopamine > 150) dopamine = 150;
            serotonin = dose * 7; if (serotonin > 30) serotonin = 30;
            glutamate = dose * 10; if (glutamate > 100) glutamate = 100;
            //adenosine = -(dose * 10); if (adenosine < -50) adenosine = -50; this was the old formula
            adenosine = Math.floor(-((mg_L) / (IC50 + mg_L)) * 1000)/10; if (adenosine < -50) adenosine = -50;
            epinephrine = (dose - 1) * 12.5; if (epinephrine > 100) epinephrine = 100; if (epinephrine < 0) epinephrine = 0;
            results.innerText = `Dopamine: ${dopamine}%\nSerotonin: ${serotonin}%\nGlutamate: ${glutamate}%\nAdenosine: ${adenosine}%\nEpinephrine: ${epinephrine}%`;
            break;
        }
        case "nicotine": {
            dopamine = dose * 1000; if (dopamine > 125) dopamine = 125;
            results.innerText = `Dopamine: ${dopamine}%`;
            break;
        }
        case "dexmethylphenidate": {
            dopamine = dose * 200; if (dopamine > 200) dopamine = 200;
            norepinephrine = dose * 400; if (norepinephrine > 400) norepinephrine = 400;
            results.innerText = `Dopamine: ${dopamine}%\nNorepinephrine: ${norepinephrine}%`;
            break;
        }
        case "thc": {
            dopamine = dose * 50; if (dopamine > 50) dopamine = 50;
            results.innerText = `Dopamine: ${dopamine}%`;
            break;
        }
        case "levoamphetamine": {
            dopamine = dose * 250; if (dopamine > 3500) dopamine = 3500; dopamine = dopamine.toLocaleString();
            norepinephrine = (dose - 1) * 200; if (norepinephrine > 1500) norepinephrine = 1500; if (norepinephrine < 0) norepinephrine = 0; norepinephrine = norepinephrine.toLocaleString();
            results.innerText = `Dopamine: ${dopamine}%\nNorepinephrine: ${norepinephrine}%`;
            break;
        }
        case "dextroamphetamine": {
            dopamine = dose * 2000; if (dopamine > 6000) dopamine = 6000; dopamine = dopamine.toLocaleString();
            norepinephrine = dose * 500; if (norepinephrine > 1500) norepinephrine = 1500; norepinephrine = norepinephrine.toLocaleString();
            results.innerText = `Dopamine ${dopamine}%\nNorepinephrine: ${norepinephrine}%`;
            break;
        }
        case "ethanol": {
            dopamine = dose / 10; if (dopamine > 100) dopamine = 100;
            results.innerText = `Dopamine: ${dopamine}%`;
            break;
        }
        case "methamphetamine": {
            dopamine = dose * 500; if (dopamine > 8000) dopamine = 8000; dopamine = dopamine.toLocaleString();
            glutamate = dose * 250; if (glutamate > 500) glutamate = 500; glutamate = glutamate.toLocaleString();
            results.innerText = `Dopamine: ${dopamine}%\nGlutamate: ${glutamate}%`;
            break;
        }
        case "mdma": {
            dopamine = dose * 100; if (dose < 1.5) dopamine = 0; if (dopamine > 500) dopamine = 500;
            serotonin = dose * 400; if (serotonin > 3000) serotonin = 3000; serotonin = serotonin.toLocaleString();
            oxytocin = dose * 400; if (oxytocin > 500) oxytocin = 500;
            results.innerText = `Dopamine: ${dopamine}%\nSerotonin: ${serotonin}%\nOxytocin: ${oxytocin}%`;
            break;
        }
        case "cocaine": {
            dopamine = dose * 30; if (dopamine > 1500) dopamine = 1500; dopamine = dopamine.toLocaleString();
            results.innerText = `Dopamine ${dopamine}%`;
            break;
        }
        case "heroin": {
            dopamine = dose * 2000; if (dopamine > 200) dopamine = 200;
            results.innerText = `Dopamine: ${dopamine}%`;
            break;
        }
        case "morphine": {
            dopamine = dose * 100; if (dopamine > 100) dopamine = 100;
            results.innerText = `Dopamine: ${dopamine}%`;
            break;
        }
        case "pea": {
            dopamine = dose * 14; if (dopamine >= 169) dopamine = 169;
            results.textContent = `Dopamine: ${dopamine}%`;
            break;
        }
        case "atomoxetine": {
            dopamine = dose * 250; if (dopamine >= 250) dopamine = 250;
            norepinephrine = dose * 1000; if (norepinephrine >= 250) norepinephrine = 250;
            serotonin = dose * 25; if (serotonin >= 75) serotonin = 75;
            results.innerText = `Norepinephrine: ${norepinephrine}%\nDopamine: ${dopamine}%\nSerotonin: ${serotonin}%`
        }
        default: {
            return
        }
    }
}
