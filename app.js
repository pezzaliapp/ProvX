document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        let price = parseFloat(document.getElementById("price").value);
        let discount = parseFloat(document.getElementById("discount").value);
        let category = document.getElementById("category").value;

        if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
            alert("Inserisci valori validi.");
            return;
        }

        let netPrice = price * (1 - discount / 100);
        let commission = calculateCommission(price, netPrice, discount, category);

        document.getElementById("netPrice").innerText = netPrice.toFixed(2) + "€";
        document.getElementById("commission").innerText = commission.toFixed(2) + "€";
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

    if (discount >= maxDiscount) {
        return netPrice * baseRate;
    } else {
        let difference = maxDiscount - discount;
        let extraCommissionRate = baseRate / 2;
        let extraCommission = (price * (difference / 100) / 2) * extraCommissionRate;
        return (netPrice * baseRate) + extraCommission;
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registrato!', reg))
        .catch(err => console.log('Errore nella registrazione del Service Worker', err));
}

