// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Registry
 * @notice Gas-optimized registry for beneficiaries and vendors
 * @dev Optimized for Sepolia testnet deployment
 */
contract Registry {
    address public owner;

    enum Category { None, Food, Medicine }

    mapping(address => bool) public beneficiaries;
    mapping(address => Category) public vendors;

    event BeneficiaryAdded(address indexed beneficiary);
    event VendorAdded(address indexed vendor, Category category);

    error Unauthorized();
    error InvalidAddress();
    error InvalidCategory();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Add a beneficiary to the whitelist
     * @param _beneficiary Address to add as beneficiary
     */
    function addBeneficiary(address _beneficiary) external onlyOwner {
        if (_beneficiary == address(0)) revert InvalidAddress();
        beneficiaries[_beneficiary] = true;
        emit BeneficiaryAdded(_beneficiary);
    }

    /**
     * @notice Add a vendor to the whitelist
     * @param _vendor Address to add as vendor
     * @param _category Vendor category (Food or Medicine)
     */
    function addVendor(address _vendor, Category _category) external onlyOwner {
        if (_vendor == address(0)) revert InvalidAddress();
        if (_category == Category.None) revert InvalidCategory();
        vendors[_vendor] = _category;
        emit VendorAdded(_vendor, _category);
    }

    /**
     * @notice Check if address is a beneficiary
     * @param _address Address to check
     * @return bool True if address is a beneficiary
     */
    function isBeneficiary(address _address) external view returns (bool) {
        return beneficiaries[_address];
    }

    /**
     * @notice Check if address is a vendor
     * @param _address Address to check
     * @return bool True if address is a vendor
     */
    function isVendor(address _address) external view returns (bool) {
        return vendors[_address] != Category.None;
    }

    /**
     * @notice Get vendor category
     * @param _address Vendor address
     * @return Category Vendor category
     */
    function getVendorCategory(address _address) external view returns (Category) {
        return vendors[_address];
    }
}
