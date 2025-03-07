document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        let price = parseFloat(document.getElementById("price").value);
        let discount = parseFloat(document.getElementById("discount").value);
        let category = document.getElementById("category").value;
        let netPriceElem = document.getElementById("netPrice");
        let commissionElem = document.getElementById("commission");

        if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
            alert("Inserisci valori validi.");
            return;
        }

        let maxDiscount;
        switch (category) {
            case "rivenditore":
                maxDiscount = 60;
                break;
            case "smontagomme":
                maxDiscount = 55;
                break;
            case "sollevamento":
                maxDiscount = 50;
                break;
            default:
                maxDiscount = 0;
        }

        if (discount > maxDiscount) {
            netPriceElem.innerText = "NON AUTORIZZATO";
            commissionElem.innerText = "NON AUTORIZZATO";
            netPriceElem.classList.add("red");
            commissionElem.classList.add("red");
            return;
        } else {
            netPriceElem.classList.remove("red");
            commissionElem.classList.remove("red");
        }

        let netPrice = price * (1 - discount / 100);
        let commission = calculateCommission(price, netPrice, discount, category);

        netPriceElem.innerText = netPrice.toFixed(2) + "€";
        commissionElem.innerText = commission.toFixed(2) + "€";
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registrato!', reg))
        .catch(err => console.log('Errore nella registrazione del Service Worker', err));
}
