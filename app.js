document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        let price = parseFloat(document.getElementById("price").value);
        let discount = parseFloat(document.getElementById("discount").value);
        let category = document.getElementById("category").value;
        let netPriceElem = document.getElementById("netPrice");
        let commissionElem = document.getElementById("commission");
        let commissionPercentElem = document.getElementById("commissionPercent");
        let discountedPrice60Elem = document.getElementById("discountedPrice60");
        let netCompanyElem = document.getElementById("netCompany");
        let finalCompanyNetElem = document.getElementById("finalCompanyNet");

        if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
            alert("Inserisci valori validi.");
            return;
        }

        let baseRate, maxDiscount;
        switch (category) {
            case "rivenditore":
                baseRate = 0.01; // 1%
                maxDiscount = 60;
                break;
            case "smontagomme":
                baseRate = 0.07; // 7%
                maxDiscount = 55;
                break;
            case "sollevamento":
                baseRate = 0.03; // 3%
                maxDiscount = 50;
                break;
            default:
                maxDiscount = 0;
        }

        if (discount > maxDiscount) {
            netPriceElem.innerText = "NON AUTORIZZATO";
            commissionElem.innerText = "NON AUTORIZZATO";
            commissionPercentElem.innerText = "NON AUTORIZZATO";
            netCompanyElem.innerText = "NON AUTORIZZATO";
            finalCompanyNetElem.innerText = "NON AUTORIZZATO";
            return;
        }

        let netPrice = price * (1 - discount / 100);
        let commission = calculateCommission(price, netPrice, discount, maxDiscount, baseRate);
        let commissionPercent = calculateCommissionPercent(price, discount, maxDiscount, baseRate);
        let discountedPrice60 = price * 0.4; // Prezzo scontato del 60%
        let netCompany = netPrice - commission; // Netto azienda senza costi vari

        netPriceElem.innerText = netPrice.toFixed(2) + "€";
        commissionElem.innerText = commission.toFixed(2) + "€";
        commissionPercentElem.innerText = commissionPercent.toFixed(2) + "%";
        discountedPrice60Elem.innerText = discountedPrice60.toFixed(2) + "€";
        netCompanyElem.innerText = netCompany.toFixed(2) + "€";
    });

    document.getElementById("calculateCostsBtn").addEventListener("click", function () {
        let netCompany = parseFloat(document.getElementById("netCompany").innerText);
        let extraCosts = parseFloat(document.getElementById("extraCosts").value);
        let finalCompanyNetElem = document.getElementById("finalCompanyNet");

        if (isNaN(netCompany) || isNaN(extraCosts)) {
            alert("Inserisci un valore valido per i costi vari.");
            return;
        }

        let finalCompanyNet = netCompany - extraCosts;
        finalCompanyNetElem.innerText = finalCompanyNet.toFixed(2) + "€";
    });
});

function calculateCommission(price, netPrice, discount, maxDiscount, baseRate) {
    let baseCommission = price * (1 - maxDiscount / 100) * baseRate;
    
    if (discount === maxDiscount) {
        return baseCommission;
    } else {
        let extraCommission = (netPrice - price * (1 - maxDiscount / 100)) * (baseRate / 2);
        return baseCommission + extraCommission;
    }
}

function calculateCommissionPercent(price, discount, maxDiscount, baseRate) {
    if (discount === maxDiscount) {
        return baseRate * 100;
    } else {
        let extraCommissionRate = baseRate / 2;
        let extraCommissionPercent = ((maxDiscount - discount) / 2) * extraCommissionRate * 100;
        return (baseRate * 100) + extraCommissionPercent;
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registrato!', reg))
        .catch(err => console.log('Errore nella registrazione del Service Worker', err));
}
