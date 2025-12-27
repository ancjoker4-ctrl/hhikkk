// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRegistry {
    function isBeneficiary(address _address) external view returns (bool);
    function isVendor(address _address) external view returns (bool);
}

contract DisasterReliefToken {
    string public name = "Disaster Relief Token";
    string public symbol = "DRT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;
    IRegistry public registry;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Minted(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _registry) {
        owner = msg.sender;
        registry = IRegistry(_registry);
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid address");
        require(registry.isBeneficiary(_to), "Not a beneficiary");

        balanceOf[_to] += _amount;
        totalSupply += _amount;

        emit Minted(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        return _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(allowance[_from][msg.sender] >= _value, "Allowance exceeded");
        allowance[_from][msg.sender] -= _value;
        return _transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function _transfer(address _from, address _to, uint256 _value) internal returns (bool) {
        require(_to != address(0), "Invalid recipient");
        require(balanceOf[_from] >= _value, "Insufficient balance");

        if (_from == owner) {
            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;
            emit Transfer(_from, _to, _value);
            return true;
        }

        require(registry.isBeneficiary(_from), "Sender not a beneficiary");
        require(registry.isVendor(_to), "Recipient not a vendor");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
