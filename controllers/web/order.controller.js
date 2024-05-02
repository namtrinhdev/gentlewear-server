const ThanhToanModel = require('../../models/thanhtoan.model');
const UserModel = require('../../models/user.model'); 

exports.getOrderManagementPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // lấy số trang hiện tại
    const itemsPerPage = 10; // đặt số lượng mục trên mỗi trang
    const trangThai = req.query.trangThai; // lấy trạng thái từ query parameter

    // tạo một object query rỗng
    let query = {};

    // nếu trangThai tồn tại, thêm nó vào object query
    if (trangThai) {
        query.trangThai = trangThai;
    }

    const transactions = await ThanhToanModel.find(query)
        .skip((page - 1) * itemsPerPage) // bỏ qua số lượng mục cần bỏ qua
        .limit(itemsPerPage) // giới hạn số lượng mục thành itemsPerPage
        .populate({
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
    res.render('oder/order-management', { transactions: transactions, currentPage: page });
};
