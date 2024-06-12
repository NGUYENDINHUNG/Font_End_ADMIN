import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function Add({ url }) {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  console.log("««««« data »»»»»", data);

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form (không tải lại trang).

    const formData = new FormData(); // Tạo đối tượng FormData để lưu trữ dữ liệu form.

    // Thêm các cặp khóa-giá trị vào FormData từ đối tượng data và image.
    formData.append("name", data.name); // Thêm tên.
    formData.append("description", data.description); // Thêm mô tả.
    formData.append("price", Number(data.price)); // Thêm giá, chuyển sang kiểu số.
    formData.append("category", data.category); // Thêm danh mục.
    formData.append("image", image); // Thêm hình ảnh.
    // Gửi yêu cầu POST đến API để thêm một mục thực phẩm mới.
    const response = await axios.post(`${url}/api/food/add`, formData);

    // Log phản hồi từ API.
    console.log("««««« response »»»»»", response);

    // Kiểm tra phản hồi từ API xem có thành công không.
    if (response.data.success) {
      // Nếu thành công, đặt lại dữ liệu form và trạng thái hình ảnh.
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad", // Giá trị mặc định.
      });
      setImage(false); // Đặt lại trạng thái hình ảnh.
      toast.success(response.data.message);
    } else {
      // Xử lý trường hợp lỗi ở đây (nếu cần thiết).
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-cetegory flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-bnt">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
