const ThanhToanModel = require('../../models/thanhtoan.model');
const UserModel = require('../../models/user.model'); // Import userModel

exports.getOrderManagementPage = async (req, res) => {
    try {
        const transactions = await ThanhToanModel.find({}).populate({
            path: 'user', // Tham chiếu đến userModel
            model: 'userModel',
            select: 'fullname sdt diaChi' // Chọn các trường dữ liệu cần hiển thị
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
