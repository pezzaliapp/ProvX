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
                baseRate = 1; // 1%
                maxDiscount = 60;
                break;
            case "smontagomme":
                baseRate = 7; // 7%
                maxDiscount = 55;
                break;
            case "sollevamento":
                baseRate = 3; // 3%
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
        let commission = calculateCommission(price, netPrice, discount, category);
        let commissionPercent = calculateCommissionPercent(price, netPrice, discount, category);
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

function calculateCommission(price, netPrice, discount, category) {
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
            return 0;
    }

    if (discount === maxDiscount) {
        return netPrice * baseRate;
    } else if (discount < maxDiscount) {
        let difference = maxDiscount - discount;
        let extraCommissionRate = baseRate / 2;
        let extraCommission = (price * (difference / 100) / 2) * extraCommissionRate;
        return (netPrice * baseRate) + extraCommission;
    }
    return 0;
}

function calculateCommissionPercent(price, netPrice, discount, category) {
    let baseRate, maxDiscount;
    switch (category) {
        case "rivenditore":
            baseRate = 1; // 1%
            maxDiscount = 60;
            break;
        case "smontagomme":
            baseRate = 7; // 7%
            maxDiscount = 55;
            break;
        case "sollevamento":
            baseRate = 3; // 3%
            maxDiscount = 50;
            break;
        default:
            return 0;
    }
    
    if (discount === maxDiscount) {
        return baseRate;
    } else {
        let difference = maxDiscount - discount;
        let extraCommissionRate = baseRate / 2;
        let extraCommissionPercent = (difference / 2) * (extraCommissionRate / 100);
        return baseRate + extraCommissionPercent;
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registrato!', reg))
        .catch(err => console.log('Errore nella registrazione del Service Worker', err));
}
