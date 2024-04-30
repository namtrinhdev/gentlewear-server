const ThanhToanModel = require('../../models/thanhtoan.model');
const UserModel = require('../../models/user.model'); 

exports.getOrderManagementPage = async (req, res) => {
    try {
        const transactions = await ThanhToanModel.find({}).populate({
            path: 'user', 
            model: 'userModel',
            select: 'fullname sdt diaChi'
        }).populate({
            path: 'cart.products',
            populate: {
                path: 'size',
                model: 'sizeModel',
                populate: [
                    {
                        path: 'sizeCode',
                        model: 'sizeCodeModel'
                    },
                    {
                        path: 'color',
                        model: 'colorModel',
                        populate: {
                            path: 'colorCode',
                            model: 'colorCodeModel'
                        }
                    }
                ]
            }
        });
        res.render('oder/order-management', { transactions: transactions });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).send('Internal server error');
    }
};

exports.updateTransactionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;
        await ThanhToanModel.findByIdAndUpdate(id, { trangThai: newStatus });
        res.status(200).send('Transaction status updated successfully');
    } catch (error) {
        console.error('Error updating transaction status:', error.message);
        res.status(500).send('Internal server error');
    }
};

