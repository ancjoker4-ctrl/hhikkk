// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registry {
    address public owner;

    enum Category { None, Food, Medicine }

    mapping(address => bool) public beneficiaries;
    mapping(address => Category) public vendors;

    event BeneficiaryAdded(address indexed beneficiary);
    event VendorAdded(address indexed vendor, Category category);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addBeneficiary(address _beneficiary) external onlyOwner {
        require(_beneficiary != address(0), "Invalid address");
        beneficiaries[_beneficiary] = true;
        emit BeneficiaryAdded(_beneficiary);
    }

    function addVendor(address _vendor, Category _category) external onlyOwner {
        require(_vendor != address(0), "Invalid address");
        require(_category == Category.Food || _category == Category.Medicine, "Invalid category");
        vendors[_vendor] = _category;
        emit VendorAdded(_vendor, _category);
    }

    function isBeneficiary(address _address) external view returns (bool) {
        return beneficiaries[_address];
    }

    function isVendor(address _address) external view returns (bool) {
        return vendors[_address] != Category.None;
    }

    function getVendorCategory(address _address) external view returns (Category) {
        return vendors[_address];
    }
}
