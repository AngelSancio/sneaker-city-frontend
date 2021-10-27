
export class Utils {
    static formatDate( date ) {
        return date.substr(-2) + '/' + date.substr(-5, 2) + '/' + date.substr(0, 4);
    }
    static formatPrice( price, withDecimals = false, decimalQty = 2 ) {
        return withDecimals ? '$' + Number(price).toFixed(decimalQty) : '$' + Number(price);
    }
}