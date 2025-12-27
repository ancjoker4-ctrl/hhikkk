export const REGISTRY_ADDRESS = '0x3133859CA8498799B7e4a466B21A2eDD8222a8D5';
export const TOKEN_ADDRESS = '0xed1952AE97Ffb59464EAcE3D0b06DF751E6C13dE';

export const REGISTRY_ABI = [
  "function owner() view returns (address)",
  "function addBeneficiary(address _beneficiary)",
  "function addVendor(address _vendor, uint8 _category)",
  "function isBeneficiary(address _address) view returns (bool)",
  "function isVendor(address _address) view returns (bool)",
  "function getVendorCategory(address _address) view returns (uint8)",
  "function beneficiaries(address) view returns (bool)",
  "function vendors(address) view returns (uint8)",
  "event BeneficiaryAdded(address indexed beneficiary)",
  "event VendorAdded(address indexed vendor, uint8 category)"
];

export const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function owner() view returns (address)",
  "function mint(address _to, uint256 _amount)",
  "function transfer(address _to, uint256 _value) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Minted(address indexed to, uint256 amount)"
];

export const CATEGORY = {
  None: 0,
  Food: 1,
  Medicine: 2
};

export const CATEGORY_NAMES = {
  0: 'None',
  1: 'Food',
  2: 'Medicine'
};
