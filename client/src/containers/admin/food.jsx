import React, { useState, useEffect } from "react";
import { CategoryCard, PopupCategory } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import { MdAddBox } from "react-icons/md";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../../store/actions";

const Food = () => {
    const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: "" });

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    //get all
    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    // popup sửa
    const openPopup = (category) => {
        setSelectedCategory(category);
        setNewCategory({ name: category.categoryName });
        setIsPopupVisible(true);
    };

    //close
    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedCategory(null);
        setNewCategory({ name: "" });
    };
    // popup thêm
    const openAddPopup = () => {
        setIsAddPopupVisible(true);
    };
    const closeAddPopup = () => {
        setIsAddPopupVisible(false);
        setNewCategory({ name: "" });
    };
    //xử lý chức năng thêm
    const handleAddCategory = async (e) => {
        const payload = { name: newCategory.name };

        dispatch(createCategory(payload))
            .then(() => {
                Swal.fire("Thành công!", "Thêm loại thức ăn thành công", "success");
                dispatch(getAllCategory());
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
                dispatch(getAllCategory());
            });
        closeAddPopup();
    };
    //xử lý xóa danh mục
    const handleDeleteCategory = (category) => {
        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(category))
                    .then(() => {
                        Swal.fire("Thành công!", "Đã xóa thành công.", "success");
                        dispatch(getAllCategory());
                    })
                    .catch((error) => {
                        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
                    });
            }
        });
    };
    //xử lý chức năng sửa
    const handleEditCategory = (e) => {
        e.preventDefault();

        const payload = { name: newCategory.name };

        dispatch(updateCategory(selectedCategory.id, payload))
            .then(() => {
                Swal.fire("Thành công!", "Cập nhật loại thức ăn thành công", "success");
                dispatch(getAllCategory());
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình cập nhật", "error");
            });
        closePopup();
    };
    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-primary font-medium">Thực đơn</h1>
                <div className="ml-auto text-primary text-3xl hover:opacity-80" onClick={openAddPopup}>
                    <MdAddBox />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={index}
                        category={category.categoryName}
                        onDelete={() => handleDeleteCategory(category.id)}
                        onEdit={() => openPopup(category)}
                    />
                ))}
            </div>
            {/* popup sửa */}
            {isPopupVisible && selectedCategory && (
                <PopupCategory
                    isAdd={false}
                    onClose={closePopup}
                    onSubmit={handleEditCategory}
                    category={newCategory.name}
                    onChange={(e) => setNewCategory({ name: e.target.value })}
                />
            )}
            {/* popup thêm */}
            {isAddPopupVisible && (
                <PopupCategory
                    isAdd={true}
                    category={newCategory.name || ""}
                    onClose={closeAddPopup}
                    onSubmit={handleAddCategory}
                    onChange={(e) => setNewCategory({ name: e.target.value })}
                />
            )}
        </div>

    )
}

export default Food
