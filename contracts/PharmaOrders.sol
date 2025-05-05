// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaOrders {
    enum OrderStatus { Placed, Approved, Shipped, Delivered }

    struct Product {
        uint id;
        string productName;
        string batchNumber;
        uint quantity;
        string expiryDate;
        string manufacturer;
        address retailer;
        OrderStatus status;
    }

    uint public productCount;
    mapping(uint => Product) public products;

    event ProductAdded(uint productId, string productName, uint quantity, string manufacturer);
    event OrderStatusUpdated(uint productId, OrderStatus status);

    constructor() {
        productCount = 0;
    }

    function addProduct(
        string memory _productName,
        string memory _batchNumber,
        uint _quantity,
        string memory _expiryDate,
        string memory _manufacturer
    ) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _productName,
            _batchNumber,
            _quantity,
            _expiryDate,
            _manufacturer,
            address(0),
            OrderStatus.Placed
        );
        emit ProductAdded(productCount, _productName, _quantity, _manufacturer);
    }

    function placeOrder(uint _productId) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        require(products[_productId].retailer == address(0), "Product already ordered");
        products[_productId].retailer = msg.sender;
        products[_productId].status = OrderStatus.Placed;
    }

    function updateOrderStatus(uint _productId, OrderStatus _status) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        require(products[_productId].retailer != address(0), "Product not ordered yet");
        products[_productId].status = _status;
        emit OrderStatusUpdated(_productId, _status);
    }

    function getProduct(uint _productId) public view returns (
        string memory, string memory, uint, string memory, string memory, address, OrderStatus
    ) {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product memory product = products[_productId];
        return (
            product.productName,
            product.batchNumber,
            product.quantity,
            product.expiryDate,
            product.manufacturer,
            product.retailer,
            product.status
        );
    }
}
