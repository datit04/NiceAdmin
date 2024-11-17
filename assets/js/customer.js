///phan trang va hien thi danh sách khach hang, xóa khach hang
document.addEventListener('DOMContentLoaded', function () {
    const customerList = document.getElementById('customer_list').querySelector('tbody');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 10;
    let currentPage = 1;
    let customers = [];
  
    // Hàm để lấy dữ liệu từ API
    async function fetchCustomers() {
      try {
        const response = await fetch('http://localhost:9090/getCT');
        const data = await response.json();
        products = data;
        displayCustomer();
        setupPagination();
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
  

    //lay san pham moi trong thang
async function fetchNewProducts() {
  try {
  
    const response = await fetch('http://localhost:9090/getProductInMonth');
    const data = await response.json();

    const newProductElement = document.getElementById('newProduct');
    newProductElement.innerText = `${data.numberOfProduct}`;
  } catch (error) {
    console.error('Error fetching new products:', error);
  }
}
fetchNewProducts();

    async function fetchAndDisplayTotalQuantity() {
      try {
        const response = await fetch('http://localhost:9090/getQuantity');
        const data = await response.json();
        const totalQuantityElement = document.getElementById('Total');
        totalQuantityElement.innerText = `${data.totalQuantity}`;
      } catch (error) {
        console.error('Error fetching the total quantity:', error);
      }
    }
    fetchAndDisplayTotalQuantity();

    // Hàm để hiển thị sản phẩm lên bảng
    function displayCustomer() {
      customerList.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = products.slice(start, end);
  
      paginatedItems.forEach(customer => {
        const row = document.createElement('tr');
  
        const cellId = document.createElement('td');
        cellId.textContent = customer.customer_id;
        row.appendChild(cellId);
  
  
        const cellName = document.createElement('td');
        cellName.textContent = customer.name;
        row.appendChild(cellName);
  
        const cellPrice = document.createElement('td');
        cellPrice.textContent = customer.email;
        row.appendChild(cellPrice);
  
        const cellStock = document.createElement('td');
        cellStock.textContent = customer.phone;
        row.appendChild(cellStock);

        const cellAdd = document.createElement('td');
        cellAdd.textContent = customer.address;
        row.appendChild(cellAdd);
  
        const cellActions = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Chỉnh sửa';
        editButton.className = 'btn btn-warning btn-sm';
        editButton.addEventListener('click', function () {
          editCustomer(customer.customer_id);
        });
        cellActions.appendChild(editButton);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', function () {
          deleteCustomer(customer.customer_id);
        });
        cellActions.appendChild(deleteButton);
        row.appendChild(cellActions);
  
        customerList.appendChild(row);
      });
    }
  
    function displayCustomers(customers) {
      const tableBody = document.querySelector("#customerTable tbody");
      tableBody.innerHTML = "";
    
      customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${customer.customer_id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.address}</td>
                    `;
    
        tableBody.appendChild(row);
      });
    }

    // Hàm để thiết lập phân trang
    function setupPagination() {
      pagination.innerHTML = '';
      const pageCount = Math.ceil(customers.length / itemsPerPage);
  
      for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
  
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
  
        pageLink.addEventListener('click', function (event) {
          event.preventDefault();
          currentPage = i;
          displayCustomers();
        });
  
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
      }
    }
  
    //sua 
    async function editCustomer(customer_id) {
      const customer = customers.find(p => p.id === customer_id); 
      if (customer) { 
        currentEditCustomerId = customer_id; 
        document.getElementById('editName').value = customer.name; 
        document.getElementById('editEmail').value = customer.email; 
        document.getElementById('editPhone').value = customer.phone; 
        document.getElementById('editAddress').value = customer.address; 
        document.getElementById('edit-customer-form').classList.remove('d-none');
      }
    }
  
    // async function deleteCustomer(customerId) {
    //   const confirmed = confirm('Bạn có chắc chắn muốn xóa khách hàng này?');
    //   if (confirmed) {
    //     try {
    //       const response = await fetch(`http://localhost:9090/deleteProduct/${productId}`, {
    //         method: 'DELETE'
    //       });
    //       if (response.ok) {
    //         products = products.filter(p => p.id !== productId);
    //         displayProducts();
    //         setupPagination();
    //       } else {
    //         console.error('Failed to delete product');
    //       }
    //     } catch (error) {
    //       console.error('Error deleting product:', error);
    //     }
    //   }
    // }

    
  
    // Gọi hàm để lấy dữ liệu từ API và hiển thị sản phẩm
    fetchCustomers();
  });
  //end hien thi danh sách