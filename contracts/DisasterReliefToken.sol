// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IRegistry {
    function isBeneficiary(address _address) external view returns (bool);
    function isVendor(address _address) external view returns (bool);
}

/**
 * @title DisasterReliefToken
 * @notice Gas-optimized ERC20 token with spending restrictions
 * @dev Beneficiaries can only send to approved vendors
 */
contract DisasterReliefToken {
    string public constant name = "Disaster Relief Token";
    string public constant symbol = "DRT";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    address public immutable owner;
    IRegistry public immutable registry;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Minted(address indexed to, uint256 amount);

    error Unauthorized();
    error InvalidAddress();
    error NotBeneficiary();
    error NotVendor();
    error InsufficientBalance();
    error InsufficientAllowance();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor(address _registry) {
        if (_registry == address(0)) revert InvalidAddress();
        owner = msg.sender;
        registry = IRegistry(_registry);
    }

    /**
     * @notice Mint tokens to a beneficiary
     * @param _to Beneficiary address
     * @param _amount Amount to mint
     */
    function mint(address _to, uint256 _amount) external onlyOwner {
        if (_to == address(0)) revert InvalidAddress();
        if (!registry.isBeneficiary(_to)) revert NotBeneficiary();

        unchecked {
            balanceOf[_to] += _amount;
            totalSupply += _amount;
        }

        emit Minted(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }

    /**
     * @notice Transfer tokens to vendor
     * @param _to Recipient address (must be vendor)
     * @param _value Amount to transfer
     * @return bool Success status
     */
    function transfer(address _to, uint256 _value) external returns (bool) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * @notice Transfer tokens from approved address
     * @param _from Sender address
     * @param _to Recipient address
     * @param _value Amount to transfer
     * @return bool Success status
     */
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        uint256 currentAllowance = allowance[_from][msg.sender];
        if (currentAllowance < _value) revert InsufficientAllowance();

        unchecked {
            allowance[_from][msg.sender] = currentAllowance - _value;
        }

        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * @notice Approve spender to transfer tokens
     * @param _spender Spender address
     * @param _value Amount to approve
     * @return bool Success status
     */
    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @notice Internal transfer with restriction checks
     * @param _from Sender address
     * @param _to Recipient address
     * @param _value Amount to transfer
     */
    function _transfer(address _from, address _to, uint256 _value) internal {
        if (_to == address(0)) revert InvalidAddress();
        if (balanceOf[_from] < _value) revert InsufficientBalance();

        // Owner can transfer to anyone (administrative purposes)
        if (_from == owner) {
            unchecked {
                balanceOf[_from] -= _value;
                balanceOf[_to] += _value;
            }
            emit Transfer(_from, _to, _value);
            return;
        }

        // Regular users: must be beneficiary sending to vendor
        if (!registry.isBeneficiary(_from)) revert NotBeneficiary();
        if (!registry.isVendor(_to)) revert NotVendor();

        unchecked {
            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;
        }

        emit Transfer(_from, _to, _value);
    }
}
