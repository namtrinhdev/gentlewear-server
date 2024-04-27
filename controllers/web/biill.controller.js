exports.getBill = async (req, res, next) => {
    res.render('Bill/listBill');
}
exports.getBillConfirmed = async (req, res, next) => {
    res.render('Bill/billConfirmed');
}
exports.getBillDelivering = async (req, res, next) => {
    res.render('Bill/billDelivering');
}
exports.getBillDelivered = async (req, res, next) => {
    res.render('Bill/billDelivered');
}
exports.getBillCance = async (req, res, next) => {
    res.render('Bill/billCance');
}
